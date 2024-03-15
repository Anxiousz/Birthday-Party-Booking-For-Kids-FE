import { useEffect } from 'react';
import { getUserInfo } from '../utils/utils';
import { useNavigate } from 'react-router';

const useCheckUserInfo = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = getUserInfo();
    if (!userInfo) {
      navigate('/pages/login/login3');
    }
  }, [navigate]);
};

export default useCheckUserInfo;
