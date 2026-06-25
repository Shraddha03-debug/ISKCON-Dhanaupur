'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Lang } from '@/data/content'

interface Props { t: any; lang: Lang; onBack: () => void }

export default function IskconView({ t, lang, onBack }: Props) {
  const ik = t.iskcon
  const isHi = lang === 'hi'
  const ff = isHi ? 'Tiro Devanagari Hindi, serif' : 'Cormorant Garamond, serif'

  return (
    <section className="section" style={{ background: 'transparent' }}>
      <div className="container" style={{ maxWidth: 480 }}>
        <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="back-btn" onClick={onBack} style={{ marginBottom: 32 }}>{t.back}</motion.button>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 24 }}>
          <p className="t-label" style={{ marginBottom: 6 }}>{isHi ? 'संस्था परिचय' : 'Organisation'}</p>
          <h1 style={{ fontSize: 'clamp(22px, 4vw, 32px)', color: '#7a1f1f', marginBottom: 4, fontFamily: ff, fontWeight: 600 }}>{ik.title}</h1>
          <p style={{ fontSize: 15, color: '#b8860b', fontFamily: ff }}>{ik.subtitle}</p>
          <div className="gold-line" style={{ maxWidth: 80, marginTop: 14 }} />
        </motion.div>

        {/* Prabhupada image */}
        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}
          style={{ width: '100%', aspectRatio: '4/3', position: 'relative', borderRadius: 12, overflow: 'hidden', border: '2px solid #d4c2a5', marginBottom: 20, boxShadow: '0 0 15px rgba(255,255,255,0.5)' }}>
          <Image src="/prabhupada.jpeg" alt="Srila Prabhupada" fill sizes="480px" style={{ objectFit: 'cover' }}
            onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(74,60,43,0.7), transparent)', padding: '20px 16px 12px' }}>
            <p style={{ color: '#fff', fontFamily: ff, fontSize: 16, fontWeight: 600, textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>
              {isHi ? 'श्रील ए.सी. भक्तिवेदांत स्वामी प्रभुपाद' : 'His Divine Grace A.C. Bhaktivedanta Swami Prabhupada'}
            </p>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontFamily: 'Crimson Text, serif', fontSize: 13 }}>
              {isHi ? 'संस्थापक-आचार्य, इस्कॉन' : 'Founder-Acharya, ISKCON'}
            </p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
          style={{ background: 'rgba(253,245,230,0.9)', border: '1.5px solid #d4c2a5', borderRadius: 12, padding: '20px' }}>
          <p style={{ fontSize: 15, color: '#4a3c2b', lineHeight: 1.8, fontFamily: isHi ? ff : 'Crimson Text, serif', marginBottom: 20 }}>{ik.body}</p>
          <div style={{ borderTop: '1px solid #d4c2a5', paddingTop: 14 }}>
            <p className="t-label" style={{ marginBottom: 4 }}>{isHi ? 'संस्थापक' : 'Founder'}</p>
            <p style={{ fontSize: 15, color: '#4a3c2b', fontFamily: isHi ? ff : 'Crimson Text, serif' }}>{ik.founder}</p>
          </div>
          <div style={{ borderTop: '1px solid #d4c2a5', paddingTop: 14, marginTop: 14 }}>
            <p className="t-label" style={{ marginBottom: 4 }}>Website</p>
            <a href={`https://${ik.website}`} target="_blank" rel="noopener noreferrer"
              style={{ fontSize: 15, color: '#7a1f1f', fontFamily: 'Crimson Text, serif', textDecoration: 'none' }}>{ik.website}</a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
