import { requestWithAuth } from '../utils/axios';

export const getPackages = async () => {
  try {
    const response = await requestWithAuth.get('/api/v1/Dashboard/Package'); // Thay đổi URL phù hợp với endpoint của bạn
    return response.data; // Trả về dữ liệu nhận được
  } catch (error) {
    console.error('Error fetching packages:', error);
    throw error; // Hoặc xử lý lỗi theo cách bạn muốn
  }
};

export const createPackage = async (packageData) => {
  try {
    const response = await requestWithAuth.post('/api/v1/Dashboard/Package', packageData);
    return response.data; // Trả về dữ liệu nhận được từ API
  } catch (error) {
    console.error('Error creating package:', error);
    throw error; // Hoặc xử lý lỗi theo cách bạn muốn
  }
};

export const deletePackageById = async (id) => {
  try {
    // Sử dụng phương thức DELETE và truyền id qua query string
    const response = await requestWithAuth.delete(`/api/v1/Dashboard/Package?id=${id}`);
    return response.data; // Trả về dữ liệu từ API
  } catch (error) {
    console.error('Error deleting package by ID:', error);
    throw error; // Hoặc xử lý lỗi theo cách bạn muốn
  }
};

export const editPackage = async (packageData) => {
  try {
    const response = await requestWithAuth.put(`/api/v1/Dashboard/Package`, packageData);
    return response.data; // Trả về dữ liệu nhận được từ API
  } catch (error) {
    console.error('Error editing package:', error);
    throw error; // Hoặc xử lý lỗi theo cách bạn muốn
  }
};