import { forwardRef } from 'react'
import styles from './MascotCharacter.module.css'

const PlugMascot = forwardRef(function PlugMascot({ className = '', accessory = '', ...props }, ref) {
  return (
    <div ref={ref} className={`${styles.mascot} ${className}`.trim()} aria-hidden="true" {...props}>
      <svg viewBox="0 0 180 200" role="presentation">
        <g className={styles.leg} data-leg="left">
          <path d="M74 132 L70 166" fill="none" stroke="var(--ink)" strokeWidth="8" strokeLinecap="round" />
          <ellipse cx="68" cy="172" rx="14" ry="7" fill="var(--ink)" />
        </g>
        <g className={styles.leg} data-leg="right">
          <path d="M106 132 L112 166" fill="none" stroke="var(--ink)" strokeWidth="8" strokeLinecap="round" />
          <ellipse cx="115" cy="172" rx="14" ry="7" fill="var(--ink)" />
        </g>

        <g className={styles.body} data-body>
          <rect x="67" y="16" width="14" height="46" rx="7" fill="var(--sun)" stroke="var(--ink)" strokeWidth="4" />
          <rect x="99" y="16" width="14" height="46" rx="7" fill="var(--sun)" stroke="var(--ink)" strokeWidth="4" />
          <rect x="48" y="54" width="84" height="86" rx="32" fill="var(--tomato)" stroke="var(--ink)" strokeWidth="4" />
          <path d="M60 70 Q90 54 120 70" fill="none" stroke="var(--sun)" strokeWidth="5" strokeLinecap="round" opacity="0.75" />

          <g className={styles.eyes}>
            <ellipse cx="76" cy="93" rx="14" ry="16" fill="var(--paper)" stroke="var(--ink)" strokeWidth="3" />
            <ellipse cx="104" cy="93" rx="14" ry="16" fill="var(--paper)" stroke="var(--ink)" strokeWidth="3" />
            <circle className={styles.pupil} data-pupil cx="76" cy="96" r="5" fill="var(--ink)" />
            <circle className={styles.pupil} data-pupil cx="104" cy="96" r="5" fill="var(--ink)" />
          </g>

          <path d="M78 121 Q90 133 102 121" fill="none" stroke="var(--ink)" strokeWidth="4" strokeLinecap="round" />
          <circle cx="57" cy="113" r="6" fill="var(--sun)" />
          <circle cx="123" cy="113" r="6" fill="var(--sun)" />
        </g>

        {accessory === 'browser' ? (
          <g className={styles.accessory} data-accessory="browser" stroke="var(--ink)" strokeWidth="4">
            <rect x="116" y="110" width="58" height="46" rx="8" fill="var(--paper)" />
            <path d="M116 124 H174" fill="none" />
            <circle cx="126" cy="117" r="2.5" fill="var(--tomato)" stroke="none" />
            <circle cx="136" cy="117" r="2.5" fill="var(--sun)" stroke="none" />
            <circle cx="146" cy="117" r="2.5" fill="var(--mint)" stroke="none" />
            <path d="M128 136 H150 M128 145 H164" fill="none" strokeLinecap="round" />
          </g>
        ) : null}

        {accessory === 'phone' ? (
          <g className={styles.accessory} data-accessory="phone" stroke="var(--ink)" strokeWidth="4">
            <rect x="124" y="86" width="44" height="76" rx="10" fill="var(--sun)" />
            <rect x="131" y="98" width="30" height="48" rx="4" fill="var(--paper)" />
            <path d="M139 150 H153" fill="none" strokeLinecap="round" />
            <circle cx="146" cy="93" r="2" fill="var(--ink)" stroke="none" />
          </g>
        ) : null}

        {accessory === 'megaphone' ? (
          <g className={styles.accessory} data-accessory="megaphone" stroke="var(--ink)" strokeWidth="4" strokeLinejoin="round">
            <path d="M122 104 L166 88 L166 132 L122 116 Z" fill="var(--sun)" />
            <rect x="108" y="103" width="20" height="18" rx="5" fill="var(--violet)" />
            <path d="M174 98 Q188 110 174 124" fill="none" strokeLinecap="round" />
            <path d="M116 122 L112 138" fill="none" strokeLinecap="round" />
          </g>
        ) : null}
      </svg>
    </div>
  )
})

export default PlugMascot
