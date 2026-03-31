import NumberInput from '../ui/NumberInput'
import SkinPalette from '../ui/SkinPalette'
import './StepShared.css'

const COMMENTS = [
  'Physical specs logged. Hope your personality is better than your criteria.',
  'Hair preference documented. How original of you.',
  'Dosa better be round or you\'ll file for divorce, right?',
  'Skin tone choice noticed. Your relatives will have a lot to say.',
  'Age preference: seeking someone before they realize who you really are?',
  'Collecting data like a forensic audit. It\'s a wedding, not a heist.',
]

const HAIR_OPTIONS = [
  { value: 'short',    label: '✂️ Short',       sub: 'Too much personality for you?' },
  { value: 'medium',   label: '〰️ Medium',      sub: 'The "don\'t stand out" special.' },
  { value: 'long',     label: '💁 Long',         sub: 'Your mother\'s only requirement.' },
  { value: 'verylong', label: '🧜 Very Long',    sub: 'Living in the 1920s still?' },
]

const COOKING_OPTIONS = [
  { value: 'masterchef', label: '👨‍🍳 Masterchef level',   sub: 'Can serve a full Sadhya' },
  { value: 'decent',     label: '🍛 Decent home cook',     sub: 'Dosa point level' },
  { value: 'maggi',      label: '🍜 Maggi/Porotta only',    sub: 'Surviving on Swiggy' },
  { value: 'youtube',    label: '📺 YouTube chef',          sub: 'Learned from Veena\'s Curry' },
]

export default function Step1({ data, setData, addComment }) {
  const rc = () => addComment(COMMENTS[Math.floor(Math.random() * COMMENTS.length)])

  return (
    <div className="step-content">
      <div className="step-header">
        <span className="step-number">Round 01</span>
        <h2 className="step-title">The Bio-Data Form</h2>
        <p className="step-desc">
          Physical details. The ones you definitely haven't been Googling at 2am while telling yourself it's just curiosity.
        </p>
      </div>

      {/* Height & Weight */}
      <div className="num-row">
        <NumberInput id="height-input" label="Her Height" value={data.height}
          min={140} max={200} unit="cm"
          onChange={v => setData(d => ({ ...d, height: v }))} onInteract={rc} />
        <NumberInput id="weight-input" label="Her Weight" value={data.weight}
          min={35} max={120} unit="kg"
          onChange={v => setData(d => ({ ...d, weight: v }))} onInteract={rc} />
      </div>

      {/* Age */}
      <NumberInput id="age-input" label="Her Age" sublabel="Just asking (definitely not judging)"
        value={data.age} min={18} max={40} unit="yrs"
        onChange={v => setData(d => ({ ...d, age: v }))} onInteract={rc} />

      {/* Skin tone */}
      <SkinPalette value={data.skinTone}
        onChange={v => {
          setData(d => ({ ...d, skinTone: v }));
          if (v === 'dark') {
            addComment('Can you even see her at night?');
            addComment('Better have good lighting in the bedroom.');
          } else if (v === 'fair1') {
            addComment('Looking for a tubelight, are we?');
          } else {
            rc();
          }
        }}
      />

      <hr className="form-divider" />

      {/* Hair length */}
      <div className="step-question-label">Preferred Hair Length</div>
      <p className="step-question-sublabel">
        Because apparently this is a factor. Fine.
      </p>
      <div className="pill-options pill-options-2" id="hair-options">
        {HAIR_OPTIONS.map(opt => (
          <button key={opt.value}
            className={`pill-option ${data.hairLength === opt.value ? 'active' : ''}`}
            onClick={() => { setData(d => ({ ...d, hairLength: opt.value })); rc() }}>
            <span className="pill-label">{opt.label}</span>
            <span className="pill-sub">{opt.sub}</span>
          </button>
        ))}
      </div>

      {/* Cooking ability */}
      <div className="step-question-label">Her Cooking Ability</div>
      <p className="step-question-sublabel">Be honest. You thought about this before anything else.</p>
      <div className="pill-options pill-options-2" id="cooking-options">
        {COOKING_OPTIONS.map(opt => (
          <button key={opt.value}
            className={`pill-option ${data.cooking === opt.value ? 'active' : ''}`}
            onClick={() => { setData(d => ({ ...d, cooking: opt.value })); rc() }}>
            <span className="pill-label">{opt.label}</span>
            <span className="pill-sub">{opt.sub}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
