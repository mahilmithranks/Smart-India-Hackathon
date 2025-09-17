import React from "react";
import { motion } from "framer-motion";

function LiveData() {
  return (
    <motion.div
      className="p-8 text-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold mb-4">Live Data</h1>
      <p className="text-lg text-gray-300">
        Real-time monitoring will be shown here (dummy data only).
      </p>
    </motion.div>
  );
}

export default LiveData;
