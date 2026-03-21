import CvCard from "./CvCard";
import { useState } from "react";
import Pagination from "../../../components/common/Pagination";
export default function CvGridView() {
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
      id: 5,
      image:
        "https://assets.prebuiltui.com/images/components/feature-sections/ai-avatar-image1.png",
      title: "Trần Thị B - Backend Developer",
      description:
        "Chuyên Laravel, MySQL, xây dựng RESTful API. Có kinh nghiệm deploy server.",
    },
    {
      id: 5,
      image:
        "https://assets.prebuiltui.com/images/components/feature-sections/ai-avatar-image1.png",
      title: "Lê Văn C - Fullstack Developer",
      description:
        "Sử dụng NodeJS, React, MongoDB. Có thể phát triển full hệ thống từ frontend đến backend.",
    },
    {
      id: 6,
      image:
        "https://assets.prebuiltui.com/images/components/feature-sections/ai-avatar-image1.png",
      title: "Phạm Thị D - UI/UX Designer",
      description:
        "Thiết kế giao diện với Figma, Adobe XD. Có kinh nghiệm xây dựng design system.",
    },
    {
      id: 7,
      image:
        "https://assets.prebuiltui.com/images/components/feature-sections/ai-avatar-image1.png",
      title: "Phạm Thị D - UI/UX Designer",
      description:
        "Thiết kế giao diện với Figma, Adobe XD. Có kinh nghiệm xây dựng design system.",
    },
    {
      id: 8,
      image:
        "https://assets.prebuiltui.com/images/components/feature-sections/ai-avatar-image1.png",
      title: "Trần Thị B - Backend Developer",
      position: "Software Developer",
      description:
        "Chuyên Laravel, MySQL, xây dựng RESTful API. Có kinh nghiệm deploy server.",
    },
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 8;
  // Tính toán index
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = cards.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(cards.length / cardsPerPage);
  return (
    <div className="w-3/4 flex flex-col min-h-[700px]">
      {/* Grid hiển thị card */}
      <section className="grid grid-cols-4 gap-6 flex-1">
        {currentCards.map((card, index) => (
          <CvCard key={index} card={card} />
        ))}
      </section>

      {/* Pagination luôn nằm dưới cùng và giữa */}
      <div className="flex justify-center mt-8">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}
