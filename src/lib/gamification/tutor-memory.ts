const NAME_KEY     = 'speakfast-tutor-name'
const WEAKSPOT_KEY = 'speakfast-weak-spots'

export interface WeakSpot { topic: string; count: number; lastSeen: string }

export function getTutorName(): string {
  if (typeof window === 'undefined') return 'Luna'
  return localStorage.getItem(NAME_KEY) ?? 'Luna'
}

export function setTutorName(name: string) {
  localStorage.setItem(NAME_KEY, name)
}

export function getWeakSpots(): WeakSpot[] {
  if (typeof window === 'undefined') return []
  try { return JSON.parse(localStorage.getItem(WEAKSPOT_KEY) ?? '[]') } catch { return [] }
}

export function recordWeakSpot(topic: string) {
  const spots = getWeakSpots()
  const existing = spots.find(s => s.topic === topic)
  if (existing) {
    existing.count += 1
    existing.lastSeen = new Date().toISOString()
  } else {
    spots.push({ topic, count: 1, lastSeen: new Date().toISOString() })
  }
  spots.sort((a, b) => b.count - a.count)
  localStorage.setItem(WEAKSPOT_KEY, JSON.stringify(spots.slice(0, 10)))
}

/** Returns a context string to inject into AI system prompt */
export function getTutorContext(): string {
  const spots = getWeakSpots().slice(0, 3)
  if (spots.length === 0) return ''
  return `Student's known weak areas: ${spots.map(s => s.topic).join(', ')}. Reference these when relevant.`
}
