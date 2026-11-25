import styles from './Mascot.module.css'

export default function OrbitMascot({ className = '' }) {
  return (
    <div className={`${styles.mascot} ${className}`.trim()} aria-hidden="true">
      <svg viewBox="0 0 220 220" role="presentation">
        <defs>
          <linearGradient id="orbit-core" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ff4fa3" />
            <stop offset="100%" stopColor="#38e8ff" />
          </linearGradient>
        </defs>
        <g className={styles.orbit}>
          <ellipse cx="110" cy="110" rx="98" ry="42" fill="none" stroke="#38e8ff" strokeWidth="2" opacity="0.55" />
          <ellipse cx="110" cy="110" rx="98" ry="42" fill="none" stroke="#c8ff5a" strokeWidth="2" opacity="0.35" transform="rotate(60 110 110)" />
          <ellipse cx="110" cy="110" rx="98" ry="42" fill="none" stroke="#ff4fa3" strokeWidth="2" opacity="0.45" transform="rotate(120 110 110)" />
        </g>
        <circle cx="110" cy="110" r="54" fill="#101219" stroke="url(#orbit-core)" strokeWidth="3" />
        <circle cx="91" cy="102" r="7" fill="#f5f5f7" />
        <circle cx="129" cy="102" r="7" fill="#f5f5f7" />
        <circle cx="93" cy="104" r="3" fill="#38e8ff" />
        <circle cx="131" cy="104" r="3" fill="#38e8ff" />
        <path d="M92 130 Q110 145 128 130" fill="none" stroke="#ff4fa3" strokeWidth="4" strokeLinecap="round" />
        <circle className={styles.satellite} cx="208" cy="110" r="8" fill="#c8ff5a" />
      </svg>
    </div>
  )
}
