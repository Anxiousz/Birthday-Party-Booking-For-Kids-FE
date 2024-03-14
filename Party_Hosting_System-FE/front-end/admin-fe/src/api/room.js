import { requestWithAuth } from '../utils/axios';

export const getAllRooms = async () => {
  try {
    const response = await requestWithAuth.get('/api/v1/Room/GetAllRoom');
    return response.data; // Trả về dữ liệu từ API
  } catch (error) {
    console.error('Error fetching rooms:', error);
    throw error; // Hoặc xử lý lỗi theo cách bạn muốn
  }
};

export const postRoomById = async (id) => {
    try {
      // Chèn ID trực tiếp vào URL
      const response = await requestWithAuth.post(`/api/v1/Room/UpdateStatus/${id}`);
      return response.data; // Trả về dữ liệu từ API
    } catch (error) {
      console.error('Error posting room by ID:', error);
      throw error; // Hoặc xử lý lỗi theo cách bạn muốn
    }
};
