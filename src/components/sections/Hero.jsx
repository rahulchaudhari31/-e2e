import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ArrowDown, ArrowUpRight, Layers, Smartphone, TrendingUp } from 'lucide-react'
import { content } from '../../data/content.js'
import Button from '../ui/Button.jsx'
import Container from '../ui/Container.jsx'
import styles from './Hero.module.css'

const STORAGE_KEY = 'e2e-hero-intro'
const hero = content.home.hero
const videoSrc = hero.video.replaceAll('&;', '&')
const titleLines = [
  ['Where', 'your', 'brand'],
  ['meets', 'its', 'audience.'],
]
const tileIcons = [Layers, Smartphone, TrendingUp]
const tiles = content.home.process.slice(0, 3).map((step, index) => ({
  number: step.number,
  title: step.title,
  Icon: tileIcons[index],
}))
const bars = [38, 62, 48, 78, 66, 92]

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function hasSeenIntro() {
  try {
    return window.sessionStorage.getItem(STORAGE_KEY) === 'seen'
  } catch {
    return false
  }
}

function markIntroSeen() {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, 'seen')
  } catch {
    return false
  }

  return true
}

export default function Hero() {
  const scopeRef = useRef(null)
  const cardRef = useRef(null)
  const noteRef = useRef(null)
  const underlineRef = useRef(null)
  const leadRef = useRef(null)
  const actionsRef = useRef(null)
  const [introDone, setIntroDone] = useState(() => hasSeenIntro() || prefersReducedMotion())
  const shouldPlayIntro = useRef(!introDone)

  useEffect(() => {
    if (!shouldPlayIntro.current) {
      return undefined
    }

    markIntroSeen()

    const scope = scopeRef.current
    const card = cardRef.current
    const note = noteRef.current
    const underline = underlineRef.current
    const reveals = [leadRef.current, actionsRef.current].filter(Boolean)

    if (!scope || !card || !note || !underline) {
      return undefined
    }

    const words = scope.querySelectorAll('[data-word]')
    const chartBars = scope.querySelectorAll('[data-bar]')
    const chartTiles = scope.querySelectorAll('[data-tile]')

    gsap.set(underline, { scaleX: 0, transformOrigin: 'left center' })
    gsap.set(chartBars, { scaleY: 0, transformOrigin: 'bottom center' })

    const intro = gsap.timeline({
      onComplete: () => setIntroDone(true),
    })

    intro
      .fromTo(card, { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' }, 0)
      .fromTo(
        words,
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', stagger: 0.07 },
        0.12,
      )
      .fromTo(
        chartBars,
        { scaleY: 0 },
        { scaleY: 1, duration: 0.5, ease: 'power2.out', stagger: 0.06 },
        0.25,
      )
      .fromTo(
        chartTiles,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', stagger: 0.08 },
        0.5,
      )
      .fromTo(note, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, 0.6)
      .fromTo(underline, { scaleX: 0 }, { scaleX: 1, duration: 0.45, ease: 'power2.out' }, 0.85)
      .fromTo(
        reveals,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', stagger: 0.08 },
        1,
      )

    return () => intro.kill()
  }, [])

  return (
    <section
      ref={scopeRef}
      className={`${styles.hero} ${introDone ? '' : styles.introPending}`.trim()}
    >
      <div className={styles.media} aria-hidden="true">
        <iframe
          src={videoSrc}
          title="e2e Cyber Solutions video background"
          allow="autoplay; encrypted-media; picture-in-picture"
          frameBorder="0"
          tabIndex="-1"
        />
      </div>
      <div className={styles.overlay} aria-hidden="true" />

      <Container className={styles.inner}>
        <div className={styles.copy}>
          <span className={styles.kicker}>{content.meta.siteName}</span>
          <h1 className={styles.title} aria-label={hero.heading}>
            {titleLines.map((line, lineIndex) => (
              <span className={styles.titleLine} key={lineIndex}>
                {line.map((word) => (
                  <span className={styles.word} data-word key={word} aria-hidden="true">
                    {word}
                  </span>
                ))}
                {lineIndex === 1 ? (
                  <svg
                    aria-hidden="true"
                    className={styles.underline}
                    preserveAspectRatio="none"
                    ref={underlineRef}
                    viewBox="0 0 560 24"
                  >
                    <path d="M4 16 C 120 6, 240 20, 360 8 S 500 10, 556 14" />
                  </svg>
                ) : null}
              </span>
            ))}
          </h1>
          <p className={styles.lead} ref={leadRef}>
            {hero.subheading}
          </p>
          <div className={styles.actions} ref={actionsRef}>
            <Button aria-hidden={!introDone} tabIndex={introDone ? 0 : -1} to="/contact">
              {hero.cta}
            </Button>
            <Button
              aria-hidden={!introDone}
              tabIndex={introDone ? 0 : -1}
              to="/services"
              variant="ghost"
            >
              Services
            </Button>
          </div>
        </div>

        <div className={styles.visual} aria-hidden="true">
          <div className={styles.visualAccent} />
          <div className={styles.visualCard} ref={cardRef}>
            <div className={styles.cardTop}>
              <span className={styles.cardLabel}>e2e / studio</span>
              <span className={styles.cardArrow}>
                <ArrowUpRight size={14} />
              </span>
            </div>

            <div className={styles.cardBody}>
              <div className={styles.cardIntro}>
                <span className={styles.cardEyebrow}>Connected thinking</span>
                <strong>Strategy / Design / Develop</strong>
              </div>

              <div className={styles.chart}>
                {bars.map((height, index) => (
                  <span
                    className={styles.chartBar}
                    data-bar
                    key={`${height}-${index}`}
                    style={{ '--bar-height': `${height}%` }}
                  />
                ))}
              </div>

              <div className={styles.tiles}>
                {tiles.map(({ Icon, number, title }) => (
                  <div className={styles.tile} data-tile key={title}>
                    <span className={styles.tileNumber}>{number}</span>
                    <Icon size={18} aria-hidden="true" />
                    <span className={styles.tileTitle}>{title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.visualNote} ref={noteRef}>
            <span />
            Digital at its core
          </div>
        </div>
      </Container>

      <a className={styles.scroll} href="#about" aria-label="Scroll to about section">
        <ArrowDown size={18} aria-hidden="true" />
      </a>
    </section>
  )
}
