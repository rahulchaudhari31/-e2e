import styles from './RouteFallback.module.css'

export default function RouteFallback() {
  return (
    <div className={styles.fallback} role="status" aria-live="polite">
      <span className={styles.plug} aria-hidden="true" />
      <span className={styles.label}>Loading page…</span>
    </div>
  )
}
