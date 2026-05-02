import React, { useEffect, useMemo, useState } from "react";
import { BookOpen, MessageSquare, Star, UserCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import projectService from "../../../services/projectService";

function normalizeEvaluationsResponse(response) {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.data)) return response.data;
  if (Array.isArray(response?.content)) return response.content;
  if (Array.isArray(response?.data?.content)) return response.data.content;
  return [];
}

function formatDate(dateString) {
  if (!dateString) return "Chưa rõ thời gian";

  const parsedDate = new Date(dateString);
  if (Number.isNaN(parsedDate.getTime())) return "Chưa rõ thời gian";

  return parsedDate.toLocaleDateString("vi-VN");
}

const TeacherEvaluations = () => {
  const navigate = useNavigate();
  const [evaluations, setEvaluations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    const fetchTeacherEvaluations = async () => {
      try {
        setLoading(true);
        setErrorText("");

        const response = await projectService.getMyProjectEvaluations();
        const normalizedData = normalizeEvaluationsResponse(response);

        setEvaluations(normalizedData);
      } catch (error) {
        console.error("Lỗi lấy đánh giá giảng viên của sinh viên:", error);
        setEvaluations([]);
        setErrorText("Không thể tải danh sách đánh giá của giảng viên.");
      } finally {
        setLoading(false);
      }
    };

    fetchTeacherEvaluations();
  }, []);

  const mappedEvaluations = useMemo(
    () =>
      evaluations.map((item) => ({
        id: item.id,
        projectId: item.project_id || item.projectId || null,
        projectTitle: item.project_title || item.projectTitle || "Chưa có tên đồ án",
        courseName: item.course_name || item.courseName || "Chưa có tên môn học",
        teacherName: item.teacher_name || item.teacherName || "Giảng viên",
        suggestions:
          item.suggestions || item.comment || "Chưa có nhận xét từ giảng viên.",
        createdAt: item.created_at || item.createdAt || null,
      })),
    [evaluations],
  );

  return (
    <section className="w-3/4 animate-in rounded-lg border border-gray-100 bg-white p-8 shadow-sm fade-in duration-500">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="flex items-center gap-3 text-2xl font-bold text-gray-800">
          <Star className="fill-yellow-500 text-yellow-500" size={28} />
          Đánh giá từ giảng viên
        </h2>
        <div className="rounded-full border bg-gray-50 px-4 py-2 text-sm text-gray-500">
          Tổng số đánh giá:{" "}
          <span className="font-bold text-blue-600">{mappedEvaluations.length}</span>
        </div>
      </div>

      {loading ? (
        <div className="py-16 text-center text-gray-500">Đang tải đánh giá...</div>
      ) : errorText ? (
        <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-6 text-center text-red-500">
          {errorText}
        </div>
      ) : mappedEvaluations.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 px-4 py-16 text-center text-gray-500">
          Bạn chưa có đánh giá nào từ giảng viên.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border-separate border-spacing-y-3">
            <thead>
              <tr className="text-xs uppercase tracking-wider text-gray-500">
                <th className="pb-4 pl-4">Đồ án / Môn học</th>
                <th className="pb-4">Giảng viên</th>
                <th className="pb-4 pr-4">Nhận xét & Gợi ý</th>
              </tr>
            </thead>
            <tbody>
              {mappedEvaluations.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => {
                    if (!item.projectId) return;
                    navigate(`/project/${item.projectId}`);
                  }}
                  className={`group border bg-white shadow-sm transition-all ${
                    item.projectId
                      ? "cursor-pointer hover:bg-blue-50/50"
                      : "cursor-default"
                  }`}
                >
                  <td className="rounded-l-xl border-y border-l p-4">
                    <div className="flex items-center gap-4">
                      <div className="rounded-xl bg-blue-100 p-3 text-blue-600 transition-transform group-hover:scale-110">
                        <BookOpen size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-gray-800">{item.projectTitle}</p>
                        <p className="mt-1 text-xs text-gray-500">{item.courseName}</p>
                      </div>
                    </div>
                  </td>
                  <td className="border-y p-4">
                    <div className="flex items-center gap-2 text-gray-700">
                      <UserCheck size={16} className="text-green-500" />
                      <span className="font-medium">{item.teacherName}</span>
                    </div>
                  </td>
                  <td className="max-w-xs rounded-r-xl border-y border-r p-4">
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2">
                        <MessageSquare
                          size={16}
                          className="mt-1 flex-shrink-0 text-gray-400"
                        />
                        <p className="text-sm italic leading-relaxed text-gray-600">
                          "{item.suggestions}"
                        </p>
                      </div>
                      <p className="text-right text-[10px] text-gray-400">
                        Ngày chấm: {formatDate(item.createdAt)}
                      </p>
                      {item.projectId && (
                        <p className="text-right text-[11px] font-medium text-blue-600">
                          Bấm để xem chi tiết đồ án
                        </p>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default TeacherEvaluations;
