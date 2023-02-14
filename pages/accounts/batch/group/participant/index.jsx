import React from 'react';
import { useRouter } from 'next/router';

const Participant = () => {
  const router = useRouter();
  const { batchId, programId, groupId } = router.query;
  console.log(batchId, programId, groupId);
  return <div>Participant</div>;
};

export default Participant;
