import { requestWithAuth } from '../utils/axios';

// Hàm lấy tất cả thông tin tài khoản
export const getAllAccounts = async () => {
  try {
    const response = await requestWithAuth({
      method: 'GET',
      url: '/api/v1/Dashboard/Account/total',
    });
    // Trả về dữ liệu nếu request thành công
    return response.data;
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error('Error fetching accounts:', error);
    throw error;
  }
};

export const getAllPackages = async () => {
    try {
      const response = await requestWithAuth({
        method: 'GET',
        url: '/api/v1/Dashboard/Package/total',
      });
      // Trả về dữ liệu nếu request thành công
      return response.data;
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error('Error fetching packages:', error);
      throw error;
    }
  };