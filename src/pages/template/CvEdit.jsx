// src/pages/template/CvEdit.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Thêm dòng này
import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { validateCVData } from "../../helpers/cvValidation";
import CvEditorLeftPanel from "./components/CvEditorLeftPanel";
import CvPreview from "./components/CvPreview";
import SortableSection from "./components/SortableSection";

import PersonalSection from "./components/sections/PersonalSection";
import ObjectiveSection from "./components/sections/ObjectiveSection";
import EducationSection from "./components/sections/EducationSection";
import ExperienceSection from "./components/sections/ExperienceSection";
import SkillsSection from "./components/sections/SkillsSection";

const CvEdit = () => {
  const { id } = useParams(); // Lấy ID từ URL: /cv/edit/:id
  const navigate = useNavigate();

  const [isEditMode, setIsEditMode] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(null); // PENDING, REJECTED, APPROVED
  const [loading, setLoading] = useState(false);
  const [hasPendingRequest, setHasPendingRequest] = useState(false);

  const [title, setTitle] = useState("Title CV - Frontend Developer");
  const [avatarPreview, setAvatarPreview] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const [cvData, setCvData] = useState({
    personalInfo: {
      fullName: "",
      title: "",
      email: "",
      phone: "",
      address: "",
      github: "",
      linkedin: "",
    },
    objective: "",
    education: [{ school: "", major: "", gpa: "", period: "" }],
    experience: [],
    skills: { programming: [], frameworks: [], softSkills: [] },
    avatar: "", // Lưu URL avatar cũ
  });

  const [sections, setSections] = useState([
    {
      id: "personalInfo",
      label: "Thông tin cá nhân",
      component: PersonalSection,
    },
    {
      id: "objective",
      label: "Mục tiêu nghề nghiệp",
      component: ObjectiveSection,
    },
    { id: "education", label: "Học vấn", component: EducationSection },
    { id: "experience", label: "Kinh nghiệm", component: ExperienceSection },
    { id: "skills", label: "Kỹ năng", component: SkillsSection },
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor),
  );

  // =================== FETCH DATA KHI EDIT ===================
  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      fetchCvDetail(id);
    }
  }, [id]);

  const fetchCvDetail = async (cvId) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("accessToken");
      const response = await fetch(`http://localhost:8080/api/cvs/${cvId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();

      if (response.ok && data) {
        setTitle(data.title);
        setCurrentStatus(data.status);
        setHasPendingRequest(data.has_pending_request); // PENDING, REJECTED, APPROVED
        console.log("Dữ liệu CV API trả về:", data);
        // Đổ dữ liệu JSON vào form
        if (data.content_json) {
          setCvData(data.content_json);
          // Nếu có ảnh cũ, gán vào preview
          if (data.content_json.avatar) {
            setAvatarPreview(data.content_json.avatar);
          }
        }
      } else {
        alert("Không thể tải thông tin CV");
      }
    } catch (error) {
      console.error("Lỗi fetch CV:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setSections((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const updateCvData = (newData) => setCvData(newData);

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  // =================== LOGIC LƯU CV TỔNG HỢP ===================
  const handleSaveCV = async () => {
    const token = localStorage.getItem("accessToken");

    // 1. TRƯỜNG HỢP CV ĐÃ DUYỆT (APPROVED) -> Gửi Ticket
    if (isEditMode && currentStatus === "APPROVED") {
      const reason = window.prompt(
        "CV đã được duyệt. Vui lòng nhập lý do bạn muốn chỉnh sửa để Admin mở khóa:",
      );
      if (!reason || reason.trim() === "") return;

      try {
        const response = await fetch(
          `http://localhost:8080/api/cvs/${id}/unlock-requests`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ reason: reason.trim() }),
          },
        );
        const result = await response.json();
        if (response.ok) {
          alert("Gửi yêu cầu thành công! Vui lòng chờ Admin duyệt.");
          navigate("/profile");
        } else {
          alert(result.message || "Có lỗi xảy ra");
        }
      } catch (error) {
        console.error("Lỗi gửi yêu cầu:", error);
      }
      return; // Dừng tại đây, không lưu data
    }

    // 2. TRƯỜNG HỢP PENDING / REJECTED / CREATE MỚI -> Lưu Data
    const validation = validateCVData(title, cvData);
    if (!validation.isValid) {
      alert(validation.message);
      return;
    }

    const formData = new FormData();
    const cvRequest = {
      title: title.trim(),
      content_json: {
        ...cvData,
        avatar: cvData.avatar || "", // Giữ URL ảnh cũ nếu ko up mới
      },
    };

    formData.append("data", JSON.stringify(cvRequest));
    if (selectedFile) {
      formData.append("avatar", selectedFile);
    }

    try {
      console.log("Đang gửi dữ liệu lên Backend...");

      // Chọn URL và Method dựa trên Create hay Edit
      const url = isEditMode
        ? `http://localhost:8080/api/cvs/form/${id}`
        : `http://localhost:8080/api/cvs/form`;
      const method = isEditMode ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        alert(isEditMode ? "Cập nhật CV thành công!" : "Lưu CV thành công!");
        navigate("/profile");
      } else {
        alert(result.message || result.data || "Có lỗi xảy ra");
      }
    } catch (error) {
      console.error("Lỗi kết nối:", error);
    }
  };

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center">
        Đang tải dữ liệu CV...
      </div>
    );

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 mt-14">
      {/* CỘT TRÁI - Sidebar */}
      <div className="w-[450px] bg-white border-r overflow-y-auto mt-4">
        {/* Truyền thêm isEditMode và currentStatus */}
        <CvEditorLeftPanel
          title={title}
          setTitle={setTitle}
          avatarPreview={avatarPreview}
          handleAvatarUpload={handleAvatarUpload}
          handleSaveCV={handleSaveCV}
          isEditMode={isEditMode}
          currentStatus={currentStatus}
          hasPendingRequest={hasPendingRequest}
        />

        {/* Vô hiệu hóa kéo thả nếu đã duyệt (Tuỳ chọn UX) */}
        <div
          className={`p-6 ${currentStatus === "APPROVED" ? "opacity-60 pointer-events-none" : ""}`}
        >
          <h3 className="font-medium text-gray-700 mb-5">Các phần của CV</h3>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={sections.map((s) => s.id)}
              strategy={verticalListSortingStrategy}
            >
              {sections.map((section) => (
                <SortableSection
                  key={section.id}
                  section={section}
                  cvData={cvData}
                  updateCvData={updateCvData}
                />
              ))}
            </SortableContext>
          </DndContext>
        </div>
      </div>

      {/* CỘT PHẢI - PREVIEW */}
      <div className="flex-1 overflow-auto bg-gray-100 flex items-start justify-center pt-8 px-6">
        <div className="w-full max-w-[1300px] origin-top">
          <CvPreview
            cvData={cvData}
            avatarPreview={avatarPreview}
            sections={sections}
          />
        </div>
      </div>
    </div>
  );
};

export default CvEdit;
