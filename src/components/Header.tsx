"use client";

import { useState } from "react";
import { useLang } from "@/lib/LangProvider";

export function Header() {
  const { lang, setLang, t } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);
  const close = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a href="/" className="wordmark" onClick={close}>
          Ariko <em>Studio</em>
        </a>
        <nav className={`site-nav ${menuOpen ? "open" : ""}`}>
          <a href="/#kolekcija" onClick={close}>{t.navKolekcija}</a>
          <a href="/#patterni" onClick={close}>{t.navPatterni}</a>
          <a href="/#galerija" onClick={close}>{t.navGalerija}</a>
          <a href="/#recenzije" onClick={close}>{t.navRecenzije}</a>
          <a href="/#o-meni" onClick={close}>{t.navOMeni}</a>
          <a href="/#kontakt" onClick={close}>{t.navKontakt}</a>
        </nav>
        <div className="header-actions">
          <div className="lang-switch">
            <button onClick={() => setLang("hr")} aria-label="Hrvatski" className={lang === "hr" ? "active" : ""}>
              HR
            </button>
            <span>/</span>
            <button onClick={() => setLang("en")} aria-label="English" className={lang === "en" ? "active" : ""}>
              EN
            </button>
          </div>
          <a href="/#kolekcija" aria-label="Košarica" className="cart-link" onClick={close}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </a>
          <button
            className="nav-toggle"
            aria-label={menuOpen ? "Zatvori izbornik" : "Otvori izbornik"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              {menuOpen ? (
                <>
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </>
              ) : (
                <>
                  <path d="M4 6h16" />
                  <path d="M4 12h16" />
                  <path d="M4 18h16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
