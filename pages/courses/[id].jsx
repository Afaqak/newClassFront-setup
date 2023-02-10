import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { selectCurrentUser } from '../../src/store/user/user.selector';
import CoursesPosts from '../../components/post';
import CourseLayout from '../../components/courses/layout/CourseLayout';
import { LinearProgress } from '@mui/material';
import withAuth from '../../components/withAuth';
import Announcement from '../../components/Announcement/Announcement';
import useFetchUsers from '../../src/customHooks/useFetchUsers.h';


const Participants = ({ data, id }) => {
  console.log('participant', data, id);
  const [input, setInput] = useState({ batch: '', program: '', group: '', participant: '' });
  const [loading, setLoading] = useState(false);
  const [program, setProgram] = useState([]);
  const [group, setGroup] = useState([]);
  const [participants, setParticipants] = useState(data);
  const [page, setPage] = useState(1);

  const user = useSelector(selectCurrentUser);
  const { admin, teacher } = user?.user || {};
  const { users } = useFetchUsers();

  const addParticipant = async (e) => {
    if (Object.values(input).some((item) => item === '')) {
      return;
    }

    e.preventDefault();


    try {
      setLoading(true);
      const res = await fetch(`https://vast-pink-moth-toga.cyclic.app/courses/${input.participant}/participants`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(input),
      });
      console.log('res', res);
      if (res.ok) {
        setParticipants([...participants, input]);
        setToggle(false);
      } else {
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBatchChange = async (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });

    try {
      console.log('batch', input.batch);
      setLoading(true);
      const response = await axios.get(`https://vast-pink-moth-toga.cyclic.app/batches/${input.batch}/programs`);
      const { data } = response;
      setProgram(data);
      console.log('data', data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleProgramChange = async (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
    try {
      setLoading(true);
      const response = await axios.get(`https://vast-pink-moth-toga.cyclic.app/batches/${input.batch}/programs/${value}/groups`);
      const { data } = response;
      console.log('dg', data);
      setGroup(data);
      console.log('data', data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGroupChange = async (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
    try {
      setLoading(true);
      const response = await axios.get(`https://vast-pink-moth-toga.cyclic.app/batches/${input.batch}/programs/${input.program}/groups/${value}`);

      const { data } = response;
      console.log('gd data', data);
      setGroup(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleParticipantChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleChange = (name) => (event) => {
    if (name === "batch") {
      handleBatchChange(event);
    } else if (name === "program") {
      handleProgramChange(event);
    } else if (name === "group") {
      handleGroupChange(event);
    } else if (name === "participant") {
      handleParticipantChange(event);
    }
  };


  return (
    <div
      className='min-h-screen font-sans
      w-full relative bg-white 
      flex flex-col dark:bg-gray-900 
    '
    >
      {loading && <LinearProgress />}

      <div className='px-4 mt-4'>
        <p
          className='text-gray-500 
        dark:text-gray-400'
        >
          This is the courses feed page
        </p>
      </div>
      <CourseLayout
        setPage={setPage}
        page={page}
        id={id}
      >
        {page === 1 && (
          <div
            className='flex flex-col w-4/5 px-4  gap-y-2  
          '
          >
            {(teacher || admin) && (
              <form
                className='w-1/2 py-2 text-gray-700 dark:text-gray-400'
                onSubmit={addParticipant}
              >
                <span className='text-xs text-gray-500'>Select the student ID from the dropdown to add</span>

                {inputs.map(({ name, label, options }) => (
                  <>
                    {input[name] && (
                      <select
                        name={name}
                        onChange={handleChange(name)}
                        className="shadow appearance-none border mt-1 w-[300px] border-blue-500 rounded block py-2 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      >
                        <option value={null}>Select {label}</option>
                        {options?.map((option) => (
                          <option key={option._id} value={option._id}>
                            {option[name]}
                          </option>
                        ))}
                      </select>
                    )}
                  </>
                ))}
                <button
                  className='bg-slate-900 mt-4 text-white py-1 px-5 rounded-lg'
                  type='submit'
                >
                  Add
                </button>
              </form>
            )}

            <h1 className='text-xl font-bold tracking-wide text-slate-900'>All Participants</h1>
            {Array.isArray(data) &&
              data?.map((dataP) => (
                <div
                  key={dataP?._id}
                  className='flex items-center justify-between px-4 py-2 border hover:bg-gray-100 cursor-pointer'
                >
                  {dataP?.participant?.username}
                </div>
              ))}
          </div>
        )}
        {page === 2 && <CoursesPosts id={id} />}
        {page === 3 && (
          <Announcement
            id={id}
            setLoading={setLoading}
          />
        )}
      </CourseLayout>

      {/* <div className='flex flex-col w-full px-4 py-4 gap-y-2'>
        {participants.map((participant) => (
          <div
            key={participant._id}
            className='flex items-center justify-between px-4 py-2 border '
          >
            {participant._id}
          </div>
        ))}
      </div> */}
    </div>
  );
};

export async function getServerSideProps(context) {
  const { id, user } = context.query;

  const res = await fetch(`https://vast-pink-moth-toga.cyclic.app/courses/${id}/participants`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user}`,
    },
  });

  // if (!res) {
  //   return {
  //     props: {
  //       notFound: true,
  //     },
  //   };
  // }
  const data = await res.json();
  // if (!data) {
  //   return {
  //     props: {
  //       notFound: true,
  //     },
  //   };
  // }
  return {
    props: {
      data,
      id,
    },
  };
}

export default withAuth(Participants);



// const inputs = [
//   { name: "batch", label: "Batch", options: batch },
//   { name: "program", label: "Program", options: program },
//   { name: "group", label: "Group", options: group },
//   { name: "participant", label: "Participant", options: group?.participants },
// ];

// {inputs.map(({ name, label, options }) => (
//   <>
//     {input[name] && (
//       <select
//         name={name}
//         onChange={handleChange(name)}
//         className="shadow appearance-none border mt-1 w-[300px] border-blue-500 rounded block py-2 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//       >
//         <option value={null}>Select {label}</option>
//         {options?.map((option) => (
//           <option key={option._id} value={option._id}>
//             {option[name]}
//           </option>
//         ))}
//       </select>
//     )}
//   </>
// ))}



// const handleChange = (name) => (event) => {
//   if (name === "batch") {
//     handleBatchChange(event);
//   } else if (name === "program") {
//     handleProgramChange(event);
//   } else if (name === "group") {
//     handleGroupChange(event);
//   } else if (name === "participant") {
//     handleParticipantChange(event);
//   }
// };
