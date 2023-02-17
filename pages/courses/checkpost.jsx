import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import Heading_1 from '../../components/Heading_1';
import { MontserratFont } from '../../utils/fonts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { selectCurrentUser } from '../../src/store/user/user.selector';
import axios from 'axios';

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
    <div className={`p-4 ${MontserratFont.className}`}>
      <button
        onClick={() => router.back()}
        className='flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full mb-2'
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <Heading_1 label='Check Post' />
      <p className='text-sm text-gray-600'>displaying post details</p>
      {postDetails && (
        <div class='flex flex-col items-center justify-center mt-10 space-y-4'>
          <h1 class='text-2xl font-bold text-center text-gray-800'>{postDetails.author}</h1>
          <div class='flex flex-row items-center space-x-4'>
            <p class='text-base font-normal text-gray-600'>text:</p>
            <p class='text-base font-normal text-gray-500'>{postDetails.text}</p>
          </div>
          <div class='flex flex-row items-center space-x-4'>
            <p class='text-base font-normal text-gray-600'>Created at:</p>
            <p class='text-base font-normal text-gray-500'>{postDetails.createdAt}</p>
          </div>
          <div class='flex flex-row items-center space-x-4'>
            <p class='text-base font-normal text-gray-600'>Updated at:</p>
            <p class='text-base font-normal text-gray-500'>{postDetails.updatedAt}</p>
          </div>
          <div class='mt-4 space-y-2'>
            <h2 class='text-lg font-medium text-gray-700'>Attached files:</h2>
            {/* <ul class='list-disc pl-6 space-y-1'>
              {postDetails?.files
                .map((file, index) => (
                  <li class='text-base font-normal text-gray-600'>
                    <a
                      href='${file.url}'
                      target='_blank'
                      rel='noopener noreferrer'
                      class='hover:text-blue-500'
                    >
                      ${file.name}
                    </a>
                  </li>
                ))
                .join('')}
            </ul> */}
          </div>
          <button class='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'>Modify Post</button>
        </div>
      )}
    </div>
  );
};

export default CheckPost;

// export async function getServerSideProps(context) {

//   return {
//     props: {
//       courseId,
//       postId,
//     },
//   };
// }
