import React from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../../src/store/user/user.selector';
import { useEffect } from 'react';
const groups = () => {
  const userData = useSelector(selectCurrentUser);
  const router = useRouter();
  const { batchId, programId } = router.query;

  console.log(batchId, programId);

  useEffect(() => {
    const getGroups = async () => {
      try {
        const res = await fetch(`https://vast-pink-moth-toga.cyclic.app/batches/${batchId}/programs/${programId}/group`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userData.token}`,
          },
        });
        const data = await res.json();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getGroups();
  }, [batchId, programId]);

  return <div>groups</div>;
};

// export async function getServerSideProps(context) {

//   console.log(batchId, programId);
//   const res = await fetch(`https://vast-pink-moth-toga.cyclic.app/batches/${batchId}/programs/${programId}/groups`);
//   const groups = await res.json();
//   return {
//     props: {
//       groups,
//     },
//   };
// }

export default groups;
