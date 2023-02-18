import React, { useState } from 'react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import checkError from '../utils/errorChecker';
import { setCurrentUser } from '../src/store/user/user.actions';
import FormInput from './FormInput';
import { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { pageAnimation } from '../utils/animations/animations';
import axios from 'axios';
import { notify } from '../utils/tools';
import { checkUserData } from '../utils/tools';
import { LinearProgress } from '@mui/material';
import { MontserratFont } from '../utils/fonts';
const loginStyles = {
  inputStyle: 'focus:outline-none bg-gray-100 border-2 border-gray-300 w-full shadow-md px-2 py-2',
  labelStyle: 'absolute top-2 left-3 transition-all duration-300 pointer-events-none z-10',
};

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

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
        console.log(err.message);
        notify(err.message, 'error');
      }
    } else {
      setLoading(false);
      notify(error.username || error.password, 'error');
    }
  };

  return (
    <>
      <motion.div
        variants={pageAnimation}
        initial='hidden'
        animate='show'
        exit='exit'
        className={`
    h-[95vh] w-screen  ${MontserratFont.className}`}
      >
        {loading && <LinearProgress />}
        <div className=' flex w-screen flex-col items-center justify-center h-[80vh]'>
          <h1 className='text-4xl font-bold text-gray-600 '>
            <p
              className='mb-4
          text-slate-700 font-semibold text-3xl font-sans tracking-wide
          '
            >
              Sign In
            </p>
          </h1>
          <motion.form
            onSubmit={(e) => {
              e.preventDefault();
              localSignIn();
            }}
            className='form-signin space-y-3
            w-[90%] sm:w-[60%] md:w-[40%] lg:w-[30%]
            text-gray-600 
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
          ${checkUserData(userData.username)}
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
          ${checkUserData(userData.password)}
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
              <p className='text-slate-700 font-semibold text-sm'>
                Don't have an account?{' '}
                <Link
                  href='/signup'
                  className='text-blue-500 hover:text-blue-600'
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </motion.form>
        </div>
      </motion.div>
      <Toaster />
    </>
  );
};

export default SignIn;
