import React, { useEffect, useState } from "react";
import Footer from "../../../layouts/Footer";
import studentService from "../../../services/studentService";
import ProfileSidebar from "../profilePage/ProfileSidebar";
import ProfileForm from "../profilePage/ProfileForm";
import TeacherEvaluations from "../profilePage/TeacherEvaluations";
import CvStatusManager from "../profilePage/CvStatusManager";

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
      <div className="flex justify-center items-center h-screen bg-white">
        <div className="flex flex-col items-center gap-4">
          <span className="loading loading-spinner loading-lg text-blue-600"></span>
          <p className="text-gray-500 animate-pulse">
            Đang tải thông tin hồ sơ...
          </p>
        </div>
      </div>
    );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-grow container mx-auto py-8 px-4 flex gap-8 mt-16">
        {/* Truyền activeTab và setActiveTab xuống Sidebar */}
        <ProfileSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Hiển thị nội dung dựa trên Tab được chọn */}
        {activeTab === "update-profile" && (
          <ProfileForm profile={profile} setProfile={setProfile} />
        )}

        {activeTab === "evaluations" && <TeacherEvaluations />}
        {activeTab === "cv-manager" && <CvStatusManager />}
      </main>
      <Footer />
    </div>
  );
}
