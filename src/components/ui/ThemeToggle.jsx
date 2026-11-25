import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme.js'
import styles from './ThemeToggle.module.css'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const dark = theme === 'dark'

  return (
    <button
      className={styles.toggle}
      type="button"
      onClick={toggleTheme}
      aria-label="Dark mode"
      aria-pressed={dark}
    >
      {dark ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
    </button>
  )
}
