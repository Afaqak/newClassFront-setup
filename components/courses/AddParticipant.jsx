import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../src/store/user/user.selector';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
const AddParticipant = ({ batch, setIsOpen, id, setData }) => {
  const user = useSelector(selectCurrentUser);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({ batch: '', program: '', group: '', participant: '' });
  const [program, setProgram] = useState([]);
  const [group, setGroup] = useState([]);
  const [participants, setParticipants] = useState([]);

  const addParticipant = async (e) => {
    if (Object.values(input).every((el) => el === '')) {
      return;
    }
    e.preventDefault();

    try {
      console.log({ student: input.participant });
      // setLoading(true);
      const res = await fetch(`https://vast-pink-moth-toga.cyclic.app/courses/${id}/participants`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ student: input.participant }),
      });
      console.log('res', res);
      if (res.ok) {
        const res = await fetch(`https://vast-pink-moth-toga.cyclic.app/courses/${id}/participants`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        });
        const data = await res.json();
        setData(data);
        console.log('all participants', data);
        setIsOpen(false);
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
    console.log(input);
    try {
      setLoading(true);
      const response = await axios.get(`https://vast-pink-moth-toga.cyclic.app/batches/${value}/programs`);
      const { data } = response;
      setProgram(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleProgramChange = async (e) => {
    console.log(input);
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
      const res = await fetch(`https://vast-pink-moth-toga.cyclic.app/batches/${input.batch}/programs/${input.program}/groups/${value}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await res.json();
      setParticipants(data);
      console.log(participants);
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

  const selectData = [
    {
      label: 'Batch',
      name: 'batch',
      value: 'session',
      options: batch,
      onChange: handleBatchChange,
    },
    {
      label: 'Program',
      value: 'program',
      name: 'program',
      options: program,
      onChange: handleProgramChange,
    },
    {
      label: 'Group',
      value: 'group',
      name: 'group',

      options: group,
      onChange: handleGroupChange,
    },
    {
      label: 'Participant',
      value: 'participants',
      name: 'participant',
      options: participants,
      onChange: handleParticipantChange,
    },
  ];

  return (
    <div className='w-full h-full fixed top-0 left-0 flex justify-center items-center bg-black bg-opacity-50 z-50'>
      <div className='flex flex-col items-center justify-center w-full px-10 md:px-0'>
        <form
          onSubmit={addParticipant}
          className='bg-white md:w-3/5 w-full px-6 py-3 relative shadow-md rounded-md'
        >
          <button
            onClick={() => setIsOpen(false)}
            className='absolute right-7 text-gray-400 pt-1  font-semibold self-center'
          >
            {loading ? <h1>loading...</h1> : <FontAwesomeIcon icon={faClose} />}
          </button>
          <div className='mb-4'>
            <h1 className='font-semibold text-3xl text-slate-900'>Add Participant</h1>
            <p className='text-slate-700'>choose a participant and than add it</p>
          </div>
          <div>
            {selectData.map(
              ({ label, name, options, onChange, value }) =>
                options?.length > 0 && (
                  <>
                    <label className='font-semibold'>{label}</label>
                    <select
                      onChange={onChange}
                      name={name}
                      id=''
                      className='select_participant'
                    >
                      <option value={`select ${label.toLowerCase()}`}>{`select ${label.toLowerCase()}`}</option>
                      {options.map((item) => (
                        <>
                          <option value={item._id}>{value == 'participants' ? item.username : item[value]}</option>
                        </>
                      ))}
                    </select>
                  </>
                )
            )}
          </div>
          <button
            type='submit'
            className='px-10 py-1 md:w-1/2 w-full rounded-md bg-blue-500 text-white'
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddParticipant;
