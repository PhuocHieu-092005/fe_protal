import React, { useEffect, useState } from "react";
import walletService from "../../services/walletService";
import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  History,
  CreditCard,
  DollarSign,
  Plus,
  ArrowRight,
} from "lucide-react";
import Swal from "sweetalert2";

export default function MyWallet() {
  const [wallet, setWallet] = useState({ balance: 0 });
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWalletData();
  }, []);

  const loadWalletData = async () => {
    try {
      const wRes = await walletService.getMyWallet();
      const tRes = await walletService.getTransactionHistory();
      setWallet(wRes.data || { balance: 0 });
      setTransactions(tRes.data || []);
    } catch (err) {
      console.error("Lỗi ví:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = () => {
    Swal.fire({
      title: "Yêu cầu rút tiền",
      html: `
        <input id="swal-input1" class="swal2-input" placeholder="Số tiền muốn rút">
        <input id="swal-input2" class="swal2-input" placeholder="Số tài khoản ngân hàng">
        <input id="swal-input3" class="swal2-input" placeholder="Tên ngân hàng">
      `,
      showCancelButton: true,
      confirmButtonText: "Gửi yêu cầu",
      confirmButtonColor: "#2563eb",
      preConfirm: () => {
        return [
          document.getElementById("swal-input1").value,
          document.getElementById("swal-input2").value,
          document.getElementById("swal-input3").value,
        ];
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "Đã gửi!",
          "Yêu cầu của sếp đang chờ Admin duyệt.",
          "success",
        );
      }
    });
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pt-24 pb-16 px-6 text-left">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3">
            <Wallet className="text-blue-600" size={32} /> Ví của tôi
          </h1>
          <p className="text-slate-500 font-medium">
            Quản lý thu nhập từ việc bán đồ án và thực hiện rút tiền.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* CỘT TRÁI: THẺ SỐ DƯ */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-gradient-to-br from-zinc-900 to-slate-800 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all duration-700"></div>

              <div className="flex justify-between items-start mb-12">
                <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
                  <CreditCard size={24} />
                </div>
                <img
                  src="https://res.cloudinary.com/dbemi1ljd/image/upload/q_auto/f_auto/v1775655662/visa_cnjvdt.jpg"
                  className="h-7 opacity-45"
                  alt="visa"
                />
              </div>

              <div className="space-y-1">
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
                  Số dư khả dụng
                </p>
                <h2 className="text-4xl font-black tabular-nums">
                  {wallet.balance?.toLocaleString()}{" "}
                  <span className="text-lg">đ</span>
                </h2>
              </div>

              <div className="mt-12 flex gap-3">
                <button
                  onClick={handleWithdraw}
                  className="flex-1 bg-white text-zinc-900 py-3 rounded-2xl font-bold text-sm hover:bg-blue-500 hover:text-white transition-all shadow-lg"
                >
                  Rút tiền
                </button>
                <button className="p-3 bg-white/10 rounded-2xl hover:bg-white/20 transition-all">
                  <Plus size={20} />
                </button>
              </div>
            </div>

            {/* Thống kê nhanh */}
            <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm grid grid-cols-2 gap-4">
              <div className="text-left">
                <p className="text-[10px] font-black text-slate-400 uppercase">
                  Đã bán
                </p>
                <p className="text-lg font-bold text-slate-800">12 Bài</p>
              </div>
              <div className="text-left border-l pl-4 border-slate-100">
                <p className="text-[10px] font-black text-slate-400 uppercase">
                  Tổng thu
                </p>
                <p className="text-lg font-bold text-emerald-600">+API M</p>
              </div>
            </div>
          </div>

          {/* CỘT PHẢI: LỊCH SỬ GIAO DỊCH */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden h-full">
              <div className="p-8 border-b border-slate-50 flex justify-between items-center">
                <h3 className="text-xl font-black flex items-center gap-2">
                  <History size={20} className="text-blue-600" /> Lịch sử giao
                  dịch
                </h3>
                <button className="text-sm font-bold text-blue-600 hover:underline">
                  Xem tất cả
                </button>
              </div>

              <div className="p-4">
                {transactions.length > 0 ? (
                  <div className="space-y-2">
                    {transactions.map((t) => (
                      <div
                        key={t.id}
                        className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition-all cursor-pointer group"
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`p-3 rounded-xl ${t.type === "INCOME" ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}
                          >
                            {t.type === "INCOME" ? (
                              <ArrowDownLeft size={20} />
                            ) : (
                              <ArrowUpRight size={20} />
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                              {t.description}
                            </p>
                            <p className="text-xs text-slate-400 font-medium">
                              {t.date}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p
                            className={`font-black ${t.type === "INCOME" ? "text-emerald-600" : "text-slate-800"}`}
                          >
                            {t.type === "INCOME" ? "+" : "-"}
                            {t.amount?.toLocaleString()}đ
                          </p>
                          <p className="text-[10px] font-black uppercase text-slate-300">
                            {t.status}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-20 text-center">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <DollarSign className="text-slate-300" size={32} />
                    </div>
                    <p className="text-slate-400 font-bold">
                      Chưa có giao dịch nào được thực hiện.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
