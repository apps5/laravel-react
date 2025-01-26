import axiosInstance from './axiosConfig';

export const login = async (credentials) => {
  const response = await axiosInstance.post('/login', credentials);
  if (response.status === 200) {
      localStorage.setItem('authToken', response.data.token);
  }
  return response.data;
};

export const register = async (data) => {
  const response = await axiosInstance.post('/register', data);
  if (response.status === 201) {
      localStorage.setItem('authToken', response.data.token);
  }
  return response.data;
};

export const getUser = async () => {
    const response = await axiosInstance.get('/user');
    return response.data;
};

export const logout = async () => {
    const response = await axiosInstance.post('/logout');
    return response.data;
};

export const fetchNotifications = (page = 1) => {
  return axiosInstance.get(`/notifications`, {
    params: { page },
  });
};

export const addNotification = (notification) =>
  axiosInstance.post(`/notifications`, notification);

export const updateNotification = (id, notification) =>
  axiosInstance.put(`/notifications/${id}`, notification);

export const deleteNotification = (id) =>
  axiosInstance.delete(`/notifications/${id}`);

export const incrementNotificationViews = (id) => {
  return axiosInstance.patch(`/notifications/${id}/views`);
};