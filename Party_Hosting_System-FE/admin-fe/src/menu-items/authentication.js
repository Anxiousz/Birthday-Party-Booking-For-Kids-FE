// assets
import { IconKey } from '@tabler/icons';

// constant
const icons = {
  IconKey
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const authentication = {
  id: 'authentication',
  title: 'Login',
  caption: 'Bạn cần phải đăng nhập',
  type: 'group',
  children: [
    {
      id: 'login3',
      title: 'Đăng nhập',
      type: 'item',
      url: '/pages/login/login3',
      icon: icons.IconKey
    }
  ]
};

export default authentication;
