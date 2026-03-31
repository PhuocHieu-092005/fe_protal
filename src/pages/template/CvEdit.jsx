// src/pages/template/CvEdit.jsx
import React, { useState } from "react";
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

import CvEditorLeftPanel from "./components/CvEditorLeftPanel";
import CvPreview from "./components/CvPreview";
import SortableSection from "./components/SortableSection";

import PersonalSection from "./components/sections/PersonalSection";
import ObjectiveSection from "./components/sections/ObjectiveSection";
import EducationSection from "./components/sections/EducationSection";
import ExperienceSection from "./components/sections/ExperienceSection";
import SkillsSection from "./components/sections/SkillsSection";

const CvEdit = () => {
  const [title, setTitle] = useState("Tên CV của bạn");
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
    skills: {
      programming: [],
      frameworks: [],
      softSkills: [],
    },
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
      setSelectedFile(file); // Lưu file thật để gửi Backend
      setAvatarPreview(URL.createObjectURL(file)); // Lưu blob để hiển thị preview
    }
  };
  const handleSaveCV = async () => {
    const formData = new FormData();
    //content_json là Map/Object
    const cvRequest = {
      title: title.trim(),
      content_json: {
        ...cvData,
        avatar: "", // link Cloudinary
      },
    };

    //Đưa dữ liệu vào FormData
    // dùng JSON.stringify cho phần 'data' vì BE nhận @RequestPart String
    formData.append("data", JSON.stringify(cvRequest));

    // file ảnh
    if (selectedFile) {
      formData.append("avatar", selectedFile);
    }

    try {
      console.log("Đang gửi dữ liệu lên Backend...");
      const token = localStorage.getItem("accessToken");
      const response = await fetch("http://localhost:8080/api/cvs/form", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const result = await response.json();
      if (response.ok) {
        alert("Lưu CV thành công!");
        // console.log("Thành công:", result);
      } else {
        // console.error("Lỗi :", result);
        const messageErr = result.data;
        alert(messageErr);
      }
    } catch (error) {
      console.error("Lỗi kết nối:", error);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 mt-14">
      {/* CỘT TRÁI - Sidebar */}
      <div className="w-[400px] bg-white border-r overflow-y-auto mt-4">
        <CvEditorLeftPanel
          title={title}
          setTitle={setTitle}
          avatarPreview={avatarPreview}
          handleAvatarUpload={handleAvatarUpload}
          handleSaveCV={handleSaveCV}
        />
        <div className="p-6">
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

      {/* ==================== CỘT PHẢI - PREVIEW ==================== */}
      <div className="flex-1 overflow-auto bg-gray-100 flex items-start justify-center pt-8 px-6">
        <div className="w-full max-w-[1300px] origin-top">
          {" "}
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
