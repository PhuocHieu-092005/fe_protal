import React from "react";
import { Star, MessageSquare, BookOpen, UserCheck } from "lucide-react";

const TeacherEvaluations = () => {
  // DỮ LIỆU MẪU (MOCK DATA)
  const mockEvaluations = [
    {
      id: 1,
      project_title: "Hệ thống quản lý CV và Tuyển dụng",
      course_name: "Đồ án chuyên ngành",
      teacher_name: "ThS. Nguyễn Văn A",
      score: 9.5,
      suggestions:
        "Giao diện hiện đại, xử lý logic tốt. Cần tối ưu thêm phần bảo mật JWT.",
      created_at: "2024-03-20",
    },
    {
      id: 2,
      project_title: "Website bán hàng điện tử",
      course_name: "Lập trình Web nâng cao",
      teacher_name: "TS. Trần Thị B",
      score: 8.0,
      suggestions:
        "Chức năng giỏ hàng chạy mượt. Nên thêm phần thanh toán online.",
      created_at: "2024-01-15",
    },
  ];

  return (
    <section className="w-3/4 bg-white rounded-lg shadow-sm p-8 border border-gray-100 animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
          <Star className="text-yellow-500 fill-yellow-500" size={28} />
          Đánh giá từ giảng viên
        </h2>
        <div className="text-sm text-gray-500 bg-gray-50 px-4 py-2 rounded-full border">
          Tổng số đánh giá:{" "}
          <span className="font-bold text-blue-600">
            {mockEvaluations.length}
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full border-separate border-spacing-y-3">
          <thead>
            <tr className="text-gray-500 uppercase text-xs tracking-wider">
              <th className="pb-4 pl-4">Đồ án / Môn học</th>
              <th className="pb-4">Giảng viên</th>
              <th className="pb-4">Điểm số</th>
              <th className="pb-4 pr-4">Nhận xét & Gợi ý</th>
            </tr>
          </thead>
          <tbody>
            {mockEvaluations.map((item) => (
              <tr
                key={item.id}
                className="bg-white hover:bg-blue-50/50 transition-all group border shadow-sm"
              >
                <td className="p-4 rounded-l-xl border-y border-l">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 text-blue-600 rounded-xl group-hover:scale-110 transition-transform">
                      <BookOpen size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">
                        {item.project_title}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {item.course_name}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="p-4 border-y">
                  <div className="flex items-center gap-2 text-gray-700">
                    <UserCheck size={16} className="text-green-500" />
                    <span className="font-medium">{item.teacher_name}</span>
                  </div>
                </td>
                <td className="p-4 border-y">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white font-black text-lg shadow-md border-4 border-blue-100">
                    {item.score}
                  </div>
                </td>
                <td className="p-4 rounded-r-xl border-y border-r max-w-xs">
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                      <MessageSquare
                        size={16}
                        className="text-gray-400 flex-shrink-0 mt-1"
                      />
                      <p className="text-sm text-gray-600 italic leading-relaxed">
                        "{item.suggestions}"
                      </p>
                    </div>
                    <p className="text-[10px] text-gray-400 text-right">
                      Ngày chấm:{" "}
                      {new Date(item.created_at).toLocaleDateString("vi-VN")}
                    </p>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default TeacherEvaluations;
