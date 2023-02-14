import React, { useState, useEffect } from 'react';
import CoursesPosts from '../../components/post';
import CourseLayout from '../../components/courses/layout/CourseLayout';
import { LinearProgress } from '@mui/material';
import ParticpantsData from '../../components/courses/ParticpantsData';
import withAuth from '../../components/withAuth';
import Announcement from '../../components/Announcement/Announcement';

const Participants = ({ id, user }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    console.count('useEffect');
    const getParticipants = async () => {
      try {
        const res = await fetch(`https://vast-pink-moth-toga.cyclic.app/courses/${id}/participants`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user}`,
          },
        });
        const data = await res.json();
        setData(data);
      } catch (err) {
        console.log(err);
      }
    };
    getParticipants();
  }, []);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);

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
            setData={setData}
            id={id}
            data={data}
          />
        )}
        {page === 2 && (
          <CoursesPosts
            id={id}
            setLoading={setLoading}
          />
        )}
        {page === 3 && (
          <Announcement
            id={id}
            setLoading={setLoading}
          />
        )}
      </CourseLayout>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { id, user } = context.query;

  return {
    props: {
      user,
      id,
    },
  };
}

export default withAuth(Participants);
