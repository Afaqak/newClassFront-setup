import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { notify } from '../../../utils/tools';
import { FetchTypeGet } from '../../../utils/fetch/fetchtypeget';
import { selectCurrentUser } from '../../../src/store/user/user.selector';
const Batches = () => {
  const router = useRouter();
  const { batchId } = router.query;
  const userData = useSelector(selectCurrentUser);
  const [batches, setBatches] = useState([]);

  useEffect(() => {
    const getBatches = async () => {
      try {
        const res = await FetchTypeGet(`https://vast-pink-moth-toga.cyclic.app/batches/${batchId}/programs`, userData.token);
        setBatches(res);
      } catch (err) {
        notify(err.message, 'error');
        console.log(err);
      }
    };
    getBatches();
  }, []);

  console.log(batches);
  return (
    <div
      className='min-h-screen font-sans mt-5
  w-full relative bg-white 
  flex flex-col dark:bg-gray-900 
'
    >
      <div className='flex flex-col '>
        <h1 className='text-4xl font-semibold px-3 py-1'>Batches</h1>
        <p className='text-sm text-gray-500 mb-2 px-3 py-2'>List of all batches</p>
      </div>
      <div className='flex flex-col gap-2 p-3'>
        {batches.map((batch) => (
          <Link
            href={`/accounts/batch/group?programId=${batch._id}&batchId=${batchId}`}
            key={batch._id}
            className={` 
              p-2 border-2 border-gray-300 dark:border-gray-700 
              hover:bg-gray-200 dark:hover:bg-gray-800
            `}
          >
            <span className='text-lg cursor-pointer'>{batch.program}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Batches;
