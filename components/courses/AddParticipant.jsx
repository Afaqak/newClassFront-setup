import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../src/store/user/user.selector';
import axios from 'axios';
const AddParticipant = ({ batch }) => {
  const user = useSelector(selectCurrentUser);
  const [input, setInput] = useState({ batch: '', program: '', group: '', participant: '' });
  const [program, setProgram] = useState([]);
  const [group, setGroup] = useState([]);

  console.log('b', batch);

  // const addParticipant = async (e) => {
  //   if (Object.values(input).some((item) => item === '')) {
  //     return;
  //   }

  //   e.preventDefault();

  //   try {
  //     setLoading(true);
  //     const res = await fetch(`https://vast-pink-moth-toga.cyclic.app/courses/${input.participant}/participants`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${user.token}`,
  //       },
  //       body: JSON.stringify(input),
  //     });
  //     console.log('res', res);
  //     if (res.ok) {
  //       setParticipants([...participants, input]);
  //       setToggle(false);
  //     } else {
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleBatchChange = async (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
    console.log(input);
    try {
      const response = await axios.get(`https://vast-pink-moth-toga.cyclic.app/batches/${value}/programs`);
      const { data } = response;
      setProgram(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleProgramChange = async (e) => {
    console.log(input);
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
    try {
      const response = await axios.get(`https://vast-pink-moth-toga.cyclic.app/batches/${input.batch}/programs/${value}/groups`);
      const { data } = response;
      console.log('dg', data);
      setGroup(data);
      console.log('data', data);
    } catch (err) {
      console.log(err);
    } finally {
    }
  };

  const handleGroupChange = async (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
    try {
      const res = await fetch(`https://vast-pink-moth-toga.cyclic.app/batches/${input.batch}/programs/${input.program}/groups/${value}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await res.json();

      console.log(data);

      console.log('gd data', data);
      setGroup(data);
    } catch (err) {
      console.log(err);
    } finally {
    }
  };

  // const handleParticipantChange = (e) => {
  //   const { name, value } = e.target;
  //   setInput({ ...input, [name]: value });
  // };

  // };
  return (
    <div className='w-full h-full fixed top-0 left-0 flex justify-center items-center bg-black bg-opacity-50 z-50'>
      <div className='flex flex-col items-center justify-center w-full px-10 md:px-0'>
        <form className='bg-white md:w-3/5 w-full px-6 py-3 relative shadow-md rounded-md'>
          <button className='absolute right-7 top-14 pt-1 md:top-7 font-semibold text-xl border px-3 py self-center hover:bg-gray-200'>{'X'}</button>
          <div className='mb-4'>
            <h1 className='font-semibold text-3xl text-slate-900'>Add Participant</h1>
            <p className='text-slate-700'>choose a participant and than add it</p>
          </div>
          <div>
            <select
              name='batch'
              onChange={handleBatchChange}
              className='select_participant'
            >
              {batch.map((batch) => (
                <option
                  className=''
                  value={batch._id}
                >
                  {batch.session}
                </option>
              ))}
            </select>
            {program.length > 0 && (
              <select
                name='program'
                id=''
                onChange={handleProgramChange}
                className='select_participant'
              >
                {program.map((p) => (
                  <option value={p._id}>{p.program}</option>
                ))}
              </select>
            )}
            {group.length > 0 && (
              <select
                onChange={handleGroupChange}
                name='group'
                id=''
                className='select_participant '
              >
                {group.map((g) => (
                  <option value={g._id}>{g.group}</option>
                ))}
              </select>
            )}
          </div>
          <button
            type='submit'
            className='px-10 py-1 rounded-md bg-blue-500 text-white'
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddParticipant;
