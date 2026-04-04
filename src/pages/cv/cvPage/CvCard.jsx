import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function CvCard({ card }) {
  const [hover, setHover] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const bounds = cardRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - bounds.left, y: e.clientY - bounds.top });
  };

  // --- Parse Data từ API ---
  const isForm = card.type === "FORM";

  let contentObj = card.content_json || card.contentJson;
  if (typeof contentObj === "string") {
    try {
      contentObj = JSON.parse(contentObj);
    } catch (e) {}
  }

  const displayImage =
    isForm && contentObj?.avatar
      ? contentObj.avatar
      : "https://assets.prebuiltui.com/images/components/feature-sections/ai-avatar-image1.png";

  const displayTitle =
    isForm && contentObj?.personalInfo?.fullName
      ? `${contentObj.personalInfo.fullName} - ${card.title}`
      : `Ứng viên #${card.student_id} - ${card.title}`;

  const displayPosition =
    isForm && contentObj?.personalInfo?.title
      ? contentObj.personalInfo.title
      : card.title;

  const displayDesc =
    isForm && contentObj?.objective
      ? contentObj.objective
      : "Hồ sơ ứng viên được đính kèm dưới dạng file PDF. Vui lòng bấm chi tiết để xem toàn bộ thông tin.";

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onMouseMove={handleMouseMove}
      className="relative w-full max-w-[260px] max-h-[380px] min-h-[360px] rounded-xl p-0.5 bg-white backdrop-blur-md text-gray-800 overflow-hidden shadow-sm hover:shadow-lg cursor-pointer transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
    >
      {/* Hiệu ứng Glow*/}
      {hover && (
        <div
          className="pointer-events-none absolute z-0 blur-xl bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 transition-opacity duration-300"
          style={{
            width: 220,
            height: 220,
            borderRadius: "50%",
            top: position.y - 110,
            left: position.x - 110,
            opacity: 0.25,
          }}
        />
      )}

      {/* Nhãn nhận biết PDF */}
      {card.type === "UPLOAD" && (
        <div className="absolute top-2 right-2 z-20 bg-rose-100 text-rose-600 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
              clipRule="evenodd"
            />
          </svg>
          PDF
        </div>
      )}

      <div className="relative z-10 bg-white p-4 h-full w-full rounded-[10px] flex flex-col items-center text-center">
        <div className="mb-4 flex justify-center mt-2">
          <img
            src={displayImage}
            alt="Avatar"
            className="w-20 h-20 rounded-full object-cover shadow-md ring-2 ring-indigo-50"
          />
        </div>

        <h3 className="text-[16px] font-bold text-slate-900 leading-tight mb-1 line-clamp-2">
          {displayTitle}
        </h3>
        <p className="text-[13px] font-semibold text-indigo-600 mb-3 line-clamp-1 px-1">
          {displayPosition}
        </p>
        <p className="text-[13px] text-slate-600 leading-relaxed mb-4 px-1 line-clamp-3">
          {displayDesc}
        </p>

        <div className="mt-auto w-full flex justify-end">
          <Link
            to={`/cv/${card.id}`}
            className="inline-flex items-center gap-1 text-sm font-semibold text-slate-800 hover:text-indigo-600 transition-colors"
          >
            Chi tiết
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
          </Link>
        </div>
      </div>
    </div>
  );
}
