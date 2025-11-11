import { motion } from "motion/react";

const LoadingSpinner = () => {
  return (
    <div className="bg-base-100 flex min-h-screen items-center justify-center">
      <motion.div
        className="relative h-24 w-24"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <div className="border-primary/30 absolute inset-0 rounded-full border-4"></div>
        <div className="border-t-primary absolute inset-0 rounded-full border-4 border-transparent"></div>
      </motion.div>
    </div>
  );
};

export default LoadingSpinner;
