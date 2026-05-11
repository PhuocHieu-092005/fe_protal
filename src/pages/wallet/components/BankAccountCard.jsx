import React from "react";
import { BadgeCheck, Landmark, Trash2 } from "lucide-react";

export default function BankAccountCard({ account, deleting, onDelete }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-sm">
            <Landmark size={20} />
          </div>
          <div>
            <h3 className="font-bold text-slate-950">{account.bankName}</h3>
            <p className="mt-1 text-sm font-semibold text-slate-600">
              {account.accountNumber}
            </p>
            {account.accountHolder && (
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-400">
                {account.accountHolder}
              </p>
            )}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {account.isDefault && (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
              <BadgeCheck size={14} />
              Mặc định
            </span>
          )}

          <button
            type="button"
            onClick={() => onDelete(account.id)}
            disabled={deleting}
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-rose-100 bg-white text-rose-500 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-60"
            title="Xóa tài khoản"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </article>
  );
}
