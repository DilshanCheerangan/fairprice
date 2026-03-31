import { motion } from 'framer-motion'
import './SkinPalette.css'

const SKIN_SWATCHES = [
  { key: 'fair1',    hex: '#FDDBB4', label: 'Very Fair',   hint: 'Looking for a neon sign?' },
  { key: 'fair2',    hex: '#F5C5A3', label: 'Fair',        hint: 'Tube-light complex.' },
  { key: 'wheatish', hex: '#E8A87C', label: 'Wheatish',    hint: 'Safe choice for your safe life.' },
  { key: 'medium',   hex: '#C68642', label: 'Wheatish+',   hint: 'Aunties call it "saanwla". You call it a compromise.' },
  { key: 'dusky',    hex: '#8D5524', label: 'Dusky',        hint: 'Bollywood calls it exotic. You call it a project.' },
  { key: 'dark',     hex: '#4A2912', label: 'Dark',         hint: 'Think twice before switching off the light.' },
]

export default function SkinPalette({ value, onChange, onInteract }) {
  const selected = SKIN_SWATCHES.find(s => s.key === value) || SKIN_SWATCHES[2]

  return (
    <div className="skin-palette-wrap">
      <div className="skin-palette-header">
        <span className="skin-palette-label">Her Skin Tone</span>
        <motion.span
          className="skin-selected-badge"
          key={selected.key}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          style={{ background: selected.hex + '22', borderColor: selected.hex + '66', color: selected.hex }}
        >
          {selected.label}
        </motion.span>
      </div>

      <div className="skin-swatches">
        {SKIN_SWATCHES.map(s => (
          <button
            key={s.key}
            type="button"
            className={`skin-swatch ${value === s.key ? 'selected' : ''}`}
            onClick={() => { onChange(s.key); onInteract && onInteract() }}
            title={s.label}
          >
            <div
              className="skin-swatch-circle"
              style={{ background: s.hex }}
            />
            {value === s.key && (
              <motion.div
                className="skin-swatch-ring"
                layoutId="skin-ring"
                style={{ borderColor: s.hex }}
              />
            )}
          </button>
        ))}
      </div>

      <motion.p
        className="skin-hint-text"
        key={selected.key}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        {selected.hint}
      </motion.p>
    </div>
  )
}
