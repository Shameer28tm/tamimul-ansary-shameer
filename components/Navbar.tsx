"use client";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
const links = ["About", "Projects", "Writing", "Certificates", "Journey", "Contact"];
export function Navbar() {
  const [open, setOpen] = useState(false); const [light, setLight] = useState(false);
  useEffect(() => { setLight(document.documentElement.classList.contains("light")); }, []);
  const toggle = () => { const next = !light; setLight(next); document.documentElement.classList.toggle("light", next); };
  return <header className="nav"><a href="#top" className="wordmark" aria-label="Tamimul Ansary Shameer, home">Tamimul Ansary <i>Shameer</i></a><nav aria-label="Main navigation">{links.map(l => <a href={`#${l.toLowerCase()}`} key={l}>{l}</a>)}</nav><div className="nav-actions"><button onClick={toggle} aria-label="Toggle color theme">{light ? <Moon size={16}/> : <Sun size={16}/>}</button><button className="menu" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>{open ? <X size={20}/> : <Menu size={20}/>}</button></div>{open && <div className="mobile-menu">{links.map(l => <a onClick={() => setOpen(false)} href={`#${l.toLowerCase()}`} key={l}>{l}</a>)}</div>}</header>
}
