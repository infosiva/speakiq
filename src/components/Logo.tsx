export function Logo({ color }: { color: string }) {
  return (
    <span className="flex items-center select-none gap-2">
      <span
        className="flex items-center justify-center w-7 h-7 rounded-lg shrink-0"
        style={{ background: `linear-gradient(135deg, ${color} 0%, #06b6d4 100%)` }}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3"  y="9" width="3" height="6"  rx="1.5" fill="white" opacity="0.55"/>
          <rect x="9"  y="5" width="3" height="14" rx="1.5" fill="white"/>
          <rect x="15" y="2" width="3" height="20" rx="1.5" fill="white" opacity="0.85"/>
        </svg>
      </span>
      <span className="flex items-center">
        <span className="font-black text-white text-[17px] tracking-[-0.03em] leading-none">Speak</span>
        <span
          className="font-black text-[17px] tracking-[-0.03em] leading-none"
          style={{
            background: `linear-gradient(135deg, ${color} 0%, #06b6d4 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >IQ</span>
      </span>
    </span>
  )
}
