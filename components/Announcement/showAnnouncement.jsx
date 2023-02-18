import React, { useState } from 'react';
import formatDate from '../../utils/tools';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import { notify } from '../../utils/tools';
import Form from './Form'
import { Toaster } from 'react-hot-toast';
import { selectCurrentUser } from '../../src/store/user/user.selector'
import { useSelector } from 'react-redux';
const ShowAnnouncement = ({ announcements, handleDelete, admin, mode, courseId, setAnnouncement }) => {
  const user = useSelector(selectCurrentUser)
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

      const newAnn = announcements.map(ann => (
        ann._id === input._id ? data : ann
      ))

      if (!res.ok) {
        notify(data.message, 'error');
        return;
      }
      setAnnouncement(newAnn)

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

      {
        toggleUpdate && (
          <UpdateAnnouncement
            type={'update'}
            handleInputChange={handleInputChange}
            handleSubmit={handleUpdateSubmit}
            loading={loading}
            input={input}
            setToggleUpdate={setToggleUpdate}
          />
        )

      }


      {announcements?.map((ann) => (
        <div
          className={`
          ${mode === 'groupAnnouncement' ? 'bg-none w-full border-b' : 'bg-blue-50 w-4/5'}
         dark:bg-gray-800  relative 
        px-3 py-3 flex flex-col rounded-md`}
        >
          {admin && (
            <button
              onClick={() => handleDelete(ann._id)}
              className='bg-red-500 text-white px-2 rounded-md absolute right-5 mt-2'
            >
              <FontAwesomeIcon
                size={20}
                icon={faTrash}
              />
            </button>
          )}
          {admin && (
            <button
              onClick={() => handleUpdate(ann._id)}
              className='bg-blue-500 text-white px-2 rounded-md absolute right-14 mt-2'
            >
              <FontAwesomeIcon
                size={20}
                icon={faEdit}
              />
            </button>
          )}
          <p
            className='text-blue-500 text-[0.57rem] font-bold tracking-wider mt-2
          '
          >
            {ann?.author}
          </p>
          <h1 className='text-xl font-semibold '>{ann?.title}</h1>
          <p
            className='text-gray-600 break-words
          '
          >
            {ann?.body}
          </p>
          <p
            className='text-gray-600
            flex justify-end text-[0.65rem] font-semibold
          '
          >
            {formatDate(ann?.createdAt)}
          </p>
        </div>
      ))}
      <Toaster />
    </div>
  );
};
//todo changing

export default ShowAnnouncement;


const UpdateAnnouncement = ({ type, handleInputChange, handleSubmit, loading, input, setToggleUpdate }) => {
  return (
    <div className='fixed z-50 left-0 top-0 w-full h-full bg-black bg-opacity-70 flex justify-center items-center'>
      <Form handleInputChange={handleInputChange} type={type} handleSubmit={handleSubmit} loading={loading}
        setToggleAnnouncement={setToggleUpdate} input={input} />
    </div >
  );
};

