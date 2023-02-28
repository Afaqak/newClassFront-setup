import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../src/store/user/user.selector';
import { motion, AnimatePresence } from 'framer-motion';
import { usefetchCourses } from '../../src/customHooks/fetchCoures';
import { selectCoursesList } from '../../src/store/courses/courses.reselect';
import { MontserratFont } from '../../utils/fonts';
import CoursesTable from '../courses';
import Heading_1 from '../Heading_1';

import CoursesCard from '../courses/coursesCards';
import GroupAnnouncement from '../Announcement/GroupAnnouncement';
const Main = () => {
  const courses = useSelector(selectCoursesList);

  //filter courses by semester
  const newCourses = courses?.filter((course) => course.semester > 5);

  const { token } = useSelector(selectCurrentUser) || {};
  const [loading, setLoading] = useState(false);
  usefetchCourses(token, setLoading);
  return (
    <AnimatePresence mode='wait'>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.3 } }}
        exit={{ opacity: 0, transition: { duration: 0.3 } }}
        className={`
        w-full relative bg-white 
         flex flex-col ${MontserratFont.className}
  `}
      >
        {/* {loading && <LinearProgress color='success' />} */}
        <div className='flex-1 px-4 mt-3'>
          <Heading_1 label='Dashboard' />
          <div
            className=' inline-block mt-4 shadow-md rounded-lg p-2 bg-gray-200 
       mb-2
        '
          >
            <input
              type='date'
              className='
            bg-transparent h-5 px-5 pr-10 rounded-lg text-sm focus:outline-none
            '
              value={new Date().toLocaleDateString()}
            />
          </div>
          <div
            className='insights mt-2 flex gap-y-3 md:flex-row justify-between gap-x-5 md:gap-x-2 overflow-hidden flex-col-reverse
          sm:flex-col
          '
          >
            <CoursesCard
              color='success'
              colorBg='bg-blue-600'
            />
            <div className='w-full bg-gray-200 rounded-lg overflow-y-scroll h-52 shadow-md border'>
              <GroupAnnouncement />
            </div>
          </div>
          <div
            className='mt-3 py-4
    '
          >
            <Heading_1 label='Courses' />
            <CoursesTable
              courses={newCourses}
              noAction={true}
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Main;
