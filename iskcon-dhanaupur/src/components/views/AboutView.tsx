'use client'
import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import ImageGallery from '@/components/ImageGallery'
import { Lang } from '@/data/content'

interface Props { t: any; lang: Lang; onBack: () => void }

const MEDIA_IMAGES = [
  { id: 1, url: '/1.jpeg' }, 
  { id: 2, url: '/2.jpeg' }, 
  { id: 3, url: '/3.jpeg' }, 
  { id: 4, url: '/4.jpeg' },
  { id: 5, url: '/5.jpeg' },
  { id: 6, url: '/6.jpeg' }, 
  { id: 7, url: '/7.jpeg' }, 
  { id: 8, url: '/8.jpeg' },
  { id: 9, url: '/9.jpeg' }, 
]

export default function AboutView({ t, lang, onBack }: Props) {
  const a = t.about
  const isHi = lang === 'hi'
  const [activeTab, setActiveTab] = useState<'story' | 'media'>('story')
  const ff = isHi ? 'Tiro Devanagari Hindi, serif' : 'Cormorant Garamond, serif'

  return (
    <section className="section" style={{ background: 'transparent' }}>
      <div className="container" style={{ maxWidth: 480 }}>
        <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="back-btn" onClick={onBack} style={{ marginBottom: 24 }}>{t.back}</motion.button>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 20 }}>
          <h1 style={{ fontSize: 'clamp(24px, 4vw, 34px)', color: '#7a1f1f', marginBottom: 4, fontFamily: ff, fontWeight: 600 }}>{a.title}</h1>
        </motion.div>

        {/* Tabs */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
          style={{ display: 'flex', justifyContent: 'center', gap: 40, marginBottom: 20, borderBottom: '1.5px solid #d4c2a5' }}>
          {[{ key: 'story', en: 'Story', hi: 'परिचय' }, { key: 'media', en: 'Media', hi: 'मीडिया' }].map(tab => {
            const isActive = activeTab === tab.key
            return (
              <button key={tab.key} onClick={() => setActiveTab(tab.key as any)}
                style={{ padding: '10px 8px', border: 'none', background: 'transparent', cursor: 'pointer', textAlign: 'center', borderBottom: isActive ? '2px solid #b8860b' : '2px solid transparent', marginBottom: -1.5, transition: 'all 0.2s' }}>
                <span style={{ display: 'block', fontSize: 17, fontWeight: 600, color: isActive ? '#7a1f1f' : '#a0846c', fontFamily: ff }}>{isHi ? tab.hi : tab.en}</span>
                <span style={{ display: 'block', fontSize: 10, marginTop: 2, color: isActive ? '#b8860b' : '#a0846c', fontFamily: 'Crimson Text, serif', letterSpacing: '0.08em' }}>
                  
                </span>
              </button>
            )
          })}
        </motion.div>

        <AnimatePresence mode="wait">
          {activeTab === 'story' && (
            <motion.div key="story" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
              <div style={{ background: 'rgba(253,245,230,0.9)', border: '1.5px solid #d4c2a5', borderRadius: 12, padding: '20px' }}>
                {a.sections.map((sec: any, i: number) => (
                  <div key={i} style={{ marginBottom: 18 }}>
                    <h3 style={{ fontSize: 18, fontWeight: 600, color: '#7a1f1f', marginBottom: 8, fontFamily: ff }}>{sec.heading}</h3>
                    {sec.paragraphs?.map((p: string, j: number) => (
                      <p key={j} style={{ fontSize: 15, color: '#4a3c2b', lineHeight: 1.8, fontFamily: isHi ? ff : 'Crimson Text, serif', marginBottom: 10 }}>{p}</p>
                    ))}
                    {sec.list && (
                      <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                        {sec.list.map((point: string, k: number) => (
                          <li key={k} style={{ display: 'flex', gap: 8, fontSize: 15, color: '#4a3c2b', lineHeight: 1.7, fontFamily: isHi ? ff : 'Crimson Text, serif', marginBottom: 6 }}>
                            <span style={{ color: '#b8860b', flexShrink: 0 }}>•</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
                {[{ label: isHi ? 'पता' : 'Address', value: a.address }, { label: isHi ? 'फोन' : 'Phone', value: a.phone }, { label: isHi ? 'ईमेल' : 'Email', value: a.email }].map((item, i) => (
                  <div key={i} style={{ borderTop: '1px solid #d4c2a5', paddingTop: 12, marginTop: 12 }}>
                    <p className="t-label" style={{ marginBottom: 4 }}>{item.label}</p>
                    <p style={{ fontSize: 15, color: '#4a3c2b', fontFamily: isHi ? ff : 'Crimson Text, serif' }}>{item.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
          {activeTab === 'media' && (
            <motion.div key="media" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
              <ImageGallery images={MEDIA_IMAGES}>
                <div style={{ background: 'rgba(253,245,230,0.9)', border: '1.5px solid #d4c2a5', borderRadius: 14, padding: 10, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                  <div data-lightbox-image data-image-index="0" style={{ position: 'relative', aspectRatio: '1/1', borderRadius: 8, overflow: 'hidden', cursor: 'pointer' }}><Image src={MEDIA_IMAGES[0].url} alt="About" fill sizes="140px" style={{ objectFit: 'cover' }} /></div>
                  <div data-lightbox-image data-image-index="1" style={{ position: 'relative', aspectRatio: '1/1', borderRadius: 8, overflow: 'hidden', cursor: 'pointer' }}><Image src={MEDIA_IMAGES[1].url} alt="About" fill sizes="140px" style={{ objectFit: 'cover' }} /></div>
                  <div data-lightbox-image data-image-index="2" style={{ position: 'relative', aspectRatio: '1/1', borderRadius: 8, overflow: 'hidden', cursor: 'pointer' }}><Image src={MEDIA_IMAGES[2].url} alt="About" fill sizes="140px" style={{ objectFit: 'cover' }} /></div>
                  <div data-lightbox-image data-image-index="3" style={{ position: 'relative', aspectRatio: '1/1', borderRadius: 8, overflow: 'hidden', cursor: 'pointer' }}><Image src={MEDIA_IMAGES[3].url} alt="About" fill sizes="140px" style={{ objectFit: 'cover' }} /></div>
                  <div data-lightbox-image data-image-index="4" style={{ position: 'relative', aspectRatio: '1/1', borderRadius: 8, overflow: 'hidden', cursor: 'pointer' }}><Image src={MEDIA_IMAGES[4].url} alt="About" fill sizes="140px" style={{ objectFit: 'cover' }} /></div>
                  <div data-lightbox-image data-image-index="5" style={{ position: 'relative', aspectRatio: '1/1', borderRadius: 8, overflow: 'hidden', cursor: 'pointer' }}><Image src={MEDIA_IMAGES[5].url} alt="About" fill sizes="140px" style={{ objectFit: 'cover' }} /></div>
                  <div data-lightbox-image data-image-index="6" style={{ position: 'relative', aspectRatio: '1/1', borderRadius: 8, overflow: 'hidden', cursor: 'pointer' }}><Image src={MEDIA_IMAGES[6].url} alt="About" fill sizes="140px" style={{ objectFit: 'cover' }} /></div>
                  <div data-lightbox-image data-image-index="7" style={{ position: 'relative', aspectRatio: '1/1', borderRadius: 8, overflow: 'hidden', cursor: 'pointer' }}><Image src={MEDIA_IMAGES[7].url} alt="About" fill sizes="140px" style={{ objectFit: 'cover' }} /></div>
                  <div data-lightbox-image data-image-index="8" style={{ position: 'relative', aspectRatio: '1/1', borderRadius: 8, overflow: 'hidden', cursor: 'pointer' }}><Image src={MEDIA_IMAGES[8].url} alt="About" fill sizes="140px" style={{ objectFit: 'cover' }} /></div>
                </div>
              </ImageGallery>
              <div style={{ textAlign: 'center', marginTop: 16 }}>
                <a href="https://photos.app.goo.gl/g3xXmph5ap7GfZuMA" target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#7a1f1f', color: '#fff', borderRadius: 4, padding: '10px 24px', textDecoration: 'none', fontSize: 15, fontWeight: 600, fontFamily: 'Cormorant Garamond, serif', letterSpacing: '0.04em' }}>
                  {isHi ? 'सभी फोटो देखें' : 'View All Photos'}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
