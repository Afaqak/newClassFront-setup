import React from 'react';

const Heading_1 = ({ label }) => {
  return (
    <h1
      className='text-4xl font-semibold tracking-wide text-slate-900 
dark:text-white
'
    >
      {label}
    </h1>
  );
};

export default Heading_1;
