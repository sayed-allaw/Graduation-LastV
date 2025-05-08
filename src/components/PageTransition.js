import React from "react";
import { motion } from "framer-motion";

// تعريف التحريكات
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  in: {
    opacity: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    y: -20,
  },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5,
};

/**
 * PageTransition Component
 * Used to add transition effects between pages
 *
 * @param {Object} props - Component properties
 * @param {React.ReactNode} props.children - Page content
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element} PageTransition component
 */
const PageTransition = ({ children, className = "" }) => {
  return (
    <motion.div
      className={className}
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
