import React, { useEffect, useMemo, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Link from 'next/link';
import { Button, LinearProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../src/store/user/user.selector';
import { motion } from 'framer-motion';
import { pageAnimation } from '../utils/animations/animations';
import axios from 'axios';
const CoursesPosts = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const [postDetails, setPostDetails] = React.useState([]);
  const { token, user } = useSelector(selectCurrentUser) || {
    token: null,
    user: null,
  };
  const { semesters } = user || { semesters: null };
  const deleteAll = async () => {
    try {
      const response = await axios.delete(`https://vast-pink-moth-toga.cyclic.app/courses/63dd36dfc0a7344fba416503/posts`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      console.log(err?.response);
      console.log(err?.response?.data);
    }
  };

  useEffect(() => {
    setLoading(true);
    var _id;
    if (semesters && semesters[0] && Array.isArray(semesters[0].courses)) {
      [_id] = semesters[0].courses;
      console.log(_id);
    }
    const handleReq = async () => {
      try {
        const response = await fetch(`https://vast-pink-moth-toga.cyclic.app/courses/${_id}/posts`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

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

  const columns = [
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => (
        <Link href={`/courses/${params.row.id}`}>
          <Button
            variant='contained'
            color='primary'
          >
            View
          </Button>
        </Link>
      ),
    },
    { field: 'id', headerName: 'ID', width: 200 },
    { field: 'title', headerName: 'Title', width: 150 },
    { field: 'text', headerName: 'Text', width: 200 },
    { field: 'date', headerName: 'date', width: 200 },
  ];

  const columns2 = useMemo(() => columns, [columns]);

  if (!user) {
    return '';
  }
  return (
    <div className='h-screen bg-gray-50 dark:bg-gray-900'>
      {loading && <LinearProgress />}
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

      <Box
        sx={{
          padding: '0 1rem',
          height: '70vh',
          marginTop: '3vh',
          '& .MuiDataGrid-root': {
            backgroundColor: 'white',
          },

          '& .MuiDataGrid-columnsContainer': {
            backgroundColor: '#F9FAFB',
          },
          '& .MuiDataGrid-columnHeader': {
            backgroundColor: '#eee',
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            color: '#6B7280',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            fontSize: '14px',
          },
          '& .MuiDataGrid-columnHeaderTitleContainer, .MuiDataGrid-cell': {
            borderBottom: '1px solid #E5E7EB',
          },

          '& .MuiDataGrid-cell:focus-within': {
            outline: 'none',
          },
          //footer
          '& .MuiDataGrid-footer': {
            backgroundColor: '#363949',
          },
          '& .MuiDataGrid-footerContainer': {
            backgroundColor: '#eee',
            color: '#6B7280',
            fontSize: '14px',
            fontWeight: 'normal',
          },
          //row elemets color
          '& .MuiDataGrid-row .MuiDataGrid-cell': {
            color: '#6B7280',
          },
          //cursor pointer
          '& .MuiDataGrid-cell': {
            cursor: 'pointer',
          },
        }}
      >
        <DataGrid
          rows={postDetails}
          columns={columns2}
          pageSize={7}
        />
      </Box>
    </div>
  );
};

export default CoursesPosts;
