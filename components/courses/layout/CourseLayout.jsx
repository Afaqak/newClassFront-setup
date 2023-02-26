import React from 'react';
import { useDispatch } from 'react-redux';
import { setPost } from '../../../src/store/post/post.action';
import Image from 'next/image';

const CourseLayout = ({ page, children }) => {
  const dispatch = useDispatch();
  return (
    <>
      <div className='flex w-full text-slate-900 justify-start px-4 space-x-4 items-start py-3'>
        <div
          onClick={() => dispatch(setPost(1))}
          className={`toggle_section_1 border font-semibold border-gray-300
     cursor-pointer w-1/4
    py-2 px-4 text-sm  flex items-center justify-center md:justify-between hover:bg-gray-200 
   transition duration-300 ease-in-out ${page === 1 && 'bg-gray-200 '}
    `}
        >
          <button className='toggle_btn uppercase hidden md:block'>participants</button>
          <Image
            src='/svgs/icons8-crowd-48.png'
            width={30}
            height={20}
            alt='participants'
          />
        </div>
        <div
          onClick={() => dispatch(setPost(2))}
          className={`toggle_section_2 border font-semibold
    w-1/4 cursor-pointer 
    py-2 px-4 text-sm flex items-center justify-center md:justify-between hover:bg-gray-200
      transition duration-300 ease-in-out ${page === 2 && 'bg-gray-200'}
    `}
        >
          <button className='toggle_btn uppercase hidden md:block'>posts</button>
          <Image
            src='/svgs/icons8-billboard-48.png'
            width={30}
            height={20}
            alt='posts'
          />
        </div>
        <div
          onClick={() => dispatch(setPost(3))}
          className={`toggle_section_3 border font-semibold border-gray-300
    w-1/4 cursor-pointer 
    py-2 px-4 text-sm  flex items-center justify-center md:justify-between hover:bg-gray-200
      transition duration-300 ease-in-out ${page === 3 && 'bg-gray-200 '} min-w-max
    `}
        >
          <button className='toggle_btn uppercase hidden md:block'>announcements</button>
          <Image
            src='/svgs/icons8-commercial-48.png'
            width={30}
            height={20}
            alt='announcements'
          />
        </div>
      </div>

      {children}
    </>
  );
};

export default CourseLayout;
