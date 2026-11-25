import Reveal from './Reveal.jsx'
import HighlightText from './HighlightText.jsx'
import styles from './SectionHeading.module.css'

export default function SectionHeading({ eyebrow, title, body, align = 'left', className = '' }) {
  return (
    <Reveal className={`${styles.wrapper} ${styles[align] || ''} ${className}`.trim()}>
      {eyebrow ? <span className={styles.eyebrow}>{eyebrow}</span> : null}
      {title ? (
        <h2 className={styles.title}>
          <HighlightText>{title}</HighlightText>
        </h2>
      ) : null}
      {body ? <p className={styles.body}>{body}</p> : null}
      <span className={styles.rule} aria-hidden="true" />
    </Reveal>
  )
}
