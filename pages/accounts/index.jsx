import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import withAuth from '../../components/withAuth';
import Heading_1 from '../../components/Heading_1';
import { FetchTypeGet } from '../../utils/fetch/fetchtypeget';
import { useSelector } from 'react-redux';
import { MontserratFont } from '../../utils/fonts';
import { selectCurrentUser } from '../../src/store/user/user.selector';
import UserInfo_card from '../../components/user accounts/UserInfo_card';

const Accounts = () => {
  const user = useSelector(selectCurrentUser);
  const { admin, teacher } = user.user || {};
  const [data, setData] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [id, setId] = useState('');

  useEffect(() => {
    const getAccounts = async () => {
      try {
        const data = await FetchTypeGet('https://vast-pink-moth-toga.cyclic.app/accounts', user.token);
        console.log(data);
        setData(data);
      } catch (error) {
        console.log(error);
      }
    };
    getAccounts();
  }, []);

  const setToggleAndId = (id) => {
    setToggle(!toggle);
    setId(id);
  };

  return (
    <div className={` min-h-[95vh] ${MontserratFont.className} `}>
      {toggle && (
        <UserInfo_card
          id={id}
          setToggle={setToggle}
        />
      )}
      {admin && teacher && (
        <div className='p-4'>
          <Heading_1 label='Batches' />
          <p className='text-sm text-gray-500 mb-2 py-3'>List of all sessions</p>
          <div className='gap-2 flex flex-col py-3'>
            {data.map((user) => (
              <Link
                href={`accounts/batch?batchId=${user._id}&session=${user.session}`}
                key={user._id}
                className={` 
                  p-2 border-2 border-gray-300 
                  hover:bg-gray-200 
                `}
              >
                <span className='text-lg cursor-pointer'>{user.session}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {admin && !teacher && (
        <div className='p-4'>
          <Heading_1 label='Accounts' />
          <p className='text-sm text-gray-500 mb-2'>List of all accounts</p>
          <div
            className='
          grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4
        '
          >
            {data.map((user) => (
              <UserProfile
                setToggleAndId={setToggleAndId}
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

const UserProfile = ({ user, setToggleAndId }) => {
  return (
    <div
      className='relative flex flex-col font-sans bg-gray-50
    bg-opacity-80
  
    '
    >
      <div
        className=' bg-gray-50  border 

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
     shadow-lg p-2  flex-col bg-slate-100  
      '
      >
        <div className='flex flex-col'>
          <h2 className='text-lg font-semibold'>{user.username}</h2>
          <h2 className='text-sm text-gray-500'>{user.program}</h2>
          <h2 className='text-sm text-gray-500'>{user.batch}</h2>
          <div className=''>{user.admin ? <p className='font-bold'>Admin</p> : <p className='font-bold'>User</p>}</div>
        </div>
        <div className='w-full'>
          <button
            onClick={() => setToggleAndId(user._id)}
            className='hover:bg-slate-200 cursor-pointer text-center border mt-2 w-full  text-gray-500 text-lg p-1  '
          >
            View More
          </button>
        </div>
      </div>
    </div>
  );
};
