import React, { useState } from 'react';

const Announcement = () => {
  const [toggleAnnouncement, setToggleAnnouncement] = useState(false);
  return (
    <div>
      <div className='bg-red-500'>
        <h1>Announcement</h1>
        <p>Make an announcement</p>
        <button onClick={() => setToggleAnnouncement(!toggleAnnouncement)}>X</button>
        <div>
          <div>
            <label htmlFor='title'>Title</label>
            <input
              type='text'
              name='title'
              id='title'
            />
          </div>
          <div>
            <label htmlFor='body'>Body</label>
            <textarea
              name='body'
              id='body'
              cols='30'
              rows='10'
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Announcement;
