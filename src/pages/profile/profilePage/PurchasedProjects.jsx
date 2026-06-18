import React, { useCallback, useEffect, useMemo, useState } from "react";
import { CalendarClock, ExternalLink, FolderOpen, RefreshCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import paymentService from "../../../services/paymentService";

const getPurchasedItems = (response) => {
  if (Array.isArray(response?.data)) return response.data;
  if (Array.isArray(response)) return response;
  return [];
};

const formatDate = (value) => {
  if (!value) return "Chưa rõ thời gian";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Chưa rõ thời gian";
  return date.toLocaleString("vi-VN");
};

export default function PurchasedProjects() {
  const navigate = useNavigate();
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const isLoggedIn = useMemo(
    () => Boolean(localStorage.getItem("accessToken") && localStorage.getItem("user")),
    [],
  );

  const fetchPurchases = useCallback(async () => {
    if (!isLoggedIn) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setErrorMessage("");
      const response = await paymentService.getMyPurchasedProjects();
      setPurchases(getPurchasedItems(response));
    } catch (error) {
      console.error("Lỗi lấy danh sách project đã mua:", error);
      setErrorMessage(
        error?.response?.data?.message ||
          "Không thể tải danh sách project đã mua. Vui lòng thử lại sau.",
      );
    } finally {
      setLoading(false);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    fetchPurchases();
  }, [fetchPurchases]);

  const openProjectDetail = (projectId) => {
    if (!projectId) return;
    navigate(`/project/${projectId}`);
  };

  if (!isLoggedIn) {
    return (
      <section className="flex-1 rounded-2xl border border-slate-100 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
          <FolderOpen size={26} />
        </div>
        <h2 className="text-2xl font-black text-slate-900">Project đã mua</h2>
        <p className="mt-2 text-sm text-slate-500">
          Vui lòng đăng nhập để xem lại danh sách order project đã mua.
        </p>
      </section>
    );
  }

  return (
    <section className="flex-1 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-6 flex flex-col gap-3 border-b border-slate-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900">Project đã mua</h2>
          <p className="mt-1 text-sm text-slate-500">
            Danh sách order source code bạn đã thanh toán thành công.
          </p>
        </div>

        <button
          type="button"
          onClick={fetchPurchases}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <RefreshCcw size={16} className={loading ? "animate-spin" : ""} />
          Tải lại
        </button>
      </div>

      {loading && (
        <div className="flex min-h-56 flex-col items-center justify-center gap-3 text-slate-400">
          <span className="loading loading-spinner loading-lg text-blue-600"></span>
          <p className="text-sm font-semibold">Đang tải danh sách project đã mua...</p>
        </div>
      )}

      {!loading && errorMessage && (
        <div className="rounded-2xl border border-red-100 bg-red-50 p-5 text-sm font-semibold text-red-600">
          {errorMessage}
        </div>
      )}

      {!loading && !errorMessage && purchases.length === 0 && (
        <div className="flex min-h-56 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 text-center">
          <FolderOpen size={34} className="mb-3 text-slate-300" />
          <p className="text-base font-black text-slate-700">Chưa có project đã mua</p>
          <p className="mt-1 text-sm text-slate-500">
            Khi thanh toán source code thành công, order sẽ xuất hiện tại đây.
          </p>
        </div>
      )}

      {!loading && !errorMessage && purchases.length > 0 && (
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          {purchases.map((purchase) => (
            <button
              key={purchase.id}
              type="button"
              onClick={() => openProjectDetail(purchase.projectId)}
              className="group flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="line-clamp-2 text-base font-black text-slate-900 group-hover:text-blue-600">
                    {purchase.projectTitle || "Project chưa có tiêu đề"}
                  </p>
                  <p className="mt-1 text-xs font-semibold text-slate-400">
                    Order #{purchase.id}
                  </p>
                </div>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <ExternalLink size={18} />
                </div>
              </div>

              <div className="mt-5 flex items-center gap-2 text-sm text-slate-500">
                <CalendarClock size={16} className="shrink-0 text-slate-400" />
                <span>{formatDate(purchase.createdAt)}</span>
              </div>

              <div className="mt-4 inline-flex w-fit items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600">
                Xem chi tiết project
              </div>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
