'use client'
import { motion } from 'framer-motion'
import { Lang } from '@/data/content'

interface Props { t: any; lang: Lang; onBack: () => void }

export default function YatraView({ t, lang, onBack }: Props) {
  const y = t.yatra
  const isHi = lang === 'hi'
  const ff = isHi ? 'Tiro Devanagari Hindi, serif' : 'Cormorant Garamond, serif'

  return (
    <section className="section" style={{ background: 'transparent' }}>
      <div className="container" style={{ maxWidth: 480 }}>
        <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="back-btn" onClick={onBack} style={{ marginBottom: 32 }}>{t.back}</motion.button>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 28 }}>
          <p className="t-label" style={{ marginBottom: 6 }}>{isHi ? 'तीर्थ यात्राएं' : 'Pilgrimages'}</p>
          <h1 style={{ fontSize: 'clamp(24px, 4vw, 34px)', color: '#7a1f1f', marginBottom: 4, fontFamily: ff, fontWeight: 600 }}>{y.title}</h1>
          <p style={{ fontSize: 15, color: '#a0846c', fontFamily: isHi ? ff : 'Crimson Text, serif', lineHeight: 1.7 }}>{y.desc}</p>
          <div className="gold-line" style={{ maxWidth: 80, marginTop: 14 }} />
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {y.list.map((item: any, i: number) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 * i }}
              style={{ background: 'rgba(253,245,230,0.9)', border: '1.5px solid #d4c2a5', borderRadius: 10, padding: '18px', borderLeft: '3px solid #b8860b' }}>
              <p style={{ fontSize: 17, fontWeight: 600, color: '#7a1f1f', marginBottom: 6, fontFamily: ff }}>{item.name}</p>
              <p style={{ fontSize: 14, color: '#a0846c', fontFamily: isHi ? ff : 'Crimson Text, serif', lineHeight: 1.6 }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          style={{ marginTop: 20, padding: '16px', background: 'rgba(253,245,230,0.9)', border: '1.5px solid #d4c2a5', borderRadius: 8, textAlign: 'center' }}>
          <p style={{ fontSize: 15, color: '#7a1f1f', fontFamily: isHi ? ff : 'Crimson Text, serif', fontWeight: 600 }}>{y.contact}</p>
        </motion.div>
      </div>
    </section>
  )
}
