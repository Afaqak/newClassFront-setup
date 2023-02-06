import React from 'react';
import { motion } from 'framer-motion';

const Labels = ['name', 'teacher', 'credit', 'semester', 'group'];
const types = ['text', 'text', 'number', 'text', 'text'];

const Form = ({ handleInputChange, addCourse, updateCourse, formType }) => {
  return (
    <form
      onSubmit={formType === 'add' ? addCourse : updateCourse}
      className='flex flex-col'
    >
      <motion.p className='text-slate-800 block'>{formType === 'add' ? 'Add Course' : 'Update Course'}</motion.p>
      {Labels.map((label, i) => (
        <div
          key={i}
          className='flex flex-col mb-2'
        >
          <label
            htmlFor={label}
            className='text-slate-700 font-semibold'
          >
            {label}
          </label>
          <input
            placeholder={label}
            onChange={handleInputChange}
            type={types[i]}
            name={label}
            id={label}
            className='border-2 dark:bg-gray-50 border-gray-300 dark:text-gray-900 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
          />
        </div>
      ))}

      <motion.button
        whileTap={{ opacity: 0.5 }}
        whileHover={{ scale: 1.05 }}
        className='bg-blue-500 text-white py-1 px-3 rounded-lg'
      >
        {formType === 'add' ? 'Add Course' : 'Update Course'}
      </motion.button>
    </form>
  );
};

export default Form;
