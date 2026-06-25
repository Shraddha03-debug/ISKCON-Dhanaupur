'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface NavbarProps {
  lang?: 'en' | 'hi'
  onLangChange?: (lang: 'en' | 'hi') => void
  menu?: { id: string; label: string; sub?: string }[]
  onMenuSelect?: (id: string) => void
  showLangSwitch?: boolean
  showHamburger?: boolean
}

export default function Navbar({ lang = 'en', onLangChange, menu = [], onMenuSelect, showLangSwitch = true, showHamburger = true }: NavbarProps) {
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
    const onScroll = () => setScrolled(window.scrollY > 48)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const ff = lang === 'hi' ? 'Tiro Devanagari Hindi, serif' : 'Cormorant Garamond, serif'

  return (
    <>
      <nav className={`site-nav${mounted && scrolled ? ' scrolled' : ''}`}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>

          {/* Logo Section */}
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <Image
              src="/ISKCON Logo.png"
              alt="ISKCON Dhanaupur"
              width={160}
              height={56}
              priority 
              style={{ 
                objectFit: 'contain', 
                width: 'auto', 
                height: 'clamp(30px, 15vw, 40px)'
              }}
            />
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            {showLangSwitch && (
              <div style={{
                display: 'flex', alignItems: 'center', gap: 3,
                background: '#faf6ef', border: '1.5px solid #c9a84c',
                borderRadius: 20, padding: '3px 4px', flexShrink: 0,
              }}>
                <button type="button" onClick={() => onLangChange?.('en')}
                  style={{
                    background: lang === 'en' ? '#7a1f1f' : 'transparent',
                    color: lang === 'en' ? '#fdf5e6' : '#8B6914',
                    border: 'none', padding: '6px 12px', borderRadius: 16,
                    cursor: 'pointer', fontSize: 12, fontFamily: 'Cormorant Garamond, serif',
                    fontWeight: 700, letterSpacing: '0.05em', transition: 'background 0.2s, color 0.2s',
                  }}>
                  EN
                </button>
                <button type="button" onClick={() => onLangChange?.('hi')}
                  style={{
                    background: lang === 'hi' ? '#7a1f1f' : 'transparent',
                    color: lang === 'hi' ? '#fdf5e6' : '#8B6914',
                    border: 'none', padding: '6px 12px', borderRadius: 16,
                    cursor: 'pointer', fontSize: 13, fontFamily: 'Tiro Devanagari Hindi, serif',
                    transition: 'background 0.2s, color 0.2s',
                  }}>
                  हिन्दी
                </button>
              </div>
            )}

            {showHamburger && (
              <button onClick={() => setOpen(v => !v)} aria-label="Open menu"
                style={{
                  background: 'none', border: '1.5px solid #c9a84c', borderRadius: 8,
                  cursor: 'pointer', padding: '8px 9px', display: 'flex',
                  flexDirection: 'column', gap: 5, flexShrink: 0,
                }}>
                {[0, 1, 2].map(i => (
                  <span key={i} style={{
                    display: 'block', width: 20, height: 1.6, background: '#7a1f1f', borderRadius: 2,
                    transition: 'transform 0.25s, opacity 0.25s',
                    transform: open && i === 0 ? 'rotate(45deg) translate(4.5px,4.5px)' : open && i === 2 ? 'rotate(-45deg) translate(4.5px,-4.5px)' : 'none',
                    opacity: open && i === 1 ? 0 : 1,
                  }} />
                ))}
              </button>
            )}
          </div>
        </div>
      </nav>

      {open && showHamburger && (
        <div className="drawer-overlay" onClick={() => setOpen(false)}>
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: '#fdf5e6', borderRadius: 16, width: 300,
              maxHeight: '80vh', overflowY: 'auto',
              padding: '14px 14px 18px',
              display: 'flex', flexDirection: 'column', gap: 4,
              boxShadow: '0 0 0 1px rgba(184,134,11,0.2), 0 12px 40px rgba(122,31,31,0.18)',
              border: '1.5px solid #c9a84c',
            }}
          >
            {/* All menu items including Donation */}
            {menu.map(item => (
              <button
                key={item.id}
                type="button"
                onClick={() => { setOpen(false); onMenuSelect?.(item.id) }}
                style={{
                  width: '100%', textAlign: 'left', border: 'none', background: 'transparent',
                  padding: '12px 14px', borderRadius: 8, cursor: 'pointer',
                  fontFamily: ff, fontSize: 16, fontWeight: 600,
                  color: '#2d1a0e', transition: 'background 0.15s, padding-left 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#f5e6c0'; e.currentTarget.style.paddingLeft = '18px' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.paddingLeft = '14px' }}
              >
                {item.label}
              </button>
            ))}

            <div style={{ marginTop: 10, paddingTop: 12, borderTop: '1px solid #e8d5a3' }}>
              <button
                type="button"
                onClick={() => { setOpen(false); onMenuSelect?.('menu') }}
                style={{
                  width: '100%', padding: '11px 16px', borderRadius: 20,
                  border: '1.5px solid #c9a84c', background: '#faf6ef', color: '#5c1a1a',
                  cursor: 'pointer', fontFamily: 'Cormorant Garamond, serif',
                  fontWeight: 700, fontSize: 15, letterSpacing: '0.04em',
                }}
              >
                {lang === 'hi' ? 'होम' : 'Home'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}