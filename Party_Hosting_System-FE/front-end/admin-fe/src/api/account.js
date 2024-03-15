import { requestWithAuth } from '../utils/axios'; // Giả sử bạn đã có sẵn cấu hình này

export const getAllStaff = async () => {
  try {
    const url = '/api/v1/Dashboard/Staff';
    const response = await requestWithAuth.get(url);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi gọi API:', error);
    return null;
  }
};

export const createStaff = async (staffData) => {
  try {
    const url = '/api/v1/Dashboard/Staff';
    const response = await requestWithAuth.post(url, staffData);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi tạo nhân viên:', error);
    return null;
  }
};

export const deleteStaffById = async (id) => {
  try {
    // Cập nhật URL để sử dụng `id` trong đường dẫn
    const url = `/api/v1/Dashboard/Staff/${id}`;
    const response = await requestWithAuth.delete(url);
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
    return response.data;
  } catch (error) {
    console.error('Lỗi khi gọi API lấy thông tin người dùng đã đăng ký:', error);
    return null;
  }
};

export const deleteRegisteredUserById = async (id) => {
  try {
    const url = `/api/v1/Dashboard/RegisteredUser/${id}`;
    const response = await requestWithAuth.delete(url);
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
    return response.data;
  } catch (error) {
    console.error('Lỗi khi gọi API:', error);
    return null;
  }
};

export const deletePartyHostById = async (id) => {
  try {
    const url = `/api/v1/Dashboard/PartyHost/${id}`;
    const response = await requestWithAuth.delete(url);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi xóa Party Host:', error);
    return null;
  }
};

export const createPartyHost = async (partyHostData) => {
  try {
    const url = '/api/v1/Dashboard/PartyHost';
    const response = await requestWithAuth.post(url, partyHostData);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi tạo Party Host:', error);
    return null;
  }
};
