import { requestWithAuth } from '../utils/axios';

export const getFeedbackList = async () => {
    try {
      const response = await requestWithAuth.get('https://partyhostingsystems.azurewebsites.net/api/v1/Feedback/listFeedBack');
      return response.data;
    } catch (error) {
      console.error('Error fetching feedback list:', error);
      throw error;
    }
  };