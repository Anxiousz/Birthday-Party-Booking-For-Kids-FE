import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';



// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// sample page routing
const ManagerManagement = Loadable(lazy(() => import('views/manager-manage')));
const AccountManagement = Loadable(lazy(() => import('views/account-manage')));
const PartyHostPage = Loadable(lazy(() => import('views/account-manage/partyhostpage')));
const StaffPage = Loadable(lazy(() => import('views/account-manage/staffpage')));
const UserPage = Loadable(lazy(() => import('views/account-manage/userpage')));
const PackagesManagement = Loadable(lazy(() => import('views/packages-manage')));
const RoomManagement = Loadable(lazy(() => import('views/room-manage')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'manager-manage',
      element: <ManagerManagement />
    },
    {
      path: 'account-manage',
      children: [
        {
          path: 'staffpage',
          element: <StaffPage />
        },
        {
          path: 'partyhostpage',
          element: <PartyHostPage />
        },
        {
          path: 'userpage',
          element: <UserPage />
        }
      ]
    },
    {
      path: 'packages-manage',
      element: <PackagesManagement />
    },
    {
      path: 'room-manage',
      element: <RoomManagement />
    }
  ]
};

export default MainRoutes;
