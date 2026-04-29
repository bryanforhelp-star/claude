type FlameParams = [cx: number, halfW: number, tipY: number, curlX: number]

const BASE_Y = 370
const VIEW_H = 420

function flamePath(cx: number, hw: number, tipY: number, curlX: number): string {
  const tipX = cx + curlX
  const span = BASE_Y - tipY

  const lc1x = cx - hw * 0.75
  const lc1y = BASE_Y - span * 0.3
  const lc2x = tipX - hw * 0.3
  const lc2y = tipY + span * 0.38

  const rc1x = tipX + hw * 0.38
  const rc1y = tipY + span * 0.32
  const rc2x = cx + hw * 0.82
  const rc2y = BASE_Y - span * 0.42

  return (
    `M ${cx - hw} ${BASE_Y} ` +
    `C ${lc1x} ${lc1y} ${lc2x} ${lc2y} ${tipX} ${tipY} ` +
    `C ${rc1x} ${rc1y} ${rc2x} ${rc2y} ${cx + hw} ${BASE_Y} Z`
  )
}

const flameData: FlameParams[] = [
  [0,    60,  160,  20],
  [130,  72,   55, -18],
  [270,  65,  140,  22],
  [400,  78,   25, -28],
  [545,  88,  -15,  35],
  [700,  92,    0, -30],
  [855,  80,   18,  28],
  [1000, 68,  105, -18],
  [1140, 76,   40,  22],
  [1280, 70,   80, -20],
  [1400, 58,  130,  16],
  [1470, 50,  170, -12],
]

type Props = {
  className?: string
  style?: React.CSSProperties
  flip?: boolean
}

import React from 'react'

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
        <linearGradient id="baseGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6b1010" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#3d0808" stopOpacity="1" />
        </linearGradient>
      </defs>

      {/* Base band */}
      <rect x="0" y={BASE_Y} width="1440" height={VIEW_H - BASE_Y} fill="#6b1010" />

      {/* Gold outer flames */}
      {flameData.map(([cx, hw, tipY, curlX], i) => (
        <path
          key={`g${i}`}
          d={flamePath(cx, hw + 7, tipY - 12, curlX * 0.9)}
          fill="#c4922a"
        />
      ))}

      {/* Red inner flames */}
      {flameData.map(([cx, hw, tipY, curlX], i) => (
        <path
          key={`r${i}`}
          d={flamePath(cx, hw, tipY, curlX)}
          fill="#8b1a1a"
        />
      ))}

      {/* Base overlay gradient */}
      <rect x="0" y={BASE_Y} width="1440" height={VIEW_H - BASE_Y} fill="url(#baseGrad)" />
    </svg>
  )
}
