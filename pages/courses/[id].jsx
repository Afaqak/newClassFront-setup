import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../src/store/user/user.selector';
import CoursesPosts from '../../components/post';
import CourseLayout from '../../components/courses/layout/CourseLayout';
import { LinearProgress } from '@mui/material';
import withAuth from '../../components/withAuth';
import Announcement from '../../components/Announcement/Announcement';
import useFetchUsers from '../../src/customHooks/useFetchUsers.h';
const Participants = ({ data, id }) => {
  console.log('Serverdata', data);

  const [loading, setLoading] = useState(false);
  const [participants, setParticipants] = useState(data);
  const [page, setPage] = useState(1);
  const [input, setInput] = useState({ student: '' });
  const user = useSelector(selectCurrentUser);
  const { admin } = user?.user || {};
  const { users } = useFetchUsers();

  const addParticipant = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(`https://vast-pink-moth-toga.cyclic.app/courses/${id}/participants`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(input),
      });
      console.log('res', res);
      if (res.ok) {
        setParticipants([...participants, input]);
        setToggle(false);
      } else {
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className='min-h-screen font-sans
      w-full relative bg-white 
      flex flex-col dark:bg-gray-900 
    '
    >
      {loading && <LinearProgress />}

      <div className='px-4 mt-4'>
        <p
          className='text-gray-500 
        dark:text-gray-400'
        >
          This is the courses feed page
        </p>
      </div>
      <CourseLayout
        setPage={setPage}
        page={page}
        id={id}
      >
        {page === 1 && (
          <div
            className='flex flex-col w-4/5 px-4  gap-y-2  
          '
          >
            {admin && (
              <form
                className='w-1/2 py-2 text-gray-700 dark:text-gray-400'
                onSubmit={addParticipant}
              >
                <span className='text-xs text-gray-500'>Select the student ID from the dropdown to add</span>
                <select
                  className='shadow appearance-none border border-blue-500 rounded block py-2 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  name='studentId'
                  id='studentId'
                  onChange={(e) => setInput({ student: e.target.value })}
                >
                  {users.map((account) => (
                    <option
                      key={account._id}
                      value={account._id}
                    >
                      {account._id}
                    </option>
                  ))}
                </select>

                <button
                  className='bg-slate-900 mt-4 text-white py-1 px-5 rounded-lg'
                  type='submit'
                >
                  Add
                </button>
              </form>
            )}

            <h1 className='text-xl font-bold tracking-wide text-slate-900'>All Participants</h1>
            {Array.isArray(data) &&
              data?.map((dataP) => (
                <div
                  key={dataP?._id}
                  className='flex items-center justify-between px-4 py-2 border hover:bg-gray-100 cursor-pointer'
                >
                  {dataP?.participant?.username}
                </div>
              ))}
          </div>
        )}
        {page === 2 && <CoursesPosts id={id} />}
        {page === 3 && (
          <Announcement
            id={id}
            setLoading={setLoading}
          />
        )}
      </CourseLayout>

      {/* <div className='flex flex-col w-full px-4 py-4 gap-y-2'>
        {participants.map((participant) => (
          <div
            key={participant._id}
            className='flex items-center justify-between px-4 py-2 border '
          >
            {participant._id}
          </div>
        ))}
      </div> */}
    </div>
  );
};

export async function getServerSideProps(context) {
  const { id, user } = context.query;
  try {
    const res = await fetch(`https://vast-pink-moth-toga.cyclic.app/courses/${id}/participants`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user}`,
      },
    });

    if (!res) {
      return {
        notFound: true,
      };
    }
    const data = await res.json();
    if (!data) {
      return {
        notFound: true,
      };
    }
    return {
      props: {
        data,
        id,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      error: err.message,
    };
  }
}

export default withAuth(Participants);
