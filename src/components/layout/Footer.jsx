import { Link2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { content } from '../../data/content.js'
import Container from '../ui/Container.jsx'
import Logo from '../ui/Logo.jsx'
import SpinButton from '../ui/SpinButton.jsx'
import styles from './Footer.module.css'

const socials = content.socialLinks.filter((social) => social.href && !social.href.endsWith('#'))

export default function Footer() {
  const services = content.navigation.find((item) => item.groups)

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.top}>
          <div className={styles.brand}>
            <Logo />
            <p>{content.home.intro.heading}</p>
          </div>

          <div className={styles.navColumns}>
            {services.groups.map((group) => (
              <div className={styles.navColumn} key={group.label}>
                <Link className={styles.columnTitle} to={group.to}>
                  {group.label}
                </Link>
                <ul role="list">
                  {group.children.map((child) => (
                    <li key={child.slug}>
                      <Link to={child.to}>{child.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className={styles.contact}>
            <h3>Visit Us</h3>
            <p>{content.contact.addressLines.join(', ')}</p>
            <a href={`mailto:${content.contact.email}`}>{content.contact.email}</a>
            <a href={`tel:${content.contact.phone.replace(/\s/g, '')}`}>{content.contact.phone}</a>
          </div>
        </div>

        {socials.length ? (
          <div className={styles.socials} aria-label="Social links">
            {socials.map((social) => {
              const Icon = Link2
              return (
                <a
                  className={styles.social}
                  href={social.href}
                  key={social.label}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${social.label} (opens in a new tab)`}
                >
                  <Icon size={18} aria-hidden="true" />
                </a>
              )
            })}
          </div>
        ) : null}

        <div className={styles.bottom}>
          <SpinButton />
          <span>{content.copyright}</span>
          <a href={content.meta.source} rel="noreferrer" target="_blank">
            <span className={styles.srOnly}>Opens in a new tab: </span>
            {content.meta.source.replace('https://', '')}
          </a>
        </div>
      </Container>
    </footer>
  )
}
