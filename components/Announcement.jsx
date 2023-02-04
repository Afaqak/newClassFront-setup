import React, { useEffect, useState } from 'react';
import { selectCurrentUser } from '../src/store/user/user.selector';
import CreateAnnouncement from './createAnnouncement';
import { useSelector } from 'react-redux';
const Announcement = () => {
  const [toggleAnnouncement, setToggleAnnouncement] = useState(false);
  const user = useSelector(selectCurrentUser);
  const [announcement, setAnnouncement] = useState([]);
  useEffect(() => {
    console.log(user);
    const getAnnouncement = async () => {
      const res = await fetch('https://vast-pink-moth-toga.cyclic.app/groups/announcements', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await res.json();
      console.log(data);
      setAnnouncement(data);
    };
    getAnnouncement();
  }, []);
  return (
    <div className='px-4 py-3 mb-8 bg-white  dark:bg-gray-800'>
      {' '}
      <div className='flex-1 px-4 mt-3'></div>
      <h1 className='text-2xl font-semibold'>Announcements</h1>
      <button
        className='bg-blue-500 text-white px-4 py-1 rounded-md mt-2'
        onClick={() => setToggleAnnouncement(!toggleAnnouncement)}
      >
        Announce!
      </button>
      {toggleAnnouncement && (
        <CreateAnnouncement
          announcement={announcement}
          setAnnouncement={setAnnouncement}
          toggleAnnouncement={toggleAnnouncement}
          setToggleAnnouncement={setToggleAnnouncement}
        />
      )}
      {announcement.map((ann) => (
        <div className='bg-white shadow-md rounded-lg px-4 py-3 mt-6'>
          <h1 className='text-xl font-semibold'>{ann.title}</h1>
          <p className='text-gray-600'>{ann.subject}</p>
        </div>
      ))}
    </div>
  );
};

export default Announcement;
