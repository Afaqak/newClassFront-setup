import React from 'react';
import useFetchUsers from '../../src/customHooks/useFetchUsers.h';
import { LinearProgress } from '@mui/material';
import { selectCurrentUser } from '../../src/store/user/user.selector';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import withAuth from '../../components/withAuth';

const Accounts = () => {
  const router = useRouter();
  const { users, loading, mount, user, userData } = useFetchUsers();
  const { admin, teacher } = user || {};

  const getBatches = async (id) => {
    router.push(`accounts/batch/${id}`);
    // try {
    //   const res = await FetchTypeGet(`https://vast-pink-moth-toga.cyclic.app/batches/${id}/programs`, userr.token);
    // } catch (err) {
    //   console.log(err);
    // }
  };

  // filter users based on search term
  // const filteredUsers = users.filter((user) => {
  //   return (
  //     user?.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     user?.email?.toLowerCase().includes(searchTerm.toLowerCase())
  //   );
  // });

  return (
    <div className='dark:bg-gray-900 min-h-[95vh] font-sans'>
      {loading && <LinearProgress />}

      {admin && teacher && (
        <>
          <h1 className='text-4xl font-semibold mb-2 p-3'>Sessions</h1>
          <p className='text-sm text-gray-500 mb-2 p-3'>List of all sessions</p>
          <div className='gap-2 flex flex-col p-3'>
            {users.map((user) => (
              <Link
                href={`accounts/batch?batchId=${user._id}`}
                key={user._id}
                className={` 
                  p-2 border-2 border-gray-300 dark:border-gray-700 
                  hover:bg-gray-200 dark:hover:bg-gray-800
                `}
              >
                <span className='text-lg cursor-pointer'>{user.session}</span>
              </Link>
            ))}
          </div>
        </>
      )}

      {/* add input element for search */}
      {/* <div
        className="
      flex justify-center items-center mt-4
      "
      >
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className=" border-b-4 
           p-2 mb-4 shadow-md  dark:text-gray-100 bg-gray-50 dark:bg-gray-900
          text-gray-800 focus:outline-none transition-all duration-150 ease-in
          border-[#404145] focus:border-cyan-500 w-[60%] md:w-1/2 lg:w-1/2
          "
        />
      </div> */}

      {admin && !teacher && (
        <div className='mt-5 px-4'>
          <h1 className='text-4xl font-semibold mb-2'>Accounts</h1>
          <p className='text-sm text-gray-500 mb-2'>List of all accounts</p>
          <div
            className='
          grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4
        '
          >
            {users.map((user) => (
              <UserProfile
                key={user.id}
                user={user}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default withAuth(Accounts);

const UserProfile = ({ user }) => {
  return (
    <div
      className='relative flex flex-col font-sans bg-gray-50
    bg-opacity-80
    dark:bg-gray-900
    '
    >
      <div
        className='dark:bg-[#0a101d] shadow-lg p-2 pb-2 justify-center items-center
      flex font-sans bg-gray-50 dark:border-gray-700 border 

      w-full  user__image--path'
      >
        <img
          src={`https://robohash.org/${Math.random() * 100}?set=set5&size=100x100`}
          alt='user'
          className='rounded-full w-20 h-20 p-1'
        />
        <div></div>
      </div>

      <div
        className='flex  font-sans border-b-2 border-blue-500
     shadow-lg p-2 dark:bg-gray-900 flex-col bg-slate-100  
      '
      >
        <div className='flex flex-col'>
          <h2 className='text-lg font-semibold'>{user.username}</h2>
          <h2 className='text-sm text-gray-500'>{user.program}</h2>
          <h2 className='text-sm text-gray-500'>{user.batch}</h2>
          <div className=''>{user.admin ? <p className='font-bold'>Admin</p> : <p className='font-bold'>User</p>}</div>
        </div>
        <div className='w-full'>
          <Link href={`/accounts/${user._id}`}>
            <button className='hover:bg-slate-200 text-center border mt-2 w-full dark:border-gray-800 text-gray-500 text-lg p-1 hover:dark:bg-gray-700 '>View More</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
