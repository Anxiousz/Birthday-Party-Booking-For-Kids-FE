import { axiosInstances, requestWithAuth } from 'utils/axios';

export const getTotalRoom = async () => {
  try {
    const response = await requestWithAuth.get('/api/v1/Dashboard/Room/total');
    console.log('Dữ liệu nhận được:', response.data);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi gọi API:', error);
    return null;
  }
};

export const getTotalPackage = async () => {
  try {
    const response = await requestWithAuth.get('/api/v1/Dashboard/Package/total');
    console.log('Dữ liệu nhận được:', response.data);
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
      console.log('Dữ liệu nhận được:', response.data);
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

export const getStatisticReview = () => {
  return axiosInstances.login
    .get(`/api/v1/statistic/review`)
    .then((response) => {
      console.log('Dữ liệu nhận được:', response.data);
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
