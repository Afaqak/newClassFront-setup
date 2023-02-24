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
          <Button
            onClick={() => setLoading(true)}
            sx={{ marginTop: '3vh' }}
            variant='contained'
            color='primary'
          >
            Create Post
          </Button>
        </Link>
        {user.admin && (
          <Button
            onClick={deleteAll}
            sx={{
              marginTop: '3vh',
              marginLeft: '2vh',
              backgroundColor: '#F87171',
              '&:hover': {
                backgroundColor: '#F87171',
              },
            }}
            variant='contained'
          >
            Delete All
          </Button>
        )}
      </div>
      {postDetails.length > 0 ? (
        <div className='flex flex-col  px-4  font-sans'>
          {postDetails.map((post) => (
            <div className='my-4 shadow-md rounded-lg overflow-hidden'>
              <div className='bg-gray-100 p-4'>
                <p className='text-base font-medium text-gray-500 mb-2'>{post.author}</p>
                <h2 className='text-3xl font-bold text-gray-900 mb-2'>{post.title}</h2>
                <span className='text-sm text-gray-400 block'>{new Date(post.updatedAt).toDateString()}</span>
              </div>
              <div className='bg-sky-50 p-4'>
                <div className='flex justify-between items-center'>
                  <div>
                    <Link href={`/courses/checkpost?courseId=${id}&postId=${post.id}`}>
                      <Button
                        variant='contained'
                        color='primary'
                      >
                        View
                      </Button>
                    </Link>
                  </div>
                  <div>
                    {user.admin && (
                      <Button
                        variant='contained'
                        color='primary'
                        sx={{ color: '#ffffff', backgroundColor: '#F87171', '&:hover': { backgroundColor: '#F87171' } }}
                        onClick={async () => {
                          console.log(post.id, id);
                        }}
                      >
                        Delete
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center'>
          <h1 className='text-2xl font-bold text-gray-600'>No Posts Found</h1>
        </div>
      )}
    </div>
  );
};

export default CoursesPosts;
