import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Calendar, Building2, ArrowUpRight, X, ExternalLink, Award } from 'lucide-react'
import Folder from './Folder/Folder'
import { useTheme } from './ThemeContext'

const PAGE_IDS = ['projects', 'certificates', 'resume']

const PAGE_ACCENTS = {
  projects:     '#7C3AED',
  certificates: '#0EA5E9',
  resume:       '#F59E0B',
}

const PAGE_VARIANTS = {
  initial: {
    opacity: 0,
    y: 18,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: 10,
    transition: { duration: 0.18, ease: [0.4, 0, 1, 1] },
  },
}

const GRADIENT_COLORS = [
  ['#3B82F6', '#06B6D4'],
  ['#10B981', '#34D399'],
  ['#EF4444', '#F97316'],
  ['#8B5CF6', '#EC4899'],
]

/* ── Project Detail Modal ── */
function ProjectDetailModal({ item, i, onClose, isDark }) {
  const [c1, c2] = GRADIENT_COLORS[i % GRADIENT_COLORS.length]

  return (
    <motion.div
      key="detail-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[200] flex items-start justify-center overflow-y-auto"
      style={{ backdropFilter: 'blur(8px)', background: isDark ? 'rgba(5,6,8,0.85)' : 'rgba(15,23,42,0.55)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-2xl mx-4 my-12 rounded-3xl overflow-hidden"
        style={{
          background: isDark ? '#111318' : 'rgba(255,255,255,0.98)',
          border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(15,23,42,0.10)',
          boxShadow: isDark ? '0 32px 80px rgba(0,0,0,0.7)' : '0 24px 60px rgba(15,23,42,0.18)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hero photo */}
        <div className="relative h-52 overflow-hidden">
          {item.photo ? (
            <img src={item.photo} alt={item.title}
              className="w-full h-full object-cover object-center"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-6xl"
              style={{ background: `linear-gradient(135deg,${c1},${c2})` }}>
              {item.icon}
            </div>
          )}
          {/* Gradient overlay */}
          <div className="absolute inset-0" style={{
            background: isDark
              ? 'linear-gradient(to bottom, transparent 30%, rgba(17,19,24,0.95) 100%)'
              : `linear-gradient(to bottom, transparent 30%, rgba(255,255,255,0.95) 100%)`,
          }}/>
          {/* Accent bar at top */}
          <div className="absolute top-0 left-0 right-0 h-[3px]"
            style={{ background: isDark ? '#4A7CFF' : `linear-gradient(90deg,${c1},${c2})` }}/>
          {/* Close btn */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-all"
            style={{
              background: isDark ? 'rgba(17,19,24,0.90)' : 'rgba(255,255,255,0.85)',
              border: isDark ? '1px solid rgba(255,255,255,0.10)' : '1px solid rgba(15,23,42,0.12)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <X size={14} style={{ color: isDark ? '#F0F2F7' : '#0F172A' }} />
          </button>
          {/* Year badge */}
          <span className="absolute bottom-4 left-5 text-[10px] font-bold px-2.5 py-0.5 rounded-full"
            style={{
              background: isDark ? 'rgba(255,255,255,0.07)' : `${c1}25`,
              border: isDark ? '1px solid rgba(255,255,255,0.12)' : `1px solid ${c1}50`,
              color: isDark ? '#8892A4' : c1,
              backdropFilter: 'blur(6px)',
            }}>
            {item.year}
          </span>
        </div>

        {/* Content */}
        <div className="px-6 pb-7">
          {/* Title + subtitle */}
          <div className="mt-4 mb-5">
            <h2 className="text-xl font-black leading-snug mb-1"
              style={{ color: isDark ? '#F0F2F7' : '#0F172A' }}>
              {item.title}
            </h2>
            <p className="text-xs font-semibold"
              style={{ color: isDark ? '#4A7CFF' : c1 }}>
              {item.detail?.subtitle}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {item.tags.map((tag) => (
              <span key={tag} className="text-[11px] px-2.5 py-0.5 rounded-full font-medium"
                style={{
                  background: isDark ? 'rgba(255,255,255,0.04)' : `${c1}10`,
                  border: isDark ? '1px solid rgba(255,255,255,0.08)' : `1px solid ${c1}35`,
                  color: isDark ? '#8892A4' : c1,
                }}>
                {tag}
              </span>
            ))}
          </div>

          {/* Sections */}
          <div className="flex flex-col gap-5">
            {item.detail?.sections?.map((section, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + idx * 0.05 }}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-1 h-4 rounded-full" style={{ background: isDark ? '#4A7CFF' : `linear-gradient(${c1},${c2})` }}/>
                  <h3 className="text-[13px] font-bold"
                    style={{ color: isDark ? '#F0F2F7' : '#0F172A' }}>
                    {section.heading}
                  </h3>
                </div>
                <p className="text-[13px] leading-relaxed pl-3"
                  style={{ color: isDark ? '#8892A4' : '#4A5568' }}>
                  {section.body}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Frameworks */}
          {item.detail?.frameworks?.length > 0 && (
            <div className="mt-6 pt-5"
              style={{ borderTop: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(15,23,42,0.07)' }}>
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] mb-3"
                style={{ color: isDark ? '#545E72' : '#94A3B8' }}>
                Frameworks & Tools
              </p>
              <div className="flex flex-wrap gap-1.5">
                {item.detail.frameworks.map((f) => (
                  <span key={f} className="text-[11px] px-2 py-0.5 rounded-md font-medium"
                    style={{
                      background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(15,23,42,0.05)',
                      border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(15,23,42,0.08)',
                      color: isDark ? '#8892A4' : '#4A5568',
                    }}>
                    {f}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          {item.link && item.link !== '#' && (
            <motion.a
              href={item.link}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-6 flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold text-white"
              style={{ background: isDark ? '#4A7CFF' : `linear-gradient(135deg,${c1},${c2})` }}
            >
              <ExternalLink size={14} />
              See Full Project
            </motion.a>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ── Project Card ── */
function ProjectCard({ item, i, isDark, onDetails }) {
  const [c1, c2] = GRADIENT_COLORS[i % GRADIENT_COLORS.length]
  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group rounded-2xl overflow-hidden flex flex-col"
      style={{
        background: isDark ? '#111318' : 'var(--bg-card)',
        border: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid var(--border)',
        boxShadow: isDark ? '0 1px 3px rgba(0,0,0,0.3)' : '0 2px 12px rgba(15,23,42,0.06)',
      }}
    >
      {/* Cover photo */}
      <div className="h-44 relative overflow-hidden">
        {item.photo ? (
          <img
            src={item.photo}
            alt={item.title}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center"
            style={{ background: isDark ? '#181C23' : `linear-gradient(135deg,${c1},${c2})` }}>
            <span className="text-5xl">{item.icon}</span>
          </div>
        )}
        {/* Gradient overlay at bottom */}
        <div className="absolute inset-0" style={{
          background: isDark
            ? 'linear-gradient(to bottom,transparent 40%,rgba(17,19,24,0.92) 100%)'
            : 'linear-gradient(to bottom,transparent 40%,rgba(255,255,255,0.85) 100%)',
        }}/>
        {/* Top accent stripe */}
        <div className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: isDark ? '#4A7CFF' : `linear-gradient(90deg,${c1},${c2},transparent)` }}/>
        <span className="absolute bottom-3 left-4 text-[10px] font-bold px-2 py-0.5 rounded-full"
          style={{
            background: isDark ? 'rgba(255,255,255,0.07)' : `${c1}30`,
            border: isDark ? '1px solid rgba(255,255,255,0.12)' : `1px solid ${c1}50`,
            color: isDark ? '#8892A4' : c1,
            backdropFilter: 'blur(6px)',
          }}>
          {item.year}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-[15px] leading-snug mb-2"
          style={{ color: isDark ? '#F0F2F7' : 'var(--text-primary)' }}>
          {item.title}
        </h3>
        <p className="text-sm leading-relaxed mb-4 flex-1"
          style={{ color: isDark ? '#8892A4' : 'var(--text-secondary)' }}>
          {item.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {item.tags.map((tag) => (
            <span key={tag} className="text-[11px] px-2.5 py-0.5 rounded-full font-medium"
              style={{
                background: isDark ? 'rgba(255,255,255,0.04)' : `${c1}10`,
                border: isDark ? '1px solid rgba(255,255,255,0.08)' : `1px solid ${c1}30`,
                color: isDark ? '#8892A4' : c1,
              }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Dual buttons */}
        <div className="flex gap-2">
          <motion.button
            onClick={() => onDetails(i)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all"
            style={{
              background: isDark ? '#4A7CFF' : `linear-gradient(135deg,${c1},${c2})`,
              color: '#fff',
            }}
          >
            View Details
          </motion.button>
          {item.link && item.link !== '#' && (
            <motion.a
              href={item.link}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-11 flex items-center justify-center rounded-xl transition-all"
              style={{
                background: isDark ? 'rgba(255,255,255,0.05)' : `${c1}12`,
                border: isDark ? '1px solid rgba(255,255,255,0.09)' : `1px solid ${c1}35`,
                color: isDark ? '#8892A4' : c1,
              }}
            >
              <ArrowUpRight size={15} />
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

/* ── Cert Card ── */
function AwardDetailModal({ item, i, onClose, isDark }) {
  const [c1, c2] = GRADIENT_COLORS[i % GRADIENT_COLORS.length]

  return (
    <motion.div
      key="award-detail-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[200] flex items-start justify-center overflow-y-auto"
      style={{ backdropFilter: 'blur(8px)', background: isDark ? 'rgba(5,6,8,0.85)' : 'rgba(15,23,42,0.55)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-3xl mx-4 my-12 rounded-3xl overflow-hidden"
        style={{
          background: isDark ? '#111318' : 'rgba(255,255,255,0.98)',
          border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(15,23,42,0.10)',
          boxShadow: isDark ? '0 32px 80px rgba(0,0,0,0.7)' : '0 24px 60px rgba(15,23,42,0.18)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-[260px] sm:h-[320px] overflow-hidden">
          {item.photo ? (
            <img
              src={item.photo}
              alt={item.title}
              className="w-full h-full object-cover object-center"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-6xl"
              style={{ background: isDark ? '#181C23' : `linear-gradient(135deg,${c1},${c2})` }}>
              {item.badge}
            </div>
          )}
          <div className="absolute inset-0" style={{
            background: isDark
              ? 'linear-gradient(to bottom, transparent 40%, rgba(17,19,24,0.96) 100%)'
              : 'linear-gradient(to bottom, transparent 40%, rgba(255,255,255,0.96) 100%)',
          }} />
          <div className="absolute top-0 left-0 right-0 h-[3px]"
            style={{ background: isDark ? '#4A7CFF' : `linear-gradient(90deg,${c1},${c2})` }} />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-all"
            style={{
              background: isDark ? 'rgba(17,19,24,0.90)' : 'rgba(255,255,255,0.85)',
              border: isDark ? '1px solid rgba(255,255,255,0.10)' : '1px solid rgba(15,23,42,0.12)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <X size={14} style={{ color: isDark ? '#F0F2F7' : '#0F172A' }} />
          </button>
          <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-2 text-[10px] font-bold px-2.5 py-0.5 rounded-full mb-3"
                style={{
                  background: isDark ? 'rgba(255,255,255,0.07)' : `${c1}25`,
                  border: isDark ? '1px solid rgba(255,255,255,0.12)' : `1px solid ${c1}50`,
                  color: isDark ? '#8892A4' : c1,
                  backdropFilter: 'blur(6px)',
                }}>
                <Award size={12} />
                {item.badge}
              </span>
              <h2 className="text-xl sm:text-2xl font-black leading-snug"
                style={{ color: isDark ? '#F0F2F7' : '#0F172A' }}>
                {item.title}
              </h2>
            </div>
            <span className="shrink-0 text-[11px] font-semibold px-3 py-1 rounded-full"
              style={{
                background: isDark ? 'rgba(17,19,24,0.90)' : 'rgba(255,255,255,0.85)',
                border: isDark ? '1px solid rgba(255,255,255,0.10)' : '1px solid rgba(15,23,42,0.08)',
                color: isDark ? '#8892A4' : '#334155',
              }}>
              {item.year}
            </span>
          </div>
        </div>

        <div className="px-6 pb-7">
          <div className="mt-4 mb-5">
            <p className="text-xs font-semibold mb-1"
              style={{ color: isDark ? '#4A7CFF' : c1 }}>
              {item.detail?.subtitle}
            </p>
            <div className="flex flex-wrap items-center gap-3 text-xs"
              style={{ color: isDark ? '#8892A4' : '#4A5568' }}>
              <span className="flex items-center gap-1"><Building2 size={12} />{item.issuer}</span>
              <span className="flex items-center gap-1"><Calendar size={12} />{item.year}</span>
            </div>
          </div>

          {item.tags?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-6">
              {item.tags.map((tag) => (
                <span key={tag} className="text-[11px] px-2.5 py-0.5 rounded-full font-medium"
                  style={{
                    background: isDark ? 'rgba(255,255,255,0.04)' : `${c1}10`,
                    border: isDark ? '1px solid rgba(255,255,255,0.08)' : `1px solid ${c1}35`,
                    color: isDark ? '#8892A4' : c1,
                  }}>
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex flex-col gap-5">
            {item.detail?.sections?.map((section, idx) => (
              <div key={idx}>
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-1 h-4 rounded-full" style={{ background: isDark ? '#4A7CFF' : `linear-gradient(${c1},${c2})` }} />
                  <h3 className="text-[13px] font-bold"
                    style={{ color: isDark ? '#F0F2F7' : '#0F172A' }}>
                    {section.heading}
                  </h3>
                </div>
                <p className="text-[13px] leading-relaxed pl-3"
                  style={{ color: isDark ? '#8892A4' : '#4A5568' }}>
                  {section.body}
                </p>
              </div>
            ))}
          </div>

          {item.link && item.link !== '#' && (
            <motion.a
              href={item.link}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-6 flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold text-white"
              style={{ background: isDark ? '#4A7CFF' : `linear-gradient(135deg,${c1},${c2})` }}
            >
              <ExternalLink size={14} />
              View Credential
            </motion.a>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

function CertCard({ item, i, isDark, onDetails }) {
  const [c1, c2] = GRADIENT_COLORS[i % GRADIENT_COLORS.length]

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group rounded-2xl overflow-hidden flex flex-col"
      style={{
        background: isDark ? '#111318' : 'var(--bg-card)',
        border: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid var(--border)',
        boxShadow: isDark ? '0 1px 3px rgba(0,0,0,0.3)' : '0 2px 12px rgba(15,23,42,0.06)',
      }}
    >
      <div className="relative h-44 overflow-hidden">
        {item.photo ? (
          <img
            src={item.photo}
            alt={item.title}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl font-black text-white"
            style={{ background: isDark ? '#181C23' : `linear-gradient(135deg,${c1},${c2})` }}>
            {item.badge}
          </div>
        )}
        <div className="absolute inset-0" style={{
          background: isDark
            ? 'linear-gradient(to bottom,transparent 38%,rgba(17,19,24,0.92) 100%)'
            : 'linear-gradient(to bottom,transparent 38%,rgba(255,255,255,0.9) 100%)',
        }} />
        <div className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: isDark ? '#4A7CFF' : `linear-gradient(90deg,${c1},${c2},transparent)` }} />
        <div className="absolute left-4 bottom-4 flex flex-wrap gap-2">
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
            style={{
              background: isDark ? 'rgba(255,255,255,0.07)' : `${c1}30`,
              border: isDark ? '1px solid rgba(255,255,255,0.12)' : `1px solid ${c1}50`,
              color: isDark ? '#8892A4' : c1,
              backdropFilter: 'blur(6px)',
            }}>
            {item.badge}
          </span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
            style={{
              background: isDark ? 'rgba(17,19,24,0.90)' : 'rgba(255,255,255,0.84)',
              border: isDark ? '1px solid rgba(255,255,255,0.10)' : '1px solid rgba(15,23,42,0.08)',
              color: isDark ? '#8892A4' : '#334155',
            }}>
            {item.year}
          </span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-[15px] leading-snug mb-2"
          style={{ color: isDark ? '#F0F2F7' : 'var(--text-primary)' }}>
          {item.title}
        </h3>
        <div className="flex items-center gap-2 text-xs mb-3"
          style={{ color: isDark ? '#8892A4' : 'var(--text-secondary)' }}>
          <Building2 size={12} />
          <span className="truncate">{item.issuer}</span>
        </div>
        <p className="text-sm leading-relaxed mb-4 flex-1"
          style={{ color: isDark ? '#8892A4' : 'var(--text-secondary)' }}>
          {item.description}
        </p>

        {item.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {item.tags.map((tag) => (
              <span key={tag} className="text-[11px] px-2.5 py-0.5 rounded-full font-medium"
                style={{
                  background: isDark ? 'rgba(255,255,255,0.04)' : `${c1}10`,
                  border: isDark ? '1px solid rgba(255,255,255,0.08)' : `1px solid ${c1}30`,
                  color: isDark ? '#8892A4' : c1,
                }}>
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex gap-2">
          <motion.button
            onClick={() => onDetails(i)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all"
            style={{
              background: isDark ? '#4A7CFF' : `linear-gradient(135deg,${c1},${c2})`,
              color: '#fff',
            }}
          >
            View Details
          </motion.button>
          {item.link && item.link !== '#' && (
            <motion.a
              href={item.link}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-11 flex items-center justify-center rounded-xl transition-all"
              style={{
                background: isDark ? 'rgba(255,255,255,0.05)' : `${c1}12`,
                border: isDark ? '1px solid rgba(255,255,255,0.09)' : `1px solid ${c1}35`,
                color: isDark ? '#8892A4' : c1,
              }}
            >
              <ArrowUpRight size={15} />
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

/* ── Content Page (folder open → page) ── */
function ContentPage({ pageId, projects, certificates, resume, onBack, t }) {
  const { isDark } = useTheme()
  const [detailIndex, setDetailIndex] = useState(null)
  const label = t.pageLabels[pageId]
  const accent = PAGE_ACCENTS[pageId]
  const containerRef = useRef(null)

  useEffect(() => {
    containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [pageId])

  useEffect(() => {
    setDetailIndex(null)
  }, [pageId])

  const grids = {
    projects: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {projects.map((item, i) => (
          <ProjectCard key={i} item={item} i={i} isDark={isDark} onDetails={setDetailIndex} />
        ))}
      </div>
    ),
    certificates: (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {certificates.map((item, i) => (
          <CertCard key={i} item={item} i={i} isDark={isDark} onDetails={setDetailIndex} />
        ))}
      </div>
    ),
    resume: (
      <div className="grid grid-cols-1 max-w-xl">
        {resume.map((item, i) => (
          <ProjectCard key={i} item={item} i={i} isDark={isDark} onDetails={setDetailIndex} />
        ))}
      </div>
    ),
  }

  return (
    <>
      <motion.div
        ref={containerRef}
        variants={PAGE_VARIANTS}
        initial="initial"
        animate="animate"
        exit="exit"
        className="relative rounded-[32px] px-4 py-8 sm:px-6 sm:py-10 overflow-hidden min-h-[calc(100svh-9rem)]"
        style={{
          background: isDark ? '#0E1015' : 'rgba(255,255,255,0.92)',
          border: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(15,23,42,0.08)',
          boxShadow: isDark ? '0 18px 60px rgba(0,0,0,0.4)' : '0 18px 48px rgba(15,23,42,0.08)',
          willChange: 'transform, opacity',
        }}
      >
        {!isDark && (
          <div className="absolute inset-x-0 top-0 flex justify-center pointer-events-none">
            <div
              className="w-[min(600px,88vw)] h-48 rounded-full blur-3xl"
              style={{ background: accent, opacity: 0.10 }}
            />
          </div>
        )}

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.button
            initial={false}
            onClick={onBack}
            className="flex items-center gap-2 text-sm hover:text-[var(--text-primary)] transition-colors mb-10 group"
            style={{ color: isDark ? '#8892A4' : 'var(--text-secondary)' }}
          >
            <span className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
              style={{
                background: isDark ? '#111318' : 'var(--bg-card)',
                border: isDark ? '1px solid rgba(255,255,255,0.07)' : '1px solid var(--border)',
              }}>
              <ArrowLeft size={15} />
            </span>
            {t.backToFolder}
          </motion.button>

          <motion.div
            initial={false}
            className="mb-10"
          >
            <div
              className="inline-block w-1 h-8 rounded-full mr-4 align-middle"
              style={{ background: isDark ? '#4A7CFF' : accent }}
            />
            <h2 className="inline text-3xl md:text-4xl font-black"
              style={{ color: isDark ? '#F0F2F7' : 'var(--text-primary)' }}>
              {label}
            </h2>
          </motion.div>

          {grids[pageId]}
        </div>
      </motion.div>

      {/* Detail modal — rendered above the content page */}
      <AnimatePresence>
        {detailIndex !== null && pageId === 'projects' && (
          <ProjectDetailModal
            key={`detail-${detailIndex}`}
            item={projects[detailIndex]}
            i={detailIndex}
            onClose={() => setDetailIndex(null)}
            isDark={isDark}
          />
        )}
        {detailIndex !== null && pageId === 'certificates' && (
          <AwardDetailModal
            key={`award-${detailIndex}`}
            item={certificates[detailIndex]}
            i={detailIndex}
            onClose={() => setDetailIndex(null)}
            isDark={isDark}
          />
        )}
        {detailIndex !== null && pageId === 'resume' && (
          <ProjectDetailModal
            key={`resume-${detailIndex}`}
            item={resume[detailIndex]}
            i={detailIndex}
            onClose={() => setDetailIndex(null)}
            isDark={isDark}
          />
        )}
      </AnimatePresence>
    </>
  )
}

function PaperLabel({ text, color }) {
  return (
    <div style={{
      fontSize: '7px', fontWeight: 800, letterSpacing: '0.06em',
      textTransform: 'uppercase', color, textAlign: 'center',
      lineHeight: 1.2, padding: '0 4px', userSelect: 'none', pointerEvents: 'none',
    }}>
      {text}
    </div>
  )
}

export default function FolderSection({ projects, certificates, resume, t }) {
  const { isDark } = useTheme()
  const [folderOpen, setFolderOpen] = useState(false)
  const [activePage, setActivePage] = useState(null)

  const pageMeta = [
    { id: 'projects',     label: t.pageLabels.projects,     accent: PAGE_ACCENTS.projects },
    { id: 'certificates', label: t.pageLabels.certificates, accent: PAGE_ACCENTS.certificates },
    { id: 'resume',       label: t.pageLabels.resume,       accent: PAGE_ACCENTS.resume },
  ]

  return (
    <section id="projects" className="pt-20 pb-28 px-6 relative overflow-visible">
      {/* Background orbs — light mode only */}
      {!isDark && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="orb orb-b w-[440px] h-[440px] bg-violet-400/12 top-[-60px]   right-[-100px]" />
          <div className="orb orb-a w-[320px] h-[320px] bg-blue-400/9   bottom-[-40px] left-[-80px]"  />
        </div>
      )}

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          className="relative flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-10 pb-5"
          style={{ borderBottom: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid var(--border)' }}
        >
          <span
            aria-hidden
            className="absolute right-0 top-[-28px] font-black select-none pointer-events-none leading-none"
            style={{
              fontSize: 'clamp(72px,12vw,120px)',
              color: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(59,130,246,0.06)',
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >02</span>
          <span className="section-num relative z-10">02 - {t.portfolioLabel}</span>
          <div className="text-right relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gradient leading-tight">{t.myWork}</h2>
            <p className="text-xs mt-1" style={{ color: isDark ? '#545E72' : 'var(--text-muted)' }}>{t.openFolderHint}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <AnimatePresence mode="wait" initial={false}>
            {activePage ? (
              <ContentPage
                key={activePage}
                pageId={activePage}
                projects={projects}
                certificates={certificates}
                resume={resume}
                onBack={() => {
                  setActivePage(null)
                  setFolderOpen(true)
                }}
                t={t}
              />
            ) : (
              <motion.div
                key="folder-stage"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center gap-6 pt-4 pb-2"
                style={{ willChange: 'transform, opacity' }}
              >
                <div className="scale-[1.9] sm:scale-[2.3] md:scale-[2.7] origin-bottom opacity-90">
                  <Folder
                    color={isDark ? "#2A4FCC" : "#5227FF"}
                    size={1}
                    open={folderOpen}
                    onToggle={() => setFolderOpen((p) => !p)}
                    onItemClick={(index) => {
                      setFolderOpen(true)
                      setActivePage(PAGE_IDS[index])
                    }}
                    items={[
                      <PaperLabel text={t.pageLabels.projects} color={isDark ? "#1A3A99" : "#3b1fa8"} />,
                      <PaperLabel text={t.pageLabels.certificates} color={isDark ? "#152E80" : "#2e1880"} />,
                      <PaperLabel text={t.pageLabels.resume} color={isDark ? "#7C4A03" : "#92400E"} />,
                    ]}
                  />
                </div>

                {folderOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ delay: 0.15 }}
                    className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs"
                    style={{ color: isDark ? '#8B9CC8' : 'var(--text-secondary)' }}
                  >
                    {pageMeta.map(({ id, label, accent }) => (
                      <button
                        key={id}
                        onClick={() => {
                          setFolderOpen(true)
                          setActivePage(id)
                        }}
                        className="flex items-center gap-1.5 hover:text-[var(--text-primary)] transition-colors"
                      >
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
                        {label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
