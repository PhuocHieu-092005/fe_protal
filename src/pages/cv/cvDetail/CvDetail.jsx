import React from "react";
import { useParams } from "react-router-dom";
import Footer from "../../../layouts/Footer";

const cvData = [
  {
    id: "1",
    title: "Nguyễn Văn A",
    position: "Frontend Developer",
    description: "Chuyên về React, TailwindCSS, và UI/UX.",
    image: "/images/avatar1.png",
  },
];

export default function CvDetail() {
  const { id } = useParams();
  const cv = cvData.find((item) => item.id === id);

  if (!cv) {
    return <div className="mt-24 px-6">Không tìm thấy CV</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="mt-24 px-6 flex flex-col items-center flex-grow">
        <img
          src={cv.image}
          alt={cv.title}
          className="w-32 h-32 rounded-full object-cover shadow-md mb-4"
        />
        <h2 className="text-2xl font-bold text-slate-900 mb-2">{cv.title}</h2>
        <p className="text-lg font-semibold text-indigo-600 mb-2">
          {cv.position}
        </p>
        <p className="text-slate-700 max-w-md text-center">{cv.description}</p>
      </main>
      <Footer />
    </div>
  );
}
