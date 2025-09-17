import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gray-900 px-6 py-4 shadow-md flex justify-between items-center">
      <h2 className="text-xl font-bold text-white">Smart Bin Management</h2>
      <div className="space-x-6">
        <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
        <Link to="/current" className="text-gray-300 hover:text-white">Current Data</Link>
        <Link to="/live" className="text-gray-300 hover:text-white">Live Data</Link>
        <Link to="/feedback" className="text-gray-300 hover:text-white">Feedback</Link>
      </div>
    </nav>
  );
}

export default Navbar;
