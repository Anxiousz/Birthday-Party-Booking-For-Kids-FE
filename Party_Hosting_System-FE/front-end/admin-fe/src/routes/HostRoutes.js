import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// sample page routing
const RoomManagePH = Loadable(lazy(() => import('views/Room-manage-PH')));
const PostManage = Loadable(lazy(() => import('views/post-manage')));
const MenuManage = Loadable(lazy(() => import('views/menu-manage')));
// ==============================|| MAIN ROUTING ||============================== //

const HostRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
 
    {
      path: 'partyhost-manage',
      children: [
        {
          path: 'Room-manage-PH',
          element: <RoomManagePH />,
        
        },
        {
          path: 'post-manage',
          element: <PostManage />
        },
        {
          path: 'menu-manage',
          element: <MenuManage />
        }
      
  ]
},
  ]
};

export default HostRoutes;
