import { createContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { API_ROOT } from 'utils/constants';
import { jwtDecode } from 'jwt-decode';
import { getUserInfo, setUserInfo } from 'utils/utils';
import { isValidToken, setSession } from 'utils/jwt';

const Types = {
  Login: 'LOGIN',
  Logout: 'LOGOUT'
};

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  role: null
};

const JWTReducer = (state, action) => {
  switch (action.type) {
    case 'INITIALIZE':
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        isInitialized: true,
        user: action.payload.user,
        role: action.payload.user.role // Sử dụng role từ decodedToken
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        role: null
      };
    default:
      return state;
  }
};

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(JWTReducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const token = window.localStorage.getItem('token');
        const userRaw = getUserInfo();
        if (token && isValidToken(token) && userRaw) {
          setSession(token);
          const user = JSON.parse(userRaw);

          // Sử dụng action type 'LOGIN' để khôi phục trạng thái đăng nhập
          dispatch({
            type: Types.Login,
            payload: {
              user
            }
          });
        } else {
          // Nếu không có token hợp lệ hoặc thông tin người dùng, đảm bảo rằng ứng dụng được đặt về trạng thái 'chưa đăng nhập'
          dispatch({
            type: Types.Logout
          });
        }
      } catch (err) {
        console.error(err);
        // Xử lý lỗi, ví dụ: thông báo lỗi hoặc đặt ứng dụng về trạng thái 'chưa đăng nhập'
        dispatch({
          type: Types.Logout
        });
      }
    };

    initialize();
  }, []);

  const login = async (email, password, role) => {
    try {
      let apiEndpoint;
      if (role === '1') { // Admin
        apiEndpoint = '/api/v1/Login/Admin';
      } else if (role === '3') { // PartyHost
        apiEndpoint = '/api/v1/Login/PartyHost';
      } else {
        throw new Error('Role không hợp lệ.');
      }

      const response = await axios.post(`${API_ROOT}${apiEndpoint}`, {
        email, 
        password
      }, {
        headers: {
          'Content-Type': 'application/json' 
        }
      });
      const { token } = response.data;
      const decodedToken = jwtDecode(token);

      const user = {
        id: decodedToken.UserId,
        email: decodedToken.Email,
        name: decodedToken.UserName,
        role: decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
        phone: decodedToken.Phone,
        iat: decodedToken.iat,
        exp: decodedToken.exp
      };
      setSession(token);
      setUserInfo(user);
      navigate('/', { replace: true });
      dispatch({
        type: Types.Login,
        payload: {
          user
        }
      });
    } catch (err) {
      console.error(err);
      throw new Error(err.response.data.message || 'Đăng nhập thất bại.');
    }
  };

  const logout = () => {
    setSession(null);
    dispatch({ type: Types.Logout });
    navigate('/', { replace: true });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
