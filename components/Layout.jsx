import Navbar from './nav/navbar';
import { useEffect } from 'react';
import { setToggleAnnouncement } from '../src/store/user/user.actions';
import { useSelector, useDispatch } from 'react-redux';
import { selectToggleAnnouncement } from '../src/store/user/user.selector';
import { selectCurrentUser } from '../src/store/user/user.selector';
import { setCurrentUser } from '../src/store/user/user.actions';
import CreateAnnouncement from './Announcement/createAnnouncement';

const Layout = ({ children }) => {
  const toggleAnnoucement = useSelector(selectToggleAnnouncement);
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    console.count('layout');
    const checkIsAuth = async () => {
      try {
        const res = await fetch('https://vast-pink-moth-toga.cyclic.app/isAuth', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        });
        console.log('resAuth', res);
        if (!res.ok) {
          dispatch(setCurrentUser(null));
          return;
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkIsAuth();
  }, []);

  return (
    <div className='flex min-h-screen'>
      <Navbar />
      {toggleAnnoucement && <CreateAnnouncement setToggleAnnouncement={() => dispatch(setToggleAnnouncement(!toggleAnnoucement))} />}
      <div className='flex-1'>{children}</div>
    </div>
  );
};

export default Layout;
