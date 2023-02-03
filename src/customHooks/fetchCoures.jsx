import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import setCoursesData from '../store/courses/courses.action';
import { selectCoursesList } from '../store/courses/courses.reselect';

export const usefetchCourses = (user, setLoading) => {
  const courses = useSelector(selectCoursesList);
  const dispatch = useDispatch();
  useEffect(() => {
    let isCancelled = false;
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch('https://vast-pink-moth-toga.cyclic.app/courses', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        });
        const data = await res.json();

        if (!isCancelled) {
          setLoading(false);
          dispatch(setCoursesData(data));
        }
      } catch (err) {
        if (!isCancelled) {
          setLoading(false);
          toast.error('Something went wrong');
        }
      }
    };
    fetchData();
    return () => {
      isCancelled = true;
      setLoading(false);
    };
  }, []);

  return courses;
};
