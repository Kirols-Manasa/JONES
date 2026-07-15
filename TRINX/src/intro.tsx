 'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function easeInOutExpo(t: number): number {
  if (t === 0) return 0
  if (t === 1) return 1
  if (t < 0.5) return Math.pow(2, 20 * t - 10) / 2
  return (2 - Math.pow(2, -20 * t + 10)) / 2
}

// ⚡ دقة داخلية أقل للـ noise canvas (هيتكبّر بالـ CSS للحجم الفعلي)
const NOISE_SCALE = 6

type Bubble = {
  el: HTMLDivElement
  y: number
  vy: number
  life: number
  decay: number
}

function BeverageIntroInner({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<'counting' | 'flash' | 'reveal'>('counting')
  const [tagVisible, setTagVisible] = useState(false)

  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const scanRef = useRef<HTMLDivElement>(null)
  const dropRef = useRef<HTMLDivElement>(null)
  const bubbleContainerRef = useRef<HTMLDivElement>(null)
  const countRef = useRef<HTMLDivElement>(null)
  const fillRef = useRef<HTMLDivElement>(null)

  const startRef = useRef<number | null>(null)
  const rafRef = useRef<number>(0)
  const noiseTimerRef = useRef(0)
  const bubbleTimerRef = useRef(0)
  const bubbles = useRef<Bubble[]>([])
  const scanY = useRef(0)
  const canvasSizeRef = useRef({ w: 0, h: 0 })
  const tagVisibleRef = useRef(false)

  const DURATION = 2000

  const drawNoise = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const w = canvas.width
    const h = canvas.height
    if (w === 0 || h === 0) return
    const img = ctx.createImageData(w, h)
    const d = img.data
    for (let i = 0; i < d.length; i += 4) {
      const v = Math.random() * 255
      d[i] = v
      d[i + 1] = v
      d[i + 2] = v
      d[i + 3] = 13
    }
    ctx.putImageData(img, 0, 0)
  }, [])

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return
    const w = Math.max(1, Math.round(wrap.offsetWidth / NOISE_SCALE))
    const h = Math.max(1, Math.round(wrap.offsetHeight / NOISE_SCALE))
    canvasSizeRef.current = { w, h }
    canvas.width = w
    canvas.height = h
  }, [])

  const spawnBubble = useCallback(() => {
    const container = bubbleContainerRef.current
    if (!container) return
    const el = document.createElement('div')
    const size = Math.random() * 3 + 1
    el.style.cssText = `position:absolute;border-radius:50%;width:${size}px;height:${size}px;left:${Math.random() * 100}%;bottom:0;background:rgba(255,255,255,${Math.random() * 0.35 + 0.1});pointer-events:none`
    container.appendChild(el)
    bubbles.current.push({
      el,
      y: 0,
      vy: Math.random() * 0.7 + 0.3,
      life: 1,
      decay: Math.random() * 0.007 + 0.003,
    })
  }, [])

  const finishSequence = useCallback(() => {
    setTimeout(() => {
      setPhase('flash')
      setTimeout(() => {
        setPhase('reveal')

        gsap.globalTimeline.resume()
        ScrollTrigger.refresh()
        document.body.style.overflow = ''

        window.dispatchEvent(new Event('introDone'))
        document.documentElement.dataset.introDone = 'true'

        setTimeout(() => {
          onDone()
        }, 1200)
      }, 350)
    }, 200)
  }, [onDone])

  useEffect(() => {
    gsap.globalTimeline.pause()
    document.body.style.overflow = 'hidden'

    resizeCanvas()
    drawNoise()

    const handleResize = () => {
      resizeCanvas()
    }
    window.addEventListener('resize', handleResize)

    const loop = (now: number) => {
      if (!startRef.current) startRef.current = now
      const elapsed = Math.min(now - startRef.current, DURATION)
      const rawT = elapsed / DURATION
      const easedT = easeInOutExpo(rawT)
      const pct = Math.round(easedT * 100)

      // ⚡ تحديث مباشر على الـ DOM بدل setState — بيلغي عشرات
      // الـ re-renders خلال الـ 2 ثانية دول، وده أكبر مصدر لتقليل
      // الـ Total Blocking Time جوه الانترو
      if (countRef.current) countRef.current.textContent = String(pct)
      if (fillRef.current) fillRef.current.style.height = easedT * 100 + '%'

      if (pct >= 65 && !tagVisibleRef.current) {
        tagVisibleRef.current = true
        setTagVisible(true)
      }

      if (now - noiseTimerRef.current > 90) {
        drawNoise()
        noiseTimerRef.current = now
      }

      if (now - bubbleTimerRef.current > 100 + Math.random() * 80) {
        spawnBubble()
        bubbleTimerRef.current = now
      }

      scanY.current = (scanY.current + 1.6) % (wrapRef.current?.offsetHeight ?? 520)
      if (scanRef.current) scanRef.current.style.top = scanY.current + 'px'

      const dropBottom = easedT * 100
      const dropHeight = Math.min(easedT * 70, 70)
      if (dropRef.current) {
        dropRef.current.style.bottom = dropBottom + '%'
        dropRef.current.style.height = dropHeight + '%'
      }

      bubbles.current = bubbles.current.filter((b) => {
        b.y -= b.vy
        b.life -= b.decay
        if (b.life <= 0) {
          b.el.remove()
          return false
        }
        b.el.style.transform = `translateY(${b.y}px)`
        b.el.style.opacity = String(b.life)
        return true
      })

      if (rawT < 1) {
        rafRef.current = requestAnimationFrame(loop)
      } else {
        if (countRef.current) countRef.current.textContent = '100'
        if (fillRef.current) fillRef.current.style.height = '100%'
        finishSequence()
      }
    }

    rafRef.current = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', handleResize)
      document.body.style.overflow = ''
    }
  }, [drawNoise, spawnBubble, finishSequence, resizeCanvas])

  return (
    <div
      ref={wrapRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#000',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'system-ui, sans-serif',
        opacity: phase === 'reveal' ? 0 : 1,
        pointerEvents: phase === 'reveal' ? 'none' : 'auto',
        transition: phase === 'reveal' ? 'opacity 0.9s cubic-bezier(0.4,0,0.2,1)' : 'none',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0.18,
          pointerEvents: 'none',
        }}
      />
      <div
        ref={fillRef}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '0%',
          background: '#111',
          transition: 'none',
        }}
      />
      <div
        ref={scanRef}
        style={{
          position: 'absolute',
          left: 0,
          width: '100%',
          height: '1px',
          background: 'rgba(255,255,255,0.06)',
          top: 0,
        }}
      />
      <div
        ref={dropRef}
        style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '1px',
          bottom: 0,
          height: 0,
          background: 'linear-gradient(to top, rgba(255,255,255,0.5), transparent)',
        }}
      />
      <div
        ref={bubbleContainerRef}
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: '#fff',
          opacity: phase === 'flash' || phase === 'reveal' ? 1 : 0,
          transition: phase === 'flash' ? 'opacity 0.3s ease-out' : 'none',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          userSelect: 'none',
        }}
      >
        <div
          ref={countRef}
          style={{
            fontSize: 'clamp(80px, 18vw, 140px)',
            fontWeight: 700,
            color: '#fff',
            lineHeight: 1,
            letterSpacing: '-0.04em',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          0
        </div>
        <div
          style={{
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: '0.08em',
            lineHeight: 1,
            color: 'rgba(255,255,255,0.25)',
            textTransform: 'uppercase',
            marginTop: 4,
          }}
        >
          loading
        </div>
        <div
          style={{
            fontSize: 10,
            letterSpacing: '0.45em',
            color: 'rgba(255,255,255,0.13)',
            textTransform: 'uppercase',
            marginTop: 28,
            opacity: tagVisible ? 1 : 0,
            transition: 'opacity 0.8s ease-out',
          }}
        >
          crafted for every moment
        </div>
      </div>
    </div>
  )
}

export default function Intro() {
  const [show, setShow] = useState(true)
  if (!show) return null
  return <BeverageIntroInner onDone={() => setShow(false)} />
}