import React from "react";
import { Check, Lock, Search, UserPlus, Users, X } from "lucide-react";

export default function ProjectMembersSection({
  mode = "create",
  leader,
  members = [],
  searchMssv = "",
  onSearchMssvChange,
  onSearchMember,
  searchLoading = false,
  searchResult,
  onConfirmMember,
  onRemoveMember,
}) {
  const isEditMode = mode === "edit";

  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-black">
            <Users size={18} className="text-amber-500" />
            {isEditMode ? "4. Thành viên đồ án" : "4. Thành viên thực hiện"}
          </h2>
          <p className="mt-1.5 max-w-md text-xs leading-6 text-slate-500">
            {isEditMode
              ? "Danh sách thành viên."
              : "Leader mặc định là người tạo đồ án. Thêm thành viên bằng MSSV rồi xác nhận trước khi gửi."}
          </p>
        </div>

        {isEditMode && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1.5 text-[11px] font-bold text-slate-600">
            <Lock size={12} />
            Chỉ xem
          </span>
        )}
      </div>

      <div className="space-y-4">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5">
          <div className="mb-2 flex items-center gap-2 text-xs font-bold text-slate-600">
            <Check size={14} className="text-emerald-500" />
            Leader
          </div>
          {leader ? (
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-black uppercase tracking-wide text-amber-700">
                Leader
              </span>
              <div>
                <p className="text-base font-bold text-zinc-900">
                  {leader.fullName || "Chưa có tên"}
                </p>
                <p className="text-sm text-slate-500">{leader.mssv || "---"}</p>
              </div>
            </div>
          ) : (
            <p className="text-xs font-medium text-slate-500">
              Chưa tải được thông tin người tạo đồ án.
            </p>
          )}
        </div>

        {!isEditMode && (
          <>
            <div>
              <label className="mb-2 ml-1 block text-xs font-bold text-zinc-500">
                Tìm sinh viên theo MSSV
              </label>
              <div className="flex flex-col gap-3 md:flex-row">
                <div className="relative flex-1">
                  <Search
                    size={16}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="text"
                    value={searchMssv}
                    onChange={(event) => onSearchMssvChange(event.target.value)}
                    placeholder="Nhập MSSV để tìm thành viên"
                    className="w-full rounded-xl border border-slate-100 bg-slate-50 px-10 py-3 text-sm font-semibold uppercase outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>

                <button
                  type="button"
                  onClick={onSearchMember}
                  disabled={searchLoading}
                  className="inline-flex min-w-[132px] items-center justify-center gap-2 rounded-xl bg-zinc-900 px-4 py-3 text-sm font-bold text-white transition-all hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Search size={16} />
                  {searchLoading ? "Đang tìm..." : "Tìm MSSV"}
                </button>
              </div>
            </div>

            {searchResult && (
              <div className="rounded-xl border border-blue-100 bg-blue-50/70 p-3.5">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                      <UserPlus size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-zinc-900">
                        {searchResult.fullName}
                      </p>
                      <p className="text-xs text-slate-500">
                        MSSV: {searchResult.mssv}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={onConfirmMember}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-bold text-white transition-all hover:bg-emerald-600"
                  >
                    <Check size={16} />
                    Xác nhận thêm
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        <div>
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-bold text-zinc-500">
              Danh sách thành viên xác nhận
            </p>
            <span className="text-xs font-semibold text-slate-500">
              {members.length} thành viên
            </span>
          </div>

          {members.length > 0 ? (
            <div className="space-y-2.5">
              {members.map((member) => (
                <div
                  key={member.mssv || member.id}
                  className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white px-3.5 py-3.5 md:flex-row md:items-center md:justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-base font-black text-slate-600">
                      {(member.fullName || "U").charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-zinc-900">
                        {member.fullName || "Chưa có tên"}
                      </p>
                      <p className="text-xs text-slate-500">
                        MSSV: {member.mssv || "---"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {member.isLeader && (
                      <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-black uppercase tracking-wide text-amber-700">
                        Leader
                      </span>
                    )}

                    {!isEditMode && !member.isLeader && (
                      <button
                        type="button"
                        onClick={() => onRemoveMember(member.mssv)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-rose-200 px-2.5 py-1.5 text-xs font-bold text-rose-500 transition-all hover:bg-rose-50"
                      >
                        <X size={14} />
                        Gỡ
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-5 text-xs font-medium text-slate-500">
              Chưa có thành viên nào.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
