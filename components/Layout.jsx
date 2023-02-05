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
      {toggleAnnoucement && (
        <CreateAnnouncement
          setToggleAnnouncement={() => dispatch(setToggleAnnouncement())}
          toggleAnnouncement={toggleAnnoucement}
        />
      )}
      <div className='flex overflow-y-none absolute top-32 right-5 z-[2000] bg-blue-50 flex-col min-w-2/5 min-md:w-1/5'>{toggleGroupAnnoucement && <GroupAnnouncement />}</div>

      <div className='flex-1'>{children}</div>
    </div>
  );
};

export default Layout;
