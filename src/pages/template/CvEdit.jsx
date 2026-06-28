// src/pages/template/CvEdit.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import {
  API_BASE_URL,
  NGROK_SKIP_BROWSER_WARNING_HEADER,
} from "../../config/apiConfig";
import CvEditorLeftPanel from "./components/CvEditorLeftPanel";
import CvPreview from "./components/CvPreview";
import SortableSection from "./components/SortableSection";

import PersonalSection from "./components/sections/PersonalSection";
import ObjectiveSection from "./components/sections/ObjectiveSection";
import EducationSection from "./components/sections/EducationSection";
import ExperienceSection from "./components/sections/ExperienceSection";
import SkillsSection from "./components/sections/SkillsSection";
//import notification
import { alertUtils } from "../../helpers/alertUtils";

const CvEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isEditMode, setIsEditMode] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false); // Thêm state này
  const [hasPendingRequest, setHasPendingRequest] = useState(false);
  const [isUnlockModalOpen, setIsUnlockModalOpen] = useState(false);
  const [unlockReason, setUnlockReason] = useState("");

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
    avatar: "",
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
      const response = await fetch(`${API_BASE_URL}/cvs/${cvId}`, {
        headers: {
          ...NGROK_SKIP_BROWSER_WARNING_HEADER,
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (response.ok && data) {
        setTitle(data.title);
        setCurrentStatus(data.status);
        setHasPendingRequest(data.has_pending_request);
        if (data.content_json) {
          setCvData(data.content_json);
          if (data.content_json.avatar) {
            setAvatarPreview(data.content_json.avatar);
          }
        }
      } else {
        alertUtils.error("Lỗi", "Không thể tải thông tin CV");
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

  const handleCloseUnlockModal = () => {
    if (isSaving) return;
    setIsUnlockModalOpen(false);
    setUnlockReason("");
  };

  const handleSubmitUnlockRequest = async (e) => {
    e.preventDefault();
    if (isSaving) return;

    const reason = unlockReason.trim();
    if (!reason) {
      alertUtils.error(
        "Thiếu lý do",
        "Vui lòng nhập lý do bạn muốn Chỉnh sửa CV.",
      );
      return;
    }

    try {
      setIsSaving(true); // Bắt đầu trạng thái lưu
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        `${API_BASE_URL}/cvs/${id}/unlock-requests`,
        {
          method: "POST",
          headers: {
            ...NGROK_SKIP_BROWSER_WARNING_HEADER,
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ reason }),
        },
      );
      const result = await response.json();
      if (response.ok) {
        alertUtils.success("Gửi yêu cầu thành công! Vui lòng chờ Admin duyệt.");
        setIsUnlockModalOpen(false);
        setUnlockReason("");
        navigate("/profile");
      } else {
        alertUtils.error("Thất bại", result.message || "Có lỗi xảy ra");
      }
    } catch (error) {
      console.error("Lỗi gửi yêu cầu:", error);
      alertUtils.error("Lỗi", "Không thể gửi yêu cầu mở khóa.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveCV = async () => {
    if (isSaving) return; // Chặn nếu đang lưu

    const token = localStorage.getItem("accessToken");

    if (isEditMode && currentStatus === "APPROVED") {
      setIsUnlockModalOpen(true);
      return;
    }

    const validation = validateCVData(title, cvData);
    if (!validation.isValid) {
      alertUtils.error(validation.message);
      return;
    }

    const formData = new FormData();
    const cvRequest = {
      title: title.trim(),
      content_json: {
        ...cvData,
        avatar: cvData.avatar || "",
      },
    };

    formData.append("data", JSON.stringify(cvRequest));
    if (selectedFile) {
      formData.append("avatar", selectedFile);
    }

    try {
      setIsSaving(true); // Bắt đầu trạng thái lưu
      console.log("Đang gửi dữ liệu lên Backend...");

      const url = isEditMode
        ? `${API_BASE_URL}/cvs/form/${id}`
        : `${API_BASE_URL}/cvs/form`;
      const method = isEditMode ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          ...NGROK_SKIP_BROWSER_WARNING_HEADER,
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        alertUtils.success(
          isEditMode ? "Cập nhật CV thành công!" : "Lưu CV thành công!",
        );
        navigate("/profile");
      } else {
        let finalMessage = "";
        if (result.data && typeof result.data === "string") {
          finalMessage = result.data;
        } else if (result.data && typeof result.data === "object") {
          finalMessage = Object.values(result.data)[0];
        } else {
          finalMessage = result.message || "Có lỗi xảy ra, vui lòng thử lại";
        }
        alertUtils.error(finalMessage);
      }
    } catch {
      alertUtils.error("Lỗi kết nối", "Không thể lưu dữ liệu lúc này.");
    } finally {
      setIsSaving(false); // Kết thúc trạng thái lưu
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
      <div className="w-[450px] bg-white border-r overflow-y-auto mt-4">
        <CvEditorLeftPanel
          title={title}
          setTitle={setTitle}
          avatarPreview={avatarPreview}
          handleAvatarUpload={handleAvatarUpload}
          handleSaveCV={handleSaveCV}
          isEditMode={isEditMode}
          currentStatus={currentStatus}
          hasPendingRequest={hasPendingRequest}
          isSaving={isSaving} // Truyền prop xuống
        />

        <div
          className={`p-6 ${currentStatus === "APPROVED" || isSaving ? "opacity-60 pointer-events-none" : ""}`}
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

      <div className="flex-1 overflow-auto bg-gray-100 flex items-start justify-center pt-8 px-6">
        <div className="w-full max-w-[1300px] origin-top">
          <CvPreview
            cvData={cvData}
            avatarPreview={avatarPreview}
            sections={sections}
          />
        </div>
      </div>

      {isUnlockModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <form
            onSubmit={handleSubmitUnlockRequest}
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
          >
            <h2 className="text-xl font-semibold text-gray-900">
              Yêu cầu mở khóa Chỉnh sửa CV
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              CV đã được duyệt. Vui lòng nhập lý do bạn muốn Chỉnh sửa để Admin
              mở khóa.
            </p>

            <textarea
              value={unlockReason}
              onChange={(e) => setUnlockReason(e.target.value)}
              className="mt-5 min-h-32 w-full resize-none rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              placeholder="Nhập lý do Chỉnh sửa CV..."
              disabled={isSaving}
              autoFocus
            />

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={handleCloseUnlockModal}
                disabled={isSaving}
                className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Hủy
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="rounded-xl bg-orange-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-gray-400"
              >
                {isSaving ? "Đang gửi..." : "Gửi yêu cầu"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CvEdit;
