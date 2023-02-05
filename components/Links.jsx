import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const Target = ({ href, className, icon, label, onClick }) => {
  return (
    <Link
      onClick={onClick}
      href={href}
      className={className}
    >
      <span>
        <FontAwesomeIcon
          className='text-[1.2rem]'
          icon={icon}
        />
      </span>
      <h3>{label}</h3>
    </Link>
  );
};

export default Target;
