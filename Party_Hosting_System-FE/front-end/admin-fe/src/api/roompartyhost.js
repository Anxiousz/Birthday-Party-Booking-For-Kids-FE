import { requestWithAuth } from '../utils/axios';

function getUserId() {
  const userInfo = localStorage.getItem('USER_INFO');
  if (userInfo) {
    const { id } = JSON.parse(userInfo);
    return id;
  }
  return null;
}

export const getRoomPartyHostById = async () => {
  const id = getUserId();
  try {
    const response = await requestWithAuth.get(`/api/v1/Room/GetRoomPartyHost/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching room for PartyHost:', error);
    throw error;
  }
};

export const updateRoom = async (roomData) => {
  try {
    console.log('roomData', roomData);
    const response = await requestWithAuth.post('/api/v1/Room/UpdateRoom', roomData);
    return response.data; // Trả về dữ liệu từ phản hồi của API
  } catch (error) {
    console.error('Error updating room:', error);
    throw error; // Ném lỗi để có thể xử lý ở nơi gọi hàm
  }
};

export const postRoomById = async (roomId) => {
  try {
    const response = await requestWithAuth.post(`/api/v1/Room/UpdateStatus/${roomId}`);
    return response.data;
  } catch (error) {
    console.error('Error updating room status:', error);
    throw error;
  }
};

export const createRoom = async (roomData) => {
  try {
    console.log('roomData', roomData);
    const response = await requestWithAuth.post('/api/v1/Room/Create', roomData);

    return response.data;
  } catch (error) {
    console.error('Error creating room:', error);
    throw error;
  }
};

export const getAllRooms = async () => {
  try {
    const response = await requestWithAuth.get('/api/v1/Room/GetAllRoom');
    return response.data;
  } catch (error) {
    console.error('Error fetching all rooms:', error);
    throw error;
  }
};

export const updateRoomStatusById = async (roomId, statusData) => {
  try {
    const response = await requestWithAuth.put(`/api/v1/Room/UpdateStatus/${roomId}`, statusData);
    return response.data;
  } catch (error) {
    console.error('Error updating room status:', error);
    throw error;
  }
};