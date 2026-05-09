'use client';
interface XpBarProps { current: number; max: number; level?: number; className?: string; }
export function XpBar({ current, max, level, className = '' }: XpBarProps) {
  const pct = Math.min((current / max) * 100, 100);
  return (
    <div className={['w-full', className].join(' ')}>
      {level !== undefined && <div className="flex justify-between text-xs text-gray-400 mb-1"><span>Level {level}</span><span>{current}/{max} XP</span></div>}
      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full transition-all duration-500" style={{width:`${pct}%`}} />
      </div>
    </div>
  );
}
