import logoSrc from "@/assets/logo.png";

export function Logo({ size = 36, className = "" }: { size?: number; className?: string }) {
  return (
    <img
      src={logoSrc}
      alt="EconoMonteiro logo"
      width={size}
      height={size}
      className={`object-contain ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
