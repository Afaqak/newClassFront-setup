import React from 'react';

const CoursesCard = ({ colorBg }) => {
  return (
    <div
      className='courses h-52 font-sans w-1/2 sm:w-[70%] md:w-1/2
    border border-colorlight'
    >
      <span className={`bg-slate-900 p-2 text-white`}>students</span>
      <div
        className='
    border-b border-colorlight
    '
      >
        <div className='left'>
          <h3>Courses</h3>
          <h2>30</h2>
        </div>
      </div>
    </div>
  );
};

export default CoursesCard;
