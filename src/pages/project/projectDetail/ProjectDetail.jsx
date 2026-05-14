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
  const [existingAccessRequest, setExistingAccessRequest] = useState(null);
  const [checkingAccessRequest, setCheckingAccessRequest] = useState(false);

  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState("");
  const [commentLoading, setCommentLoading] = useState(true);
  const [submittingComment, setSubmittingComment] = useState(false);
  const [creatingPaymentLink, setCreatingPaymentLink] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("user") || "null");

  const checkFav = async () => {
    try {
      const ok = await projectService.isFavorited(id);
      setIsFavorited(ok);
    } catch (err) {
      console.log("Lỗi kiểm tra yêu thích:", err?.data || err);
    }
  };

  const fetchMyAccessRequestForProject = async () => {
    if (currentUser?.role !== "COMPANY" || !id) return;

    try {
      setCheckingAccessRequest(true);

      const response =
        await projectAccessRequestService.getMyProjectAccessRequests(0, 100);

      const rawData = response?.data;

      const requestList = Array.isArray(rawData)
        ? rawData
        : Array.isArray(rawData?.content)
          ? rawData.content
          : [];

      const foundRequest = requestList.find((item) => {
        const requestProjectId = item.project_id || item.projectId;
        return Number(requestProjectId) === Number(id);
      });

      setExistingAccessRequest(foundRequest || null);
    } catch (error) {
      console.error(
        "Lỗi kiểm tra yêu cầu hợp tác đã gửi:",
        error?.response?.data || error,
      );
    } finally {
      setCheckingAccessRequest(false);
    }
  };

  const handleToggleFavorite = async () => {
    setLoadingFav(true);

    try {
      if (isFavorited) {
        await projectService.deleteFavoriteProject(id);
        window.alert("Đã gỡ thích dự án");
      } else {
        await projectService.toggleFavorite(id);
        window.alert("Đã thích dự án");
      }

      await checkFav();
    } catch (err) {
      console.error("Lỗi xử lý yêu thích:", err);
      window.alert("Không thể cập nhật trạng thái yêu thích.");
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
    fetchMyAccessRequestForProject();
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

  const courseName = project?.courseName || project?.course_name || "Đồ án";
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
      window.alert("Chỉ tài khoản doanh nghiệp mới được gửi yêu cầu hợp tác.");
      return;
    }

    if (existingAccessRequest) {
      window.alert(
        `Bạn đã gửi yêu cầu hợp tác cho project này rồi. Trạng thái hiện tại: ${
          existingAccessRequest.status || "PENDING"
        }`,
      );
      return;
    }

    setRequestReason("");
    setOpenRequestModal(true);
  };

  const handleBuyProject = async () => {
    if (!project?.id) return;

    if (isPurchased) {
      window.alert("Bạn đã mua source code của đồ án này.");
      return;
    }

    if (!currentUser) {
      window.alert("Vui lòng đăng nhập để mua source code.");
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
      window.alert("Vui lòng nhập lý do gửi yêu cầu hợp tác.");
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

      setExistingAccessRequest(
        response?.data || {
          project_id: Number(project.id),
          status: "PENDING",
        },
      );

      window.alert(response?.message || "Đã gửi yêu cầu hợp tác thành công.");
      handleCloseRequestModal();
    } catch (error) {
      console.error("Lỗi gửi yêu cầu hợp tác:", error);

      window.alert(
        error?.response?.data?.message || "Không thể gửi yêu cầu hợp tác.",
      );

      await fetchMyAccessRequestForProject();
    } finally {
      setRequestLoading(false);
    }
  };

  const handleSubmitComment = async () => {
    if (!project?.id) return;

    if (!commentContent.trim()) {
      window.alert("Vui lòng nhập nội dung bình luận.");
      return;
    }

    try {
      setSubmittingComment(true);

      const response = await projectCommentService.addCommentToProject(
        project.id,
        {
          content: commentContent.trim(),
        },
      );

      setComments((prev) => [response, ...prev]);
      setCommentContent("");
      window.alert("Bình luận thành công.");
    } catch (error) {
      console.error("Lỗi thêm bình luận:", error);
      window.alert(
        error?.response?.data?.message || "Không thể gửi bình luận.",
      );
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

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50/50 px-6 pb-20 pt-28 text-left">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-[2rem] border border-slate-100 bg-white p-20 text-center shadow-sm">
            <p className="text-lg font-black text-slate-400">ĐANG TẢI...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-slate-50/50 px-6 pb-20 pt-28 text-left">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-[2rem] border border-slate-100 bg-white p-20 text-center shadow-sm">
            <p className="font-bold text-slate-500">Không tìm thấy đồ án.</p>
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

      <div className="min-h-screen bg-slate-100 px-4 pb-16 pt-28 text-left md:px-6">
        <div className="mx-auto w-[92%] max-w-[1500px]">
          <div className="mb-5 flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600 shadow-sm transition hover:text-blue-600"
            >
              <ChevronLeft size={18} />
              Quay lại
            </button>

            <button
              onClick={handleToggleFavorite}
              disabled={loadingFav}
              className={`rounded-xl border px-4 py-2 text-sm font-bold transition ${
                isFavorited
                  ? "border-rose-200 bg-rose-50 text-rose-600"
                  : "border-slate-200 bg-white text-slate-700 hover:text-blue-600"
              }`}
            >
              {loadingFav ? "Đang xử lý..." : "Lưu dự án"}
            </button>
          </div>

          <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_360px]">
            <div className="min-w-0 space-y-5">
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

            <aside className="space-y-5">
              <ProjectSidebar
                currentUserRole={currentUser?.role}
                isPaidProject={isPaidProject}
                priceDownload={priceDownload}
                sourceCodeUrl={sourceCodeUrl}
                demoUrl={demoUrl}
                technologies={project.technologies}
                studentName={studentName}
                projectId={project.id}
                projectStatus={project.status}
                adminNote={adminNote}
                onOpenRequestModal={handleOpenRequestModal}
                existingAccessRequest={existingAccessRequest}
                checkingAccessRequest={checkingAccessRequest}
                onBuyProject={handleBuyProject}
                buyingProject={creatingPaymentLink}
                isPurchased={isPurchased}
              />

              <TeacherEvaluationSection
                evaluations={normalizedTeacherEvaluations}
              />
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
