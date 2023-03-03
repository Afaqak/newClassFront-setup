import React from 'react';
import { Galindo_Font } from '../../utils/fonts';
const Footer = () => {
  return (
    <div
      className={`
    ${Galindo_Font.className} py-10 flex flex-col bg-gray-900 text-white  `}
    >
      <div className='p-4'>
        <h1 className='text-2xl font-bold mb-4'>Contact Us</h1>
        <p className='text-md md:text-lg  font-medium text-gray-500 mb-4 tracking-wide leading-7'>
          If you have any questions or concerns, please contact us at 000-000-0000 or email us at
          <a
            href='mailto:afaqak124@gmail.com'
            className='text-purple-500'
          >
            {' '}
            afaqak124@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
