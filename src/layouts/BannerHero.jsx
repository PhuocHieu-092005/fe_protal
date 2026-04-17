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
    <section className="relative h-[670px] w-full overflow-hidden">
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

        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/75 via-slate-900/60 to-sky-950/55" />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center justify-center px-6">
        <div className="max-w-4xl text-center text-white">
          <h1 className="text-4xl font-black leading-tight md:text-6xl">
            Cổng thông tin việc làm
            <span className="block text-sky-300">và đồ án công nghệ</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-200 md:text-lg">
            Kết nối sinh viên, doanh nghiệp và những cơ hội thực chiến. Khám phá
            việc làm phù hợp hoặc xem các đồ án nổi bật ngay hôm nay.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              onClick={() => navigate("/job")}
              className="rounded-2xl bg-white px-7 py-3 text-sm font-bold text-slate-900 shadow-lg transition-all hover:-translate-y-0.5 hover:bg-slate-100"
            >
              Khám phá việc làm
            </button>

            <button
              onClick={() => navigate("/project")}
              className="rounded-2xl border border-white/40 bg-white/10 px-7 py-3 text-sm font-bold text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:bg-white/20"
            >
              Xem đồ án nổi bật
            </button>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/15 bg-white/10 px-5 py-4 backdrop-blur-md">
              <p className="text-2xl font-black text-white">120+</p>
              <p className="mt-1 text-sm text-slate-200">Việc làm đang tuyển</p>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/10 px-5 py-4 backdrop-blur-md">
              <p className="text-2xl font-black text-white">80+</p>
              <p className="mt-1 text-sm text-slate-200">Đồ án nổi bật</p>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/10 px-5 py-4 backdrop-blur-md">
              <p className="text-2xl font-black text-white">35+</p>
              <p className="mt-1 text-sm text-slate-200">
                Doanh nghiệp đồng hành
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
