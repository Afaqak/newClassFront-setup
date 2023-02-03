import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import checkError from '../../utils/errorChecker';
import { setCurrentUser } from '../../src/store/user/user.actions';
import { selectCurrentUser } from '../../src/store/user/user.selector';
import FormInput from '../../components/FormInput';
import toast, { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { pageAnimation } from '../../utils/animations/animations';
import axios from 'axios';
import { Typography, LinearProgress } from '@mui/material';

const loginStyles = {
  inputStyle: 'focus:outline-none border-2 bg-gray-100 border-gray-300 w-full shadow-md px-2 py-3',
  labelStyle: 'absolute top-3 left-3 pointer-events-none',
};

const SignIn = () => {
  const user = useSelector(selectCurrentUser);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user]);

  const notifyError = (message) => toast.error(message);
  const userValues = {
    username: '',
    password: '',
  };

  const [userData, setUserData] = useState(userValues);

  const handlechange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const localSignIn = async () => {
    const error = checkError(userData, 'login');
    if (Object.keys(error).length === 0) {
      try {
        setLoading(true);
        const response = await axios.post('https://vast-pink-moth-toga.cyclic.app/users/login', userData);

        const { data } = response;
        console.log(data);
        if (data.user) {
          dispatch(setCurrentUser(data));
          setLoading(false);
          router.push('/');
        }
      } catch (err) {
        setLoading(false);
        if (err.response) {
          if (err.response.status == 401) {
            notifyError('unAuthorized');
          }
          if (err.response.status === 400) {
            notifyError('Invalid Credentials Entered ! Try Again');
          }
          if (err.response.status === 500) {
            notifyError('Server Error Occured! Try Again Later');
          }
        } else if (err.request) {
          notifyError('Server Error Occured! Try Again Later');
        } else {
          notifyError('Server Error Occured! Try Again Later');
        }
      }
    } else {
      setLoading(false);
      notifyError(error.username || error.password);
    }
  };

  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        variants={pageAnimation}
        initial='hidden'
        animate='show'
        exit='exit'
        className='
    h-[95vh] w-screen dark:bg-gray-900
    '
      >
        {loading && <LinearProgress />}
        <div className=' flex w-screen flex-col items-center justify-center h-[80vh]'>
          <Typography
            variant='h4'
            className='text-4xl font-bold text-gray-600 dark:text-gray-300'
          >
            <p
              className='mb-4
          text-slate-700 font-semibold text-3xl font-sans tracking-wide
          '
            >
              Sign In
            </p>
          </Typography>
          <motion.form
            onSubmit={(e) => {
              e.preventDefault();
              localSignIn();
            }}
            className='space-y-5 
        w-[90%] sm:w-[60%] md:w-[40%] lg:w-[30%]
        text-gray-600 dark:text-gray-300
      '
          >
            <FormInput
              label='Username'
              type='text'
              name='username'
              value={userData.username}
              onChange={handlechange}
              loading={loading}
              className={`${loginStyles.inputStyle} 
            ${loading ? ' border-gray-500 ' : ''}
          `}
              labelClassName={`${loginStyles.labelStyle}
          ${userData.username !== '' ? 'text-transparent' : 'top-3 text-gray-300'}
          `}
            />

            <FormInput
              label='Password'
              type='password'
              name='password'
              loading={loading}
              value={userData.password}
              onChange={handlechange}
              className={`${loginStyles.inputStyle}
          ${loading ? ' border-gray-500 ' : ''}
          `}
              labelClassName={`${loginStyles.labelStyle}
          ${userData.password !== '' ? 'text-transparent' : 'top-3 text-gray-300'}
          `}
            />
            <motion.button
              type='submit'
              whileHover={{ scale: 0.98 }}
              whileTap={{ translateY: 2, scale: 0.98 }}
              className={`bg-blue-500 text-white w-full py-3 rounded-md ${loading && 'animate-pulse'}`}
            >
              Sign In
            </motion.button>

            <div className='flex justify-center items-center mt-3'>
              <Typography
                variant='body2'
                component='p'
                className='text-slate-700 font-semibold text-sm'
              >
                Don't have an account?{' '}
                <Link
                  href='/signup'
                  className='text-blue-500 hover:text-blue-600'
                >
                  Sign Up
                </Link>
              </Typography>
            </div>
          </motion.form>
        </div>
        <Toaster />
      </motion.div>
    </AnimatePresence>
  );
};

export default SignIn;
