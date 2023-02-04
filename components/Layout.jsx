import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { selectCurrentUser } from '../src/store/user/user.selector';
import Navbar from './nav/navbar';
import { persistor } from '../src/store/store';
const Layout = ({ children }) => {
  const router = useRouter();
  const user = useSelector(selectCurrentUser);
  useEffect(() => {
    if (!user) {
      persistor.purge();
    }
  }, [user]);
  return (
    <div className='flex min-h-screen'>
      <Navbar />
      <div className='flex-1'>{children}</div>
    </div>
  );
};

export default Layout;
