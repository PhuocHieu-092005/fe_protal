import React, { useState } from "react";
import { Save } from "lucide-react";

const initialForm = {
  bankName: "",
  accountNumber: "",
};

export default function BankAccountForm({ onSubmit, submitting }) {
  const [formData, setFormData] = useState(initialForm);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData, () => setFormData(initialForm));
  };

  return (
    <section className="rounded-[2rem] border border-blue-100 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-slate-950">
        Thêm tài khoản ngân hàng
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
          <label className="block">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Tên ngân hàng
            </span>
            <input
              name="bankName"
              type="text"
              value={formData.bankName}
              onChange={handleChange}
              placeholder="VD: Vietcombank"
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium outline-none transition focus:border-blue-500"
            />
          </label>

          <label className="block">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Số tài khoản
            </span>
            <input
              name="accountNumber"
              type="text"
              value={formData.accountNumber}
              onChange={handleChange}
              placeholder="Nhập số tài khoản"
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium outline-none transition focus:border-blue-500"
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="mt-5 inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
        >
          <Save size={17} />
          {submitting ? "Đang lưu..." : "Lưu tài khoản"}
        </button>
      </form>
    </section>
  );
}
