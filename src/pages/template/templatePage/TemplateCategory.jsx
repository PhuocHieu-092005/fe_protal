// src/pages/template/templatePage/TemplateCategory.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TemplateCategory = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false); //modal upload
  const [selectedFile, setSelectedFile] = useState(null); //file upload có chọn file hay chưa
  const [title, setTitle] = useState(""); //title của CV khi upload
  const [uploading, setUploading] = useState(false); //trạng thái đang upload hay không

  const handleCreateNewCV = () => {
    navigate("/template/edit");
  }; //chuyển sang trang tạo CV mới

  const handleOpenUploadModal = () => {
    setIsModalOpen(true); //mở modal upload
    setSelectedFile(null); //reset file đã chọn trước đó
    setTitle(""); //reset title đã nhập trước đó
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]; //lấy file được chọn
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
    } else {
      alert("Vui lòng chọn file PDF!");
    }
  };

  const handleUploadSubmit = async () => {
    if (!selectedFile || !title.trim()) {
      alert("Vui lòng nhập tên CV và chọn file PDF!");
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append("title", title.trim());
    formData.append("file", selectedFile);
    try {
      const response = await fetch("http://localhost:8080/api/cvs/upload", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const result = await response.json();
      if (response.ok) {
        alert("Tải CV lên thành công!");
        console.log("Thành công:", result);
        setIsModalOpen(false);
        navigate("/template");
      } else {
        const messageErr = result.data;
        console.error("Lỗi từ server:", result);
        alert(messageErr);
      }
    } catch (error) {
      console.error("Lỗi kết nối:", error);
      alert("Lỗi kết nối server!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 py-16 px-6 mt-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold tracking-tight mb-4">
            Quản lý CV của bạn
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Xây dựng và quản lý hồ sơ chuyên nghiệp.
            <br />
            Tạo mới hoặc tải CV hiện có lên hệ thống.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Card 1: Tạo CV Mới */}
          <div
            onClick={handleCreateNewCV}
            className="group bg-white border border-gray-200 hover:border-gray-400 rounded-3xl p-10 transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-xl flex flex-col h-full"
          >
            <h2 className="text-3xl font-semibold mb-4 text-gray-900">
              Tạo CV Mới
            </h2>
            <p className="text-gray-600 text-[17px] leading-relaxed flex-1">
              Sử dụng trình soạn thảo kéo-thả hiện đại.
              <br />
              Chỉnh sửa realtime và xuất file PDF chuyên nghiệp.
            </p>

            <div className="mt-8 inline-flex items-center text-gray-900 font-medium group-hover:gap-2 transition-all">
              Bắt đầu tạo ngay
              <span className="text-2xl transition-transform group-hover:translate-x-1">
                →
              </span>
            </div>
          </div>

          {/* Card 2: Tải CV Lên */}
          <div
            onClick={handleOpenUploadModal}
            className="group bg-white border border-gray-200 hover:border-gray-400 rounded-3xl p-10 transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-xl flex flex-col h-full"
          >
            <h2 className="text-3xl font-semibold mb-4 text-gray-900">
              Tải CV Lên
            </h2>
            <p className="text-gray-600 text-[17px] leading-relaxed flex-1">
              Đã có file CV PDF sẵn?
              <br />
              Tải lên để quản lý, công khai và theo dõi lượt xem từ doanh
              nghiệp.
            </p>

            <div className="mt-8 inline-flex items-center text-gray-900 font-medium group-hover:gap-2 transition-all">
              Chọn file PDF
              <span className="text-2xl transition-transform group-hover:translate-x-1">
                →
              </span>
            </div>
          </div>
        </div>

        {/* Ghi chú cuối */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 text-sm">
            CV sau khi được Admin duyệt sẽ được công khai cho doanh nghiệp xem
            và tuyển dụng
          </p>
        </div>
      </div>

      {/* Modal Upload */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-semibold mb-6">Tải CV PDF lên</h2>

              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tên CV <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ví dụ: CV React Developer 2026"
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-gray-500"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Chọn file PDF <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-6 file:rounded-2xl file:border-0 file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 cursor-pointer"
                />
                {selectedFile && (
                  <p className="text-sm text-green-600 mt-2">
                    Đã chọn: {selectedFile.name}
                  </p>
                )}
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3.5 border border-gray-300 rounded-2xl font-medium hover:bg-gray-50 transition"
                >
                  Hủy
                </button>
                <button
                  onClick={handleUploadSubmit}
                  disabled={uploading || !selectedFile || !title.trim()}
                  className="flex-1 py-3.5 bg-gray-900 text-white rounded-2xl font-medium hover:bg-black transition disabled:bg-gray-400"
                >
                  {uploading ? "Đang tải lên..." : "Tải lên CV"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateCategory;
