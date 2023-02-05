import { useState, useEffect } from 'react';
const useAnnouncementsHook = (setAnnouncement, setLoading, id, token) => {
  useEffect(() => {
    const getAnnouncement = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://vast-pink-moth-toga.cyclic.app/courses/${id}/announcements`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
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
};

export default useAnnouncementsHook;
