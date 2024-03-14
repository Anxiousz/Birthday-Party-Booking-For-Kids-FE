import { requestWithAuth } from '../utils/axios'; // Giả sử bạn đã có sẵn cấu hình này

export const getAllStaff = async () => {
  try {
    const url = '/api/v1/Dashboard/Staff';
    const response = await requestWithAuth.get(url);
    console.log('Dữ liệu nhận được từ API:', response.data);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi gọi API:', error);
    return null; 
  }
};

export const createStaff = async (staffData) => {
  try {
    // Định nghĩa URL kết nối đến API
    const url = '/api/v1/Dashboard/Staff';
    // Gửi yêu cầu POST đến API với dữ liệu nhân viên
    const response = await requestWithAuth.post(url, staffData);
    console.log('Tạo nhân viên thành công:', response.data);
    // Trả về dữ liệu nhận được từ API
    return response.data;
  } catch (error) {
    console.error('Lỗi khi tạo nhân viên:', error);
    // Trả về null nếu có lỗi
    return null;
  }
};

export const deleteStaffById = async (id) => {
  try {
    // Cập nhật URL để sử dụng `id` trong đường dẫn
    const url = `/api/v1/Dashboard/Staff/${id}`;
    const response = await requestWithAuth.delete(url);
    console.log('Xóa nhân viên thành công:', response.data);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi xóa nhân viên:', error);
    return null;
  }
};

export const getRegisteredUsers = async () => {
  try {
    const url = '/api/v1/Dashboard/RegisteredUser';
    const response = await requestWithAuth.get(url);
    console.log('Dữ liệu người dùng đã đăng ký nhận được từ API:', response.data);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi gọi API lấy thông tin người dùng đã đăng ký:', error);
    return null;
  }
};

export const deleteRegisteredUserById = async (id) => {
  try {
    // Sử dụng template string để chèn ID vào URL
    const url = `/api/v1/Dashboard/RegisteredUser/${id}`;
    const response = await requestWithAuth.delete(url);
    console.log('Xóa người dùng đã đăng ký thành công:', response.data);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi xóa người dùng đã đăng ký:', error);
    return null;
  }
};

export const createUser = async (userData) => {
  try {
    const url = '/api/v1/Dashboard/RegisteredUser';
    const response = await requestWithAuth.post(url, userData);
    console.log('Tạo người dùng thành công:', response.data);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi tạo người dùng:', error);
    return null;
  }
};

export const getPartyHosts = async () => {
  try {
    const url = '/api/v1/Dashboard/PartyHost';
    const response = await requestWithAuth.get(url);
    console.log('Dữ liệu nhận được từ API:', response.data);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi gọi API:', error);
    return null; 
  }
};

export const deletePartyHostById = async (id) => {
  try {
    // Sử dụng template string để chèn ID vào URL
    const url = `/api/v1/Dashboard/PartyHost/${id}`;
    // Thực hiện yêu cầu DELETE với requestWithAuth
    const response = await requestWithAuth.delete(url);
    console.log('Xóa Party Host thành công:', response.data);
    // Trả về dữ liệu nhận được từ API
    return response.data;
  } catch (error) {
    console.error('Lỗi khi xóa Party Host:', error);
    // Trả về null nếu có lỗi
    return null;
  }
};

export const createPartyHost = async (partyHostData) => {
  try {
    // Định nghĩa URL kết nối đến API
    const url = '/api/v1/Dashboard/PartyHost';
    // Gửi yêu cầu POST đến API với dữ liệu party host
    const response = await requestWithAuth.post(url, partyHostData);
    console.log('Tạo Party Host thành công:', response.data);
    // Trả về dữ liệu nhận được từ API
    return response.data;
  } catch (error) {
    console.error('Lỗi khi tạo Party Host:', error);
    // Trả về null nếu có lỗi
    return null;
  }
};