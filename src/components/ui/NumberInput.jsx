import './NumberInput.css'

export default function NumberInput({ label, sublabel, value, onChange, min, max, unit, onInteract, id }) {
  const handleChange = (e) => {
    let v = parseInt(e.target.value, 10)
    if (isNaN(v)) v = min
    if (min !== undefined) v = Math.max(min, v)
    if (max !== undefined) v = Math.min(max, v)
    onChange(v)
    onInteract && onInteract()
  }

  const step = (dir) => {
    const v = Math.max(min ?? -Infinity, Math.min(max ?? Infinity, value + dir))
    onChange(v)
    onInteract && onInteract()
  }

  return (
    <div className="num-wrap" id={id}>
      <div className="num-header">
        <label className="num-label">{label}</label>
        {sublabel && <span className="num-sublabel">{sublabel}</span>}
      </div>
      <div className="num-control">
        <button type="button" className="num-btn" onClick={() => step(-1)}>−</button>
        <div className="num-input-wrap">
          <input
            type="number"
            className="num-input"
            value={value}
            min={min}
            max={max}
            onChange={handleChange}
          />
          {unit && <span className="num-unit">{unit}</span>}
        </div>
        <button type="button" className="num-btn" onClick={() => step(1)}>+</button>
      </div>
    </div>
  )
}
