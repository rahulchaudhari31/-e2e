import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { content } from '../../data/content.js'
import Container from '../ui/Container.jsx'
import LazyImage from '../ui/LazyImage.jsx'
import styles from './WorkGallery.module.css'

gsap.registerPlugin(ScrollTrigger)

const images = [
  {
    src: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80',
    alt: 'Dummy Unsplash image of a bright workspace',
    label: 'Workspace',
  },
  {
    src: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
    alt: 'Dummy Unsplash image of a digital team',
    label: 'Digital team',
  },
  {
    src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
    alt: 'Dummy Unsplash image of a planning session',
    label: 'Planning',
  },
]

const counters = [
  { value: 2016, label: 'Founded' },
  { value: 4, label: 'Core services' },
]

const testimonial = content.testimonials[2]

export default function WorkGallery() {
  const sectionRef = useRef(null)
  const [reduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) {
      return undefined
    }

    const frames = gsap.utils.toArray('[data-frame]', section)
    const photos = gsap.utils.toArray('[data-photo]', section)
    const countEls = gsap.utils.toArray('[data-count]', section)

    if (reduced) {
      countEls.forEach((element) => {
        element.textContent = element.dataset.count
      })
      return undefined
    }

    const context = gsap.context(() => {
      frames.forEach((frame) => {
        gsap.fromTo(
          frame,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: frame, start: 'top 82%', once: true },
          },
        )
      })

      photos.forEach((photo) => {
        gsap.fromTo(
          photo,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: 'none',
            scrollTrigger: { trigger: photo.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        )
      })

      countEls.forEach((element) => {
        const target = Number(element.dataset.count)
        const proxy = { value: 0 }
        element.textContent = '0'
        gsap.to(proxy, {
          value: target,
          duration: 1.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: element, start: 'top 88%', once: true },
          onUpdate: () => {
            element.textContent = String(Math.round(proxy.value))
          },
        })
      })
    }, section)

    return () => context.revert()
  }, [reduced])

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${reduced ? styles.reduced : ''}`.trim()}
    >
      <Container>
        <span className={styles.eyebrow}>Selected work</span>
        <h2 className={styles.title}>Proof in the making.</h2>

        <div className={styles.gallery}>
          {images.map((image) => (
            <figure className={styles.figure} key={image.src}>
              <div className={styles.frame} data-frame>
                <LazyImage alt={image.alt} data-photo height={1500} src={image.src} width={1200} />
                <span className={styles.badge}>Dummy Unsplash image</span>
              </div>
              <figcaption>{image.label}</figcaption>
            </figure>
          ))}
        </div>

        <div className={styles.lower}>
          <blockquote className={styles.quote}>
            <p>“{testimonial.quote}”</p>
            <footer>— {testimonial.name}</footer>
          </blockquote>

          <div className={styles.counters}>
            {counters.map((counter) => (
              <div className={styles.counter} key={counter.label}>
                <strong data-count={counter.value}>{counter.value}</strong>
                <span>{counter.label}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
