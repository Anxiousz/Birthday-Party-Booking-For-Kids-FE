// assets
import { IconBrandChrome, IconHelp, IconUser } from '@tabler/icons';
// import DriveEtaIcon from '@mui/icons-material/DriveEta';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import FoundationIcon from '@mui/icons-material/Foundation';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// constant
const icons = { IconBrandChrome, IconHelp, IconUser };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
  id: 'manager-manage',
  type: 'group',
  children: [
    {
      id: 'Packages-manage',
      title: 'Quản lý Packages',
      type: 'item',
      url: '/Packages-manage',
      icon: Inventory2Icon,
      breadcrumbs: false
    },
    {
      id: 'Room-manage',
      title: 'Quản lý Room',
      type: 'item',
      url: '/Room-manage',
      icon: FoundationIcon,
      breadcrumbs: false
    }
  ]
};

export default other;
