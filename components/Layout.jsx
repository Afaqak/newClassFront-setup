import { useEffect } from 'react';
import Navbar from './nav/navbar';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

const Layout = ({ children }) => {
  const user = useSelector((state) => state.user);
  useEffect(() => {
    if (!user) {
      router.push('/login');
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
