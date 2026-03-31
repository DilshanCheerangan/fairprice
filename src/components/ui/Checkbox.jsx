import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Checkbox.css'

export default function Checkbox({ label, sublabel, checked, onChange, onInteract, id }) {
  const [sparkles, setSparkles] = useState([])

  const handleChange = () => {
    if (!checked) {
      // Trigger sparkle burst
      const newSparkles = Array.from({ length: 6 }, (_, i) => ({
        id: Date.now() + i,
        angle: (i / 6) * 360,
      }))
      setSparkles(newSparkles)
      setTimeout(() => setSparkles([]), 600)
    }
    onChange(!checked)
    onInteract && onInteract()
  }

  return (
    <div className={`checkbox-wrap ${checked ? 'checked' : ''}`} onClick={handleChange} id={id}>
      <div className="checkbox-box-wrap">
        <div className={`checkbox-box ${checked ? 'checked' : ''}`}>
          <AnimatePresence>
            {checked && (
              <motion.svg
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                exit={{ pathLength: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <motion.path
                  d="M5 13l4 4L19 7"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.25 }}
                />
              </motion.svg>
            )}
          </AnimatePresence>
        </div>

        {/* Sparkles */}
        <AnimatePresence>
          {sparkles.map(s => (
            <motion.div
              key={s.id}
              className="sparkle"
              style={{
                '--angle': `${s.angle}deg`,
              }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 1.5, opacity: 0, x: `calc(cos(${s.angle}deg) * 20px)`, y: `calc(sin(${s.angle}deg) * 20px)` }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          ))}
        </AnimatePresence>
      </div>

      <div className="checkbox-text">
        <span className="checkbox-label">{label}</span>
        {sublabel && <span className="checkbox-sublabel">{sublabel}</span>}
      </div>

      {checked && (
        <motion.span
          className="checkbox-active-tag"
          initial={{ opacity: 0, scale: 0.8, x: 10 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
        >
          Applied
        </motion.span>
      )}
    </div>
  )
}
