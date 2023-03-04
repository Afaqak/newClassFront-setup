import React from 'react';

const FormInput = ({ type, name, value, onChange, className, error, onBlur, loading, placeholder }) => {
  return (
    <div className='relative'>
      <input
        placeholder={placeholder}
        disabled={loading}
        className={className}
        name={name}
        type={type}
        onBlur={onBlur}
        value={value}
        onChange={onChange}
        required
      />

      {error && <p className='text-red-500 text-xs italic'>{error}</p>}
    </div>
  );
};

export default FormInput;
