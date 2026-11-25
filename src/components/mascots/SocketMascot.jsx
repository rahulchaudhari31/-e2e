import { forwardRef } from 'react'
import styles from './MascotCharacter.module.css'

const SocketMascot = forwardRef(function SocketMascot({ className = '', ...props }, ref) {
  return (
    <div ref={ref} className={`${styles.mascot} ${className}`.trim()} aria-hidden="true" {...props}>
      <svg viewBox="0 0 180 200" role="presentation">
        <g className={styles.leg} data-leg="left">
          <path d="M74 132 L68 166" fill="none" stroke="var(--ink)" strokeWidth="8" strokeLinecap="round" />
          <ellipse cx="66" cy="172" rx="14" ry="7" fill="var(--ink)" />
        </g>
        <g className={styles.leg} data-leg="right">
          <path d="M106 132 L114 166" fill="none" stroke="var(--ink)" strokeWidth="8" strokeLinecap="round" />
          <ellipse cx="117" cy="172" rx="14" ry="7" fill="var(--ink)" />
        </g>

        <g className={styles.body} data-body>
          <rect x="46" y="48" width="88" height="92" rx="34" fill="var(--violet)" stroke="var(--ink)" strokeWidth="4" />
          <rect x="70" y="24" width="12" height="30" rx="6" fill="var(--ink)" />
          <rect x="98" y="24" width="12" height="30" rx="6" fill="var(--ink)" />
          <path d="M58 66 Q90 52 122 66" fill="none" stroke="var(--lilac)" strokeWidth="5" strokeLinecap="round" opacity="0.85" />

          <g className={styles.eyes}>
            <ellipse cx="76" cy="94" rx="14" ry="16" fill="var(--paper)" stroke="var(--ink)" strokeWidth="3" />
            <ellipse cx="104" cy="94" rx="14" ry="16" fill="var(--paper)" stroke="var(--ink)" strokeWidth="3" />
            <circle className={styles.pupil} data-pupil cx="76" cy="97" r="5" fill="var(--ink)" />
            <circle className={styles.pupil} data-pupil cx="104" cy="97" r="5" fill="var(--ink)" />
          </g>

          <path d="M80 122 Q90 131 100 122" fill="none" stroke="var(--ink)" strokeWidth="4" strokeLinecap="round" />
          <circle cx="56" cy="114" r="6" fill="var(--lilac)" />
          <circle cx="124" cy="114" r="6" fill="var(--lilac)" />
        </g>
      </svg>
    </div>
  )
})

export default SocketMascot
