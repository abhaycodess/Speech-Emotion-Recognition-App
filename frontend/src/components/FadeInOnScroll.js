import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const FadeInOnScroll = ({ children, y = 40, duration = 0.8, delay = 0, ...props }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.2 }); // triggers every time

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration, delay, ease: 'easeOut' }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default FadeInOnScroll; 