'use client'
import { motion } from 'framer-motion'
import { Lang } from '@/data/content'

interface Props { t: any; lang: Lang; onBack: () => void }

export default function EkadashiView({ t, lang, onBack }: Props) {
  const ek = t.ekadashi
  const isHi = lang === 'hi'
  const ff = isHi ? 'Tiro Devanagari Hindi, serif' : 'Cormorant Garamond, serif'

  return (
    <section className="section" style={{ background: 'transparent' }}>
      <div className="container" style={{ maxWidth: 480 }}>
        <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="back-btn" onClick={onBack} style={{ marginBottom: 32 }}>{t.back}</motion.button>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 24 }}>
          <p className="t-label" style={{ marginBottom: 6 }}> {isHi ? 'व्रत एवं उपवास' : 'Vrat & Fasting'}</p>
          <h1 style={{ fontSize: 'clamp(24px, 4vw, 34px)', color: '#7a1f1f', marginBottom: 6, fontFamily: ff, fontWeight: 600 }}>{ek.title}</h1>
          <p style={{ fontSize: 17, color: '#b8860b', fontFamily: ff, marginBottom: 12 }}>{ek.subtitle}</p>
          <p style={{ fontSize: 15, color: '#a0846c', fontFamily: isHi ? ff : 'Crimson Text, serif', lineHeight: 1.7 }}>{ek.about}</p>
          <div className="gold-line" style={{ maxWidth: 80, marginTop: 14 }} />
        </motion.div>

        {/* Fasting rules */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
          style={{ marginBottom: 32, background: 'rgba(253,245,230,0.9)', border: '1.5px solid #d4c2a5', borderRadius: 10, padding: '20px' }}>
          <p className="t-label" style={{ marginBottom: 14 }}>{ek.fasting}</p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {ek.fastingRules.map((rule: string, i: number) => (
              <motion.li key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.06 }}
                style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ color: '#b8860b', flexShrink: 0, marginTop: 2, fontSize: 16 }}>✦</span>
                <span style={{ fontSize: 15, color: '#4a3c2b', fontFamily: isHi ? ff : 'Crimson Text, serif', lineHeight: 1.6 }}>{rule}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Calendar table */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
          <p className="t-label" style={{ marginBottom: 14 }}>{isHi ? 'एकादशी तिथियाँ २०२६' : 'Ekadashi Dates 2026'}</p>
          <div style={{ background: 'rgba(253,245,230,0.9)', border: '1.5px solid #d4c2a5', borderRadius: 10, overflow: 'hidden' }}>
            <div className="ekadashi-row ekadashi-header">
              <div className="ekadashi-cell">{isHi ? 'तिथि' : 'Date'}</div>
              <div className="ekadashi-cell">{isHi ? 'एकादशी का नाम' : 'Ekadashi Name'}</div>
              <div className="ekadashi-cell">{isHi ? 'पारण' : 'Paran'}</div>
            </div>
            {ek.list.map((row: any, i: number) => (
              <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.03 * i + 0.4 }}
                className="ekadashi-row" style={{ background: i % 2 === 0 ? 'rgba(253,245,230,0.9)' : '#f7eed7' }}>
                <div className="ekadashi-cell"><span style={{ color: '#7a1f1f', fontWeight: 600, fontSize: 13 }}>{row.date}</span></div>
                <div className="ekadashi-cell"><span style={{ fontFamily: ff, fontSize: 15, color: '#4a3c2b', fontWeight: 600 }}>{row.name}</span></div>
                <div className="ekadashi-cell"><span style={{ color: '#a0846c', fontSize: 13 }}>{row.paran}</span></div>
              </motion.div>
            ))}
          </div>
          <p style={{ marginTop: 12, fontSize: 13, color: '#a0846c', textAlign: 'center', fontFamily: isHi ? ff : 'Crimson Text, serif' }}>
            {isHi ? '* तिथियाँ स्थानीय पंचांग के अनुसार परिवर्तित हो सकती हैं।' : '* Dates may vary based on local Panchang.'}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
