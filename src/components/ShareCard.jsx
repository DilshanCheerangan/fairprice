import { useRef } from 'react'
import { motion } from 'framer-motion'
import './ShareCard.css'

const formatINR = (n) => '₹' + n.toLocaleString('en-IN')

const EMPLOYMENT_LABELS = {
  govt: 'Government Service',
  doctor: 'Medical Practitioner',
  engineer: 'Software Engineering',
  professional: 'Corporate Professional',
  entrepreneur: 'Entrepreneurship (Pre-revenue)',
  influencer: 'Digital Content Creation',
  freelancer: 'Independent Contracting',
  student: 'Academic Pursuit',
}

const LOCATION_LABELS = {
  abroad: 'International Domicile',
  metro: 'Metropolitan',
  tier2: 'Tier-2 Urban',
  tier3: 'Tier-3 / Semi-urban',
}

export default function ShareCard({ result, formData, onClose }) {
  const now = new Date()
  const dateStr = now.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })
  const refId = `FP-${Math.random().toString(36).slice(2, 8).toUpperCase()}`

  return (
    <motion.div
      className="share-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="share-modal"
        initial={{ scale: 0.9, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onClick={e => e.stopPropagation()}
      >
        {/* Invoice */}
        <div className="invoice" id="share-invoice">
          {/* Invoice Header */}
          <div className="invoice-header">
            <div className="invoice-brand">
              <span className="invoice-title">FairPrice</span>
              <span className="invoice-q">?</span>
            </div>
            <div className="invoice-meta">
              <span className="invoice-meta-label">Evaluation Report</span>
              <span className="invoice-ref">{refId}</span>
            </div>
          </div>

          <div className="invoice-divider" />

          {/* Date & Status */}
          <div className="invoice-row">
            <div className="invoice-field">
              <span className="invoice-field-label">DATE ISSUED</span>
              <span className="invoice-field-value">{dateStr}</span>
            </div>
            <div className="invoice-field">
              <span className="invoice-field-label">STATUS</span>
              <span className="invoice-status">Finalized</span>
            </div>
          </div>

          {/* Inputs Summary */}
          <div className="invoice-section-label">INPUT PARAMETERS</div>
          <div className="invoice-params-grid">
            <div className="invoice-param">
              <span className="param-key">Occupation</span>
              <span className="param-val">{EMPLOYMENT_LABELS[formData.employment] || formData.employment}</span>
            </div>
            <div className="invoice-param">
              <span className="param-key">Base Location</span>
              <span className="param-val">{LOCATION_LABELS[formData.locationTier] || formData.locationTier}</span>
            </div>
            <div className="invoice-param">
              <span className="param-key">Outlook</span>
              <span className="param-val">{formData.optimisticMode ? 'Optimistic' : 'Reality-mode'}</span>
            </div>
            <div className="invoice-param">
              <span className="param-key">NRI Status</span>
              <span className="param-val">{formData.foreignReturn ? 'Yes (+35%)' : 'No'}</span>
            </div>
            <div className="invoice-param">
              <span className="param-key">Family Overhead</span>
              <span className="param-val">{formData.familyApproval ? 'Applied (−12%)' : 'Not applicable'}</span>
            </div>
            <div className="invoice-param">
              <span className="param-key">Expectation Mode</span>
              <span className="param-val">{formData.highExpectations ? 'High (inflated)' : 'Standard'}</span>
            </div>
          </div>

          <div className="invoice-divider" />

          {/* Scores */}
          <div className="invoice-section-label">VALUATION METRICS</div>
          <div className="invoice-scores">
            {[
              { label: 'Value Score', val: `${result.valueScore}/99` },
              { label: 'Expectation Index', val: `${Math.min(result.expectationIndex, 110)}` },
              { label: 'Ego Multiplier', val: `×${result.egoMultiplier}` },
              { label: 'Risk Factor', val: `${result.riskFactor}%` },
            ].map(s => (
              <div key={s.label} className="invoice-score-row">
                <span className="invoice-score-label">{s.label}</span>
                <span className="invoice-score-dots" />
                <span className="invoice-score-val">{s.val}</span>
              </div>
            ))}
          </div>

          <div className="invoice-divider" />

          {/* Total */}
          <div className="invoice-total-row">
            <span className="invoice-total-label">ESTIMATED FAIR PRICE</span>
            <span className="invoice-total-val">{formatINR(result.total)}</span>
          </div>

          <p className="invoice-note">Market adjusted. Intangibles excluded. Fairness not guaranteed.</p>

          <div className="invoice-footer">
            <span>fairprice.app</span>
            <span>Generated algorithmically. No humans were involved.</span>
          </div>
        </div>

        {/* Actions */}
        <div className="share-actions">
          <button
            id="close-share-btn"
            className="share-close-btn"
            onClick={onClose}
          >
            Close
          </button>
          <button
            id="copy-share-btn"
            className="share-copy-btn"
            onClick={() => {
              navigator.clipboard?.writeText(
                `FairPrice? Evaluation\nFair Price: ${formatINR(result.total)}\nValue Score: ${result.valueScore}/99\n${refId}`
              )
            }}
          >
            Copy Summary
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
