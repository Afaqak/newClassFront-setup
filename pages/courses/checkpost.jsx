import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
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
    <div className='p-4 font-sans'>
      <h1 className='text-3xl font-semibold'>Post Details</h1>
      <p className='text-xl font-semibold text-gray-500'>displaying post details</p>
      {postDetails && (
        <div className='flex flex-col items-center justify-center mt-10 space-y-4'>
          <h1 className='text-xl font-semibold'>{postDetails.author}</h1>
          <p className='text-xl font-semibold text-gray-500'>{postDetails.text}</p>
          <p className='text-xl font-semibold text-gray-500'>{postDetails.createdAt}</p>
          <p className='text-xl font-semibold text-gray-500'>{postDetails.updatedAt}</p>
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
