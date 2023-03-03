import React from 'react';
import Image from 'next/image';

const Header = () => {
  return (
    <div className=' h-[90vh] relative flex justify-center flex-col md:flex-row md:justify-between items-center font-sans'>
      <div
        className='
      '
      >
        <div className='md:w-2/3 w-[80%]'>
          <h1 className='md:text-6xl text-4xl font-bold text-[#0A2540] mb-4'>Let’s learn about new Knowledge and abilities</h1>
          <p
            className='text-md md:text-lg  font-medium text-gray-500 mb-4 tracking-wide leading-7
          '
          >
            This web application provides a centralized platform for classroom management, enabling users to create and access courses, share materials, make announcements, and interact with each
            other.
          </p>
        </div>
        <div>
          <button
            className='bg-purple-500 hover:bg-purple-600 text-white py-1 px-5 rounded-lg shadow-md 
            focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 transition-colors duration-300 mr-4
          '
          >
            Sign In
          </button>
          <button className='px-5 py-1 bg-gray-100 text-gray-800 rounded-lg shadow-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition-colors duration-300'>
            Update
          </button>
        </div>
      </div>
      <div className='absolute md:relative'>
        <Image
          src='/svgs/curvs.svg'
          color='red'
          width={600}
          height={250}
        />
      </div>
      {/*buttons*/}
      {/*signin*/}
    </div>
  );
};

export default Header;
