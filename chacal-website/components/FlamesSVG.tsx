import React from 'react'

type FlameParams = [cx: number, halfW: number, tipY: number, curlX: number]

const BASE_Y = 380
const VIEW_H = 420

// Sharper, more stencil-like flame: control points pushed close to the tip
function flamePath(cx: number, hw: number, tipY: number, curlX: number): string {
  const tipX = cx + curlX
  const span = BASE_Y - tipY

  const lc1x = cx - hw * 0.85
  const lc1y = BASE_Y - span * 0.18
  const lc2x = tipX - hw * 0.18
  const lc2y = tipY + span * 0.18

  const rc1x = tipX + hw * 0.22
  const rc1y = tipY + span * 0.22
  const rc2x = cx + hw * 0.85
  const rc2y = BASE_Y - span * 0.15

  return (
    `M ${cx - hw} ${BASE_Y} ` +
    `C ${lc1x} ${lc1y} ${lc2x} ${lc2y} ${tipX} ${tipY} ` +
    `C ${rc1x} ${rc1y} ${rc2x} ${rc2y} ${cx + hw} ${BASE_Y} Z`
  )
}

const flameData: FlameParams[] = [
  [40,    52,  220,  16],
  [160,   62,  130, -14],
  [280,   58,  200,  18],
  [395,   72,   80, -22],
  [520,   80,   30,  26],
  [650,   85,   10, -22],
  [780,   75,   60,  20],
  [905,   62,  150, -16],
  [1025,  72,   95,  18],
  [1155,  68,  140, -16],
  [1280,  60,  190,  14],
  [1390,  54,  220, -12],
]

type Props = {
  className?: string
  style?: React.CSSProperties
  flip?: boolean
}

export default function FlamesSVG({ className = '', style, flip = false }: Props) {
  return (
    <svg
      viewBox={`0 0 1440 ${VIEW_H}`}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      style={flip ? { transform: 'scaleY(-1)', ...style } : style}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="flameBaseGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7a1414" stopOpacity="1" />
          <stop offset="100%" stopColor="#3d0808" stopOpacity="1" />
        </linearGradient>
      </defs>

      {/* Base band */}
      <rect x="0" y={BASE_Y} width="1440" height={VIEW_H - BASE_Y} fill="url(#flameBaseGrad)" />

      {/* Gold outline flames (drawn slightly larger) */}
      {flameData.map(([cx, hw, tipY, curlX], i) => (
        <path
          key={`g${i}`}
          d={flamePath(cx, hw + 5, tipY - 9, curlX * 0.92)}
          fill="#a87a1f"
        />
      ))}

      {/* Red inner flames */}
      {flameData.map(([cx, hw, tipY, curlX], i) => (
        <path
          key={`r${i}`}
          d={flamePath(cx, hw, tipY, curlX)}
          fill="#7a1414"
        />
      ))}

      {/* Gold outline along the base */}
      <rect x="0" y={BASE_Y - 2} width="1440" height="3" fill="#a87a1f" />
    </svg>
  )
}
