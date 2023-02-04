import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../src/store/user/user.selector';
import { motion, AnimatePresence } from 'framer-motion';
import { usefetchCourses } from '../src/customHooks/fetchCoures';
import { LinearProgress } from '@mui/material';
import CoursesTable from './courses';
import CoursesCard from './courses/coursesCards';

const Main = () => {
  const user = useSelector(selectCurrentUser);
  const [loading, setLoading] = useState(false);

  const courses = usefetchCourses(user, setLoading);
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.3 } }}
        exit={{ opacity: 0, transition: { duration: 0.3 } }}
        exitAfter={300}
        className='min-h-screen font-sans
      w-full relative bg-white 
      flex flex-col dark:bg-gray-900 
    '
      >
        {loading && <LinearProgress />}
        <div className='flex-1 px-4 mt-3'>
          <h1
            className='text-4xl font-semibold tracking-wide text-slate-900 
        dark:text-white
        '
          >
            Dashboard
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
            </h1>
            <CoursesTable
              courses={courses}
              noAction={true}
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Main;
