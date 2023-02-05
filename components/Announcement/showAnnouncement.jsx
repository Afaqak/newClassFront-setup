import React from 'react';
import formatDate from '../../utils/tools';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { CircularProgress } from '@mui/material';
const ShowAnnouncement = ({ announcements, handleDelete, admin, mode }) => {
  return (
    <div
      className={`flex flex-col py-2 gap-2 px-4 shadow-md ${mode === 'courseAnnouncement' && 'shadow-none px-0'}
    `}
    >
      <h1
        className={`text-2xl font-semibold text-gray-700

  dark:text-gray-200`}
      >
        Announcements
      </h1>
      {!announcements && (
        <div className='flex justify-center items-center'>
          <CircularProgress />
        </div>
      )}
      {announcements?.map((ann) => (
        <div
          className='
        bg-blue-50 dark:bg-gray-800 overflow-hidden w-4/5  relative 
        px-2 py-2 mt-2 flex flex-col gap-2 rounded-md'
        >
          {admin && (
            <button
              onClick={() => handleDelete(ann._id)}
              className='bg-red-500 text-white px-2 rounded-md absolute right-5'
            >
              <FontAwesomeIcon
                size='xs'
                icon={faTrash}
              />
            </button>
          )}
          <p
            className='text-blue-500 text-[0.75rem] font-bold tracking-wider
          '
          >
            {ann?.author}
          </p>
          <h1 className='text-sm font-semibold '>{ann?.title}</h1>
          <p
            className='text-gray-600 break-words
          '
          >
            {ann.body}
          </p>
          <p
            className='text-gray-600 
            flex justify-end text-sm font-semibold
          '
          >
            {formatDate(ann?.createdAt)}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ShowAnnouncement;
