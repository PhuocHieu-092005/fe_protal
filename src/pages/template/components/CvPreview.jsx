// src/pages/template/components/CvPreview.jsx
import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";

const CvPreview = ({ cvData, avatarPreview, sections }) => {
  // ← thêm props sections
  const exportToPDF = async () => {
    const element = document.getElementById("cv-preview-content");
    if (!element) {
      alert("Không tìm thấy nội dung CV!");
      return;
    }

    try {
      const canvas = await html2canvas(element, {
        scale: 2.5, // Tăng chất lượng (2.0 ~ 3.0 là tốt)
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
        allowTaint: true,
        ignoreElements: (el) => el.id === "no-print", // nếu có phần không muốn in
      });

      const imgData = canvas.toDataURL("image/jpeg", 0.92);

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth(); // 210
      const pdfHeight = pdf.internal.pageSize.getHeight(); // 297

      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      // Trang đầu tiên
      pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      // Các trang tiếp theo (Multi-page)
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      const fileName = `${(cvData.personalInfo?.fullName || "CV").replace(/\s+/g, "_")}_2026.pdf`;
      pdf.save(fileName);
    } catch (error) {
      console.error("Lỗi xuất PDF:", error);
      alert("Có lỗi khi xuất PDF. Vui lòng thử lại sau.");
    }
  };

  return (
    <div className="max-w-[800px] mx-auto">
      <div className="flex justify-end mb-6">
        <button
          onClick={exportToPDF}
          className="px-8 py-3 bg-black text-white rounded-2xl font-medium hover:bg-gray-800 transition"
        >
          Xuất PDF
        </button>
      </div>

      <div
        id="cv-preview-content"
        className="bg-white shadow-2xl rounded-3xl overflow-hidden"
        style={{ width: "210mm", minHeight: "297mm", maxWidth: "100%" }}
      >
        <div className="p-10 text-[15px] leading-relaxed">
          {/* Header - Luôn ở trên cùng */}
          <div className="flex gap-6 items-start mb-12">
            {avatarPreview && (
              <img
                src={avatarPreview}
                alt="avatar"
                className="w-32 h-32 rounded-3xl object-cover border-4 border-gray-300 flex-shrink-0"
              />
            )}
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-black tracking-tight">
                {cvData.personalInfo.fullName || "Họ và tên"}
              </h1>
              <p className="text-xl text-gray-700 mt-2 font-medium">
                {cvData.personalInfo.title || "Chức danh nghề nghiệp"}
              </p>

              <div className="flex flex-wrap gap-x-5 gap-y-1 mt-5 text-sm text-gray-600">
                {cvData.personalInfo.email && (
                  <span>Email: {cvData.personalInfo.email}</span>
                )}
                {cvData.personalInfo.phone && (
                  <span>Điện thoại: {cvData.personalInfo.phone}</span>
                )}
                {cvData.personalInfo.address && (
                  <span>Địa chỉ: {cvData.personalInfo.address}</span>
                )}
                {cvData.personalInfo.github && (
                  <span>GitHub: {cvData.personalInfo.github}</span>
                )}
                {cvData.personalInfo.linkedin && (
                  <span>LinkedIn: {cvData.personalInfo.linkedin}</span>
                )}
              </div>
            </div>
          </div>

          {/* ====================== Render theo thứ tự sections ====================== */}
          {sections.map((section) => {
            switch (section.id) {
              case "objective":
                return cvData.objective ? (
                  <div key={section.id} className="mb-12">
                    <h2 className="text-xl font-semibold text-black mb-4 border-b pb-3 border-gray-300">
                      Mục tiêu nghề nghiệp
                    </h2>
                    <p className="text-gray-700 leading-relaxed break-words whitespace-pre-wrap">
                      {cvData.objective}
                    </p>
                  </div>
                ) : null;

              case "education":
                return cvData.education?.[0]?.school ? (
                  <div key={section.id} className="mb-12">
                    <h2 className="text-xl font-semibold text-black mb-4 border-b pb-3 border-gray-300">
                      Học vấn
                    </h2>
                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold text-black">
                            {cvData.education[0].school}
                          </h3>
                          <p className="text-gray-700 mt-1">
                            {cvData.education[0].major}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-gray-600">
                            {cvData.education[0].period}
                          </p>
                          {cvData.education[0].gpa && (
                            <p className="text-gray-600 mt-1">
                              GPA: {cvData.education[0].gpa}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null;

              case "experience":
                return cvData.experience?.length > 0 ? (
                  <div key={section.id} className="mb-12">
                    <h2 className="text-xl font-semibold text-black mb-6 border-b pb-3 border-gray-300">
                      Kinh nghiệm
                    </h2>
                    <div className="space-y-10">
                      {cvData.experience.map((exp, index) => (
                        <div
                          key={index}
                          className="relative pl-8 border-l-2 border-gray-300"
                        >
                          <div className="absolute -left-1.5 top-2 w-3 h-3 rounded-full bg-black" />
                          <div>
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="text-lg font-semibold text-black">
                                  {exp.title || "Chưa có tiêu đề"}
                                </h3>
                                <p className="text-gray-700 font-medium mt-1">
                                  {exp.role}
                                </p>
                              </div>
                              <p className="text-gray-500 text-sm">
                                {exp.period}
                              </p>
                            </div>
                            <p className="mt-4 text-gray-700 leading-relaxed break-words whitespace-pre-wrap text-[15.5px]">
                              {exp.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null;

              case "skills":
                return (
                  <div key={section.id} className="mb-12">
                    <h2 className="text-xl font-semibold text-black mb-6 border-b pb-3 border-gray-300">
                      Kỹ năng
                    </h2>
                    <div className="grid grid-cols-3 gap-8">
                      {cvData.skills.programming?.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-gray-700 mb-3">
                            Ngôn ngữ lập trình
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {cvData.skills.programming.map((skill, i) => (
                              <span
                                key={i}
                                className="bg-gray-100 text-gray-800 px-4 py-1.5 rounded-2xl text-sm"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {cvData.skills.frameworks?.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-gray-700 mb-3">
                            Framework
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {cvData.skills.frameworks.map((skill, i) => (
                              <span
                                key={i}
                                className="bg-gray-100 text-gray-800 px-4 py-1.5 rounded-2xl text-sm"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {cvData.skills.softSkills?.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-gray-700 mb-3">
                            Kỹ năng mềm
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {cvData.skills.softSkills.map((skill, i) => (
                              <span
                                key={i}
                                className="bg-gray-100 text-gray-800 px-4 py-1.5 rounded-2xl text-sm"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );

              default:
                return null;
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default CvPreview;
