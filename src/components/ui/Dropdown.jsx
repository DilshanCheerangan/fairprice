import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Dropdown.css'

const OPTIONS = {
  education: [
    { value: 'phd',      label: 'PhD / Research',        tag: 'Overqualified for you', tagColor: 'violet' },
    { value: 'postgrad', label: 'Post-Graduate (MBA/MS)', tag: 'Will earn more',        tagColor: 'violet' },
    { value: 'graduate', label: 'Graduate (B.Tech/BA)',   tag: 'Standard issue',        tagColor: 'neutral' },
    { value: 'diploma',  label: 'Diploma / Vocational',   tag: 'Skilled',               tagColor: 'amber' },
    { value: '12th',     label: '12th Pass',              tag: 'You prefer this. Why.', tagColor: 'rose' },
    { value: 'noedu',    label: 'No formal education',    tag: 'Bhai.',                 tagColor: 'rose' },
  ],
  job: [
    { value: 'doctor',    label: 'Doctor',                tag: 'Night shifts incoming', tagColor: 'violet' },
    { value: 'engineer',  label: 'Software Engineer',     tag: 'Dual income unlocked',  tagColor: 'emerald' },
    { value: 'govt',      label: 'Government Job',        tag: 'Sarkari Stability™',    tagColor: 'emerald' },
    { value: 'private',   label: 'Private Sector',        tag: 'She has opinions',       tagColor: 'neutral' },
    { value: 'business',  label: 'Own Business',          tag: 'Actually impressive',    tagColor: 'amber' },
    { value: 'homemaker', label: 'Homemaker (preferred)', tag: 'This is the red flag',  tagColor: 'rose' },
    { value: 'jobless',   label: 'Currently not working', tag: 'Looking for opportunity',tagColor: 'muted' },
  ],
  familyWealth: [
    { value: 'rich',     label: 'Rich / Old Money',       tag: 'Gold standard',        tagColor: 'emerald' },
    { value: 'uppermid', label: 'Upper Middle Class',     tag: 'Comfortable',          tagColor: 'violet' },
    { value: 'middle',   label: 'Middle Class',           tag: 'Guilt trips included', tagColor: 'neutral' },
    { value: 'lower',    label: 'Humble Background',      tag: 'Call it "simple family"',tagColor: 'amber' },
    { value: 'dontknow', label: "Don't know / didn't ask",tag: 'Respect actually',     tagColor: 'muted' },
  ],
}

export default function Dropdown({ field, label, value, onChange, onInteract }) {
  const [open, setOpen] = useState(false)
  const opts = OPTIONS[field] || []
  const selected = opts.find(o => o.value === value) || opts[0]

  const handleSelect = (opt) => {
    onChange(opt.value)
    setOpen(false)
    onInteract && onInteract()
  }

  return (
    <div className="dropdown-wrap">
      <label className="dropdown-label">{label}</label>
      <div className="dropdown-container" id={`dropdown-${field}`}>
        <button
          type="button"
          className={`dropdown-trigger ${open ? 'open' : ''}`}
          onClick={() => setOpen(v => !v)}
        >
          <div className="dropdown-selected">
            <span className="dropdown-selected-label">{selected.label}</span>
            <span className={`dropdown-tag tag-${selected.tagColor}`}>{selected.tag}</span>
          </div>
          <svg className={`dropdown-chevron ${open ? 'rotated' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              className="dropdown-menu"
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.18 }}
            >
              {opts.map(opt => (
                <button
                  key={opt.value}
                  type="button"
                  className={`dropdown-option ${opt.value === value ? 'active' : ''}`}
                  onClick={() => handleSelect(opt)}
                >
                  <span className="dropdown-option-label">{opt.label}</span>
                  <span className={`dropdown-tag tag-${opt.tagColor}`}>{opt.tag}</span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
