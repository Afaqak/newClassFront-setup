import React from 'react';
import { CircularProgress } from '@mui/material';

const Form = ({ handleSubmit, handleInputChange, loading, setToggleAnnouncement }) => {
  return (
    <form
      onSubmit={handleSubmit}
      className='bg-white md:w-3/5 w-full px-6 py-3 relative shadow-md rounded-md'
    >
      <p
        className='
        text-slate-900 mb-2 text-2xl font-semibold
        '
      >
        Make an announcement
      </p>
      {/* <button
        className='absolute right-7 cursor-pointer top-14 pt-1 md:top-7 font-semibold text-xl border px-3 py self-center hover:bg-gray-200'
        onClick={() => {
          console.log('clicked');
          setToggleAnnouncement();
        }}
      >
        {loading ? <CircularProgress size={20} /> : 'X'}
      </button> */}
      <button
        className='absolute right-7 cursor-pointer top-14 pt-1 md:top-7 font-semibold text-xl border px-3 py self-center hover:bg-gray-200'
        onClick={() => {
          console.log('clicked');
          setToggleAnnouncement();
        }}
      >
        {' '}
        X
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
            className='w-2/3 px-3 py-2 text-gray-700 border  focus:outline-none border-slate-300 rounded-sm focus:border-blue-500'
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
          <textarea
            onChange={handleInputChange}
            className='w-full px-3 py-2 text-gray-700 border  focus:outline-none border-slate-300 rounded-sm focus:border-blue-500'
            name='subject'
            id='body'
            cols='30'
            rows='10'
          ></textarea>
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
