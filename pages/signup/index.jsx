import React, { useEffect } from 'react';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import FormInput from '../../components/FormInput';
import { notify } from '../../utils/tools';
import checkError from '../../utils/errorChecker';
import { motion } from 'framer-motion';
import { pageAnimation } from '../../utils/animations/animations';
import { Toaster } from 'react-hot-toast';

import axios from 'axios';

const loginStyles = {
  inputStyle: 'focus:outline-none border-2 border-gray-300 w-full shadow-md px-2 py-2',
  labelStyle: 'absolute top-2 left-3 transition-all duration-300 pointer-events-none z-10',
};

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [teacher, setTeacher] = useState(false);
  const [programId, setProgramId] = useState(null);
  const [batches, setBatches] = useState([]);
  const [groups, setGroups] = useState([]);
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

  useEffect(() => {
    const getBatches = async () => {
      try {
        const response = await axios.get('https://vast-pink-moth-toga.cyclic.app/batches');
        const { data } = response;
        setBatches(data);
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    };

    getBatches();
  }, []);

  const handleYearChange = async (e) => {
    if (e.target.value === 'Select Batch') {
      setSelectedProgram(null);
      setGroups([]);
      return;
    }

    setProgramId(e.target.value);

    setUserData({ ...userData, batch: e.target.value });
    try {
      const response = await axios.get(`https://vast-pink-moth-toga.cyclic.app/batches/${e.target.value}/programs`);
      const { data } = response;
      console.log(data);
      setSelectedProgram(data);
      console.log(groups);
    } catch (err) {
      console.error(err);
    }
  };

  const handleProgramChange = async (e) => {
    if (e.target.value === 'Select Program') {
      setGroups([]);
      return;
    }
    setUserData({ ...userData, program: e.target.value });
    try {
      const response = await axios.get(`https://vast-pink-moth-toga.cyclic.app/batches/${programId}/programs/${e.target.value}/groups`);
      const { data } = response;
      console.log(data);
      setGroups(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleGroupChange = (e) => {
    setUserData({ ...userData, group: e.target.value });
  };

  return (
    <motion.div
      variants={pageAnimation}
      initial='hidden'
      animate='show'
      exit='exit'
      className='
    h-[100vh] w-screen 
    '
    >
      {/* {loading && <LinearProgress />} */}
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
        text-gray-600 
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
                className={`shadow appearance-none border border-blue-500 rounded block py-2 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                onChange={handleYearChange}
              >
                <option value={null}>Select Batch</option>
                {batches?.map((batch) => (
                  <option
                    key={batch._id}
                    value={batch._id}
                  >
                    {batch.session}
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
              selectedProgram && (
                <select
                  className={`shadow appearance-none border border-blue-500 rounded block py-2 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                  onChange={handleProgramChange}
                >
                  <option value={null}>Select Program</option>
                  {selectedProgram?.map((program) => (
                    <option
                      key={program._id}
                      value={program._id}
                    >
                      {program.program}
                    </option>
                  ))}
                </select>
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
              groups.length > 0 && (
                <select
                  className={`shadow appearance-none border border-blue-500 rounded block py-2 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                  onChange={handleGroupChange}
                >
                  <option value={null}>Select Group</option>
                  {groups?.map((group) => (
                    <option
                      key={group._id}
                      value={group._id}
                    >
                      {group.group}
                    </option>
                  ))}
                </select>
              )
            )}
          </div>

          <form className='flex flex-col space-y-3'>
            <input
              className={`${loginStyles.inputStyle}`}
              type='checkbox'
              disabled={loading}
              checked={teacher}
              onChange={(e) => {
                setTeacher(e.target.checked);
                if (e.target.checked) {
                  setUserData({
                    ...userData,
                    batch: 'teacher',
                    program: 'teacher',
                    group: 'teacher',
                  });
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
            <label className='text-gray-500'>Are you a teacher?</label>
          </form>

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
              <p className='text-slate-700 font-semibold text-sm'>
                Have an account?{' '}
                <Link
                  href='/'
                  className='text-blue-500'
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
      <Toaster />
    </motion.div>
  );
};

export default SignUp;
