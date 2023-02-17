import React from 'react';
import { Galindo_Font } from '../utils/fonts';

const Heading_1 = ({ label }) => {
  return (
    <h1
      className={`text-3xl font-semibold tracking-wide text-slate-900 
dark:text-white ${Galindo_Font.className} 
  `}
    >
      {label}
    </h1>
  );
};

export default Heading_1;
