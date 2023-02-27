import React from 'react';
// import { useTheme } from 'next-themes';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { titleAnimation } from '../utils/animations/animations';
import { Galindo_Font } from '../utils/fonts';

const Header = () => {
  return (
    <header
      className={`header__container`}
      // ${darkMode ? 'bg-slate-900' : 'bg-white'}
    >
      <motion.h1
        variants={titleAnimation}
        initial='hidden'
        animate='show'
        className={`text-3xl font-medium  first-letter:
             text-gray-800 ${Galindo_Font.className}
            tracking-wider `}
      >
        Blink.
      </motion.h1>
    </header>
  );
};

export default Header;
