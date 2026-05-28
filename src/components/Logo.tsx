export function Logo({ size = 36, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6d28d9" />
          <stop offset="50%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
        <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>

      {/* Background circle */}
      <circle cx="50" cy="50" r="45" fill="url(#logoGradient)" />

      {/* Mountain/Tree silhouette representing "Monteiro" */}
      <path
        d="M25 70 L35 50 L40 55 L45 45 L50 50 L55 40 L60 45 L65 35 L70 40 L75 30 L80 35 L85 25 L90 30 L95 20 L100 25 L100 80 L0 80 L0 75 Z"
        fill="white"
        opacity="0.9"
      />

      {/* Dollar sign in the mountain */}
      <g transform="translate(40, 35)">
        <path
          d="M5 8 L5 12 L8 12 L8 15 L12 15 L12 12 L15 12 L15 8 L12 8 L12 5 L8 5 L8 8 Z"
          fill="url(#accentGradient)"
        />
        <rect x="7" y="3" width="6" height="2" fill="url(#accentGradient)" />
        <rect x="7" y="15" width="6" height="2" fill="url(#accentGradient)" />
      </g>

      {/* Small sparkles */}
      <circle cx="20" cy="25" r="1.5" fill="url(#accentGradient)" opacity="0.8" />
      <circle cx="80" cy="20" r="1" fill="url(#accentGradient)" opacity="0.6" />
      <circle cx="15" cy="35" r="1" fill="url(#accentGradient)" opacity="0.7" />
    </svg>
  );
}