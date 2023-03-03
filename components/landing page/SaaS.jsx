import React from 'react';
import { Inter_Font } from '../../utils/fonts';
const SaaS = () => {
  return (
    <div className={`py-16 flex flex-col justify-center ${Inter_Font.className}`}>
      <div className='p-4 self-start'>
        <h1 className='text-lg font-bold  mb-4 text-purple-500  tracking-widest'>SAAS</h1>
        <p className='text-2xl md:text-4xl  font-bold text-[#0A2540] mb-4 tracking-wide leading-7'>Following are the SaaS features of our application</p>
      </div>
      <div className='flex p-4 flex-col gap-y-10  justify-center border-4 border-dashed rounded-md'>
        <SServe
          title={'Access'}
          description={'Users can access the application from anywhere with an internet connection.'}
        />
        <SServe
          title={'Scalability'}
          description={'The application can easily scale to accommodate a growing number of users and courses.'}
        />
        <SServe
          title={'Updates'}
          description={'The application can be updated to add new features and fix bugs.'}
        />
        <SServe
          title={'Security'}
          description={'The application is secure and protects user data.'}
        />
      </div>
    </div>
  );
};

const SServe = ({ title, description }) => {
  return (
    <div className='flex items-center md:items-start flex-col md:flex-row gap-x-10'>
      <h1
        className='text-xl font-bold text-[#0A2540] mb-4 w-[100px]
    '
      >
        {title}
      </h1>
      <p className='text-md md:text-lg font-medium font-sans text-gray-600 mb-4 leading-7'>{description}</p>
    </div>
  );
};

export default SaaS;
