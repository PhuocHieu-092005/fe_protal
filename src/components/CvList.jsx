import React, { useEffect, useState } from "react";
import CvCard from "./CvCard";
import cvService from "../services/cvService";

export default function CvList() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCvs();
  }, []);

  const fetchCvs = async () => {
    try {
      setLoading(true);
      const response = await cvService.getPublicCvs({ page: 0, size: 8 });

      if (response.code === 200 && response.data?.content) {
        setCards(response.data.content);
      }
    } catch (error) {
      console.error("Lỗi khi lấy danh sách CV:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex min-h-screen flex-col items-center bg-[#FAFAFA] px-3 py-12 md:px-4 md:py-16">
      <div className="mb-8 text-center md:mb-12">
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-slate-950 md:text-4xl">
          Hồ sơ ứng viên
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-500 md:text-base">
          Xem xét và lựa chọn những ứng viên phù hợp nhất với nhu cầu tuyển
          dụng của doanh nghiệp.
        </p>
      </div>

      {loading ? (
        <div className="mt-10 text-lg font-medium text-gray-500">
          Đang tải danh sách CV...
        </div>
      ) : cards.length > 0 ? (
        <div className="mt-6 grid w-full max-w-5xl grid-cols-2 gap-2 lg:grid-cols-4">
          {cards.map((cvData) => (
            <CvCard key={cvData.id} card={cvData} />
          ))}
        </div>
      ) : (
        <div className="mt-10 text-lg font-medium text-gray-500">
          Chưa có hồ sơ nào.
        </div>
      )}
    </section>
  );
}
