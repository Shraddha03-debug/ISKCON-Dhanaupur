'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lang } from '@/data/content'

interface Props { t: any; lang: Lang; onBack: () => void; onNavigate?: (view: string) => void }

type Step = 'SEVA_SELECT' | 'DETAILS' | 'PAYMENT'

export default function DonationView({ t, lang, onBack, onNavigate }: Props) {
  const d = t.donation
  const isHi = lang === 'hi'
  const ff = isHi ? 'Tiro Devanagari Hindi, serif' : 'Cormorant Garamond, serif'

  const BANK_DETAILS = {
    name: 'INTERNATIONAL SOCIETY FOR KRISHNA',
    upi: 'inter79913@barodampay',
    accountNumber: '06200100031419',
    ifsc: 'BARB0DOSTPU',
    branch: 'Dostpur'
  }

  const [step, setStep] = useState<Step>('SEVA_SELECT')
  const [frequency, setFrequency] = useState<'once' | 'monthly'>('once')
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState(d.categories[0]?.id || 'general')
  const [amount, setAmount] = useState<number>(501)
  const [customAmount, setCustomAmount] = useState('')
  const [useCustom, setUseCustom] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [copied, setCopied] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const finalAmount = useCustom ? parseInt(customAmount || '0') : amount
  const visibleCards = 2
  const totalCards = d.categories.length
  const maxIndex = Math.max(0, totalCards - visibleCards)
  const selectedSevaLabel = d.categories.find((c: any) => c.id === selectedCategory)?.label || 'General Seva'

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (direction === 'left') setCarouselIndex(Math.max(0, carouselIndex - 1))
    else setCarouselIndex(Math.min(maxIndex, carouselIndex + 1))
  }

  const copyToClipboard = (value: string, key: string) => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(key)
      setTimeout(() => setCopied(null), 2000)
    })
  }

  const handleMonthly = () => {
    if (onNavigate) {
      onNavigate('contact')
    } else {
      window.open(`https://wa.me/918127443777?text=${encodeURIComponent(isHi ? 'हरे कृष्ण!' : 'Hare Krishna!')}`, '_blank')
    }
  }

  const handleProceedToDetails = () => {
    if (!selectedCategory) return alert(isHi ? 'कृपया पहले सेवा का चयन करें' : 'Please select a Seva first')
    setStep('DETAILS')
  }

  const handleProceedToPayment = () => {
    if (!name || !phone || finalAmount < 1) return alert(isHi ? 'कृपया सभी आवश्यक विवरण सही से भरें' : 'Please fill all required details correctly')
    setStep('PAYMENT')
  }

  const openWhatsAppRewardLink = () => {
    const message = isHi
      ? `हरे कृष्ण! मैंने ${selectedSevaLabel} के लिए ₹${finalAmount} का दान दिया है। मेरा नाम ${name} है। यह रहा मेरा भुगतान स्क्रीनशॉट। कृपया मेरा आध्यात्मिक उपहार (Spiritual Reward) अनलॉक करें।`
      : `Hare Krishna! I have contributed ₹${finalAmount} towards ${selectedSevaLabel}. My Name is ${name}. Here is my payment screenshot. Please unlock my Spiritual Reward. `
    window.open(`https://wa.me/918127443777?text=${encodeURIComponent(message)}`, '_blank')
  }

  const CopyBtn = ({ value, fieldKey }: { value: string; fieldKey: string }) => (
    <button
      onClick={() => copyToClipboard(value, fieldKey)}
      style={{
        padding: '4px 10px',
        fontSize: 11,
        background: copied === fieldKey ? '#2d7a2d' : '#f5ebe0',
        color: copied === fieldKey ? '#fff' : '#7a1f1f',
        border: `1px solid ${copied === fieldKey ? '#2d7a2d' : '#d4c2a5'}`,
        borderRadius: 6,
        cursor: 'pointer',
        fontFamily: ff,
        fontWeight: 600,
        whiteSpace: 'nowrap',
        transition: 'all 0.2s'
      }}
    >
      {copied === fieldKey ? (isHi ? 'कॉपी हो गया ✓' : 'Copied ✓') : (isHi ? 'कॉपी करें' : 'Copy')}
    </button>
  )

  // SUCCESS
  if (success) {
    return (
      <section className="section" style={{ background: 'transparent', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: 480 }}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', damping: 15 }}>
            <div style={{ fontSize: 72, marginBottom: 16 }}></div>
            <h2 style={{ fontSize: 34, color: '#7a1f1f', fontFamily: ff, fontWeight: 600, marginBottom: 12 }}>
              {isHi ? 'धन्यवाद!' : 'Thank You!'}
            </h2>
            <div style={{ background: '#fdf5e6', border: '2px dashed #b8860b', borderRadius: 12, padding: '20px 16px', marginBottom: 28, boxShadow: '0 4px 12px rgba(184,134,11,0.1)' }}>
              <p style={{ color: '#7a1f1f', fontFamily: ff, fontSize: 18, fontWeight: 700, margin: '0 0 8px 0' }}>
                {isHi ? 'अपना आध्यात्मिक उपहार प्राप्त करें' : 'Unlock Your Spiritual Reward'}
              </p>
              <p style={{ color: '#4a3c2b', fontFamily: 'Crimson Text, serif', fontSize: 15, lineHeight: 1.6, margin: 0 }}>
                {isHi ? 'अपने भुगतान का स्क्रीनशॉट व्हाट्सएप पर भेजें और सीधे मंदिर से एक विशेष डिजिटल आध्यात्मिक उपहार प्राप्त करें!' : 'Send your payment screenshot on WhatsApp to verify and unlock a customized digital spiritual reward from the temple!'}
              </p>
              <button onClick={openWhatsAppRewardLink} style={{ marginTop: 16, width: '100%', padding: '12px 14px', background: '#25D366', color: '#fff', border: 'none', borderRadius: 8, fontFamily: ff, fontSize: 15, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <span>💬</span> {isHi ? 'व्हाट्सएप पर स्क्रीनशॉट भेजें' : 'Send Screenshot via WhatsApp'}
              </button>
            </div>
            <div style={{ display: 'flex', gap: 12, flexDirection: 'column' }}>
              <button onClick={() => { setSuccess(false); setStep('SEVA_SELECT'); }} style={{ width: '100%', background: '#7a1f1f', color: '#fff', padding: '12px 24px', border: 'none', borderRadius: 8, cursor: 'pointer', fontFamily: ff, fontWeight: 600, fontSize: 14 }}>
                {isHi ? 'दोबारा दान करें' : 'Make Another Donation'}
              </button>
              <button onClick={onBack} style={{ width: '100%', background: 'transparent', color: '#7a1f1f', padding: '12px 24px', border: '2px solid #7a1f1f', borderRadius: 8, cursor: 'pointer', fontFamily: ff, fontWeight: 600, fontSize: 14 }}>
                {t.back}
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section className="section" style={{ background: 'transparent' }}>
      <div className="container" style={{ maxWidth: 480 }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <button
            className="back-btn"
            onClick={() => {
              if (step === 'DETAILS') setStep('SEVA_SELECT')
              else if (step === 'PAYMENT') setStep('DETAILS')
              else onBack()
            }}
            style={{ background: 'none', border: 'none', color: '#7a1f1f', cursor: 'pointer', fontWeight: 600, fontFamily: ff }}
          >
            {step === 'SEVA_SELECT' ? t.back : (isHi ? 'पीछे जाएँ' : 'Back')}
          </button>
        </div>

        {/* Title */}
        <div style={{ marginBottom: 28, textAlign: 'center' }}>
          <p className="t-label" style={{ marginBottom: 6, color: '#b8860b', letterSpacing: '0.05em', textTransform: 'uppercase', fontSize: 12, fontWeight: 600 }}>
            {isHi ? 'सेवा में सहयोग' : 'Support Our Seva'}
          </p>
          <h1 style={{ fontSize: 'clamp(26px, 5vw, 34px)', color: '#7a1f1f', fontFamily: ff, fontWeight: 600, margin: '0 0 8px 0' }}>
            {isHi ? 'महादान' : 'Divine Donation'}
          </h1>
          <div className="gold-line" style={{ height: 2, width: 50, background: '#d4c2a5', margin: '0 auto' }} />
        </div>

        <AnimatePresence mode="wait">

          {/* STEP 1: SEVA SELECT */}
          {step === 'SEVA_SELECT' && (
            <motion.div key="step1" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}>
              <div style={{ marginBottom: 24, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {(['once', 'monthly'] as const).map((f) => (
                  <button key={f} onClick={() => setFrequency(f)} style={{ padding: '12px', background: frequency === f ? '#7a1f1f' : 'transparent', color: frequency === f ? '#fff' : '#7a1f1f', border: `2px solid ${frequency === f ? '#7a1f1f' : '#d4c2a5'}`, borderRadius: 24, cursor: 'pointer', fontFamily: ff, fontSize: 14, fontWeight: 600, transition: 'all 0.3s' }}>
                    {f === 'once' ? (isHi ? 'एक बार' : 'Once') : (isHi ? 'मासिक' : 'Monthly')}
                  </button>
                ))}
              </div>

              <div style={{ marginBottom: 28, padding: '16px', border: '2px solid #d4c2a5', borderRadius: 12, background: 'rgba(253,245,230,0.5)' }}>
                <p style={{ fontSize: 16, color: '#7a1f1f', fontFamily: ff, fontWeight: 600, margin: '0 0 14px 0' }}>
                  {isHi ? 'सर्वप्रथम सेवा का चयन करें' : 'Select Seva Offering'}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <button onClick={() => scrollCarousel('left')} disabled={carouselIndex === 0} style={{ background: 'none', border: 'none', fontSize: 24, color: carouselIndex === 0 ? '#d4c2a5' : '#7a1f1f', cursor: carouselIndex === 0 ? 'not-allowed' : 'pointer' }}>‹</button>
                  <div style={{ display: 'grid', gridTemplateColumns: `repeat(${visibleCards}, 1fr)`, gap: 12, overflow: 'hidden', flex: 1 }}>
                    {d.categories.slice(carouselIndex, carouselIndex + visibleCards).map((c: any) => (
                      <div key={c.id} onClick={() => setSelectedCategory(c.id)} style={{ padding: '14px 8px', border: `2px solid ${selectedCategory === c.id ? '#7a1f1f' : '#d4c2a5'}`, borderRadius: 10, background: selectedCategory === c.id ? '#f5ebe0' : '#fdf5e6', cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s' }}>
                        <div style={{ fontSize: 32, marginBottom: 6, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}></div>
                        <p style={{ fontSize: 13, color: '#4a3c2b', fontFamily: ff, fontWeight: 600, margin: 0 }}>{c.label}</p>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => scrollCarousel('right')} disabled={carouselIndex >= maxIndex} style={{ background: 'none', border: 'none', fontSize: 24, color: carouselIndex >= maxIndex ? '#d4c2a5' : '#7a1f1f', cursor: carouselIndex >= maxIndex ? 'not-allowed' : 'pointer' }}>›</button>
                </div>
              </div>

              {frequency === 'monthly' ? (
                <div style={{ padding: '16px', background: '#f5ebe0', border: '1.5px solid #d4c2a5', borderRadius: 8, textAlign: 'center' }}>
                  <p style={{ color: '#7a1f1f', fontFamily: ff, fontSize: 15, fontWeight: 600, margin: '0 0 6px 0' }}>{isHi ? 'नियमित सेवा प्रतिबद्धता' : 'Monthly Commitments'}</p>
                  <p style={{ color: '#a0846c', fontFamily: 'Crimson Text, serif', fontSize: 14, margin: '0 0 16px 0', lineHeight: 1.5 }}>{isHi ? 'मंदिर की मासिक सेवा व्यवस्था से सीधे जुड़ने के लिए कृपया हमारे प्रतिनिधि से संपर्क करें।' : 'To customize long-term monthly donations, speak directly with temple authorities.'}</p>
                  <button onClick={handleMonthly} style={{ width: '100%', padding: '12px', background: '#7a1f1f', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontFamily: ff, fontWeight: 600 }}>{isHi ? 'मंदिर से संपर्क करें' : 'Connect with Temple'}</button>
                </div>
              ) : (
                <button onClick={handleProceedToDetails} style={{ width: '100%', padding: '14px', background: '#7a1f1f', color: '#fff', border: 'none', borderRadius: 8, fontFamily: ff, fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>
                  {isHi ? 'आगे बढ़ें (विवरण भरें)' : 'Proceed Next'}
                </button>
              )}
            </motion.div>
          )}

          {/* STEP 2: DETAILS */}
          {step === 'DETAILS' && (
            <motion.div key="step2" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}>
              <div style={{ marginBottom: 20 }}>
                <p style={{ fontSize: 14, color: '#a0846c', fontFamily: ff, marginBottom: 8, marginTop: 0 }}>{isHi ? 'राशि चुनें (INR)' : 'Select Amount (INR)'}</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 12 }}>
                  {d.amounts?.map((a: number) => (
                    <button key={a} onClick={() => { setUseCustom(false); setAmount(a); }} style={{ padding: '10px 4px', border: `1.5px solid ${!useCustom && amount === a ? '#7a1f1f' : '#d4c2a5'}`, background: !useCustom && amount === a ? '#7a1f1f' : '#fdf5e6', color: !useCustom && amount === a ? '#fff' : '#4a3c2b', borderRadius: 8, cursor: 'pointer', fontFamily: ff, fontSize: 14, fontWeight: 600 }}>
                      ₹{a.toLocaleString('en-IN')}
                    </button>
                  ))}
                </div>
                <input type="number" placeholder={isHi ? 'अन्य कोई राशि यहाँ दर्ज करें' : 'Enter Custom Amount'} value={customAmount} onChange={(e) => { setCustomAmount(e.target.value); setUseCustom(true); }} onFocus={() => setUseCustom(true)} style={{ width: '100%', padding: '12px', border: '1.5px solid #d4c2a5', borderRadius: 8, background: '#fdf5e6', boxSizing: 'border-box' }} />
              </div>

              <div style={{ marginBottom: 24 }}>
                <p style={{ fontSize: 14, color: '#a0846c', fontFamily: ff, marginBottom: 8, marginTop: 0 }}>{isHi ? 'दाता का विवरण' : 'Donor Information'}</p>
                <input placeholder={isHi ? 'पूरा नाम *' : 'Full Name *'} value={name} onChange={(e) => setName(e.target.value)} style={{ width: '100%', padding: '12px', border: '1.5px solid #d4c2a5', borderRadius: 8, background: '#fdf5e6', marginBottom: 10, boxSizing: 'border-box' }} />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <input placeholder={isHi ? 'फ़ोन नंबर *' : 'Phone *'} type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} style={{ width: '100%', padding: '12px', border: '1.5px solid #d4c2a5', borderRadius: 8, background: '#fdf5e6', boxSizing: 'border-box' }} />
                  <input placeholder={isHi ? 'ईमेल (वैकल्पिक)' : 'Email (Optional)'} type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '12px', border: '1.5px solid #d4c2a5', borderRadius: 8, background: '#fdf5e6', boxSizing: 'border-box' }} />
                </div>
              </div>

              <button onClick={handleProceedToPayment} style={{ width: '100%', padding: '14px', background: '#7a1f1f', color: '#fff', border: 'none', borderRadius: 8, fontFamily: ff, fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>
                {isHi ? 'भुगतान विधि देखें' : 'View Payment Details'}
              </button>
            </motion.div>
          )}

          {/* STEP 3: PAYMENT */}
          {step === 'PAYMENT' && (
            <motion.div key="step3" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}>

              {/* Amount summary */}
              <div style={{ background: '#fdf5e6', padding: '12px', borderRadius: 8, border: '1px solid #d4c2a5', marginBottom: 20, textAlign: 'center' }}>
                <span style={{ fontSize: 13, color: '#a0846c' }}>{isHi ? 'चयनित सेवा:' : 'Selected Seva:'}</span>
                <strong style={{ color: '#7a1f1f', marginLeft: 6, fontFamily: ff }}>{selectedSevaLabel} — ₹{finalAmount.toLocaleString('en-IN')}</strong>
              </div>

              {/* QR Code */}
              <div style={{ textAlign: 'center', marginBottom: 20 }}>
                <p style={{ fontSize: 13, color: '#b8860b', fontWeight: 600, fontFamily: ff, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  {isHi ? 'QR कोड स्कैन करें' : 'Scan QR Code'}
                </p>
                <img
                  src="/qr.png"
                  alt="UPI QR Code"
                  style={{ width: 190, height: 190, margin: '0 auto', display: 'block', borderRadius: 12, border: '2px solid #d4c2a5', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
                />
                <p style={{ fontSize: 12, color: '#a0846c', marginTop: 8, fontFamily: 'Crimson Text, serif' }}>
                  {isHi ? 'GPay, PhonePe, Paytm — किसी भी UPI ऐप से स्कैन करें' : 'Scan with GPay, PhonePe, Paytm or any UPI app'}
                </p>
              </div>

              {/* Divider */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                <div style={{ flex: 1, height: 1, background: '#d4c2a5' }} />
                <span style={{ fontSize: 12, color: '#a0846c', fontFamily: ff, whiteSpace: 'nowrap' }}>{isHi ? 'या मैन्युअल विवरण से भुगतान करें' : 'or pay manually'}</span>
                <div style={{ flex: 1, height: 1, background: '#d4c2a5' }} />
              </div>

              {/* Payment Details */}
              <div style={{ background: '#fdf5e6', border: '1.5px solid #d4c2a5', borderRadius: 10, padding: '16px', marginBottom: 20, display: 'grid', gap: 12 }}>

                {/* UPI ID */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                  <div>
                    <p style={{ margin: 0, fontSize: 11, color: '#a0846c', fontFamily: ff, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{isHi ? 'UPI ID' : 'UPI ID'}</p>
                    <p style={{ margin: '2px 0 0 0', fontSize: 14, color: '#7a1f1f', fontFamily: ff, fontWeight: 700 }}>{BANK_DETAILS.upi}</p>
                  </div>
                  <CopyBtn value={BANK_DETAILS.upi} fieldKey="upi" />
                </div>

                <div style={{ height: 1, background: '#e8dcc8' }} />

                {/* Account Number */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                  <div>
                    <p style={{ margin: 0, fontSize: 11, color: '#a0846c', fontFamily: ff, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{isHi ? 'खाता संख्या' : 'Account Number'}</p>
                    <p style={{ margin: '2px 0 0 0', fontSize: 14, color: '#7a1f1f', fontFamily: ff, fontWeight: 700 }}>{BANK_DETAILS.accountNumber}</p>
                  </div>
                  <CopyBtn value={BANK_DETAILS.accountNumber} fieldKey="acc" />
                </div>

                <div style={{ height: 1, background: '#e8dcc8' }} />

                {/* IFSC */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                  <div>
                    <p style={{ margin: 0, fontSize: 11, color: '#a0846c', fontFamily: ff, textTransform: 'uppercase', letterSpacing: '0.04em' }}>IFSC</p>
                    <p style={{ margin: '2px 0 0 0', fontSize: 14, color: '#7a1f1f', fontFamily: ff, fontWeight: 700 }}>{BANK_DETAILS.ifsc}</p>
                  </div>
                  <CopyBtn value={BANK_DETAILS.ifsc} fieldKey="ifsc" />
                </div>

                <div style={{ height: 1, background: '#e8dcc8' }} />

                {/* Name */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                  <div>
                    <p style={{ margin: 0, fontSize: 11, color: '#a0846c', fontFamily: ff, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{isHi ? 'खाताधारक नाम' : 'Account Holder'}</p>
                    <p style={{ margin: '2px 0 0 0', fontSize: 14, color: '#7a1f1f', fontFamily: ff, fontWeight: 700 }}>{BANK_DETAILS.name}</p>
                  </div>
                  <CopyBtn value={BANK_DETAILS.name} fieldKey="name" />
                </div>

                <div style={{ height: 1, background: '#e8dcc8' }} />

                {/* Branch */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                  <div>
                    <p style={{ margin: 0, fontSize: 11, color: '#a0846c', fontFamily: ff, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{isHi ? 'शाखा' : 'Branch'}</p>
                    <p style={{ margin: '2px 0 0 0', fontSize: 14, color: '#7a1f1f', fontFamily: ff, fontWeight: 700 }}>{BANK_DETAILS.branch}</p>
                  </div>
                  <CopyBtn value={BANK_DETAILS.branch} fieldKey="branch" />
                </div>

              </div>

              {/* Done button */}
              <button
                onClick={() => setSuccess(true)}
                style={{ width: '100%', padding: '14px', background: '#7a1f1f', color: '#fff', border: 'none', borderRadius: 8, fontFamily: ff, fontSize: 15, fontWeight: 600, cursor: 'pointer' }}
              >
                {isHi ? 'मैंने भुगतान कर दिया' : 'I Have Paid'}
              </button>

            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </section>
  )
}
