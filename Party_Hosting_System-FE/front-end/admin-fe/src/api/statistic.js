import { axiosInstances, requestWithAuth } from 'utils/axios';

export const getTotalRoom = async () => {
  try {
    const response = await requestWithAuth.get('/api/v1/Dashboard/Room/total');
    return response.data;
  } catch (error) {
    console.error('Lỗi khi gọi API:', error);
    return null;
  }
};

export const getTotalPackage = async () => {
  try {
    const response = await requestWithAuth.get('/api/v1/Dashboard/Package/total');
    return response.data;
  } catch (error) {
    console.error('Lỗi khi gọi API:', error);
    return null;
  }
};

export const getTotalAccount = async () => {
  try {
    const response = await requestWithAuth.get('/api/v1/Dashboard/Account/total');
    return response.data;
  } catch (error) {
    console.error('Lỗi khi gọi API:', error);
    return null;
  }
};

export const getStatisticacccount = () => {
  return axiosInstances.login
    .get(`/api/v1/statistic/acccount`)
    .then((response) => {
    const { result, error } = response.data; // Sửa từ `statistics` thành `result`
      if (error) {
        console.error('Lỗi từ API:', error);
        return null;
      } else {
        return result; // Trả về `result` thay vì `statistics`
      }
    })
    .catch((error) => {
      console.error('Lỗi khi gọi API:', error);
      return null;
    });
};
