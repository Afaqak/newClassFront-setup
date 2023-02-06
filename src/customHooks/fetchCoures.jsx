import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setCoursesData } from '../store/courses/courses.action';

export const usefetchCourses = (user, setLoading) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch('https://vast-pink-moth-toga.cyclic.app/courses', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        });

        const data = await res.json();
        dispatch(setCoursesData(data));
      } catch (err) {
        toast.error('Something went wrong');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
};
