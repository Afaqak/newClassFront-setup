import React from 'react';
import Card from './Card';
import { Inter_Font } from '../../utils/fonts';

const Features = () => {
  return (
    <div
      className={`py-16 flex flex-col justify-center items-center ${Inter_Font.className} 
 
    `}
    >
      <div className='self-start px-4'>
        <h1 className='text-lg font-bold  mb-4 text-purple-500  tracking-widest'>Features</h1>
        <p className='text-3xl md:text-4xl  font-bold text-[#0A2540] mb-4 tracking-wide leading-10'>Following are the features of our application</p>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-20'>
        <Card
          title={'User Account Management'}
          description={'The application provides a registration and login system for users to create and manage their accounts.'}
        />
        <Card
          title={'Course Management'}
          description={'Users can create, access and manage courses, including adding and managing course material.'}
        />
        <Card
          title={'Posts and Announcements'}
          description={'Users can make posts and announcements in courses to communicate with each other.'}
        />
        <Card
          title={'User Roles'}
          description={'The application supports multiple user roles such as administrators, teachers,and student.'}
        />
      </div>
    </div>
  );
};

export default Features;
