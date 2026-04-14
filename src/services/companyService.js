import api from "./api";

export const getMyCompanyProfile = async () => {
  const response = await api.get("/companies/me");
  return response.data;
};

export const updateMyCompanyProfile = async (payload) => {
  const formData = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    if (value === null || value === undefined) return;

    if (value instanceof File) {
      formData.append(key, value);
      return;
    }

    const stringValue = String(value).trim();
    if (stringValue === "") return;

    formData.append(key, stringValue);
  });


  const response = await api.put("/companies/me", formData);
  return response.data;
};

const companyService = {
  getMyCompanyProfile,
  updateMyCompanyProfile,
};

export default companyService;