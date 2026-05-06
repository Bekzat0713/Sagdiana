import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Menu, X } from 'lucide-react'
import { useLanguage } from './LanguageContext'
import { useTheme } from './ThemeContext'

const NAV_IDS = ['about', 'skills', 'projects', 'contact']
const LANGS = [{ code: 'en', label: 'EN' }, { code: 'ru', label: 'RU' }, { code: 'kk', label: 'KK' }]

export default function CardNav({ t }) {
  const { lang, setLang } = useLanguage()
  const { isDark, toggleTheme } = useTheme()
  const [active, setActive] = useState('about')
  const [menuOpen, setMenuOpen] = useState(false)

  const navItems = [
    { label: t.nav.about, id: 'about' },
    { label: t.nav.skills, id: 'skills' },
    { label: t.nav.projects, id: 'projects' },
    { label: t.nav.contact, id: 'contact' },
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

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <motion.nav
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-4 inset-x-0 z-50 px-3 md:px-0 md:top-5 md:left-1/2 md:right-auto md:inset-x-auto md:-translate-x-1/2 md:w-auto"
    >
      <div className="glass rounded-full px-2 py-1.5 hidden md:flex items-center gap-0.5 shadow-lg shadow-slate-200/50">
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

        <span className="w-px h-4 bg-[var(--border)] mx-1" />

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

        <span className="w-px h-4 bg-[var(--border)] mx-1" />

        <button
          onClick={toggleTheme}
          className="p-2 rounded-full text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors duration-200 focus:outline-none"
          title={isDark ? 'Switch to light' : 'Switch to dark'}
        >
          <motion.div
            key={isDark ? 'sun' : 'moon'}
            initial={{ rotate: -30, opacity: 0, scale: 0.7 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
          >
            {isDark ? <Sun size={13} /> : <Moon size={13} />}
          </motion.div>
        </button>
      </div>

      <div className="md:hidden relative ml-auto w-[min(11rem,calc(100vw-1.5rem))]">
        <div className="glass rounded-[22px] px-3 py-2 shadow-lg shadow-slate-200/50">
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0 flex-1">
              <p className="text-[9px] uppercase tracking-[0.18em] font-bold text-[var(--text-muted)]">
                Menu
              </p>
              <p className="text-[13px] font-semibold text-[var(--text-primary)] truncate">
                {navItems.find((item) => item.id === active)?.label}
              </p>
            </div>

            <div className="flex items-center gap-0.5 shrink-0">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors duration-200 focus:outline-none"
                title={isDark ? 'Switch to light' : 'Switch to dark'}
              >
                <motion.div
                  key={isDark ? 'sun-mobile' : 'moon-mobile'}
                  initial={{ rotate: -30, opacity: 0, scale: 0.7 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25 }}
                >
                  {isDark ? <Sun size={15} /> : <Moon size={15} />}
                </motion.div>
              </button>

              <button
                onClick={() => setMenuOpen((p) => !p)}
                className="p-2 rounded-full text-[var(--text-primary)] transition-colors duration-200 focus:outline-none"
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              >
                {menuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="glass absolute right-0 mt-3 w-[min(20rem,calc(100vw-1.5rem))] max-h-[72vh] overflow-y-auto rounded-[28px] p-3 shadow-xl shadow-slate-200/50"
            >
              <div className="grid gap-1.5">
                {navItems.map(({ label, id }) => {
                  const isActive = active === id
                  return (
                    <button
                      key={id}
                      onClick={() => scrollTo(id)}
                      className="w-full text-left rounded-2xl px-4 py-3 transition-colors duration-200"
                      style={{
                        background: isActive
                          ? isDark ? 'rgba(74,124,255,0.12)' : 'rgba(59,130,246,0.10)'
                          : 'transparent',
                        border: isActive
                          ? isDark ? '1px solid rgba(74,124,255,0.20)' : '1px solid rgba(59,130,246,0.16)'
                          : '1px solid transparent',
                      }}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className={`font-medium ${isActive ? 'text-blue-500' : 'text-[var(--text-primary)]'}`}>
                          {label}
                        </span>
                        <span
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{ background: isActive ? (isDark ? '#7BA5FF' : '#3B82F6') : 'var(--border)' }}
                        />
                      </div>
                    </button>
                  )
                })}
              </div>

              <div className="mt-3 pt-3 border-t border-[var(--border)]">
                <p className="text-[10px] uppercase tracking-[0.18em] font-bold text-[var(--text-muted)] mb-2 px-1">
                  Language
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {LANGS.map(({ code, label }) => (
                    <button
                      key={code}
                      onClick={() => setLang(code)}
                      className={`rounded-2xl px-3 py-2.5 text-xs font-bold transition-colors duration-200 ${
                        lang === code ? 'text-blue-500' : 'text-[var(--text-secondary)]'
                      }`}
                      style={{
                        background: lang === code
                          ? isDark ? 'rgba(74,124,255,0.12)' : 'rgba(59,130,246,0.10)'
                          : isDark ? 'rgba(255,255,255,0.02)' : 'rgba(15,23,42,0.03)',
                        border: lang === code
                          ? isDark ? '1px solid rgba(74,124,255,0.20)' : '1px solid rgba(59,130,246,0.16)'
                          : '1px solid var(--border)',
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
