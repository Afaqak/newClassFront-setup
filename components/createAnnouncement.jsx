import React, { useEffect, useState } from 'react';
import { notify } from '../utils/tools';
import { useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { CircularProgress } from '@mui/material';
import { selectCurrentUser } from '../src/store/user/user.selector';
const CreateAnnouncement = ({ setToggleAnnouncement, toggleAnnouncement, setAnnouncement, announcement }) => {
  const user = useSelector(selectCurrentUser);
  const [loading, setLoading] = useState(false);
  const [coursesD, setCoursesD] = useState({ title: '', subject: '' });
  const handleKeyDown = (event) => {
    if (event.keyCode === 27) {
      setToggleAnnouncement(!toggleAnnouncement);
    }
  };

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      setToggleAnnouncement(!toggleAnnouncement);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCoursesD({ ...coursesD, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(user);
    console.log(coursesD);
    const check = Object.values(coursesD).every((item) => item !== '');

    if (!check) {
      notify('Please fill all fields', 'error');
      return;
    }
    try {
      setLoading(true);
      const res = await fetch('https://vast-pink-moth-toga.cyclic.app/groups/announcements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(coursesD),
      });
      console.log(res);
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        setLoading(false);
        notify('Announcement added', 'success');
        setTimeout(() => {
          if (!announcement) return;
          setAnnouncement([
            ...announcement,
            {
              author: user.user.username,
              createdAt: new Date().toISOString(),
              title: coursesD.title,
              body: coursesD.subject,
            },
          ]);
          setToggleAnnouncement(!toggleAnnouncement);
        }, 1000);
        console.log(res);
      }
    } catch (error) {
      console.log(error);
      notify('Something went wrong', 'error');
    }
  };

  return (
    <div
      onClick={handleBackdropClick}
      className=' w-full h-full fixed top-0 left-0 flex justify-center items-center bg-black bg-opacity-50 z-50 '
    >
      <div className='flex flex-col items-center justify-center w-full h-[85vh] px-10 md:px-0'>
        <form
          onSubmit={handleSubmit}
          className='bg-white md:w-2/3 w-full px-6 py-4 relative shadow-md rounded-sm'
        >
          <p
            className='
        text-slate-900 mb-2 text-2xl font-semibold
        '
          >
            Make an announcement
          </p>
          <button
            className='absolute right-7 top-14 pt-1 md:top-7 font-semibold text-xl border px-3 py self-center hover:bg-gray-200'
            onClick={() => setToggleAnnouncement(!toggleAnnouncement)}
          >
            {loading ? <CircularProgress size={20} /> : 'X'}
          </button>
          <div>
            <div className='flex flex-col'>
              <label
                className='mt-2 font-semibold'
                htmlFor='title'
              >
                Title
              </label>
              <input
                onChange={handleInputChange}
                className='w-2/3 px-3 py-2 text-gray-700 border  focus:outline-none border-slate-300 rounded-sm focus:border-blue-500'
                type='text'
                name='title'
                id='title'
              />
            </div>
            <div>
              <label
                className='mt-2 font-semibold'
                htmlFor='body'
              >
                Body
              </label>
              <textarea
                onChange={handleInputChange}
                className='w-full px-3 py-2 text-gray-700 border  focus:outline-none border-slate-300 rounded-sm focus:border-blue-500'
                name='subject'
                id='body'
                cols='30'
                rows='10'
              ></textarea>
              <button
                type='submit'
                className='bg-blue-500 text-white px-4 py-1 rounded-md mt-2'
              >
                Announce!
              </button>
            </div>
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default CreateAnnouncement;
