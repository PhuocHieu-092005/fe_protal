import React, { useEffect, useState } from "react";
import Footer from "../../../layouts/Footer";
import studentService from "../../../services/studentService";
import ProfileSidebar from "../profilePage/ProfileSidebar";
import ProfileForm from "../profilePage/ProfileForm";
import TeacherEvaluations from "../profilePage/TeacherEvaluations";
import CvStatusManager from "../profilePage/CvStatusManager";
import ChangePasswordForm from "../profilePage/ChangePasswordForm";

export default function ProfileCategory() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("update-profile");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await studentService.getProfileMe();
        setProfile(data);
      } catch (error) {
        console.error("Lỗi lấy profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="flex flex-col items-center gap-4">
          <span className="loading loading-spinner loading-lg text-blue-600"></span>
          <p className="animate-pulse text-gray-500">
            Đang tải thông tin hồ sơ...
          </p>
        </div>
      </div>
    );

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <main className="container mx-auto mt-16 flex flex-grow gap-8 px-4 py-8">
        <ProfileSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === "update-profile" && (
          <ProfileForm profile={profile} setProfile={setProfile} />
        )}

        {activeTab === "evaluations" && <TeacherEvaluations />}

        {activeTab === "cv-manager" && <CvStatusManager />}

        {activeTab === "change-password" && <ChangePasswordForm />}
      </main>

      <Footer />
    </div>
  );
}
