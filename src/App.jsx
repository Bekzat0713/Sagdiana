import { motion } from 'framer-motion'
import { profile } from './data/mockProfile'
import { LanguageProvider, useLanguage } from './components/LanguageContext'
import { ThemeProvider, useTheme } from './components/ThemeContext'
import CardNav from './components/CardNav'
import GetInTouchWidget from './components/GetInTouchWidget'
import AboutSection from './components/AboutSection'
import WhyWorkWithMe from './components/WhyWorkWithMe'
import FolderSection from './components/FolderSection'
import ContactSection from './components/ContactSection'
import DarkVeil from './components/DarkVeil/DarkVeil'

function MainApp() {
  const { t } = useLanguage()
  return (
    <>
      <CardNav t={t} />
      <GetInTouchWidget profile={profile} t={t} />
      <main>
        <AboutSection profile={profile} t={t} />
        <WhyWorkWithMe items={profile.whyWorkWithMe} t={t} />
        <FolderSection
          projects={profile.projects}
          certificates={profile.certificates}
          t={t}
        />
        <ContactSection profile={profile} t={t} />
      </main>
    </>
  )
}

function AppContent() {
  const { isDark } = useTheme()

  return (
    <div className="min-h-screen relative">
      {/* DarkVeil only in light mode */}
      {!isDark && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', willChange: 'transform' }}>
          <DarkVeil speed={0.4} hueShift={200} warpAmount={0.55} noiseIntensity={0} resolutionScale={0.85} />
        </div>
      )}

      {/* Dark mode — subtle atmospheric depth, no animation */}
      {isDark && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          <div style={{ position:'absolute', width:900, height:700, top:'-200px', left:'-200px', borderRadius:'50%', background:'radial-gradient(ellipse, rgba(74,124,255,0.045) 0%, transparent 70%)', filter:'blur(40px)' }} />
          <div style={{ position:'absolute', width:700, height:600, bottom:'-150px', right:'-150px', borderRadius:'50%', background:'radial-gradient(ellipse, rgba(74,124,255,0.03) 0%, transparent 70%)', filter:'blur(40px)' }} />
        </div>
      )}

      <div style={{ position: 'relative', zIndex: 2 }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <MainApp />
        </motion.div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </LanguageProvider>
  )
}
