/**
 * Admin session primitives. Uses only Web Crypto so the same code runs in the
 * Edge middleware and in Node server components / server actions.
 *
 * Token format: v1.<expiresAtSeconds>.<nonceHex>.<base64url(HMAC-SHA256)>
 * The signing key is derived from ADMIN_SESSION_SECRET (optional) + ADMIN_PASSWORD,
 * so rotating either value invalidates every existing session.
 */

export const SESSION_TTL_SECONDS = 60 * 60 * 8;
export const MIN_PASSWORD_LENGTH = 12;

export function sessionCookieName() {
  // __Host- prefix forces Secure, Path=/ and no Domain attribute in production.
  return process.env.NODE_ENV === "production" ? "__Host-tas_admin" : "tas_admin";
}

const encoder = new TextEncoder();

function configuredPassword(): string | null {
  const pw = process.env.ADMIN_PASSWORD;
  return pw && pw.length >= MIN_PASSWORD_LENGTH ? pw : null;
}

export function isAdminConfigured() {
  return configuredPassword() !== null;
}

async function signingKey(): Promise<CryptoKey | null> {
  const pw = configuredPassword();
  if (!pw) return null;
  const material = `tas-admin-session:v1:${process.env.ADMIN_SESSION_SECRET ?? ""}:${pw}`;
  return crypto.subtle.importKey("raw", encoder.encode(material), { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"]);
}

function toBase64Url(bytes: ArrayBuffer): string {
  let bin = "";
  for (const b of new Uint8Array(bytes)) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(value: string): Uint8Array<ArrayBuffer> | null {
  try {
    const b64 = value.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((value.length + 3) % 4);
    const bin = atob(b64);
    const out = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
    return out;
  } catch {
    return null;
  }
}

function randomHex(bytes = 16) {
  const buf = new Uint8Array(bytes);
  crypto.getRandomValues(buf);
  return Array.from(buf, (b) => b.toString(16).padStart(2, "0")).join("");
}

export async function createSessionToken(now = Date.now()): Promise<string | null> {
  const key = await signingKey();
  if (!key) return null;
  const payload = `v1.${Math.floor(now / 1000) + SESSION_TTL_SECONDS}.${randomHex()}`;
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  return `${payload}.${toBase64Url(sig)}`;
}

export async function verifySessionToken(token: string | undefined | null, now = Date.now()): Promise<boolean> {
  if (!token || token.length > 256) return false;
  const parts = token.split(".");
  if (parts.length !== 4 || parts[0] !== "v1") return false;
  const [version, exp, nonce, sig] = parts;
  const expires = Number(exp);
  if (!Number.isInteger(expires) || expires * 1000 <= now) return false;
  if (!/^[0-9a-f]{32}$/.test(nonce)) return false;
  const key = await signingKey();
  const sigBytes = fromBase64Url(sig);
  if (!key || !sigBytes) return false;
  // crypto.subtle.verify performs a constant-time comparison.
  return crypto.subtle.verify("HMAC", key, sigBytes, encoder.encode(`${version}.${exp}.${nonce}`));
}

/** Constant-time password check (compares fixed-length HMAC digests). */
export async function verifyPassword(candidate: unknown): Promise<boolean> {
  const expected = configuredPassword();
  if (!expected || typeof candidate !== "string" || candidate.length === 0 || candidate.length > 512) return false;
  const key = await crypto.subtle.importKey("raw", encoder.encode("tas-admin-password-compare"), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const [a, b] = await Promise.all([
    crypto.subtle.sign("HMAC", key, encoder.encode(candidate)),
    crypto.subtle.sign("HMAC", key, encoder.encode(expected)),
  ]);
  const x = new Uint8Array(a);
  const y = new Uint8Array(b);
  let diff = x.length ^ y.length;
  for (let i = 0; i < x.length; i++) diff |= x[i] ^ y[i];
  return diff === 0;
}
