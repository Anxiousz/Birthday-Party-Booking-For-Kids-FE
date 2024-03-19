import { requestWithAuth } from '../utils/axios';

function getUserId() {
  const userInfo = localStorage.getItem('USER_INFO');
  if (userInfo) {
    const { id } = JSON.parse(userInfo);
    return id;
  }
  return null;
}

export const getAllPostsByPartyHostId = async (partyHostId) => {
  try {
    const response = await requestWithAuth.get(`/api/v1/Post/GetAllPostByPartyHostId/${partyHostId}`);
    return response.data; // Trả về dữ liệu từ response
  } catch (error) {
    console.error('Error fetching posts by party host ID:', error);
    throw error; // Hoặc xử lý lỗi theo cách bạn muốn
  }
};

export const getAllPosts = async () => {
  try {
    const response = await requestWithAuth.get('/api/v1/Post/getAllPost');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    throw error;
  }
};

export const deletePostById = async (postId) => {
  try {
    const url = `/api/v1/Post/deletePost/${postId}`;
    const response = await requestWithAuth.delete(url);
    console.log('Post deleted successfully:', response.data);
    return response.data; // Trả về dữ liệu phản hồi hoặc một giá trị cụ thể nếu cần
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error; // Ném lỗi để có thể xử lý ở nơi gọi hàm này
  }
};

export const updatePostById = async (postId, postData) => {
  try {
    console.log('postId', postId);
    console.log('postData', postData); 
    const response = await requestWithAuth.put(`/api/v1/Post/updatePost/${postId}`, postData);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi cập nhật bài đăng:', error);
    throw error;
  }
};

export const createNewPost = async (postData) => {
  try {
    const response = await requestWithAuth.post(`/api/v1/Post/createNewPost`, postData);
    return response.data;
  } catch (error) {
    console.error('Failed to create new post:', error);
    throw error;
  }
};
