import React, { useState } from 'react';
import { selectCurrentUser } from '../../src/store/user/user.selector';
import CreateAnnouncement from './createAnnouncement';
import ShowAnnouncement from './showAnnouncement';
import { useSelector } from 'react-redux';
import useAnnouncementsHook from '../../src/customHooks/useAnnouncementsHook';
import DeletePopup from './deletePopup';

const Announcement = ({ id, setLoading }) => {
  const [toggleAnnouncement, setToggleAnnouncement] = useState(false);
  const {
    token,
    user: { admin },
  } = useSelector(selectCurrentUser);
  const [announcement, setAnnouncement] = useState([]);
  const [toggleDelete, setToggleDelete] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  //getting 10 latest announcements
  let slicedAnnouncement = [];
  if (announcement.length > 0) {
    announcement.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    slicedAnnouncement = announcement.slice(0, 10);
  }

  useAnnouncementsHook(setAnnouncement, setLoading, id, token);

  const handleDelete = (id) => {
    console.log(id);
    setDeleteId(id);
    setToggleDelete(!toggleDelete);
  };

  const handleDeleteAnnouncement = async (idCourse) => {
    try {
      setLoading(true);
      const res = await fetch(`https://vast-pink-moth-toga.cyclic.app/courses/${id}/announcements/${idCourse}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        setLoading(false);
        setAnnouncement(announcement.filter((item) => item._id !== idCourse));
        notify('Announcement deleted', 'success');
        setToggleDelete(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
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
          type='course announcement'
          id={id}
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
      <div>
        <ShowAnnouncement
          mode={'courseAnnouncement'}
          announcements={slicedAnnouncement}
          handleDelete={handleDelete}
          admin={admin}
        />
      </div>
    </div>
  );
};

export default Announcement;