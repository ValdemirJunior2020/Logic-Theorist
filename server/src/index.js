import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173'
const APPS_SCRIPT_URL = process.env.APPS_SCRIPT_URL || ''

app.use(cors({ origin: [CLIENT_URL, 'http://localhost:5173', 'http://127.0.0.1:5173'], credentials: true }))
app.use(express.json({ limit: '1mb' }))

// Local fallback only. Real permanent storage is Google Sheet through Apps Script.
let localLeaderboard = []

const voiceScenarioSeeds = [
  { row: 7, scenario: 'Reservation not found at check-in', answer: 'Call Supplier first; if unconfirmed in 20 minutes, create ticket.', difficulty: 1 },
  { row: 8, scenario: 'Overbooking relocation or hotel closed', answer: 'Call Supplier first; if unconfirmed in 10 minutes, create ticket.', difficulty: 1 },
  { row: 9, scenario: 'Incorrect guest name', answer: 'Call hotel and ask them to add the name, not change the name.', difficulty: 1 },
  { row: 10, scenario: 'Incorrect dates prepaid', answer: 'Create voucher via refund queue and rebook.', difficulty: 2 },
  { row: 13, scenario: 'Shuttle not available', answer: 'Offer 15% toward Uber/Lyft and create refund request if accepted.', difficulty: 1 },
  { row: 23, scenario: 'Hotel requests payment again for prepaid booking', answer: 'Call Supplier to provide payment for the hotel.', difficulty: 2 },
  { row: 31, scenario: 'Hotel Calls', answer: 'Create Hotel Needs Support ticket.', difficulty: 1 },
  { row: 32, scenario: 'Supplier Calls', answer: 'Create Supplier Needs Support ticket.', difficulty: 1 },
  { row: 35, scenario: 'Cancelling Refundable', answer: 'Select cancel and confirm cancellation.', difficulty: 1 },
  { row: 46, scenario: 'Needs receipt or invoice', answer: 'Use Needs Receipt ticket when applicable.', difficulty: 2 }
]

function makeId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

async function callAppsScript(action, payload = {}) {
  if (!APPS_SCRIPT_URL) {
    return { ok: false, error: 'APPS_SCRIPT_URL is not set. Paste your deployed Code.gs web app URL in server/.env or Render env vars.' }
  }

  const res = await fetch(APPS_SCRIPT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ action, ...payload })
  })

  const text = await res.text()
  try {
    return JSON.parse(text)
  } catch {
    return { ok: false, error: 'Apps Script returned non-JSON response.', raw: text }
  }
}

app.get('/api/health', (req, res) => {
  res.json({ ok: true, service: 'Logic Theorist Voice Matrix API', storage: APPS_SCRIPT_URL ? 'Google Sheets via Apps Script' : 'local fallback only' })
})

app.get('/api/random-puzzle', (req, res) => {
  const seed = voiceScenarioSeeds[Math.floor(Math.random() * voiceScenarioSeeds.length)]
  const fakeWrong = ['Send Slack for all future reservations', 'Create Tickets tab scenario', 'Offer random theorem refund', 'Ask the guest to solve Principia Mathematica first']
  const correctIndex = Math.floor(Math.random() * 4)
  const options = [...fakeWrong.slice(0, 3)]
  options.splice(correctIndex, 0, seed.answer)
  res.json({
    puzzle: {
      id: `random-voice-${seed.row}-${makeId()}`,
      row: seed.row,
      category: 'Voice Matrix Random Generator',
      scenario: seed.scenario,
      caller: 'Randomized Retro Caller',
      rageLine: 'The queue is blinking and the theorem is on fire!',
      premise: `Voice Matrix Row ${seed.row}: ${seed.scenario}. Choose the correct action.`,
      question: 'What is the correct Voice Matrix move?',
      options,
      answerIndex: correctIndex,
      explanation: `Correct answer: ${seed.answer}`,
      difficulty: seed.difficulty,
      source: `Voice Matrix Row ${seed.row}`
    }
  })
})

app.post('/api/scores', async (req, res) => {
  try {
    const entry = {
      id: makeId(),
      createdAt: new Date().toISOString(),
      playerName: String(req.body.playerName || 'Anonymous Operator').slice(0, 80),
      score: Number(req.body.score || 0),
      level: Number(req.body.level || 1),
      satisfaction: Number(req.body.satisfaction || 0),
      rage: Number(req.body.rage || 0),
      language: req.body.language === 'es' ? 'es' : 'en',
      achievements: Array.isArray(req.body.achievements) ? req.body.achievements.join(', ') : '',
      correct: Number(req.body.correct || 0),
      wrong: Number(req.body.wrong || 0)
    }

    localLeaderboard.push(entry)
    localLeaderboard = localLeaderboard.sort((a, b) => b.score - a.score).slice(0, 100)

    const sheetResult = await callAppsScript('saveScore', { entry })
    if (!sheetResult.ok && APPS_SCRIPT_URL) {
      return res.status(502).json({ ok: false, error: sheetResult.error || 'Google Sheet save failed', detail: sheetResult })
    }

    res.json({ ok: true, entry, sheet: sheetResult.ok ? 'saved-to-logic-tab' : 'not-configured-local-fallback' })
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message })
  }
})

app.get('/api/leaderboard', async (req, res) => {
  try {
    const sheetResult = await callAppsScript('getLeaderboard')
    if (sheetResult.ok && Array.isArray(sheetResult.leaderboard)) {
      return res.json({ ok: true, leaderboard: sheetResult.leaderboard })
    }
    res.json({ ok: true, leaderboard: localLeaderboard })
  } catch (error) {
    res.json({ ok: true, leaderboard: localLeaderboard, warning: error.message })
  }
})

app.listen(PORT, () => {
  console.log(`Logic Theorist server running on http://localhost:${PORT}`)
})
