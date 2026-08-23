import { Link } from "@tanstack/react-router";

import logo from "@/assets/conesess-logo.png";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-3">
        <div>
          <img
            src={logo}
            alt="Logo du CONESESS"
            loading="lazy"
            width={72}
            height={72}
            className="h-16 w-16"
          />
          <p className="mt-4 font-display text-lg font-extrabold">CONESESS</p>
          <p className="mt-1 text-sm opacity-80">
            Conseil National des Entreprises de l'Économie Sociale et Solidaire du Sénégal
          </p>
        </div>

        <div>
          <p className="label-mono text-gold">Contact</p>
          <ul className="mt-4 space-y-2 text-sm opacity-85">
            <li>Comité d'Initiative — Dakar, Sénégal</li>
            <li>contact@conesess.sn</li>
            <li className="font-mono">+221 33 000 00 00</li>
          </ul>
        </div>

        <div>
          <p className="label-mono text-gold">Institution</p>
          <ul className="mt-4 space-y-2 text-sm opacity-85">
            <li>
              <a href="#gouvernance" className="hover:opacity-100">
                Gouvernance
              </a>
            </li>
            <li>
              <a href="#adherer" className="hover:opacity-100">
                Devenir membre
              </a>
            </li>
            <li>
              <Link to="/admin" className="hover:opacity-100">
                Espace administrateur
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/15">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-5 py-6 text-xs opacity-70 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© {new Date().getFullYear()} CONESESS — Tous droits réservés.</p>
          <p className="font-mono">Mémorandum stratégique 2026</p>
        </div>
      </div>
    </footer>
  );
}
