import React, { useEffect, useMemo, useState } from "react";
import { ChevronLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import projectAccessRequestService from "../../../services/projectAccessRequestService";
import projectCommentService from "../../../services/projectCommentService";
import projectService from "../../../services/projectService";
import paymentService from "../../../services/paymentService";
import ProjectAccessRequestModal from "./ProjectAccessRequestModal";
import ProjectCommentSection from "./ProjectCommentSection";
import ProjectOverviewSection from "./ProjectOverviewSection";
import ProjectSidebar from "./ProjectSidebar";
import TeacherEvaluationSection from "./TeacherEvaluationSection";
import { alertUtils } from "../../../helpers/alertUtils";

const normalizeUrl = (url) => {
  if (!url || typeof url !== "string") return url;
  const trimmedUrl = url.trim();
  const duplicateStartIndex = trimmedUrl.indexOf("http", 1);
  if (duplicateStartIndex === -1) return trimmedUrl;
  return trimmedUrl.slice(0, duplicateStartIndex);
};

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [teacherEvaluations, setTeacherEvaluations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");

  const [isFavorited, setIsFavorited] = useState(false);
  const [loadingFav, setLoadingFav] = useState(false);

  const [openRequestModal, setOpenRequestModal] = useState(false);
  const [requestReason, setRequestReason] = useState("");
  const [requestLoading, setRequestLoading] = useState(false);

  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState("");
  const [commentLoading, setCommentLoading] = useState(true);
  const [submittingComment, setSubmittingComment] = useState(false);
  const [creatingPaymentLink, setCreatingPaymentLink] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("user") || "null");
  const accessToken = localStorage.getItem("accessToken");

  const checkFav = async () => {
    if (!currentUser || !accessToken) {
      setIsFavorited(false);
      return;
    }
    try {
      const ok = await projectService.isFavorited(id);
      setIsFavorited(ok);
    } catch (err) {
      console.log("Lỗi kiểm tra yêu thích:", err?.data || err);
    }
  };

  const handleToggleFavorite = async () => {
    if (!isLoggedIn()) {
      alertUtils.info("Yêu cầu đăng nhập", "Vui lòng đăng nhập để lưu dự án.");
      return;
    }
    setLoadingFav(true);
    try {
      if (isFavorited) {
        await projectService.deleteFavoriteProject(id);
        alertUtils.success("Đã gỡ thích dự án");
      } else {
        await projectService.toggleFavorite(id);
        alertUtils.success("Đã thích dự án");
      }
      await checkFav();
    } catch (err) {
      console.error("Lỗi xử lý yêu thích:", err);
      alertUtils.error("Lỗi", "Không thể cập nhật trạng thái yêu thích.");
    } finally {
      setLoadingFav(false);
    }
  };

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        await checkFav();
        const [projectResponse, evaluationsResponse] = await Promise.all([
          projectService.getProjectById(id),
          projectService.getProjectTeacherEvaluations(id),
        ]);
        if (projectResponse?.data) {
          setProject(projectResponse.data);
          const firstImage =
            projectResponse.data?.images?.[0]?.imageUrl ||
            projectResponse.data?.images?.[0]?.image_url ||
            "";
          setSelectedImage(firstImage);
        }
        setTeacherEvaluations(
          Array.isArray(evaluationsResponse?.data)
            ? evaluationsResponse.data
            : [],
        );
      } catch (err) {
        console.error("Lỗi tải chi tiết project:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  useEffect(() => {
    const fetchComments = async () => {
      if (!id) return;
      try {
        setCommentLoading(true);
        const response = await projectCommentService.getCommentsByProject(id);
        setComments(Array.isArray(response) ? response : []);
      } catch (error) {
        console.error("Lỗi lấy bình luận project:", error);
        setComments([]);
      } finally {
        setCommentLoading(false);
      }
    };
    fetchComments();
  }, [id]);

  const imageList = useMemo(() => {
    if (!project?.images || !Array.isArray(project.images)) return [];
    return project.images.map((img) => ({
      id: img.id,
      url: img.imageUrl || img.image_url,
    }));
  }, [project]);

  const normalizedTechnologies = useMemo(() => {
    if (!Array.isArray(project?.technologies)) return [];
    return project.technologies
      .filter((tech) => tech?.name)
      .map((tech) => ({
        id: tech.id || tech.name,
        name: tech.name,
        iconUrl: tech.iconUrl || tech.icon_url,
      }));
  }, [project]);

  const normalizedMembers = useMemo(() => {
    if (!Array.isArray(project?.members)) {
      const fallbackStudentName =
        project?.studentName || project?.student_name || "";
      const fallbackMssv = project?.studentMssv || project?.student_mssv || "";

      if (!fallbackStudentName && !fallbackMssv) {
        return [];
      }

      return [
        {
          id: fallbackMssv || fallbackStudentName,
          mssv: fallbackMssv || "---",
          studentName: fallbackStudentName || "Sinh viên",
        },
      ];
    }

    if (project.members.length === 0) {
      const fallbackStudentName =
        project?.studentName || project?.student_name || "";
      const fallbackMssv = project?.studentMssv || project?.student_mssv || "";

      if (!fallbackStudentName && !fallbackMssv) {
        return [];
      }

      return [
        {
          id: fallbackMssv || fallbackStudentName,
          mssv: fallbackMssv || "---",
          studentName: fallbackStudentName || "Sinh viên",
        },
      ];
    }

    return project.members
      .map((member) => ({
        id: member.studentId || member.student_id || member.mssv,
        mssv: member.mssv || "---",
        studentName: member.studentName || member.student_name || "Thành viên",
      }))
      .filter((member) => member.id || member.mssv || member.studentName);
  }, [project]);

  const normalizedTeacherEvaluations = useMemo(
    () =>
      teacherEvaluations.map((item) => ({
        id: item.id,
        teacherName: item.teacher_name || item.teacherName || "Giảng viên",
        suggestions: item.suggestions || "Chưa có nhận xét từ giảng viên.",
        score: item.score ?? item.rating ?? null,
        createdAtLabel: item.created_at
          ? `Ngày đánh giá: ${new Date(item.created_at).toLocaleDateString("vi-VN")}`
          : "Chưa rõ thời gian đánh giá",
      })),
    [teacherEvaluations],
  );

  const courseName = project?.courseName || project?.course_name || "dự án";
  const studentName =
    project?.studentName || project?.student_name || "Sinh viên";
  const sourceCodeUrl = normalizeUrl(
    project?.sourceCodeUrl || project?.source_code_url,
  );
  const demoUrl = normalizeUrl(project?.demoUrl || project?.demo_url);
  const priceType = project?.priceType || project?.price_type;
  const priceDownload = project?.priceDownload ?? project?.price_download ?? 0;
  const adminNote = project?.adminNote || project?.admin_note;
  const viewCount = project?.viewCount ?? project?.view_count ?? 0;
  const downloadCount = project?.downloadCount ?? project?.download_count ?? 0;
  const isPurchased = project?.isPurchased ?? project?.is_purchased ?? false;

  const isPaidProject = priceType === "PAID";

  const handleOpenRequestModal = () => {
    if (currentUser?.role !== "COMPANY") {
      alertUtils.info(
        "Thông báo",
        "Chỉ tài khoản doanh nghiệp mới được gửi yêu cầu hợp tác.",
      );
      return;
    }
    setRequestReason("");
    setOpenRequestModal(true);
  };

  const handleBuyProject = async () => {
    if (!project?.id) return;
    if (isPurchased) {
      alertUtils.info("Thông báo", "Bạn đã mua source code của dự án này.");
      return;
    }
    if (!currentUser) {
      alertUtils.info(
        "Yêu cầu đăng nhập",
        "Vui lòng đăng nhập để mua source code.",
      );
      return;
    }
    try {
      setCreatingPaymentLink(true);
      const response = await paymentService.createProjectPaymentLink(
        project.id,
      );
      const paymentLink = response?.data || response;
      const checkoutUrl = paymentLink?.checkoutUrl || paymentLink?.checkout_url;
      if (!checkoutUrl) {
        throw new Error("Không nhận được link thanh toán từ hệ thống.");
      }
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error("Lỗi tạo link thanh toán:", error);
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Không thể tạo link thanh toán. Vui lòng thử lại.";
      navigate(
        `/payment-failed?projectId=${project.id}&message=${encodeURIComponent(message)}`,
      );
    } finally {
      setCreatingPaymentLink(false);
    }
  };

  const handleCloseRequestModal = () => {
    setOpenRequestModal(false);
    setRequestReason("");
  };

  const handleSubmitAccessRequest = async () => {
    if (!project?.id) return;
    if (!requestReason.trim()) {
      alertUtils.error(
        "Thiếu thông tin",
        "Vui lòng nhập lý do gửi yêu cầu hợp tác.",
      );
      return;
    }
    try {
      setRequestLoading(true);
      const payload = {
        reason: requestReason.trim(),
        project_id: Number(project.id),
      };
      const response =
        await projectAccessRequestService.createProjectAccessRequest(payload);
      alertUtils.success(
        response?.message || "Đã gửi yêu cầu hợp tác thành công.",
      );
      handleCloseRequestModal();
    } catch (error) {
      console.error("Lỗi gửi yêu cầu hợp tác:", error);
      const serverMessage =
        error.response?.data?.data || error.response?.data?.message;
      alertUtils.error(
        serverMessage || "Không thể gửi yêu cầu hợp tác. Vui lòng thử lại sau.",
      );
    } finally {
      setRequestLoading(false);
    }
  };

  const handleSubmitComment = async () => {
    if (!project?.id) return;
    if (!currentUser || !accessToken) {
      alertUtils.info(
        "Yêu cầu đăng nhập",
        "Vui lòng đăng nhập để gửi bình luận.",
      );
      return;
    }
    if (!commentContent.trim()) {
      alertUtils.error("Thiếu thông tin", "Vui lòng nhập nội dung bình luận.");
      return;
    }
    try {
      setSubmittingComment(true);
      const response = await projectCommentService.addCommentToProject(
        project.id,
        { content: commentContent.trim() },
      );
      setComments((prev) => [response, ...prev]);
      setCommentContent("");
      alertUtils.success("Bình luận thành công.");
    } catch (error) {
      console.error("Lỗi thêm bình luận:", error);
      const serverMessage =
        error?.response?.data?.data || error?.response?.data?.message;
      alertUtils.error(serverMessage || "Không thể gửi bình luận.");
    } finally {
      setSubmittingComment(false);
    }
  };

  const formatCommentTime = (dateString) => {
    if (!dateString) return "---";
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return "---";
    return date.toLocaleString("vi-VN");
  };

  const isLoggedIn = () => !!currentUser;

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50/50 px-4 pb-24 pt-16 text-left sm:px-6 md:pt-20">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-[2rem] border border-slate-100 bg-white p-10 text-center shadow-sm md:p-20">
            <p className="text-lg font-black text-slate-400">ĐANG TẢI...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-slate-50/50 px-4 pb-24 pt-16 text-left sm:px-6 md:pt-20">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-[2rem] border border-slate-100 bg-white p-10 text-center shadow-sm md:p-20">
            <p className="font-bold text-slate-500">Không tìm thấy dự án.</p>
            <button
              onClick={() => navigate(-1)}
              className="mt-4 text-blue-600 underline"
            >
              Quay lại
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <ProjectAccessRequestModal
        open={openRequestModal}
        onClose={handleCloseRequestModal}
        requestReason={requestReason}
        setRequestReason={setRequestReason}
        handleSubmitAccessRequest={handleSubmitAccessRequest}
        requestLoading={requestLoading}
        projectTitle={project.title}
        studentName={studentName}
      />

      <div className="min-h-screen bg-slate-100 px-3 pb-28 pt-16 text-left sm:px-4 md:px-6 md:pb-16 md:pt-20">
        <div className="mx-auto w-full max-w-[1500px] md:w-[92%]">
          {/* ✅ FIX: thêm mt-3 cho mobile, md:mt-4 cho desktop */}
          <div className="mb-3 mt-3 flex items-center justify-between gap-3 md:mb-4 md:mt-4">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 shadow-sm transition hover:text-blue-600 sm:px-4 sm:text-sm"
            >
              <ChevronLeft size={18} />
              Quay lại
            </button>

            <button
              onClick={handleToggleFavorite}
              disabled={loadingFav}
              className={`rounded-xl border px-3 py-2 text-xs font-bold transition sm:px-4 sm:text-sm ${
                isFavorited
                  ? "border-rose-200 bg-rose-50 text-rose-600"
                  : "border-slate-200 bg-white text-slate-700 hover:text-blue-600"
              }`}
            >
              {loadingFav ? "Đang xử lý..." : "Lưu dự án"}
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_360px] xl:items-start">
            <div className="min-w-0 space-y-4">
              <ProjectOverviewSection
                courseName={courseName}
                projectTitle={project.title}
                description={project.description}
                viewCount={viewCount}
                downloadCount={downloadCount}
                isPaidProject={isPaidProject}
                priceDownload={priceDownload}
                imageList={imageList}
                selectedImage={selectedImage}
                onSelectImage={setSelectedImage}
              />

              <TeacherEvaluationSection
                evaluations={normalizedTeacherEvaluations}
              />
              <ProjectCommentSection
                comments={comments}
                commentLoading={commentLoading}
                commentContent={commentContent}
                setCommentContent={setCommentContent}
                submittingComment={submittingComment}
                handleSubmitComment={handleSubmitComment}
                formatCommentTime={formatCommentTime}
              />
            </div>

            <aside className="space-y-4 xl:sticky xl:top-24">
              <ProjectSidebar
                currentUserRole={currentUser?.role}
                isPaidProject={isPaidProject}
                priceDownload={priceDownload}
                sourceCodeUrl={sourceCodeUrl}
                demoUrl={demoUrl}
                technologies={normalizedTechnologies}
                studentName={studentName}
                members={normalizedMembers}
                projectId={project.id}
                projectStatus={project.status}
                adminNote={adminNote}
                onOpenRequestModal={handleOpenRequestModal}
                onBuyProject={handleBuyProject}
                buyingProject={creatingPaymentLink}
                isPurchased={isPurchased}
              />
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
