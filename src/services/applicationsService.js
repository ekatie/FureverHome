import API from "./api";

export const getAdminApplications = async () => {
  try {
    const response = await API.get("/admin/applications");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAdminApplication = async (id) => {
  try {
    const response = await API.get(`/admin/applications/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};