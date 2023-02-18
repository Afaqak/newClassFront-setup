import React from 'react';

const CoursesCard = ({ colorBg }) => {
  return (
    <div
      className='courses h-52
    border border-colorlight'
    >
      <span className={`${colorBg} p-2 text-white`}>library_books</span>
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
