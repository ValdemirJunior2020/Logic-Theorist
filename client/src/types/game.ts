export type Language = 'en' | 'es'

export type Puzzle = {
  id: string
  row: number
  category: string
  scenario: string
  caller: string
  rageLine: string
  premise: string
  question: string
  options: string[]
  answerIndex: number
  explanation: string
  matrixInstruction: string
  slack: string
  refundQueue: string
  createTicket: string
  supervisor: string
  difficulty: number
  source: string
}

export type ScorePayload = {
  playerName: string
  score: number
  level: number
  satisfaction: number
  rage: number
  language: Language
  achievements: string[]
  correct: number
  wrong: number
}

export type LeaderboardEntry = ScorePayload & {
  id: string
  createdAt: string
}
