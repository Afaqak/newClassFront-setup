import React from 'react';
import Card from './Card';
const Services = () => {
  return (
    <div className='h-screen bg-[#F6F9FC] py-10 flex flex-col justify-center items-center'>
      <div className='p-4'>
        <h1 className='text-lg font-bold  mb-4 text-purple-500'>Structure</h1>
        <p className='text-2xl md:text-4xl  font-bold text-[#0A2540] mb-4 tracking-wide leading-7'>Our application was built using the following cutting-edge technologies</p>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-20 divide-x-4 divide-dashed'>
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
