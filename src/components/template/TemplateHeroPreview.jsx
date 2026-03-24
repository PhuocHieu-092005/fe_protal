import React from "react";

const previewCards = [
  {
    id: 1,
    title: "CV Fresher IT",
    desc: "Phù hợp sinh viên mới ra trường, thực tập sinh, bố cục gọn gàng dễ đọc.",
    tag1: "FORM",
    tag2: "Fresher",
    bg: "from-slate-100 to-slate-200",
    tagClass: "bg-indigo-100 text-indigo-700",
    image:
      "https://gamek.mediacdn.vn/133514250583805952/2024/10/2/image-28-1024x576-1727854784516937481175-1727863651743-17278636519401646812118.png",
  },
  {
    id: 2,
    title: "CV Clean Professional",
    desc: "Bố cục hiện đại, phù hợp ứng tuyển fresher, junior hoặc full-time.",
    tag1: "FORM",
    tag2: "Professional",
    bg: "from-indigo-100 to-sky-100",
    tagClass: "bg-emerald-100 text-emerald-700",
    image:
      "https://gamek.mediacdn.vn/133514250583805952/2024/10/2/image-28-1024x576-1727854784516937481175-1727863651743-17278636519401646812118.png",
  },
];

const TemplateHeroPreview = () => {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {previewCards.map((item) => (
        <div
          key={item.id}
          className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          {/* ✅ SỬA Ở ĐÂY: hiển thị ảnh */}
          <img
            src={item.image}
            alt={item.title}
            className="mb-4 h-52 w-full rounded-2xl object-cover"
          />

          <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
          <p className="mt-2 text-sm text-slate-600">{item.desc}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
              {item.tag1}
            </span>
            <span className={`rounded-full px-3 py-1 text-xs ${item.tagClass}`}>
              {item.tag2}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TemplateHeroPreview;
