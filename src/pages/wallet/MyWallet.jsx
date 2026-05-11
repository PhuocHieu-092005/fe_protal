import React, { useEffect, useMemo, useState } from "react";
import { Landmark, Plus, Wallet } from "lucide-react";
import bankAccountService from "../../services/bankAccountService";
import walletService from "../../services/walletService";
import BankAccountCard from "./components/BankAccountCard";
import BankAccountForm from "./components/BankAccountForm";
import WalletBalanceCard from "./components/WalletBalanceCard";
import WithdrawalForm from "./components/WithdrawalForm";
import WithdrawalHistory from "./components/WithdrawalHistory";

export default function MyWallet() {
  const [showBankForm, setShowBankForm] = useState(false);
  const [bankAccounts, setBankAccounts] = useState([]);
  const [loadingBankAccounts, setLoadingBankAccounts] = useState(true);
  const [savingBankAccount, setSavingBankAccount] = useState(false);
  const [deletingBankAccountId, setDeletingBankAccountId] = useState(null);
  const [withdrawalRequests, setWithdrawalRequests] = useState([]);
  const [loadingWithdrawals, setLoadingWithdrawals] = useState(true);
  const [submittingWithdrawal, setSubmittingWithdrawal] = useState(false);
  const [wallet, setWallet] = useState({
    totalBalance: 0,
    availableBalance: 0,
    updatedAt: null,
  });
  const [loadingWallet, setLoadingWallet] = useState(true);

  const pendingWithdraw = useMemo(
    () =>
      withdrawalRequests
        .filter((request) => request.status === "PENDING")
        .reduce((total, request) => total + Number(request.amount || 0), 0),
    [withdrawalRequests],
  );

  const walletSummary = useMemo(
    () => ({
      ...wallet,
      pendingWithdraw,
    }),
    [pendingWithdraw, wallet],
  );

  const loadWallet = async () => {
    try {
      setLoadingWallet(true);
      const response = await walletService.getMyWallet();
      setWallet(response?.data || {
        totalBalance: 0,
        availableBalance: 0,
        updatedAt: null,
      });
    } catch (error) {
      console.error("Lỗi tải ví:", error);
      setWallet({
        totalBalance: 0,
        availableBalance: 0,
        updatedAt: null,
      });
    } finally {
      setLoadingWallet(false);
    }
  };

  const loadBankAccounts = async () => {
    try {
      setLoadingBankAccounts(true);
      const response = await bankAccountService.getMyBankAccounts();
      setBankAccounts(Array.isArray(response?.data) ? response.data : []);
    } catch (error) {
      console.error("Lỗi tải tài khoản ngân hàng:", error);
      setBankAccounts([]);
    } finally {
      setLoadingBankAccounts(false);
    }
  };

  const loadWithdrawalRequests = async () => {
    try {
      setLoadingWithdrawals(true);
      const response = await walletService.getMyWithdrawalRequests();
      setWithdrawalRequests(Array.isArray(response?.data) ? response.data : []);
    } catch (error) {
      console.error("Lỗi tải lịch sử yêu cầu rút tiền:", error);
      setWithdrawalRequests([]);
    } finally {
      setLoadingWithdrawals(false);
    }
  };

  useEffect(() => {
    loadWallet();
    loadBankAccounts();
    loadWithdrawalRequests();
  }, []);

  const handleCreateBankAccount = async (formData, resetForm) => {
    const payload = {
      bankName: formData.bankName.trim(),
      accountNumber: formData.accountNumber.trim(),
    };

    if (!payload.bankName || !payload.accountNumber) {
      window.alert("Vui lòng nhập đầy đủ tên ngân hàng và số tài khoản.");
      return;
    }

    try {
      setSavingBankAccount(true);
      const response = await bankAccountService.createBankAccount(payload);
      const createdAccount = response?.data || response;

      setBankAccounts((current) => [createdAccount, ...current]);
      resetForm();
      setShowBankForm(false);
      window.alert(response?.message || "Thêm tài khoản ngân hàng thành công.");
    } catch (error) {
      console.error("Lỗi thêm tài khoản ngân hàng:", error);
      window.alert(
        error?.response?.data?.message ||
          "Không thể thêm tài khoản ngân hàng. Vui lòng thử lại.",
      );
    } finally {
      setSavingBankAccount(false);
    }
  };

  const handleDeleteBankAccount = async (accountId) => {
    const confirmed = window.confirm("Bạn có chắc muốn xóa tài khoản ngân hàng này?");

    if (!confirmed) return;

    try {
      setDeletingBankAccountId(accountId);
      const response = await bankAccountService.deleteBankAccount(accountId);
      setBankAccounts((current) =>
        current.filter((account) => account.id !== accountId),
      );
      window.alert(response?.message || "Xóa tài khoản ngân hàng thành công.");
    } catch (error) {
      console.error("Lỗi xóa tài khoản ngân hàng:", error);
      window.alert(
        error?.response?.data?.message ||
          "Không thể xóa tài khoản ngân hàng. Vui lòng thử lại.",
      );
    } finally {
      setDeletingBankAccountId(null);
    }
  };

  const handleCreateWithdrawal = async (formData, resetForm) => {
    const amount = Number(formData.amount);
    const bankAccountId = Number(formData.bankAccountId);

    if (!amount || amount <= 0) {
      window.alert("Vui lòng nhập số tiền muốn rút hợp lệ.");
      return;
    }

    if (!bankAccountId) {
      window.alert("Vui lòng chọn tài khoản ngân hàng nhận tiền.");
      return;
    }

    if (amount > wallet.availableBalance) {
      window.alert("Số tiền rút không được lớn hơn tiền có thể rút.");
      return;
    }

    try {
      setSubmittingWithdrawal(true);
      const response = await walletService.requestWithdrawal({
        amount,
        bankAccountId,
      });
      const createdRequest = response?.data || response;

      setWithdrawalRequests((current) => [createdRequest, ...current]);
      loadWallet();
      resetForm();
      window.alert(response?.message || "Tạo yêu cầu rút tiền thành công.");
    } catch (error) {
      console.error("Lỗi tạo yêu cầu rút tiền:", error);
      window.alert(
        error?.response?.data?.message ||
          "Không thể tạo yêu cầu rút tiền. Vui lòng thử lại.",
      );
    } finally {
      setSubmittingWithdrawal(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-6 pb-16 pt-28 text-left">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-blue-600">
              <Wallet size={16} />
              Ví sinh viên
            </p>
            <h1 className="text-4xl font-bold tracking-normal text-slate-950">
              Ví của tôi
            </h1>
            <p className="mt-2 max-w-2xl text-base font-medium text-slate-500">
              Quản lý thu nhập bán source code, tài khoản ngân hàng và yêu cầu rút tiền.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowBankForm((current) => !current)}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-blue-600"
          >
            <Plus size={18} />
            Thêm tài khoản ngân hàng
          </button>
        </header>

        <div className="grid grid-cols-1 gap-7 xl:grid-cols-12">
          <aside className="space-y-7 xl:col-span-4">
            <WalletBalanceCard wallet={walletSummary} loading={loadingWallet} />

            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <h2 className="flex items-center gap-2 text-xl font-bold text-slate-950">
                    <Landmark size={20} className="text-blue-600" />
                    Ngân hàng
                  </h2>
                  <p className="mt-1 text-sm font-medium text-slate-500">
                    Chọn tài khoản nhận tiền khi rút.
                  </p>
                </div>
              </div>

              {loadingBankAccounts ? (
                <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-5 text-sm font-bold text-slate-400">
                  Đang tải tài khoản ngân hàng...
                </div>
              ) : bankAccounts.length > 0 ? (
                <div className="space-y-4">
                  {bankAccounts.map((account) => (
                    <BankAccountCard
                      key={account.id}
                      account={account}
                      deleting={deletingBankAccountId === account.id}
                      onDelete={handleDeleteBankAccount}
                    />
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-5 text-sm font-bold text-slate-400">
                  Chưa có tài khoản ngân hàng nào.
                </div>
              )}
            </section>
          </aside>

          <section className="space-y-7 xl:col-span-8">
            {showBankForm && (
              <BankAccountForm
                onSubmit={handleCreateBankAccount}
                submitting={savingBankAccount}
              />
            )}

            <WithdrawalForm
              availableBalance={wallet.availableBalance}
              bankAccounts={bankAccounts}
              onSubmit={handleCreateWithdrawal}
              submitting={submittingWithdrawal}
            />

            <WithdrawalHistory
              requests={withdrawalRequests}
              loading={loadingWithdrawals}
            />
          </section>
        </div>
      </div>
    </main>
  );
}
