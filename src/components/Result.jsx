import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Result.css'

const DARK_FOOTNOTES = [
  '* Insecurity level: critical. Avoid mirrors.',
  '* Ego detected: 0. Confidence: unearned.',
  '* The audacity on display was truly breathtaking. Not in a good way.',
  '* Your background score is a long, sad kazoo solo.',
  '* This report was generated with zero respect for your preferences.',
]

export default function Result({ result, onRestart }) {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    setTimeout(() => setPhase(1), 400)
    setTimeout(() => setPhase(2), 1200)
    setTimeout(() => setPhase(3), 2200)
  }, [])

  if (!result) return null
  const footnote = DARK_FOOTNOTES[Math.floor(Math.random() * DARK_FOOTNOTES.length)]

  return (
    <motion.div
      className="result-root"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* BG image */}
      <div className="result-bg-img" />

      <div className="result-container">

        {/* ── LEGAL VERDICT HEADER ── */}
        <div className="result-header">
          <div className="result-brand">FairPrice<span style={{ color: 'var(--ink-red)' }}>?</span></div>
          <div className="result-ref">
            <div className="label-hand">Ref No.</div>
            <div style={{ fontFamily: 'var(--font-brush)', fontSize: '1rem' }}>
              #{Math.random().toString(36).slice(2, 8).toUpperCase()}
            </div>
          </div>
        </div>

        {/* ── DOWRY BANNED RULING — Phase 1 ── */}
        <AnimatePresence>
          {phase >= 1 && (
            <motion.div
              className="result-ruling"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
            >
              <div className="ruling-stamp">CASE DISMISSED ⚖️</div>
              <h2 className="ruling-title">Dowry is Banned.</h2>
              <p className="ruling-body">
                Under the <strong>Dowry Prohibition Act, 1961</strong> — Section 3 —
                giving or taking dowry is punishable by up to <strong>5 years in prison</strong> and
                a fine of <strong>₹15,000</strong>.<br/><br/>
                Also: you cannot put a price tag on a human being.<br/>
                <em>We know you just tried.</em>
              </p>
              <div className="ruling-fine-print">
                * FairPrice™ takes no legal responsibility for what you were about to do.
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── VERDICT PANEL — Phase 2 ── */}
        <AnimatePresence>
          {phase >= 2 && (
            <motion.div
              className="result-verdict"
              initial={{ opacity: 0, y: 30, rotate: -1 }}
              animate={{ opacity: 1, y: 0, rotate: -0.5 }}
              transition={{ duration: 0.5, type: 'spring' }}
            >
              {/* Verdict stamp */}
              <motion.div
                className="verdict-stamp"
                initial={{ scale: 3, opacity: 0, rotate: -5 }}
                animate={{ scale: 1, opacity: 1, rotate: -5 }}
                transition={{ delay: 0.2, duration: 0.4, type: 'spring', stiffness: 300 }}
              >
                {result.tier.label}
              </motion.div>

              <p className="verdict-desc">{result.tier.desc}</p>

              {/* Cringe score */}
              <div className="verdict-score-row">
                <span className="verdict-score-label">Cringe Score:</span>
                <div className="verdict-score-bar">
                  <motion.div
                    className="verdict-score-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${result.score}%` }}
                    transition={{ delay: 0.3, duration: 0.9, ease: 'easeOut' }}
                  />
                </div>
                <span className="verdict-score-num">{result.score}/99</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── ROAST CARDS — Phase 3 ── */}
        <AnimatePresence>
          {phase >= 3 && (
            <motion.div
              className="result-cards"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="result-cards-title">
                📋 Your Audit (Requested By: You, Apparently)
              </div>

              {(result.roasts || []).map((r, i) => (
                <motion.div
                  key={i}
                  className="roast-card"
                  style={{ transform: `rotate(${(i % 2 === 0 ? 1 : -1) * (Math.random() * 0.8)}deg)` }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.3 }}
                  whileHover={{ scale: 1.01, rotate: 0 }}
                >
                  <span className="roast-icon">{r.icon}</span>
                  <p className="roast-text">{r.text}</p>
                </motion.div>
              ))}

              {/* Closing verdict box */}
              <motion.div
                className="result-closing"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <div className="closing-quote">
                  "You're not looking for a wife. You're looking for an object
                  to fix your internal failures. It won't work."
                </div>
                <div className="closing-credit">
                  — FairPrice™ Legal &amp; Roast Division
                  <br/><span style={{ fontStyle: 'italic', fontSize: '0.7rem' }}>{footnote}</span>
                </div>
              </motion.div>

              <motion.button
                id="restart-btn"
                className="result-restart-btn"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                whileHover={{ scale: 1.03, rotate: 1 }}
                whileTap={{ scale: 0.97 }}
                onClick={onRestart}
              >
                ↺ Try Again (Touch Grass First)
              </motion.button>

              <p className="result-fine">
                Results are satirical. No actual humans were valuated. Your ego, however, may need a moment.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
