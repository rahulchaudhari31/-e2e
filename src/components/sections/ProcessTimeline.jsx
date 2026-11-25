import { useRef } from 'react'
import { content } from '../../data/content.js'
import { useScrollReveal } from '../../hooks/useScrollReveal.js'
import Container from '../ui/Container.jsx'
import LazyImage from '../ui/LazyImage.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import styles from './ProcessTimeline.module.css'

export default function ProcessTimeline() {
  const scope = useRef(null)
  useScrollReveal(scope)

  return (
    <section className={styles.section} ref={scope}>
      <Container>
        <SectionHeading eyebrow="01 — 05" title="Strategy / Design / Develop / Marketing / Creative" align="center" />

        <div className={styles.timeline}>
          {content.home.process.map((step) => (
            <article className={styles.step} key={step.label} data-reveal>
              <div className={styles.number}>{step.number}</div>
              <div className={styles.image}>
                <LazyImage alt={`${step.title} process image from the original site`} src={step.image} />
              </div>
              <div className={styles.detail}>
                <h3 className={styles.title}>{step.title}</h3>
                <p className={styles.description}>{step.description}</p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
