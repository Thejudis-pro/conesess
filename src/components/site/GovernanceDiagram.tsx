export function GovernanceDiagram() {
  return (
    <svg
      viewBox="0 0 900 460"
      role="img"
      aria-label="Diagramme de gouvernance : Bureau confédéral relié à l'Observatoire, l'Incubateur IAN-ESS et les Pôles sectoriels"
      className="block h-auto w-full font-mono"
    >
      <g stroke="#5FB84C" strokeWidth="2" fill="none">
        <line x1="450" y1="128" x2="150" y2="272" />
        <line x1="450" y1="128" x2="450" y2="272" />
        <line x1="450" y1="128" x2="750" y2="272" />
      </g>
      <g stroke="#EFA83A" strokeWidth="2" fill="none">
        <line x1="150" y1="360" x2="450" y2="410" />
        <line x1="750" y1="360" x2="450" y2="410" />
        <line x1="450" y1="360" x2="450" y2="410" />
      </g>

      <rect x="300" y="34" width="300" height="94" fill="#F7F5EE" />
      <text x="320" y="70" fill="#1E7A3C" fontSize="13" letterSpacing="1.6">
        ORGANE SOUVERAIN
      </text>
      <text
        x="320"
        y="102"
        fill="#1B2A56"
        fontSize="24"
        fontFamily="Poppins, sans-serif"
        fontWeight="700"
      >
        Bureau confédéral
      </text>

      <rect x="40" y="272" width="220" height="88" fill="#1E7A3C" />
      <text x="60" y="308" fill="#F7F5EE" fontSize="12" letterSpacing="1.4">
        ANALYSE
      </text>
      <text
        x="60"
        y="336"
        fill="#F7F5EE"
        fontSize="19"
        fontFamily="Poppins, sans-serif"
        fontWeight="700"
      >
        Observatoire
      </text>

      <rect x="340" y="272" width="220" height="88" fill="#5FB84C" />
      <text x="360" y="308" fill="#12251A" fontSize="12" letterSpacing="1.4">
        APPUI
      </text>
      <text
        x="360"
        y="336"
        fill="#12251A"
        fontSize="19"
        fontFamily="Poppins, sans-serif"
        fontWeight="700"
      >
        IAN-ESS
      </text>

      <rect x="640" y="272" width="220" height="88" fill="#EFA83A" />
      <text x="660" y="308" fill="#3A2606" fontSize="12" letterSpacing="1.4">
        FILIÈRES
      </text>
      <text
        x="660"
        y="336"
        fill="#3A2606"
        fontSize="19"
        fontFamily="Poppins, sans-serif"
        fontWeight="700"
      >
        Pôles sectoriels
      </text>

      <text
        x="450"
        y="440"
        fill="rgba(247,245,238,.8)"
        fontSize="13"
        letterSpacing="1.6"
        textAnchor="middle"
      >
        REMONTÉES DU TERRAIN — 14 RÉGIONS
      </text>
    </svg>
  );
}

const branches = [
  { label: "ANALYSE", title: "Observatoire", bg: "#1E7A3C", fg: "#F7F5EE" },
  { label: "APPUI", title: "IAN-ESS", bg: "#5FB84C", fg: "#12251A" },
  { label: "FILIÈRES", title: "Pôles sectoriels", bg: "#EFA83A", fg: "#3A2606" },
] as const;

export function GovernanceDiagramMobile() {
  return (
    <div className="flex flex-col items-center font-mono">
      <div className="w-full bg-[#F7F5EE] px-5 py-4 text-left">
        <div className="text-[11px] font-semibold tracking-[0.14em] text-[#1E7A3C]">
          ORGANE SOUVERAIN
        </div>
        <div className="mt-1 font-display text-lg font-bold text-[#1B2A56]">Bureau confédéral</div>
      </div>

      <span aria-hidden className="h-5 w-0.5 bg-leaf/60" />
      <p className="text-[10.5px] font-semibold tracking-[0.12em] text-primary-foreground/65">
        TROIS ORGANES TECHNIQUES
      </p>
      <span aria-hidden className="h-5 w-0.5 bg-leaf/60" />

      <div className="flex w-full flex-col gap-3">
        {branches.map((b) => (
          <div
            key={b.title}
            style={{ background: b.bg, color: b.fg }}
            className="px-5 py-4 text-left"
          >
            <div className="text-[11px] font-semibold tracking-[0.14em] opacity-90">{b.label}</div>
            <div className="mt-1 font-display text-base font-bold">{b.title}</div>
          </div>
        ))}
      </div>

      <div className="mt-5 w-full border-t-2 border-dashed border-gold/50 pt-4 text-center">
        <p className="text-[11px] font-semibold tracking-[0.14em] text-primary-foreground/80">
          FONDÉS SUR LES REMONTÉES DU TERRAIN — 14 RÉGIONS
        </p>
      </div>
    </div>
  );
}
