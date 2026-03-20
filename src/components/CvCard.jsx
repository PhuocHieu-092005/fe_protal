import React, { useRef, useState } from "react";

export default function CvCard({ card }) {
  const [hover, setHover] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const bounds = cardRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - bounds.left, y: e.clientY - bounds.top });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onMouseMove={handleMouseMove}
      className="relative w-full max-w-[260px] min-h-[360px] rounded-xl p-0.5 bg-white backdrop-blur-md text-gray-800 overflow-hidden shadow-lg cursor-pointer"
    >
      {hover && (
        <div
          className="pointer-events-none absolute z-0 blur-xl bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 transition-opacity duration-300"
          style={{
            width: 220,
            height: 220,
            borderRadius: "50%",
            top: position.y - 110,
            left: position.x - 110,
            opacity: 0.35,
          }}
        />
      )}

      <div className="relative z-10 bg-white p-4 h-full w-full rounded-[10px] flex flex-col items-center text-center">
        <div className="mb-3 flex justify-center">
          <img
            src={card.image}
            alt={card.title}
            className="w-24 h-24 rounded-full object-cover shadow-md"
          />
        </div>
        <h3 className="text-xl font-bold text-slate-900 leading-tight mb-1">
          {card.title}
        </h3>
        <p className="text-sm font-semibold text-indigo-600 mb-2">
          {card.position || "Software Developer"}
        </p>
        <p className="text-sm text-slate-600 leading-relaxed mb-4 px-2 line-clamp-3">
          {card.description}
        </p>

        <div className="mt-auto w-full flex justify-end">
          <a
            href="#"
            className="inline-flex items-center gap-1 text-sm font-semibold text-black hover:text-slate-700"
          >
            Detail
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="M13 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
