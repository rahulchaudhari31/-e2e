import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Container from '../ui/Container.jsx'
import styles from './PinnedProcess.module.css'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  { label: 'Discover', ball: 'Brief', color: 'var(--sun)' },
  { label: 'Design', ball: 'Design', color: 'var(--tomato)' },
  { label: 'Develop', ball: 'Build', color: 'var(--mint)' },
  { label: 'Grow', ball: 'Launch', color: 'var(--violet)' },
]

export default function PinnedProcess() {
  const sectionRef = useRef(null)
  const stageRef = useRef(null)
  const stickerRef = useRef(null)
  const activeRef = useRef(-1)
  const [reduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)

  useEffect(() => {
    const section = sectionRef.current
    const stage = stageRef.current
    const sticker = stickerRef.current

    if (!section || !stage || !sticker) {
      return undefined
    }

    const stepEls = gsap.utils.toArray('[data-step]', section)
    const cellEls = gsap.utils.toArray('[data-cell]', section)
    const ballEls = gsap.utils.toArray('[data-ball]', section)

    if (reduced) {
      stepEls.forEach((element) => {
        element.dataset.active = 'true'
      })
      cellEls.forEach((element, index) => {
        element.dataset.filled = 'true'
        element.style.setProperty('--cell-color', steps[index].color)
      })
      ballEls.forEach((element) => {
        element.style.opacity = '1'
      })
      sticker.textContent = 'Grow'
      return undefined
    }

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=400%',
        pin: stage,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const index = Math.min(steps.length - 1, Math.floor(self.progress * steps.length))
          if (index === activeRef.current) {
            return
          }

          activeRef.current = index
          stepEls.forEach((element, stepIndex) => {
            element.dataset.active = stepIndex <= index ? 'true' : 'false'
          })
          cellEls.forEach((element, cellIndex) => {
            element.dataset.filled = cellIndex <= index ? 'true' : 'false'
          })
          sticker.textContent = steps[index].label
          gsap.fromTo(
            sticker,
            { rotation: -12, scale: 0.82 },
            { rotation: 0, scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.55)', overwrite: true },
          )
        },
      },
    })

    ballEls.forEach((ball, index) => {
      timeline.fromTo(
        ball,
        { y: -260, opacity: 0, scale: 0.6 },
        { y: 0, opacity: 1, scale: 1, duration: 0.55, ease: 'bounce.out' },
        index,
      )
    })

    timeline.to({}, { duration: 0.4 })

    return () => {
      timeline.scrollTrigger?.kill()
      timeline.kill()
    }
  }, [reduced])

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${reduced ? styles.reduced : ''}`.trim()}
    >
      <div className={styles.stage} ref={stageRef}>
        <Container className={styles.inner}>
          <span className={styles.eyebrow}>PINNED PROCESS</span>
          <h2 className={styles.title}>From first spark to full launch.</h2>

          <div className={styles.layout}>
            <ol className={styles.steps}>
              {steps.map((step, index) => (
                <li
                  className={styles.step}
                  data-step
                  data-active={index === 0 ? 'true' : 'false'}
                  key={step.label}
                  style={{ '--step-color': step.color }}
                >
                  <span className={styles.stepNumber}>{String(index + 1).padStart(2, '0')}</span>
                  <span className={styles.stepLabel}>{step.label}</span>
                </li>
              ))}
            </ol>

            <div className={styles.box} aria-label="Process box filling with four coloured balls">
              <div className={styles.tape} aria-hidden="true" />
              <div className={styles.cells}>
                {steps.map((step) => (
                  <div
                    className={styles.cell}
                    data-cell
                    data-filled="false"
                    key={step.ball}
                    style={{ '--cell-color': step.color }}
                  >
                    <span>{step.ball}</span>
                  </div>
                ))}
              </div>
              <span className={styles.sticker} ref={stickerRef}>
                Discover
              </span>
              <div className={styles.balls} aria-hidden="true">
                {steps.map((step, index) => (
                  <span
                    className={styles.ball}
                    data-ball
                    key={`ball-${step.ball}`}
                    style={{ '--ball-color': step.color, '--ball-index': index }}
                  >
                    {step.ball}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  )
}
