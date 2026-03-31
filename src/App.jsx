import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Landing from './components/Landing'
import StepFlow from './components/StepFlow'
import Calculator from './components/Calculator'
import Result from './components/Result'
import FloatingComments from './components/ui/FloatingComments'

export default function App() {
  const [screen, setScreen] = useState('landing')
  const [formData, setFormData] = useState({
    // Step 1 — Physical bio-data
    height: 160,
    weight: 55,
    age: 24,
    skinTone: 'wheatish',
    hairLength: 'long',
    cooking: 'decent',

    // Step 2 — Background
    education: 'graduate',
    job: 'private',
    familyWealth: 'middle',
    location: 'metro',
    quitJob: 'maybe',
    siblings: 1,

    // Step 3 — The audit
    instaFollowers: 500,
    instaFollowing: 300,
    maleFriends: 5,
    exes: 0,
    personality: 'ambivert',
    rotiRoundness: 5,
    inlaws: 'negotiate',
    opinionLevel: 'mild',
    goldWishlist: 3,
  })
  const [result, setResult] = useState(null)
  const [comments, setComments] = useState([])

  const addComment = (text) => {
    const id = Date.now() + Math.random()
    setComments(prev => [...prev, { id, text }])
    setTimeout(() => setComments(prev => prev.filter(c => c.id !== id)), 2800)
  }

  const calculateResult = (data) => {
    setFormData(data)
    setScreen('calculating')
    setTimeout(() => {
      setResult(computeRoast(data))
      setScreen('result')
    }, 5000)
  }

  const restart = () => { setScreen('landing'); setResult(null) }

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      <FloatingComments comments={comments} />
      <AnimatePresence mode="wait">
        {screen === 'landing'     && <Landing    key="landing"     onStart={() => setScreen('steps')} />}
        {screen === 'steps'       && <StepFlow   key="steps"       formData={formData} setFormData={setFormData} onCalculate={calculateResult} addComment={addComment} />}
        {screen === 'calculating' && <Calculator key="calculating" />}
        {screen === 'result'      && <Result     key="result"      result={result} formData={formData} onRestart={restart} />}
      </AnimatePresence>
    </div>
  )
}

/* ════════════════════════════════════════════════════
   ROAST ENGINE — Thinking like the groom
   Roasting HIM for every preference he revealed.
════════════════════════════════════════════════════ */
function computeRoast(d) {
  const roasts = []

  // ── PHYSICAL BACKFIRE ─────────────────────────────────
  if (d.height < 155) {
    roasts.push({ icon: '📏', text: `You're looking for a human in a size that doesn't exist. Your height standards are an attempt to compensate for your own short-sightedness.` })
  } else if (d.height > 170) {
    roasts.push({ icon: '📏', text: `You've measured her like a piece of furniture. Does she need to fit under your ego or just through the door?` })
  } else {
    roasts.push({ icon: '📏', text: `You have a preferred height for a spouse. You're basically window shopping for humans. Seek help.` })
  }

  const bmi = d.weight / Math.pow(d.height / 100, 2)
  if (bmi < 18.5) {
    roasts.push({ icon: '⚖️', text: `You want someone fragile enough to not fight back. Your weight preference is a medical concern for her and a psychiatric one for you.` })
  } else {
    roasts.push({ icon: '⚖️', text: `Quantifying a woman by her weight. What's next? Checking her teeth for age? You're a cattle trader, not a groom.` })
  }

  if (d.age < 22) {
    roasts.push({ icon: '🎂', text: `Looking for someone young so they haven't learned to identify your toxic traits yet? Tactically sound, morally bankrupt.` })
  } else {
    roasts.push({ icon: '🎂', text: `Evaluating age like you're checking the expiry date on milk. Your own maturity is still in the single digits.` })
  }

  // SKIN TONE BRUTALITY
  const skinRoasts = {
    fair1: `Selection: Tubelight. You probably want her to glow in the dark so you can find your way to the bathroom at night.`,
    fair2: `Light skin preference. Your kids will inherit your shallow nature along with her complexion.`,
    wheatish: `Wheatish. The "I'm not racist but" special. You're just as shallow, just more cowardly about it.`,
    dark: `Dark skin selection? Think twice before switching off the light. Can you even see her then? Your audacity is darker than your selection.`,
  }
  roasts.push({ icon: '🪞', text: skinRoasts[d.skinTone] || `You chose a skin tone like you're picking a wall paint. You're an interior designer of misery.` })

  // ── HAIR & COOKING ────────────────────────────────────
  const hairRoasts = {
    short: `Short hair. You're terrified she has enough personality to disagree with you. You're right. She does.`,
    verylong: `Very long hair. You want a live-action Rapunzel because your reality is too boring to handle.`,
  }
  if (hairRoasts[d.hairLength]) roasts.push({ icon: '💇', text: hairRoasts[d.hairLength] })

  const cookingRoasts = {
    masterchef: `You want a Masterchef? You can't even boil an egg without calling your mother. The hypocrisy is staggering.`,
    maggi: `Maggi only? You're surviving on junk and expecting her to join you in your nutritional suicide.`,
  }
  if (cookingRoasts[d.cooking]) roasts.push({ icon: '🍳', text: cookingRoasts[d.cooking] })

  // ── BACKGROUND BACKFIRE ───────────────────────────────
  if (d.education === 'phd' || d.education === 'postgrad') {
    roasts.push({ icon: '🎓', text: `She's massively overqualified for your fragile ego. You'll spend the next 20 years trying to dim her light.` })
  } else {
    roasts.push({ icon: '🎓', text: `You didn't want someone too smart, did you? Easier to win arguments when you're the only one who can read.` })
  }

  if (d.quitJob === 'yes' || d.quitJob === 'parttime') {
    roasts.push({ icon: '💼', text: `You've already written her resignation. You don't want a partner, you want a domestic servant with a degree.` })
  }

  // ── AUDIT BACKFIRE ───────────────────────────────────
  if (d.maleFriends === 0) {
    roasts.push({ icon: '👥', text: `Zero male friends preferred? Your insecurity is a black hole. You want to be her entire world because you know you're not enough for anyone else.` })
  } else if (d.maleFriends > 5) {
    roasts.push({ icon: '👥', text: `${d.maleFriends} male friends? You've already started the background checks and the surveillance. You're a stalker with a ring.` })
  }

  if (d.exes === 0) {
    roasts.push({ icon: '💔', text: `You want a first draft because you can't handle comparisons. You know you'd lose to even a mediocre ex.` })
  } else {
    roasts.push({ icon: '💔', text: `You'll bring up her past every time you burn the toast. You're a memory archaeologist of pain.` })
  }

  // ── DOSA ROUNDNESS ───────────────────────────────────
  if (d.rotiRoundness <= 3) {
    roasts.push({ icon: '🫓', text: `Amoeba shaped dosas? You'll cry. Geometric precision is your only achievement. You're a drafting tool in a lungi.` })
  } else if (d.rotiRoundness >= 8) {
    roasts.push({ icon: '🫓', text: `Compass-drawn dosas? Your standard for breakfast is higher than your standard for human rights.` })
  }

  // ── IN-LAWS & OPINIONS ────────────────────────────────
  if (d.inlaws === 'yes' || d.inlaws === 'yes2') {
    roasts.push({ icon: '🏠', text: `Living with your family? You're basically kidnapping her into a 24/7 reality show where your mom is the producer.` })
  }

  if (d.opinionLevel === 'none' || d.opinionLevel === 'mild') {
    roasts.push({ icon: '💬', text: `You want her to have as many opinions as a houseplant. They're cheaper and they don't cry when you ignore them.` })
  }

  // ── SCORE ────────────────────────────────────────────
  let score = 50
  if (['fair1','fair2'].includes(d.skinTone)) score += 20
  if (d.skinTone === 'dark') score += 5 // Audit cost
  if (d.quitJob === 'yes') score += 25
  if (d.maleFriends === 0) score += 20
  if (d.exes === 0) score += 15
  if (d.rotiRoundness >= 8) score += 15
  if (d.opinionLevel === 'none') score += 25
  if (d.inlaws.includes('yes')) score += 20

  score = Math.max(10, Math.min(score, 99))

  const tier =
    score >= 90 ? { label: 'Generational Red Flag 🚩🚩🚩', color: '#be123c', desc: 'You are the reason therapists have jobs. Your audacity is legendary, your self-awareness is non-existent. Congratulations on being a walking crime scene.' }
    : score >= 75 ? { label: 'Certified Toxic 🚩🚩', color: '#dc2626', desc: 'You don\'t want a wife, you want an obedient AI in a saree. Your insecurity is visible from space. Fix yourself before you ruin someone else.' }
    : score >= 55 ? { label: 'Shallow Waters 🟡', color: '#d97706', desc: 'You\'re predictable, boringly toxic, and entirely too confident. The bar is at the bottom of the ocean and you\'re still trying to dig under it.' }
    : { label: 'Problematic 🟢', color: '#16a34a', desc: 'Not the worst, but only because you forgot to check some boxes. You\'re still a headache in waiting.' }

  return { roasts: roasts.slice(0, 10), tier, score }
}
