export function GovernanceDiagram() {
  return (
    <svg
      viewBox="0 0 520 340"
      role="img"
      aria-label="Diagramme des relations entre l'Observatoire, l'Incubateur et les Pôles Sectoriels"
      className="h-auto w-full"
    >
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="currentColor" />
        </marker>
      </defs>

      <g className="text-secondary" stroke="currentColor" strokeWidth="1.6" strokeDasharray="5 5" markerEnd="url(#arrow)" fill="none">
        <line x1="150" y1="82" x2="370" y2="82" />
        <line x1="262" y1="262" x2="332" y2="112" />
        <line x1="248" y1="262" x2="178" y2="112" />
      </g>

      <g>
        <rect x="24" y="46" width="126" height="72" rx="6" className="fill-primary" />
        <text x="87" y="78" textAnchor="middle" className="fill-primary-foreground font-display" fontSize="13" fontWeight="700">
          Observatoire
        </text>
        <text x="87" y="96" textAnchor="middle" className="fill-primary-foreground" fontSize="10" opacity="0.8">
          ON-ESS
        </text>

        <rect x="370" y="46" width="126" height="72" rx="6" className="fill-secondary" />
        <text x="433" y="78" textAnchor="middle" className="fill-primary-foreground font-display" fontSize="13" fontWeight="700">
          Incubateur
        </text>
        <text x="433" y="96" textAnchor="middle" className="fill-primary-foreground" fontSize="10" opacity="0.85">
          IAN-ESS
        </text>

        <rect x="192" y="262" width="136" height="66" rx="6" className="fill-gold" />
        <text x="260" y="292" textAnchor="middle" className="fill-gold-foreground font-display" fontSize="13" fontWeight="700">
          Pôles Sectoriels
        </text>
        <text x="260" y="310" textAnchor="middle" className="fill-gold-foreground" fontSize="10" opacity="0.75">
          4 pôles
        </text>
      </g>

      <g className="fill-muted-foreground font-mono" fontSize="9">
        <text x="260" y="72" textAnchor="middle">guidage scientifique</text>
        <text x="352" y="200" textAnchor="middle">apport métier</text>
        <text x="150" y="200" textAnchor="middle">collecte technique</text>
      </g>
    </svg>
  );
}
