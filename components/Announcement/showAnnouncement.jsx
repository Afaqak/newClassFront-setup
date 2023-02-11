import React from 'react';
import formatDate from '../../utils/tools';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { CircularProgress } from '@mui/material';

const ShowAnnouncement = ({ announcements, handleDelete, admin, mode }) => {
  return (
    <div
      className={`flex ${mode === 'groupAnnouncement' && 'bg-white border px-0'}
      flex-col py-2 gap-2 px-4
    `}
    >
      <h1
        className={`md:text-2xl px-4 ${mode === 'groupAnnouncement' && 'mt-5'} font-semibold text-gray-700

  dark:text-gray-200 text-lg`}
      >
        Announcements
      </h1>
      <p className='text-slate-700 mb-3 px-4'>speak to your mind</p>
      {!announcements && (
        <div className='flex justify-center items-center'>
          <CircularProgress />
        </div>
      )}
      {announcements?.map((ann) => (
        <div
          className={`
          ${mode === 'groupAnnouncement' ? 'bg-none w-full border-b' : 'bg-blue-50 w-4/5'}
         dark:bg-gray-800 overflow-hidden  relative 
        px-3 py-3 flex flex-col rounded-md`}
        >
          {admin && (
            <button
              onClick={() => handleDelete(ann._id)}
              className='bg-red-500 text-white px-2 rounded-md absolute right-5 mt-2'
            >
              <FontAwesomeIcon
                size='xs'
                icon={faTrash}
              />
            </button>
          )}
          <p
            className='text-blue-500 text-[0.75rem] font-bold tracking-wider mt-2
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
            flex justify-end text-[0.65rem] font-semibold
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
