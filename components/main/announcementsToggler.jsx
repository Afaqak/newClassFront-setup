import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setToggleGroupAnnouncement } from '../../src/store/user/user.actions';
import { selectToggleGroupAnnouncement } from '../../src/store/user/user.selector';
import { motion } from 'framer-motion';
const AnnouncementsToggler = () => {
  const dispatch = useDispatch();
  const toggleGroupAnnouncement = useSelector(selectToggleGroupAnnouncement);
  return (
    <div
      onClick={() => dispatch(setToggleGroupAnnouncement(!toggleGroupAnnouncement))}
      className='toggeLines absolute md:right-12
  right-4
    top-7 flex flex-col space-y-1'
    >
      <motion.div
        animate={{ rotate: toggleGroupAnnouncement ? 45 : 0, transition: { duration: 0.3 } }}
        className='line-1 bg-blue-600 h-[0.23rem] w-8'
      ></motion.div>
      <motion.div
        animate={{ rotate: toggleGroupAnnouncement ? -45 : 0, translateY: toggleGroupAnnouncement ? '-0.5rem' : '0rem', transition: { duration: 0.3 } }}
        className='line-2 bg-blue-600 h-[0.23rem] w-8 '
      ></motion.div>
    </div>
  );
};

export default AnnouncementsToggler;
