import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../src/store/user/user.selector';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { CircularProgress } from '@mui/material';

const UserInfo_card = ({ id, setToggle }) => {
  const dropShadowref = useRef();
  const [userInfo, setUserInfo] = useState({});
  const { token, user } = useSelector(selectCurrentUser);
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const res = await fetch(`https://vast-pink-moth-toga.cyclic.app/accounts/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        console.log(data);
        setUserInfo(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserInfo();
  }, [id]);

  const handleClose = () => {
    setToggle(false);
  };

  //if user is not valid
  if (!user.valid) return;

  const userInfoData = [
    { label: 'Firstname', value: userInfo?.firstname },
    { label: 'Lastname', value: userInfo.lastname },
    { label: 'Username', value: userInfo?.username },
    { label: 'Email', value: userInfo?.email },
    { label: 'Batch', value: userInfo?.batch },
    { label: 'Program', value: userInfo?.program },
    { label: 'Group', value: userInfo?.group },
    {
      label: 'Semesters',
      value: userInfo?.semesters?.map((s) => s.semester).join(', '),
    },
  ];

  return (
    <div className=''>
      <div
        onClick={handleClose}
        className='fixed inset-0 flex items-center justify-center bg-opacity-50 bg-gray-500 backdrop-blur z-50'
      >
        {Object.keys(userInfo).length > 0 ? (
          <div
            onClick={(e) => e.stopPropagation()}
            className='bg-white rounded-lg border-2 border-blue-500 shadow-lg p-8 w-full sm:max-w-2xl'
          >
            <div className='flex justify-between border-b mb-4 pb-1'>
              <h2 className='text-lg font-bold text-blue-500 '>Account Details</h2>
              <FontAwesomeIcon
                onClick={handleClose}
                icon={faClose}
                className='text-blue-500 cursor-pointer'
              />
            </div>
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
              {userInfoData.map((data) => (
                <div
                  ref={dropShadowref}
                  key={data.label}
                  className='flex flex-col gap-2'
                >
                  <div className='text-lg font-bold text-blue-500'>{data.label}</div>
                  <div className='text-lg'>{data.value}</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <CircularProgress color='primary' />
        )}
      </div>
    </div>
  );
};

export default UserInfo_card;
