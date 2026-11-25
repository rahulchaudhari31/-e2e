import styles from './Mascot.module.css'

export default function SignalMascot({ className = '' }) {
  return (
    <div className={`${styles.mascot} ${styles.signal} ${className}`.trim()} aria-hidden="true">
      <svg viewBox="0 0 220 220" role="presentation">
        <defs>
          <linearGradient id="signal-body" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c8ff5a" />
            <stop offset="100%" stopColor="#38e8ff" />
          </linearGradient>
        </defs>
        <path d="M110 16 L184 58 L184 152 L110 194 L36 152 L36 58 Z" fill="none" stroke="#ff4fa3" strokeWidth="2" opacity="0.5" />
        <rect x="58" y="58" width="104" height="94" rx="28" fill="#101219" stroke="url(#signal-body)" strokeWidth="3" />
        <rect x="76" y="76" width="68" height="38" rx="12" fill="#08090c" stroke="#38e8ff" strokeWidth="2" />
        <path className={styles.pulse} d="M82 106 L94 106 L101 88 L110 116 L118 98 L126 106 L138 106" fill="none" stroke="#c8ff5a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="86" cy="132" r="5" fill="#ff4fa3" />
        <circle cx="110" cy="132" r="5" fill="#c8ff5a" />
        <circle cx="134" cy="132" r="5" fill="#38e8ff" />
        <path d="M92 168 L92 184 M128 168 L128 184" stroke="#f5f5f7" strokeWidth="4" strokeLinecap="round" />
      </svg>
    </div>
  )
}
