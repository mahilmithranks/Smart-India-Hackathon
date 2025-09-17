import React from "react";
import { motion } from "framer-motion";

function Feedback() {
  return (
    <motion.div
      className="p-8 text-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold mb-6">Feedback</h1>
      <form className="flex flex-col items-center gap-4 max-w-md mx-auto">
        <textarea
          placeholder="Enter your feedback..."
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows="5"
        />
        <button
          type="submit"
          className="px-6 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition"
        >
          Submit
        </button>
      </form>
    </motion.div>
  );
}

export default Feedback;
