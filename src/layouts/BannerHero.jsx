import React from "react";
import { useState, useEffect } from "react";
import Search from "../components/Search";
export default function BannerHero() {
  const backgrounds = [
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
    "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % backgrounds.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        {backgrounds.map((bg, i) => (
          <img
            key={i}
            src={bg}
            className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/65 via-slate-900/45 to-sky-900/45" />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:110px_110px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center tracking-wide">
          CỔNG THÔNG TIN VIỆC LÀM
        </h1>

        <p className="mb-8 max-w-2xl text-center text-base md:text-lg text-slate-200">
          Nền tảng đáng tin cậy để tìm kiếm nhân tài hàng đầu và cơ hội nghề
          nghiệp nhanh chóng.
        </p>

        <div className="w-full max-w-3xl px-2">
          <Search />
        </div>
      </div>
    </div>
  );
}
