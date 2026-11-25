import styles from './Marquee.module.css'

export default function Marquee({
  items = [],
  speed = 24,
  reverse = false,
  className = '',
  color = 'var(--ink)',
  textColor = 'var(--paper)',
}) {
  const content = items.map((item, index) => (
    <span className={styles.item} key={`${item}-${index}`}>
      {item}
      <span className={styles.star} aria-hidden="true">
        ✳
      </span>
    </span>
  ))

  return (
    <div
      className={`${styles.marquee} ${reverse ? styles.reverse : ''} ${className}`.trim()}
      style={{ '--marquee-speed': `${speed}s`, '--marquee-bg': color, '--marquee-fg': textColor }}
      aria-hidden="true"
    >
      <div className={styles.track}>
        {content}
        {content}
      </div>
    </div>
  )
}
