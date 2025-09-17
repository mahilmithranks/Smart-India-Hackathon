// import React from "react";
// import { motion } from "framer-motion";

// function CurrentData() {
//   const bins = [
//     { id: "B-101", level: 85, status: "To Be Cleaned" },
//     { id: "B-102", level: 50, status: "Cleaned" },
//     { id: "B-103", level: 100, status: "Cleaning Now" },
//   ];

//   return (
//     <motion.div
//       className="p-8 text-center"
//       initial={{ opacity: 0, y: 30 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       <h1 className="text-3xl font-bold mb-6">Current Data</h1>
//       <div className="space-y-4">
//         {bins.map((bin) => (
//           <div
//             key={bin.id}
//             className="p-4 bg-gray-800 rounded-lg shadow-md flex justify-between items-center"
//           >
//             <span>{bin.id}</span>
//             <span>{bin.level}% full</span>
//             <span
//               className={`font-semibold ${
//                 bin.status === "To Be Cleaned"
//                   ? "text-red-500"
//                   : bin.status === "Cleaning Now"
//                   ? "text-yellow-400"
//                   : "text-green-500"
//               }`}
//             >
//               {bin.status}
//             </span>
//           </div>
//         ))}
//       </div>
//     </motion.div>
//   );
// }

// export default CurrentData;
