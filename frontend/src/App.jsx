import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BackgroundBin3D from "./components/BackgroundBin3D";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CurrentData from "./pages/CurrentData";
import LiveData from "./pages/LiveData";
import Feedback from "./pages/Feedback";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-white relative overflow-hidden">
      {/* Global 3D Dustbin Background */}
      <BackgroundBin3D />

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8 relative z-10">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/current" element={<CurrentData />} /> */}
          <Route path="/live" element={<LiveData />} />
          <Route path="/feedback" element={<Feedback />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
