import React from 'react';
// import { useTheme } from 'next-themes';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { titleAnimation } from '../utils/animations/animations';
import { Galindo_Font } from '../utils/fonts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
const Header = () => {
  const user = useSelector((state) => state.user?.currentUser?.user);
  // const { setTheme } = useTheme();
  // const [darkMode, setDarkMode] = React.useState(false);

  // React.useEffect(() => {
  //   setTheme(darkMode ? 'dark' : 'light');
  // }, [darkMode]);

  // const handleDarkModeToggle = () => {
  //   setDarkMode((prevDarkMode) => !prevDarkMode);
  // };

  return (
    <header
      className={`header flex justify-between 
        px-4 py-2 bg-white 
        border-b-2 border-blue-500 
        rounded-sm text-white p-2 shadow-md items-center
        w-full`}
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
      {/* <div className='header__right bg-gray-800 rounded-lg'>
        <div
          className={` flex items-center rounded-lg
                      shadow-md justify-center cursor-pointer
                   `}
        >
          <button
            // onClick={handleDarkModeToggle}
            className={` p-1 bg-secondary rounded-l-md ${!darkMode ? 'bg-yellow-500' : ''}`}
          >
            <FontAwesomeIcon
              className='w-6 h-4'
              icon={faSun}
            />
          </button>
          <button
            // onClick={handleDarkModeToggle}
            className={`
                        p-1 bg-secondary rounded-r-md ${darkMode ? 'bg-primary' : ''}`}
          >
            <FontAwesomeIcon
              className='w-6 h-4  rounded-r-md'
              icon={faMoon}
            />
          </button>
        </div>
      </div> */}
    </header>
  );
};

export default Header;
