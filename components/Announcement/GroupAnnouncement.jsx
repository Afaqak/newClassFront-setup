import React, { useEffect, useState } from 'react';
import { selectCurrentUser } from '../../src/store/user/user.selector';
import { useSelector, useDispatch } from 'react-redux';
import { setAnnouncementRedux } from '../../src/store/announcement/ancment.action';
import ShowAnnouncement from './showAnnouncement';
import axios from 'axios';
import { selectAnnouncement } from '../../src/store/announcement/ancment.reselect';
const GroupAnnouncement = () => {
  const announcement = useSelector(selectAnnouncement);
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser) || {};
  const { token, user: { admin } = {} } = user;
  let sliceAnnouncement;
  if (announcement.length > 0) {
    announcement.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    sliceAnnouncement = announcement.slice(0, 10);
  }

  useEffect(() => {
    console.log('GROUP ANNOUNCEMENT');
    const getGroupAnnouncement = async () => {
      try {
        const res = await fetch('https://vast-pink-moth-toga.cyclic.app/groups/announcements', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        console.log('group', data);
        if (res.ok) {
          dispatch(setAnnouncementRedux(data));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getGroupAnnouncement();
  }, []);

  const handleDeleteAnnouncement = async (idCourse) => {
    console.log(idCourse, token);
    try {
      const res = await axios.delete(`https://vast-pink-moth-toga.cyclic.app/groups/announcements/${idCourse}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const { data } = res;

      console.log(data, 'data');
      if (res.ok) {
        dispatch(setAnnouncementRedux(announcement.filter((item) => item._id !== idCourse)));
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  // if (!user || !sliceAnnouncement) {
  //   return '';
  // }
  return (
    <div>
      <ShowAnnouncement
        mode={'groupAnnouncement'}
        announcements={sliceAnnouncement}
        admin={admin}
        handleDelete={handleDeleteAnnouncement}
      />
    </div>
  );
};

export default GroupAnnouncement;
