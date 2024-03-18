import API from './api';

export const getDogs = async () => {
  try {
    const response = await API.get('/dogs');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAdminDogs = async () => {
  try {
    const response = await API.get('/admin/dogs');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAdminDog = async (id) => {
  try {
    const response = await API.get(`/admin/dogs/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getDog = async (id) => {
  try {
    const response = await API.get(`/dogs/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const adminAddDog = async (dog) => {
  try {
    console.log("adminAddDog 1", dog);
    const response = await API.post('admin/dogs', { dog });
    console.log("adminAddDog 2", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const adminUpdateDog = async (id, dog) => {
  try {
    const response = await API.put(`/admin/dogs/${id}`, { dog });
    return response.data;
  } catch (error) {
    console.error("Failed to update the dog:", error);
    throw error;
  }
};

export const deleteDog = async (id) => {
  try {
    const response = await API.delete(`/dogs/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};