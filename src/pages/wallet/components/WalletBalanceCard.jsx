import React from "react";
import { ArrowDownToLine, CreditCard, ShieldCheck } from "lucide-react";

const formatCurrency = (value) =>
  `${new Intl.NumberFormat("vi-VN").format(value || 0)} đ`;

export default function WalletBalanceCard({ wallet, loading }) {
  return (
    <section className="overflow-hidden rounded-[2rem] bg-slate-950 p-7 text-white shadow-lg">
      <div className="flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
          <CreditCard size={24} />
        </div>
        <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-200">
          Đang hoạt động
        </span>
      </div>

      <div className="mt-10">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
          Tổng tiền
        </p>
        <h2 className="mt-3 text-4xl font-bold tracking-normal">
          {loading ? "Đang tải..." : formatCurrency(wallet.totalBalance)}
        </h2>
      </div>

      <div className="mt-7 grid grid-cols-1 gap-3">
        <div className="rounded-2xl bg-white/8 p-4">
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
            <ArrowDownToLine size={15} />
            Tiền có thể rút
          </p>
          <p className="mt-2 text-2xl font-bold text-emerald-200">
            {loading ? "Đang tải..." : formatCurrency(wallet.availableBalance)}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 p-4">
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
            <ShieldCheck size={15} />
            Đang chờ duyệt
          </p>
          <p className="mt-2 text-xl font-bold text-amber-200">
            {loading ? "Đang tải..." : formatCurrency(wallet.pendingWithdraw)}
          </p>
        </div>
      </div>
    </section>
  );
}
