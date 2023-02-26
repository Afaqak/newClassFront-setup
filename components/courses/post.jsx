import React, { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@mui/material';
import { selectCurrentUser } from '../../src/store/user/user.selector';
import { useSelector } from 'react-redux';
import axios from 'axios';

const CoursesPosts = ({ id, setLoading }) => {
  console.log('post', id);
  const [postDetails, setPostDetails] = React.useState([]);
  const { token, user } = useSelector(selectCurrentUser) || {
    token: null,
    user: null,
  };
  const { semesters } = user || { semesters: null };
  const deleteAll = async () => {
    try {
      setLoading(true);
      const response = await axios.delete(`https://vast-pink-moth-toga.cyclic.app/courses/${id}/posts`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const { data } = response;
      console.log(data);
    } catch (err) {
      console.log(err?.response);
      console.log(err?.response?.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    var _id;
    if (semesters && semesters[0] && Array.isArray(semesters[0].courses)) {
      [_id] = semesters[0].courses;
      console.log(_id);
    }
    const handleReq = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://vast-pink-moth-toga.cyclic.app/courses/${id}/posts`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        console.log('post', data);
        data.sort((a, b) => {
          return new Date(b.updatedAt) - new Date(a.updatedAt);
        });
        if (data) {
          setPostDetails(
            data.map((post) => {
              return {
                id: post._id,
                title: post.title,
                author: post.author,
                updatedAt: post.updatedAt,
              };
            })
          );
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    handleReq();
  }, [user, semesters]);

  // <Link href={`/courses/checkpost?courseId=${id}&postId=${params.id}`}>
  //   <Button
  //     variant='contained'
  //     color='primary'
  //   >
  //     View
  //   </Button>
  // </Link>

  <Button
    variant='contained'
    color='primary'
    onClick={async () => {
      console.log(params.id, id);
      try {
        const response = await axios.delete(`https://vast-pink-moth-toga.cyclic.app/courses/${id}/posts/${params.id}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const { data } = response;
        console.log(data);
        if (data) {
          setPostDetails(postDetails.filter((post) => post.id !== params.id));
        }
      } catch (err) {
        console.log(err?.response);
        console.log(err?.response?.data);
      } finally {
        setLoading(false);
      }
    }}
  >
    Delete
  </Button>;

  if (!user) {
    return '';
  }
  return (
    <div className='min-h-screen bg-white'>
      <div className='px-4'>
        <Link href={`/courses/create-post?courseId=${id}`}>
          <button
            className='bg-green-500 hover:bg-green-600 transition duration-300
            text-white py-1 px-3 rounded-md mt-3'
            type='button'
          >
            Create Post
          </button>
        </Link>
        {user.admin && (
          <button
            className='border border-slate-900 hover:bg-slate-900 hover:text-white transition duration-300
            py-1 px-3 rounded-md mt-3 ml-3
            '
            type='button'
            onClick={deleteAll}
          >
            Delete All
          </button>
        )}
      </div>
      {postDetails.length > 0 ? (
        <div className='flex flex-col  px-4  font-sans'>
          {postDetails.map((post) => (
            <div className='my-4 shadow-md rounded-lg overflow-hidden'>
              <div className='bg-slate-200 p-4'>
                <p className='text-base font-medium text-gray-500 mb-2'>{post.author}</p>
                <h2 className='text-3xl font-bold text-gray-900 mb-2'>{post.title}</h2>
                <span className='text-sm text-gray-400 block'>{new Date(post.updatedAt).toDateString()}</span>
              </div>
              <div className='bg-slate-50 p-4'>
                <div className='flex justify-between items-center'>
                  <div>
                    <Link href={`/courses/checkpost?courseId=${id}&postId=${post.id}`}>
                      <button
                        className='bg-gray-500 hover:bg-gray-600 transition duration-300 text-white py-1 px-5 rounded-md mt-3'
                        type='button'
                      >
                        View
                      </button>
                    </Link>
                  </div>
                  <div>
                    {user.admin && (
                      <button
                        className='border border-slate-500 hover:bg-slate-900 hover:text-white transition duration-300
                        py-1 px-5 rounded-md mt-3 ml-3
                        '
                        type='button'
                        onClick={async () => {
                          console.log(post.id, id);
                        }}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center'>
          <h1 className='text-xl text-gray-500 font-medium'>No Posts</h1>
        </div>
      )}
    </div>
  );
};

export default CoursesPosts;
