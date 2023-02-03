import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { pageAnimation } from '../../utils/animations/animations';
import { LinearProgress } from '@mui/material';
import { notify } from '../../utils/tools';
import { selectCurrentUser } from '../../src/store/user/user.selector';
import { selectCoursesList } from '../../src/store/courses/courses.reselect';
import { tableContainer } from '../../utils/animations/animations';
import setCoursesData from '../../src/store/courses/courses.action';
import CoursesTable from '../../components/courses';
const Labels = ['name', 'teacher', 'credit', 'semester', 'group'];
const types = ['text', 'text', 'number', 'text', 'text'];

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

  if (!user) {
    return (
      <motion.div
        variants={pageAnimation}
        initial='hidden'
        animate='show'
        exit='exit'
      >
        Please login
      </motion.div>
    );
  }
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
      setToggle(false);
      setLoading(false);
      notify('Course added', 'success');
    } catch (err) {
      setToggle(false);
      console.log(err);
      notify('Something went wrong', 'error');
      setLoading(false);
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
      setToggle(false);
      setLoading(false);
      notify('Course updated', 'success');
    } catch (err) {
      setToggle(false);
      console.log(err);
      notify('Something went wrong', 'error');
      setLoading(false);
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
        setLoading(false);
      } else {
        setLoading(false);
        notify('Something went wrong', 'error');
      }
    } catch (err) {
      setLoading(false);
      console.log(err.message);
      notify('Something went wrong', 'error');
    }
  };

  return (
    <div>
      {loading && <LinearProgress />}
      <div className='p-4 bg-white min-h-screen dark:bg-gray-900'>
        <h1 className='text-3xl font-semibold text-gray-900 dark:text-gray-50 tracking-wide'>Courses</h1>
        <p className='text-slate-800 dark:text-slate-700 block mb-4'>Welcome to your courses page</p>
        {user?.user.admin && (
          <motion.button
            onClick={toggleAddCourse}
            whileTap={{ opacity: 0.5 }}
            whileHover={{ translateY: -2 }}
            className={`bg-blue-500 
            text-white py-1 px-3 rounded-lg mt-2 mb-3`}
          >
            {toggle ? 'Close' : 'Add Course'}
          </motion.button>
        )}
        {toggle && (
          <div className=' dark:bg-gray-900 rounded-lg mb-4 w-1/2'>
            <form
              onSubmit={formType === 'add' ? addCourse : updateCourse}
              className='flex flex-col'
            >
              <motion.p className='text-slate-800 block'>{formType === 'add' ? 'Add Course' : 'Update Course'}</motion.p>
              {Labels.map((label, i) => (
                <div
                  key={i}
                  className='flex flex-col mb-2'
                >
                  <label
                    htmlFor={label}
                    className='text-slate-700 font-semibold'
                  >
                    {label}
                  </label>
                  <input
                    placeholder={label}
                    onChange={handleInputChange}
                    type={types[i]}
                    name={label}
                    id={label}
                    className='border-2 dark:bg-gray-50 border-gray-300 dark:text-gray-900 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
                  />
                </div>
              ))}

              <motion.button
                whileTap={{ opacity: 0.5 }}
                whileHover={{ scale: 1.05 }}
                className='bg-blue-500 text-white py-1 px-3 rounded-lg'
              >
                {formType === 'add' ? 'Add Course' : 'Update Course'}
              </motion.button>
            </form>
          </div>
        )}
        <motion.div
          variants={tableContainer}
          initial='hidden'
          animate='show'
          exit='exit'
          className='overflow-auto rounded-lg shadow hidden md:block'
        >
          <CoursesTable
            courses={courses}
            deleteCourse={deleteCourse}
            toggleUpdateCourse={toggleUpdateCourse}
            addCourse={addCourse}
            loading={loading}
            noAction={false}
          />
        </motion.div>
      </div>
      <Toaster />
    </div>
  );
};

export default Courses;
