 'use client'
import { useEffect, useRef } from 'react'

export default function CustomScrollbar() {
  const thumbRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const thumb = thumbRef.current
    const track = trackRef.current
    if (!thumb || !track) return

    const THUMB_HEIGHT = 80

    thumb.style.height = THUMB_HEIGHT + 'px'
    thumb.style.willChange = 'transform'

    let rafId: number
    let pending = false

    const updateThumb = () => {
      if (pending) return
      pending = true
      rafId = requestAnimationFrame(() => {
        const scrollTop = window.scrollY
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight
        const trackHeight = track.offsetHeight
        const maxThumbY = trackHeight - THUMB_HEIGHT
        const thumbY = maxScroll > 0 ? (scrollTop / maxScroll) * maxThumbY : 0
        thumb.style.transform = `translateY(${thumbY}px)`
        pending = false
      })
    }

    window.addEventListener('scroll', updateThumb, { passive: true })
    updateThumb()

    return () => {
      window.removeEventListener('scroll', updateThumb)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div
      ref={trackRef}
      style={{
        position: 'fixed',
        right: '4px',
        top: '50%',
        transform: 'translateY(-50%)',
        height: '70vh',
        width: '3px',
        background: 'transparent',
        zIndex: 9998,
        pointerEvents: 'none',
      }}
    >
      <div
        ref={thumbRef}
        style={{
          width: '3px',
          background: 'rgba(160, 160, 160, 0.6)',
          borderRadius: '0px',
          transition: 'transform 0.08s ease',
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}