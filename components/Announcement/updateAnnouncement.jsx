import React from 'react';
import Form from './Form';
import { Toaster } from 'react-hot-toast';
const UpdateAnnouncement = ({ type, loading, handleBackdropClick, handleInputChange, handleSubmit, setToggleAnnouncement }) => {
  return (
    <div className=' w-full h-full fixed top-0 left-0 flex justify-center items-center bg-black bg-opacity-50 z-[1000] '>
      <div className='flex flex-col items-center justify-center w-full px-10 md:px-0'>
        <Form
          type={type}
          loading={loading}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          setToggleAnnouncement={setToggleAnnouncement}
        />
      </div>
    </div>
  );
};

export default UpdateAnnouncement;
