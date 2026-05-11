import React from "react";
import { Clock3, FileText } from "lucide-react";

const formatCurrency = (value) =>
  `${new Intl.NumberFormat("vi-VN").format(value || 0)} đ`;

const statusMap = {
  PENDING: "Chờ duyệt",
  APPROVED: "Đã duyệt",
  REJECTED: "Từ chối",
};

const statusClass = {
  PENDING: "bg-amber-50 text-amber-700",
  APPROVED: "bg-emerald-50 text-emerald-700",
  REJECTED: "bg-rose-50 text-rose-700",
};

const formatDate = (value) => {
  if (!value) return "---";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString("vi-VN");
};

export default function WithdrawalHistory({ requests, loading }) {
  return (
    <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between gap-4 border-b border-slate-100 p-6">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-bold text-slate-950">
            <Clock3 size={20} className="text-blue-600" />
            Lịch sử yêu cầu rút tiền
          </h2>
          <p className="mt-1 text-sm font-medium text-slate-500">
            Theo dõi trạng thái xử lý từ admin.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="p-8 text-sm font-semibold text-slate-400">
          Đang tải lịch sử yêu cầu rút tiền...
        </div>
      ) : requests.length === 0 ? (
        <div className="p-8 text-sm font-semibold text-slate-400">
          Chưa có yêu cầu rút tiền nào.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] table-fixed text-left">
            <thead className="bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-400">
              <tr>
                <th className="w-[120px] whitespace-nowrap px-6 py-4">Mã yêu cầu</th>
                <th className="w-[130px] whitespace-nowrap px-6 py-4">Số tiền</th>
                <th className="w-[160px] whitespace-nowrap px-6 py-4">Ngân hàng</th>
                <th className="w-[160px] whitespace-nowrap px-6 py-4">Số tài khoản</th>
                <th className="w-[140px] whitespace-nowrap px-6 py-4">Ngày tạo</th>
                <th className="w-[130px] whitespace-nowrap px-6 py-4">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {requests.map((request) => (
                <tr key={request.id} className="transition hover:bg-slate-50">
                  <td className="whitespace-nowrap px-6 py-5">
                    <span className="inline-flex items-center gap-2 font-bold text-slate-900">
                      <FileText size={16} className="text-slate-400" />
                      #{request.id}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-5 font-bold text-slate-950">
                    {formatCurrency(request.amount)}
                  </td>
                  <td className="whitespace-nowrap px-6 py-5 font-medium text-slate-600">
                    {request.bankName || "---"}
                  </td>
                  <td className="whitespace-nowrap px-6 py-5 font-medium text-slate-600">
                    {request.accountNumber || "---"}
                  </td>
                  <td className="whitespace-nowrap px-6 py-5 font-medium text-slate-500">
                    {formatDate(request.requestDate || request.updatedAt)}
                  </td>
                  <td className="whitespace-nowrap px-6 py-5">
                    <span
                      className={`inline-flex whitespace-nowrap rounded-full px-3 py-1 text-xs font-bold ${
                        statusClass[request.status] || "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {statusMap[request.status] || request.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
