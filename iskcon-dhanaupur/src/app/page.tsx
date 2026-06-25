'use client'
import { useEffect, useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import WhatsAppButton from '@/components/WhatsAppButton'
import { content, Lang } from '@/data/content'

import LanguageView from '@/components/views/LanguageView'
import MenuView     from '@/components/views/MenuView'
import DarshanView  from '@/components/views/DarshanView'
import DonationView from '@/components/views/DonationView'
import EventsView   from '@/components/views/EventsView'
import ProgramsView from '@/components/views/ProgramsView'
import ConnectView  from '@/components/views/ConnectView'
import EkadashiView from '@/components/views/EkadashiView'
import AboutView    from '@/components/views/AboutView'
import IskconView   from '@/components/views/IskconView'
import YatraView    from '@/components/views/YatraView'
import SocialView   from '@/components/views/SocialView'

type View = 'language'|'menu'|'darshan'|'donation'|'events'|'programs'|'connect'|'ekadashi'|'about'|'iskcon'|'yatra'|'social'
const VALID_VIEWS: View[] = ['language','menu','darshan','donation','events','programs','connect','ekadashi','about','iskcon','yatra','social']

const pageVariants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0,   transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, y: -16, transition: { duration: 0.3,  ease: [0.22, 1, 0.36, 1] } },
}

export default function Home() {
  const [lang,    setLang]    = useState<Lang>('en')
  const [view,    setView]    = useState<View>('language')
  const [mounted, setMounted] = useState(false)
  const t = content[lang]

  // Initial load — restore language and push initial history state
  useEffect(() => {
    setMounted(true)
    const saved = window.localStorage.getItem('iskcon-dhanaupur-lang') as Lang | null
    const initialView: View = (saved === 'en' || saved === 'hi') ? 'menu' : 'language'
    if (saved === 'en' || saved === 'hi') setLang(saved)
    setView(initialView)
    // Set the very first history entry
    window.history.replaceState({ view: initialView }, '', window.location.href)
  }, [])

  // Listen for browser/phone back button
  useEffect(() => {
    const onPopState = (e: PopStateEvent) => {
      window.scrollTo(0, 0)
      const stateView = e.state?.view as View | undefined
      if (stateView && VALID_VIEWS.includes(stateView)) {
        setView(stateView)
      } else {
        setView('menu')
      }
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  // Navigate to a new view AND push browser history
  const goTo = useCallback((v: View) => {
    window.scrollTo(0, 0)
    setView(v)
    window.history.pushState({ view: v }, '', window.location.href)
  }, [])

  const back = () => {
    // Use browser back so forward/back stays in sync
    window.history.back()
  }

  const chooseLang = (l: Lang) => {
    window.scrollTo(0, 0)
    window.localStorage.setItem('iskcon-dhanaupur-lang', l)
    setLang(l)
    setView('menu')
    window.history.pushState({ view: 'menu' }, '', window.location.href)
  }

  const handleLangChange = (l: Lang) => {
    if (l !== lang) { window.localStorage.setItem('iskcon-dhanaupur-lang', l); setLang(l) }
  }

  const validView = VALID_VIEWS.includes(view) ? view : 'language'
  const isLangPage = view === 'language'

  if (!mounted) return null

  return (
    <div className="page-root">
      {!isLangPage && (
        <Navbar lang={lang} onLangChange={handleLangChange} showLangSwitch showHamburger={view !== 'menu'} menu={t.menu} onMenuSelect={id => goTo(id as View)} />
      )}

      <main style={{ flex:1, paddingTop: isLangPage ? 0 : 68 }}>
        <AnimatePresence mode="wait">
          {validView==='language' && <motion.div key="language" variants={pageVariants} initial="initial" animate="animate" exit="exit"><LanguageView onSelect={chooseLang} /></motion.div>}
          {validView==='menu'     && <motion.div key="menu"     variants={pageVariants} initial="initial" animate="animate" exit="exit"><MenuView t={t} onSelect={id => goTo(id as View)} lang={lang} /></motion.div>}
          {validView==='darshan'  && <motion.div key="darshan"  variants={pageVariants} initial="initial" animate="animate" exit="exit"><DarshanView  t={t} onBack={back} lang={lang} /></motion.div>}
          {validView==='donation' && <motion.div key="donation" variants={pageVariants} initial="initial" animate="animate" exit="exit"><DonationView t={t} onBack={back} lang={lang} /></motion.div>}
          {validView==='events'   && <motion.div key="events"   variants={pageVariants} initial="initial" animate="animate" exit="exit"><EventsView   t={t} onBack={back} lang={lang} /></motion.div>}
          {validView==='programs' && <motion.div key="programs" variants={pageVariants} initial="initial" animate="animate" exit="exit"><ProgramsView t={t} onBack={back} lang={lang} /></motion.div>}
          {validView==='connect'  && <motion.div key="connect"  variants={pageVariants} initial="initial" animate="animate" exit="exit"><ConnectView  t={t} onBack={back} lang={lang} /></motion.div>}
          {validView==='ekadashi' && <motion.div key="ekadashi" variants={pageVariants} initial="initial" animate="animate" exit="exit"><EkadashiView t={t} onBack={back} lang={lang} /></motion.div>}
          {validView==='about'    && <motion.div key="about"    variants={pageVariants} initial="initial" animate="animate" exit="exit"><AboutView    t={t} onBack={back} lang={lang} /></motion.div>}
          {validView==='iskcon'   && <motion.div key="iskcon"   variants={pageVariants} initial="initial" animate="animate" exit="exit"><IskconView   t={t} onBack={back} lang={lang} /></motion.div>}
          {validView==='yatra'    && <motion.div key="yatra"    variants={pageVariants} initial="initial" animate="animate" exit="exit"><YatraView    t={t} onBack={back} lang={lang} /></motion.div>}
          {validView==='social'   && <motion.div key="social"   variants={pageVariants} initial="initial" animate="animate" exit="exit"><SocialView   t={t} onBack={back} lang={lang} /></motion.div>}
        </AnimatePresence>
      </main>

      {!isLangPage && (
        <div style={{ borderTop:'1.5px solid #d4c2a5', padding:'16px 24px', textAlign:'center', background:'rgba(253,245,230,0.8)' }}>
          <span style={{ fontSize:13, color:'#a0846c', fontFamily:'Crimson Text, serif', letterSpacing:'0.06em' }}>
            © 2026 ISKCON Dhanaupur · All rights reserved
          </span>
        </div>
      )}

      {!isLangPage && <WhatsAppButton lang={lang} />}
    </div>
  )
}
