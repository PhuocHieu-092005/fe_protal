import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api",
  timeout: 20000, //max 20s
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response Interceptor - Xử lý lỗi chung
// axiosInstance.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         const { response } = error;

//         // Xử lý các lỗi phổ biến
//         if (response) {
//             if (response.status === 401) {
//                 // Token hết hạn hoặc không hợp lệ
//                 localStorage.removeItem('access_token');
//                 // Redirect về login (tùy framework bạn dùng)
//                 window.location.href = '/login';
//                 return Promise.reject(new Error('Phiên đăng nhập đã hết hạn'));
//             }

//             if (response.status === 400) {
//                 // Lỗi validation hoặc lỗi business (ví dụ: role sai)
//                 const message = response.data?.message || 'Dữ liệu không hợp lệ';
//                 return Promise.reject(new Error(message));
//             }

//             if (response.status === 403) {
//                 return Promise.reject(new Error('Bạn không có quyền thực hiện hành động này'));
//             }
//         }

//         // Lỗi mạng hoặc server không phản hồi
//         return Promise.reject(
//             error.message === 'Network Error'
//                 ? new Error('Không thể kết nối đến server. Vui lòng kiểm tra mạng.')
//                 : error
//         );
//     }
// );

export default axiosInstance;
