// Initialize Map
const map = L.map("map").setView([12.9716, 77.5946], 14);

// Tile Layer
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors",
}).addTo(map);

let bins = [
  { id: "B-101", lat: 12.975, lng: 77.595, fill: 85 },
  { id: "B-102", lat: 12.969, lng: 77.59, fill: 45 },
  { id: "B-103", lat: 12.968, lng: 77.598, fill: 62 },
  { id: "B-104", lat: 12.972, lng: 77.592, fill: 28 },
  { id: "B-105", lat: 12.974, lng: 77.596, fill: 92 },
];

const markers = [];

// Function to create bins
function createBin(bin) {
  const color = bin.fill > 80 ? "red" : bin.fill > 50 ? "orange" : "green";

  const circle = L.circleMarker([bin.lat, bin.lng], {
    radius: 10,
    color: color,
    fillColor: color,
    fillOpacity: 0.7,
    weight: 2,
  }).addTo(map);

  // Hover effect
  circle.on("mouseover", function () {
    this.setStyle({ radius: 14, fillOpacity: 1 });
  });
  circle.on("mouseout", function () {
    this.setStyle({ radius: 10, fillOpacity: 0.7 });
  });

  circle.bindPopup(`<b>${bin.id}</b><br>Fill: ${bin.fill}%`);
  markers.push(circle);
}

// Render bins
bins.forEach(createBin);

// Alerts + Recent
function updateSidebar() {
  const alertsList = document.getElementById("alertsList");
  const recentList = document.getElementById("recentList");

  alertsList.innerHTML = "";
  recentList.innerHTML = "";

  bins.forEach((bin) => {
    // Alerts
    if (bin.fill > 80) {
      const alertDiv = document.createElement("div");
      alertDiv.className = "alert-item";
      alertDiv.innerHTML = `
        <span><b>${bin.id}</b> — ${bin.fill}%</span>
        <button>Dispatch</button>
      `;
      alertsList.appendChild(alertDiv);
    }

    // Recent
    const li = document.createElement("li");
    li.textContent = `${bin.id} — ${bin.fill}% (${new Date().toLocaleTimeString()})`;
    recentList.appendChild(li);
  });
}

updateSidebar();

// Chart
const ctx = document.getElementById("binChart").getContext("2d");
new Chart(ctx, {
  type: "line",
  data: {
    labels: ["-6d", "-5d", "-4d", "-3d", "-2d", "-1d", "Today"],
    datasets: [
      {
        label: "Average Fill Level (%)",
        data: [65, 72, 68, 64, 60, 58, 62],
        borderColor: "#2563eb",
        backgroundColor: "rgba(37, 99, 235, 0.2)",
        tension: 0.3,
        fill: true,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: { legend: { display: false } },
  },
});

// Simulate live data
document.getElementById("simulateBtn").addEventListener("click", () => {
  bins = bins.map((bin) => ({
    ...bin,
    fill: Math.min(100, Math.max(0, bin.fill + (Math.random() * 20 - 10))),
  }));

  markers.forEach((m) => m.remove());
  markers.length = 0;
  bins.forEach(createBin);
  updateSidebar();
});
