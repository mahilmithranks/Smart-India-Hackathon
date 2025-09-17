import React from "react";
import { motion } from "framer-motion";

function CurrentData() {
  return (
    <motion.div
      className="p-8 text-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold mb-4">Current Data</h1>
      <p className="text-lg text-gray-300">
        Shows the latest bin fill levels and statuses (dummy for now).
      </p>
    </motion.div>
  );
}

export default CurrentData;
