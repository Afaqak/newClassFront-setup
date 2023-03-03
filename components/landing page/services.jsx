import React from 'react';

const Services = () => {
  return (
    <div className='h-screen bg-[#F6F9FC] py-10 flex flex-col justify-center items-center'>
      <div className='p-4'>
        <h1 className='text-lg font-bold  mb-4 text-purple-500'>Structure</h1>
        <p className='text-2xl md:text-4xl  font-bold text-[#0A2540] mb-4 tracking-wide leading-7'>Our application was built using the following cutting-edge technologies</p>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-20 divide-x-4 divide-dashed'>
        <div className='card card-1 p-4'>
          <div className='card-body'>
            <h1 className='text-2xl font-bold text-[#0A2540] mb-4'>Front-end </h1>
            <p className='text-md md:text-lg  font-medium text-gray-500 mb-4 tracking-wide leading-7'>
              The frontend is the interface that users interact with and is built using technologies such as HTML, CSS, and JavaScript.
            </p>
          </div>
        </div>
        <div className='card card-1 p-4'>
          <div className='card-body'>
            <h1 className='text-2xl font-bold text-[#0A2540] mb-4'>Back-end</h1>
            <p className='text-md md:text-lg  font-medium text-gray-500 mb-4 tracking-wide leading-7'>
              The backend is responsible for managing data and serving API requests from the frontend. It is built using Node.js, Express and communicates with a database, to store and retrieve data.
            </p>
          </div>
        </div>
        <div className='card card-1 p-4'>
          <div className='card-body'>
            <h1 className='text-2xl font-bold text-[#0A2540] mb-4'>Database</h1>
            <p className='text-md md:text-lg  font-medium text-gray-500 mb-4 tracking-wide leading-7'>
              The database stores all the application data, such as user information, course information, posts, and announcements. It is implemented using a NoSQL database: MongoDB.
            </p>
          </div>
        </div>
        <div className='card card-1 p-4'>
          <div className='card-body'>
            <h1 className='text-2xl font-bold text-[#0A2540] mb-4'>API</h1>
            <p className='text-md md:text-lg  font-medium text-gray-500 mb-4 tracking-wide leading-7'>The backend exposes an API that the frontend can communicate with to request and receive data.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
