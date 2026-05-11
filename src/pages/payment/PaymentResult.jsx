import React, { useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircle2, Home, RefreshCcw, XCircle } from "lucide-react";

const RESULT_CONFIG = {
  success: {
    icon: CheckCircle2,
    title: "Thanh toán thành công",
    description:
      "Cảm ơn bạn đã mua source code. Hệ thống sẽ cập nhật quyền truy cập sau khi nhận xác nhận từ payOS.",
    tone: "emerald",
  },
  cancel: {
    icon: XCircle,
    title: "Thanh toán đã hủy",
    description: "Bạn đã hủy giao dịch. Đơn hàng chưa được thanh toán.",
    tone: "amber",
  },
  failed: {
    icon: XCircle,
    title: "Thanh toán thất bại",
    description: "Không thể hoàn tất giao dịch. Vui lòng thử lại sau.",
    tone: "rose",
  },
};

const toneClass = {
  emerald: {
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    text: "text-emerald-600",
    button: "bg-emerald-600 hover:bg-emerald-700",
  },
  amber: {
    bg: "bg-amber-50",
    border: "border-amber-200",
    text: "text-amber-600",
    button: "bg-amber-500 hover:bg-amber-600",
  },
  rose: {
    bg: "bg-rose-50",
    border: "border-rose-200",
    text: "text-rose-600",
    button: "bg-rose-600 hover:bg-rose-700",
  },
};

export default function PaymentResult({ type = "success" }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const config = RESULT_CONFIG[type] || RESULT_CONFIG.success;
  const styles = toneClass[config.tone];
  const Icon = config.icon;
  const orderCode = searchParams.get("orderCode");
  const projectId = searchParams.get("projectId");
  const message = searchParams.get("message");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [navigate]);

  return (
    <main className="min-h-screen bg-slate-50 px-6 pb-20 pt-32 text-left">
      <section className="mx-auto max-w-2xl rounded-[2rem] border border-slate-100 bg-white p-8 text-center shadow-sm md:p-12">
        <div
          className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full border ${styles.border} ${styles.bg}`}
        >
          <Icon size={42} className={styles.text} />
        </div>

        <h1 className="mt-7 text-3xl font-black text-slate-900 md:text-4xl">
          {config.title}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-600">
          {message || config.description}
        </p>

        {(orderCode || projectId) && (
          <div className="mt-7 rounded-2xl border border-slate-100 bg-slate-50 p-5 text-sm text-slate-600">
            {orderCode && (
              <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-3">
                <span>Mã đơn hàng</span>
                <span className="font-black text-slate-900">#{orderCode}</span>
              </div>
            )}
            {projectId && (
              <div className="flex items-center justify-between gap-4 pt-3">
                <span>Mã đồ án</span>
                <span className="font-black text-slate-900">#{projectId}</span>
              </div>
            )}
          </div>
        )}

        <p className="mt-6 text-sm font-semibold text-slate-400">
          Tự động điều hướng về trang chủ sau 5 giây.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            className={`inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm font-black text-white transition-all ${styles.button}`}
          >
            <Home size={17} />
            Về trang chủ
          </Link>

          {projectId && type !== "success" && (
            <Link
              to={`/project/${projectId}`}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 px-6 py-3 text-sm font-black text-slate-700 transition-all hover:border-slate-900 hover:text-slate-900"
            >
              <RefreshCcw size={17} />
              Thử lại
            </Link>
          )}
        </div>
      </section>
    </main>
  );
}
