import { motion } from 'framer-motion'
import './SplashScreen.css'

export default function SplashScreen({ onComplete }) {
  return (
    <motion.div
      className="splash-overlay"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="splash-stamp-container">
        {/* The Slamming Logo Animation */}
        <motion.div
          initial={{ scale: 3, rotate: 15, opacity: 0 }}
          animate={{ scale: 1, rotate: -3, opacity: 1 }}
          transition={{
            duration: 0.3,
            delay: 0.2,
            type: 'spring',
            damping: 10,
            stiffness: 100
          }}
          onAnimationComplete={() => {
            // Wait 1.5s after slam then transition out
            setTimeout(onComplete, 1600)
          }}
        >
          <img
            src="/logo.png"
            alt="FairPrice? Logo"
            className="splash-logo"
          />

          {/* Red bleed/impact effect */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.4, opacity: 0.4 }}
            transition={{ delay: 0.25, duration: 0.8 }}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle, var(--ink-red) 0%, transparent 70%)',
              borderRadius: '50%',
              zIndex: -1,
              filter: 'blur(15px)'
            }}
          />
        </motion.div>

        {/* Supporting text appearing after impact */}
        <motion.div
          className="splash-text"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          Valuation Internal Record
        </motion.div>
      </div>

      {/* Background ink bleed animation */}
      <motion.div
        className="ink-splatter"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        transition={{ delay: 0.4, duration: 2 }}
      />
    </motion.div>
  )
}
