import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../../../layouts/Footer";
import studentService from "../../../services/studentService";
import ProfileSidebar from "../profilePage/ProfileSidebar";
import ProfileForm from "../profilePage/ProfileForm";
import TeacherEvaluations from "../profilePage/TeacherEvaluations";
import CvStatusManager from "../profilePage/CvStatusManager";
import ChangePasswordForm from "../profilePage/ChangePasswordForm";

import MyProjects from "../profilePage/MyProjects";

import FavoriteJobs from "../profilePage/FavoriteJobs";
import ProjectFavorite from "../profilePage/ProjectFavorite";
import PurchasedProjects from "../profilePage/PurchasedProjects";

export default function StudentProfileCategory() {
  const location = useLocation();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(
    new URLSearchParams(location.search).get("tab") || "update-profile",
  );

  useEffect(() => {
    const tab = new URLSearchParams(location.search).get("tab");
    if (tab) setActiveTab(tab);
  }, [location.search]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await studentService.getProfileMe();
        setProfile(data);
      } catch (error) {
        console.error("Lỗi lấy profile student:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <span className="loading loading-spinner loading-lg text-blue-600"></span>
          <p className="animate-pulse text-gray-500">
            Đang tải thông tin hồ sơ sinh viên...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* RESPONSIVE UI: mobile xếp dọc, từ md trở lên giữ sidebar trái + content phải */}
      <main className="container mx-auto mt-16 flex flex-grow flex-col gap-4 overflow-hidden px-3 py-5 sm:px-4 md:flex-row md:gap-8 md:px-4 md:py-8">
        <ProfileSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === "update-profile" && (
          <ProfileForm profile={profile} setProfile={setProfile} />
        )}

        {activeTab === "evaluations" && <TeacherEvaluations />}

        {activeTab === "cv-manager" && <CvStatusManager />}

        {activeTab === "project-stats" && <MyProjects />}

        {activeTab === "change-password" && <ChangePasswordForm />}
        {activeTab === "favorite-jobs" && <FavoriteJobs />}
        {activeTab === "favorite-projects" && <ProjectFavorite />}
        {activeTab === "purchased-projects" && <PurchasedProjects />}
      </main>

      <Footer />
    </div>
  );
}
