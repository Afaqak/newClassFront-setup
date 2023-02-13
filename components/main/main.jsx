import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../src/store/user/user.selector';
import { motion, AnimatePresence } from 'framer-motion';
import { usefetchCourses } from '../../src/customHooks/fetchCoures';
import { LinearProgress } from '@mui/material';
import { selectCoursesList } from '../../src/store/courses/courses.reselect';
import CoursesTable from '../courses';
import Heading_1 from '../Heading_1';
import CoursesCard from '../courses/coursesCards';

import AnnouncementsToggler from './announcementsToggler';
const Main = () => {
  const courses = useSelector(selectCoursesList);

  console.log(courses);
  const { token } = useSelector(selectCurrentUser) || {};
  const [loading, setLoading] = useState(false);
  usefetchCourses(token, setLoading);
  return (
    <AnimatePresence mode='wait'>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.3 } }}
        exit={{ opacity: 0, transition: { duration: 0.3 } }}
        className={`h-screen font-sans
        w-full relative bg-white 
         flex flex-col
  `}
      >
        <AnnouncementsToggler />
        {loading && <LinearProgress />}
        <div className='flex-1 px-4 mt-3'>
          <Heading_1 label='Dashboard' />
          <div
            className=' inline-block mt-4 shadow-md rounded-lg p-2 bg-gray-200 
        dark:bg-gray-800 dark:text-white mb-2
        '
          >
            <input
              type='date'
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
            <Heading_1 label='Courses' />
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
