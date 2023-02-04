import React, { useEffect, useState } from 'react';
import { selectCurrentUser } from '../src/store/user/user.selector';
import CreateAnnouncement from './createAnnouncement';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import DeletePopup from './deletePopup';
const Announcement = ({ setLoading }) => {
  const [toggleAnnouncement, setToggleAnnouncement] = useState(false);
  const user = useSelector(selectCurrentUser);
  const [announcement, setAnnouncement] = useState([]);
  //getting 10 latest announcements
  let slicedAnnouncement = [];
  if (announcement.length > 0) {
    announcement.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    slicedAnnouncement = announcement.slice(0, 10);
  }

  const [toggleDelete, setToggleDelete] = useState(false);

  const [deleteId, setDeleteId] = useState('');

  const handleDelete = (id) => {
    setDeleteId(id);
    setToggleDelete(!toggleDelete);
  };

  const handleDeleteAnnouncement = async (id) => {
    try {
      setLoading(true);
      const res = await fetch(`https://vast-pink-moth-toga.cyclic.app/groups/announcements/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        setLoading(false);
        notify('Announcement deleted', 'success');
        setToggleDelete(!toggleDelete);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const getAnnouncement = async () => {
      try {
        setLoading(true);
        const res = await fetch('https://vast-pink-moth-toga.cyclic.app/groups/announcements', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        });
        const data = await res.json();
        console.log(data);
        setLoading(false);
        setAnnouncement(data);
      } catch (error) {
        console.log(error);
        setLoading(false);
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
      {toggleDelete && (
        <DeletePopup
          setLoading={setLoading}
          toggleDelete={toggleDelete}
          setToggleDelete={setToggleDelete}
          handleDelete={() => handleDeleteAnnouncement(deleteId)}
        />
      )}
      {toggleAnnouncement && (
        <CreateAnnouncement
          announcement={announcement}
          setAnnouncement={setAnnouncement}
          toggleAnnouncement={toggleAnnouncement}
          setToggleAnnouncement={setToggleAnnouncement}
        />
      )}
      <button
        className='bg-blue-500 text-white px-4 py-1 rounded-md mt-2'
        onClick={() => setToggleAnnouncement(!toggleAnnouncement)}
      >
        Announce!
      </button>
      {slicedAnnouncement?.map((ann) => (
        <div
          className='
        bg-blue-50 dark:bg-gray-800 max-w-[34rem] overflow-hidden md:max-w-2xl relative 
        px-4 py-2 mt-6 flex flex-col gap-2 rounded-md'
        >
          {user?.user?.admin && (
            <button
              onClick={() => handleDelete(ann._id)}
              className='bg-red-500 text-white px-2 rounded-md absolute right-5'
            >
              <FontAwesomeIcon
                size='xs'
                icon={faTrash}
              />
            </button>
          )}
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
