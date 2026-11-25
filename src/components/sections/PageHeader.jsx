import Breadcrumbs from '../ui/Breadcrumbs.jsx'
import Container from '../ui/Container.jsx'
import SignalMascot from '../mascots/SignalMascot.jsx'
import styles from './PageHeader.module.css'

export default function PageHeader({ title, subtitle, breadcrumbs = [], eyebrow }) {
  return (
    <section className={styles.header}>
      <Container className={styles.inner}>
        <div className={styles.copy}>
          {breadcrumbs.length ? <Breadcrumbs items={breadcrumbs} /> : null}
          {eyebrow ? <span className={styles.eyebrow}>{eyebrow}</span> : null}
          <h1 className={styles.title}>{title}</h1>
          {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
        </div>
        <SignalMascot className={styles.mascot} />
      </Container>
    </section>
  )
}
