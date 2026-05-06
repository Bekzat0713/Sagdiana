import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import CurvedLoop from './CurvedLoop/CurvedLoop'
import { useTheme } from './ThemeContext'

const KEY_SKILLS = ['Business Analysis', 'UX Design', 'Strategy']

export default function AboutSection({ profile, t }) {
  const { isDark } = useTheme()
  const marqueeText = profile.skills ? profile.skills.map(s => `${s} ✦`).join('  ') : ''
  const stats = [
    { num: profile.projects?.length ?? 4,     label: 'Projects'     },
    { num: profile.certificates?.length ?? 3, label: 'Awards' },
    { num: profile.languages?.length ?? 3,    label: 'Languages'    },
    { num: '1',                                label: 'Startup'      },
  ]
  const firstName = profile.name.split(' ')[0]
  const lastName  = profile.name.split(' ').slice(1).join(' ')

  return (
    <section id="about" className="relative">
      {/* HERO */}
      <div className="relative overflow-hidden" style={{ background: 'transparent' }}>
        {/* Light mode orbs only */}
        {!isDark && (
          <>
            <div className="orb orb-a w-[480px] h-[480px] bg-blue-400/14   top-[-80px]  right-[-120px]"/>
            <div className="orb orb-b w-[380px] h-[380px] bg-violet-400/11 bottom-[60px] left-[-100px]"/>
          </>
        )}

        <div className="relative z-10 max-w-5xl mx-auto px-6 pt-28 pb-14">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-14 md:items-start">

            {/* LEFT — Photo */}
            <motion.div
              initial={{ opacity:0, x:-28 }} animate={{ opacity:1, x:0 }}
              transition={{ duration:0.7, ease:[0.16,1,0.3,1] }}
              className="md:col-span-2 flex justify-center md:justify-start"
            >
              <div className="relative w-full max-w-[260px]">
                {/* Subtle photo depth */}
                {!isDark && (
                  <div className="absolute -inset-4 rounded-3xl blur-3xl opacity-50" style={{
                    background: 'linear-gradient(135deg,rgba(59,130,246,0.22),rgba(124,58,237,0.16))',
                  }}/>
                )}
                {profile.avatar ? (
                  <img src={profile.avatar} alt={profile.name}
                    className="relative w-full aspect-[3/4] object-cover object-top rounded-2xl"
                    style={{ boxShadow: isDark
                      ? '0 0 0 1px rgba(255,255,255,0.10),0 24px 60px rgba(0,0,0,0.5)'
                      : '0 0 0 1px rgba(59,130,246,0.18),0 24px 60px rgba(15,23,42,0.15)' }}
                  />
                ) : (
                  <div className="relative w-full aspect-[3/4] rounded-2xl flex items-center justify-center text-6xl font-bold text-white"
                    style={{ background:'linear-gradient(135deg,#6366F1,#8B5CF6)' }}>
                    {firstName[0]}{lastName[0]}
                  </div>
                )}
                {/* Location badge */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 rounded-xl px-3 py-1.5"
                  style={{
                    background: isDark ? 'rgba(17,19,24,0.90)' : 'rgba(255,255,255,0.88)',
                    backdropFilter: 'blur(10px)',
                    border: isDark ? '1px solid rgba(255,255,255,0.09)' : '1px solid rgba(59,130,246,0.15)',
                  }}>
                  <MapPin size={11} className="text-blue-400 shrink-0"/>
                  <span className="text-[11px] truncate"
                    style={{ color: isDark ? 'rgba(200,210,255,0.75)' : 'var(--text-secondary)' }}>
                    {profile.location}
                  </span>
                  <span className="ml-auto flex items-center gap-1 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"/>
                    <span className="text-[10px] font-bold text-emerald-400">Open</span>
                  </span>
                </div>
              </div>
            </motion.div>

            {/* RIGHT — Info */}
            <motion.div
              initial={{ opacity:0, x:28 }} animate={{ opacity:1, x:0 }}
              transition={{ duration:0.7, delay:0.12, ease:[0.16,1,0.3,1] }}
              className="md:col-span-3 flex flex-col gap-4"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold w-fit"
                style={{
                  background: isDark ? 'rgba(74,124,255,0.10)' : 'rgba(59,130,246,0.08)',
                  border: isDark ? '1px solid rgba(74,124,255,0.25)' : '1px solid rgba(59,130,246,0.20)',
                  color: isDark ? '#7BA5FF' : '#3B82F6',
                }}>
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"/>
                {t.openToOpportunities}
              </div>

              {/* Name */}
              <div className="overflow-visible">
                <h1
                  className="font-bold tracking-tight overflow-visible"
                  style={{ fontSize:'clamp(2.6rem,5vw,4rem)', lineHeight: 0.96 }}
                >
                  <span
                    className="relative z-10 block max-w-full break-words"
                    style={{ color: isDark ? '#E8EEFF' : 'var(--text-primary)' }}
                  >
                    {firstName}
                  </span>
                  <span className="relative z-10 mt-1 block max-w-full overflow-visible">
                    <span
                      className="inline-block max-w-full break-words"
                      style={isDark
                        ? { color: '#F0F2F7' }
                        : {
                            background: 'linear-gradient(135deg,#3B82F6,#7C3AED)',
                            WebkitBackgroundClip:'text',
                            WebkitTextFillColor:'transparent',
                            backgroundClip:'text',
                          }}
                    >
                      {lastName}
                    </span>
                  </span>
                </h1>
                {/* Accent line */}
                <div className="h-[3px] w-12 rounded-full mt-3" style={{
                  background: isDark ? '#4A7CFF' : 'linear-gradient(90deg,#3B82F6,#7C3AED)',
                }}/>
              </div>

              {/* Title + tagline */}
              <div>
                <p className="font-semibold text-[15px]"
                  style={{ color: isDark ? '#4A7CFF' : '#3B82F6' }}>
                  {profile.title}
                </p>
                <p className="text-sm mt-1"
                  style={{ color: isDark ? '#8892A4' : 'var(--text-secondary)' }}>
                  {profile.tagline}
                </p>
              </div>

              {/* Key skill tags */}
              <div className="flex flex-wrap gap-2">
                {KEY_SKILLS.map(skill => (
                  <span key={skill} className="px-3 py-1 rounded-full text-xs font-semibold"
                    style={{
                      background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(59,130,246,0.07)',
                      border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(59,130,246,0.18)',
                      color: isDark ? '#8892A4' : '#3B82F6',
                    }}>
                    {skill}
                  </span>
                ))}
              </div>

              {/* About card */}
              <div className="rounded-xl px-5 py-4" style={{
                background: isDark ? '#111318' : 'rgba(255,255,255,0.88)',
                border: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(59,130,246,0.14)',
                boxShadow: isDark ? '0 1px 3px rgba(0,0,0,0.3)' : '0 2px 20px rgba(15,23,42,0.07)',
              }}>
                <p className="text-[14px] leading-relaxed"
                  style={{ color: isDark ? '#8892A4' : 'var(--text-secondary)' }}>
                  {profile.about}
                </p>
                {profile.languages?.length > 0 && (
                  <div className="mt-3 pt-3 flex flex-wrap items-center gap-2"
                    style={{ borderTop: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid var(--border)' }}>
                    <span className="text-[10px] font-bold uppercase tracking-[0.15em]"
                      style={{ color: isDark ? '#545E72' : 'var(--text-muted)' }}>
                      {t.languages}
                    </span>
                    {profile.languages.map(lang => (
                      <span key={lang.name} className="text-xs px-2.5 py-0.5 rounded-full"
                        style={{
                          background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(15,23,42,0.05)',
                          border: isDark ? '1px solid rgba(255,255,255,0.07)' : '1px solid var(--border)',
                          color: isDark ? '#8892A4' : 'var(--text-primary)',
                        }}>
                        <span className="font-semibold">{lang.name}</span>
                        <span className="ml-1 opacity-60">- {lang.level}</span>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-3 pt-4"
                style={{ borderTop: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid var(--border)' }}>
                {stats.map(({ num, label }) => (
                  <div key={label}>
                    <div className="text-2xl font-bold"
                      style={{ color: isDark ? '#F0F2F7' : 'var(--text-primary)' }}>{num}</div>
                    <div className="text-[10px] uppercase tracking-widest font-semibold mt-0.5"
                      style={{ color: isDark ? '#545E72' : 'var(--text-muted)' }}>{label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Fade to bg */}
        <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
          style={{ background:'linear-gradient(to bottom,transparent,var(--bg-primary))' }}/>
      </div>

      {/* Marquee */}
      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.5 }}
        className="relative pt-2 pb-4" style={{ background:'var(--bg-primary)' }}>
        <CurvedLoop marqueeText={marqueeText} speed={1.4} curveAmount={280}
          direction="left" interactive className="skills-loop-text"/>
      </motion.div>
    </section>
  )
}
