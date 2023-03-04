import React, { useState, useEffect } from 'react';
import AddParticipant from './AddParticipant';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../src/store/user/user.selector';

const ParticpantsData = ({ data, id, setData }) => {
  const user = useSelector(selectCurrentUser);
  const [IsOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [batch, setBatch] = useState([]);
  useEffect(() => {
    const getBatches = async () => {
      try {
        const res = await fetch('https://vast-pink-moth-toga.cyclic.app/batches');
        const data = await res.json();

        setBatch(data);
      } catch (err) {
        console.log(err);
      }
    };
    getBatches();
  }, [IsOpen]);

  const toggleAddParticipant = () => {
    setIsOpen(!IsOpen);
  };

  const deleteParticipant = async (cid) => {
    console.log('id', id, 'cid', cid);
    try {
      setLoading(true);
      const res = await fetch(`https://vast-pink-moth-toga.cyclic.app/courses/${id}/participants/${cid}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='p-4'>
      {IsOpen && (
        <AddParticipant
          setData={setData}
          id={id}
          setIsOpen={setIsOpen}
          batch={batch}
        />
      )}
      {user?.user.teacher && (
        <button
          onClick={toggleAddParticipant}
          className='px-4 py-1 rounded-md bg-purple-500 text-white'
        >
          Add a user
        </button>
      )}
      <div className='mt-4'>
        {!data.length ? (
          <p className='text-gray-500'>No participants yet</p>
        ) : (
          data.map((d) => (
            <div
              key={d._id}
              className='flex justify-between items-center py-3 px-2 border-b border-gray-200 w-4/5'
            >
              <p>{d.participant.username}</p>
              <button
                className='px-2  rounded-md bg-gray-200 hover:bg-gray-300'
                onClick={() => deleteParticipant(d._id)}
              >
                <FontAwesomeIcon
                  size='md'
                  icon={faTrash}
                />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ParticpantsData;
