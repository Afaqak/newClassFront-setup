import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../src/store/user/user.selector';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { notify } from '../../utils/tools';
import Image from 'next/image';
const UserInfo_card = ({ id, setToggle, mode }) => {
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const { token, user } = useSelector(selectCurrentUser) || {};

  const handleTeacherChange = async (id, value) => {
    try {
      setLoading(true);
      let res = await fetch(`https://vast-pink-moth-toga.cyclic.app/accounts/MarkTeacher/${id} `, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ teacher: value }),
      });
      const data = await res.json();
      console.log(data, 'data');
      // const newBatches = batches.map((batchInfo) => (batchInfo._id === data._id ? data : batchInfo));
      setUserInfo({ ...userInfo, teacher: value });
      notify('changed status');
    } catch (err) {
      notify(err.message, 'error');
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleValidChange = async (id, value) => {
    try {
      setLoading(true);
      let res = await fetch(`https://vast-pink-moth-toga.cyclic.app/accounts/changeValidity/${id} `, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ valid: value }),
      });
      const data = await res.json();
      setUserInfo({ ...userInfo, valid: value });
      console.log(data, 'data');
      // const newBatches = batches.map((batchInfo) => (batchInfo._id === data._id ? data : batchInfo));
      // userInfo(newBatches);
      notify('changed status');
    } catch (err) {
      notify(err.message, 'error');
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

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
    { label: 'Lastname', value: userInfo?.lastname },
    { label: 'Username', value: userInfo?.username },
    { label: 'Batch', value: userInfo?.batch },
    { label: 'Program', value: userInfo?.program },
    { label: 'Group', value: userInfo?.group },
    {
      label: 'Semesters',
      value: userInfo?.semesters?.map((s) => s.semester).join(', '),
    },
    {
      label: `Role`,
      value: userInfo?.admin ? 'Admin' : 'Student',
    },
    {
      label: 'Validity',
      value: userInfo?.valid ? 'Valid' : 'Not-Valid',
    },
    {
      label: 'Teacher',
      value: userInfo?.teacher ? 'true' : 'false',
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
            key={userInfo._id}
            onClick={(e) => e.stopPropagation()}
            className='bg-white rounded-lg border-b-4 border-purple-500 shadow-lg p-8 w-full sm:max-w-2xl'
          >
            <div className='flex justify-between border-b mb-4 pb-1'>
              <h2 className='text-xl font-bold text-purple-500'>User Info</h2>
              <Image
                src='/svgs/icons8-cancel.svg'
                width={30}
                className='cursor-pointer'
                height={20}
                onClick={handleClose}
              />
            </div>
            <div className='grid grid-cols-2 gap-3 sm:grid-cols-2'>
              {userInfoData.map((data) => (
                <div
                  key={data?.label}
                  className='flex flex-col gap-2'
                >
                  <div className='text-lg font-bold text-gray-500'>{data?.label}</div>
                  <div className='text-lg'>{data?.value}</div>
                </div>
              ))}
              <div>
                {mode === 'userinfo' ? (
                  <></>
                ) : (
                  <>
                    <h2 className='text-lg font-bold text-slate-900'>validate student</h2>
                    <div className='flex'>
                      <div className='flex flex-row items-center '>
                        <input
                          disabled={userInfo?.teacher || loading}
                          checked={userInfo?.teacher}
                          onChange={(e) => handleTeacherChange(userInfo?._id, e.target.checked)}
                          type='checkbox'
                        />
                        {/* <Checkbox
                          disabled={userInfo?.teacher || loading}
                          checked={userInfo?.teacher}
                          onChange={(e) => handleTeacherChange(userInfo?._id, e.target.checked)}
                        /> */}
                        <p className='text-sm '>Teacher</p>
                      </div>
                      <div className='flex flex-row items-center'>
                        <input
                          disabled={userInfo?.teacher || loading}
                          checked={userInfo?.valid}
                          onChange={(e) => handleValidChange(userInfo?._id, e.target.checked)}
                          type='checkbox'
                        />
                        {/* <Checkbox
                          disabled={loading}
                          onChange={(e) => handleValidChange(userInfo?._id, e.target.checked)}
                          checked={userInfo?.valid}
                        /> */}
                        <p className='text-sm '>Valid</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        ) : (
          // <CircularProgress color='primary' />
          <></>
        )}
      </div>
    </div>
  );
};

export default UserInfo_card;
