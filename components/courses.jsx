import React from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../src/store/user/user.selector';
import { useRouter } from 'next/router';

const tableHead = ['Course', 'Semester', 'Group', 'Teacher', 'Credits', 'Posts', 'Participants', 'Action'];

const CoursesTable = ({ courses, deleteCourse, toggleUpdateCourse, loading, noAction }) => {
  const user = useSelector(selectCurrentUser);
  const router = useRouter();
  return (
    <table className='w-full mt-4'>
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
            className='hover:bg-gray-100'
          >
            <td
              onClick={() => router.push(`/courses/${item?._id}?user=${user?.token}`)}
              className='p-3 whitespace-nowrap cursor-pointer hover:underline'
            >
              {item?.name}
            </td>
            <td
              onClick={() => router.push(`/courses/${item?._id}?user=${user?.token}`)}
              className='p-3 text-gray-700 whitespace-nowrap cursor-pointer hover:underline'
            >
              {item?.semester}
            </td>
            <td
              onClick={() => router.push(`/courses/${item?._id}?user=${user?.token}`)}
              className='p-3 text-gray-700 whitespace-nowrap cursor-pointer hover:underline'
            >
              {item?.group}
            </td>
            <td
              onClick={() => router.push(`/courses/${item?._id}?user=${user?.token}`)}
              className='p-4 text-gray-700 whitespace-nowrap cursor-pointer hover:underline'
            >
              {item?.teacher}
            </td>
            <td className='p-3 text-gray-700 whitespace-nowrap'>{item?.credit}</td>
            <td
              onClick={() => router.push(`/courses/${item?._id}?user=${user?.token}`)}
              className='p-3 text-gray-700 whitespace-nowrap cursor-pointer hover:underline'
            >
              {item?.posts?.length || 0}
            </td>
            <td
              onClick={() => router.push(`/courses/${item?._id}?user=${user?.token}`)}
              className='p-3 text-gray-700 whitespace-nowrap cursor-pointer hover:underline'
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
      </tbody>
    </table>
  );
};

export default CoursesTable;
