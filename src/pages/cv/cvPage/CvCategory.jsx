import React from "react";
import CvFilterSidebar from "./CvFilterSidebar";
import CvGridView from "./CvGridView";
import Footer from "../../../layouts/Footer";

export default function CvCategory() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Nội dung chính */}
      <main className="mt-24 px-6">
        {/* Hero Section */}
        <div className="w-full mb-10 text-center bg-gray-200/30 backdrop-blur-md py-12 rounded-xl shadow-lg">
          <h1 className="text-[40px] font-medium text-slate-900 mb-4">
            Candidate Profile
          </h1>
          <p className="mt-4 text-gray-800 text-xl max-w-2xl mx-auto font-light">
            Access a comprehensive collection of student resumes and project
            experiences for recruitment.
          </p>
        </div>

        {/* Content Section */}
        <div className="flex gap-6 pb-6 min-h-[1000px]">
          <CvFilterSidebar />
          <CvGridView />
        </div>
      </main>

      <Footer />
    </div>
  );
}
