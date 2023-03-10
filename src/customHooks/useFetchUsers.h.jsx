import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../store/user/user.selector';
import { FetchTypeGet } from '../../utils/fetch/fetchtypeget';
const useFetchUsers = () => {
  const userData = useSelector(selectCurrentUser);
  const { user } = userData || {};
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchUser = async () => {
      if (!userData) return;
      try {
        const data = await FetchTypeGet('https://vast-pink-moth-toga.cyclic.app/accounts', userData.token);
        setUsers(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [userData]);

  return { users, loading, user, userData };
};

export default useFetchUsers;
