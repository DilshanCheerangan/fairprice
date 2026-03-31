import NumberInput from '../ui/NumberInput'
import './StepShared.css'

const COMMENTS = [
  'Instagram followers being audited. Planning your future as an "influencer husband"?',
  'Male friend count logged. Your insecurity is practically a physical object now.',
  'Ex count filed. You\'ll definitely bring this up during your first major argument.',
  'Dosa roundness documented. Because geometric precision is key to a happy life.',
  'Gold wishlist recorded. Your bank account is screaming for help.',
  'In-law situation documented. You\'ve already decided her future living room.',
  'Opinion level filed. How many original thoughts are you actually comfortable with?',
]

const PERSONALITY_OPTIONS = [
  { value: 'introvert', label: '🫥 Introvert',  sub: 'Easier to ignore, right?' },
  { value: 'ambivert',  label: '🤷 Ambivert',   sub: 'Unpredictable. You won\'t like that.' },
  { value: 'extrovert', label: '🎉 Extrovert',   sub: 'Has a life. Massive red flag for you.' },
]

/* All options are "yes" variants — she has no choice 😂 */
const INLAWS_OPTIONS = [
  { value: 'yes',       label: '🏠 Yes',                 sub: 'The default setting.' },
  { value: 'yes2',      label: '✅ Definitely Yes',       sub: 'Why even ask?' },
  { value: 'negotiate', label: '🤷 "We\'ll figure it out"', sub: 'Meaning: You\'ll win.' },
  { value: 'rotate',    label: '📋 She\'ll understand',   sub: 'She has no other choice.' },
]

const OPINION_OPTIONS = [
  { value: 'none',     label: '🪴 No opinions',        sub: 'The perfect houseplant wife.' },
  { value: 'mild',     label: '🍲 About food only',    sub: 'Keep her in the kitchen, right?' },
  { value: 'moderate', label: '🗣️ Mild corrections',   sub: 'Will occasionally bruise your ego.' },
  { value: 'full',     label: '📢 Has opinions on life', sub: 'Too dangerous for your comfort.' },
]

export default function Step3({ data, setData, addComment }) {
  const rc = () => addComment(COMMENTS[Math.floor(Math.random() * COMMENTS.length)])

  return (
    <div className="step-content">
      <div className="step-header">
        <span className="step-number">Round 03</span>
        <h2 className="step-title">The Vibe Check</h2>
        <p className="step-desc">
          Instagram following, ex-partners, in-law custody battles, and dosa geometry.
          Things you really shouldn't be asking about.
        </p>
      </div>

      {/* Instagram */}
      <div className="num-row">
        <NumberInput id="followers-input" label="Her Followers"
          value={data.instaFollowers} min={0} max={10000000} unit="👥"
          onChange={v => setData(d => ({ ...d, instaFollowers: v }))} onInteract={rc} />
        <NumberInput id="following-input" label="Following"
          value={data.instaFollowing} min={0} max={10000} unit="→"
          onChange={v => setData(d => ({ ...d, instaFollowing: v }))} onInteract={rc} />
      </div>

      {/* Male friends + Exes */}
      <div className="num-row">
        <NumberInput id="male-friends-input" label="Male Friends"
          sublabel="Counting them like health risk factors."
          value={data.maleFriends} min={0} max={200} unit="👦"
          onChange={v => setData(d => ({ ...d, maleFriends: v }))} onInteract={rc} />
        <NumberInput id="exes-input" label="Exes"
          sublabel="How many past mistakes are you competing with?"
          value={data.exes} min={0} max={20} unit="💔"
          onChange={v => setData(d => ({ ...d, exes: v }))} onInteract={rc} />
      </div>

      <hr className="form-divider" />

      {/* Dosa roundness — the most important metric in Kerala */}
      <div className="step-question-label">🫓 Required Dosa Roundness</div>
      <p className="step-question-sublabel">
        Are you looking for a wife or a drafting tool?
      </p>
      <div className="roti-slider-wrap">
        <div className="roti-track">
          <input type="range" className="roti-input" min={1} max={10} value={data.rotiRoundness}
            onChange={e => { setData(d => ({ ...d, rotiRoundness: Number(e.target.value) })); rc() }} />
        </div>
        <div className="roti-labels">
          <span>🟤 Amoeba shape</span>
          <span className="roti-score">{data.rotiRoundness}/10</span>
          <span>⭕ Compass-drawn</span>
        </div>
        <p className="roti-commentary">
          {data.rotiRoundness <= 3 && 'Geometric precision in bread? You\'re a nightmare.'}
          {data.rotiRoundness > 3 && data.rotiRoundness <= 5 && 'Actually reasonable? Must be a mistake.'}
          {data.rotiRoundness > 5 && data.rotiRoundness <= 8 && 'Your dosa standards exceed your character quality.'}
          {data.rotiRoundness > 8 && 'You want a compass. Not a human.'}
        </p>
      </div>

      <hr className="form-divider" />

      {/* Gold wishlist */}
      <NumberInput id="gold-input" label="Gold Wishlist Items (hers)"
        sublabel="Planning the financial ruin of her family already?"
        value={data.goldWishlist} min={0} max={30} unit="💍"
        onChange={v => setData(d => ({ ...d, goldWishlist: v }))} onInteract={rc} />

      <hr className="form-divider" />

      {/* Personality */}
      <div className="step-question-label">Her Personality</div>
      <p className="step-question-sublabel">You've decided already. We're just making it official.</p>
      <div className="pill-options pill-options-3" id="personality-options">
        {PERSONALITY_OPTIONS.map(opt => (
          <button key={opt.value}
            className={`pill-option ${data.personality === opt.value ? 'active' : ''}`}
            onClick={() => { setData(d => ({ ...d, personality: opt.value })); rc() }}>
            <span className="pill-label">{opt.label}</span>
            <span className="pill-sub">{opt.sub}</span>
          </button>
        ))}
      </div>

      {/* In-laws — all yes variants */}
      <div className="step-question-label">Will she come live with your family?</div>
      <p className="step-question-sublabel">
        Choose your answer carefully. (All options are yes. She just doesn't know it yet.)
      </p>
      <div className="pill-options pill-options-2" id="inlaws-options">
        {INLAWS_OPTIONS.map(opt => (
          <button key={opt.value}
            className={`pill-option ${data.inlaws === opt.value ? 'active' : ''}`}
            onClick={() => { setData(d => ({ ...d, inlaws: opt.value })); rc() }}>
            <span className="pill-label">{opt.label}</span>
            <span className="pill-sub">{opt.sub}</span>
          </button>
        ))}
      </div>

      {/* Opinion level */}
      <div className="step-question-label">How Many Opinions Can She Have?</div>
      <p className="step-question-sublabel">
        Pick the maximum acceptable number of thoughts she is permitted to express. <em>Seriyaa?</em>
      </p>
      <div className="pill-options pill-options-2" id="opinion-options">
        {OPINION_OPTIONS.map(opt => (
          <button key={opt.value}
            className={`pill-option ${data.opinionLevel === opt.value ? 'active' : ''}`}
            onClick={() => { setData(d => ({ ...d, opinionLevel: opt.value })); rc() }}>
            <span className="pill-label">{opt.label}</span>
            <span className="pill-sub">{opt.sub}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
