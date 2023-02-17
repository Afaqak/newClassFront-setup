import React, { useEffect, useState } from 'react';
import Form from './Form';
import { notify } from '../../utils/tools';
import { useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { selectCurrentUser } from '../../src/store/user/user.selector';
import { setAnnouncementRedux } from '../../src/store/announcement/ancment.action';
import { selectAnnouncement } from '../../src/store/announcement/ancment.reselect';
const CreateAnnouncement = ({ id, type, announcement, setToggleAnnouncement, setAnnouncement, formType }) => {
  const announcementB = useSelector(selectAnnouncement);
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const [loading, setLoading] = useState(false);
  const [coursesD, setCoursesD] = useState({ title: '', subject: '' });
  const handleKeyDown = (event) => {
    if (event.keyCode === 27) {
      setToggleAnnouncement();
    }
  };

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      setToggleAnnouncement();
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
    console.log('submit', announcementB);
    event.preventDefault();
    console.log(coursesD);
    const check = Object.values(coursesD).every((item) => item !== '');
    let res;
    if (!check) {
      notify('Please fill all fields', 'error');
      return;
    }
    try {
      setLoading(true);
      if (type === 'course announcement') {
        res = await fetch(`https://vast-pink-moth-toga.cyclic.app/courses/${id}/announcements`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify(coursesD),
        });
      } else {
        res = await fetch(`https://vast-pink-moth-toga.cyclic.app/groups/announcements`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify(coursesD),
        });
      }

      console.log(res);
      const data = await res.json();
      console.log('course', data);
      if (res.ok) {
        setLoading(false);
        notify('Announcement added', 'success');
        if (type === 'course announcement') {
          setAnnouncement([...announcement, { ...coursesD, _id: Date.now().toString(), body: coursesD.subject, createdAt: new Date(), author: user.user.username }]);
        } else {
          dispatch(setAnnouncementRedux([...announcementB, { ...coursesD, body: coursesD.subject, _id: Date.now().toString(), createdAt: new Date(), author: user.user.username }]));
        }

        setTimeout(() => {
          if (!announcement) return;
          setToggleAnnouncement();
        }, 1000);
        console.log(res);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div
      onClick={handleBackdropClick}
      className=' w-full h-full fixed top-0 left-0 flex justify-center items-center bg-black bg-opacity-50 z-[1000] '
    >
      <div className='flex flex-col items-center justify-center w-full px-10 md:px-0'>
        <Form
          loading={loading}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          setToggleAnnouncement={setToggleAnnouncement}
        />
      </div>
      <Toaster />
    </div>
  );
};

export default CreateAnnouncement;
