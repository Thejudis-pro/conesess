import logo from "@/assets/conesess-logo.png";

const typologies = [
  {
    id: "T1",
    label: "Incubateur territorial",
    left: "50%",
    top: "13%",
    bg: "#1B2A56",
    fg: "#F7F5EE",
    tag: "#EFA83A",
  },
  {
    id: "T2",
    label: "Incubateur agricole",
    left: "85%",
    top: "39%",
    bg: "#1E7A3C",
    fg: "#F7F5EE",
    tag: "#EFA83A",
  },
  {
    id: "T3",
    label: "Incubateur artisanal & culturel",
    left: "72%",
    top: "80%",
    bg: "#5FB84C",
    fg: "#12251A",
    tag: "#1B2A56",
  },
  {
    id: "T4",
    label: "Incubateur numérique",
    left: "28%",
    top: "80%",
    bg: "#EFA83A",
    fg: "#3A2606",
    tag: "#1B2A56",
  },
  {
    id: "T5",
    label: "Incubateur jeunesse & femmes",
    left: "15%",
    top: "39%",
    bg: "#1B2A56",
    fg: "#F7F5EE",
    tag: "#EFA83A",
  },
] as const;

export function IanEssDiagram() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[680px]">
      <span
        aria-hidden
        className="absolute left-1/2 top-1/2 aspect-square w-[74%] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-secondary/35"
      />
      <span className="absolute left-1/2 top-1/2 flex aspect-square w-[32%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-1 rounded-full border-2 border-primary bg-background">
        <img src={logo} alt="" className="block h-auto w-[52%] rounded-full" />
        <span className="label-mono text-[clamp(9px,1.4vw,12px)] text-primary">IAN-ESS</span>
      </span>

      {typologies.map((t) => (
        <div
          key={t.id}
          style={{ left: t.left, top: t.top, background: t.bg, color: t.fg }}
          className="absolute w-[31%] -translate-x-1/2 -translate-y-1/2 p-[clamp(10px,1.6vw,18px)] transition-transform duration-200 ease-out hover:-translate-y-[54%]"
        >
          <div style={{ color: t.tag }} className="label-mono mb-1.5">
            {t.id}
          </div>
          <div className="font-display text-[clamp(12px,1.5vw,17px)] font-bold leading-tight">
            {t.label}
          </div>
        </div>
      ))}
    </div>
  );
}
