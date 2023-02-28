import { motion } from 'framer-motion';

const LinearProgress = ({ progress }) => {
  return (
    <motion.div className='w-full h-1 flex rounded-full bg-white fixed'>
      <motion.div
        className='w-28 h-1 bg-purple-500'
        animate={{
          translateX: 1500,
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      ></motion.div>
      <motion.div
        className='w-28 h-1 bg-green-500'
        animate={{
          translateX: 1500,
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      ></motion.div>
    </motion.div>
  );
};
export default LinearProgress;
