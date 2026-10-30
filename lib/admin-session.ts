const SESSION_TTL_SECONDS = 60 * 60 * 8;

function getSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("ADMIN_SESSION_SECRET must be configured with at least 32 characters.");
  }
  return secret;
}

function toHex(bytes: ArrayBuffer) {
  return Array.from(new Uint8Array(bytes), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function getKey() {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

export async function createAdminSessionToken() {
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const payload = String(expiresAt);
  const signature = await crypto.subtle.sign("HMAC", await getKey(), new TextEncoder().encode(payload));
  return `${payload}.${toHex(signature)}`;
}

export async function verifyAdminSessionToken(token?: string) {
  if (!token) return false;
  const [payload, signature, extra] = token.split(".");
  if (!payload || !signature || extra || !/^\d+$/.test(payload) || !/^[a-f0-9]{64}$/i.test(signature)) return false;
  const expiresAt = Number(payload);
  if (!Number.isSafeInteger(expiresAt) || expiresAt <= Math.floor(Date.now() / 1000)) return false;
  try {
    const key = await getKey();
    const bytes = new Uint8Array(signature.match(/.{2}/g)!.map((part) => Number.parseInt(part, 16)));
    return await crypto.subtle.verify("HMAC", key, bytes, new TextEncoder().encode(payload));
  } catch {
    return false;
  }
}
