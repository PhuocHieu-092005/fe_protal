import CvCard from "./CvCard";
import Pagination from "../../../components/common/Pagination"; // Component của bạn

export default function CvGridView({
  cards,
  loading,
  currentPage,
  totalPages,
  setPage,
}) {
  // Hàm xử lý đổi trang từ UI báo về
  const handlePageChange = (newPageUI) => {
    // UI thường bắt đầu từ 1, Backend bắt đầu từ 0
    // Nên khi UI gọi trang số mới, ta trừ đi 1 để set vào state gọi API
    setPage(newPageUI - 1);
  };

  return (
    <div className="flex-1 flex flex-col min-h-[700px]">
      {/* Khung hiển thị Card */}
      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-gray-500 font-medium animate-pulse">
            Đang tải danh sách hồ sơ...
          </div>
        </div>
      ) : cards.length > 0 ? (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 flex-1 place-content-start">
          {cards.map((card) => (
            <CvCard key={card.id} card={card} />
          ))}
        </section>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-gray-500 font-medium bg-white p-8 rounded-xl shadow-sm border">
            Không tìm thấy hồ sơ nào phù hợp với bộ lọc hiện tại.
          </div>
        </div>
      )}

      {/* Pagination - Chỉ hiển thị khi có nhiều hơn 1 trang */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10 mb-4">
          <Pagination
            currentPage={currentPage + 1} // Truyền UI page (bắt đầu từ 1)
            totalPages={totalPages}
            setCurrentPage={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}
