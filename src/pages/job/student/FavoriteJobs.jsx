import { useEffect, useState } from "react";
import jobService from "../../../services/jobService";
import { Link } from "react-router-dom";

export default function FavoriteJobs() {
  const [favorites, setFavorites] = useState([]);
  const fetchFavorites = async () => {
    try {
      const response = await jobService.getMyFavorites();
      setFavorites(response.data.data);
    } catch (err) {
      console.error("lỗi: ", err);
    }
  };
  const handleToggleFavorite = async (jobId) => {
    
    try {
      const response = await jobService.toggleFavorite(jobId, "ghi chú");
      if (response.data.data) {
        alert("đã lưu bài viết");
      } else {
        alert("đã xóa lưu bài viết");
      }
    } catch (err) {
      console.error("lỗi ", err);
    }
    fetchFavorites();
  };
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchFavorites();
  }, []);
  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Việc làm đã lưu</h1>
          <p className="text-slate-500 mt-2">
            Bạn đang lưu {favorites.length} công việc
          </p>
        </div>

        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {favorites.map((fav) => (
              <div
                key={fav.id}
                className="group relative bg-white border border-slate-200 rounded-3xl p-6 transition-all hover:shadow-md hover:border-slate-300"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-grow">
                    <Link
                      to={`/job/${fav.jobId}`}
                      className="text-lg font-bold text-slate-900 hover:text-blue-600 transition-colors"
                    >
                      {fav.jobTitle}
                    </Link>
                    <p className="text-slate-600 mt-1">{fav.companyName}</p>

                    {fav.note && (
                      <p className="mt-3 text-sm italic text-slate-400">
                        "Ghi chú: {fav.note}"
                      </p>
                    )}

                    <p className="text-[11px] text-slate-400 mt-4 uppercase tracking-wider font-semibold">
                      Đã lưu vào:{" "}
                      {new Date(fav.createdAt).toLocaleDateString("vi-VN")}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <Link
                      to={`/job/${fav.jobId}`}
                      className="px-6 py-2.5 bg-slate-950 text-white text-sm font-bold rounded-2xl hover:bg-slate-800 transition-all"
                    >
                      Xem chi tiết
                    </Link>
                    <button
                      onClick={() => handleToggleFavorite(fav.jobId)}
                      className="p-2.5 text-rose-500 hover:bg-rose-50 rounded-2xl transition-all"
                      title="Bỏ lưu"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
            <div className="text-slate-300 mb-4">
              <svg
                className="mx-auto h-16 w-16"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <p className="text-slate-500">Bạn chưa lưu công việc nào.</p>
            <Link
              to="/job"
              className="mt-4 inline-block font-bold text-slate-900 underline"
            >
              Khám phá việc làm ngay
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
