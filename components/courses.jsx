import React from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../src/store/user/user.selector';
import { useRouter } from 'next/router';
import Link from 'next/link';
const tableHead = ['Course', 'Semester', 'Group', 'Teacher', 'Credits', 'Posts', 'Participants', 'Action'];

const CoursesTable = ({ courses, deleteCourse, toggleUpdateCourse, loading, noAction }) => {
  const user = useSelector(selectCurrentUser);
  const router = useRouter();
  return (
    <>
      <table
        className='w-full mt-4 
      border-collapse table-auto hidden md:table
      '
      >
        <thead className='border-b-2 bg-slate-900 text-white'>
          <tr>
            {tableHead.map((item) => (
              <th
                key={item}
                className={`w-20 p-3 text-sm font-medium uppercase text-center tracking-wide ${item === 'Action' && !user?.user.admin && 'hidden'} ${item === 'Action' && noAction && 'hidden'}`}
              >
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-200 text-center'>
          {courses?.map((item) => (
            <tr
              key={item?._id}
              className='hover:bg-gray-100 cursor-pointer'
            >
              <td
                onClick={() => router.push(`/courses/${item?._id}?user=${user?.token}`)}
                className='p-3 whitespace-nowrap cursor-pointer hover:underline'
              >
                {item?.name}
              </td>
              <td
                onClick={() => router.push(`/courses/${item?._id}?user=${user?.token}`)}
                className='table-row_style'
              >
                {item?.semester}
              </td>
              <td
                onClick={() => router.push(`/courses/${item?._id}?user=${user?.token}`)}
                className='table-row_style'
              >
                {item?.group}
              </td>
              <td
                onClick={() => router.push(`/courses/${item?._id}?user=${user?.token}`)}
                className='table-row_style'
              >
                {item?.teacher}
              </td>
              <td
                onClick={() => router.push(`/courses/${item?._id}?user=${user?.token}`)}
                className='table-row_style'
              >
                {item?.credit}
              </td>
              <td
                onClick={() => router.push(`/courses/${item?._id}?user=${user?.token}`)}
                className='table-row_style'
              >
                {item?.posts?.length || 0}
              </td>
              <td
                onClick={() => router.push(`/courses/${item?._id}?user=${user?.token}`)}
                className='table-row_style'
              >
                {item?.participants?.length || 0}
              </td>

              {!noAction && user?.user.admin && (
                <td className={`p-3 space-x-2 ${loading ? 'animate-pulse' : ''}`}>
                  <motion.button
                    whileTap={{ opacity: 0.5 }}
                    whileHover={{ translateY: -2 }}
                    onClick={() => {
                      deleteCourse(item?._id);
                    }}
                    disabled={loading}
                    type='submit'
                    className='bg-slate-900 text-white py-1 px-4 rounded-lg cursor-pointer mb-2'
                  >
                    Delete
                  </motion.button>
                  <motion.button
                    whileTap={{ opacity: 0.5 }}
                    whileHover={{ translateY: -2 }}
                    onClick={() => toggleUpdateCourse(item?._id)}
                    type='submit'
                    className='border-2 border-slate-900 py-1 px-3
                  rounded-lg cursor-pointer '
                  >
                    Update
                  </motion.button>
                </td>
              )}
            </tr>
          ))}

          {/* small screen */}
        </tbody>
      </table>
      {courses?.map((item) => (
        <div
          className='grid grid-cols-1 gap-4 md:hidden mb-4 mt-4
           
        '
        >
          <div className='bg-gray-100 p-4 border-b-2 border-purple-600  shadow-lg hover:bg-gray-200 transition duration-300 ease-in-out cursor-pointer'>
            <div onClick={() => router.push(`/courses/${item?._id}?user=${user?.token}`)}>
              <div className='flex items-center justify-between mb-4'>
                <div className='text-lg font-medium'>{item?.name}</div>
                <div
                  className='text-sm text-green-500 font-medium
              '
                >
                  S{item?.semester}
                </div>
              </div>
              <div className='grid grid-cols-2 gap-4 text-sm mb-4'>
                <div>
                  <div className='text-gray-400'>Teacher:</div>
                  <div className='font-medium'>{item?.teacher}</div>
                </div>
                <div>
                  <div className='text-gray-400'>Credit:</div>
                  <div className='font-medium'>{item?.credit}</div>
                </div>
              </div>
              <div className='grid grid-cols-2 gap-4 text-sm mb-4'>
                <div>
                  <div className='text-gray-400'>Posts:</div>
                  <div className='font-medium'>{item?.posts?.length || 0}</div>
                </div>
                <div>
                  <div className='text-gray-400'>Participants:</div>
                  <div className='font-medium'>{item?.participants?.length || 0}</div>
                </div>
              </div>
            </div>
            {!noAction && user?.user.admin && (
              <div className='flex items-center justify-between'>
                <motion.button
                  whileTap={{ opacity: 0.5 }}
                  whileHover={{ translateY: -2 }}
                  onClick={() => deleteCourse(item?._id)}
                  disabled={loading}
                  type='submit'
                  className='course-btn_delete'
                >
                  Delete
                </motion.button>
                <motion.button
                  whileTap={{ opacity: 0.5 }}
                  whileHover={{ translateY: -2 }}
                  onClick={() => toggleUpdateCourse(item?._id)}
                  type='submit'
                  className='px-4 py-1 bg-gray-100 text-gray-800 rounded-lg shadow-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition-colors duration-300'
                >
                  Update
                </motion.button>
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default CoursesTable;
