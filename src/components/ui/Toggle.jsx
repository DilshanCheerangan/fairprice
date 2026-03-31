import { motion } from 'framer-motion'
import './Toggle.css'

export default function Toggle({ label, sublabel, checked, onChange, onInteract, id }) {
  const handleChange = () => {
    onChange(!checked)
    onInteract && onInteract()
  }

  return (
    <div className="toggle-wrap" onClick={handleChange} id={id}>
      <div className="toggle-text">
        <span className="toggle-label">{label}</span>
        {sublabel && <span className="toggle-sublabel">{sublabel}</span>}
      </div>
      <div className="toggle-track-container">
        <motion.span
          className={`toggle-mode-text ${checked ? 'mode-on' : 'mode-off'}`}
          key={checked ? 'on' : 'off'}
          initial={{ opacity: 0, x: checked ? -5 : 5 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.15 }}
        >
          {checked ? 'Optimistic' : 'Reality'}
        </motion.span>

        <div className={`toggle-track ${checked ? 'on' : 'off'}`}>
          <motion.div
            className="toggle-thumb"
            layout
            animate={{
              x: checked ? 24 : 2,
              backgroundColor: checked ? '#a78bfa' : '#5a5a7a',
            }}
            transition={{ type: 'spring', stiffness: 600, damping: 30 }}
          />
          {checked && (
            <motion.div
              className="toggle-glow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}
        </div>
      </div>
    </div>
  )
}
