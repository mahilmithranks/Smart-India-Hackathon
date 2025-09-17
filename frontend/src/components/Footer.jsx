import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 text-center py-4 mt-8">
      <p className="text-sm">
        © {new Date().getFullYear()} All Rights Reserved by <span className="text-green-400 font-semibold">Technovators</span>
      </p>
    </footer>
  );
}

export default Footer;
