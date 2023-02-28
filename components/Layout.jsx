import { Navbar, NavPhone } from './nav/navbar';
import { useEffect, useState } from 'react';
import { setToggleAnnouncement } from '../src/store/user/user.actions';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser, selectToggleUserInfo, selectToggleAnnouncement } from '../src/store/user/user.selector';
import { setToggleUserInfo } from '../src/store/user/user.actions';
import CreateAnnouncement from './Announcement/createAnnouncement';
import UserInfo_card from './user accounts/UserInfo_card';
import { motion } from 'framer-motion';

const Layout = ({ children }) => {
  const toggleAnnoucement = useSelector(selectToggleAnnouncement);
  const toggleUserInfo = useSelector(selectToggleUserInfo);
  const { user } = useSelector(selectCurrentUser) || {};
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);

  return (
    <div className='flex min-h-screen'>
      <div className='sm:hidden fixed top-1 right-2 z-[2000]'>
        <motion.div
          onClick={() => setToggle(!toggle)}
          className='flex flex-col space-y-1 justify-end items-end p-3'
        >
          <motion.button
            animate={{ rotate: toggle ? 45 : 0 }}
            className={`line-3 h-[0.20rem] w-6  ${toggle ? ' bg-slate-900' : 'bg-purple-500'}`}
          ></motion.button>
          <motion.button
            animate={{ rotate: toggle ? -45 : 0, translateY: toggle ? -4 : 0 }}
            className={`line-3 h-[0.20rem] w-6  ${toggle ? 'bg-purple-500' : 'bg-slate-900'}`}
          ></motion.button>
        </motion.div>
      </div>
      <Navbar />
      <NavPhone toggle={toggle} />
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
