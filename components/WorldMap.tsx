"use client";

import { useState } from "react";

interface MapPin {
  id: string;
  cx: string;
  cy: string;
  label: string;
  sub: string;
  delay: string;
  size: "sm" | "md" | "lg";
}

const PINS: MapPin[] = [
  { id: "nigeria", cx: "49%", cy: "52%", label: "Lagos", sub: "Afrobeat", delay: "0s", size: "lg" },
  { id: "russia", cx: "63%", cy: "22%", label: "Moscow", sub: "Soviet Symphonies", delay: "0.3s", size: "md" },
  { id: "korea", cx: "79%", cy: "30%", label: "Seoul", sub: "Psychedelic Rock", delay: "0.6s", size: "md" },
  { id: "brazil", cx: "30%", cy: "62%", label: "Rio", sub: "Bossa Nova", delay: "0.9s", size: "lg" },
  { id: "cuba", cx: "22%", cy: "40%", label: "Havana", sub: "Son Cubano", delay: "0.4s", size: "sm" },
  { id: "mali", cx: "46%", cy: "44%", label: "Bamako", sub: "Desert Blues", delay: "0.7s", size: "sm" },
  { id: "iran", cx: "62%", cy: "35%", label: "Tehran", sub: "Persian Classical", delay: "1s", size: "sm" },
  { id: "india", cx: "68%", cy: "41%", label: "Mumbai", sub: "Hindustani", delay: "0.2s", size: "lg" },
  { id: "us", cx: "16%", cy: "31%", label: "New Orleans", sub: "Jazz Roots", delay: "0.5s", size: "lg" },
  { id: "jamaica", cx: "22%", cy: "44%", label: "Kingston", sub: "Reggae", delay: "0.8s", size: "md" },
  { id: "argentina", cx: "28%", cy: "72%", label: "Buenos Aires", sub: "Tango", delay: "1.1s", size: "md" },
  { id: "portugal", cx: "43%", cy: "28%", label: "Lisbon", sub: "Fado", delay: "1.2s", size: "sm" },
  { id: "japan", cx: "81%", cy: "33%", label: "Tokyo", sub: "City Pop", delay: "0.15s", size: "md" },
  { id: "egypt", cx: "56%", cy: "36%", label: "Cairo", sub: "Maqam", delay: "0.9s", size: "sm" },
  { id: "colombia", cx: "25%", cy: "55%", label: "Cartagena", sub: "Cumbia", delay: "0.45s", size: "sm" },
];

const SIZE_MAP = {
  sm: { dot: 5, ring: 14 },
  md: { dot: 7, ring: 20 },
  lg: { dot: 9, ring: 26 },
};

export default function WorldMap() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className="py-20 px-4 md:px-10">
      {/* Section header */}
      <div className="max-w-6xl mx-auto mb-12 text-center">
        <p className="font-sans text-xs font-medium tracking-[0.25em] uppercase text-gold mb-3">
          Music is everywhere
        </p>
        <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal">
          A world of sound
        </h2>
        <p className="mt-3 font-sans text-sm text-charcoal-light max-w-md mx-auto leading-relaxed">
          Every pin is a tradition, a movement, a story waiting to be explored.
        </p>
      </div>

      {/* Map container */}
      <div className="max-w-5xl mx-auto relative">
        <div className="rounded-2xl overflow-hidden border border-charcoal/8 shadow-[0_8px_48px_rgba(44,44,44,0.08)] bg-white/30 backdrop-blur-sm">
          <div className="relative w-full" style={{ paddingBottom: "56%" }}>
            {/* SVG World map paths — simplified continents */}
            <svg
              viewBox="0 0 1000 560"
              className="absolute inset-0 w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <radialGradient id="mapbg" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#EDE6D6" />
                  <stop offset="100%" stopColor="#E8DFD0" />
                </radialGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="softglow">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Ocean background */}
              <rect width="1000" height="560" fill="url(#mapbg)" />
              <rect
                width="1000"
                height="560"
                fill="rgba(61,53,128,0.03)"
              />

              {/* --- Continents (simplified paths) --- */}

              {/* North America */}
              <path
                d="M 80 60 L 100 55 L 160 50 L 230 60 L 260 80 L 270 110 L 265 140 L 250 170 L 240 200 L 220 230 L 200 260 L 185 280 L 170 300 L 160 320 L 155 350 L 145 360 L 130 355 L 120 340 L 110 310 L 100 290 L 90 270 L 75 250 L 65 230 L 60 210 L 55 190 L 50 165 L 45 140 L 48 115 L 55 90 Z"
                fill="rgba(140,143,168,0.18)"
                stroke="rgba(140,143,168,0.4)"
                strokeWidth="0.8"
              />

              {/* Greenland */}
              <path
                d="M 200 20 L 240 15 L 270 25 L 265 50 L 245 58 L 215 55 L 200 40 Z"
                fill="rgba(140,143,168,0.12)"
                stroke="rgba(140,143,168,0.3)"
                strokeWidth="0.5"
              />

              {/* Central America bridge */}
              <path
                d="M 155 350 L 165 360 L 172 375 L 168 390 L 160 385 L 155 370 Z"
                fill="rgba(140,143,168,0.18)"
                stroke="rgba(140,143,168,0.4)"
                strokeWidth="0.8"
              />

              {/* South America */}
              <path
                d="M 175 395 L 210 385 L 250 390 L 285 400 L 310 420 L 320 450 L 315 480 L 305 510 L 285 530 L 260 540 L 235 535 L 210 520 L 195 500 L 180 475 L 170 450 L 165 425 L 168 410 Z"
                fill="rgba(140,143,168,0.18)"
                stroke="rgba(140,143,168,0.4)"
                strokeWidth="0.8"
              />

              {/* Europe */}
              <path
                d="M 420 60 L 450 55 L 490 50 L 520 55 L 540 70 L 545 90 L 530 110 L 510 120 L 495 130 L 480 145 L 470 160 L 455 165 L 440 155 L 425 140 L 410 125 L 405 110 L 408 90 Z"
                fill="rgba(140,143,168,0.18)"
                stroke="rgba(140,143,168,0.4)"
                strokeWidth="0.8"
              />

              {/* Scandinavia */}
              <path
                d="M 460 30 L 480 25 L 510 30 L 520 50 L 505 60 L 490 50 L 470 45 Z"
                fill="rgba(140,143,168,0.15)"
                stroke="rgba(140,143,168,0.3)"
                strokeWidth="0.5"
              />

              {/* Africa */}
              <path
                d="M 435 170 L 470 160 L 510 165 L 545 175 L 565 200 L 575 230 L 580 265 L 580 300 L 575 335 L 565 365 L 550 395 L 530 420 L 505 440 L 480 450 L 455 445 L 430 430 L 410 410 L 395 385 L 385 355 L 378 320 L 375 285 L 378 250 L 385 220 L 400 195 L 418 178 Z"
                fill="rgba(140,143,168,0.18)"
                stroke="rgba(140,143,168,0.4)"
                strokeWidth="0.8"
              />

              {/* Middle East */}
              <path
                d="M 540 150 L 580 140 L 620 145 L 640 165 L 635 185 L 615 195 L 590 190 L 565 185 L 545 175 Z"
                fill="rgba(140,143,168,0.15)"
                stroke="rgba(140,143,168,0.35)"
                strokeWidth="0.7"
              />

              {/* Russia / Central Asia */}
              <path
                d="M 520 40 L 580 30 L 660 25 L 740 30 L 800 40 L 840 55 L 855 75 L 850 95 L 820 105 L 780 110 L 740 115 L 700 120 L 660 125 L 620 130 L 580 135 L 545 140 L 525 125 L 515 105 L 510 85 L 515 65 Z"
                fill="rgba(140,143,168,0.18)"
                stroke="rgba(140,143,168,0.4)"
                strokeWidth="0.8"
              />

              {/* South Asia */}
              <path
                d="M 620 145 L 660 140 L 700 145 L 720 165 L 715 195 L 700 220 L 680 240 L 660 250 L 640 245 L 620 230 L 608 210 L 605 185 L 612 165 Z"
                fill="rgba(140,143,168,0.18)"
                stroke="rgba(140,143,168,0.4)"
                strokeWidth="0.8"
              />

              {/* Southeast Asia */}
              <path
                d="M 720 145 L 760 140 L 790 148 L 800 165 L 795 185 L 778 195 L 755 192 L 735 180 L 720 165 Z"
                fill="rgba(140,143,168,0.15)"
                stroke="rgba(140,143,168,0.35)"
                strokeWidth="0.7"
              />

              {/* East Asia */}
              <path
                d="M 740 90 L 790 85 L 840 90 L 870 105 L 875 130 L 860 155 L 830 170 L 800 175 L 770 168 L 745 155 L 730 135 L 728 115 Z"
                fill="rgba(140,143,168,0.18)"
                stroke="rgba(140,143,168,0.4)"
                strokeWidth="0.8"
              />

              {/* Japan */}
              <path
                d="M 860 100 L 875 95 L 890 102 L 892 118 L 880 128 L 865 122 L 858 110 Z"
                fill="rgba(140,143,168,0.18)"
                stroke="rgba(140,143,168,0.35)"
                strokeWidth="0.7"
              />

              {/* Australia */}
              <path
                d="M 780 360 L 830 350 L 880 355 L 920 370 L 940 395 L 935 425 L 915 450 L 885 465 L 845 468 L 808 460 L 778 440 L 760 415 L 758 390 Z"
                fill="rgba(140,143,168,0.15)"
                stroke="rgba(140,143,168,0.35)"
                strokeWidth="0.7"
              />

              {/* Subtle latitude/longitude grid */}
              {[1, 2, 3, 4].map((i) => (
                <line
                  key={`lat-${i}`}
                  x1="0"
                  y1={i * 112}
                  x2="1000"
                  y2={i * 112}
                  stroke="rgba(61,53,128,0.04)"
                  strokeWidth="0.5"
                  strokeDasharray="4 8"
                />
              ))}
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                <line
                  key={`lon-${i}`}
                  x1={i * 100}
                  y1="0"
                  x2={i * 100}
                  y2="560"
                  stroke="rgba(61,53,128,0.04)"
                  strokeWidth="0.5"
                  strokeDasharray="4 8"
                />
              ))}

              {/* Pins */}
              {PINS.map((pin) => {
                const { dot, ring } = SIZE_MAP[pin.size];
                const isHovered = hovered === pin.id;
                const cx = parseFloat(pin.cx) * 10;
                const cy = parseFloat(pin.cy) * 5.6;

                return (
                  <g
                    key={pin.id}
                    style={{ cursor: "pointer" }}
                    onMouseEnter={() => setHovered(pin.id)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    {/* Outer pulse ring */}
                    <circle
                      cx={cx}
                      cy={cy}
                      r={ring}
                      fill="none"
                      stroke={isHovered ? "rgba(201,168,76,0.5)" : "rgba(61,53,128,0.2)"}
                      strokeWidth="1"
                      style={{
                        animation: `pulse_glow ${2 + parseFloat(pin.delay)}s ease-in-out infinite`,
                        animationDelay: pin.delay,
                      }}
                    />
                    {/* Mid ring */}
                    <circle
                      cx={cx}
                      cy={cy}
                      r={ring * 0.6}
                      fill="none"
                      stroke={isHovered ? "rgba(201,168,76,0.4)" : "rgba(61,53,128,0.15)"}
                      strokeWidth="0.8"
                    />
                    {/* Core dot */}
                    <circle
                      cx={cx}
                      cy={cy}
                      r={dot}
                      fill={isHovered ? "#C9A84C" : "#3D3580"}
                      opacity={isHovered ? 1 : 0.75}
                      filter="url(#glow)"
                      style={{ transition: "all 0.2s ease" }}
                    />

                    {/* Tooltip */}
                    {isHovered && (
                      <g>
                        <rect
                          x={cx + dot + 6}
                          y={cy - 20}
                          width={pin.label.length * 7 + pin.sub.length * 5.5 + 16}
                          height={36}
                          rx={6}
                          fill="rgba(44,44,44,0.88)"
                        />
                        <text
                          x={cx + dot + 14}
                          y={cy - 4}
                          fill="#F5F0E8"
                          fontSize="11"
                          fontFamily="var(--font-jost), sans-serif"
                          fontWeight="500"
                        >
                          {pin.label}
                        </text>
                        <text
                          x={cx + dot + 14}
                          y={cy + 10}
                          fill="#C9A84C"
                          fontSize="9.5"
                          fontFamily="var(--font-jost), sans-serif"
                        >
                          {pin.sub}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Map caption */}
        <p className="mt-4 text-center font-sans text-xs text-mist tracking-wide">
          Hover a pin to preview a tradition · {PINS.length} origins mapped
        </p>
      </div>
    </section>
  );
}
