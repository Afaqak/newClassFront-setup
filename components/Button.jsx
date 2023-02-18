import React from 'react';

const Button = ({ type, label, disabled, style }) => {
  return (
    <button
      disabled={disabled}
      type={type}
      className={`relative font-sans ${style}  bg-gray-800 py-2.5 px-5 font-medium uppercase text-white transition-colors before:absolute before:inset-0 before:-z-[1] before:h-full before:w-full before:border-2 before:border-transparent before:transition-all before:content-[''] before:hover:top-2 before:hover:left-2 before:hover:border-gray-700`}
    >
      {label}
    </button>
  );
};

export default Button;
