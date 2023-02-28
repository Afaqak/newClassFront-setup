import { motion } from 'framer-motion';

const LinearProgress = () => {
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
          delay: 0.2,
          damping: 10,
          duration: 1,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      ></motion.div>
    </motion.div>
  );
};
export default LinearProgress;
