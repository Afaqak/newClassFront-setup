import React from 'react';
import { Galindo_Font } from '../utils/fonts';

const Heading_1 = ({ label }) => {
  return (
    <h1
      className={`text-3xl font-semibold tracking-wide text-[#0A2540] 
 ${Galindo_Font.className} 
  `}
    >
      {label}
    </h1>
  );
};

export default Heading_1;
