/** Decorative NikTrust hero illustration: three abstract evaluation cards (broker, exchange, prop firm) linked to a verification shield. No text, logos or figures. */
function Bars({ x, y, w }: { x: number; y: number; w: number[] }) {
  return <g>{w.map((v, i) => <g key={i}><rect x={x} y={y + i * 18} width={120} height={7} rx={3.5} className="hi-track"/><rect x={x + 120 - v} y={y + i * 18} width={v} height={7} rx={3.5} className="hi-bar"/></g>)}</g>;
}
function Lines({ x, y }: { x: number; y: number }) {
  return <g><rect x={x + 30} y={y} width={90} height={8} rx={4} className="hi-ink"/><rect x={x + 60} y={y + 16} width={60} height={6} rx={3} className="hi-track"/></g>;
}
export function HeroIllustration() {
  return (
    <svg className="nt-hero-art" viewBox="0 0 560 440" role="presentation" aria-hidden="true" focusable="false">
      <defs>
        <filter id="hi-shadow" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#1A1A2E" floodOpacity=".08"/></filter>
      </defs>
      {/* backdrop geometry */}
      <circle cx="290" cy="220" r="190" className="hi-halo"/>
      <circle cx="290" cy="220" r="130" className="hi-ring"/>
      <g className="hi-grid">{[0, 1, 2, 3, 4, 5].map(i => <circle key={i} cx={70 + i * 84} cy={410} r={2.5}/>)}{[0, 1, 2, 3, 4, 5].map(i => <circle key={'t' + i} cx={70 + i * 84} cy={30} r={2.5}/>)}</g>
      {/* connectors */}
      <path d="M180 140 C 240 140, 250 220, 290 220" className="hi-link"/>
      <path d="M400 110 C 360 130, 330 190, 290 220" className="hi-link"/>
      <path d="M200 330 C 240 300, 260 240, 290 220" className="hi-link"/>

      {/* broker card */}
      <g className="hi-float hi-float--a"><g filter="url(#hi-shadow)">
        <rect x="40" y="70" width="190" height="140" rx="16" className="hi-card"/>
        <rect x="180" y="88" width="32" height="32" rx="9" className="hi-chip"/>
        <path d="M188 110 l6 -8 l6 4 l6 -9" className="hi-stroke"/>
        <Lines x={52} y={92}/>
        <Bars x={92} y={140} w={[96, 70, 108]}/>
        <circle cx="70" cy="153" r="12" className="hi-check-bg"/><path d="M64 153 l4 4 l8 -8" className="hi-check"/>
      </g></g>

      {/* exchange card (front) */}
      <g className="hi-float hi-float--b"><g filter="url(#hi-shadow)">
        <rect x="310" y="40" width="210" height="160" rx="16" className="hi-card"/>
        <rect x="470" y="58" width="32" height="32" rx="16" className="hi-chip"/>
        <path d="M478 74 h16 M486 66 v16" className="hi-stroke"/>
        <Lines x={330} y={62}/>
        <path d="M330 170 L362 150 L390 160 L420 128 L452 140 L500 110" className="hi-chart"/>
        <path d="M330 170 L362 150 L390 160 L420 128 L452 140 L500 110 L500 182 L330 182 Z" className="hi-chart-fill"/>
      </g></g>

      {/* prop firm card */}
      <g className="hi-float hi-float--c"><g filter="url(#hi-shadow)">
        <rect x="70" y="262" width="200" height="140" rx="16" className="hi-card"/>
        <rect x="220" y="280" width="32" height="32" rx="9" className="hi-chip"/>
        <path d="M228 304 v-8 M236 304 v-14 M244 304 v-5" className="hi-stroke"/>
        <Lines x={90} y={284}/>
        <g>{[0, 1, 2].map(i => <g key={i}><circle cx={232 - i * 0} cy={340 + i * 20} r={6} className={i < 2 ? 'hi-dot-on' : 'hi-dot-off'}/><rect x={100} y={337 + i * 20} width={118} height={6} rx={3} className="hi-track"/></g>)}</g>
      </g></g>

      {/* comparison panel */}
      <g className="hi-float hi-float--d"><g filter="url(#hi-shadow)">
        <rect x="330" y="250" width="180" height="120" rx="16" className="hi-card"/>
        {[0, 1, 2].map(i => <g key={i}><rect x={350 + i * 52} y={350 - [56, 76, 44][i]!} width={34} height={[56, 76, 44][i]} rx={6} className={i === 1 ? 'hi-bar' : 'hi-col'}/></g>)}
        <path d="M350 356 h140" className="hi-base"/>
      </g></g>

      {/* central verification shield */}
      <g className="hi-shield">
        <circle cx="290" cy="220" r="40" className="hi-shield-bg"/>
        <path d="M290 194 l22 8 v16 c0 15 -10 25 -22 30 c-12 -5 -22 -15 -22 -30 v-16 z" className="hi-shield-body"/>
        <path d="M280 220 l7 7 l13 -14" className="hi-shield-check"/>
      </g>
      {/* source indicators */}
      <g className="hi-src"><circle cx="520" cy="230" r="5"/><circle cx="28" cy="236" r="5"/><circle cx="300" cy="420" r="4"/></g>
    </svg>
  );
}
