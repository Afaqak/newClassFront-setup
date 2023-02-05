import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setCoursesData } from '../store/courses/courses.action';
import { selectCoursesList } from '../store/courses/courses.reselect';

export const usefetchCourses = (user, setLoading) => {
  const courses = useSelector(selectCoursesList);
  const dispatch = useDispatch();

  return courses;
};
