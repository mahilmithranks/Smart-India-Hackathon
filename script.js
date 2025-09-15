// === Map Setup ===
let map = L.map('map').setView([20.5937, 78.9629], 5); // Centered on India

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// === Sample Bin Data ===
const bins = [
  { id: 1, name: "Bin 1", lat: 28.7041, lng: 77.1025, level: "low" },
  { id: 2, name: "Bin 2", lat: 19.0760, lng: 72.8777, level: "medium" },
  { id: 3, name: "Bin 3", lat: 13.0827, lng: 80.2707, level: "high" }
];

// === Add Bins to Map ===
bins.forEach(bin => {
  let color = bin.level === "low" ? "green" : bin.level === "medium" ? "orange" : "red";

  let marker = L.circleMarker([bin.lat, bin.lng], {
    radius: 10,
    fillColor: color,
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
  }).addTo(map);

  marker.bindPopup(`<b>${bin.name}</b><br>Status: <span class="status-badge ${bin.level}">${bin.level}</span>`);
});

// === Dark Mode Toggle ===
const toggleBtn = document.getElementById("darkModeToggle");
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  if (document.body.classList.contains("dark-mode")) {
    toggleBtn.innerText = "☀️ Light Mode";
  } else {
    toggleBtn.innerText = "🌙 Dark Mode";
  }
});

// === Dark Mode Styling ===
const style = document.createElement("style");
style.innerHTML = `
  .dark-mode {
    background: #121212;
    color: #f5f5f5;
  }
  .dark-mode header {
    background: #1f1f1f;
  }
  .dark-mode .card {
    background: #1e1e1e;
    color: #f5f5f5;
  }
  .dark-mode .alert.ok {
    background: #2e7d32;
    color: #fff;
  }
  .dark-mode .alert.warning {
    background: #fbc02d;
    color: #000;
  }
  .dark-mode .alert.critical {
    background: #c62828;
    color: #fff;
  }
`;
document.head.appendChild(style);
