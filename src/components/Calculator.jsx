import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Calculator.css'

const MESSAGES = [
  { text: 'Opening bio-data file…', delay: 0 },
  { text: 'Consulting the aunty network (23 aunties online)…', delay: 900 },
  { text: 'Calculating cringe coefficient…', delay: 1900 },
  { text: 'Cross-referencing with marriage horror stories database…', delay: 2900 },
  { text: 'Preparing your verdict. And therapy referral.', delay: 3900 },
]

const DOODLES = ['♡', '✗', '?', '💰', '⚰️', '🔥', '✎', '★', '⚡']

export default function Calculator() {
  const [msgs, setMsgs] = useState([])
  const [progress, setProgress] = useState(0)
  const [doodles] = useState(() =>
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 90 + 5,
      y: Math.random() * 80 + 10,
      char: DOODLES[Math.floor(Math.random() * DOODLES.length)],
      rot: (Math.random() - 0.5) * 60,
      size: Math.random() * 20 + 14,
      delay: Math.random() * 0.8,
    }))
  )

  useEffect(() => {
    MESSAGES.forEach(({ text, delay }) => {
      setTimeout(() => setMsgs(p => [...p, text]), delay)
    })
    let p = 0
    const iv = setInterval(() => {
      p += Math.random() * 3 + 1
      setProgress(Math.min(p, 95))
      if (p >= 95) clearInterval(iv)
    }, 100)
    return () => clearInterval(iv)
  }, [])

  return (
    <motion.div
      className="calc-root"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Floating background doodles */}
      {doodles.map(d => (
        <motion.span
          key={d.id}
          className="calc-doodle"
          style={{ left: `${d.x}%`, top: `${d.y}%`, fontSize: d.size, transform: `rotate(${d.rot}deg)` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.3, 0.15, 0.25] }}
          transition={{ delay: d.delay, duration: 1.5 }}
        >
          {d.char}
        </motion.span>
      ))}

      <div className="calc-panel">
        {/* Tape strip */}
        <div className="calc-tape">PROCESSING — DO NOT TAMPER</div>

        {/* Big pencil spin */}
        <motion.div
          className="calc-pencil"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        >
          ✎
        </motion.div>

        <h2 className="calc-title">Calculating Your Audacity</h2>
        <p className="calc-subtitle">
          Please hold. Our team of aunties is deliberating.<br/>
          <em>Expected time: longer than you deserve.</em>
        </p>

        {/* Log messages */}
        <div className="calc-log">
          <AnimatePresence>
            {msgs.map((m, i) => (
              <motion.div
                key={m}
                className={`calc-msg ${i === msgs.length - 1 ? 'active' : 'done'}`}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25 }}
              >
                <span className="calc-msg-icon">{i === msgs.length - 1 ? '›' : '✓'}</span>
                {m}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Progress bar — grid cells */}
        <div className="calc-progress-label">
          <span>Progress</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <div className="calc-grid-bar">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className={`calc-grid-cell ${(i / 20) * 100 < progress ? 'filled' : ''}`}
            />
          ))}
        </div>

        <p className="calc-footnote">
          * Note: personality detected but could not be classed as a positive trait.
        </p>
      </div>
    </motion.div>
  )
}
