import React, { useState, useEffect } from 'react';
import CoursesPosts from '../../components/courses/post';
import CourseLayout from '../../components/courses/layout/CourseLayout';
import ParticpantsData from '../../components/courses/ParticpantsData';
import withAuth from '../../components/withAuth';
import { selectPostPage } from '../../src/store/post/post.selector';
import Announcement from '../../components/Announcement/Announcement';
import { useSelector } from 'react-redux';

const Participants = ({ id, user }) => {
  const postPage = useSelector(selectPostPage);

  console.log(postPage);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

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

  return (
    <div
      className='min-h-screen font-sans
      w-full relative bg-white 
      flex flex-col 
    '
    >
      {/* {loading && <LinearProgress />} */}

      <div className='px-4 mt-4'>
        <p
          className='text-gray-500 
       '
        >
          This is the courses feed page
        </p>
      </div>
      <CourseLayout
        page={postPage}
        id={id}
      >
        {postPage == 1 && (
          <ParticpantsData
            setData={setData}
            id={id}
            data={data}
          />
        )}
        {postPage == 2 && (
          <CoursesPosts
            loading={loading}
            id={id}
            setLoading={setLoading}
          />
        )}
        {postPage === 3 && (
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
