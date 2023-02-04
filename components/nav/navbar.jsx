import React from 'react';
import { useSelector } from 'react-redux';
import Target from '../Links';
import { setCoursesData } from '../../src/store/courses/courses.action';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../../src/store/user/user.actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faUser, faUserGroup, faBookOpen, faSchool, faBroadcastTower } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.currentUser?.user);

  const logout = () => {
    setTimeout(() => {
      dispatch(setCurrentUser(null));
      dispatch(setCoursesData(null));
    }, 1000);
  };

  const showUser = () =>
    user.admin ? (
      <Target
        href='/accounts'
        label='Accounts'
        className={`${NavStyles.flexDex}`}
        icon={faUserGroup}
      />
    ) : (
      <></>
    );

  if (!user) return null;
  return (
    <nav>
      <div
        className='text-gray-600 mt-14 sm:min-h-[100vh] p-2 w-[5rem] md:w-[14rem] 
      shadow-md bg-white border dark:border-blue-500 m-2 sm:m-0
       transition-all duration-300 ease-in-out
    '
      >
        <div
          className='hidden flex-col px-2 py-2 md:flex mb-2 
            border-b 
          '
        >
          <h2 className='text-[0.67rem] text-slate-600'>{user?.admin ? <span className='text-[#404145] font-bold'>Admin</span> : <span className='text-gray-600 font-bold'>User</span>}</h2>
          <h2 className='font-bold text-blue-500 text-2xl uppercase'>{user?.username}</h2>
        </div>
        <div
          className={`${NavStyles.linkContainer} cursor-pointer
            -space-y-2 sm:space-y-2 text-md flex flex-col justify-center 
            sm:justify-start sm:items-start list-none mx-1 md:mx-0
            `}
        >
          <Target
            href='/'
            icon={faSchool}
            className={`${NavStyles.flexDex} mt-2 md:0`}
            label='Dashboard'
          />
          <Target
            icon={faUser}
            href='/account'
            className={`${NavStyles.flexDex} ml-1 md:ml-0`}
            label='Account'
          />
          {showUser()}
          <Target
            icon={faBookOpen}
            href='/courses'
            className={`${NavStyles.flexDex}`}
            label='Courses'
          />
          <Target
            icon={faBroadcastTower}
            href='/broadcast'
            className={`${NavStyles.flexDex}`}
            label='Announcements'
          />
        </div>
        <div
          className={` mt-10 px-3 py-3 space-x-2 cursor-pointer text-red-400
            hover:text-red-500 transition-all duration-300 ease-in-out
            `}
          onClick={logout}
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
