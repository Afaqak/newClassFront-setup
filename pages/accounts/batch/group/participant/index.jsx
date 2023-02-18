import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../../../src/store/user/user.selector';
import { useRouter } from 'next/router';
import Heading_1 from '../../../../../components/Heading_1';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { MontserratFont } from '../../../../../utils/fonts';
import UserInfo_card from '../../../../../components/user accounts/UserInfo_card';
const Participant = () => {
  const router = useRouter();
  const user = useSelector(selectCurrentUser);
  const { batchId, programId, groupId } = router.query;
  const [toggle, setToggle] = useState(false);
  const [id, setId] = useState('');
  console.log(batchId, programId, groupId);
  const [participants, setParticipants] = useState([]);
  useEffect(() => {
    const getParticipants = async () => {
      try {
        const res = await fetch(`https://vast-pink-moth-toga.cyclic.app/batches/${batchId}/programs/${programId}/groups/${groupId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        });
        const data = await res.json();
        console.log(data);
        setParticipants(data);
      } catch (error) {
        console.log(error);
      }
    };
    getParticipants();
  }, [batchId, programId, groupId]);

  const setToggleAndId = (id) => {
    setToggle(!toggle);
    setId(id);
  };

  return (
    <div className={`py-2 px-4 ${MontserratFont.className}`}>
      {toggle && (
        <UserInfo_card
          id={id}
          setToggle={setToggle}
        />
      )}
      <button
        onClick={() => router.back()}
        className='flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full my-4'
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <Heading_1 label={'Participants'} />
      <p className='text-sm text-gray-500 mb-2 py-2'>All participants in this group</p>
      <div className='flex flex-col gap-2'>
        {!participants.length ? (
          <div className='text-center text-gray-500'>No participants yet</div>
        ) : (
          participants.map((p) => (
            <div
              onClick={() => setToggleAndId(p._id)}
              key={p._id}
              className='p-2 border-2 border-gray-300 
            hover:bg-gray-200 '
            >
              <span className='text-lg cursor-pointer'>{p.username}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Participant;
