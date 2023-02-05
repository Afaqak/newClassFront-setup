import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../src/store/user/user.selector';
import UserAccount from '../../components/user accounts/UserAccount';
import withAuth from '../../components/withAuth';
const UserAccountInfo = () => {
  const userData = useSelector(selectCurrentUser) || {};
  const { user } = userData || {};

  return (
    <div className='p-4 min-h-screen dark:bg-gray-900'>
      <UserAccount
        userData={userData}
        user={user}
      />
    </div>
  );
};

export default withAuth(UserAccountInfo);
