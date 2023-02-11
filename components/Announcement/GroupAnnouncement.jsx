import React, { useEffect, useState } from 'react';
import { selectCurrentUser } from '../../src/store/user/user.selector';
import { useSelector } from 'react-redux';
import ShowAnnouncement from './showAnnouncement';

const GroupAnnouncement = () => {
  const user = useSelector(selectCurrentUser) || {};
  const { token, user: { admin } = {} } = user;
  const [announcement, setAnnouncement] = useState([]);
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
        const res = await fetch('https://vast-pink-moth-toga.cyclic.app//groups/announcements', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        console.log('group', data);
        if (res.ok) {
          setAnnouncement(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getGroupAnnouncement();
  }, []);

  // if (!user || !sliceAnnouncement) {
  //   return '';
  // }
  return (
    <div>
      <ShowAnnouncement
        mode={'groupAnnouncement'}
        announcements={sliceAnnouncement}
        admin={admin}
      />
    </div>
  );
};

export default GroupAnnouncement;
