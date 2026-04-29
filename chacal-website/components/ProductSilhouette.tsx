type Props = {
  type: 'tee' | 'hat'
  className?: string
}

export default function ProductSilhouette({ type, className = '' }: Props) {
  if (type === 'tee') {
    return (
      <svg
        viewBox="0 0 200 200"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M 60 35 L 80 25 Q 100 38 120 25 L 140 35 L 175 55 L 165 80 L 145 72 L 145 175 L 55 175 L 55 72 L 35 80 L 25 55 Z"
          fill="#1a1a1a"
          stroke="#2a2a2a"
          strokeWidth="1"
        />
        {/* Subtle chest area suggesting graphic */}
        <rect x="85" y="80" width="30" height="2" fill="#3a2a1a" opacity="0.6" />
      </svg>
    )
  }
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Cap crown */}
      <path
        d="M 55 110 Q 55 65 100 65 Q 145 65 145 110 Z"
        fill="#1a1a1a"
        stroke="#2a2a2a"
        strokeWidth="1"
      />
      {/* Brim */}
      <path
        d="M 40 110 Q 100 95 160 110 Q 165 120 100 122 Q 35 120 40 110 Z"
        fill="#161616"
        stroke="#2a2a2a"
        strokeWidth="1"
      />
      {/* Subtle front panel divide */}
      <line x1="100" y1="65" x2="100" y2="110" stroke="#0a0a0a" strokeWidth="1" />
    </svg>
  )
}
