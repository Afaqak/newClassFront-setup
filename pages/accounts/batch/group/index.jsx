import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../../src/store/user/user.selector';
import { useEffect } from 'react';
import Link from 'next/link';
const groups = () => {
  const userData = useSelector(selectCurrentUser);
  const [groups, setGroups] = useState([]);
  const router = useRouter();
  const { batchId, programId } = router.query;

  console.log(batchId, programId);

  useEffect(() => {
    const getGroups = async () => {
      try {
        const res = await fetch(`https://vast-pink-moth-toga.cyclic.app/batches/${batchId}}/programs/${programId}/groups`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userData.token}`,
          },
        });
        const data = await res.json();
        console.log(data);
        setGroups(data);
      } catch (error) {
        console.log(error);
      }
    };
    getGroups();
  }, [batchId, programId]);

  return (
    <div
      className='min-h-screen font-sans mt-5
w-full relative bg-white 
flex flex-col dark:bg-gray-900 
'
    >
      <div className='flex flex-col '>
        <h1 className='text-4xl font-semibold px-3 py-1'>Groups</h1>
        <p className='text-sm text-gray-500 mb-2 px-3 py-2'>All groups in this program</p>
      </div>
      <div className='flex flex-col gap-2 p-3'>
        {groups.map((g) => (
          <Link
            href={`/accounts/batch/group/participant?programId=${programId}&batchId=${batchId}&groupId=${g._id}`}
            key={g.id}
            className='p-2 border-2 border-gray-300 dark:border-gray-700 
          hover:bg-gray-200 dark:hover:bg-gray-800'
          >
            <span className='text-lg cursor-pointer'>{g.group}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

// export async function getServerSideProps(context) {

//   console.log(batchId, programId);
//   const res = await fetch(`https://vast-pink-moth-toga.cyclic.app/batches/${batchId}/programs/${programId}/groups`);
//   const groups = await res.json();
//   return {
//     props: {
//       groups,
//     },
//   };
// }

export default groups;
