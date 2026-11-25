import { content } from '../../data/content.js'
import Button from '../ui/Button.jsx'
import Container from '../ui/Container.jsx'
import styles from './FooterCta.module.css'

const cta = content.home.cta

export default function FooterCta() {
  return (
    <section className={styles.section}>
      <Container className={styles.inner}>
        <span className={styles.eyebrow}>{content.meta.siteName}</span>
        <h2 className={styles.title}>{cta.heading}</h2>
        {cta.body.map((paragraph) => (
          <p className={styles.body} key={paragraph}>
            {paragraph}
          </p>
        ))}
        <div className={styles.actions}>
          <Button to="/contact">{cta.buttons[0]}</Button>
          <Button to="/contact" variant="outline">
            {cta.buttons[1]}
          </Button>
        </div>
      </Container>
    </section>
  )
}
