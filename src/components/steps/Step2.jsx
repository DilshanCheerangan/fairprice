import Dropdown from '../ui/Dropdown'
import NumberInput from '../ui/NumberInput'
import './StepShared.css'

const COMMENTS = [
  'Education check. Afraid she might be smarter than you?',
  'Job status: audited. Planning how to spend her salary already?',
  'Career plans filed. You\'ve practically written the resignation for her.',
  'Family wealth check. Standard gold-digger procedure initialized.',
  'Location recorded. Moving her to your village? How generous.',
  'Sibling count tallied. Calculating the burden of your future in-laws?',
]

/* All options are yes — she will quit, just a matter of phrasing */
const QUIT_JOB_OPTIONS = [
  { value: 'yes',      label: '🏠 Yes',                   sub: 'Let\'s not pretend she has a choice.' },
  { value: 'parttime', label: '✋ Yes, but part-time',     sub: 'The slow transition to unemployment.' },
  { value: 'maybe',    label: '🤷 "We\'ll discuss it"',  sub: 'Translation: Until you say no.' },
  { value: 'no',       label: '💻 Yes, eventually',       sub: 'When the first kid arrives.' },
]

const LOCATION_OPTIONS = [
  { value: 'metro',  label: '🏙️ Metro City',    sub: 'Will find your life incredibly boring.' },
  { value: 'tier2',  label: '🌆 Tier-2 City',   sub: 'The "adjusting" type you want.' },
  { value: 'tier3',  label: '🏡 Small Town',     sub: 'Easier to control, right?' },
  { value: 'abroad', label: '✈️ Settled Abroad', sub: 'The ticket to your escape plan.' },
]

export default function Step2({ data, setData, addComment }) {
  const rc = () => addComment(COMMENTS[Math.floor(Math.random() * COMMENTS.length)])

  return (
    <div className="step-content">
      <div className="step-header">
        <span className="step-number">Round 02</span>
        <h2 className="step-title">The Background Check</h2>
        <p className="step-desc">
          Qualifications, job, family, location. Standard bio-data.
          Nothing weird happening here. <em>Right?</em>
        </p>
      </div>

      <Dropdown field="education" label="Her Education"
        value={data.education} onChange={v => setData(d => ({ ...d, education: v }))} onInteract={rc} />

      <Dropdown field="job" label="Her Current Job"
        value={data.job} onChange={v => setData(d => ({ ...d, job: v }))} onInteract={rc} />

      <div className="step-question-label">After Marriage — Will She Quit Her Job?</div>
      <p className="step-question-sublabel">
        Select the option that matches your ego.
      </p>
      <div className="pill-options pill-options-2" id="quit-job-options">
        {QUIT_JOB_OPTIONS.map(opt => (
          <button key={opt.value}
            className={`pill-option ${data.quitJob === opt.value ? 'active' : ''}`}
            onClick={() => { setData(d => ({ ...d, quitJob: opt.value })); rc() }}>
            <span className="pill-label">{opt.label}</span>
            <span className="pill-sub">{opt.sub}</span>
          </button>
        ))}
      </div>

      <hr className="form-divider" />

      <Dropdown field="familyWealth" label="Her Family's Financial Background"
        value={data.familyWealth} onChange={v => setData(d => ({ ...d, familyWealth: v }))} onInteract={rc} />

      {/* Location */}
      <div className="step-question-label">Her Location</div>
      <div className="pill-options pill-options-2" id="location-options">
        {LOCATION_OPTIONS.map(opt => (
          <button key={opt.value}
            className={`pill-option ${data.location === opt.value ? 'active' : ''}`}
            onClick={() => { setData(d => ({ ...d, location: opt.value })); rc() }}>
            <span className="pill-label">{opt.label}</span>
            <span className="pill-sub">{opt.sub}</span>
          </button>
        ))}
      </div>

      {/* Number of siblings */}
      <NumberInput id="siblings-input"
        label="Her Number of Siblings"
        sublabel="More siblings = more reasons for you to complain about in-laws."
        value={data.siblings} min={0} max={10} unit="👨‍👩‍👧‍👦"
        onChange={v => setData(d => ({ ...d, siblings: v }))} onInteract={rc} />
    </div>
  )
}
