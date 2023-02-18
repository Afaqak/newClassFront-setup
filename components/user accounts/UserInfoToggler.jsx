import React from 'react';
import { Checkbox } from '@mui/material';
const UserInfoToggler = ({ user, handleChange, markTeacher }) => {
  return (
    <div
      className={`bg-cyan-100 
px-2 mb-4 shadow-md py-2
text-gray-800 transform
          w-full  
          transition-all duration-500
  `}
    >
      <div className='flex mb-3'></div>
      <div className='mb-2 text-center py-2'>{<p className='text-cyan-600 font-bold'>Id : {user._id}</p>}</div>
      <div className='flex items-center justify-center -ml-4'>
        <div className='flex items-center'>
          <label className='flex items-center'>
            <Checkbox
              size='small'
              checked={user.admin}
              onChange={(e) => handleChange(user._id, e.target.checked)}
              inputProps={{ 'aria-label': 'controlled' }}
            />
            <span className='font-medium text-gray-500'>Valid:</span>
            <span className={`font-bold ${user.valid ? 'text-cyan-600' : 'text-gray-500'}`}>{user.valid ? 'True' : 'False'}</span>
          </label>
        </div>
        <div className='flex items-center'>
          <label className='flex items-center'>
            <Checkbox
              size='small'
              checked={user.teacher}
              onChange={(e) => markTeacher(user._id, e.target.checked)}
              inputProps={{ 'aria-label': 'controlled' }}
            />
            <span className='font-medium text-gray-500'>Teacher:</span>
            <span className={` text-gray-800 ${user.teacher ? 'text-cyan-600' : 'text-gray-500'}`}>{user.teacher ? 'True' : 'False'}</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default MoreDetailsUser;
