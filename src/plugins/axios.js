import axios from 'axios';

const options = {
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1',
  responseType: 'json',
};

const axiosInstance = axios.create(options);

// assign token to axios header
if (localStorage.getItem('access')) {
  axiosInstance.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${localStorage.getItem('access')}`;
}

// intercept 401 error
axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.status === 401) {
      window.location.href = '/admin/auth/login/';
    }
  },
);

export default axiosInstance;
