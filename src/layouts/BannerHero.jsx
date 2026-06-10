import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BannerHero() {
  const navigate = useNavigate();

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
  }, [backgrounds.length]);

  return (
    <section className="relative min-h-[620px] md:h-[670px] w-full overflow-hidden flex items-center">
      <div className="absolute inset-0">
        {backgrounds.map((bg, i) => (
          <img
            key={i}
            src={bg}
            alt={`banner-${i}`}
            className={`absolute h-full w-full object-cover transition-opacity duration-1000 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/85 via-slate-900/75 to-sky-950/70" />
      </div>

      {/* Thêm pt-24 để đẩy nội dung xuống dưới Header Fixed trên mobile */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-24 pb-12 md:pt-0 md:pb-0">
        <div className="max-w-4xl text-center text-white mx-auto">
          <div className="mb-6 inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-sky-300 backdrop-blur-md border border-white/10">
            Hệ thống kết nối thực chiến
          </div>

          {/* Sửa leading-[1.2] để dòng không bị dính nhau trên mobile */}
          <h1 className="text-3xl font-black leading-[1.2] md:text-6xl md:leading-tight">
            Cổng thông tin việc làm
            <span className="block text-sky-400 mt-2">và đồ án công nghệ</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-slate-300 md:text-lg">
            Kết nối sinh viên, doanh nghiệp và những cơ hội thực chiến. Khám phá
            việc làm phù hợp hoặc xem các đồ án nổi bật ngay hôm nay.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              onClick={() => navigate("/job")}
              className="w-full sm:w-auto rounded-xl bg-white px-8 py-3.5 text-sm font-bold text-slate-900 shadow-xl transition-all hover:-translate-y-1 active:scale-95"
            >
              Khám phá việc làm
            </button>

            <button
              onClick={() => navigate("/project")}
              className="w-full sm:w-auto rounded-xl border border-white/30 bg-white/10 px-8 py-3.5 text-sm font-bold text-white backdrop-blur-md transition-all hover:-translate-y-1 active:scale-95"
            >
              Xem đồ án nổi bật
            </button>
          </div>

          {/* Stats Cards */}
          <div className="mt-12 grid grid-cols-3 gap-2 md:gap-4">
            <div className="rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-md">
              <p className="text-xl font-black text-white md:text-3xl">120+</p>
              <p className="mt-1 text-[9px] font-bold uppercase text-slate-400 md:text-xs">
                Việc làm
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-md">
              <p className="text-xl font-black text-white md:text-3xl">80+</p>
              <p className="mt-1 text-[9px] font-bold uppercase text-slate-400 md:text-xs">
                Đồ án
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-md">
              <p className="text-xl font-black text-white md:text-3xl">35+</p>
              <p className="mt-1 text-[9px] font-bold uppercase text-slate-400 md:text-xs">
                Đối tác
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
