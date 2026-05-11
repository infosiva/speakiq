export interface SkillNode {
  id: string
  title: string
  icon: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  unlocksAfter: string[] // node ids required before this unlocks
  xpReward: number
}

export const SKILL_TREE: SkillNode[] = [
  { id: 'greetings',  title: 'Greetings',       icon: '👋', level: 'Beginner',     unlocksAfter: [],                  xpReward: 20 },
  { id: 'numbers',    title: 'Numbers',          icon: '🔢', level: 'Beginner',     unlocksAfter: ['greetings'],       xpReward: 20 },
  { id: 'food',       title: 'Food & Drinks',    icon: '🍜', level: 'Beginner',     unlocksAfter: ['greetings'],       xpReward: 25 },
  { id: 'family',     title: 'Family',           icon: '👨‍👩‍👧', level: 'Beginner',  unlocksAfter: ['numbers'],         xpReward: 25 },
  { id: 'travel',     title: 'Travel',           icon: '✈️', level: 'Intermediate', unlocksAfter: ['food', 'family'],  xpReward: 35 },
  { id: 'past-tense', title: 'Past Tense',       icon: '⏮️', level: 'Intermediate', unlocksAfter: ['family'],          xpReward: 40 },
  { id: 'shopping',   title: 'Shopping',         icon: '🛍️', level: 'Intermediate', unlocksAfter: ['travel'],          xpReward: 35 },
  { id: 'health',     title: 'Health',           icon: '🏥', level: 'Intermediate', unlocksAfter: ['past-tense'],      xpReward: 40 },
  { id: 'business',   title: 'Business',         icon: '💼', level: 'Advanced',     unlocksAfter: ['shopping', 'health'], xpReward: 60 },
  { id: 'idioms',     title: 'Idioms',           icon: '🗣️', level: 'Advanced',     unlocksAfter: ['business'],        xpReward: 70 },
  { id: 'debate',     title: 'Debate & Opinion', icon: '⚖️', level: 'Advanced',     unlocksAfter: ['idioms'],          xpReward: 80 },
]

const PROGRESS_KEY = 'speakfast-skill-progress'

export function getCompletedNodes(): string[] {
  if (typeof window === 'undefined') return []
  try { return JSON.parse(localStorage.getItem(PROGRESS_KEY) ?? '[]') } catch { return [] }
}

export function markNodeComplete(id: string) {
  const done = getCompletedNodes()
  if (!done.includes(id)) {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify([...done, id]))
  }
}

export function isNodeUnlocked(node: SkillNode, completed: string[]): boolean {
  return node.unlocksAfter.every(dep => completed.includes(dep))
}
