'use client'
import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import ImageGallery from '@/components/ImageGallery'
import { Lang } from '@/data/content'

interface Props { t: any; lang: Lang; onBack: () => void }

const GOOGLE_PHOTOS_LINK = 'https://photos.google.com/share/YOUR_ALBUM_LINK_HERE'
const MEDIA_IMAGES = [
  { id: 1, url: '/11.jpeg' }, { id: 2, url: '/17.jpeg' },
  { id: 3, url: '/12.jpeg' }, { id: 4, url: '/18.jpeg' },
  { id: 5, url: '/13.jpeg' }, { id: 6, url: '/19.jpeg' },
  { id: 7, url: '/15.jpeg' }, { id: 8, url: '/20.jpeg' },
  { id: 9, url: '/16.jpeg' },
]

export default function DarshanView({ t, lang, onBack }: Props) {
  const d = t.darshan
  const isHi = lang === 'hi'
  const [activeTab, setActiveTab] = useState<'story' | 'media'>('story')
  const ff = isHi ? 'Tiro Devanagari Hindi, serif' : 'Cormorant Garamond, serif'

  return (
    <section className="section" style={{ background: 'transparent' }}>
      <div className="container" style={{ maxWidth: 480 }}>
        <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="back-btn" onClick={onBack} style={{ marginBottom: 24 }}>{t.back}</motion.button>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 20 }}>
          <p className="t-label" style={{ marginBottom: 6 }}>{isHi ? 'दैनिक कार्यक्रम' : 'Daily Schedule'}</p>
          <h1 style={{ fontSize: 'clamp(24px, 4vw, 34px)', color: '#5c1a1a', marginBottom: 4, fontFamily: ff, fontWeight: 600 }}>{d.title}</h1>
          <p style={{ fontSize: 17, color: '#8B6914', fontFamily: ff }}>{d.subtitle}</p>
        </motion.div>

        {/* Tabs */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
          style={{ display: 'flex', justifyContent: 'center', gap: 40, marginBottom: 20, borderBottom: '1.5px solid #e8d5a3' }}>
          {[{ key: 'story', en: 'Story', hi: 'कार्यक्रम' }, { key: 'media', en: 'Media', hi: 'मीडिया' }].map(tab => {
            const isActive = activeTab === tab.key
            return (
              <button key={tab.key} onClick={() => setActiveTab(tab.key as any)}
                style={{ padding: '10px 8px', border: 'none', background: 'transparent', cursor: 'pointer', textAlign: 'center', borderBottom: isActive ? '2px solid #8B6914' : '2px solid transparent', marginBottom: -1.5, transition: 'all 0.2s' }}>
                <span style={{ display: 'block', fontSize: 16, fontWeight: 600, color: isActive ? '#5c1a1a' : '#a0896a', fontFamily: ff }}>{isHi ? tab.hi : tab.en}</span>
                <span style={{ display: 'block', fontSize: 10, marginTop: 2, color: isActive ? '#8B6914' : '#a0896a', fontFamily: 'Crimson Text, serif', letterSpacing: '0.06em' }}>
                 
                </span>
              </button>
            )
          })}
        </motion.div>

        <AnimatePresence mode="wait">
          {activeTab === 'story' && (
            <motion.div key="story" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
              <div style={{ background: '#faf6ef', border: '1.5px solid #e8d5a3', borderRadius: 10, overflow: 'hidden', marginBottom: 16 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '110px 1fr', background: '#5c1a1a', padding: '10px 16px' }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.8)', fontFamily: 'Crimson Text, serif', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{isHi ? 'समय' : 'Time'}</span>
                  <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.8)', fontFamily: 'Crimson Text, serif', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{isHi ? 'कार्यक्रम' : 'Program'}</span>
                </div>
                {d.schedule.map((row: any, i: number) => (
                  <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.04 * i }}
                    style={{ display: 'grid', gridTemplateColumns: '110px 1fr', padding: '14px 16px', borderBottom: i < d.schedule.length - 1 ? '1px solid #e8d5a3' : 'none', background: i % 2 === 0 ? '#faf6ef' : '#f5ede0', gap: 8, alignItems: 'flex-start' }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: '#8B6914', fontFamily: 'Crimson Text, serif', letterSpacing: '0.06em' }}>{row.time}</span>
                    <div>
                      <p style={{ fontFamily: ff, fontSize: 16, fontWeight: 600, color: '#5c1a1a', marginBottom: 2 }}>{row.name}</p>
                      <p style={{ fontSize: 13, color: '#7a5c3a', fontFamily: 'Crimson Text, serif', lineHeight: 1.5 }}>{row.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              {d.note && (
                <p style={{ padding: '14px 16px', background: '#faf6ef', border: '1px solid #e8d5a3', borderRadius: 8, fontSize: 14, color: '#7a5c3a', fontFamily: isHi ? ff : 'Crimson Text, serif' }}>{d.note}</p>
              )}
            </motion.div>
          )}
          {activeTab === 'media' && (
            <motion.div key="media" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
              <ImageGallery images={MEDIA_IMAGES}>
                <div style={{ background: '#faf6ef', border: '1.5px solid #e8d5a3', borderRadius: 14, padding: 10, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                  <div data-lightbox-image data-image-index="0" style={{ position: 'relative', aspectRatio: '1/1', borderRadius: 8, overflow: 'hidden', cursor: 'pointer' }}><Image src={MEDIA_IMAGES[0].url} alt="Darshan" fill sizes="140px" style={{ objectFit: 'cover' }} /></div>
                  <div data-lightbox-image data-image-index="1" style={{ position: 'relative', aspectRatio: '1/1', borderRadius: 8, overflow: 'hidden', cursor: 'pointer' }}><Image src={MEDIA_IMAGES[1].url} alt="Darshan" fill sizes="140px" style={{ objectFit: 'cover' }} /></div>
                  <div data-lightbox-image data-image-index="2" style={{ position: 'relative', aspectRatio: '1/1', borderRadius: 8, overflow: 'hidden', cursor: 'pointer' }}><Image src={MEDIA_IMAGES[2].url} alt="Darshan" fill sizes="140px" style={{ objectFit: 'cover' }} /></div>
                  <div data-lightbox-image data-image-index="3" style={{ position: 'relative', aspectRatio: '1/1', borderRadius: 8, overflow: 'hidden', cursor: 'pointer' }}><Image src={MEDIA_IMAGES[3].url} alt="Darshan" fill sizes="140px" style={{ objectFit: 'cover' }} /></div>
                  <div data-lightbox-image data-image-index="4" style={{ position: 'relative', aspectRatio: '1/1', borderRadius: 8, overflow: 'hidden', cursor: 'pointer' }}><Image src={MEDIA_IMAGES[4].url} alt="Darshan" fill sizes="140px" style={{ objectFit: 'cover' }} /></div>
                  <div data-lightbox-image data-image-index="5" style={{ position: 'relative', aspectRatio: '1/1', borderRadius: 8, overflow: 'hidden', cursor: 'pointer' }}><Image src={MEDIA_IMAGES[5].url} alt="Darshan" fill sizes="140px" style={{ objectFit: 'cover' }} /></div>
                  <div data-lightbox-image data-image-index="6" style={{ position: 'relative', aspectRatio: '1/1', borderRadius: 8, overflow: 'hidden', cursor: 'pointer' }}><Image src={MEDIA_IMAGES[6].url} alt="Darshan" fill sizes="140px" style={{ objectFit: 'cover' }} /></div>
                  <div data-lightbox-image data-image-index="7" style={{ position: 'relative', aspectRatio: '1/1', borderRadius: 8, overflow: 'hidden', cursor: 'pointer' }}><Image src={MEDIA_IMAGES[7].url} alt="Darshan" fill sizes="140px" style={{ objectFit: 'cover' }} /></div>
                  <div data-lightbox-image data-image-index="8" style={{ position: 'relative', aspectRatio: '1/1', borderRadius: 8, overflow: 'hidden', cursor: 'pointer' }}><Image src={MEDIA_IMAGES[8].url} alt="Darshan" fill sizes="140px" style={{ objectFit: 'cover' }} /></div>
                </div>
              </ImageGallery>
              <div style={{ textAlign: 'center', marginTop: 16 }}>
                <a href={GOOGLE_PHOTOS_LINK} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#5c1a1a', color: '#fff', borderRadius: 4, padding: '10px 24px', textDecoration: 'none', fontSize: 15, fontWeight: 600, fontFamily: 'Cormorant Garamond, serif', letterSpacing: '0.04em' }}>
                  {isHi ? 'सभी दर्शन फोटो देखें' : 'View All Darshan Photos'}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
