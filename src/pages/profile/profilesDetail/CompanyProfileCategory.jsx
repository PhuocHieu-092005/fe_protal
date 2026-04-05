import React, { useState } from "react";
import Footer from "../../../layouts/Footer";
import CompanyProfileSidebar from "../profilePage/CompanyProfileSidebar";
import ChangePasswordForm from "../profilePage/ChangePasswordForm";

function CompanyProfilePlaceholder({ title, description }) {
  return (
    <section className="flex-1 rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
      <h2 className="mb-3 text-4xl font-bold text-slate-900">{title}</h2>
      <p className="text-slate-500">{description}</p>
    </section>
  );
}

export default function CompanyProfileCategory() {
  const [activeTab, setActiveTab] = useState("company-profile");

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <main className="container mx-auto mt-16 flex flex-grow gap-8 px-4 py-8">
        <CompanyProfileSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {activeTab === "company-profile" && (
          <CompanyProfilePlaceholder
            title="Thông tin công ty"
            description="API"
          />
        )}

        {activeTab === "posted-jobs" && (
          <CompanyProfilePlaceholder
            title="Tin tuyển dụng đã đăng"
            description="Khu vực quản lý các bài tuyển dụng của công ty."
          />
        )}

        {activeTab === "applicants" && (
          <CompanyProfilePlaceholder
            title="Ứng viên đã ứng tuyển"
            description="Khu vực xem danh sách ứng viên đã nộp CV."
          />
        )}

        {activeTab === "change-password" && <ChangePasswordForm />}
      </main>

      <Footer />
    </div>
  );
}
