import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-[1180px] px-6", className)}>{children}</div>;
}

export function Section({
  id,
  tone = "paper",
  divider = true,
  className,
  containerClassName,
  children,
}: {
  id?: string;
  tone?: "paper" | "navy";
  divider?: boolean;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
}) {
  const tones = {
    paper: "bg-background text-foreground",
    navy: "bg-primary text-primary-foreground",
  } as const;

  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-[100px]",
        tones[tone],
        divider && "border-b-2 border-primary",
        className,
      )}
    >
      <Container className={cn("py-14 sm:py-20 lg:py-[110px]", containerClassName)}>
        {children}
      </Container>
    </section>
  );
}

export function Eyebrow({
  children,
  tone = "green",
  className,
}: {
  children: ReactNode;
  tone?: "green" | "leaf";
  className?: string;
}) {
  return (
    <p className={cn("label-mono", tone === "green" ? "text-secondary" : "text-leaf", className)}>
      {children}
    </p>
  );
}

export function EyebrowRule({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("label-mono flex items-center gap-3 text-secondary", className)}>
      <span aria-hidden className="block h-0.5 w-[34px] bg-gold" />
      {children}
    </p>
  );
}

export const btn = cva(
  "inline-flex items-center justify-start gap-2 border-2 px-7 py-4 font-mono text-[13px] font-medium uppercase tracking-[0.08em] transition-colors focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2",
  {
    variants: {
      variant: {
        navy: "border-primary bg-primary text-primary-foreground hover:border-secondary hover:bg-secondary",
        outline: "border-primary bg-transparent text-primary hover:border-gold hover:bg-gold",
        onDark:
          "border-leaf/45 bg-transparent text-primary-foreground hover:border-gold hover:text-gold",
        onDarkSolid:
          "border-primary-foreground bg-primary-foreground text-primary hover:border-secondary hover:bg-secondary hover:text-primary-foreground",
      },
      size: {
        sm: "px-5 py-2.5 text-[12.5px]",
        md: "px-5 py-[11px] text-[12.5px]",
        lg: "px-7 py-4 text-[13px]",
      },
    },
    defaultVariants: { variant: "navy", size: "md" },
  },
);

export type BtnProps = VariantProps<typeof btn>;

export function Chip({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span
      style={style}
      className={cn(
        "label-mono inline-flex items-center justify-center px-4 py-3 text-center",
        className,
      )}
    >
      {children}
    </span>
  );
}
