// assets
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

// constant

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const accountManage = {
  id: 'accountmanage',
  title: 'Quản lý Account',
  type: 'group',
  children: [
    {
      id: 'staffpage',
      title: 'Staff',
      type: 'item',
      icon: SupervisorAccountIcon,
      url: '/account-manage/staffpage',
      breadcrumbs: false
    },
    {
      id: 'partyhostpage',
      title: 'PartyHost',
      type: 'item',
      icon: SupervisorAccountIcon,
      url: '/account-manage/partyhostpage',
      breadcrumbs: false
    },
    {
      id: 'userpage',
      title: 'User',
      type: 'item',
      icon: SupervisorAccountIcon,
      url: '/account-manage/userpage',
      breadcrumbs: false
    }
  ]
};

export default accountManage;
