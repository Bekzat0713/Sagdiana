import { motion } from 'framer-motion'
import {
  Globe, Users, FileSearch, Award, Zap, Heart,
  Star, Lightbulb, Target, TrendingUp, Layers, BarChart2,
} from 'lucide-react'
import { useTheme } from './ThemeContext'

const ICON_MAP = {
  Globe, Users, FileSearch, Award, Zap, Heart,
  Star, Lightbulb, Target, Layers, BarChart2, TrendingUp,
}

const BENTO = [
  {
    span: 'lg:col-span-2', smSpan: 'sm:col-span-2', wide: true,
    light: { bg: 'rgba(59,130,246,0.07)',  border: 'rgba(59,130,246,0.15)',  icon: '#3B82F6', iconBg: 'rgba(59,130,246,0.12)'  },
    dark:  { bg: '#111318', border: 'rgba(255,255,255,0.06)', icon: '#4A7CFF', iconBg: 'rgba(74,124,255,0.09)' },
  },
  {
    span: 'lg:col-span-1', smSpan: '', wide: false,
    light: { bg: 'rgba(124,58,237,0.07)',  border: 'rgba(124,58,237,0.15)',  icon: '#7C3AED', iconBg: 'rgba(124,58,237,0.12)' },
    dark:  { bg: '#111318', border: 'rgba(255,255,255,0.06)', icon: '#6B7CFF', iconBg: 'rgba(107,124,255,0.09)' },
  },
  {
    span: 'lg:col-span-1', smSpan: '', wide: false,
    light: { bg: 'rgba(6,182,212,0.07)',   border: 'rgba(6,182,212,0.15)',   icon: '#0891B2', iconBg: 'rgba(6,182,212,0.12)'  },
    dark:  { bg: '#111318', border: 'rgba(255,255,255,0.06)', icon: '#3A8FA8', iconBg: 'rgba(58,143,168,0.09)' },
  },
  {
    span: 'lg:col-span-2', smSpan: 'sm:col-span-2', wide: true,
    light: { bg: 'rgba(16,185,129,0.07)',  border: 'rgba(16,185,129,0.15)',  icon: '#059669', iconBg: 'rgba(16,185,129,0.12)' },
    dark:  { bg: '#111318', border: 'rgba(255,255,255,0.06)', icon: '#2A9A78', iconBg: 'rgba(42,154,120,0.09)' },
  },
  {
    span: 'lg:col-span-2', smSpan: 'sm:col-span-2', wide: true,
    light: { bg: 'rgba(245,158,11,0.07)',  border: 'rgba(245,158,11,0.15)',  icon: '#D97706', iconBg: 'rgba(245,158,11,0.12)' },
    dark:  { bg: '#111318', border: 'rgba(255,255,255,0.06)', icon: '#A08040', iconBg: 'rgba(160,128,64,0.09)' },
  },
  {
    span: 'lg:col-span-1', smSpan: '', wide: false,
    light: { bg: 'rgba(244,63,94,0.07)',   border: 'rgba(244,63,94,0.15)',   icon: '#E11D48', iconBg: 'rgba(244,63,94,0.12)'  },
    dark:  { bg: '#111318', border: 'rgba(255,255,255,0.06)', icon: '#C06070', iconBg: 'rgba(192,96,112,0.09)' },
  },
]

export default function WhyWorkWithMe({ items, t }) {
  const { isDark } = useTheme()

  return (
    <section id="skills" className="py-16 px-6 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="orb orb-a" style={{ width:420, height:420, top:'-60px', left:'-80px', background: isDark ? 'radial-gradient(circle,rgba(99,102,241,0.12) 0%,transparent 70%)' : 'radial-gradient(circle,rgba(59,130,246,0.10) 0%,transparent 70%)', borderRadius:'50%', filter:'blur(60px)', position:'absolute' }}/>
        <div className="orb orb-b" style={{ width:320, height:320, bottom:'-40px', right:'-60px', background: isDark ? 'radial-gradient(circle,rgba(168,85,247,0.10) 0%,transparent 70%)' : 'radial-gradient(circle,rgba(124,58,237,0.08) 0%,transparent 70%)', borderRadius:'50%', filter:'blur(60px)', position:'absolute' }}/>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, margin:'-60px' }}
          className="relative flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8 pb-5"
          style={{ borderBottom: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid var(--border)' }}
        >
          {/* Ghost number */}
          <span
            aria-hidden
            className="absolute right-0 top-[-28px] font-black select-none pointer-events-none leading-none"
            style={{
              fontSize: 'clamp(72px,12vw,120px)',
              color: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(59,130,246,0.06)',
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >01</span>
          <span className="section-num relative z-10">01 - {t.whatIBring}</span>
          <h2 className="text-2xl md:text-3xl font-bold text-gradient leading-tight relative z-10">{t.whyWorkWithMe}</h2>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {items.map((item, i) => {
            const Icon = ICON_MAP[item.icon] ?? Star
            const b = BENTO[i % BENTO.length]
            const theme = isDark ? b.dark : b.light

            return (
              <motion.div
                key={i}
                initial={{ opacity:0, y:20 }}
                whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true, margin:'-30px' }}
                transition={{ delay:(i%3)*0.06, duration:0.35 }}
                whileHover={{ y:-5, transition:{ duration:0.18 } }}
                className={`${b.span} ${b.smSpan} rounded-xl p-5 cursor-default min-h-[130px] transition-all duration-250`}
                style={{
                  background: theme.bg,
                  border: `1px solid ${theme.border}`,
                  boxShadow: isDark ? '0 1px 3px rgba(0,0,0,0.3)' : `0 2px 12px ${theme.border}`,
                }}
              >
                {b.wide ? (
                  <div className="flex items-start gap-4 h-full">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: theme.iconBg }}>
                      <Icon size={18} style={{ color: theme.icon }} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[14px] mb-1 leading-snug" style={{ color: isDark ? '#F0F2F7' : 'var(--text-primary)' }}>
                        {item.title}
                      </h3>
                      <p className="text-[13px] leading-relaxed" style={{ color: isDark ? '#8892A4' : 'var(--text-secondary)' }}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col h-full">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ background: theme.iconBg }}>
                      <Icon size={18} style={{ color: theme.icon }} />
                    </div>
                    <h3 className="font-semibold text-[14px] mb-1 leading-snug" style={{ color: isDark ? '#F0F2F7' : 'var(--text-primary)' }}>
                      {item.title}
                    </h3>
                    <p className="text-[13px] leading-relaxed flex-1" style={{ color: isDark ? '#8892A4' : 'var(--text-secondary)' }}>
                      {item.description}
                    </p>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
