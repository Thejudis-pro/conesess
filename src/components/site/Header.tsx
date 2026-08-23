import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import logo from "@/assets/conesess-logo.png";
import { btn } from "@/components/site/primitives";
import { cn } from "@/lib/utils";

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
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <a href="#hero" className="flex items-center gap-3">
          <img src={logo} alt="Logo du CONESESS" width={48} height={48} className="h-11 w-11" />
          <span className="leading-tight">
            <span className="block font-display text-base font-extrabold text-primary">CONESESS</span>
            <span className="label-mono block text-[0.55rem] text-muted-foreground">
              Économie sociale et solidaire
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-6 lg:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-secondary"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href="#adherer" className={cn(btn({ size: "sm" }), "hidden sm:inline-flex")}>
            Adhérer
          </a>
          <Link to="/admin" className={cn(btn({ variant: "outline", size: "sm" }), "hidden lg:inline-flex")}>
            Admin
          </Link>
          <button
            type="button"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border text-primary lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <nav className="border-t border-border bg-card px-5 py-4 lg:hidden">
          <ul className="space-y-1">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-2 py-2 text-sm font-medium text-foreground/85 hover:bg-accent"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#adherer"
                onClick={() => setOpen(false)}
                className={cn(btn({ size: "sm" }), "mt-2 w-full")}
              >
                Adhérer
              </a>
            </li>
            <li>
              <Link to="/admin" className={cn(btn({ variant: "outline", size: "sm" }), "mt-2 w-full")}>
                Espace admin
              </Link>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
