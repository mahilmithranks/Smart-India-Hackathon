import React from "react";
import { motion } from "framer-motion";

function BinCard({ id, status, level }) {
  let statusClass = "";
  if (status === "To Be Cleaned") statusClass = "bg-red-600";
  else if (status === "Cleaning Now") statusClass = "bg-yellow-500";
  else statusClass = "bg-green-600";

  return (
    <motion.div
      className={`p-6 rounded-2xl shadow-lg text-white ${statusClass}`}
      whileHover={{ rotateY: 10, scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      <h3 className="text-xl font-bold mb-2">Bin {id}</h3>
      <p className="text-lg">Level: {level}%</p>
      <p className="mt-2 text-base italic">{status}</p>
    </motion.div>
  );
}

export default BinCard;
