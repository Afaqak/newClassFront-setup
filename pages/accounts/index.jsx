import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import withAuth from '../../components/withAuth';
import Heading_1 from '../../components/Heading_1';
import { FetchTypeGet } from '../../utils/fetch/fetchtypeget';
import { useSelector } from 'react-redux';
import { MontserratFont } from '../../utils/fonts';
import { selectCurrentUser } from '../../src/store/user/user.selector';
import UserInfo_card from '../../components/user accounts/UserInfo_card';
import LinearProgress from '../../components/LinearProgress';

const Accounts = () => {
  const user = useSelector(selectCurrentUser);
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredData, setFilteredData] = useState(data);
  const { admin, teacher } = user.user || {};
  const [toggle, setToggle] = useState(false);
  const [id, setId] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getAccounts = async () => {
      try {
        setLoading(true);
        const data = await FetchTypeGet('https://vast-pink-moth-toga.cyclic.app/accounts', user.token);
        console.log(data);
        setData(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getAccounts();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredData(data);
    } else if (selectedCategory === 'student') {
      setFilteredData(data.filter((user) => !user.admin && !user.teacher));
    } else if (selectedCategory === 'teacher') {
      setFilteredData(data.filter((user) => user.teacher));
    } else if (selectedCategory === 'admin') {
      setFilteredData(data.filter((user) => user.admin));
    }
  }, [data, selectedCategory]);

  const setToggleAndId = (id) => {
    setToggle(!toggle);
    setId(id);
  };

  return (
    <div className={` min-h-[95vh] ${MontserratFont.className} `}>
      {loading && <LinearProgress />}
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
          <div className='flex justify-center'>
            <button
              className={`${selectedCategory === 'all' ? 'bg-gray-500 text-white' : 'text-gray-500'} font-medium mx-1 px-2 md:px-4 py-2 rounded`}
              onClick={() => setSelectedCategory('all')}
            >
              All
            </button>
            <button
              className={`${selectedCategory === 'student' ? 'bg-gray-500 text-white' : 'text-gray-500'} font-medium mx-1 px-2 md:px-4 py-2 rounded`}
              onClick={() => setSelectedCategory('student')}
            >
              Students
            </button>
            <button
              className={`${selectedCategory === 'teacher' ? 'bg-gray-500 text-white' : 'text-gray-500'} font-medium mx-1 px-2 md:px-4 py-2 rounded`}
              onClick={() => setSelectedCategory('teacher')}
            >
              Teachers
            </button>
            <button
              className={`${selectedCategory === 'admin' ? 'bg-gray-500 text-white' : 'text-gray-500'} font-medium mx-1 px-2 md:px-4 py-2 rounded`}
              onClick={() => setSelectedCategory('admin')}
            >
              Admins
            </button>
          </div>

          <div
            className='
            grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4
          '
          >
            {filteredData.map((user) => (
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

function getRandomGradient() {
  const colors = [
    'from-purple-400 to-pink-500',
    'from-green-400 to-blue-500',
    'from-yellow-400 to-red-500',
    'from-indigo-400 to-purple-500',
    'from-pink-400 to-red-500',
    'from-red-400 to-yellow-500',
    'from-blue-400 to-green-500',
    'from-gray-400 to-gray-500',
    'from-purple-500 via-pink-500 to-red-500',
    'from-blue-500 via-purple-500 to-pink-500',
    'from-green-500 via-blue-500 to-purple-500',
  ];

  const randomIndex = Math.floor(Math.random() * colors.length);
  return `bg-gradient-to-r ${colors[randomIndex]}`;
}
const UserProfile = ({ user, setToggleAndId }) => {
  return (
    <div
      className='relative flex flex-col font-sans bg-gray-50
    bg-opacity-80
  
    '
    >
      <div
        className={` bg-gray-50  border  ${getRandomGradient()} h-20
      w-full `}
      ></div>

      <div
        className='flex  font-sans border-b-2 border-[#0A2540] 
     shadow-lg p-2  flex-col bg-slate-100  
      '
      >
        <div className='flex flex-col'>
          <h2 className='text-lg font-semibold'>{user.username}</h2>
          <h2 className='text-sm text-gray-500'>{user.program}</h2>
          <h2 className='text-sm text-gray-500'>{user.batch}</h2>
          <div className='text-purple-500'>{user.admin ? <p className='font-bold'>Admin</p> : <p className='font-bold'>User</p>}</div>
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
