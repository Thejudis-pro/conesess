import { useState } from "react";

import logo from "@/assets/conesess-logo.png";
import { btn } from "@/components/site/primitives";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const nav = [
  { href: "#constats", label: "Constats" },
  { href: "#vision", label: "Vision" },
  { href: "#piliers", label: "Piliers" },
  { href: "#gouvernance", label: "Gouvernance" },
  { href: "#poles", label: "Pôles" },
  { href: "#services", label: "Services" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b-2 border-primary bg-background">
      <div className="mx-auto flex w-full max-w-[1180px] flex-wrap items-center gap-6 px-6 py-[14px]">
        <a href="#top" className="flex flex-none items-center gap-3">
          <img
            src={logo}
            alt="CONESESS"
            width={46}
            height={46}
            className="block h-[46px] w-[46px] rounded-full"
          />
          <span className="leading-none">
            <span className="block font-display text-[19px] font-extrabold leading-none tracking-[-0.01em] text-primary">
              CONESESS
            </span>
            <span className="label-mono mt-1 block text-secondary">
              Économie sociale et solidaire
            </span>
          </span>
        </a>

        <nav className="ml-auto hidden items-center gap-[22px] lg:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="label-mono border-b-2 border-transparent py-1 text-foreground transition-colors hover:border-leaf hover:text-secondary"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#adherer"
          className={cn(btn({ variant: "navy" }), "ml-auto hidden lg:inline-flex")}
        >
          Devenir membre
        </a>

        <button
          type="button"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setOpen((v) => !v)}
          className="ml-auto inline-flex h-11 w-11 items-center justify-center border-2 border-primary text-primary lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <nav className="border-t-2 border-primary bg-background px-6 py-4 lg:hidden">
          <ul className="space-y-1">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="label-mono block px-2 py-3 text-foreground/85 hover:text-secondary"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#adherer"
                onClick={() => setOpen(false)}
                className={cn(btn({ variant: "navy" }), "mt-2 w-full")}
              >
                Devenir membre
              </a>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
