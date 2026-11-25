import { Mail, MapPin, Phone } from 'lucide-react'
import { content } from '../../data/content.js'
import Container from '../ui/Container.jsx'
import Reveal from '../ui/Reveal.jsx'
import styles from './ContactStrip.module.css'

const items = [
  {
    label: 'Call Us',
    value: content.contact.phone,
    href: `tel:${content.contact.phone.replace(/\s/g, '')}`,
    Icon: Phone,
  },
  {
    label: 'Write Us',
    value: content.contact.email,
    href: `mailto:${content.contact.email}`,
    Icon: Mail,
  },
  {
    label: 'Visit Us',
    value: content.contact.addressLines.join(', '),
    href: null,
    Icon: MapPin,
  },
]

export default function ContactStrip() {
  return (
    <section className={styles.section} id="contact">
      <Container>
        <div className={styles.grid}>
          {items.map((item, index) => (
            <Reveal className={styles.item} key={item.label} delay={index * 0.08}>
              <span className={styles.icon}>
                <item.Icon size={22} aria-hidden="true" />
              </span>
              <h3>{item.label}</h3>
              {item.href ? (
                <a href={item.href}>{item.value}</a>
              ) : (
                <p>{item.value}</p>
              )}
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
