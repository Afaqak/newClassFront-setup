import Navbar from './nav/navbar';
import { setToggleAnnouncement } from '../src/store/user/user.actions';
import { useSelector, useDispatch } from 'react-redux';
import { selectToggleAnnouncement } from '../src/store/user/user.selector';
import CreateAnnouncement from './Announcement/createAnnouncement';
import GroupAnnouncement from './Announcement/GroupAnnouncement';
import { selectToggleGroupAnnouncement } from '../src/store/user/user.selector';
const Layout = ({ children }) => {
  const toggleGroupAnnoucement = useSelector(selectToggleGroupAnnouncement);
  const toggleAnnoucement = useSelector(selectToggleAnnouncement);
  const dispatch = useDispatch();
  return (
    <div className='flex min-h-screen'>
      <Navbar />
      {toggleAnnoucement && <CreateAnnouncement setToggleAnnouncement={() => dispatch(setToggleAnnouncement(!toggleAnnoucement))} />}
      <div className={`flex fixed top-0 right-0 z-[100] ${toggleAnnoucement && 'overflow-y-scroll'} h-screen flex-col w-[70%]  md:w-1/3`}>{toggleGroupAnnoucement && <GroupAnnouncement />}</div>

      <div className='flex-1'>{children}</div>
    </div>
  );
};

export default Layout;
