import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { content } from '../../data/content.js'
import Container from '../ui/Container.jsx'
import styles from './MissingLink.module.css'

gsap.registerPlugin(ScrollTrigger)

const statement = content.about.statement
const missingLink = content.about.paragraphs[0].match(/e2e Cyber Solutions is the missing link[^.]*\./)?.[0] || statement
const stickers = ['Creative', 'Contemporary', 'Credible', 'Strategic']

export default function MissingLink() {
  const sectionRef = useRef(null)
  const [ready, setReady] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const shouldPlay = useRef(!ready)

  useEffect(() => {
    if (!shouldPlay.current) {
      return undefined
    }

    const section = sectionRef.current
    if (!section) {
      return undefined
    }

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: { trigger: section, start: 'top 78%', once: true },
        onComplete: () => setReady(true),
      })

      timeline
        .fromTo(
          '[data-orb]',
          { scale: 0.15, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.9, ease: 'elastic.out(1, 0.55)', stagger: 0.12 },
          0,
        )
        .fromTo(
          '[data-amp]',
          { scale: 0, rotation: -200, opacity: 0 },
          { scale: 1, rotation: 0, opacity: 1, duration: 0.95, ease: 'elastic.out(1, 0.5)' },
          0.32,
        )
        .fromTo(
          '[data-sticker]',
          { scale: 0, rotation: -18, opacity: 0 },
          { scale: 1, rotation: 0, opacity: 1, duration: 0.55, ease: 'back.out(2.4)', stagger: 0.09 },
          0.62,
        )
    }, section)

    return () => context.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${ready ? '' : styles.pending}`.trim()}
    >
      <Container className={styles.inner}>
        <span className={styles.eyebrow}>{content.meta.siteName}</span>
        <h2 className={styles.title}>Two sides. One missing link.</h2>
        <p className={styles.statement}>{statement}</p>

        <div className={styles.stage} aria-hidden="true">
          <div className={`${styles.orb} ${styles.business}`} data-orb>
            <span>Your business</span>
          </div>
          <div className={`${styles.orb} ${styles.audience}`} data-orb>
            <span>Your audience</span>
          </div>
          <span className={styles.amp} data-amp>
            &amp;
          </span>
          {stickers.map((label, index) => (
            <span className={`${styles.sticker} ${styles[`sticker${index + 1}`]}`} data-sticker key={label}>
              {label}
            </span>
          ))}
        </div>

        <p className={styles.copy}>{missingLink}</p>
      </Container>
    </section>
  )
}
