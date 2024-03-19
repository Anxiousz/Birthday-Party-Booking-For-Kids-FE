import { requestWithAuth } from '../utils/axios';

export const getAllMenuPartyHost = async () => {
  try {
    const response = await requestWithAuth.get('/api/v1/MenuPartyHost/GetAllMenuPartyHost');
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu Menu Party Host:', error);
    throw error;
  }
};

export const createMenuPartyHost = async (menuData) => {
  try {
    const response = await requestWithAuth.post('/api/v1/MenuPartyHost/CreateMenuPartyHost', menuData);
    return response.data;
  } catch (error) {
    console.error('Failed to create menu party host:', error);
    throw error;
  }
};

// export const deleteMenu = async (menuId) => {
//   try {
//     const response = await requestWithAuth.delete(`/api/v1/MenuPartyHost/DeleteV2/${menuId}`);
//     return response.data;
//   } catch (error) {
//     console.error('Failed to delete menu:', error);
//     throw error;
//   }
// };

export const updateMenuPartyHostV2 = async (menuData) => {
  try {
    const response = await requestWithAuth.post('/api/v1/MenuPartyHost/UpdateMenuPartyHostV2', menuData);
    return response.data;
  } catch (error) {
    console.error('Failed to update Menu Party Host V2:', error);
    throw error;
  }
};

// export const getOneFood = async (foodId) => {
//   try {
//     const response = await requestWithAuth.get(`/api/v1/MenuPartyHost/GetOneFood/${foodId}`);
//     return response.data;
//   } catch (error) {
//     console.error('Failed to get food details:', error);
//     throw error;
//   }
// };

export const getMenuByPartyHostId = async (id) => {
  try {
    const response = await requestWithAuth.get(`/api/v1/MenuPartyHost/PartyHostId?partyHostid=${id}`);
    console.log('response.data', response.data); //
    return response.data; // Trả về dữ liệu nhận được từ API
  } catch (error) {
    console.error('Error fetching menu by party host id:', error);
    throw error; // Ném lỗi để có thể xử lý ở nơi gọi hàm
  }
};

// export const updateRoom = async (roomData) => {
//   try {
//     const response = await requestWithAuth.put('/api/v1/Room/UpdateRoom', roomData);
//     return response.data;
//   } catch (error) {
//     console.error('Error updating room:', error);
//     throw error;
//   }
// };
