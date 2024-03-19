// material-ui
import { Typography } from '@mui/material';
import React, { useContext } from 'react';
// Import AuthContext
import { AuthContext } from 'contexts/JWTContexts';

// project imports
import NavGroup from './NavGroup';
import menuItem from 'menu-items';

function getUserRole() {
  const userInfo = localStorage.getItem('USER_INFO');
  if (userInfo) {
    const { role } = JSON.parse(userInfo);
    return role;
  }
  return null;
}
// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const userRole = getUserRole();

  const navItems = menuItem.items
    .map((item) => {
      // Lọc mục menu 'dashboard' dựa trên vai trò người dùng
      if (item.id === 'dashboard' || item.id === 'accountmanage' || item.id === 'manager-manage' ) {
        // Chỉ hiển thị mục 'dashboard' cho người dùng có vai trò là 'admin'
        return userRole === '1' ? <NavGroup key={item.id} item={item} /> : null;
      }

      if (item.id === 'partyhost-manage') {
        // Chỉ hiển thị mục 'dashboard' cho người dùng có vai trò là 'admin'
        return userRole === '3' ? <NavGroup key={item.id} item={item} /> : null;
      }

      // Lọc mục menu 'packages-manage' dựa trên vai trò người dùng
      // if (item.id === 'packages-manage') {
      //   // Chỉ hiển thị mục 'packages-manage' cho người dùng có vai trò là 'admin'
      //   return userRole === '1' ? <NavGroup key={item.id} item={item} /> : null;
      // }

      // Lọc mục menu 'manager-manage' và 'acccount-manage' như trước
      // if (item.id === 'manager-manage' && item.children) {
      //   const filteredChildren = item.children.filter((child) => {
      //     if (child.id === 'Manager-manage') {
      //       return userRole === '1';
      //     } else if (child.id === 'Acccount-manage') {
      //       return userRole === '1';
      //     }
      //     return true;
      //   });

      //   if (filteredChildren.length === 0) {
      //     return null;
      //   }

      //   return <NavGroup key={item.id} item={{ ...item, children: filteredChildren }} />;
      // }

      // Xử lý mục menu 'authentication'
      if (item.id === 'authentication') {
        return !isAuthenticated ? <NavGroup key={item.id} item={item} /> : null;
      }

      // Xử lý các mục menu khác
      return <NavGroup key={item.id} item={item} />;
    })
    .filter(Boolean); // Loại bỏ các giá trị null hoặc undefined

  return <>{navItems}</>;
};

export default MenuList;
