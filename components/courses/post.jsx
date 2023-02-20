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
        if (data) {
          setPostDetails(
            data.map((post) => {
              return {
                id: post._id,
                title: post.title,
                text: post.text,
                date: new Date().toLocaleDateString(),
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

  // <Button
  //   variant='contained'
  //   color='primary'
  //   onClick={async () => {
  //     console.log(params.id, id);
  //     try {
  //       const response = await axios.delete(`https://vast-pink-moth-toga.cyclic.app/courses/${id}/posts/${params.id}`, {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       const { data } = response;
  //       console.log(data);
  //       if (data) {
  //         setPostDetails(postDetails.filter((post) => post.id !== params.id));
  //       }
  //     } catch (err) {
  //       console.log(err?.response);
  //       console.log(err?.response?.data);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }}
  // >
  //   Delete
  // </Button>

  if (!user) {
    return '';
  }
  return (
    <div className='h-screen bg-gray-50 '>
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
    </div>
  );
};

export default CoursesPosts;
