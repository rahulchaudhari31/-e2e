import { content } from '../data/content.js'
import Button from '../components/ui/Button.jsx'
import Container from '../components/ui/Container.jsx'
import SignalMascot from '../components/mascots/SignalMascot.jsx'
import styles from './NotFound.module.css'

export default function NotFound() {
  return (
    <section className={styles.section}>
      <Container className={styles.inner}>
        <SignalMascot className={styles.mascot} />
        <h1 className={styles.code}>{content.notFound.title}</h1>
        <p className={styles.message}>{content.notFound.subtitle}</p>
        <Button to="/">Home</Button>
      </Container>
    </section>
  )
}
