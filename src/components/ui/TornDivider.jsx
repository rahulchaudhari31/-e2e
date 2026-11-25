import styles from './TornDivider.module.css'

export default function TornDivider({ color = 'var(--color-sun)', height = 46, flip = false }) {
  return (
    <div
      className={`${styles.divider} ${flip ? styles.flip : ''}`.trim()}
      style={{ '--divider-color': color, '--divider-height': `${height}px` }}
      aria-hidden="true"
    />
  )
}
