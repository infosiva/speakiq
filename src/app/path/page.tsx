'use client'
import { useState, useEffect } from 'react'
import { SKILL_TREE, getCompletedNodes, isNodeUnlocked, type SkillNode } from '@/lib/gamification/skill-tree'

export default function PathPage() {
  const [completed, setCompleted] = useState<string[]>([])

  useEffect(() => { setCompleted(getCompletedNodes()) }, [])

  const grouped: Record<string, SkillNode[]> = {
    Beginner:     SKILL_TREE.filter(n => n.level === 'Beginner'),
    Intermediate: SKILL_TREE.filter(n => n.level === 'Intermediate'),
    Advanced:     SKILL_TREE.filter(n => n.level === 'Advanced'),
  }

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-1">Learning Path</h1>
        <p className="text-sm text-[var(--text-2)] mb-8">Complete lessons to unlock new skills and earn XP.</p>

        {(Object.entries(grouped) as [string, SkillNode[]][]).map(([level, nodes]) => (
          <div key={level} className="mb-10">
            <h2 className="text-sm font-semibold text-[var(--text-2)] uppercase tracking-widest mb-4">{level}</h2>
            <div className="flex flex-col gap-3">
              {nodes.map(node => {
                const done = completed.includes(node.id)
                const unlocked = isNodeUnlocked(node, completed)
                return (
                  <div
                    key={node.id}
                    className={[
                      'flex items-center gap-4 rounded-xl p-4 border transition-all',
                      done
                        ? 'bg-green-500/10 border-green-500/30'
                        : unlocked
                        ? 'glass-liquid border-white/10 cursor-pointer hover:border-white/20'
                        : 'bg-white/[0.02] border-white/5 opacity-40 cursor-not-allowed',
                    ].join(' ')}
                  >
                    <span className="text-3xl">{node.icon}</span>
                    <div className="flex-1">
                      <p className="font-semibold">{node.title}</p>
                      <p className="text-xs text-[var(--text-2)]">+{node.xpReward} XP</p>
                    </div>
                    {done && <span className="text-green-400 text-xl">✓</span>}
                    {!unlocked && !done && <span className="text-xl">🔒</span>}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
