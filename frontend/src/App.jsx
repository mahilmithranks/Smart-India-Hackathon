import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CurrentData from "./pages/CurrentData";
import LiveData from "./pages/LiveData";
import Feedback from "./pages/Feedback";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-white">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/current-data" element={<CurrentData />} />
          <Route path="/live-data" element={<LiveData />} />
          <Route path="/feedback" element={<Feedback />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
