import React from "react";
import { motion } from "framer-motion";
import BinCard from "../components/BinCard";
import MapView from "./MapView";

function Home() {
    const bins = [
        { id: "B-101", lat: 12.9716, lng: 77.5946, level: 85, status: "To Be Cleaned" },
        { id: "B-102", lat: 12.975, lng: 77.59, level: 45, status: "Cleaning Now" },
        { id: "B-103", lat: 12.97, lng: 77.6, level: 10, status: "Already Cleaned" },
    ];

    return (
        <div className="p-8 space-y-8">
            <h1 className="text-3xl font-bold text-center text-white">
                Smart Waste Bin Monitoring
            </h1>

            {/* Bin Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-center">
                {bins.map((bin) => (
                    <BinCard key={bin.id} {...bin} />
                ))}
            </div>

            {/* Map with Animation */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <MapView bins={bins} />
            </motion.div>
            <h1 className="text-3xl font-serif italic text-center text-white">
                "Let us unite together to save the world!"        </h1>
            <h1 className="text-3xl font-montserrat text-center text-white">
                "நாம் ஒன்றுகூடி உலகத்தை காப்பாற்றுவோம்!"            </h1>

            <h1 className="text-3xl font-montserrat text-center text-white">
                "आइए हम मिलकर दुनिया को बचाएं!"            </h1>
        </div>
    );
}

export default Home;
