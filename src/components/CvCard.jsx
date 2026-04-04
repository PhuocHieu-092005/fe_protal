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

  // --- XỬ LÝ DỮ LIỆU TỪ RAW API ---
  const isForm = card.type === "FORM";

  //content_json đang là chuỗi string -> JSON.parse()
  let contentObj = card.content_json || card.contentJson;
  if (typeof contentObj === "string") {
    try {
      contentObj = JSON.parse(contentObj);
    } catch (e) {
      console.error("Lỗi parse JSON ở CV ID:", card.id);
    }
  }

  // Ảnh đại diện
  const displayImage =
    isForm && contentObj?.avatar //link cloudinary
      ? contentObj.avatar
      : "https://assets.prebuiltui.com/images/components/feature-sections/ai-avatar-image1.png"; // default avatar nếu không có

  //Tên + Vị trí (Title chính của thẻ)
  const displayTitle =
    isForm && contentObj?.personalInfo?.fullName
      ? `${contentObj.personalInfo.fullName} - ${card.title}`
      : `Ứng viên ${card.student_id} - ${card.title}`;

  // Vị trí chuyên môn (chữ màu tím)
  const displayPosition =
    isForm && contentObj?.personalInfo?.title
      ? contentObj.personalInfo.title //tiltle của cv form
      : card.title; // title của cv pdf

  //Đoạn mô tả
  const displayDesc =
    isForm && contentObj?.objective
      ? contentObj.objective //form
      : "Ứng viên sử dụng hồ sơ đính kèm định dạng PDF. Vui lòng xem chi tiết."; //pdf
  // ---------------------------------

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onMouseMove={handleMouseMove}
      className="relative w-full max-w-[260px] min-h-[360px] rounded-xl p-0.5 bg-white backdrop-blur-md text-gray-800 overflow-hidden shadow-lg cursor-pointer transition-transform hover:-translate-y-1"
    >
      {/* Hiệu ứng di chuột */}
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

      {/* Hiển thị nhãn PDF nếu type là UPLOAD */}
      {card.type === "UPLOAD" && (
        <div className="absolute top-2 right-2 z-20 bg-red-100 text-red-600 text-[10px] font-bold px-2 py-1 rounded-full shadow-sm flex items-center gap-1">
          <svg
            className="w-3 h-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
          </svg>
          PDF
        </div>
      )}

      <div className="relative z-10 bg-white p-4 h-full w-full rounded-[10px] flex flex-col items-center text-center">
        <div className="mb-3 flex justify-center mt-2">
          <img
            src={displayImage}
            alt={displayTitle}
            className="w-24 h-24 rounded-full object-cover shadow-md"
          />
        </div>

        <h3 className="text-[16px] font-bold text-slate-900 leading-tight mb-1 line-clamp-2">
          {displayTitle}
        </h3>

        <p className="text-sm font-semibold text-indigo-600 mb-2 line-clamp-1">
          {displayPosition}
        </p>

        <p className="text-sm text-slate-600 leading-relaxed mb-4 px-2 line-clamp-3">
          {displayDesc}
        </p>

        <div className="mt-auto w-full flex justify-end">
          <Link
            to={`/cv/${card.id}`}
            className="inline-flex items-center gap-1 text-sm font-semibold text-black hover:text-indigo-600 transition-colors"
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
