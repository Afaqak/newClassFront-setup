import React from 'react';
import { useSelector } from 'react-redux';
import Target from '../Links';
import { useRouter } from 'next/router';
import { setCoursesData } from '../../src/store/courses/courses.action';
import { useDispatch } from 'react-redux';
import { setToggleAnnouncement } from '../../src/store/user/user.actions';
import { selectToggleAnnouncement, selectToggleUserInfo, selectCurrentUser } from '../../src/store/user/user.selector';
import { setCurrentUser } from '../../src/store/user/user.actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { setToggleUserInfo } from '../../src/store/user/user.actions';
import { faSignOutAlt, faUserGroup, faBookOpen, faClipboard, faBroadcastTower } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

const Navbar = () => {
  const router = useRouter();
  const toggleUserInfo = useSelector(selectToggleUserInfo);
  console.log('toggleUserInfo', toggleUserInfo);
  const toggleAnnouncement = useSelector(selectToggleAnnouncement);
  const [activeLink, setActiveLink] = React.useState(router.pathname);
  const dispatch = useDispatch();
  const { user, token } = useSelector(selectCurrentUser) || {};

  const logout = () => {
    setTimeout(() => {
      dispatch(setCurrentUser(null));
      dispatch(setCoursesData(null));
    }, 1000);
  };

  const showUser = () =>
    user.admin ? (
      <Target
        onClick={() => setActiveLink('/accounts')}
        href={`/accounts?id=${token}`}
        label='Accounts'
        className={`${NavStyles.flexDex} ${activeLink === '/accounts' ? 'bg-blue-600 text-white' : ''}`}
        icon={faUserGroup}
      />
    ) : (
      <></>
    );

  if (!user) return null;
  return (
    <nav className='hidden sm:block'>
      <div
        className='text-gray-600 mt-14 sm:min-h-[100vh] p-2 w-[5rem] md:w-[14rem] 
      shadow-md bg-white border dark:border-blue-500 m-2 sm:m-0 
       transition-all duration-300 ease-in-out
    '
      >
        <div
          className='hidden px-2 py-2 md:flex mb-2 space-x-2
            border-b 
          '
        >
          <div>
            <h2 className='text-[0.67rem] text-slate-600'>{user?.admin ? <span className='text-[#404145] font-bold'>Admin</span> : <span className='text-gray-600 font-bold'>User</span>}</h2>
            <h2 className='text-[1rem] tracking-wider text-slate-600'>{user?.username}</h2>
          </div>
          <div
            className='
            rounded-full w-10 h-10 bg-gray-200 cursor-pointer flex items-center justify-center
          '
          >
            <Image
              onClick={() => dispatch(setToggleUserInfo(!toggleUserInfo))}
              src={'/user8.png'}
              width={50}
              height={50}
              className='
            '
            />
          </div>
        </div>

        <div
          className={`${NavStyles.linkContainer} cursor-pointer
            -space-y-2 sm:space-y-2 text-md flex flex-col justify-center 
            sm:justify-start sm:items-start list-none mx-1 md:mx-0
            `}
        >
          <Target
            onClick={() => setActiveLink('/')}
            href='/'
            icon={faClipboard}
            className={`${NavStyles.flexDex} mt-2 md:0 ${activeLink === '/' ? 'bg-blue-600 text-white' : ''}`}
            label='Dashboard'
          />
          {showUser()}
          <Target
            onClick={() => setActiveLink('/courses')}
            icon={faBookOpen}
            href='/courses'
            className={`${NavStyles.flexDex} ml-1 md:ml-0 ${activeLink === '/courses' ? 'bg-blue-600 text-white' : ''}`}
            label='Courses'
          />
          <div
            className={`${NavStyles.flexDex} ml-1 md:ml-0 ${activeLink === '/broadcast' ? 'bg-blue-600 text-white' : ''}`}
            onClick={() => {
              dispatch(setToggleAnnouncement(!toggleAnnouncement));
              setActiveLink('/broadcast');
            }}
          >
            <FontAwesomeIcon
              className='w-6 h-6'
              icon={faBroadcastTower}
            />
            <span className='ml-2 hidden md:block'>Announcements</span>
          </div>
        </div>
        <div
          className={` mt-10 px-3 py-3 space-x-2 cursor-pointer text-red-400
            hover:text-red-500 transition-all duration-300 ease-in-out
            `}
          onClick={() => {
            logout();
            setTimeout(() => {
              setActiveLink('/');
            }, 1000);
          }}
        >
          <FontAwesomeIcon
            className='w-6 h-6'
            icon={faSignOutAlt}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

const NavStyles = {
  flexDex: `link flex space-x-2 p-3 w-full`,
  linkContainer: `space-y-4 sm:space-y-4 flex flex-col justify-center
    transition-all duration-300 ease-in-out`,
};
