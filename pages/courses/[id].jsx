import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../src/store/user/user.selector';

const Participants = ({ data, id }) => {
  //get All users

  const [participants, setParticipants] = useState(data);
  const [accounts, setAccounts] = useState([]);
  const [input, setInput] = useState({ student: '' });
  console.log('inputM', input);
  const [toggle, setToggle] = useState(false);
  const user = useSelector(selectCurrentUser);
  const { admin } = user?.user || {};

  useEffect(() => {
    const getAllUsers = async () => {
      const res = await fetch('https://vast-pink-moth-toga.cyclic.app/accounts', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await res.json();
      console.log(data);
      setAccounts(data);
    };
    getAllUsers();
  }, []);

  const toggleAddParticipant = () => {
    setToggle(!toggle);
  };

  const addParticipant = async (e) => {
    console.log('input', input);
    e.preventDefault();
    try {
      const res = await fetch(`https://vast-pink-moth-toga.cyclic.app/courses/${id}/participants`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(input),
      });

      if (!res.ok) throw new Error(res.statusText);
      setParticipants([...participants, input]);
      setToggle(false);
    } catch (err) {
      console.log(err);
    }
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
            {toggle ? 'Cancel' : 'Add Participant'}
          </button>
        )}
      </div>
      {toggle && (
        <form
          className='w-1/2 px-4 py-6 text-gray-700 dark:text-gray-400'
          onSubmit={addParticipant}
        >
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='studentId'
          >
            Student ID
          </label>
          <span className='text-xs text-gray-500'>Select the student ID from the dropdown</span>
          <select
            className='shadow appearance-none border border-blue-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            name='studentId'
            id='studentId'
            onChange={(e) => setInput({ student: e.target.value })}
          >
            {accounts.map((account) => (
              <option
                key={account._id}
                value={account._id}
              >
                {account._id}
              </option>
            ))}
          </select>

          <button
            className='bg-slate-900 mt-4 text-white py-1 px-5 rounded-lg'
            type='submit'
          >
            Add
          </button>
        </form>
      )}
      <div className='flex flex-col w-full px-4 py-4 gap-y-2'>
        {participants.map((participant) => (
          <div
            key={participant._id}
            className='flex items-center justify-between px-4 py-2 border '
          >
            {participant._id}
          </div>
        ))}
      </div>
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
