import { Link } from "@tanstack/react-router";

import logo from "@/assets/conesess-logo.png";
import { Container } from "@/components/site/primitives";

export function Footer() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <Container className="grid gap-9 py-10 sm:py-16 md:grid-cols-4">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-background">
              <img
                src={logo}
                alt="CONESESS"
                width={44}
                height={44}
                className="block h-11 w-11 rounded-full"
              />
            </span>
            <span className="font-display text-lg font-extrabold text-ink-foreground">
              CONESESS
            </span>
          </div>
          <p className="max-w-[32ch] text-[14.5px] leading-relaxed text-ink-foreground/70">
            Confédération nationale des entreprises sociales et solidaires du Sénégal.
          </p>
        </div>

        <div>
          <p className="label-mono mb-3.5 text-leaf">Le projet</p>
          <div className="flex flex-col gap-2.5 text-[14.5px]">
            <a href="#constats" className="text-ink-foreground/82 hover:text-gold">
              Constats
            </a>
            <a href="#vision" className="text-ink-foreground/82 hover:text-gold">
              Vision &amp; piliers
            </a>
            <a href="#gouvernance" className="text-ink-foreground/82 hover:text-gold">
              Gouvernance
            </a>
          </div>
        </div>

        <div>
          <p className="label-mono mb-3.5 text-leaf">Dispositifs</p>
          <div className="flex flex-col gap-2.5 text-[14.5px]">
            <a href="#ianess" className="text-ink-foreground/82 hover:text-gold">
              IAN-ESS
            </a>
            <a href="#poles" className="text-ink-foreground/82 hover:text-gold">
              Pôles sectoriels
            </a>
            <a href="#services" className="text-ink-foreground/82 hover:text-gold">
              Services aux membres
            </a>
          </div>
        </div>

        <div>
          <p className="label-mono mb-3.5 text-leaf">Contact</p>
          <p className="text-[14.5px] leading-[1.8] text-ink-foreground/82">
            Dakar, Sénégal
            <br />
            contact@conesess.sn
          </p>
          <Link
            to="/admin"
            className="label-mono mt-[18px] inline-block border-b-2 border-leaf/40 text-leaf hover:text-gold"
          >
            Espace admin →
          </Link>
        </div>
      </Container>
      <div className="border-t-2 border-ink-foreground/15">
        <Container className="py-[18px]">
          <p className="label-mono text-ink-foreground/50">
            © {new Date().getFullYear()} CONESESS — TOUS DROITS RÉSERVÉS
          </p>
        </Container>
      </div>
    </footer>
  );
}
