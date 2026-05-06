import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Phone, MapPin, ChevronRight, X } from 'lucide-react'
import { FaLinkedin, FaTelegram, FaInstagram, FaGithub } from 'react-icons/fa'
import LogoLoop from './LogoLoop/LogoLoop'

const ICON_MAP = {
  LinkedIn: FaLinkedin,
  Telegram: FaTelegram,
  Instagram: FaInstagram,
  GitHub: FaGithub,
}

const ICON_COLOR = {
  LinkedIn: '#2563EB',
  Telegram: '#0284C7',
  Instagram: '#DB2777',
  GitHub: '#374151',
}

export default function GetInTouchWidget({ profile, t }) {
  const [visible, setVisible] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 280)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const socialLogos = useMemo(() =>
    Object.entries(profile.social)
      .filter(([name, url]) => url && url !== '#' && ICON_MAP[name])
      .map(([name, url]) => {
        const Icon = ICON_MAP[name]
        return {
          node: <Icon size={18} color={ICON_COLOR[name] ?? '#374151'} />,
          href: url,
          ariaLabel: name,
        }
      }),
  [profile.social])

  return (
    <AnimatePresence>
      {visible && (
        <motion.aside
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed left-0 top-1/2 -translate-y-1/2 z-40 hidden xl:flex items-center"
        >
          <AnimatePresence>
            {open && (
              <motion.div
                key="panel"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 224, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 320, damping: 32 }}
                className="overflow-hidden"
              >
                <div className="glass rounded-r-2xl p-5 w-56 shadow-xl shadow-slate-200/80">
                  <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-blue-600 mb-4">
                    {t.getInTouch}
                  </p>

                  <div className="flex flex-col gap-3">
                    <a href={`mailto:${profile.email}`} className="flex items-center gap-3 group">
                      <span className="w-7 h-7 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0 group-hover:bg-blue-500/18 transition-colors">
                        <Mail size={13} className="text-blue-600" />
                      </span>
                      <span className="text-xs text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors truncate leading-tight">
                        {profile.email}
                      </span>
                    </a>

                    <a href={`tel:${profile.phone}`} className="flex items-center gap-3 group">
                      <span className="w-7 h-7 rounded-lg bg-violet-500/10 flex items-center justify-center shrink-0 group-hover:bg-violet-500/18 transition-colors">
                        <Phone size={13} className="text-violet-600" />
                      </span>
                      <span className="text-xs text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors leading-tight">
                        {profile.phone}
                      </span>
                    </a>

                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                        <MapPin size={13} className="text-emerald-600" />
                      </span>
                      <span className="text-xs text-[var(--text-secondary)] leading-tight">
                        {profile.location}
                      </span>
                    </div>
                  </div>

                  {socialLogos.length > 0 && (
                    <>
                      <div className="my-4 divider" />
                      <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-[var(--text-muted)] mb-3">
                        {t.socialMedia}
                      </p>
                      <div className="overflow-hidden rounded-lg">
                        <LogoLoop
                          logos={socialLogos}
                          speed={40}
                          logoHeight={20}
                          gap={18}
                          pauseOnHover
                          width="100%"
                          ariaLabel="Social media links"
                        />
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Toggle tab */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex items-center justify-center w-7 h-16 rounded-r-xl glass shadow-md shadow-slate-200/60 hover:bg-blue-500/8 transition-colors group"
            aria-label={open ? 'Close contact widget' : 'Open contact widget'}
          >
            <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
              {open
                ? <X size={13} className="text-[var(--text-secondary)] group-hover:text-blue-600 transition-colors" />
                : <ChevronRight size={13} className="text-[var(--text-secondary)] group-hover:text-blue-600 transition-colors" />
              }
            </motion.span>
          </button>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
