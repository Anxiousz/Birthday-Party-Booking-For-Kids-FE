export function formatVND(value) {
    // Sử dụng Intl.NumberFormat để định dạng tiền tệ theo khu vực Việt Nam (vi-VN)
    // và loại tiền tệ là Việt Nam Đồng (VND).
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      // Bạn có thể thêm các option khác như minimumFractionDigits để kiểm soát số chữ số thập phân
    }).format(value);
  };

  export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
  
    return `${hours}:${minutes} | ${day}-${month}-${year}`;
  };
  