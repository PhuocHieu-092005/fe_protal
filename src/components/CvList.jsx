import React from "react";
import CvCard from "./CvCard";

export default function CvList() {
  const cards = [
    {
      id: 1,
      image:
        "https://assets.prebuiltui.com/images/components/feature-sections/ai-avatar-image1.png",
      title: "Trần Thị B - Backend Developer",
      position: "Software Developer",
      description:
        "Chuyên Laravel, MySQL, xây dựng RESTful API. Có kinh nghiệm deploy server.",
    },
    {
      id: 2,
      image:
        "https://assets.prebuiltui.com/images/components/feature-sections/ai-avatar-image1.png",
      title: "Phạm Thị D - UI/UX Designer",
      position: "Product Designer",
      description:
        "Thiết kế hệ thống UI với Figma và xây dựng design system consistent.",
    },
    {
      id: 3,
      image:
        "https://assets.prebuiltui.com/images/components/feature-sections/ai-avatar-image1.png",
      title: "Lê Văn C - Fullstack Developer",
      position: "Fullstack Developer",
      description:
        "Node.js + React + MongoDB. Xây dựng app end-to-end với hiệu năng cao.",
    },
    {
      id: 4,
      image:
        "https://assets.prebuiltui.com/images/components/feature-sections/ai-avatar-image1.png",
      title: "Nguyễn Hoàng A - Frontend Developer",
      position: "Frontend Engineer",
      description:
        "Vue/React/Tailwind, tối ưu UI/UX và hệ thống component reusable.",
    },
    {
      id: 2,
      image:
        "https://assets.prebuiltui.com/images/components/feature-sections/ai-avatar-image1.png",
      title: "Trần Thị B - Backend Developer",
      description:
        "Chuyên Laravel, MySQL, xây dựng RESTful API. Có kinh nghiệm deploy server.",
    },
    {
      id: 3,
      image:
        "https://assets.prebuiltui.com/images/components/feature-sections/ai-avatar-image1.png",
      title: "Lê Văn C - Fullstack Developer",
      description:
        "Sử dụng NodeJS, React, MongoDB. Có thể phát triển full hệ thống từ frontend đến backend.",
    },
    {
      id: 4,
      image:
        "https://assets.prebuiltui.com/images/components/feature-sections/ai-avatar-image1.png",
      title: "Phạm Thị D - UI/UX Designer",
      description:
        "Thiết kế giao diện với Figma, Adobe XD. Có kinh nghiệm xây dựng design system.",
    },
    {
      id: 4,
      image:
        "https://assets.prebuiltui.com/images/components/feature-sections/ai-avatar-image1.png",
      title: "Phạm Thị D - UI/UX Designer",
      description:
        "Thiết kế giao diện với Figma, Adobe XD. Có kinh nghiệm xây dựng design system.",
    },
  ];

  return (
    <>
      <style>
        {`
          @import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
          *{
              font-family: "Poppins", sans-serif;
          }
        `}
      </style>

      <div className="bg-[#FAFAFA] py-16 px-4 flex flex-col items-center">
        <div className="text-center mb-15">
          <h1 className="text-[40px] font-medium text-slate-900 mb-4">
            Hồ Sơ Ứng Viên
          </h1>
          <p className="text-base text-slate-600 max-w-md leading-relaxed">
            Xem xét và lựa chọn những ứng viên phù hợp nhất với nhu cầu tuyển
            dụng của doanh nghiệp.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl w-full mt-6">
          {cards.map((card, index) => (
            <CvCard key={index} card={card} />
          ))}
        </div>
      </div>
    </>
  );
}
