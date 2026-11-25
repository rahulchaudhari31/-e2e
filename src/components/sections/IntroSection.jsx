import Reveal from '../ui/Reveal.jsx'
import Container from '../ui/Container.jsx'
import LazyImage from '../ui/LazyImage.jsx'
import styles from './IntroSection.module.css'

export default function IntroSection({ id, eyebrow, heading, body = [], image, reverse = false, className = '' }) {
  const paragraphs = Array.isArray(body) ? body : [body]

  return (
    <section className={`${styles.section} ${className}`.trim()} id={id}>
      <Container className={`${styles.inner} ${reverse ? styles.reverse : ''}`.trim()}>
        <Reveal className={styles.copy}>
          {eyebrow ? <span className={styles.eyebrow}>{eyebrow}</span> : null}
          {heading ? <h2 className={styles.heading}>{heading}</h2> : null}
          <div className={styles.body}>
            {paragraphs.map((paragraph, index) => (
              <p key={`${paragraph.slice(0, 24)}-${index}`}>{paragraph}</p>
            ))}
          </div>
        </Reveal>

        {image ? (
          <Reveal className={styles.media} delay={0.12}>
            <div className={styles.imageFrame}>
              <LazyImage alt={heading ? `${heading} visual from the original site` : 'Visual from the original site'} src={image} />
            </div>
            <span className={styles.marker} aria-hidden="true" />
          </Reveal>
        ) : null}
      </Container>
    </section>
  )
}
