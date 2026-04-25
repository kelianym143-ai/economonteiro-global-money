import { cn } from "@/lib/utils";

export function AracyLogo({ size = 40, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
    >
      <defs>
        <linearGradient id="aracyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6d28d9" />
          <stop offset="50%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
        <linearGradient id="aracyAccent" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>

      {/* Background circle */}
      <circle cx="50" cy="50" r="45" fill="url(#aracyGradient)" />

      {/* Chat bubble shape */}
      <path
        d="M25 35 Q25 25 35 25 L65 25 Q75 25 75 35 L75 55 Q75 65 65 65 L55 65 L50 75 L45 65 L35 65 Q25 65 25 55 Z"
        fill="white"
        opacity="0.9"
      />

      {/* AI brain/sparkle */}
      <g transform="translate(40, 35)">
        <circle cx="5" cy="5" r="2" fill="url(#aracyAccent)" />
        <circle cx="15" cy="5" r="1.5" fill="url(#aracyAccent)" opacity="0.8" />
        <circle cx="10" cy="15" r="1.5" fill="url(#aracyAccent)" opacity="0.6" />
        <path d="M5 5 L8 2 M5 5 L2 8 M15 5 L12 8 M15 5 L18 2 M10 15 L8 18 M10 15 L12 18" stroke="url(#aracyAccent)" strokeWidth="0.5" opacity="0.7" />
      </g>

      {/* Letter A stylized */}
      <text x="50" y="55" textAnchor="middle" fontSize="16" fontWeight="bold" fill="url(#aracyGradient)" fontFamily="Arial, sans-serif">
        A
      </text>
    </svg>
  );
}