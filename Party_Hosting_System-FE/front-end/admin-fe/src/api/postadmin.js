import { requestWithAuth } from '../utils/axios';

export const getAllPosts = async () => {
    try {
      const response = await requestWithAuth.get('/api/v1/Post/getAllPost');
      return response.data; // Trả về dữ liệu nhận được từ server
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error; // Ném lỗi để có thể xử lý ở nơi gọi hàm này
    }
  };

