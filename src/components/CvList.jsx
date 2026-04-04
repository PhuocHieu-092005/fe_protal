import React, { useState, useEffect } from "react";
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
        // Set thẳng mảng raw data từ API vào state
        setCards(response.data.content);
        console.log("Danh sách CV đã lấy về:", response.data.content);
      }
    } catch (error) {
      console.error("Lỗi khi lấy danh sách CV:", error);
    } finally {
      setLoading(false);
    }
  };

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

      <div className="bg-[#FAFAFA] py-16 px-4 flex flex-col items-center min-h-screen">
        <div className="text-center mb-15">
          <h1 className="text-[35px] font-bold text-slate-900 mb-4">
            Hồ sơ ứng viên
          </h1>
          <p className="text-gray-500 mt-2 max-w-2xl mx-auto italic">
            Xem xét và lựa chọn những ứng viên phù hợp nhất với nhu cầu tuyển
            dụng của doanh nghiệp.
          </p>
        </div>

        {loading ? (
          <div className="mt-10 text-lg font-medium text-gray-500">
            Đang tải danh sách CV...
          </div>
        ) : cards.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl w-full mt-6">
            {cards.map((cvData) => (
              // Truyền nguyên object cvData lấy từ API vào component
              <CvCard key={cvData.id} card={cvData} />
            ))}
          </div>
        ) : (
          <div className="mt-10 text-lg font-medium text-gray-500">
            Chưa có hồ sơ nào.
          </div>
        )}
      </div>
    </>
  );
}
