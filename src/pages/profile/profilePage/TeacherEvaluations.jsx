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
        projectTitle:
          item.project_title || item.projectTitle || "Chưa có tên dự án",
        courseName:
          item.course_name || item.courseName || "Chưa có tên môn học",
        teacherName: item.teacher_name || item.teacherName || "Giảng viên",
        suggestions:
          item.suggestions || item.comment || "Chưa có nhận xét từ giảng viên.",
        createdAt: item.created_at || item.createdAt || null,
      })),
    [evaluations],
  );

  return (
    // RESPONSIVE UI: mobile full width, desktop md giữ w-3/4 như cũ
    <section className="w-full animate-in rounded-lg border border-gray-100 bg-white p-4 shadow-sm fade-in duration-500 sm:p-5 md:w-3/4 md:p-8">
      {/* RESPONSIVE UI: mobile header xếp dọc, desktop md giữ ngang */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h2 className="flex items-center gap-3 text-xl font-bold text-gray-800 sm:text-2xl">
          <Star
            className="fill-yellow-500 text-yellow-500 shrink-0"
            size={28}
          />
          Đánh giá từ giảng viên
        </h2>
        <div className="w-fit rounded-full border bg-gray-50 px-4 py-2 text-sm text-gray-500">
          Tổng số đánh giá:{" "}
          <span className="font-bold text-blue-600">
            {mappedEvaluations.length}
          </span>
        </div>
      </div>

      {loading ? (
        <div className="py-16 text-center text-gray-500">
          Đang tải đánh giá...
        </div>
      ) : errorText ? (
        <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-6 text-center text-red-500">
          {errorText}
        </div>
      ) : mappedEvaluations.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 px-4 py-16 text-center text-gray-500">
          Bạn chưa có đánh giá nào từ giảng viên.
        </div>
      ) : (
        <>
          {/* RESPONSIVE UI: mobile hiển thị dạng card, không dùng table để tránh tràn ngang */}
          <div className="space-y-4 md:hidden">
            {mappedEvaluations.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  if (!item.projectId) return;
                  navigate(`/project/${item.projectId}`);
                }}
                className={`rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all ${
                  item.projectId
                    ? "cursor-pointer active:scale-[0.99]"
                    : "cursor-default"
                }`}
              >
                <div className="mb-4 flex items-start gap-3">
                  <div className="shrink-0 rounded-xl bg-blue-100 p-3 text-blue-600">
                    <BookOpen size={20} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="break-words font-bold text-gray-800">
                      {item.projectTitle}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      {item.courseName}
                    </p>
                  </div>
                </div>

                <div className="mb-4 flex items-center gap-2 rounded-xl bg-gray-50 px-3 py-2 text-gray-700">
                  <UserCheck size={16} className="shrink-0 text-green-500" />
                  <span className="text-sm font-medium">
                    {item.teacherName}
                  </span>
                </div>

                <div className="rounded-xl border border-gray-100 bg-gray-50 p-3">
                  <div className="flex gap-2">
                    <MessageSquare
                      size={16}
                      className="mt-1 shrink-0 text-gray-400"
                    />
                    <p className="text-sm italic leading-relaxed text-gray-600">
                      "{item.suggestions}"
                    </p>
                  </div>

                  <p className="mt-3 text-right text-[10px] text-gray-400">
                    Ngày chấm: {formatDate(item.createdAt)}
                  </p>

                  {item.projectId && (
                    <p className="mt-1 text-right text-[11px] font-medium text-blue-600">
                      Bấm để xem chi tiết dự án
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* RESPONSIVE UI: desktop md trở lên giữ table như cũ */}
          <div className="hidden overflow-x-auto md:block">
            <table className="table w-full border-separate border-spacing-y-3">
              <thead>
                <tr className="text-xs uppercase tracking-wider text-gray-500">
                  <th className="pb-4 pl-4">dự án / Môn học</th>
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
                          <p className="font-bold text-gray-800">
                            {item.projectTitle}
                          </p>
                          <p className="mt-1 text-xs text-gray-500">
                            {item.courseName}
                          </p>
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
                            Bấm để xem chi tiết dự án
                          </p>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  );
};

export default TeacherEvaluations;
