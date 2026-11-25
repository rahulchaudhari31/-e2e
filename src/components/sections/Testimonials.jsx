import { Quote } from 'lucide-react'
import Container from '../ui/Container.jsx'
import LazyImage from '../ui/LazyImage.jsx'
import Reveal from '../ui/Reveal.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import styles from './Testimonials.module.css'

export default function Testimonials({ items = [], title = 'Testimonials', eyebrow }) {
  if (!items.length) {
    return null
  }

  return (
    <section className={styles.section}>
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} align="center" />

        <div className={styles.track}>
          {items.map((item, index) => (
            <Reveal className={styles.card} key={`${item.name}-${index}`} delay={(index % 2) * 0.1}>
              <Quote className={styles.quoteIcon} size={28} aria-hidden="true" />
              <blockquote className={styles.quote}>{item.quote}</blockquote>
              <div className={styles.person}>
                {item.image ? <LazyImage alt={`Portrait of ${item.name}`} height={160} src={item.image} width={160} /> : null}
                <div>
                  <h3>{item.name}</h3>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
