import { motion } from 'framer-motion'
import './SkinToneSlider.css'

const SKIN_LABELS = [
  { max: 15, label: 'Snow Queen ❄️', hint: '"Gora/Gori" energy' },
  { max: 30, label: 'Fair & Lovely ✨', hint: 'Your relatives approve' },
  { max: 50, label: 'Wheatish 🌾', hint: 'Matrimonial goldzone' },
  { max: 65, label: 'Dusky 🌅', hint: 'Bollywood calls it "exotic"' },
  { max: 80, label: 'Brown & Proud 🤎', hint: 'Sunscreen is optional, therapy isn\'t' },
  { max: 100, label: 'Deep Melanin 🌑', hint: 'Aunties have opinions. Ignore them.' },
]

const getSkinLabel = (val) => SKIN_LABELS.find(s => val <= s.max) || SKIN_LABELS[SKIN_LABELS.length - 1]

export default function SkinToneSlider({ value, onChange, onInteract }) {
  const skinInfo = getSkinLabel(value)

  return (
    <div className="skin-slider-wrap">
      <div className="skin-slider-header">
        <span className="slider-label">Skin Tone</span>
        <motion.span
          className="skin-badge"
          key={skinInfo.label}
          initial={{ opacity: 0, y: -6, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          {skinInfo.label}
        </motion.span>
      </div>

      {/* Color gradient track */}
      <div className="skin-track-wrap">
        <div className="skin-gradient-track" />
        <input
          type="range"
          min={0}
          max={100}
          value={value}
          className="skin-input"
          onChange={e => { onChange(Number(e.target.value)); onInteract && onInteract() }}
        />
        <div
          className="skin-indicator"
          style={{ left: `${value}%` }}
        >
          <div
            className="skin-indicator-dot"
            style={{ background: getSkinHex(value) }}
          />
        </div>
      </div>

      <div className="skin-range-labels">
        <span>Fair</span>
        <motion.span
          key={skinInfo.hint}
          className="skin-hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {skinInfo.hint}
        </motion.span>
        <span>Dark</span>
      </div>
    </div>
  )
}

function getSkinHex(val) {
  // Interpolate from very fair to very dark brown
  const colors = [
    [255, 224, 196], // fair
    [240, 194, 160], // light
    [210, 160, 110], // wheatish
    [175, 120, 75],  // dusky
    [130, 85, 47],   // brown
    [85, 52, 28],    // dark
  ]
  const idx = (val / 100) * (colors.length - 1)
  const lo = Math.floor(idx)
  const hi = Math.min(Math.ceil(idx), colors.length - 1)
  const t = idx - lo
  const r = Math.round(colors[lo][0] + (colors[hi][0] - colors[lo][0]) * t)
  const g = Math.round(colors[lo][1] + (colors[hi][1] - colors[lo][1]) * t)
  const b = Math.round(colors[lo][2] + (colors[hi][2] - colors[lo][2]) * t)
  return `rgb(${r},${g},${b})`
}
