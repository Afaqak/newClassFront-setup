import React, { useState } from 'react';
import { Box, Button, LinearProgress, TextField } from '@mui/material';
import { toast, Toaster } from 'react-hot-toast';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useRouter } from 'next/router';
import Heading_1 from '../../../components/Heading_1';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { selectCurrentUser } from '../../../src/store/user/user.selector';

import { setPost } from '../../../src/store/post/post.action';

const initialValues = {
  title: '',
  text: '',
};

const checkFile = (details) => {
  let error = {};
  if (details.title.trim() === '') {
    error.title = 'Title must not be empty';
  }
  if (details.text.trim() === '') {
    error.text = 'Text must not be empty';
  }
  if (details.phile === null) {
    error.phile = 'File must not be empty';
  }
  return error;
};

const Post = () => {
  const router = useRouter();
  const { courseId } = router.query;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [postDetails, setPostDetails] = React.useState(initialValues);
  const [file, setFile] = React.useState(null);
  const notifySucces = (message) => toast.success(message);
  const isNonMobile = useMediaQuery('(min-width:600px)');
  const { token, user } = useSelector(selectCurrentUser) || {
    token: null,
    user: null,
  };
  const { semesters } = user || { semesters: null };
  if (user && semesters) {
    var [_id] = (semesters && semesters[0]?.courses) || {};
  }

  if (!user) {
    return '';
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostDetails({ ...postDetails, [name]: value });
  };

  const addFile = async (e) => {
    e.preventDefault();
    const details = {
      phile: file,
      title: postDetails.title,
      text: postDetails.text,
    };
    const error = checkFile(details);

    if (Object.keys(error).length === 0) {
      setLoading(true);
      const formData = new FormData();
      for (let i = 0; i < file.length; i++) {
        formData.append('phile', file[i]);
      }
      formData.append('title', postDetails.title);
      formData.append('text', postDetails.text);

      try {
        const res = await axios.post(`https://vast-pink-moth-toga.cyclic.app/courses/${courseId}/posts`, formData, {
          headers: {
            'Content-Type': 'form-data',
            Authorization: `Bearer ${token}`,
          },
        });
        setLoading(false);
        console.log(res);
        notifySucces('Posted !');
        setTimeout(() => {
          router.back();
          dispatch(setPost(2));
        }, 1000);
      } catch (err) {
        setLoading(false);
        console.log(err.response);
      }
    } else {
      console.log(error);
      toast.error(error.title || error.text || error.file);
    }
  };

  return (
    <div className='h-[100vh] bg-white '>
      {loading && <LinearProgress />}
      <Box
        padding='1rem'
        display='grid'
        gap='20px'
        gridTemplateColumns='repeat(1, minmax(0,1fr))'
        sx={{
          '& >div': { gridColumn: isNonMobile ? undefined : 'span 4' },
        }}
      >
        <button
          onClick={() => {
            router.back();
            dispatch(setPost(2));
          }}
          className='flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full mb-2'
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <Heading_1 label='Create Post' />
        <form
          onSubmit={addFile}
          className='flex flex-col space-y-2'
        >
          <div className='md:w-[60%] w-full'>
            <TextField
              className={`bg-gray-50`}
              sx={{
                gridColumn: 'span 2',
              }}
              onChange={handleChange}
              fullWidth
              variant='filled'
              label='Title'
              name='title'
            />
          </div>
          <div className='md:w-[70%] w-full'>
            <TextField
              className={`bg-gray-50`}
              sx={{
                gridColumn: 'span 2',
              }}
              onChange={handleChange}
              fullWidth
              variant='filled'
              label='Text'
              name='text'
            />
          </div>
          <div>
            <div className='flex flex-col '>
              <label
                htmlFor='file-input'
                className='my-label flex items-center mb-2'
              >
                <span
                  className='
                hover:text-cyan-500
                text-gray-600 dark:text-gray-400 material-symbols-sharp'
                >
                  attach_file
                </span>
                <span className='ml-2'>Add File</span>
              </label>
              <input
                type='file'
                id='file-input'
                multiple
                className='mb-2 dark:text-gray-400'
                name='phile'
                style={{ display: 'none' }}
                onChange={(e) => setFile(e.target.files)}
              />
              {file &&
                Array.from(file).map((f) => (
                  <div className='flex items-center justify-between'>
                    <span className='text-gray-600 dark:text-gray-400'>{f.name}</span>
                  </div>
                ))}
              {file && (
                <Button
                  className='w-[100px]'
                  onClick={() => {
                    setFile(null);
                  }}
                  variant='outlined'
                >
                  remove
                </Button>
              )}
            </div>
          </div>
          <div
            className=' mt-2
          '
          >
            <Button
              type='submit'
              variant='contained'
            >
              Create Post
            </Button>
          </div>
        </form>
      </Box>
      <Toaster />
    </div>
  );
};

export default Post;
