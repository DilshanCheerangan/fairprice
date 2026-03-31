import { motion } from 'framer-motion'
import './Slider.css'

const getTooltip = (val, min, max, tooltipMap) => {
  const pct = (val - min) / (max - min)
  if (pct < 0.33) return tooltipMap.low
  if (pct < 0.66) return tooltipMap.mid
  return tooltipMap.high
}

export default function Slider({ label, value, min = 0, max = 100, onChange, tooltipMap = {}, onInteract }) {
  const pct = ((value - min) / (max - min)) * 100
  const tip = getTooltip(value, min, max, tooltipMap)

  return (
    <div className="slider-wrap">
      <div className="slider-header">
        <span className="slider-label">{label}</span>
        {tip && (
          <motion.span
            key={tip}
            className="slider-badge"
            initial={{ opacity: 0, x: 6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
          >
            {tip}
          </motion.span>
        )}
      </div>
      <div className="slider-track">
        <div className="slider-fill" style={{ width: `${pct}%` }} />
      </div>
      <input
        type="range"
        className="slider-input"
        min={min}
        max={max}
        value={value}
        onChange={e => { onChange(Number(e.target.value)); onInteract?.() }}
      />
      {(tooltipMap.low || tooltipMap.high) && (
        <div className="slider-range-labels">
          <span>{tooltipMap.low}</span>
          <span>{tooltipMap.high}</span>
        </div>
      )}
    </div>
  )
}
