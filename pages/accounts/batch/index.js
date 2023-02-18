import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import Heading_1 from '../../../components/Heading_1';
import { Checkbox, LinearProgress } from '@mui/material';
import { notify } from '../../../utils/tools';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FetchTypeGet } from '../../../utils/fetch/fetchtypeget';
import { selectCurrentUser } from '../../../src/store/user/user.selector';
import { MontserratFont } from '../../../utils/fonts';
import withAuth from '../../../components/withAuth';

const Batches = () => {
  const router = useRouter();
  const { batchId, session } = router.query;
  const [loading, setLoading] = useState(false);
  const { token } = useSelector(selectCurrentUser);
  const [batches, setBatches] = useState([]);

  const handleTeacherChange = async (id, value) => {
    try {
      setLoading(true);
      let res = await fetch(`https://vast-pink-moth-toga.cyclic.app/accounts/MarkTeacher/${id} `, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ teacher: value }),
      });
      const data = await res.json();
      const newBatches = batches.map((batchInfo) => (batchInfo._id === data._id ? data : batchInfo));
      setBatches(newBatches);
      notify('changed status');
    } catch (err) {
      notify(err.message, 'error');
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleValidChange = async (id, value) => {
    try {
      setLoading(true);
      let res = await fetch(`https://vast-pink-moth-toga.cyclic.app/accounts/changeValidity/${id} `, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ valid: value }),
      });
      const data = await res.json();
      const newBatches = batches.map((batchInfo) => (batchInfo._id === data._id ? data : batchInfo));
      setBatches(newBatches);
      notify('changed status');
    } catch (err) {
      notify(err.message, 'error');
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const getBatches = async () => {
      try {
        setLoading(true);
        const res = await FetchTypeGet(`https://vast-pink-moth-toga.cyclic.app/batches/${batchId}/programs`, token);
        setBatches(res);
      } catch (err) {
        console.log(err);
        notify(err.message, 'error');
      } finally {
        setLoading(false);
      }
    };
    getBatches();
  }, []);

  console.log(batches);
  return (
    <div className={`min-h-screen w-full relative bg-white flex flex-col  ${MontserratFont.className}`}>
      {loading && <LinearProgress />}
      <button
        onClick={() => router.back()}
        className='flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full mx-4 my-4'
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      {session === 'teacher' ? (
        <div className='px-4'>
          <Heading_1 label='students' />
          <p className='text-sm text-gray-600 mb-2 px-3 py-2'>List of all students</p>
          {batches.map((userinfo) => (
            <div className='bg-gray-100 mb-3 border-l-4 border-r-4 border-blue-400 text-gray-800 p-2 rounded-lg'>
              <p className='text-xl font-bold'>{userinfo.email}</p>
              <div className='flex flex-row items-center'></div>
              <div className='flex flex-row items-center mt-2'>
                <Checkbox
                  onClick={(e) => {
                    handleTeacherChange(userinfo._id, e.target.checked);
                  }}
                  checked={userinfo.teacher}
                  disabled={userinfo.teacher || loading}
                />
                <p className='text-sm ml-2'>Teacher</p>
              </div>
              <div className='flex flex-row items-center'>
                <Checkbox
                  checked={userinfo.valid}
                  disabled={loading}
                  onChange={(e) => {
                    handleValidChange(userinfo._id, e.target.checked);
                  }}
                />
                <p className='text-sm ml-2'>Valid</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='px-4'>
          <div className='flex flex-col'>
            <Heading_1 label='programs' />
            <p className='text-sm text-gray-500 mb-2 py-2'>List of all programs</p>
          </div>
          <div className='flex flex-col gap-2 py-3'>
            {batches.map((batch) => (
              <Link
                href={`/accounts/batch/group?programId=${batch._id}&batchId=${batchId}`}
                key={batch._id}
                className={`p-2 border-2 border-gray-300  hover:bg-gray-200 `}
              >
                <span className='text-lg cursor-pointer'>{batch.program}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
      <Toaster />
    </div>
  );
};

export default withAuth(Batches);
