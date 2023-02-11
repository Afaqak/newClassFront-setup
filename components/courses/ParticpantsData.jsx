import React, { useState, useEffect } from 'react';
import AddParticipant from './AddParticipant';

const ParticpantsData = ({ data }) => {
  console.log('dataa', data);
  const [IsOpen, setIsOpen] = useState(false);
  const [batch, setBatch] = useState([]);
  useEffect(() => {
    const getBatches = async () => {
      const res = await fetch('https://vast-pink-moth-toga.cyclic.app/batches');
      const data = await res.json();
      console.log(data);
      setBatch(data);
    };
    getBatches();
  }, [IsOpen]);

  console.log(IsOpen);

  const toggleAddParticipant = () => {
    setIsOpen(!IsOpen);
  };

  console.log('d', data);
  return (
    <div className='p-4'>
      {IsOpen && (
        <AddParticipant
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
        {data &&
          data.map((users) => {
            <p key={users._id}>{users._id}</p>;
          })}
      </div>
    </div>
  );
};

export default ParticpantsData;
