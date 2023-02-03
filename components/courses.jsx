import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../src/store/user/user.selector';
import Link from 'next/link';

const tableHead = ['Course', 'Semester', 'Group', 'Teacher', 'Posts', 'Credit', 'Participants', 'Action'];
const randomLightBgs = ['bg-blue-100', 'bg-green-100', 'bg-yellow-100', 'bg-red-100', 'bg-purple-100', 'bg-pink-100'];
const getRandomLightBg = () => {
  return randomLightBgs[Math.floor(Math.random() * randomLightBgs.length)];
};

const CoursesTable = ({ courses, deleteCourse, toggleUpdateCourse, loading, noAction }) => {
  const user = useSelector(selectCurrentUser);
  console.log(courses);
  return (
    <motion.table
      className='w-full whitespace-nowrap 
            '
    >
      <thead
        className=' border-b-2 bg-slate-900 text-gray-100
               border-gray-200'
      >
        <tr>
          {tableHead.map((item) => (
            <th
              className={`w-20 p-3 text-sm font-semibold
                       uppercase text-center
                      tracking-wide 
                      ${item === 'Action' && !user?.user.admin && 'hidden'}
                      ${item === 'Action' && noAction && 'hidden'}
                      `}
            >
              {item}
            </th>
          ))}
        </tr>
      </thead>
      <AnimatePresence>
        <tbody
          initial='hidden'
          animate='show'
          className='divide-y divide-gray-100 w-full'
        >
          {courses?.map((item) => (
            <tr
              className='bg-white text-center
                  hover:bg-gray-100 dark:hover:bg-gray-200
                  '
            >
              <Link href={`/courses/${item?._id}`}>
                <td className='p-3 text-sm text-blue-500 whitespace-nowrap'>{item?.name}</td>
              </Link>
              <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>{item?.semester}</td>
              <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>{item?.group}</td>
              <td className='p-4 text-sm text-gray-700 whitespace-nowrap'>{item?.teacher}</td>
              <td
                className={`p-3 text-sm dark:text-gray-900
                        ${getRandomLightBg()}
                      whitespace-nowrap`}
              >
                {item?.credit}
              </td>
              <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>{item?.posts?.length}</td>
              <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>{item?.participants?.length}</td>

              {!noAction && user?.user.admin && (
                <td className={`p-3 text-sm space-x-2 text-gray-700 whitespace-nowrap ${loading ? 'animate-pulse' : ''}`}>
                  <motion.button
                    whileTap={{ opacity: 0.5 }}
                    whileHover={{ translateY: -2 }}
                    onClick={() => {
                      deleteCourse(item?._id);
                      console.log(item?._id);
                    }}
                    disabled={loading}
                    type='submit'
                    className='bg-blue-500 
                          text-white py-1 px-4 rounded-lg'
                  >
                    Delete
                  </motion.button>
                  <motion.button
                    whileTap={{ opacity: 0.5 }}
                    whileHover={{ translateY: -2 }}
                    onClick={() => toggleUpdateCourse(item._id)}
                    type='submit'
                    className='border-2 border-blue-500 py-1 px-3 rounded-lg text-blue-500'
                  >
                    Update
                  </motion.button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </AnimatePresence>
    </motion.table>
  );
};

export default CoursesTable;
