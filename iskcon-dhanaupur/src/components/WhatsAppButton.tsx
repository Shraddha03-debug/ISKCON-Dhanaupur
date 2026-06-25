'use client'
import { useState } from 'react'

interface Props {
  lang?: 'en' | 'hi'
}

export default function WhatsAppButton({ lang = 'en' }: Props) {
  const [open, setOpen] = useState(false)

  const phone   = '8127443777'
  const message = lang === 'hi'
    ? 'हरे कृष्ण! हम आपकी कैसे सेवा कर सकते हैं?'
    : 'Hare Krishna! How can we help you?'

  const waLink = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`

  return (
    <>
      {/* Popup */}
      {open && (
        <div style={{
          position: 'fixed',
          bottom: 88,
          right: 20,
          width: 280,
          background: '#f0f0f0',
          borderRadius: 12,
          boxShadow: '0 8px 32px rgba(0,0,0,0.22)',
          zIndex: 999,
          overflow: 'hidden',
          fontFamily: 'Outfit, sans-serif',
        }}>
          {/* Header — white bg, dark text */}
          <div style={{
            background: '#075e54',
            padding: '12px 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid #e0e0e0',
          }}>
            <p style={{ color: '#fff', fontWeight: 600, fontSize: 14, margin: 0 }}>
              ISKCON Dhanaupur
            </p>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: 'none', border: 'none', color: '#fff',
                fontSize: 18, cursor: 'pointer', lineHeight: 1, padding: '0 2px',
              }}
            >
              ×
            </button>
          </div>

          {/* Chat area — grey bg, green bubble */}
          <div style={{
            padding: '16px 14px',
            background: '#ece5dd',
            minHeight: 80,
          }}>
            <div style={{
              background: '#dcf8c6',
              borderRadius: '8px 8px 8px 0px',
              padding: '10px 12px',
              display: 'inline-block',
              maxWidth: '90%',
            }}>
              <p style={{
                fontSize: 14,
                color: '#202124',
                margin: 0,
                lineHeight: 1.6,
                whiteSpace: 'pre-line',
              }}>
                {lang === 'hi'
                  ? 'हरे कृष्ण!'
                  : 'Hare Krishna!'}
              </p>
            </div>
          </div>

          {/* CTA */}
          <div style={{ padding: '10px 14px 14px', background: '#f0f0f0' }}>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                background: '#25D366',
                color: '#fff',
                borderRadius: 24,
                padding: '11px 0',
                textDecoration: 'none',
                fontSize: 14,
                fontWeight: 600,
                fontFamily: 'Outfit, sans-serif',
                width: '100%',
              }}
            >
              <svg width="17" height="25" viewBox="0 0 24 24" fill="#fff">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              {lang === 'hi' ? 'हमसे संपर्क करें' : 'WhatsApp Us'}
            </a>
            <p style={{ fontSize: 11, color: '#80868b', textAlign: 'center', margin: '8px 0 0' }}>
              {lang === 'hi' ? '● ऑनलाइन | गोपनीयता नीति' : '● Online | Privacy policy'}
            </p>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          width: 54,
          height: 54,
          borderRadius: '50%',
          background: '#25D366',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 16px rgba(37,211,102,0.4)',
          zIndex: 1000,
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.1)'
          ;(e.currentTarget as HTMLButtonElement).style.boxShadow = '0 6px 20px rgba(37,211,102,0.5)'
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)'
          ;(e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 16px rgba(37,211,102,0.4)'
        }}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </button>
    </>
  )
}
