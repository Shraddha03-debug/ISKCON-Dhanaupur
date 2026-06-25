'use client'
import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

interface ImageItem {
  id: number | string
  url: string
}

interface Props {
  images: ImageItem[]
  children: React.ReactNode // Grid JSX from parent
}

export default function ImageGallery({ images, children }: Props) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const handlePrev = () => {
    if (selectedIndex === null) return
    setSelectedIndex(selectedIndex === 0 ? images.length - 1 : selectedIndex - 1)
  }

  const handleNext = () => {
    if (selectedIndex === null) return
    setSelectedIndex(selectedIndex === images.length - 1 ? 0 : selectedIndex + 1)
  }

  return (
    <>
      {/* Grid - parent children wrapped with click handlers */}
      <div onClick={(e) => {
        const target = e.target as HTMLElement
        const img = target.closest('[data-lightbox-image]') as HTMLElement
        if (img) {
          const idx = img.getAttribute('data-image-index')
          if (idx !== null) setSelectedIndex(parseInt(idx))
        }
      }}>
        {children}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 50,
              padding: '20px'
            }}
          >
            {/* Image Container */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'relative',
                width: '90vw',
                height: '80vh',
                maxWidth: '90vw',
                maxHeight: '80vh',
                borderRadius: 8,
                overflow: 'hidden'
              }}
            >
              <Image
                key={selectedIndex}
                src={images[selectedIndex].url}
                alt="Gallery"
                fill
                sizes="90vw"
                style={{ objectFit: 'contain' }}
                priority
              />
            </motion.div>

            {/* Close Button (X) - Mobile responsive */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.15 }}
              onClick={() => setSelectedIndex(null)}
              style={{
                position: 'fixed',
                top: 'clamp(70px, 8vw, 50px)',
                right: 'clamp(15px, 5vw, 30px)',
                background: 'rgba(255, 255, 255, 0.15)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                width: 'clamp(44px, 11vw, 50px)',
                height: 'clamp(44px, 11vw, 50px)',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: 'clamp(28px, 8vw, 36px)',
                fontWeight: 300,
                backdropFilter: 'blur(10px)',
                zIndex: 999,
                transition: 'all 0.2s'
              }}
            >
              ×
            </motion.button>

            {/* Previous Arrow - Non-intrusive styling */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              whileHover={{ background: 'rgba(255, 255, 255, 0.15)' }}
              onClick={handlePrev}
              style={{
                position: 'fixed',
                left: 'clamp(8px, 3%, 20px)',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'transparent',
                border: 'none',
                width: 'clamp(36px, 10vw, 44px)',
                height: 'clamp(36px, 10vw, 44px)',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'rgba(255, 255, 255, 0.5)',
                fontSize: 'clamp(24px, 7vw, 32px)',
                backdropFilter: 'none',
                zIndex: 999,
                transition: 'all 0.3s',
                padding: 0
              }}

              
            >
              ‹
            </motion.button>

            {/* Next Arrow - Non-intrusive styling */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              whileHover={{ background: 'rgba(255, 255, 255, 0.15)' }}
              onClick={handleNext}
              style={{
                position: 'fixed',
                right: 'clamp(8px, 3%, 20px)',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'transparent',
                border: 'none',
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'rgba(255, 255, 255, 0.5)',
                fontSize: '32px',
                lineHeight: '1',
                backdropFilter: 'none',
                zIndex: 999,
                transition: 'all 0.3s',
                padding: 0,
                margin: 0
              }}
            >
              ›
            </motion.button>

            {/* Counter - Mobile responsive */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              style={{
                position: 'fixed',
                bottom: 'clamp(15px, 5vw, 30px)',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgba(255, 255, 255, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.4)',
                color: '#fff',
                padding: 'clamp(8px, 2vw, 10px) clamp(12px, 3vw, 18px)',
                borderRadius: '24px',
                fontSize: 'clamp(12px, 3vw, 15px)',
                backdropFilter: 'blur(10px)',
                zIndex: 999
              }}
            >
              {selectedIndex + 1} / {images.length}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
