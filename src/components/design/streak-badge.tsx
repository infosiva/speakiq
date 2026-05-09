'use client';
interface StreakBadgeProps { count: number; label?: string; className?: string; }
export function StreakBadge({ count, label = 'day streak', className = '' }: StreakBadgeProps) {
  return (
    <div className={['flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 rounded-full px-4 py-2 w-fit', className].join(' ')}>
      <span className="text-2xl">🔥</span>
      <div>
        <span className="font-bold text-orange-400 text-xl">{count}</span>
        <span className="text-orange-300 text-sm ml-1">{label}</span>
      </div>
    </div>
  );
}
