import CvCard from "./CvCard";
import { useState } from "react";
import Pagination from "../../../components/common/Pagination";

export default function CvGridView() {
  const cards = [
    {
      id: 1,
      image:
        "https://assets.prebuiltui.com/images/components/feature-sections/ai-avatar-image1.png",
      title: "Trần Thị B - Lập trình viên Backend",
      position: "Software Developer",
      description:
        "Chuyên Laravel, MySQL, xây dựng RESTful API. Có kinh nghiệm deploy server.",
    },
    {
      id: 2,
      image:
        "https://assets.prebuiltui.com/images/components/feature-sections/ai-avatar-image1.png",
      title: "Phạm Thị D - Thiết kế UI/UX",
      position: "Product Designer",
      description:
        "Thiết kế hệ thống UI với Figma và xây dựng design system đồng bộ.",
    },
    {
      id: 3,
      image:
        "https://assets.prebuiltui.com/images/components/feature-sections/ai-avatar-image1.png",
      title: "Lê Văn C - Lập trình viên Fullstack",
      position: "Fullstack Developer",
      description:
        "Node.js + React + MongoDB. Xây dựng ứng dụng từ đầu đến cuối với hiệu năng cao.",
    },
    {
      id: 4,
      image:
        "https://assets.prebuiltui.com/images/components/feature-sections/ai-avatar-image1.png",
      title: "Nguyễn Hoàng A - Lập trình viên Frontend",
      position: "Frontend Engineer",
      description:
        "Vue/React/Tailwind, tối ưu UI/UX và hệ thống thành phần có thể tái sử dụng.",
    },
    {
      id: 5,
      image:
        "https://assets.prebuiltui.com/images/components/feature-sections/ai-avatar-image1.png",
      title: "Trần Thị B - Lập trình viên Backend",
      description:
        "Chuyên Laravel, MySQL, xây dựng RESTful API. Có kinh nghiệm triển khai máy chủ.",
    },
    {
      id: 6,
      image:
        "https://assets.prebuiltui.com/images/components/feature-sections/ai-avatar-image1.png",
      title: "Lê Văn C - Lập trình viên Fullstack",
      description:
        "Sử dụng NodeJS, React, MongoDB. Có thể phát triển toàn bộ hệ thống từ frontend đến backend.",
    },
    {
      id: 7,
      image:
        "https://assets.prebuiltui.com/images/components/feature-sections/ai-avatar-image1.png",
      title: "Phạm Thị D - Thiết kế UI/UX",
      description:
        "Thiết kế giao diện với Figma, Adobe XD. Có kinh nghiệm xây dựng hệ thống thiết kế.",
    },
    {
      id: 8,
      image:
        "https://assets.prebuiltui.com/images/components/feature-sections/ai-avatar-image1.png",
      title: "Nguyễn Văn E - Chuyên viên AI",
      description:
        "Nghiên cứu về Machine Learning và Computer Vision. Đã thực hiện nhiều đồ án về nhận diện hình ảnh.",
    },
    {
      id: 9,
      image:
        "https://assets.prebuiltui.com/images/components/feature-sections/ai-avatar-image1.png",
      title: "Trần Thị B - Lập trình viên Backend",
      position: "Software Developer",
      description:
        "Chuyên Laravel, MySQL, xây dựng RESTful API. Có kinh nghiệm triển khai hệ thống thực tế.",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 8;

  // Tính toán chỉ số (index)
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

      {/* Pagination luôn nằm dưới cùng và ở giữa */}
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
