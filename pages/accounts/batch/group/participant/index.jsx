import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../../../src/store/user/user.selector';
import { useRouter } from 'next/router';

const Participant = () => {
  const router = useRouter();
  const user = useSelector(selectCurrentUser);
  const { batchId, programId, groupId } = router.query;
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

  return <div>Participant</div>;
};

export default Participant;
