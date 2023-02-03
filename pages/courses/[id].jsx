import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../src/store/user/user.selector';

const Participants = ({ data, id }) => {
  console.log(data);
  const [participants, setParticipants] = useState(data);
  const [input, setInput] = useState({ student: '63db84fefae71c867467c397' });
  const [toggle, setToggle] = useState(false);
  const user = useSelector(selectCurrentUser);
  const { admin } = user?.user || {};

  const toggleAddParticipant = () => {
    setToggle(!toggle);
  };

  const addParticipant = async (e) => {
    console.log(input);
    e.preventDefault();
    const res = await fetch(`https://vast-pink-moth-toga.cyclic.app/courses/${id}/participants`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(input),
    });
    const data = await res.json();
    console.log(data);
    if (!res.ok) throw new Error(res.statusText);
    setParticipants([...participants, data]);
    setToggle(false);
  };

  return (
    <div
      className='min-h-screen font-sans mt-5
      w-full relative bg-white 
      flex flex-col dark:bg-gray-900 
    '
    >
      <div className='px-4'>
        <h1
          className='text-4xl font-semibold tracking-wide text-slate-900 
        dark:text-white
        '
        >
          Participants
        </h1>
        <p className='text-gray-500 dark:text-gray-400'>students enrolled in this course</p>
        {admin && (
          <button
            onClick={toggleAddParticipant}
            className='bg-blue-500 mt-4 text-white py-1 px-3 rounded-lg'
          >
            Add Participant
          </button>
        )}
      </div>
      {toggle && (
        <form
          className='w-1/2 p-3'
          onSubmit={addParticipant}
        >
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='studentId'
          >
            Student ID
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            onChange={(e) => setInput({ ...input, student: e.target.value })}
            type='text'
            name='studentId'
            id='studentId'
          />
          <button
            className='bg-blue-500 mt-4 text-white py-1 px-3 rounded-lg'
            type='submit'
          >
            Add
          </button>
        </form>
      )}
    </div>
  );
};

export async function getServerSideProps(context) {
  const { id, user } = context.query;
  console.log(id, user);
  const res = await fetch(`https://vast-pink-moth-toga.cyclic.app/courses/${id}/participants`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user}`,
    },
  });
  const data = await res.json();

  return {
    props: {
      data,
      id,
    },
  };
}

export default Participants;
