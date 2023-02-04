import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../src/store/user/user.selector';
import { useRouter } from 'next/router';

const withAuth = (WrappedComponent) => {
  const HOC = (props) => {
    const router = useRouter();
    const user = useSelector(selectCurrentUser);

    useEffect(() => {
      if (user && router.pathname === '/signup') {
        router.push('/');
      }
      if (!user) {
        router.push('/');
      }
    }, [user]);

    return user ? <WrappedComponent {...props} /> : null;
  };
  return HOC;
};

export default withAuth;
