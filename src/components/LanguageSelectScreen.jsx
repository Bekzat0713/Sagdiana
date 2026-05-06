import { motion } from 'framer-motion'
import { useLanguage } from './LanguageContext'

const LANGS = [
  {
    code: 'kk',
    native: 'Қазақша',
    label: 'Kazakh',
    accent: 'from-violet-500 to-purple-500',
    border: 'hover:border-violet-400/50',
    bar: 'bg-gradient-to-r from-violet-500 to-purple-500',
  },
  {
    code: 'ru',
    native: 'Русский',
    label: 'Russian',
    accent: 'from-blue-500 to-cyan-400',
    border: 'hover:border-blue-400/50',
    bar: 'bg-gradient-to-r from-blue-500 to-cyan-400',
  },
  {
    code: 'en',
    native: 'English',
    label: 'English',
    accent: 'from-indigo-500 to-violet-400',
    border: 'hover:border-indigo-400/50',
    bar: 'bg-gradient-to-r from-indigo-500 to-violet-400',
  },
]

export default function LanguageSelectScreen() {
  const { setLang } = useLanguage()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.97, filter: 'blur(4px)' }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-6"
    >
      <div className="text-center w-full max-w-lg">

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="text-[11px] font-bold tracking-[0.22em] uppercase text-blue-500/60 mb-4"
        >
          Language · Тіл · Язык
        </motion.p>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-5xl font-black text-[var(--text-primary)] mb-12"
        >
          Choose your language
        </motion.h1>

        {/* Cards */}
        <div className="grid grid-cols-3 gap-4">
          {LANGS.map((lang, i) => (
            <motion.button
              key={lang.code}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.08 }}
              whileHover={{ y: -6, scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setLang(lang.code)}
              className={`glass rounded-2xl p-6 flex flex-col items-center gap-2 cursor-pointer border border-transparent transition-all duration-200 group ${lang.border}`}
            >
              <div
                className={`h-1 rounded-full ${lang.bar} mb-1 transition-all duration-300 group-hover:w-10`}
                style={{ width: 28 }}
              />
              <span className="text-[22px] font-black text-[var(--text-primary)] leading-tight">
                {lang.native}
              </span>
              <span className="text-xs text-[var(--text-muted)] font-semibold tracking-wide">
                {lang.label}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
