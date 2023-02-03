import React from 'react';
import { motion } from 'framer-motion';
import { sliderContainer, slider } from '../utils/animations/animations';
const SlidesAnimation = () => {
  return (
    <motion.div
      variants={sliderContainer}
      initial='hidden'
      viewport={{ once: true }}
      animate='show'
    >
      <motion.div
        variants={slider}
        className='fixed top-14 left-0 h-screen w-full z-50
      bg-blue-400'
      ></motion.div>
      <motion.div
        variants={slider}
        className='fixed top-14 left-0 h-screen w-full z-50 bg-blue-500'
      ></motion.div>
    </motion.div>
  );
};

export default SlidesAnimation;
