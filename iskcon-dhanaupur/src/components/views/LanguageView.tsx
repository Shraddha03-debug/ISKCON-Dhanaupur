'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Lang } from '@/data/content'

interface Props { onSelect: (l: Lang) => void }

export default function LanguageView({ onSelect }: Props) {
  return (
    <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', background: 'transparent' }}>
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1, duration: 0.5 }} style={{ marginBottom: 20 }}>
          <Image src="/welcomenote.png" alt="ISKCON Dhanaupur" width={400} height={400} loading="eager" style={{ objectFit: 'contain', width: 'auto', height: 400 }} />
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} style={{ width: 80, height: 1.5, background: 'linear-gradient(to right, transparent, #8B6914, transparent)', margin: '0 auto 24px' }} />
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          style={{ fontSize: 16, color: '#7a5c3a', marginBottom: 28, fontFamily: 'Crimson Text, serif', letterSpacing: '0.04em' }}>
          Choose your language &nbsp;/&nbsp; भाषा चुनें
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
          style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="lang-card" onClick={() => onSelect('en')}>
            <div style={{ fontSize: 20, fontWeight: 600, color: '#5c1a1a', fontFamily: 'Cormorant Garamond, serif', marginBottom: 6, letterSpacing: '0.04em' }}>English</div>
            <div style={{ fontSize: 13, color: '#7a5c3a', fontFamily: 'Crimson Text, serif' }}>Continue in English</div>
          </button>
          <button className="lang-card" onClick={() => onSelect('hi')}>
            <div style={{ fontSize: 20, fontWeight: 600, color: '#5c1a1a', fontFamily: 'Tiro Devanagari Hindi, serif', marginBottom: 6 }}>हिन्दी</div>
            <div style={{ fontSize: 13, color: '#7a5c3a', fontFamily: 'Tiro Devanagari Hindi, serif' }}>हिंदी में जारी रखें</div>
          </button>
        </motion.div>
      </motion.div>
    </section>
  )
}
