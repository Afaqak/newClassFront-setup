import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser } from '../src/store/user/user.selector';
import { motion, AnimatePresence } from 'framer-motion';
import { setCoursesData } from '../src/store/courses/courses.action';
import { LinearProgress } from '@mui/material';
import { selectCoursesList } from '../src/store/courses/courses.reselect';
import { toast } from 'react-hot-toast';
import CoursesTable from './courses';
import CoursesCard from './courses/coursesCards';
import { selectToggleGroupAnnouncement } from '../src/store/user/user.selector';
import { setToggleGroupAnnouncement } from '../src/store/user/user.actions';
const Main = () => {
  const toggleGroupAnnouncement = useSelector(selectToggleGroupAnnouncement);
  const dispatch = useDispatch();
  const courses = useSelector(selectCoursesList);

  console.log(courses);
  const user = useSelector(selectCurrentUser);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch('https://vast-pink-moth-toga.cyclic.app/courses', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        });

        const data = await res.json();
        setLoading(false);
        dispatch(setCoursesData(data));
      } catch (err) {
        setLoading(false);
        toast.error('Something went wrong');
      }
    };
    fetchData();
  }, []);

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.3 } }}
        exit={{ opacity: 0, transition: { duration: 0.3 } }}
        className='h-screen font-sans
        w-full relative bg-white
        flex flex-col dark:bg-gray-900 
        '
      >
        <div
          onClick={() => dispatch(setToggleGroupAnnouncement(!toggleGroupAnnouncement))}
          className='toggeLines absolute md:right-12
        right-4
          top-7 flex flex-col space-y-1'
        >
          <motion.div
            animate={{ rotate: toggleGroupAnnouncement ? 45 : 0, transition: { duration: 0.3 } }}
            className='line-1 bg-blue-600 h-[0.23rem] w-8'
          ></motion.div>
          <motion.div
            animate={{ rotate: toggleGroupAnnouncement ? -45 : 0, translateY: toggleGroupAnnouncement ? '-0.5rem' : '0rem', transition: { duration: 0.3 } }}
            className='line-2 bg-blue-600 h-[0.23rem] w-8 '
          ></motion.div>
        </div>
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
