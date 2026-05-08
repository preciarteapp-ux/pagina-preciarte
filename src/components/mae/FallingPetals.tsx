import { useMemo } from "react";

interface Props {
  count?: number;
}

const FallingPetals = ({ count = 14 }: Props) => {
  const petals = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 8 + Math.random() * 8,
        size: 14 + Math.random() * 18,
        sway: 20 + Math.random() * 40,
        rotate: Math.random() * 360,
        hue: 330 + Math.random() * 25,
      })),
    [count]
  );

  return (
    <>
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        {petals.map((p, i) => (
          <span
            key={i}
            className="absolute -top-10 will-change-transform"
            style={{
              left: `${p.left}%`,
              width: p.size,
              height: p.size,
              animation: `petal-fall ${p.duration}s linear ${p.delay}s infinite, petal-sway ${p.duration / 2}s ease-in-out ${p.delay}s infinite alternate`,
              ['--sway' as any]: `${p.sway}px`,
              ['--rot' as any]: `${p.rotate}deg`,
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", filter: "drop-shadow(0 2px 4px rgba(212,175,55,0.25))" }}>
              <path
                d="M12 2C8 6 6 10 6 14c0 4 2.7 7 6 7s6-3 6-7c0-4-2-8-6-12z"
                fill={`hsl(${p.hue}, 75%, 78%)`}
                stroke={`hsl(${p.hue}, 70%, 60%)`}
                strokeWidth="0.5"
                opacity="0.85"
              />
            </svg>
          </span>
        ))}
      </div>
      <style>{`
        @keyframes petal-fall {
          0% { transform: translateY(-10vh) rotate(var(--rot)); }
          100% { transform: translateY(110vh) rotate(calc(var(--rot) + 540deg)); }
        }
        @keyframes petal-sway {
          0% { margin-left: 0; }
          100% { margin-left: var(--sway); }
        }
      `}</style>
    </>
  );
};

export default FallingPetals;
