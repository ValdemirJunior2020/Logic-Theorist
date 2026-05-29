import { useMemo, useState } from 'react'
import { BatteryCharging, BrainCircuit, Flame, PhoneCall, Sparkles, Trophy, Zap } from 'lucide-react'
import { getPuzzles } from './data/puzzles'
import type { Language, LeaderboardEntry, Puzzle, ScorePayload } from './types/game'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

const copy = {
  en: {
    title: 'Logic Theorist: Call Center Madness',
    subtitle: 'Voice Matrix Edition — no Ticket Matrix puzzles.',
    start: 'Start Shift', next: 'Next Screaming Caller', submit: 'Lock Answer', save: 'Save Score to Logic Sheet',
    player: 'Operator Name', level: 'Level', score: 'Score', rage: 'Caller Rage', satisfaction: 'Satisfaction', queue: 'Incoming Logic Queue',
    engine: 'Logic Engine', source: 'Matrix source', rules: 'What the matrix says', answerSaved: 'Score saved to Google Sheet tab: Logic',
    tutorial: '1956. Vacuum tubes are hot. Phones are ringing. Your job: choose the correct Voice Matrix action before the caller turns into a philosopher zombie.',
    correct: ['Correct! Your headset survived another theorem.', 'Boom. The matrix approves. The caller is only mildly dramatic.', 'Proof complete. Someone give that operator a coffee.'],
    wrong: ['Wrong. The theorem exploded and the caller now quotes Nietzsche.', 'Nope. That logic needs coffee and supervision.', 'Incorrect. The phone is now haunted.'],
    achievements: 'Achievements', leaderboard: 'Leaderboard', powerups: 'Power-ups', hint: 'Newell-Simon Hint', skip: 'Heuristic Boost', bomb: 'Substitution Bomb'
  },
  es: {
    title: 'Logic Theorist: Locura en el Call Center',
    subtitle: 'Edición Voice Matrix — sin Ticket Matrix, sin lógica genérica P→Q.',
    start: 'Iniciar Turno', next: 'Siguiente Llamante Gritando', submit: 'Bloquear Respuesta', save: 'Guardar Puntuación en la Hoja Logic',
    player: 'Nombre del Operador', level: 'Nivel', score: 'Puntuación', rage: 'Furia del Cliente', satisfaction: 'Satisfacción', queue: 'Cola de Llamadas Lógicas',
    engine: 'Motor Lógico', source: 'Fuente de la Matrix', rules: 'Lo que dice la matrix', answerSaved: 'Puntuación guardada en la pestaña Logic de Google Sheet',
    tutorial: '1956. Los tubos de vacío están calientes. Los teléfonos no dejan de sonar. Tu trabajo: elegir la acción correcta de la Voice Matrix antes de que el cliente se convierta en zombi filósofo.',
    correct: ['¡Correcto! Tu auricular sobrevivió a otro teorema.', 'Boom. La matrix aprueba. El cliente solo está un poco dramático.', 'Prueba completa. Que alguien le dé café a ese operador.'],
    wrong: ['Incorrecto. El teorema explotó y el cliente ahora cita a Nietzsche.', 'No. Esa lógica necesita café y supervisión.', 'Incorrecto. El teléfono ahora está embrujado.'],
    achievements: 'Logros', leaderboard: 'Clasificación', powerups: 'Poderes', hint: 'Pista Newell-Simon', skip: 'Impulso Heurístico', bomb: 'Bomba de Sustitución'
  }
}

function pickFunny(list: string[]) {
  return list[Math.floor(Math.random() * list.length)]
}

function getTitle(score: number, lang: Language) {
  if (score >= 220) return lang === 'en' ? 'Vacuum Tube Legend' : 'Leyenda del Tubo de Vacío'
  if (score >= 150) return lang === 'en' ? 'Matrix Commander' : 'Comandante de la Matrix'
  if (score >= 80) return lang === 'en' ? 'Logic Floor Supervisor' : 'Supervisor de Lógica'
  return lang === 'en' ? 'Confused Intern With Coffee' : 'Becario Confundido con Café'
}

export default function App() {
  const [language, setLanguage] = useState<Language>('en')
  const [started, setStarted] = useState(false)
  const [playerName, setPlayerName] = useState('Your Name here')
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [rage, setRage] = useState(18)
  const [satisfaction, setSatisfaction] = useState(92)
  const [correct, setCorrect] = useState(0)
  const [wrong, setWrong] = useState(0)
  const [feedback, setFeedback] = useState('')
  const [answered, setAnswered] = useState(false)
  const [achievements, setAchievements] = useState<string[]>([])
  const [savedMessage, setSavedMessage] = useState('')
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [hintUsed, setHintUsed] = useState(false)
  const [skipUsed, setSkipUsed] = useState(false)
  const [bombUsed, setBombUsed] = useState(false)

  const t = copy[language]
  const puzzles = useMemo(() => getPuzzles(language), [language])
  const puzzle: Puzzle = puzzles[index % puzzles.length]
  const level = Math.floor(index / 4) + 1
  const engineHeat = Math.min(100, 25 + rage + level * 5)

  function addAchievement(name: string) {
    setAchievements((prev) => (prev.includes(name) ? prev : [...prev, name]))
  }

  function submitAnswer() {
    if (selected === null || answered) return
    const isCorrect = selected === puzzle.answerIndex
    setAnswered(true)
    if (isCorrect) {
      const speedBonus = Math.max(1, 10 - level)
      const points = 10 + puzzle.difficulty * 3 + speedBonus
      setScore((s) => s + points)
      setCorrect((c) => c + 1)
      setRage((r) => Math.max(0, r - 9))
      setSatisfaction((s) => Math.min(100, s + 4))
      setFeedback(`${pickFunny(t.correct)} +${points}`)
      if (correct === 0) addAchievement(language === 'en' ? 'First Proof!' : '¡Primera Prueba!')
      if (puzzle.difficulty >= 3) addAchievement(language === 'en' ? 'Avoided Infinite Regress!' : '¡Evitó la Regresión Infinita!')
    } else {
      setScore((s) => Math.max(0, s - 4))
      setWrong((w) => w + 1)
      setRage((r) => Math.min(100, r + 13))
      setSatisfaction((s) => Math.max(0, s - 8))
      setFeedback(`${pickFunny(t.wrong)} -4`)
    }
  }

  function nextPuzzle() {
    setIndex((i) => i + 1)
    setSelected(null)
    setAnswered(false)
    setFeedback('')
    setHintUsed(false)
    setSavedMessage('')
  }

  function useHint() {
    if (hintUsed) return
    setHintUsed(true)
    setScore((s) => Math.max(0, s - 2))
    setFeedback(`💡 ${puzzle.matrixInstruction}`)
  }

  function useSkip() {
    if (skipUsed) return
    setSkipUsed(true)
    setScore((s) => Math.max(0, s - 5))
    setRage((r) => Math.max(0, r - 12))
    setFeedback(language === 'en' ? '⚡ Heuristic Boost used. Caller transferred to the Department of Maybe.' : '⚡ Impulso Heurístico usado. Cliente transferido al Departamento del Tal Vez.')
    nextPuzzle()
  }

  function useBomb() {
    if (bombUsed || answered) return
    setBombUsed(true)
    const wrongOptions = puzzle.options.map((_, i) => i).filter((i) => i !== puzzle.answerIndex)
    const removed = wrongOptions.slice(0, 2).join(', ')
    setFeedback(language === 'en' ? `💣 Substitution Bomb removed two nonsense answers: ${removed}` : `💣 Bomba de Sustitución eliminó dos respuestas absurdas: ${removed}`)
  }

  async function saveScore() {
    const payload: ScorePayload = { playerName, score, level, satisfaction, rage, language, achievements, correct, wrong }
    const res = await fetch(`${API_URL}/api/scores`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data?.error || 'Failed to save score')
    setSavedMessage(t.answerSaved)
    loadLeaderboard()
  }

  async function loadLeaderboard() {
    const res = await fetch(`${API_URL}/api/leaderboard`)
    const data = await res.json()
    setLeaderboard(data.leaderboard || [])
  }

  return (
    <div className="min-h-screen bg-[#120d0a] text-amber-100 crt px-4 py-5 md:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-5 rounded-3xl border-4 border-amber-700/80 bg-gradient-to-r from-stone-950 via-red-950 to-stone-950 p-5 shadow-[0_0_35px_rgba(245,158,11,.25)]">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-mono text-sm text-emerald-300">NEWELL-SIMON INSPIRED • VOICE MATRIX ONLY • 1950s AI OPERATOR SIM</p>
              <h1 className="font-display text-3xl font-black text-amber-200 md:text-5xl">☎ {t.title}</h1>
              <p className="mt-2 max-w-3xl text-amber-100/80">{t.subtitle}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setLanguage('en')} className={`btn ${language === 'en' ? 'btn-on' : ''}`}>English</button>
              <button onClick={() => setLanguage('es')} className={`btn ${language === 'es' ? 'btn-on' : ''}`}>Español</button>
            </div>
          </div>
        </header>

        {!started ? (
          <section className="grid gap-5 md:grid-cols-[1.2fr_.8fr]">
            <div className="panel p-7">
              <h2 className="mb-3 text-3xl font-black text-emerald-300">📟 Tutorial Comic Terminal</h2>
              <p className="text-lg leading-8 text-amber-100/90">{t.tutorial}</p>
              <div className="mt-6 rounded-2xl bg-black/40 p-5 font-mono text-green-300">
                <p>CALL 001: “Help! My guest is at check-in and the reservation is missing!”</p>
                <p>AI OPERATOR: “Consulting Voice Matrix... please do not feed sandwiches into the vacuum tubes.”</p>
              </div>
              <div className="mt-6 flex flex-col gap-3 md:flex-row">
                <input value={playerName} onChange={(e) => setPlayerName(e.target.value)} className="input" placeholder={t.player} />
                <button onClick={() => { setStarted(true); loadLeaderboard() }} className="primary-btn">{t.start}</button>
              </div>
            </div>
            <div className="panel p-7">
              <h3 className="text-2xl font-black text-amber-300">🎯 Game Rules</h3>
              <ul className="mt-4 space-y-3 text-amber-100/90">
                <li>✅ Correct Voice Matrix action = points + happy caller.</li>
                <li>❌ Wrong action = rage meter rises and the phone gets haunted.</li>
                <li>🔥 Higher levels increase computer heat and caller drama.</li>
                <li>💾 Final scores save to your Google Sheet tab named <b>Logic</b>.</li>
              </ul>
            </div>
          </section>
        ) : (
          <main className="grid gap-5 lg:grid-cols-[260px_1fr_320px]">
            <aside className="space-y-5">
              <div className="panel p-4">
                <h2 className="mb-3 flex items-center gap-2 text-xl font-black text-emerald-300"><PhoneCall /> {t.queue}</h2>
                {[0, 1, 2].map((n) => <div key={n} className={`mb-3 rounded-2xl border border-amber-700 bg-red-950/40 p-3 ${n === 0 ? 'animate-ring' : ''}`}>☎ CALL #{index + n + 1}<br /><span className="text-sm text-amber-200/70">{n === 0 ? puzzle.caller : 'Queued caller screaming...'}</span></div>)}
              </div>
              <div className="panel p-4">
                <h2 className="mb-3 flex items-center gap-2 text-xl font-black text-orange-300"><BatteryCharging /> {t.engine}</h2>
                <div className="meter"><div style={{ width: `${engineHeat}%` }} className="meter-fill bg-orange-500" /></div>
                <p className="mt-2 font-mono text-sm">HEAT: {engineHeat}%</p>
                <div className="mt-4 grid grid-cols-5 gap-2">{Array.from({ length: 15 }).map((_, i) => <span key={i} className="h-4 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,.8)] animate-flicker" />)}</div>
              </div>
            </aside>

            <section className="panel p-5 md:p-7 animate-pop">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-mono text-sm text-emerald-300">{t.source}: {puzzle.source}</p>
                  <h2 className="text-3xl font-black text-amber-200">{puzzle.scenario}</h2>
                  <p className="mt-1 text-red-200">☎ {puzzle.caller}: “{puzzle.rageLine}”</p>
                </div>
                <div className="rounded-2xl border border-amber-700 bg-black/30 px-4 py-2 font-mono">DIFFICULTY {puzzle.difficulty}</div>
              </div>

              <div className="mb-5 rounded-3xl border-2 border-emerald-700 bg-emerald-950/20 p-5">
                <h3 className="mb-2 flex items-center gap-2 text-xl font-bold text-emerald-300"><BrainCircuit /> Logic Call Transcript</h3>
                <p className="leading-7 text-amber-50/90">{puzzle.premise}</p>
              </div>

              <h3 className="mb-3 text-2xl font-black text-amber-300">{puzzle.question}</h3>
              <div className="grid gap-3">
                {puzzle.options.map((option, i) => (
                  <button key={option} onClick={() => !answered && setSelected(i)} className={`answer ${selected === i ? 'answer-selected' : ''} ${answered && i === puzzle.answerIndex ? 'answer-correct' : ''} ${answered && selected === i && i !== puzzle.answerIndex ? 'answer-wrong' : ''}`}>
                    <span className="font-black">{String.fromCharCode(65 + i)}.</span> {option}
                  </button>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <button onClick={submitAnswer} className="primary-btn" disabled={selected === null || answered}>{t.submit}</button>
                <button onClick={nextPuzzle} className="btn">{t.next}</button>
                <button onClick={saveScore} className="btn border-emerald-500 text-emerald-200">💾 {t.save}</button>
              </div>

              {feedback && <div className="mt-5 rounded-3xl border-2 border-amber-600 bg-black/40 p-5 text-xl font-black text-amber-200">{feedback}</div>}
              {answered && <div className="mt-4 rounded-3xl border border-sky-500 bg-sky-950/30 p-5"><h4 className="font-black text-sky-200">{t.rules}</h4><p className="mt-2">{puzzle.explanation}</p><p className="mt-3 font-mono text-sm text-sky-100/80">Instruction: {puzzle.matrixInstruction}<br />Slack: {puzzle.slack}<br />Refund Queue: {puzzle.refundQueue}<br />Ticket: {puzzle.createTicket}<br />Supervisor: {puzzle.supervisor}</p></div>}
              {savedMessage && <p className="mt-4 rounded-2xl bg-emerald-900/50 p-3 text-emerald-200">✅ {savedMessage}</p>}
            </section>

            <aside className="space-y-5">
              <div className="panel p-4">
                <h2 className="mb-3 flex items-center gap-2 text-xl font-black text-amber-300"><Trophy /> {playerName}</h2>
                <Stat label={t.score} value={score} />
                <Stat label={t.level} value={level} />
                <Stat label="Title" value={getTitle(score, language)} />
                <label className="mt-4 block font-mono text-sm text-red-200">{t.rage}: {rage}%</label><div className="meter"><div style={{ width: `${rage}%` }} className="meter-fill bg-red-500" /></div>
                <label className="mt-4 block font-mono text-sm text-emerald-200">{t.satisfaction}: {satisfaction}%</label><div className="meter"><div style={{ width: `${satisfaction}%` }} className="meter-fill bg-emerald-500" /></div>
              </div>
              <div className="panel p-4">
                <h2 className="mb-3 flex items-center gap-2 text-xl font-black text-fuchsia-300"><Zap /> {t.powerups}</h2>
                <button onClick={useHint} className="power" disabled={hintUsed}>💡 {t.hint}</button>
                <button onClick={useSkip} className="power" disabled={skipUsed}>⚡ {t.skip}</button>
                <button onClick={useBomb} className="power" disabled={bombUsed}>💣 {t.bomb}</button>
              </div>
              <div className="panel p-4">
                <h2 className="mb-3 flex items-center gap-2 text-xl font-black text-emerald-300"><Sparkles /> {t.achievements}</h2>
                {achievements.length === 0 ? <p className="text-amber-100/60">No badges yet.</p> : achievements.map((a) => <div key={a} className="mb-2 rounded-xl bg-amber-900/40 p-2">🏆 {a}</div>)}
              </div>
              <div className="panel p-4">
                <h2 className="mb-3 text-xl font-black text-amber-300">{t.leaderboard}</h2>
                <button onClick={loadLeaderboard} className="btn mb-3 w-full">Refresh</button>
                <div className="max-h-52 space-y-2 overflow-auto pr-1">
                  {leaderboard.slice(0, 8).map((e, i) => <div key={e.id || i} className="rounded-xl bg-black/30 p-2 text-sm"><b>#{i + 1} {e.playerName}</b><br />{e.score} pts • L{e.level}</div>)}
                </div>
              </div>
            </aside>
          </main>
        )}
      </div>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return <div className="mb-2 flex items-center justify-between rounded-xl bg-black/30 px-3 py-2"><span className="text-amber-100/70">{label}</span><b className="text-amber-200">{value}</b></div>
}
