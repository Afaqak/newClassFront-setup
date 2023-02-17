import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { Checkbox, LinearProgress } from '@mui/material';
import { notify } from '../../../utils/tools';
import { FetchTypeGet } from '../../../utils/fetch/fetchtypeget';
import { selectCurrentUser } from '../../../src/store/user/user.selector';
import { MontserratFont } from '../../../utils/fonts';

const Batches = () => {
  const router = useRouter();
  const { batchId, session } = router.query;
  const [loading, setLoading] = useState(false)
  const { token, user } = useSelector(selectCurrentUser);
  const [batches, setBatches] = useState([]);

  const handleTeacherChange = async (id, value) => {
    try {
      setLoading(true)
      let res = await fetch(`https://vast-pink-moth-toga.cyclic.app/accounts/MarkTeacher/${id} `, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ teacher: value }),
      });
      const data = await res.json()
      const newBatches = batches.map(batchInfo => batchInfo._id === data._id ? data : batchInfo);
      setBatches(newBatches)
      notify("changed user status")
    } catch (err) {
      notify(err.message, 'error')
      console.log(err);
    } finally {
      setLoading(false)
    }

  }

  const handleValidChange = async (id, value) => {
    try {
      setLoading(true)
      let res = await fetch(`https://vast-pink-moth-toga.cyclic.app/accounts/changeValidity/${id} `, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ valid: value }),
      });
      const data = await res.json()
      const newBatches = batches.map(batchInfo => batchInfo._id === data._id ? data : batchInfo);
      setBatches(newBatches)
      notify("user user status")
    } catch (err) {
      notify(err.message, 'error')
      console.log(err)
    }
    finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    const getBatches = async () => {
      try {
        setLoading(true)
        const res = await FetchTypeGet(`https://vast-pink-moth-toga.cyclic.app/batches/${batchId}/programs`, token);

        setBatches(res);

      } catch (err) {
        notify(err.message, 'error');
        console.log(err);

      } finally { setLoading(false) }
    };
    getBatches();
  }, []);


  console.log(batches);
  return (
    <div className={`min-h-screen w-full relative bg-white flex flex-col dark:bg-gray-900 ${MontserratFont.className}`}>
      {loading && <LinearProgress />}
      {
        session === 'teacher' ? (
          <div className='p-4'>
            <h1 className='text-4xl font-semibold px-3'>students</h1>
            <p className='text-sm text-gray-500 mb-2 px-3 py-2'>List of all students</p>
            {batches.map((userinfo) => (
              <div className="bg-gray-100 mb-2 border-l-4 border-r-4 border-blue-400 text-gray-800 p-2 rounded-lg">
                <p className="text-xl font-bold">{userinfo.email}</p>
                <div className="flex flex-row items-center">
                  <p className="text-sm ml-2">{user.admin ? 'admin' : "student"}</p>
                </div>
                <div className="flex flex-row items-center mt-2">
                  <Checkbox
                    onClick={(e) => { handleTeacherChange(userinfo._id, e.target.checked) }}
                    checked={userinfo.teacher} disabled={userinfo.teacher || loading} />
                  <p className="text-sm ml-2">Teacher</p>
                </div>
                <div className="flex flex-row items-center">
                  <Checkbox checked={userinfo.valid}
                    disabled={loading}
                    onChange={(e) => {
                      handleValidChange(userinfo._id, e.target.checked)
                    }} />
                  <p className="text-sm ml-2">Valid</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className='p-4'>
            <div className='flex flex-col'>
              <h1 className='text-4xl font-semibold px-3 py-1'>programs</h1>
              <p className='text-sm text-gray-500 mb-2 px-3 py-2'>List of all programs</p>
            </div>
            <div className='flex flex-col gap-2 p-3'>
              {batches.map((batch) => (
                <Link
                  href={`/accounts/batch/group?programId=${batch._id}&batchId=${batchId}`}
                  key={batch._id}
                  className={`p-2 border-2 border-gray-300 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-800`}
                >
                  <span className='text-lg cursor-pointer'>{batch.program}</span>
                </Link>
              ))}
            </div>
          </div>
        )
      }
      <Toaster />
    </div>
  );

};

export default Batches;
