import Swal from 'sweetalert2';

// Cấu hình mặc định cho Toast (thông báo nhỏ hiện ở góc)
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
});

export const alertUtils = {
  // 1. Thông báo thành công nhanh (hiện ở góc)
  success: (title) => {
    Toast.fire({
      icon: 'success',
      title: title
    });
  },

  // 2. Thông báo lỗi (SỬA LẠI: Nếu có 2 tham số thì hiện Modal to, 1 tham số hiện Toast)
  error: (title, text) => {
    if (text) {
      Swal.fire({
        icon: 'error',
        title: title,
        text: text,
        confirmButtonColor: '#d33',
        confirmButtonText: 'Đã hiểu'
      });
    } else {
      Toast.fire({
        icon: 'error',
        title: title
      });
    }
  },

  // 3. Thông báo cảnh báo (hiện giữa màn hình)
  info: (title, text) => {
    Swal.fire({
      icon: 'info',
      title: title,
      text: text,
      confirmButtonColor: '#3085d6',
    });
  },

  // 4. Xác nhận xóa
  confirmDelete: async (title, text) => {
    const result = await Swal.fire({
      title: title || 'Bạn có chắc chắn không?',
      text: text || "Hành động này không thể hoàn tác!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Có, xóa nó!',
      cancelButtonText: 'Hủy'
    });
    return result.isConfirmed;
  }
};