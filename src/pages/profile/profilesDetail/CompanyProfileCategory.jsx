import React, { useState } from "react";
import Footer from "../../../layouts/Footer";
import CompanyProfileSidebar from "../profilePage/CompanyProfileSidebar";
import ChangePasswordForm from "../profilePage/ChangePasswordForm";
import CompanyProfileForm from "../profilePage/CompanyProfileForm";
import CompanyProjectAccessRequests from "../profilePage/CompanyProjectAccessRequests";

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

        {activeTab === "company-profile" && <CompanyProfileForm />}

        {activeTab === "posted-jobs" && (
          <CompanyProfilePlaceholder
            title="Tin tuyển dụng đã đăng"
            description="Tạm thời chưa nối được đầy đủ vì backend chưa có API lấy danh sách job của chính công ty."
          />
        )}

        {activeTab === "applicants" && (
          <CompanyProfilePlaceholder
            title="Ứng viên đã ứng tuyển"
            description="Phần này sẽ làm sau khi chốt được luồng danh sách bài tuyển dụng của công ty."
          />
        )}

        {activeTab === "project-access-requests" && (
          <CompanyProjectAccessRequests />
        )}

        {activeTab === "change-password" && <ChangePasswordForm />}
      </main>

      <Footer />
    </div>
  );
}
