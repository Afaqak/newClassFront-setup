import React, { useEffect, useState } from 'react';
import { selectCurrentUser } from '../src/store/user/user.selector';
import CreateAnnouncement from './createAnnouncement';
import { useSelector } from 'react-redux';
const Announcement = () => {
  const [toggleAnnouncement, setToggleAnnouncement] = useState(false);
  const user = useSelector(selectCurrentUser);
  const [announcement, setAnnouncement] = useState([]);
  //getting 10 latest announcements
  let slicedAnnouncement = [];
  if (announcement.length > 0) {
    announcement.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    slicedAnnouncement = announcement.slice(0, 10);
  }
  useEffect(() => {
    const getAnnouncement = async () => {
      try {
        const res = await fetch('https://vast-pink-moth-toga.cyclic.app/groups/announcements', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        });
        const data = await res.json();
        console.log(data);
        setAnnouncement(data);
      } catch (error) {
        console.log(error);
      }
    };
    getAnnouncement();
  }, []);
  console.log(announcement);
  const formatDate = (date) => {
    const d = new Date(date);
    const dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    const timeOptions = { hour: 'numeric', minute: 'numeric' };
    const formattedDate = d.toLocaleDateString('en-US', dateOptions);
    const formattedTime = d.toLocaleTimeString('en-US', timeOptions);
    return `${formattedDate} at ${formattedTime}`;
  };

  return (
    <div className='px-4 py-3 mb-8 bg-white  dark:bg-gray-800'>
      {' '}
      <div className='flex-1 px-4 mt-3'></div>
      <h1 className='text-2xl font-semibold tracking-wide'>Announcements</h1>
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
      {slicedAnnouncement?.map((ann) => (
        <div
          className='
        bg-blue-50 dark:bg-gray-800 max-w-2xl overflow-hidden
        px-4 py-2 mt-6 flex flex-col gap-2 rounded-md'
        >
          <p
            className='text-blue-500 text-[0.75rem] font-bold tracking-wider
          '
          >
            {ann?.author}
          </p>
          <h1 className='text-sm font-semibold '>{ann?.title}</h1>
          <p
            className='text-gray-600 break-words
          '
          >
            {ann.body}
          </p>
          <p
            className='text-gray-600 
            flex justify-end text-sm font-semibold
          '
          >
            {formatDate(ann?.createdAt)}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Announcement;
