import React from 'react';
import Card from './Card';
import { Inter_Font } from '../../utils/fonts';
const Services = () => {
  return (
    <div className={` bg-[#F6F9FC] flex flex-col justify-center items-center ${Inter_Font.className} py-16`}>
      <div className='p-4'>
        <h1 className='text-lg font-bold mb-4 text-purple-500 tracking-widest'>Structure</h1>
        <p className='text-3xl md:text-4xl  font-bold text-[#0A2540] mb-4 tracking-wide leading-10'>Our application was built using the following cutting-edge technologies</p>
      </div>
      <div
        className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mt-20 md:divide-x-4 divide-dashed 
        divide-y-4 divide-gray-300 sm:divide-y-0 divide-opacity-50
      '
      >
        <Card
          noBorderShadow={true}
          title={'Front-end'}
          description={'The frontend is the interface that users interact with and is built using technologies such as HTML, CSS, and JavaScript.'}
        />
        <Card
          noBorderShadow={true}
          title={'Back-end'}
          description={
            'The backend is responsible for managing data and serving API requests from the frontend. It is built using Node.js, Express and communicates with a database, to store and retrieve data.'
          }
        />
        <Card
          noBorderShadow={true}
          title={'Database'}
          description={'The database is used to store and retrieve data. It is built using MongoDB and is hosted on MongoDB Atlas.'}
        />
        <Card
          noBorderShadow={true}
          title={'API'}
          description={'The backend exposes an API that the frontend can communicate with to request and receive data.'}
        />
      </div>
    </div>
  );
};

export default Services;
