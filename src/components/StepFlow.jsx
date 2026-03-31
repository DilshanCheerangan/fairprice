import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProgressBar from './ProgressBar'
import Step1 from './steps/Step1'
import Step2 from './steps/Step2'
import Step3 from './steps/Step3'
import './StepFlow.css'

const TOTAL_STEPS = 3

const SLIDE_VARIANTS = {
  enter: dir => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
  center: { opacity: 1, x: 0 },
  exit: dir => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
}

export default function StepFlow({ formData, setFormData, onCalculate, addComment }) {
  const [step, setStep] = useState(1)
  const [direction, setDirection] = useState(1)

  const goNext = () => {
    if (step < TOTAL_STEPS) {
      setDirection(1)
      setStep(s => s + 1)
    } else {
      onCalculate(formData)
    }
  }

  const goBack = () => {
    if (step > 1) {
      setDirection(-1)
      setStep(s => s - 1)
    }
  }

  const StepComponent = [Step1, Step2, Step3][step - 1]

  return (
    <motion.div
      className="stepflow-root"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="stepflow-container">
        {/* Header */}
        <div className="stepflow-header">
          <div className="stepflow-brand">
            <span className="brand-name">FairPrice</span>
            <span className="brand-q">?</span>
          </div>
          <div className="stepflow-tagline label-subtle">Evaluation Engine</div>
        </div>

        <ProgressBar step={step} totalSteps={TOTAL_STEPS} />

        {/* Card */}
        <div className="stepflow-card glass-card">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={SLIDE_VARIANTS}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            >
              <StepComponent
                data={formData}
                setData={setFormData}
                addComment={addComment}
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="stepflow-nav">
            <button
              id="step-back-btn"
              className="nav-btn nav-back"
              onClick={goBack}
              disabled={step === 1}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 5l-7 7 7 7"/>
              </svg>
              Back
            </button>

            <div className="step-indicator">
              {Array.from({ length: TOTAL_STEPS }, (_, i) => (
                <div key={i} className={`step-dot ${i + 1 === step ? 'active' : i + 1 < step ? 'done' : ''}`} />
              ))}
            </div>

            <motion.button
              id="step-next-btn"
              className="nav-btn nav-next"
              onClick={goNext}
              whileHover={{ scale: 1.02, boxShadow: '0 0 24px rgba(124,58,237,0.4)' }}
              whileTap={{ scale: 0.97 }}
            >
              {step === TOTAL_STEPS ? 'Calculate' : 'Continue'}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
