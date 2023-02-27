import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import Heading_1 from '../../components/Heading_1';
import { MontserratFont } from '../../utils/fonts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { selectCurrentUser } from '../../src/store/user/user.selector';
import axios from 'axios';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
const CheckPost = () => {
  const [postDetails, setPostDetails] = useState({});
  const { token } = useSelector(selectCurrentUser) || {
    token: null,
  };
  console.log(token);
  const router = useRouter();
  const { courseId, postId } = router.query;
  console.log(courseId, postId);
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
              <button className='text-sm bg-green-500 text-white py-1 px-3 rounded-lg cursor-pointer'>update</button>
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
