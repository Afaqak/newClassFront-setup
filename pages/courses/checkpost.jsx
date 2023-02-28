import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import Heading_1 from '../../components/Heading_1';
import { MontserratFont } from '../../utils/fonts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { selectCurrentUser } from '../../src/store/user/user.selector';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
const CheckPost = () => {
  const [toggle, setToggle] = useState(false);
  const [postDetails, setPostDetails] = useState({});
  const [startUpdate, setStartUpdate] = useState(false);
  const { token } = useSelector(selectCurrentUser) || {
    token: null,
  };
  console.log(token);
  const router = useRouter();
  const { courseId, postId } = router.query;

  useEffect(() => {
    const handleReq = async () => {
      try {
        const response = await axios.get(`https://vast-pink-moth-toga.cyclic.app/courses/${courseId}/posts/${postId}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const { data } = response;
        setPostDetails(data);
        console.log('data', data);
      } catch (err) {
        console.log(err?.response);
        console.log(err?.response?.data);
      }
    };
    handleReq();
  }, []);
  return (
    <div className={`p-4 ${MontserratFont.className} tracking-wider`}>
      {toggle && (
        <UpdatePost
          setPostDetails={setPostDetails}
          setToggle={setToggle}
          postDetails={postDetails}
        />
      )}
      <button
        onClick={() => router.back()}
        className='flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full mb-2'
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <Heading_1 label='Check Post' />
      <p className='text-sm text-gray-600'>displaying post details</p>
      {postDetails && (
        <div
          className='grid grid-cols-1 gap-4 mt-4
          
       '
        >
          <div className='bg-gray-100 p-4  shadow-lg  transition duration-300 ease-in-out cursor-pointer'>
            <div className='flex items-center justify-between mb-4'>
              <div className='text-lg font-medium text-purple-500'>{postDetails?.author}</div>
              <button
                onClick={() => setToggle(true)}
                className='text-sm bg-green-500 text-white py-1 px-3 rounded-lg cursor-pointer'
              >
                update
              </button>
            </div>
            <div className='grid grid-cols-2 gap-4 text-sm mb-4'>
              <div>
                <div className='text-gray-400'>title:</div>
                <div className='font-medium'>{postDetails?.title}</div>
              </div>
              <div>
                <div>
                  <div className='text-gray-400'>description:</div>
                  <div className='font-medium'>{postDetails?.text}</div>
                </div>
              </div>
            </div>
            <div className='grid grid-cols-2 gap-4 text-sm mb-4'>
              <div>
                <div className='text-gray-400'>created at:</div>
                <div className='font-medium'>{postDetails?.createdAt}</div>
              </div>
              <div>
                <div className='text-gray-400'>updated at:</div>
                <div className='font-medium'>{postDetails?.updatedAt}</div>
              </div>
            </div>
            {postDetails?.files?.map((file) => (
              <div
                key={file?.secure_url}
                className='grid grid-cols-2 gap-4 text-sm mb-4'
              >
                <div>
                  <div className='text-gray-400'>file name:</div>
                  <div>{file?.original_filename}</div>
                </div>
                <div>
                  <div className='text-gray-400'>file url:</div>
                  <Link href={file?.secure_url}>
                    <Image
                      src='/svgs/icons8-external-link.svg'
                      width={30}
                      height={20}
                    />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckPost;
//update post

const UpdatePost = ({ setToggle, setPostDetails }) => {
  const { token } = useSelector(selectCurrentUser) || {
    token: null,
  };
  const router = useRouter();
  const { courseId, postId } = router.query;
  console.log(courseId, postId);
  const [inputs, setInputs] = useState({
    title: '',
    text: '',
  });

  const [files, setFiles] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('inputs', inputs, files);
    //this checks if any
    const checkInputs = Object.values(inputs).some((input) => input !== '');
    if (!checkInputs) {
      return alert('please fill in the form');
    }

    const formData = new FormData();
    if (files) {
      formData.append('title', inputs.title);
      formData.append('text', inputs.text);
      for (let i = 0; i < files.length; i++) {
        formData.append('phile', files[i]);
      }
    }
    if (files) {
    }
    try {
      const response = await axios.put(`https://vast-pink-moth-toga.cyclic.app/courses/${courseId}/posts/${postId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('res', response);
      const { data } = response;
      console.log('data', data);
      setPostDetails(data);
    } catch (err) {
      console.log('err', err);
      console.log(err?.response);
      console.log(err?.response?.data);
    }
  };

  return (
    <div
      className='fixed 
    flex items-center justify-center
    top-0 left-0 w-full h-full backdrop-filter backdrop-blur-sm z-50'
    >
      <form
        onSubmit={handleSubmit}
        className={`p-4 w-[90%] md:w-1/2
        rounded-md ${MontserratFont.className} tracking-wider relative bg-white`}
      >
        <Image
          onClick={() => setToggle(false)}
          className='cursor-pointer absolute top-3 right-3'
          src='/svgs/icons8-cancel.svg'
          width={30}
          height={30}
        />

        <Heading_1 label='Update Post' />
        <p className='text-sm text-gray-600'>update post details</p>

        <div className='grid grid-cols-1 gap-4 mt-4'>
          <label className='text-sm text-gray-400'>title</label>
          <input
            onChange={handleChange}
            type='text'
            name='title'
            className='create-post__input'
          />
          <label className='text-sm text-gray-400'>description</label>
          <input
            name='text'
            onChange={handleChange}
            type='text'
            className='create-post__input'
          />
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
            onChange={(e) => setFiles(e.target.files)}
            type='file'
            name='phile'
            id='file-input'
            multiple
            style={{ display: 'none' }}
            className='p-2 border border-gray-300 rounded-lg'
          />

          <button
            type='submit'
            className='bg-green-500 text-white py-2 px-4 rounded-lg cursor-pointer'
          >
            update
          </button>
        </div>
      </form>
    </div>
  );
};
