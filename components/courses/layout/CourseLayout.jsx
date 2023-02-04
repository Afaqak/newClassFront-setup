import React from 'react';

const CourseLayout = ({ setPage, page, children }) => {
  return (
    <>
      <div className='flex w-full text-slate-900 justify-start px-4 space-x-4 items-start py-3 '>
        <div
          onClick={() => setPage(1)}
          className={`toggle_section_1 border font-semibold border-blue-500
          w-full
          md:w-1/4 py-2 px-6 
    hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out ${page === 1 && 'bg-blue-500 text-white'}
    `}
        >
          <button className='toggle_btn uppercase'>participants</button>
        </div>
        <div
          onClick={() => setPage(2)}
          className={`toggle_section_2 border font-semibold w-full 
          ${page === 2 && 'bg-blue-500 text-white'}
          border-blue-500 md:w-1/4 py-2 px-6 hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out`}
        >
          <button className='toggle_btn uppercase'>posts</button>
        </div>
        <div
          onClick={() => setPage(3)}
          className={`toggle_section_3 border font-semibold border-blue-500
          ${page === 3 && 'bg-blue-500 text-white'} min-w-max
          md:w-1/4 py-2 px-6 hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out`}
        >
          <button className='toggle_btn uppercase'>announcements</button>
        </div>
      </div>
      {children}
    </>
  );
};

export default CourseLayout;
