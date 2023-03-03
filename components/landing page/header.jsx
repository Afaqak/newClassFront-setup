import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Inter_Font } from '../../utils/fonts';
const Header = () => {
  return (
    <div className={`h-[90vh] relative flex justify-center flex-col md:flex-row md:justify-between items-center ${Inter_Font.className} px-4 `}>
      <div
        className='
      '
      >
        <div className='lg:w-2/3 w-full'>
          <h1 className='md:text-6xl text-4xl font-bold text-[#0A2540] mb-4'>Let’s learn about new Knowledge and abilities</h1>
          <p
            className='text-md md:text-lg  font-medium text-gray-500 mb-4 tracking-wide leading-7
          '
          >
            This web application provides a centralized platform for classroom management, enabling users to create and access courses, share materials, make announcements, and interact with each
            other.
          </p>
        </div>
        <div className='font-sans'>
          <button
            className='bg-purple-500 hover:bg-purple-600 text-white py-1 px-5 rounded-lg shadow-md 
            focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 transition-colors duration-300 mr-4
          '
          >
            <Link href='/signin'>Sign In</Link>
          </button>
          <button className='px-5 py-1 bg-gray-100 text-gray-800 rounded-lg shadow-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition-colors duration-300'>
            <Link href='/signup'>Sign Up</Link>
          </button>
        </div>
      </div>
      <div className='absolute md:relative'>
        <Image
          src='/svgs/curvs.svg'
          color='red'
          width={600}
          height={250}
          className='z-50'
        />
      </div>
      {/*buttons*/}
      {/*signin*/}
    </div>
  );
};

export default Header;
