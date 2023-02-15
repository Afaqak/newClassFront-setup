import Navbar from './nav/navbar';
import { setToggleAnnouncement } from '../src/store/user/user.actions';
import { useSelector, useDispatch } from 'react-redux';
import { selectToggleAnnouncement } from '../src/store/user/user.selector';
import CreateAnnouncement from './Announcement/createAnnouncement';

const Layout = ({ children }) => {
  const toggleAnnoucement = useSelector(selectToggleAnnouncement);
  const dispatch = useDispatch();
  return (
    <div className='flex min-h-screen'>
      <Navbar />
      {toggleAnnoucement && <CreateAnnouncement setToggleAnnouncement={() => dispatch(setToggleAnnouncement(!toggleAnnoucement))} />}
      <div className='flex-1'>{children}</div>
    </div>
  );
};

export default Layout;
