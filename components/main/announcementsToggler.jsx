import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setToggleGroupAnnouncement } from '../../src/store/user/user.actions';
import { selectToggleGroupAnnouncement } from '../../src/store/user/user.selector';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-regular-svg-icons';
const AnnouncementsToggler = () => {
  const dispatch = useDispatch();
  const toggleGroupAnnouncement = useSelector(selectToggleGroupAnnouncement);
  return (
    <div
      onClick={() => dispatch(setToggleGroupAnnouncement(!toggleGroupAnnouncement))}
      className='fixed top-[90%] left-[50%] transform -translate-x-1/2 -translate-y-1/2'
    >
      <div className='container bg-blue-50 flex items-center justify-center space-x-4 shadow-xl px-6 py-1'>
        <span>3 </span> <FontAwesomeIcon icon={faMessage} />
      </div>
    </div>
  );
};

export default AnnouncementsToggler;
