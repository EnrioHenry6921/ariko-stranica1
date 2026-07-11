"use client";

import { useLang } from "@/lib/LangProvider";
import { BlanketEdge } from "./ui/BlanketEdge";

export function Footer() {
  const { t } = useLang();

  return (
    <footer>
      <BlanketEdge />
      <div className="site-footer">
        <div className="site-footer__grid">
          <div>
            <div className="site-footer__brand">
              Ariko <em style={{ fontWeight: 500 }}>Studio</em>
            </div>
            <p className="site-footer__blurb">{t.footerBlurb}</p>
          </div>
          <div className="site-footer__col">
            <div className="site-footer__col-title">{t.footerShop}</div>
            <a href="/#kolekcija">{t.navKolekcija}</a>
            <a href="/#patterni">{t.navPatterni}</a>
            <a href="/#galerija">{t.navGalerija}</a>
          </div>
          <div className="site-footer__col">
            <div className="site-footer__col-title">Studio</div>
            <a href="/#o-meni">{t.navOMeni}</a>
            <a href="/#recenzije">{t.navRecenzije}</a>
            <a href="/#kontakt">{t.navKontakt}</a>
          </div>
          <div className="site-footer__col">
            <div className="site-footer__col-title">Info</div>
            <a href="/#kolekcija">{t.footerShipping}</a>
            <a href="/patterni/birkin-30#licenca">{t.footerLicence}</a>
            <a href="/#kontakt">{t.footerTerms}</a>
            <a href="/#kontakt">{t.footerPrivacy}</a>
          </div>
        </div>
        <div className="site-footer__legal">© 2026 Ariko Studio · Ariana Kovačić</div>
      </div>
    </footer>
  );
}
