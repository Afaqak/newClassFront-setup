import React from 'react';

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
    <div className=' min-h-screen bg-gray-50 dark:bg-gray-900'>
      <h1
        className='text-4xl font-semibold pb-4
        border-b-2 border-gray-200
        '
      >
        User Info
      </h1>
      <div className='mt-4'>
        <div className='flex flex-col-reverse md:flex-row items-center'>
          <div>
            <div
              className='font-bold bg-black 
        p-2 text-center text-white
        '
            >
              <span className='font-semibold ml-2 text-2xl'>
                {user?.username}

                {tagAsigner(user?.admin, user?.teacher)}
              </span>
            </div>
            <div
              className='bg-opacity-90 backdrop-filter backdrop-blur-sm bg-gray-100 p-2 mt-4
    w-[20rem] sm:w-[25rem] dark:bg-opacity-100
  md:w-[40rem] 
  '
            >
              <div className='text-gray-600 font-bold mt-2 border-b p-2 hover:bg-gray-200 cursor-pointer'>
                Email:
                <span className='text-gray-800 font-semibold ml-2'>{user?.email}</span>
              </div>
              <div className='text-gray-600 font-bold mt-2 border-b p-2 hover:bg-gray-200 cursor-pointer'>
                Batch:
                <span className='text-gray-800 font-semibold ml-2'>{user?.batch}</span>
              </div>
              <div className='text-gray-600 font-bold mt-2 border-b p-2 hover:bg-gray-200 cursor-pointer'>
                Program:
                <span className='text-gray-800 font-semibold ml-2'>{user?.program}</span>
              </div>
              <div className='text-gray-600 font-bold mt-2 border-b p-2 hover:bg-gray-200 cursor-pointer'>
                Group:
                <span className='text-gray-800 font-semibold ml-2'>{user?.group}</span>
              </div>
              <div className='text-gray-600 font-bold mt-2 border-b p-2 hover:bg-gray-200 cursor-pointer'>
                Semester:
                <span className='text-gray-800 font-semibold ml-2'>{user?.semesters?.length === 0 ? 'Not set' : user?.semesters[0].semester}</span>
              </div>
              <div className='text-gray-600 font-bold mt-2 border-b p-2 hover:bg-gray-200 cursor-pointer'>
                Verified:
                <span className='text-gray-800 font-semibold ml-2'>{user?.valid ? 'Yes' : 'No'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAccount;
