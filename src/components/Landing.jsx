import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import './Landing.css'

export default function Landing({ onStart }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animFrame

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    window.addEventListener('resize', resize)

    // Draw doodle hearts floating up
    const hearts = Array.from({ length: 18 }, (_, i) => ({
      x: Math.random() * window.innerWidth,
      y: window.innerHeight + Math.random() * 200,
      size: Math.random() * 12 + 6,
      speed: Math.random() * 0.5 + 0.2,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: (Math.random() - 0.5) * 0.02,
      opacity: Math.random() * 0.3 + 0.1,
      type: i % 3, // 0=heart, 1=X, 2=dollar
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      hearts.forEach(h => {
        h.y -= h.speed
        h.wobble += h.wobbleSpeed
        if (h.y < -50) { h.y = canvas.height + 50; h.x = Math.random() * canvas.width }
        ctx.save()
        ctx.translate(h.x + Math.sin(h.wobble) * 15, h.y)
        ctx.globalAlpha = h.opacity
        ctx.strokeStyle = h.type === 2 ? '#1a6b3a' : h.type === 1 ? '#c0392b' : '#2559a7'
        ctx.lineWidth = 1.5
        ctx.font = `${h.size}px Caveat`
        ctx.fillStyle = ctx.strokeStyle
        const label = h.type === 2 ? '💰' : h.type === 1 ? '✗' : '♡'
        ctx.fillText(label, 0, 0)
        ctx.restore()
      })
      animFrame = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animFrame); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <motion.div
      className="landing"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.4 }}
    >
      <canvas ref={canvasRef} className="landing-canvas" />

      {/* Doodle background images */}
      <div className="landing-doodle-left" />
      <div className="landing-doodle-right" />

      <div className="landing-content">

        {/* Top badge — looks like a rubber stamp */}
        <motion.div
          className="landing-stamp"
          initial={{ opacity: 0, scale: 2, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: -5 }}
          transition={{ delay: 0.2, duration: 0.4, type: 'spring', stiffness: 400 }}
        >
          OFFICIAL FORM · NOT LEGAL · DO NOT FRAME
        </motion.div>

        {/* Logo Branding */}
        <motion.div
          className="landing-logo-container"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <img src="/logo.png" alt="FairPrice?" className="landing-brand-logo" />
        </motion.div>

        {/* Title */}
        <motion.h1
          className="landing-title"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          FairPrice<span className="title-q">?</span>
        </motion.h1>

        <motion.p
          className="landing-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Calculate what she's worth.
        </motion.p>

        {/* Handwritten desc block like a sticky note */}
        <motion.div
          className="landing-note"
          initial={{ opacity: 0, rotate: 2, y: 20 }}
          animate={{ opacity: 1, rotate: 1.5, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          <div className="note-inner">
            <p>Enter her bio-data. Height, weight, skin tone, education, Instagram.</p>
            <p style={{ marginTop: 6 }}>All the things you've definitely already Googled.</p>
            <p style={{ marginTop: 6 }} className="note-fine">* We'll pretend this is science.</p>
          </div>
        </motion.div>

        {/* CTA button */}
        <motion.button
          id="start-valuation-btn"
          className="landing-cta"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          whileHover={{ scale: 1.03, rotate: 1 }}
          whileTap={{ scale: 0.97, rotate: -1 }}
          onClick={onStart}
        >
          <span className="cta-arrow">✎</span> Begin the Audit
        </motion.button>

        <motion.p
          className="landing-disclaimer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 1.7 }}
        >
          Dowry is banned in India. This is purely for entertainment and judging your choices.
        </motion.p>

        {/* Bottom stats as handwritten scoreboard */}
        <motion.div
          className="landing-stats"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.0 }}
        >
          {[
            { val: '2.4M+', label: 'Red Flags Detected', note: 'and counting' },
            { val: '94.7%', label: 'Users in Denial', note: '"not me tho"' },
            { val: '∞', label: 'Aunties Consulted', note: 'free of charge' },
          ].map(s => (
            <div key={s.label} className="stat-item">
              <span className="stat-val">{s.val}</span>
              <span className="stat-label">{s.label}</span>
              <span className="stat-note">{s.note}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}
