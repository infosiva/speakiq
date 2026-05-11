const KEY = 'speakfast-sm2'

export interface WordCard {
  word: string
  translation: string
  language: string
  interval: number      // days until next review
  repetitions: number   // times reviewed correctly in a row
  easeFactor: number    // 2.5 default, lowers on failure
  nextReview: string    // ISO date YYYY-MM-DD
  totalReviews: number
}

function read(): WordCard[] {
  if (typeof window === 'undefined') return []
  try { return JSON.parse(localStorage.getItem(KEY) ?? '[]') } catch { return [] }
}

function write(cards: WordCard[]) { localStorage.setItem(KEY, JSON.stringify(cards)) }

/** quality: 0=blackout, 1=wrong, 2=hard, 3=ok, 4=easy, 5=perfect */
export function reviewCard(word: string, quality: 0 | 1 | 2 | 3 | 4 | 5): WordCard | null {
  const cards = read()
  const idx = cards.findIndex(c => c.word === word)
  if (idx < 0) return null
  const c = { ...cards[idx] }

  if (quality < 3) {
    c.repetitions = 0
    c.interval = 1
  } else {
    if (c.repetitions === 0)      c.interval = 1
    else if (c.repetitions === 1) c.interval = 6
    else                          c.interval = Math.round(c.interval * c.easeFactor)
    c.repetitions += 1
  }
  c.easeFactor = Math.max(1.3, c.easeFactor + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  c.totalReviews += 1
  const next = new Date()
  next.setDate(next.getDate() + c.interval)
  c.nextReview = next.toISOString().split('T')[0]
  cards[idx] = c
  write(cards)
  return c
}

export function addCard(word: string, translation: string, language: string): WordCard {
  const cards = read()
  const existing = cards.find(c => c.word === word && c.language === language)
  if (existing) return existing
  const today = new Date().toISOString().split('T')[0]
  const card: WordCard = {
    word, translation, language,
    interval: 1, repetitions: 0, easeFactor: 2.5,
    nextReview: today, totalReviews: 0,
  }
  write([...cards, card])
  return card
}

export function getDueCards(language?: string): WordCard[] {
  const today = new Date().toISOString().split('T')[0]
  return read().filter(c => (!language || c.language === language) && c.nextReview <= today)
}

export function getAllCards(language?: string): WordCard[] {
  return read().filter(c => !language || c.language === language)
}
