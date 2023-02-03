import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../src/store/user/user.selector';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { usefetchCourses } from '../src/customHooks/fetchCoures';
import CoursesTable from './courses';
import CoursesCard from './courses/coursesCards';
import SlidesAnimation from './slidesAnimation';

const Main = () => {
  const router = useRouter();
  const user = useSelector(selectCurrentUser);
  const [mount, setMounted] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [loading, setLoading] = useState(false);
  const courses = usefetchCourses(user, setLoading);
  useEffect(() => {
    if (!user) {
      setFadeOut(true);
      setTimeout(() => {
        router.push('/login');
      }, 1000);
    }
  }, [user]);

  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
      () => setMounted(false);
    }, 1500);
  }, []);
  if (!mount) {
    return <SlidesAnimation />;
  }
  return (
    <motion.div
      animate={{ opacity: fadeOut ? 0 : 1 }}
      exit={{ opacity: 0 }}
      className='min-h-screen font-sans mt-5
      w-full relative bg-white 
      flex flex-col dark:bg-gray-900 
    '
    >
      <div className='flex-1 px-4'>
        <h1
          className='text-4xl font-semibold tracking-wide text-slate-900 
        dark:text-white
        '
        >
          Dashboard
          <svg
            aria-hidden='true'
            viewBox='0 0 418 42'
            class='absolute top-[4%] left-[10%] h-[0.58em] fill-blue-300/70 w-[30%]'
            preserveAspectRatio='none'
          >
            <path d='M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z'></path>
          </svg>
        </h1>

        <div
          className=' inline-block mt-4 shadow-md rounded-lg p-2 bg-gray-200 
        dark:bg-gray-800 dark:text-white mb-2
        '
        >
          <input
            type='date'
            value={new Date().toISOString().slice(0, 10)}
            className='
            bg-transparent h-5 px-5 pr-10 rounded-lg text-sm focus:outline-none
            '
          />
        </div>
        <div className='insights mt-2 flex flex-col gap-y-3 md:flex-row justify-between gap-x-5 md:gap-x-2'>
          <CoursesCard
            color='success'
            colorBg='bg-blue-600'
          />
          <CoursesCard
            color='danger'
            colorBg='bg-blue-600 '
          />
          <CoursesCard
            color='primary'
            colorBg='bg-blue-600 '
          />
        </div>
        <div
          className='mt-3 
    '
        >
          <h1
            className='text-4xl font-semibold tracking-wide text-slate-900 relative 
        dark:text-white mb-4
        '
          >
            Courses
            <svg
              aria-hidden='true'
              viewBox='0 0 418 42'
              class='absolute top-[70%] left-[5%] h-[0.58em] fill-blue-300/70 w-[30%]'
              preserveAspectRatio='none'
            >
              <path d='M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z'></path>
            </svg>
          </h1>
          <CoursesTable
            courses={courses}
            noAction={true}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Main;
