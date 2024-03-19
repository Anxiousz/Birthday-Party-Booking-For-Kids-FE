import { requestWithAuth } from '../utils/axios';

export const getAllRoomsAdmin = async () => {
  try {
    const response = await requestWithAuth.get('/api/v1/Room/GetAllRoomAdmin');
    return response.data; // Trả về dữ liệu từ API
  } catch (error) {
    console.error('Error fetching rooms for admin:', error);
    throw error; // Hoặc xử lý lỗi theo cách bạn muốn
  }
};


