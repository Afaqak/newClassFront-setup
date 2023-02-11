import Navbar from './nav/navbar';
import { setToggleAnnouncement } from '../src/store/user/user.actions';
import { useSelector, useDispatch } from 'react-redux';
import { selectToggleAnnouncement } from '../src/store/user/user.selector';
import CreateAnnouncement from './Announcement/createAnnouncement';
import { selectCurrentUser } from '../src/store/user/user.selector';
import GroupAnnouncement from './Announcement/GroupAnnouncement';
import { selectToggleGroupAnnouncement } from '../src/store/user/user.selector';
const Layout = ({ children }) => {
  const toggleGroupAnnoucement = useSelector(selectToggleGroupAnnouncement);
  const user = useSelector(selectCurrentUser);
  const toggleAnnoucement = useSelector(selectToggleAnnouncement);
  const dispatch = useDispatch();
  return (
    <div className='flex min-h-screen'>
      <Navbar />
      {toggleAnnoucement && <CreateAnnouncement setToggleAnnouncement={() => dispatch(setToggleAnnouncement(!toggleAnnoucement))} />}
      <div
        className={`flex fixed transition-all duration-300 ease-in-out
      ${toggleGroupAnnoucement ? 'right-0' : '-right-[50%] '}
      top-0 z-[40] overflow-y-scroll flex-col w-[70%] ease-out h-screen  md:w-1/3`}
      >
        {<GroupAnnouncement />}
      </div>

      <div className='flex-1'>{children}</div>
    </div>
  );
};

export default Layout;
