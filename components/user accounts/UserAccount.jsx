import React from 'react';
import Image from 'next/image';
const UserAccount = ({ userData, user }) => {
  const tagAsigner = (admin, teacher) => {
    if (admin && teacher) {
      return <span className='ml-2 text-cyan-600 text-[0.6rem] tracking-widest font-bold'>Admin/teacher</span>;
    }
    if (admin) {
      return <span className='ml-2 text-cyan-600 text-[0.6rem] tracking-widest font-bold'>Admin</span>;
    }
    return <span className='ml-2 text-cyan-600 text-[0.6rem] tracking-widest font-bold'>Student</span>;
  };

  return (
    <div className=' min-h-screen dark:bg-gray-900'>
      <div>
        {' '}
        <h1 className='text-3xl font-semibold text-gray-900 dark:text-gray-50 tracking-wide'>User Account</h1>
        <p className='text-slate-800 dark:text-slate-700 block mb-4'>checkout your account details</p>
        <div>
          <div className=' w-[80%] bg-red-500 flex'>
            <div className='bg-blue-500'>
              <Image
                src={'/Humaaans.svg'}
                width={200}
                height={200}
              />
            </div>
            <div className='section_2'>sdgsd</div>
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
