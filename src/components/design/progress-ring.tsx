'use client';
interface ProgressRingProps { progress: number; size?: number; strokeWidth?: number; color?: string; label?: string; className?: string; }
export function ProgressRing({ progress, size = 80, strokeWidth = 6, color = '#22c55e', label, className = '' }: ProgressRingProps) {
  const r = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (progress / 100) * circumference;
  return (
    <div className={['flex flex-col items-center gap-1', className].join(' ')}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="currentColor" strokeWidth={strokeWidth} className="text-white/10" />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} style={{transition:'stroke-dashoffset 0.5s ease'}} />
      </svg>
      {label && <span className="text-xs text-gray-400">{label}</span>}
    </div>
  );
}
