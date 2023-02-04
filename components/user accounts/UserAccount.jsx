import React from 'react';
import Image from 'next/image';
const UserAccount = ({ userData, user }) => {
  const tagAsigner = (admin, teacher) => {
    if (admin && teacher) {
      return <span className='text-blue-600 text-[0.6rem] tracking-widest font-bold'>Admin/teacher</span>;
    }
    if (admin) {
      return <span className='ml-1 text-blue-600 text-[0.6rem] tracking-widest font-bold'>Admin</span>;
    }
    return <span className='text-blue-600 text-[0.6rem] tracking-widest font-bold'>Student</span>;
  };

  return (
    <div className=' min-h-screen dark:bg-gray-900'>
      <div className='font-sans'>
        {' '}
        <h1 className='text-3xl font-semibold text-gray-900 dark:text-gray-50 tracking-wide'>User Account</h1>
        <p className='text-slate-800 dark:text-slate-700 block mb-6'>checkout your account details</p>
        <div>
          <div
            className='
          w-[60%] md:w-[80%] sm:w-[70%]
          bg-[#e2f2ff] border flex flex-col md:flex-row items-center rounded-lg shadow-lg p-4'
          >
            <div className='bg-blue-500'>
              <Image
                className='w-[40%] sm:w-[70%] md:w-[100%]'
                src={'/Humaaans.svg'}
                width={250}
                height={250}
              />
            </div>
            <div className='section_2 p-5 mt-2 '>
              <div className='flex flex-col'>
                <p className='text-slate-800 font-bold dark:text-slate-700 block mb-4'>
                  Username:
                  <span className='ml-2 text-slate-700 font-medium '>
                    {user.username}
                    {tagAsigner(user.admin, userData.teacher)}
                  </span>
                </p>
                <p className='text-slate-800 font-bold dark:text-slate-700 block mb-4'>
                  Email:{' '}
                  <span
                    className='ml-2 
                  text-slate-700 font-medium
                  '
                  >
                    {user.email}
                  </span>
                </p>
                <p
                  className='text-slate-800 font-bold 
                 dark:text-slate-700 block mb-4'
                >
                  Batch:{' '}
                  <span
                    className='ml-2 
                  text-slate-700 font-medium
                  '
                  >
                    {user.batch}
                  </span>
                </p>
                <p className='text-slate-800 font-bold dark:text-slate-700 block mb-4'>
                  Program:{' '}
                  <span
                    className='ml-2 
                  text-slate-700 font-medium
                  '
                  >
                    {user.program}
                  </span>
                </p>
                <p className='text-slate-800 font-bold dark:text-slate-700 block mb-4'>
                  Group:{' '}
                  <span
                    className='ml-2
                  text-slate-700 font-medium
                  '
                  >
                    {user.group}
                  </span>
                </p>
                <p className='text-slate-800 font-bold dark:text-slate-700 block mb-4'>
                  Semesters:{' '}
                  <span
                    className='ml-2
                  text-slate-700 font-medium
                  '
                  >
                    {user?.semesters?.length}
                  </span>
                </p>
                <p className='text-slate-800 font-bold dark:text-slate-700 block mb-4'>
                  Valid:{' '}
                  <span
                    className='ml-2
                  text-slate-700 font-medium
                  '
                  >
                    {user.valid ? 'Valid' : 'Not Valid'}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAccount;

// const {
//   user.username,
//   user.batch,
//   user.program,
//   user.group,
//   user.semesters,
//   user.valid,
//   user.email,
//   user.admin,
//   user.teacher,
// }
