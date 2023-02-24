import Navbar from './nav/navbar';
import { useEffect } from 'react';
import { setToggleAnnouncement } from '../src/store/user/user.actions';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser, selectToggleUserInfo, selectToggleAnnouncement } from '../src/store/user/user.selector';
import { setCurrentUser } from '../src/store/user/user.actions';
import { setToggleUserInfo } from '../src/store/user/user.actions';
import CreateAnnouncement from './Announcement/createAnnouncement';
import UserInfo_card from './user accounts/UserInfo_card';

const Layout = ({ children }) => {
  const toggleAnnoucement = useSelector(selectToggleAnnouncement);
  const toggleUserInfo = useSelector(selectToggleUserInfo);
  const { user } = useSelector(selectCurrentUser) || {};
  const dispatch = useDispatch();

  return (
    <div className='flex min-h-screen'>
      <Navbar />
      {toggleUserInfo && (
        <UserInfo_card
          mode={'userinfo'}
          id={user?._id}
          setToggle={() => dispatch(setToggleUserInfo(!toggleUserInfo))}
        />
      )}

      {toggleAnnoucement && <CreateAnnouncement setToggleAnnouncement={() => dispatch(setToggleAnnouncement(!toggleAnnoucement))} />}
      <div className='flex-1'>{children}</div>
    </div>
  );
};

export default Layout;
