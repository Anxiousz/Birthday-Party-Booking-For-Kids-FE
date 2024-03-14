import dashboard from './dashboard';
import authentication from './authentication';
import other from './other';
import accountManage from './account';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  items: [authentication, dashboard, accountManage, other]
};

export default menuItems;
