import React, { useEffect, useState } from "react";
import { Send } from "lucide-react";

const formatCurrency = (value) =>
  `${new Intl.NumberFormat("vi-VN").format(value || 0)} đ`;

const initialForm = {
  amount: "",
  bankAccountId: "",
};

export default function WithdrawalForm({
  availableBalance,
  bankAccounts,
  onSubmit,
  submitting,
}) {
  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    if (!formData.bankAccountId && bankAccounts.length > 0) {
      setFormData((current) => ({
        ...current,
        bankAccountId: String(bankAccounts[0].id),
      }));
    }
  }, [bankAccounts, formData.bankAccountId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData, () =>
      setFormData({
        amount: "",
        bankAccountId: bankAccounts[0]?.id ? String(bankAccounts[0].id) : "",
      }),
    );
  };

  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-950">
            Tạo yêu cầu rút tiền
          </h2>
          <p className="mt-1 text-sm font-medium text-slate-500">
            Số tiền tối đa có thể rút: {formatCurrency(availableBalance)}
          </p>
        </div>
        <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-700">
          Chờ admin duyệt
        </span>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <label className="block">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Số tiền muốn rút
            </span>
            <input
              name="amount"
              type="number"
              min="1000"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Nhập số tiền"
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium outline-none transition focus:border-blue-500"
            />
          </label>

          <label className="block">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Tài khoản nhận tiền
            </span>
            <select
              name="bankAccountId"
              value={formData.bankAccountId}
              onChange={handleChange}
              disabled={bankAccounts.length === 0}
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium outline-none transition focus:border-blue-500 disabled:bg-slate-100 disabled:text-slate-400"
            >
              {bankAccounts.length === 0 ? (
                <option value="">Chưa có tài khoản ngân hàng</option>
              ) : (
                bankAccounts.map((account) => (
                  <option key={account.id} value={account.id}>
                    {account.bankName} - {account.accountNumber}
                  </option>
                ))
              )}
            </select>
          </label>
        </div>

        <button
          type="submit"
          disabled={submitting || bankAccounts.length === 0}
          className="mt-5 inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-emerald-300"
        >
          <Send size={17} />
          {submitting ? "Đang gửi..." : "Gửi yêu cầu rút tiền"}
        </button>
      </form>
    </section>
  );
}
