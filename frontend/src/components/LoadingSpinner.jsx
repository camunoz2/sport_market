import { motion } from "framer-motion";

const LoadingSpinner = () => {
  return (
    <motion.div
      className="flex items-center justify-center w-full h-full"
      animate={{ y: [0, -10, 0] }}
      transition={{ repeat: Infinity, duration: 0.6 }}
    >
      <span className="text-6xl">🏃‍♂️</span>
    </motion.div>
  );
};

export default LoadingSpinner;
