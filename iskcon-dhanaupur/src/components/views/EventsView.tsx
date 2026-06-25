'use client'
import { motion } from 'framer-motion'
import { Lang } from '@/data/content'

interface Props { t: any; lang: Lang; onBack: () => void }

export default function EventsView({ t, lang, onBack }: Props) {
  const ev = t.events
  const isHi = lang === 'hi'
  const ff = isHi ? 'Tiro Devanagari Hindi, serif' : 'Cormorant Garamond, serif'

  return (
    <section className="section" style={{ background: 'transparent' }}>
      <div className="container" style={{ maxWidth: 480 }}>
        <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="back-btn" onClick={onBack} style={{ marginBottom: 32 }}>{t.back}</motion.button>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 28 }}>
          <p className="t-label" style={{ marginBottom: 6 }}>{isHi ? 'कैलेंडर २०२६' : 'Calendar 2026'}</p>
          <h1 style={{ fontSize: 'clamp(24px, 4vw, 34px)', color: '#5c1a1a', marginBottom: 4, fontFamily: ff, fontWeight: 600 }}>{ev.title}</h1>
          <p style={{ fontSize: 17, color: '#8B6914', fontFamily: ff }}>{ev.subtitle}</p>
          <div style={{ width: 60, height: 1.5, background: 'linear-gradient(to right, transparent, #8B6914, transparent)', marginTop: 14 }} />
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {ev.list.map((item: any, i: number) => (
            <motion.div key={i} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.07 * i }} className="event-card">
              <div className="event-date-block">
                <span style={{ fontSize: 26, color: '#fff', lineHeight: 1, fontFamily: 'Cormorant Garamond, serif', fontWeight: 600 }}>{item.date}</span>
                <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 11, marginTop: 3, fontFamily: 'Crimson Text, serif', letterSpacing: '0.08em' }}>{item.month}</span>
              </div>
              <div style={{ padding: '14px 16px' }}>
                <p style={{ fontFamily: ff, fontSize: isHi ? 16 : 17, fontWeight: 600, color: '#5c1a1a', marginBottom: 4 }}>{item.name}</p>
                <p style={{ fontSize: 13, color: '#7a5c3a', fontFamily: isHi ? ff : 'Crimson Text, serif', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
          style={{ marginTop: 24, padding: '16px', background: '#faf6ef', border: '1.5px solid #e8d5a3', borderRadius: 8, textAlign: 'center' }}>
          <p style={{ fontSize: 13, color: '#7a5c3a', fontFamily: isHi ? ff : 'Crimson Text, serif' }}>
            {isHi ? 'अधिक जानकारी: +91 8127443777' : 'For more info: +91 8127443777'}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
