'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Lang } from '@/data/content'

interface Props { t: any; lang: Lang; onSelect: (id: string) => void }

const stagger = { animate: { transition: { staggerChildren: 0.06 } } }
const item = { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } } }

export default function MenuView({ t, lang, onSelect }: Props) {
  const isHi = lang === 'hi'
  const ff = isHi ? 'Tiro Devanagari Hindi, serif' : 'Cormorant Garamond, serif'

  const carouselImages = [
    { src: '/deity1.jpg', alt: 'Sri Sri Radha ShyamSundar 1' },
    { src: '/Jagannath Darshan.jpeg', alt: 'Sri Sri Radha ShyamSundar 2' },
    { src: '/deityy3.jpg', alt: 'Sri Sri Radha ShyamSundar 3' },
    { src: '/deity.jpg', alt: 'Sri Sri Radha ShyamSundar 1 Clone' }, // Endless loop ke liye clone zaroori hai
  ];

  return (
    <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 24px 60px', background: 'transparent' }}>
      
      {/* Perfect Continuous Loop Keyframes */}
      <style jsx global>{`
        @keyframes continuousCarousel {
          /* Slide 1: Hold */
          0%, 28% { transform: translateX(0); }
          
          /* Slide 1 se Slide 2: Transition */
          33%, 61% { transform: translateX(-25%); }
          
        
          66%, 94% { transform: translateX(-50%); }
          
          
          100% { transform: translateX(-75%); }
        }
        
        .sliding-track {
          display: flex;
          width: 400%;
          height: 100%;
          
          animation: continuousCarousel 12s infinite linear;
        }
      `}</style>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: 'center', marginBottom: 32, width: '100%', maxWidth: 480 }}>
        
        <div style={{ 
          width: '100%', 
          margin: '0 auto 20px', 
          borderRadius: 20, 
          overflow: 'hidden', 
          background: '#f0e6c8', 
          position: 'relative', 
          aspectRatio: '16/9', 
          boxShadow: '0 0 18px 6px rgba(255,255,250,0.95), 0 0 40px 14px rgba(255,250,230,0.7), 0 0 75px 24px rgba(255,245,210,0.4)' 
        }}>
          
          <div className="sliding-track">
            {carouselImages.map((img, index) => (
              <div key={index} style={{ width: '25%', height: '100%', position: 'relative' }}>
                <Image 
                  src={img.src} 
                  alt={img.alt} 
                  fill 
                  sizes="(max-width: 600px) 100vw, 480px" 
                  loading={index === 0 ? "eager" : "lazy"} 
                  style={{ objectFit: 'cover', zIndex: 1 }} 
                />
              </div>
            ))}
          </div>

        </div>
        
        <h1 style={{ fontSize: 'clamp(20px, 3.5vw, 30px)', fontWeight: 600, color: '#5c1a1a', marginBottom: 6, fontFamily: ff, letterSpacing: '0.02em' }}>
          {t.menuTitle}
        </h1>
        <p style={{ fontSize: 15, color: '#8B6914', fontFamily: 'Crimson Text, serif', letterSpacing: '0.04em' }}>{t.menuSubtitle}</p>
        <div style={{ width: 60, height: 1.5, background: 'linear-gradient(to right, transparent, #8B6914, transparent)', margin: '14px auto 0' }} />
      </motion.div>

      <motion.div variants={stagger} initial="initial" animate="animate" className="menu-grid"
        style={{ width: '100%' }}>
        {t.menu.map((m: any) => (
          <motion.button key={m.id} variants={item} className="menu-card" onClick={() => onSelect(m.id)} whileTap={{ scale: 0.97 }}>
            <span style={{ fontSize: isHi ? 16 : 15.5, fontWeight: 600, color: '#5c1a1a', fontFamily: ff, letterSpacing: 0 }}>{m.label}</span>
            <span style={{ fontSize: 13, color: '#7a5c3a', fontFamily: isHi ? 'Tiro Devanagari Hindi, serif' : 'Crimson Text, serif' }}>{m.sub}</span>
          </motion.button>
        ))}
      </motion.div>
    </section>
  )
}