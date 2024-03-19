
import FoundationIcon from '@mui/icons-material/Foundation';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import MenuBookIcon from '@mui/icons-material/MenuBook';

const partyhost = {
  id: 'partyhost-manage',
  title: 'PartyHost',
  type: 'group',
  children: [
    {
      id: 'Room-manage-PH',
      title: 'Room',
      type: 'item', 
      url: '/partyhost-manage/Room-manage-PH',
      icon: FoundationIcon,
      breadcrumbs: false,
    },
    {
      id: 'post-manage',
      title: 'Post',
      type: 'item', 
      url: '/partyhost-manage/post-manage',
      icon: NoteAddIcon,
      breadcrumbs: false
    },
    {
      id: 'menu-manage',
      title: 'Menu',
      type: 'item', 
      url: '/partyhost-manage/menu-manage',
      icon: MenuBookIcon,
      breadcrumbs: false
    }
  ]
};

export default partyhost;