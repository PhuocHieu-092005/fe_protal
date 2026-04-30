import api from "./api";

const createProjectAccessRequest = async (payload) => {
  const response = await api.post("/project-access-requests", payload);
  return response.data;
};

const getMyProjectAccessRequests = async (page = 0, size = 10) => {
  const response = await api.get("/project-access-requests/me", {
    params: { page, size },
  });
  return response.data;
};

const getMyProjectAccessRequestDetail = async (id) => {
  const response = await api.get(`/project-access-requests/me/${id}`);
  return response.data;
};

const getAdminProjectAccessRequests = async (page = 0, size = 10) => {
  const response = await api.get("/project-access-requests", {
    params: { page, size },
  });
  return response.data;
};

const getAdminProjectAccessRequestDetail = async (id) => {
  const response = await api.get(`/project-access-requests/${id}`);
  return response.data;
};

const updateProjectAccessRequestStatus = async (id, payload) => {
  const response = await api.patch(
    `/project-access-requests/${id}/status`,
    payload,
  );
  return response.data;
};

const projectAccessRequestService = {
  createProjectAccessRequest,
  getMyProjectAccessRequests,
  getMyProjectAccessRequestDetail,
  getAdminProjectAccessRequests,
  getAdminProjectAccessRequestDetail,
  updateProjectAccessRequestStatus,
};

export default projectAccessRequestService;