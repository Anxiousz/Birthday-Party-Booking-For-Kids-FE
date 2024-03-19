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
const MenuManageAD = Loadable(lazy(() => import('views/menu-manage-AD')));
const PostManageAD = Loadable(lazy(() => import('views/post-manage-AD')));
const FeedbackManage = Loadable(lazy(() => import('views/feedback-manage')));

// ==============================|| MAIN ROUTING ||============================== //

// Fixed the missing closing bracket in the MainRoutes object
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
    },
    {
      path: 'menu-manage-AD',
      element: <MenuManageAD />
    },
    {
      path: 'post-manage-AD',
      element: <PostManageAD />
    },
    {
      path: 'feedback-manage',
      element: <FeedbackManage />
    }
  ]
}

export default MainRoutes;
