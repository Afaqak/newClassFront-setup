import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../src/store/user/user.selector';
import UserAccount from '../../components/user accounts/UserAccount';

const SingleUser = ({ id }) => {
  const [user, setUser] = useState(null);
  const userData = useSelector(selectCurrentUser);
  console.log(userData?.token);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`https://vast-pink-moth-toga.cyclic.app/accounts/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userData.token}`,
        },
      });
      const data = await res.json();
      setUser(data);
    };
    fetchData();
  }, [id]);

  const changeUserAttr = async (id, attr, value) => {
    let res;
    if (attr === 'valid') {
      res = await fetch(`https://vast-pink-moth-toga.cyclic.app/accounts/changeValidity/${id} `, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userData.token}`,
        },
        body: JSON.stringify({ valid: value }),
      });
    } else {
      res = await fetch(`https://vast-pink-moth-toga.cyclic.app/accounts/Mark${attr}/${id} `, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ teacher: value }),
      });
    }
    if (res.ok) {
      // The request was successful
      const fetchUser = async () => {
        const req = await fetch('https://vast-pink-moth-toga.cyclic.app/accounts', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userData.token}`,
          },
        });
        const data = await req.json();
        console.log(data);
      };
      fetchUser();
    }
  };

  return (
    <div className='p-4 min-h-screen bg-gray-50 dark:bg-gray-900'>
      <UserAccount user={user} />
    </div>
  );
};

export async function getServerSideProps(context) {
  const { _id } = context.params;
  console.log(_id);
  return {
    props: {
      id: _id,
    },
  };
}

export default SingleUser;
