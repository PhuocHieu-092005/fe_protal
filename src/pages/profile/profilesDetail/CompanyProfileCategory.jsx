import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../../../layouts/Footer";
import CompanyProfileSidebar from "../profilePage/CompanyProfileSidebar";
import ChangePasswordForm from "../profilePage/ChangePasswordForm";
import CompanyProfileForm from "../profilePage/CompanyProfileForm";
import CompanyJobs from "../profilePage/CompanyJobs";
import ProjectFavorite from "../profilePage/ProjectFavorite";
import CompanyProjectAccessRequests from "../profilePage/CompanyProjectAccessRequests";
import ApplicationByCompany from "../../job/company/ApplicationByCompany";
import PurchasedProjects from "../profilePage/PurchasedProjects";

function CompanyProfilePlaceholder({ title, description }) {
  return (
    <section className="flex-1 rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
      <h2 className="mb-3 text-4xl font-bold text-slate-900">{title}</h2>
      <p className="text-slate-500">{description}</p>
    </section>
  );
}

export default function CompanyProfileCategory() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(
    new URLSearchParams(location.search).get("tab") || "company-profile",
  );

  useEffect(() => {
    const tab = new URLSearchParams(location.search).get("tab");
    if (tab) setActiveTab(tab);
  }, [location.search]);

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* RESPONSIVE UI: mobile xếp dọc, desktop md giữ sidebar trái + content phải */}
      <main className="container mx-auto mt-16 flex flex-grow flex-col gap-4 overflow-hidden px-3 py-5 sm:px-4 md:flex-row md:gap-8 md:px-4 md:py-8">
        <CompanyProfileSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {activeTab === "company-profile" && <CompanyProfileForm />}

        {activeTab === "posted-jobs" && (
          <CompanyJobs activeTab={activeTab} setActiveTab={setActiveTab} />
        )}

        {activeTab === "applicants" && (
          <ApplicationByCompany
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === "favorite-projects" && (
          <ProjectFavorite activeTab={activeTab} setActiveTab={setActiveTab} />
        )}

        {activeTab === "project-access-requests" && (
          <CompanyProjectAccessRequests />
        )}

        {activeTab === "purchased-projects" && <PurchasedProjects />}

        {activeTab === "change-password" && <ChangePasswordForm />}
      </main>

      <Footer />
    </div>
  );
}
