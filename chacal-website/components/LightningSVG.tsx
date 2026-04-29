type Props = {
  className?: string
  style?: React.CSSProperties
  opacity?: number
}

// Hand-crafted lightning bolt paths — jagged, branching like cracks
const bolts = [
  // Main center bolt with branches
  'M 300 0 L 285 90 L 315 130 L 280 220 L 320 280 L 290 380 L 330 460 L 295 580 L 320 680 L 285 800',
  'M 285 90 L 240 140 L 265 200',
  'M 280 220 L 230 270 L 250 340',
  'M 320 280 L 365 340 L 340 410',
  'M 290 380 L 245 450 L 270 510',
  'M 295 580 L 245 640 L 270 710',
  // Left side bolt
  'M 100 0 L 130 80 L 90 150 L 125 230 L 85 320 L 120 410 L 80 510 L 110 620 L 75 730 L 95 800',
  'M 90 150 L 50 210 L 75 280',
  'M 120 410 L 80 470 L 105 540',
  'M 110 620 L 70 680 L 95 760',
  // Right side bolt
  'M 500 0 L 470 70 L 510 140 L 475 220 L 515 310 L 485 400 L 520 490 L 490 590 L 525 690 L 500 800',
  'M 510 140 L 555 200 L 530 270',
  'M 515 310 L 565 380 L 540 450',
  'M 525 690 L 575 750 L 550 800',
  // Far left fragment
  'M 30 100 L 60 180 L 25 270 L 50 360 L 20 450',
  'M 60 180 L 95 240',
  'M 50 360 L 85 430',
  // Far right fragment
  'M 580 50 L 555 130 L 590 220 L 560 310 L 595 410',
  'M 555 130 L 520 200',
  'M 595 410 L 565 470',
  // Mid-left branches
  'M 180 30 L 160 110 L 195 200 L 170 290 L 200 380 L 175 470 L 205 560',
  'M 195 200 L 230 260',
  'M 200 380 L 235 440',
  // Mid-right branches
  'M 410 60 L 430 140 L 405 230 L 435 320 L 410 410 L 440 500 L 415 590 L 445 690',
  'M 435 320 L 470 380',
  'M 415 590 L 380 660',
]

export default function LightningSVG({ className = '', style, opacity = 0.45 }: Props) {
  return (
    <svg
      viewBox="0 0 600 800"
      className={className}
      style={style}
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <filter id="boltGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Wide soft glow layer */}
      <g opacity={opacity * 0.55}>
        {bolts.map((d, i) => (
          <path
            key={`g-${i}`}
            d={d}
            stroke="#dc2626"
            strokeWidth={4}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            filter="url(#boltGlow)"
          />
        ))}
      </g>

      {/* Sharp red lines */}
      <g opacity={opacity}>
        {bolts.map((d, i) => (
          <path
            key={`s-${i}`}
            d={d}
            stroke="#ef4444"
            strokeWidth={1.2}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        ))}
      </g>

      {/* Bright cores on main bolts */}
      <g opacity={opacity * 0.9}>
        {bolts.slice(0, 3).map((d, i) => (
          <path
            key={`c-${i}`}
            d={d}
            stroke="#fca5a5"
            strokeWidth={0.4}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        ))}
      </g>
    </svg>
  )
}
