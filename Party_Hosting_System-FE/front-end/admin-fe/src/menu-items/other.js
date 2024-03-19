// assets
import { IconBrandChrome, IconHelp, IconUser } from '@tabler/icons';
// import DriveEtaIcon from '@mui/icons-material/DriveEta';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import FoundationIcon from '@mui/icons-material/Foundation';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import FeedbackIcon from '@mui/icons-material/Feedback';

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
    },
    {
      id: 'Menu-manage-AD',
      title: 'Quản lý Menu',
      type: 'item',
      url: '/menu-manage-AD',
      icon: MenuBookIcon,
      breadcrumbs: false
    },
    {
      id: 'Post-manage-AD',
      title: 'Quản lý Bài Viết',
      type: 'item',
      url: '/post-manage-AD',
      icon: NoteAddIcon,
      breadcrumbs: false
    },
    // {
    //   id: 'Feedback-manage',
    //   title: 'Quản lý Feedback',
    //   type: 'item',
    //   url: '/feedback-manage',
    //   icon: FeedbackIcon,
    //   breadcrumbs: false
    // }
  ]
};

export default other;
