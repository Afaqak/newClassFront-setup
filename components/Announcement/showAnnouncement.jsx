import React, { useState } from 'react';
import formatDate from '../../utils/tools';
import { notify } from '../../utils/tools';
import Image from 'next/image';
import UpdateAnnouncement from './updateAnnouncement';
import { setAnnouncementRedux } from '../../src/store/announcement/ancment.action';
import { selectAnnouncement } from '../../src/store/announcement/ancment.reselect';
import { Toaster } from 'react-hot-toast';
import { selectCurrentUser } from '../../src/store/user/user.selector';
import { useSelector, useDispatch } from 'react-redux';

const ShowAnnouncement = ({ announcements, handleDelete, admin, mode, courseId, setAnnouncement }) => {
  const selectedAnnouncement = useSelector(selectAnnouncement);
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const [toggleUpdate, setToggleUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    title: '',
    subject: '',
    _id: '',
  });

  const handleUpdate = (id) => {
    console.log(input, courseId, user);
    const announcement = announcements.find((ann) => ann._id === id);
    console.log(announcement);
    setToggleUpdate(true);
    setInput({ title: announcement.title, subject: announcement.body, _id: announcement._id });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  };

  const handleUpdateSubmit = async (event) => {
    event.preventDefault();
    const check = Object.values(input).every((item) => item !== '');
    if (!check) {
      notify('Please fill all fields', 'error');
      return;
    }

    try {
      setLoading(true);
      let res = await fetch(`https://vast-pink-moth-toga.cyclic.app/courses/${courseId}/announcements/${input._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ title: input.title, subject: input.subject }),
      });
      const data = await res.json();

      const newAnn = announcements.map((ann) => (ann._id === input._id ? data : ann));

      if (!res.ok) {
        notify(data.message, 'error');
        return;
      }
      setAnnouncement(newAnn);
      notify('Announcement updated successfully', 'success');
      setToggleUpdate(false);
    } catch (error) {
      notify(error.message, 'error');
      setToggleUpdate(false);
    } finally {
      setLoading(false);
    }
  };

  const handleGroupUpdate = async (event) => {
    event.preventDefault();
    console.log(input._id, input.title, input.subject);
    const check = Object.values(input).every((item) => item !== '');
    if (!check) {
      notify('Please fill all fields', 'error');
      return;
    }

    try {
      setLoading(true);
      let res = await fetch(`https://vast-pink-moth-toga.cyclic.app/groups/announcements/${input._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ title: input.title, subject: input.subject }),
      });
      const data = await res.json();
      console.log(data);

      dispatch(setAnnouncementRedux(selectedAnnouncement.map((ann) => (ann._id === input._id ? data : ann))));
      notify('Announcement updated successfully', 'success');
      setToggleUpdate(false);
    } catch (error) {
      notify(error.message, 'error');
      setToggleUpdate(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`flex relative ${mode === 'groupAnnouncement' && 'bg-white border px-0'}
      flex-col py-2 gap-2 h-full
    `}
    >
      {toggleUpdate && (
        <UpdateAnnouncement
          type={'update'}
          handleInputChange={handleInputChange}
          handleSubmit={mode === 'groupAnnouncement' ? handleGroupUpdate : handleUpdateSubmit}
          loading={loading}
          input={input}
          setToggleUpdate={setToggleUpdate}
        />
      )}

      {announcements?.map((ann) => (
        <div className='bg-gray-50 border rounded-md shadow-sm px-4 py-3'>
          {admin && (
            <div className='flex justify-end mb-2'>
              <button
                className='text-gray-400 hover:text-purple-500 focus:outline-none mr-2'
                onClick={() => handleDelete(ann._id)}
              >
                <Image
                  src='/svgs/icons8-trash.svg'
                  width={20}
                  height={20}
                />
              </button>
              <button
                className='text-gray-400 hover:text-green-500 focus:outline-none'
                onClick={() => handleUpdate(ann._id)}
              >
                <Image
                  src='/svgs/icons8-edit.gif'
                  width={20}
                  height={20}
                />
              </button>
            </div>
          )}
          <p className='text-gray-600 text-xs font-medium mb-1'>{ann?.author}</p>
          <h1 className='text-base font-semibold mb-2 text-[#0A2540]'>{ann?.title}</h1>
          <p className='text-gray-600 mb-2'>{ann?.body}</p>
          <p className='text-purple-500 text-xs font-semibold text-right'>{formatDate(ann?.createdAt)}</p>
        </div>
      ))}
      <Toaster />
    </div>
  );
};
//todo changing

export default ShowAnnouncement;
