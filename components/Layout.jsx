import Navbar from './nav/navbar';

const Layout = ({ children }) => {
  return (
    <div className='flex min-h-screen'>
      <Navbar />
      <div className='flex-1'>{children}</div>
    </div>
  );
};

export default Layout;
