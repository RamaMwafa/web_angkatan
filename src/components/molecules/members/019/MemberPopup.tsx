'use client'

import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'

import Image from 'next/image'

import Instagram from '@/components/atoms/button/InstagramButtonLink'
import LinkedInButtonLink from '@/components/atoms/button/LinkedInButtonLink'
import SpotifyEmbed from '@/components/molecules/SpotifyEmbed'

import ProfileImage from './image.png'
import MercedesLogo from './mercedes-logo.png'

type MemberPopupProps = {
  isOpen: boolean
  onClose: () => void
}

const MemberPopup = ({ isOpen, onClose }: MemberPopupProps) => {
  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) {
    return null
  }

  return createPortal(
    <>
      {/* CUSTOM KEYFRAMES UNTUK ANIMASI INTRO */}
      <style>
        {`
          @keyframes introOverlay {
            0%, 80% { opacity: 1; visibility: visible; z-index: 200; }
            100% { opacity: 0; visibility: hidden; z-index: -1; }
          }
          
          @keyframes logoFade {
            0% { opacity: 0; transform: scale(0.9); }
            20%, 70% { opacity: 1; transform: scale(1); }
            100% { opacity: 0; transform: scale(1.1); }
          }
          
          @keyframes cardDelay {
            0%, 90% { opacity: 0; pointer-events: none; transform: translateY(20px) scale(0.95); }
            100% { opacity: 1; pointer-events: auto; transform: translateY(0) scale(1); }
          }
        `}
      </style>

      {/* LAYAR INTRO MERCEDES (Pure Black) */}
      <div 
        className="fixed inset-0 flex flex-col items-center justify-center bg-black pointer-events-none overflow-hidden" 
        style={{ animation: 'introOverlay 3s ease-out forwards' }}
      >
        <div className="absolute z-10 flex w-full h-full items-center justify-center" style={{ animation: 'logoFade 2.5s ease-in-out forwards' }}>
          <img 
            src={MercedesLogo.src || MercedesLogo} 
            alt="Mercedes Logo" 
            className="h-32 w-32 object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]" 
          />
        </div>
      </div>

      {/* KONTEN POP CARD UTAMA (Tema Mercedes: Black & Silver/Zinc) */}
      <div 
        className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto px-4 py-8"
        style={{ animation: 'cardDelay 3s cubic-bezier(0.4, 0, 0.2, 1) forwards' }}
      >
        <button
          type="button"
          aria-label="Close member detail"
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        />

        <div className="relative z-10 my-auto w-full max-w-[720px] overflow-y-auto rounded-3xl border border-zinc-700/50 bg-zinc-950/95 p-6 text-zinc-100 shadow-2xl shadow-white/5 backdrop-blur-xl sm:p-8">
          <button
            type="button"
            aria-label="Close member detail"
            onClick={onClose}
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-zinc-700/50 bg-zinc-800/50 text-xl leading-none text-zinc-400 transition-all hover:border-zinc-400 hover:bg-zinc-700 hover:text-white"
          >
            x
          </button>

          <div className="mb-6 overflow-hidden rounded-2xl border border-zinc-700/50 ring-2 ring-zinc-800/50">
            <Image src={ProfileImage} alt="Profile Image" className="h-[280px] w-full object-cover object-center transition-transform duration-500 hover:scale-105 sm:h-[320px]" />
          </div>

          <div className="pr-10">
            <h2 className="text-3xl font-black tracking-tight text-white">M. Rama Maulana Wafa</h2>
            <div className="mt-2 flex items-center gap-2">
              <span className="rounded-md bg-zinc-800/80 px-2.5 py-1 text-xs font-semibold text-zinc-200 ring-1 ring-inset ring-zinc-500/50">5027251019</span>
              <span className="text-sm font-medium text-zinc-400">• Sumenep</span>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <Instagram username="mramamw" />
            <LinkedInButtonLink username="mramamw" />
          </div>

          <div className="mt-8 grid gap-4 text-sm font-semibold sm:grid-cols-2">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5 transition-all hover:border-zinc-500/50 hover:bg-zinc-800/80">
              <p className="text-xs font-bold tracking-wider text-zinc-400 uppercase">Hobi</p>
              <p className="mt-2 text-zinc-100">Olahraga, Dengerin lagu city pop</p>
            </div>
            
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5 transition-all hover:border-zinc-500/50 hover:bg-zinc-800/80">
              <p className="text-xs font-bold tracking-wider text-zinc-400 uppercase">Fun Fact</p>
              <p className="mt-2 text-zinc-100">Suka bersih-bersih kamar</p>
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5 transition-all hover:border-zinc-500/50 hover:bg-zinc-800/80">
            <p className="text-xs font-bold tracking-wider text-zinc-400 uppercase">Lagu Favorit</p>
            <p className="mb-3 mt-2 text-sm font-semibold text-zinc-100">C.H.R.I.S.Y.E.</p>

            <div className="overflow-hidden rounded-xl border border-zinc-800/50">
               <SpotifyEmbed spotifyUrl="https://open.spotify.com/track/42si4ikg5dh732gPuQ0xHb?si=1319245260904cf7" />
            </div>
          </div>
        </div>
      </div>
    </>,
    document.body
  )
}

export default MemberPopup