import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, ArrowUpRight, Linkedin, Send, Instagram } from 'lucide-react'
import { useTheme } from './ThemeContext'

const CONTAINER = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const CARD_VAR = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
}

const SOCIAL_META = {
  LinkedIn: { icon: Linkedin, color: '#0A66C2', darkColor: '#7BA5FF', label: 'LinkedIn' },
  Telegram: { icon: Send, color: '#26A5E4', darkColor: '#7DD3FC', label: 'Telegram' },
  Instagram: { icon: Instagram, color: '#E1306C', darkColor: '#F9A8D4', label: 'Instagram' },
}

const IDENTITY_SLOGAN = 'Turning complexity into strategic clarity.'

function QuickAction({ href, label, icon: Icon, isPrimary = false, isDark }) {
  return (
    <motion.a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noreferrer' : undefined}
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className="flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold transition-all duration-200"
      style={
        isPrimary
          ? {
              background: isDark
                ? 'linear-gradient(135deg, #4A7CFF 0%, #6B9BFF 100%)'
                : 'linear-gradient(135deg, #2563EB 0%, #4F46E5 100%)',
              color: '#ffffff',
              boxShadow: isDark
                ? '0 14px 28px rgba(74,124,255,0.22)'
                : '0 14px 28px rgba(37,99,235,0.20)',
            }
          : {
              background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(15,23,42,0.03)',
              border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(15,23,42,0.08)',
              color: isDark ? '#E2E8F0' : '#0F172A',
            }
      }
    >
      <Icon size={15} />
      {label}
      <ArrowUpRight size={13} style={{ opacity: 0.7 }} />
    </motion.a>
  )
}

function ContactInfoCard({ icon: Icon, label, value, subtext, isDark }) {
  return (
    <div
      className="rounded-2xl px-4 py-4"
      style={{
        background: isDark ? 'rgba(255,255,255,0.025)' : 'rgba(255,255,255,0.72)',
        border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(15,23,42,0.07)',
        boxShadow: isDark ? 'inset 0 1px 0 rgba(255,255,255,0.03)' : '0 8px 24px rgba(15,23,42,0.05)',
      }}
    >
      <div className="flex items-start gap-3">
        <span
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          style={{
            background: isDark ? 'rgba(74,124,255,0.10)' : 'rgba(37,99,235,0.08)',
            color: isDark ? '#7BA5FF' : '#2563EB',
          }}
        >
          <Icon size={16} />
        </span>
        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-[0.18em] font-bold mb-1" style={{ color: isDark ? '#545E72' : '#94A3B8' }}>
            {label}
          </p>
          <p className="text-sm font-semibold leading-snug break-words" style={{ color: isDark ? '#F8FAFC' : '#0F172A' }}>
            {value}
          </p>
          {subtext && (
            <p className="text-xs mt-1" style={{ color: isDark ? '#8892A4' : '#64748B' }}>
              {subtext}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ContactSection({ profile, t }) {
  const { isDark } = useTheme()

  const socialEntries = Object.entries(profile.social).filter(([, url]) => url && url !== '#')

  return (
    <section id="contact" className="relative min-h-screen pt-8 md:pt-12 pb-20">
      {!isDark && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="orb orb-a"
            style={{
              width: 420,
              height: 420,
              top: '8%',
              left: '-120px',
              background: 'radial-gradient(circle,rgba(59,130,246,0.10) 0%,transparent 72%)',
              borderRadius: '50%',
              filter: 'blur(70px)',
              position: 'absolute',
            }}
          />
          <div
            className="orb orb-b"
            style={{
              width: 380,
              height: 380,
              top: '18%',
              right: '-100px',
              background: 'radial-gradient(circle,rgba(79,70,229,0.08) 0%,transparent 72%)',
              borderRadius: '50%',
              filter: 'blur(70px)',
              position: 'absolute',
            }}
          />
        </div>
      )}

      <motion.div
        variants={CONTAINER}
        initial="hidden"
        animate="show"
        className="max-w-6xl mx-auto px-6 relative z-10"
      >
        <motion.div
          variants={CARD_VAR}
          className="relative mb-10 pb-5"
          style={{ borderBottom: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid var(--border)' }}
        >
          <span
            aria-hidden
            className="absolute right-0 top-[-24px] font-black select-none pointer-events-none leading-none"
            style={{
              fontSize: 'clamp(72px,12vw,120px)',
              color: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(59,130,246,0.06)',
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            03
          </span>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 relative z-10">
            <span className="section-num">03 - {t.letsConnect}</span>
            <div className="sm:text-right">
              <h2 className="text-2xl md:text-3xl font-bold text-gradient leading-tight">{t.getInTouch}</h2>
              <p className="text-xs mt-1 max-w-md sm:ml-auto" style={{ color: isDark ? '#545E72' : 'var(--text-muted)' }}>
                {t.openToInternships}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={CARD_VAR}
          className="relative overflow-hidden rounded-[34px]"
          style={{
            background: isDark
              ? 'linear-gradient(145deg, #0E1116 0%, #0B0E13 48%, #10151C 100%)'
              : 'linear-gradient(145deg, rgba(255,255,255,0.92) 0%, rgba(247,250,255,0.92) 100%)',
            border: isDark ? '1px solid rgba(148,163,184,0.12)' : '1px solid rgba(15,23,42,0.08)',
            boxShadow: isDark
              ? '0 30px 80px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.03)'
              : '0 28px 70px rgba(15,23,42,0.10)',
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: isDark
                ? 'radial-gradient(circle at 14% 18%, rgba(74,124,255,0.16) 0%, transparent 28%), radial-gradient(circle at 88% 84%, rgba(74,124,255,0.08) 0%, transparent 30%)'
                : 'radial-gradient(circle at 14% 18%, rgba(59,130,246,0.10) 0%, transparent 28%), radial-gradient(circle at 88% 84%, rgba(79,70,229,0.06) 0%, transparent 30%)',
            }}
          />

          <div className="relative grid lg:grid-cols-[minmax(320px,420px)_minmax(420px,1fr)] gap-6 lg:gap-8 p-5 md:p-7">
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.24 }}
              className="relative overflow-hidden rounded-[28px]"
              style={{
                background: isDark
                  ? 'linear-gradient(180deg, rgba(13,17,23,0.98) 0%, rgba(9,12,17,0.98) 100%)'
                  : 'linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(244,247,255,0.95) 100%)',
                border: isDark ? '1px solid rgba(148,163,184,0.14)' : '1px solid rgba(15,23,42,0.08)',
                boxShadow: isDark
                  ? '0 20px 50px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.04)'
                  : '0 18px 48px rgba(15,23,42,0.08)',
              }}
            >
              <div className="absolute inset-0 pointer-events-none" style={{
                background: isDark
                  ? 'linear-gradient(180deg, rgba(255,255,255,0.015) 0%, transparent 100%)'
                  : 'linear-gradient(180deg, rgba(59,130,246,0.03) 0%, transparent 100%)',
              }} />
              <div className="relative p-5 md:p-6">
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold" style={{ color: isDark ? '#4A7CFF' : '#2563EB' }}>
                    Executive Profile
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.18em] font-semibold" style={{ color: isDark ? '#545E72' : '#94A3B8' }}>
                    Kuala Lumpur
                  </span>
                </div>

                <div className="relative overflow-hidden rounded-[24px]">
                  <img
                    src="/sako.jpeg"
                    alt={profile.name}
                    className="w-full h-[520px] object-cover object-top"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: isDark
                        ? 'linear-gradient(to top, rgba(10,13,18,0.72) 0%, transparent 42%)'
                        : 'linear-gradient(to top, rgba(255,255,255,0.42) 0%, transparent 42%)',
                    }}
                  />
                  <div className="absolute left-5 right-5 bottom-5 flex items-end justify-between gap-4">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] font-bold mb-2" style={{ color: '#AFC7FF' }}>
                        Strategic Identity
                      </p>
                      <p className="text-sm font-semibold" style={{ color: '#F8FAFC' }}>
                        Business Strategy &amp; Operations
                      </p>
                    </div>
                    <span
                      className="px-3 py-1.5 rounded-full text-[10px] uppercase tracking-[0.16em] font-bold"
                      style={{
                        background: 'rgba(15,23,42,0.62)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        color: '#E2E8F0',
                      }}
                    >
                      Open
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="flex flex-col gap-5 lg:gap-6">
              <motion.div
                whileHover={{ y: -3 }}
                transition={{ duration: 0.24 }}
                className="relative overflow-hidden rounded-[28px] p-6 md:p-8"
                style={{
                  background: isDark
                    ? 'linear-gradient(160deg, rgba(18,22,29,0.98) 0%, rgba(10,13,18,0.98) 100%)'
                    : 'linear-gradient(160deg, rgba(255,255,255,0.95) 0%, rgba(245,248,255,0.95) 100%)',
                  border: isDark ? '1px solid rgba(148,163,184,0.14)' : '1px solid rgba(15,23,42,0.08)',
                  boxShadow: isDark
                    ? '0 18px 44px rgba(0,0,0,0.20), inset 0 1px 0 rgba(255,255,255,0.04)'
                    : '0 18px 48px rgba(15,23,42,0.08)',
                }}
              >
                <div
                  className="absolute inset-x-0 top-0 h-px"
                  style={{ background: isDark ? 'linear-gradient(90deg, transparent, rgba(74,124,255,0.52), transparent)' : 'linear-gradient(90deg, transparent, rgba(37,99,235,0.42), transparent)' }}
                />

                <p className="text-[10px] uppercase tracking-[0.22em] font-bold" style={{ color: isDark ? '#545E72' : '#94A3B8' }}>
                  Executive Identity
                </p>

                <div className="mt-8">
                  <p className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-4" style={{ color: isDark ? '#7BA5FF' : '#2563EB' }}>
                    Business Strategy &amp; Operations
                  </p>
                  <h2 className="text-3xl md:text-[2.8rem] font-black leading-none tracking-tight" style={{ color: isDark ? '#F8FAFC' : '#0F172A' }}>
                    Kismanova
                  </h2>
                  <h3 className="text-3xl md:text-[2.8rem] font-black leading-none tracking-tight mt-2" style={{ color: isDark ? '#4A7CFF' : '#2563EB' }}>
                    Sagdiana
                  </h3>
                </div>

                <div className="mt-7 h-px" style={{ background: isDark ? 'linear-gradient(90deg, rgba(74,124,255,0.26), rgba(148,163,184,0.08), transparent)' : 'linear-gradient(90deg, rgba(37,99,235,0.18), rgba(148,163,184,0.10), transparent)' }} />

                <p className="mt-7 text-lg md:text-xl leading-relaxed max-w-xl" style={{ color: isDark ? '#CBD5E1' : '#334155' }}>
                  {IDENTITY_SLOGAN}
                </p>

                <p className="mt-5 text-sm leading-relaxed max-w-2xl" style={{ color: isDark ? '#8892A4' : '#64748B' }}>
                  {profile.about}
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  {['Systems', 'Strategy', 'Impact'].map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-[0.16em]"
                      style={{
                        background: isDark ? 'rgba(74,124,255,0.09)' : 'rgba(37,99,235,0.08)',
                        border: isDark ? '1px solid rgba(74,124,255,0.18)' : '1px solid rgba(37,99,235,0.14)',
                        color: isDark ? '#AFC7FF' : '#2563EB',
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <QuickAction href={`mailto:${profile.email}`} label="Email Me" icon={Mail} isPrimary isDark={isDark} />
                  <QuickAction href={profile.social.LinkedIn} label="View LinkedIn" icon={ArrowUpRight} isDark={isDark} />
                </div>
              </motion.div>

              <motion.div
                variants={CARD_VAR}
                className="grid sm:grid-cols-2 xl:grid-cols-4 gap-3"
              >
                <ContactInfoCard
                  icon={Mail}
                  label={t.email}
                  value={profile.email}
                  subtext="Best for professional outreach"
                  isDark={isDark}
                />
                <ContactInfoCard
                  icon={Phone}
                  label={t.phone}
                  value={profile.phone}
                  subtext="Available for direct contact"
                  isDark={isDark}
                />
                <ContactInfoCard
                  icon={MapPin}
                  label={t.location}
                  value={profile.location}
                  subtext="GMT+8 friendly"
                  isDark={isDark}
                />
                <div
                  className="rounded-2xl px-4 py-4"
                  style={{
                    background: isDark ? 'rgba(255,255,255,0.025)' : 'rgba(255,255,255,0.72)',
                    border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(15,23,42,0.07)',
                    boxShadow: isDark ? 'inset 0 1px 0 rgba(255,255,255,0.03)' : '0 8px 24px rgba(15,23,42,0.05)',
                  }}
                >
                  <p className="text-[10px] uppercase tracking-[0.18em] font-bold mb-3" style={{ color: isDark ? '#545E72' : '#94A3B8' }}>
                    {t.socialMedia}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {socialEntries.map(([name, url]) => {
                      const meta = SOCIAL_META[name]
                      const Icon = meta?.icon ?? ArrowUpRight
                      const color = isDark ? (meta?.darkColor ?? '#7BA5FF') : (meta?.color ?? '#2563EB')

                      return (
                        <motion.a
                          key={name}
                          href={url}
                          target="_blank"
                          rel="noreferrer"
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{
                            background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(15,23,42,0.03)',
                            border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(15,23,42,0.08)',
                            color,
                          }}
                          aria-label={meta?.label ?? name}
                        >
                          <Icon size={16} />
                        </motion.a>
                      )
                    })}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.p
          variants={CARD_VAR}
          className="text-center text-xs mt-8"
          style={{ color: isDark ? '#545E72' : 'var(--text-muted)' }}
        >
          {t.poweredBy}{' '}
          <a
            href="https://kazyouthdiplomacy.com"
            target="_blank"
            rel="noreferrer"
            style={{ color: isDark ? '#4A7CFF' : '#3B82F6' }}
            className="hover:opacity-80 transition-opacity"
          >
            KazYouthDiplomacy
          </a>
        </motion.p>
      </motion.div>
    </section>
  )
}
