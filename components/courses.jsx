import React from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../src/store/user/user.selector';
import Link from 'next/link';

const tableHead = ['Course', 'Semester', 'Group', 'Teacher', 'Credits', 'Posts', 'Participants', 'Action'];

const CoursesTable = ({ courses, deleteCourse, toggleUpdateCourse, loading, noAction }) => {
  const user = useSelector(selectCurrentUser);

  return (
    <table
      className='w-full whitespace-nowrap mt-4
            '
    >
      <thead
        className=' border-b-2 bg-slate-900 text-gray-100
               border-gray-200'
      >
        <tr>
          {tableHead.map((item) => (
            <th
              key={item}
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

      <tbody className='divide-y divide-gray-100 w-full'>
        {courses?.map((item) => (
          <tr
            key={item?._id}
            className='bg-white text-center
                  hover:bg-gray-100 dark:hover:bg-gray-200
                  '
          >
            <Link
              href={`/courses/${item?._id}`}
              as={`/courses/${item?._id}?user=${user?.token}`}
            >
              <td className='p-3 text-sm border-b border-blue-500 text-blue-500 whitespace-nowrap'>{item?.name}</td>
            </Link>
            <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>{item?.semester}</td>
            <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>{item?.group}</td>
            <td className='p-4 text-sm text-gray-700 whitespace-nowrap'>{item?.teacher}</td>
            <td
              className={`p-3 text-sm dark:text-gray-900 text-gray-700
                      whitespace-nowrap`}
            >
              {item?.credit}
            </td>
            <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>{item?.posts?.length || 0}</td>
            <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>{item?.participants?.length || 0}</td>

            {!noAction && user?.user.admin && (
              <td className={`p-3 text-sm space-x-2 text-gray-700 whitespace-nowrap ${loading ? 'animate-pulse' : ''}`}>
                <motion.button
                  whileTap={{ opacity: 0.5 }}
                  whileHover={{ translateY: -2 }}
                  onClick={() => {
                    deleteCourse(item?._id);
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
                  onClick={() => toggleUpdateCourse(item?._id)}
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
    </table>
  );
};

export default CoursesTable;
