import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { LinearProgress } from '@mui/material';
import withAuth from '../../components/withAuth';
import { notify } from '../../utils/tools';
import { selectCurrentUser } from '../../src/store/user/user.selector';
import { selectCoursesList } from '../../src/store/courses/courses.reselect';
import { setCoursesData } from '../../src/store/courses/courses.action';
import { MontserratFont } from '../../utils/fonts';
import CoursesTable from '../../components/courses';
import Heading_1 from '../../components/Heading_1';
import Form from '../../components/courses/Form';

const Courses = () => {
  const courses = useSelector(selectCoursesList);
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formType, setFormType] = useState('add');
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const coursesInput = {
    name: '',
    teacher: '',
    credit: '',
    semester: '',
    group: '',
  };
  const [coursesD, setCoursesD] = useState(coursesInput);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCoursesD({ ...coursesD, [name]: value });
  };
  const toggleAddCourse = () => {
    setToggle(!toggle);
  };

  const addCourse = async (e) => {
    e.preventDefault();
    const check = Object.values(coursesD).every((item) => item !== '');
    if (!check) {
      notify('Please fill all fields', 'error');
      return;
    }

    const check2 = courses.some((course) => course.name === coursesD.name);
    if (check2) {
      notify('Course already exists', 'error');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('https://vast-pink-moth-toga.cyclic.app/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(coursesD),
      });
      const data = await res.json();
      console.log(data);
      if (!res.ok) throw new Error(res.statusText);
      dispatch(setCoursesData([...courses, data]));
      setCoursesD(coursesInput);
      notify('Course added', 'success');
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      setToggle(false);
    }
  };

  const toggleUpdateCourse = (id) => {
    setFormType('update');
    setCoursesD({ ...coursesInput, _id: id });
    setToggle(!toggle);
  };

  const updateCourse = async (e) => {
    e.preventDefault();
    const check = Object.values(coursesD).every((item) => item !== '');
    console.log(coursesD);

    if (!check) {
      notify('Please fill all fields', 'error');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`https://vast-pink-moth-toga.cyclic.app/courses/${coursesD._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(coursesD),
      });
      if (!res.ok) throw new Error(res.statusText);
      const newCourses = courses.map((course) => {
        if (course._id === coursesD._id) {
          return coursesD;
        }
        return course;
      });

      dispatch(setCoursesData(newCourses));
      setCoursesD(coursesInput);
      notify('Course updated', 'success');
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      setToggle(false);
    }
  };

  const deleteCourse = async (id) => {
    setLoading(true);
    console.log(id);
    try {
      const res = await fetch(`https://vast-pink-moth-toga.cyclic.app/courses/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (res.ok) {
        console.log('deleted');
        const newCourses = courses.filter((course) => course._id !== id);
        dispatch(setCoursesData(newCourses));
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  const checkButton = () => {
    if (user.user.admin) {
      return (
        <motion.button
          onClick={toggleAddCourse}
          whileTap={{ opacity: 0.5 }}
          whileHover={{ translateY: -2 }}
          className={`bg-blue-500 
        text-white py-1 px-3 rounded-lg mt-2 mb-3`}
        >
          {toggle ? 'Close' : 'Add Course'}
        </motion.button>
      );
    }
  };

  return (
    <motion.div
      className={`${MontserratFont.className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.7, ease: 'easeInOut' } }}
      exit={{ opacity: 0, transition: { duration: 0.7 } }}
    >
      {loading && <LinearProgress />}
      <div className='p-4 bg-white min-h-screen '>
        <Heading_1 label='Courses' />
        <p className='text-slate-800  block mb-4'>Welcome to your courses page</p>
        {checkButton()}

        {toggle && (
          <div className='  rounded-lg mb-4 w-1/2'>
            <Form
              handleInputChange={handleInputChange}
              addCourse={addCourse}
              updateCourse={updateCourse}
              formType={formType}
            />
          </div>
        )}
        <div className='overflow-auto rounded-lg shadow hidden md:block'>
          <CoursesTable
            courses={courses}
            deleteCourse={deleteCourse}
            toggleUpdateCourse={toggleUpdateCourse}
            addCourse={addCourse}
            loading={loading}
            noAction={false}
          />
        </div>
      </div>
      <Toaster />
    </motion.div>
  );
};

export default withAuth(Courses);
