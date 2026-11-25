import { useEffect, useRef, useState } from 'react'
import { ChevronDown, Menu, Phone, X } from 'lucide-react'
import { NavLink, useLocation } from 'react-router-dom'
import { content } from '../../data/content.js'
import Logo from '../ui/Logo.jsx'
import Button from '../ui/Button.jsx'
import Container from '../ui/Container.jsx'
import ThemeToggle from '../ui/ThemeToggle.jsx'
import styles from './Header.module.css'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const location = useLocation()
  const navRef = useRef(null)
  const toggleRef = useRef(null)
  const closeMenu = () => setOpen(false)

  useEffect(() => {
    if (!open) {
      return undefined
    }

    navRef.current?.querySelector('a, button')?.focus()

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open])

  const toggleServices = () => {
    const next = !servicesOpen
    setServicesOpen(next)

    if (next) {
      window.requestAnimationFrame(() => {
        document.getElementById('services-menu')?.querySelector('a')?.focus()
      })
    }
  }

  return (
    <header className={`${styles.header} ${open ? styles.headerOpen : ''}`.trim()}>
      <Container className={styles.inner}>
        <Logo className={styles.logo} />

        <nav
          aria-label="Main navigation"
          className={`${styles.nav} ${open ? styles.navOpen : ''}`.trim()}
          id="main-nav"
          ref={navRef}
        >
          {content.navigation.map((item) => {
            if (item.groups) {
              return (
                <div
                  className={styles.dropdown}
                  key={item.label}
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <button
                    aria-controls="services-menu"
                    aria-expanded={servicesOpen}
                    aria-haspopup="true"
                    className={`${styles.link} ${location.pathname.startsWith('/services') ? styles.active : ''}`.trim()}
                    onClick={toggleServices}
                    type="button"
                  >
                    {item.label}
                    <ChevronDown size={14} aria-hidden="true" />
                  </button>

                  {servicesOpen ? (
                    <div className={styles.menu} id="services-menu">
                      <NavLink className={styles.menuIntro} to={item.to} onClick={closeMenu}>
                        All services
                      </NavLink>
                      <div className={styles.menuGrid}>
                        {item.groups.map((group) => (
                          <div className={styles.menuColumn} key={group.label}>
                            <NavLink className={styles.menuTitle} to={group.to} onClick={closeMenu}>
                              {group.label}
                            </NavLink>
                            <ul role="list">
                              {group.children.map((child) => (
                                <li key={child.slug}>
                                  <NavLink className={styles.menuLink} to={child.to} onClick={closeMenu}>
                                    {child.label}
                                  </NavLink>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              )
            }

            return (
              <NavLink
                className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`.trim()}
                key={item.label}
                onClick={closeMenu}
                to={item.to}
              >
                {item.label}
              </NavLink>
            )
          })}

          <NavLink className={`${styles.link} ${styles.mobileOnlyLink}`} onClick={closeMenu} to="/contact">
            Contact
          </NavLink>

          <div className={styles.mobileActions}>
            <ThemeToggle />
            <a className={styles.phone} href={`tel:${content.contact.phone.replace(/\s/g, '')}`}>
              <Phone size={15} aria-hidden="true" />
              {content.contact.phoneHeader}
            </a>
          </div>
        </nav>

        <div className={styles.actions}>
          <ThemeToggle />
          <a className={styles.phone} href={`tel:${content.contact.phone.replace(/\s/g, '')}`}>
            <Phone size={15} aria-hidden="true" />
            {content.contact.phoneHeader}
          </a>
          <Button className={styles.contactButton} onClick={closeMenu} to="/contact" variant="outline">
            Contact Us
          </Button>
        </div>

        <button
          aria-controls="main-nav"
          aria-expanded={open}
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          className={styles.toggle}
          onClick={() => setOpen((value) => !value)}
          ref={toggleRef}
          type="button"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </Container>
    </header>
  )
}
