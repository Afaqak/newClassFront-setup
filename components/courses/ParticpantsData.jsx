import React, { useState, useEffect } from 'react';
import AddParticipant from './AddParticipant';

const ParticpantsData = ({ data, id, setData }) => {
  console.log('dataa', data);
  const [IsOpen, setIsOpen] = useState(false);
  const [batch, setBatch] = useState([]);
  useEffect(() => {
    const getBatches = async () => {
      try {
        const res = await fetch('https://vast-pink-moth-toga.cyclic.app/batches');
        const data = await res.json();
        console.log(data);
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

  console.log('d', data);
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

      <button
        onClick={toggleAddParticipant}
        className='px-4 py-1 rounded-md bg-blue-500 text-white'
      >
        Add a user
      </button>
      <div>
        {data.map((d) => (
          <div key={d._id}>
            <p>{d.participant.username}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParticpantsData;
