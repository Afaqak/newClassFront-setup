import React from 'react';
import { CircularProgress } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
const Form = ({ handleSubmit, handleInputChange, loading, setToggleAnnouncement }) => {
  return (
    <form
      onSubmit={handleSubmit}
      className='bg-white md:w-3/5 w-full px-6 py-6 relative shadow-md rounded-md'
    >
      <p
        className='
        text-slate-900 mb-2 text-2xl font-semibold
        '
      >
        Make an announcement
      </p>
      <button
        className='absolute right-7 top-2 cursor-pointer pt-1  font-semibold text-xl text-gray-400 px-3 py self-center'
        type='button'
        onClick={() => {
          console.log('clicked');
          setToggleAnnouncement();
        }}
      >
        {loading ? (
          <CircularProgress size={20} />
        ) : (
          <FontAwesomeIcon
            icon={faClose}
            size='30px'
          />
        )}
      </button>

      <div>
        <div className='flex flex-col'>
          <label
            className='mt-2 font-semibold'
            htmlFor='title'
          >
            Title
          </label>
          <input
            onChange={handleInputChange}
            className='w-2/3 px-3 mb-2 py-2 text-slate-700 border-b  focus:outline-none border-slate-300 rounded-sm focus:border-blue-500'
            type='text'
            name='title'
            id='title'
          />
        </div>
        <div>
          <label
            className='mt-2 font-semibold'
            htmlFor='body'
          >
            Body
          </label>
          <input
            type='text'
            name='subject'
            onChange={handleInputChange}
            className='w-full px-3 mb-2 py-2 text-slate-700 border-b  focus:outline-none border-slate-300 rounded-sm focus:border-blue-500'
          />
          <button
            type='submit'
            className='bg-blue-500 text-white px-4 py-1 rounded-md mt-2'
          >
            Announce!
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
