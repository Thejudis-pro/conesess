import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function Section({
  id,
  tone = "paper",
  className,
  children,
}: {
  id?: string;
  tone?: "paper" | "navy" | "green" | "card";
  className?: string;
  children: ReactNode;
}) {
  const tones = {
    paper: "bg-background text-foreground",
    card: "bg-card text-card-foreground",
    navy: "bg-primary text-primary-foreground",
    green: "bg-secondary text-secondary-foreground",
  } as const;

  return (
    <section id={id} className={cn("scroll-mt-24 border-b border-border/60", tones[tone], className)}>
      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20 lg:py-24">{children}</div>
    </section>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("label-mono text-secondary", className)}>
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  inverted = false,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  inverted?: boolean;
}) {
  return (
    <header className="max-w-3xl">
      {eyebrow ? (
        <Eyebrow className={inverted ? "text-gold" : undefined}>{eyebrow}</Eyebrow>
      ) : null}
      <h2 className="mt-3 text-2xl leading-tight sm:text-3xl lg:text-4xl">{title}</h2>
      {intro ? (
        <p className={cn("mt-4 text-base leading-relaxed", inverted ? "opacity-85" : "text-muted-foreground")}>
          {intro}
        </p>
      ) : null}
    </header>
  );
}

const cardVariants = cva("rounded-lg border p-6 transition-colors", {
  variants: {
    variant: {
      default: "border-border bg-card text-card-foreground hover:border-secondary/60",
      outline: "border-primary/20 bg-transparent text-foreground",
      inverted: "border-primary-foreground/20 bg-primary-foreground/5 text-primary-foreground",
      gold: "border-gold/50 bg-gold/10 text-foreground",
    },
  },
  defaultVariants: { variant: "default" },
});

export function Card({
  className,
  variant,
  children,
}: VariantProps<typeof cardVariants> & { className?: string; children: ReactNode }) {
  return <div className={cn(cardVariants({ variant }), className)}>{children}</div>;
}

export const btn = cva(
  "inline-flex items-center justify-center gap-2 rounded-md font-display font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        primary: "bg-gold text-gold-foreground hover:bg-gold/85",
        navy: "bg-primary text-primary-foreground hover:bg-primary/90",
        green: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
        outline: "border border-primary/30 bg-transparent text-primary hover:bg-primary/5",
        ghostLight: "border border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10",
      },
      size: {
        sm: "h-9 px-3 text-xs",
        md: "h-11 px-5 text-sm",
        lg: "h-12 px-6 text-sm sm:text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export type BtnProps = VariantProps<typeof btn>;

export function Chip({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "label-mono inline-flex items-center rounded-full border border-primary-foreground/30 bg-primary-foreground/10 px-3 py-2 text-center",
        className,
      )}
    >
      {children}
    </span>
  );
}
