import './ProgressBar.css'

const STEP_LABELS = [
  'Reviewing bio-data…',
  'Running background check…',
  'Auditing her timeline…',
]

export default function ProgressBar({ step, totalSteps }) {
  return (
    <div className="pbar-root">
      <div className="pbar-label">
        {STEP_LABELS[step - 1] || 'Processing…'}
        <span className="pbar-count">{step} / {totalSteps}</span>
      </div>
      <div className="pbar-track">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={`pbar-segment ${i < step ? 'filled' : ''}`}
          />
        ))}
      </div>
    </div>
  )
}
