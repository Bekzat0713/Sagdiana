import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useLanguage } from './LanguageContext'
import { useTheme } from './ThemeContext'

const NAV_IDS = ['about', 'skills', 'projects', 'contact']
const LANGS = [{ code: 'en', label: 'EN' }, { code: 'ru', label: 'RU' }, { code: 'kk', label: 'KK' }]

export default function CardNav({ t }) {
  const { lang, setLang } = useLanguage()
  const { isDark, toggleTheme } = useTheme()
  const [active, setActive] = useState('about')

  const navItems = [
    { label: t.nav.about,    id: 'about'    },
    { label: t.nav.skills,   id: 'skills'   },
    { label: t.nav.projects, id: 'projects' },
    { label: t.nav.contact,  id: 'contact'  },
  ]

  useEffect(() => {
    const onScroll = () => {
      const offsets = NAV_IDS.map((id) => {
        const el = document.getElementById(id)
        return { id, top: el ? el.getBoundingClientRect().top : Infinity }
      })
      const visible = offsets.filter((o) => o.top <= 120)
      if (visible.length) setActive(visible[visible.length - 1].id)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <motion.nav
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-5 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="glass rounded-full px-2 py-1.5 flex items-center gap-0.5 shadow-lg shadow-slate-200/50">

        {/* Nav links */}
        {navItems.map(({ label, id }) => {
          const isActive = active === id
          return (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="relative px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 focus:outline-none"
            >
              {isActive && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-full bg-blue-500/15 border border-blue-500/25"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              <span className={`relative z-10 transition-colors duration-200 ${isActive ? 'text-blue-500' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}>
                {label}
              </span>
            </button>
          )
        })}

        {/* Divider */}
        <span className="w-px h-4 bg-[var(--border)] mx-1" />

        {/* Language switcher */}
        {LANGS.map(({ code, label }) => (
          <button
            key={code}
            onClick={() => setLang(code)}
            className={`px-2.5 py-1.5 rounded-full text-xs font-bold transition-colors duration-200 focus:outline-none ${
              lang === code ? 'text-blue-500' : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
            }`}
          >
            {label}
          </button>
        ))}

        {/* Divider */}
        <span className="w-px h-4 bg-[var(--border)] mx-1" />

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors duration-200 focus:outline-none"
          title={isDark ? 'Switch to light' : 'Switch to dark'}
        >
          <motion.div
            key={isDark ? 'sun' : 'moon'}
            initial={{ rotate: -30, opacity: 0, scale: 0.7 }}
            animate={{ rotate: 0,   opacity: 1, scale: 1   }}
            transition={{ duration: 0.25 }}
          >
            {isDark ? <Sun size={13} /> : <Moon size={13} />}
          </motion.div>
        </button>

      </div>
    </motion.nav>
  )
}
