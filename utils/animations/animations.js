const titleAnimation = {
    hidden: { opacity: 0, y: -250 },
    show: { opacity: 1, y: 0, transition: { duration: 0.75,delay:0.5 } },
  };

const pageAnimation = {
    hidden: { opacity: 0, y: -300 },
    show: { opacity: 1,y:0, transition: { duration: 0.75 } },
    exit: { opacity: 0,y:-300,transition: { duration: 0.75 } },
  };

const lineAnimation = {
    hidden: { width: "0%" },
    show: { width: "100%", transition: { duration: 1 } },
  };

const slider = {
    hidden: { x: "-130%", skew: "45deg"
  },
    show: {
      x:"100%",skew:"0deg",
      transition: { type: "tween", ease: [0.17, 0.67, 0.83, 0.67], duration: 1},
    },

  };

  const sliderContainer = {
    hidden: { opacity: 1 },
    show: { opacity: 1, transition: { staggerChildren: 0.15, ease: "easeOut" 
    
  } },
  };

  const tableContainer = {
    hidden: {y:100},
    show: {
      y:0,
      transition:{type:"spring",stiffness:100,delayChildren:0.5,
    staggerChildren:0.2
    }
    },
    exit: { opacity: 0,scale:0.5,transition: { duration: 0.75 } },
  };


  

  export { titleAnimation ,pageAnimation ,lineAnimation,slider,sliderContainer,tableContainer};