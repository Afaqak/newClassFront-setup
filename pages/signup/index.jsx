import React, { useEffect } from 'react';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Typography, FormControlLabel, Checkbox } from '@mui/material';
import FormInput from '../../components/FormInput';
import { notify } from '../../utils/tools';
import checkError from '../../utils/errorChecker';
import { motion } from 'framer-motion';
import { pageAnimation } from '../../utils/animations/animations';
import { Toaster } from 'react-hot-toast';
import batches from '../../utils/data';
import LinearProgress from '@mui/material/LinearProgress';
import axios from 'axios';

const loginStyles = {
  inputStyle: 'focus:outline-none bg-gray-100 border-2 border-gray-300 w-full shadow-md px-2 py-2',
  labelStyle: 'absolute top-2 left-3 transition-all duration-300 pointer-events-none z-10',
};

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [teacher, setTeacher] = useState(false);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const router = useRouter();

  const userValues = {
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    batch: '',
    program: '',
    group: '',
  };

  const inputFields = [
    { label: 'Firstname', name: 'firstName' },
    { label: 'Lastname', name: 'lastName' },
    { label: 'Username', name: 'username' },
    { label: 'Password', name: 'password', type: 'password' },
  ];

  const [userData, setUserData] = useState(userValues);
  console.log(userData);
  const handlechange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const submitForm = async () => {
    const error = checkError(userData, 'signup');
    console.log(error);
    if (Object.keys(error).length === 0) {
      try {
        setLoading(true);
        const response = await axios.post('https://vast-pink-moth-toga.cyclic.app/users/signup', userData);
        const { data } = response;
        console.log(data);
        if (data) {
          setLoading(false);
          router.push('/');
        }
      } catch (err) {
        setLoading(false);
        if (err.response.status == 500) {
          notify('Username already exists', 'error');
        }
        if (err.response) {
          console.error(err.response.status);
        } else if (err.request) {
          console.error(err.request);
          notify('Something went wrong please try again later', 'error');
        } else {
          console.error('Error', err.message);
          notify('Something went wrong please try again later', 'error');
        }
      }
    } else {
      notify(error.firstName || error.lastName || error.username || error.password || error.batch || error.program || error.group, 'error');
    }
  };

  const handleYearChange = (e) => {
    setUserData({ ...userData, batch: e.target.value });
    setSelectedYear(e.target.value);
    if (e.target.value == 'Select Batch') {
      setUserData({ ...userData, batch: '', program: '', group: '' });
      setSelectedYear(null);
    }
  };

  const handleProgramChange = (e) => {
    setUserData({ ...userData, program: e.target.value });
    setSelectedProgram(e.target.value);
  };

  return (
    <motion.div
      variants={pageAnimation}
      initial='hidden'
      animate='show'
      exit='exit'
      className='
    h-[100vh] w-screen bg-gray-100 dark:bg-gray-900
    '
    >
      {loading && <LinearProgress />}
      <div className='h-[95vh] w-full flex flex-col items-center justify-center'>
        <p
          className='mb-4
          text-slate-700 font-semibold text-3xl font-sans tracking-wide
          '
        >
          Sign Up
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitForm();
          }}
          className='form-signin space-y-3
        w-[90%] sm:w-[60%] md:w-[40%] lg:w-[30%]
        text-gray-600 dark:text-gray-300
      '
        >
          {inputFields.map((inputField) => (
            <FormInput
              label={inputField.label}
              type={inputField.type || 'text'}
              name={inputField.name}
              loading={loading}
              value={userData[inputField.name]}
              onChange={handlechange}
              className={`${loginStyles.inputStyle} ${loading ? ' border-gray-500 ' : ''}`}
              labelClassName={`${loginStyles.labelStyle}
              ${userData[inputField.name] !== '' ? 'text-transparent' : 'top-2 text-gray-300'}`}
            />
          ))}

          <div className='flex flex-col space-y-3'>
            {teacher ? (
              <input
                className={`${loginStyles.inputStyle}`}
                type='text'
                disabled={teacher || loading}
                value='teacher'
                name='role'
              />
            ) : (
              <select
                className={`${loginStyles.inputStyle}`}
                onChange={handleYearChange}
              >
                <option value={null}>Select Batch</option>
                {batches?.map((batch) => (
                  <option
                    key={batch.year}
                    value={batch.year}
                  >
                    {batch.year}
                  </option>
                ))}
              </select>
            )}
            {teacher ? (
              <input
                className={`${loginStyles.inputStyle}`}
                type='text'
                disabled={teacher || loading}
                value='teacher'
                name='role'
              />
            ) : (
              selectedYear && (
                <div className='space-y-2'>
                  <select
                    onChange={handleProgramChange}
                    className={`${loginStyles.inputStyle}`}
                  >
                    <option value={null}>Select Program</option>
                    {batches?.find((batch) => batch.year === selectedYear)?.programs &&
                      Object.keys(batches?.find((batch) => batch?.year === selectedYear)?.programs).map((program) => (
                        <option
                          key={program}
                          value={program}
                        >
                          {program}
                        </option>
                      ))}
                  </select>
                </div>
              )
            )}
            {teacher ? (
              <input
                className={`${loginStyles.inputStyle}`}
                type='text'
                disabled={teacher || loading}
                value='teacher'
                name='role'
              />
            ) : (
              selectedProgram && (
                <div>
                  <select
                    onChange={(e) => {
                      setUserData({ ...userData, group: e.target.value });
                    }}
                    className={`${loginStyles.inputStyle}`}
                  >
                    <option value={null}>Select Group</option>
                    {batches
                      ?.find((batch) => batch?.year === selectedYear)
                      ?.programs?.[selectedProgram]?.group?.map((group) => (
                        <option
                          key={group}
                          value={group}
                        >
                          {group}
                        </option>
                      ))}
                  </select>
                </div>
              )
            )}
          </div>

          <FormControlLabel
            control={
              <Checkbox
                checked={teacher}
                disabled={loading}
                onChange={(e) => {
                  setTeacher(e.target.checked);
                  if (e.target.checked) {
                    setSelectedYear(null);
                    setSelectedProgram(null);
                  }
                  setUserData({
                    ...userData,
                    batch: e.target.checked ? 'teacher' : '',
                    program: e.target.checked ? 'teacher' : '',
                    group: e.target.checked ? 'teacher' : '',
                  });
                }}
                name='teacher'
                color='primary'
              />
            }
            label='Teacher'
          />

          <div>
            <motion.button
              type='submit'
              disabled={loading}
              whileHover={{ scale: 0.98 }}
              whileTap={{ translateY: 2, scale: 0.98 }}
              className={`bg-blue-500 text-white w-full py-3 rounded-md ${loading && 'animate-pulse'}`}
            >
              {loading ? 'Loading...' : 'Sign Up'}
            </motion.button>
            <div className='flex justify-center items-center mt-3'>
              <Typography
                variant='body2'
                component='p'
              >
                Have an account ?{' '}
                <Link
                  href='/login'
                  className='text-blue-500'
                >
                  Sign in
                </Link>
              </Typography>
            </div>
          </div>
        </form>
      </div>
      <Toaster />
    </motion.div>
  );
};

export default SignUp;
