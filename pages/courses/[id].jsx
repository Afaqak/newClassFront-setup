import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../src/store/user/user.selector';
import CoursesPosts from '../../components/post';
import CourseLayout from '../../components/courses/layout/CourseLayout';
import { LinearProgress } from '@mui/material';
import ParticpantsData from '../../components/courses/ParticpantsData';
import withAuth from '../../components/withAuth';
import Announcement from '../../components/Announcement/Announcement';

const Participants = ({ data, id }) => {
  console.log('participant', data, id);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);

  const user = useSelector(selectCurrentUser);
  const { admin, teacher } = user?.user || {};

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
        {page == 1 && (
          <ParticpantsData
            id={id}
            data={data}
          />
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

  const res = await fetch(`https://vast-pink-moth-toga.cyclic.app/courses/${id}/participants`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user}`,
    },
  });

  // if (!res) {
  //   return {
  //     props: {
  //       notFound: true,
  //     },
  //   };
  // }
  const data = await res.json();
  // if (!data) {
  //   return {
  //     props: {
  //       notFound: true,
  //     },
  //   };
  // }
  return {
    props: {
      data,
      id,
    },
  };
}

export default withAuth(Participants);
