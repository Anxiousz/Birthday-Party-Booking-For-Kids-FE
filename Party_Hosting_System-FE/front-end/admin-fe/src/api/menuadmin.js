import { requestWithAuth } from '../utils/axios';

export const getAllFoodByAdmin = async () => {
    try {
      const response = await requestWithAuth.get('/api/v1/MenuPartyHost/GetAllFoodByAdmin');
      return response.data;
    } catch (error) {
      console.error('Error fetching food data:', error);
      throw error;
    }
  };