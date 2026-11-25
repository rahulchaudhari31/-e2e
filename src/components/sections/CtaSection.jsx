import { content } from '../../data/content.js'
import Button from '../ui/Button.jsx'
import Container from '../ui/Container.jsx'
import HighlightText from '../ui/HighlightText.jsx'
import Reveal from '../ui/Reveal.jsx'
import SignalMascot from '../mascots/SignalMascot.jsx'
import styles from './CtaSection.module.css'

const fallback = content.home.cta

export default function CtaSection({ heading = fallback.heading, body = fallback.body, buttons = fallback.buttons }) {
  const paragraphs = Array.isArray(body) ? body : [body]

  return (
    <section className={styles.section}>
      <Container className={styles.inner}>
        <Reveal className={styles.copy}>
          <span className={styles.eyebrow}>{content.home.hero.cta}</span>
          <h2 className={styles.title}>
            <HighlightText>{heading}</HighlightText>
          </h2>
          <div className={styles.body}>
            {paragraphs.map((paragraph, index) => (
              <p key={`${paragraph.slice(0, 24)}-${index}`}>{paragraph}</p>
            ))}
          </div>
          <div className={styles.actions}>
            {(buttons || []).map((label, index) => (
              <Button to="/contact" variant={index === 0 ? 'solid' : 'outline'} key={`${label}-${index}`}>
                {label}
              </Button>
            ))}
          </div>
        </Reveal>

        <SignalMascot className={styles.mascot} />
      </Container>
    </section>
  )
}
