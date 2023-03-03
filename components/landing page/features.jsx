import React from 'react';

const Features = () => {
  return (
    <div className='h-[80vh] font-sans flex flex-col justify-center items-center '>
      <div className='self-start'>
        <h1
          className='text-lg font-bold mb-4 text-[#0A2540]
        '
        >
          Features
        </h1>
        <p className='text-2xl md:text-4xl  font-medium text-purple-500 mb-4 tracking-wide leading-7'>following are some of the features of this web application</p>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-20'>
        <div
          className='card card-1 
          border p-4 rounded-lg shadow-md
        '
        >
          <div className='card-body'>
            <p className='text-md md:text-lg  font-medium text-gray-500 mb-4 tracking-wide leading-7'>
              <h1 className='text-2xl font-bold text-[#0A2540] mb-4'>User Account Management</h1>
              The application provides a registration and login system for users to create and manage their accounts.
            </p>
          </div>
        </div>
        <div className='card card-2 border p-4 rounded-lg shadow-md'>
          <div className='card-body '>
            <h1 className='text-2xl font-bold text-[#0A2540] mb-4 break-words'>Course Management</h1>
            <p className='text-md md:text-lg  font-medium text-gray-500 mb-4 tracking-wide leading-7'>Users can make posts and announcements in courses to communicate with each other.</p>
          </div>
        </div>
        <div className='card card-3 border p-4 rounded-lg shadow-md'>
          <div className='card-body'>
            <h1 className='text-2xl font-bold text-[#0A2540] mb-4'>Posts and Announcements</h1>
            <p className='text-md md:text-lg  font-medium text-gray-500 mb-4 tracking-wide leading-7'>The application supports multiple user roles such as administrators, teachers, and student.</p>
          </div>
        </div>
        <div className='card card-4 border p-4 rounded-lg shadow-md'>
          <div className='card-body'>
            <h1 className='text-2xl font-bold text-[#0A2540] mb-4'>User Roles</h1>
            <p className='text-md md:text-lg  font-medium text-gray-500 mb-4 tracking-wide leading-7'>The backend exposes an API that the frontend can communicate with to request and receive data.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
