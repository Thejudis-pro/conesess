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
