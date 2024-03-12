import API from './api';

export const getDogs = async () => {
  try {
    const response = await API.get('/dogs');
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

export const addDog = async (dog) => {
  try {
    const response = await API.post('/dogs', dog);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateDog = async (id, dog) => {
  try {
    const response = await API.put(`/dogs/${id}`, dog);
    return response.data;
  } catch (error) {
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