import React, { useState } from 'react';

import { toast, Toaster } from 'react-hot-toast';

import { useRouter } from 'next/router';
import Heading_1 from '../../../components/Heading_1';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { selectCurrentUser } from '../../../src/store/user/user.selector';

import { setPost } from '../../../src/store/post/post.action';
import Image from 'next/image';

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
      {/* {loading && <LinearProgress />} */}
      <div className='p-4 flex flex-col space-y-3'>
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
            <input
              type='text'
              name='title'
              onChange={handleChange}
              class='w-full px-4 py-2 focus:outline-none border-b-2 border-gray-300 focus:border-slate-500 dark:border-gray-700 dark:focus:border-slate-500 dark:bg-gray-800 dark:text-gray-300 bg-gray-100'
              placeholder='Enter text here'
            ></input>
          </div>
          <div className='md:w-[70%] w-full'>
            <input
              type='text'
              name='text'
              onChange={handleChange}
              class='w-full px-4 py-2 focus:outline-none border-b-2 border-gray-300 focus:border-slate-500 dark:border-gray-700 dark:focus:border-slate-500 dark:bg-gray-800 dark:text-gray-300 bg-gray-100'
              placeholder='Enter text here'
            ></input>
          </div>
          <div>
            <div className='flex flex-col '>
              <label
                htmlFor='file-input'
                className='my-label flex items-center mb-2'
              >
                <Image
                  className='cursor-pointer'
                  src='/svgs/icons8-add-file-48.png'
                  width={20}
                  height={20}
                />
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
              {file && <button className='bg-purple-500 hover:bg-purple-600 text-white py-1 px-5 rounded'>Upload</button>}
            </div>
          </div>
          <div
            className=' mt-2
          '
          >
            <button className='bg-purple-500 hover:bg-purple-600 text-white py-1 px-5 rounded'>Create Post</button>
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default Post;
