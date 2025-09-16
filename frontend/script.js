const socket = io();
const map = L.map('map').setView([12.9716, 77.5946], 13);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

let markers = {};
const liveStatusDiv = document.getElementById('liveStatus');

// ----------------- Helper Functions -----------------

// Update live status panel
function updateLiveStatus(bin) {
  let badge = document.getElementById(`status-${bin.binId}`);
  const color =
    bin.level >= 90 ? 'bg-red-600' : bin.level >= 50 ? 'bg-yellow-500' : 'bg-green-600';

  const content = `
    <div id="status-${bin.binId}" class="px-3 py-1 rounded ${color} text-white font-bold badge-hover">
      ${bin.binId}: ${bin.level}% (${bin.status})
    </div>
  `;

  if (badge) badge.outerHTML = content;
  else liveStatusDiv.insertAdjacentHTML('beforeend', content);
}

// Update marker on map
function updateMarker(bin) {
  const color =
    bin.level >= 90 ? 'red' : bin.level >= 50 ? 'yellow' : 'green';

  const icon = L.icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    shadowSize: [41, 41]
  });

  const popupContent = `
    <div class="p-2">
      <h3 class="font-bold text-lg text-white drop-shadow-lg">Bin ${bin.binId}</h3>
      <p class="text-sm text-white">Level: <b>${bin.level}%</b></p>
      <p class="text-sm text-white">Status: ${bin.status}</p>
      <p class="text-xs text-gray-400">Updated: ${new Date(bin.updated).toLocaleString()}</p>
    </div>
  `;

  if (markers[bin.binId]) {
    markers[bin.binId].setLatLng([bin.lat, bin.lng]).setIcon(icon).setPopupContent(popupContent);
  } else {
    markers[bin.binId] = L.marker([bin.lat, bin.lng], { icon }).addTo(map).bindPopup(popupContent);
  }

  updateLiveStatus(bin);
}

// ----------------- Chart.js -----------------
function renderChart(bins) {
  const ctx = document.getElementById('binChart').getContext('2d');

  const labels = bins.map(b => b.binId);
  const data = bins.map(b => b.level);
  const bgColors = bins.map(b =>
    b.level >= 90 ? 'rgba(255,0,0,0.7)' :
    b.level >= 50 ? 'rgba(255,255,0,0.7)' :
    'rgba(0,128,0,0.7)'
  );

  // Destroy previous chart instance if exists
  if (window.binChartInstance) window.binChartInstance.destroy();

  window.binChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Bin Fill Level (%)',
        data,
        backgroundColor: bgColors,
        borderColor: bgColors.map(c => c.replace('0.7', '1')),
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: true }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100
        }
      }
    }
  });
}

// ----------------- Load Dummy Bins -----------------
async function loadBins() {
  try {
    const res = await fetch('/api/dummy'); // Replace with '/api/bins' when hardware connected
    const bins = await res.json();

    bins.forEach(updateMarker);
    renderChart(bins);
  } catch (err) {
    console.error("Error loading bins:", err);
  }
}

// ----------------- Real-time Updates -----------------
socket.on('binUpdate', (bin) => {
  console.log("Real-time bin update:", bin);
  updateMarker(bin);

  // Update chart dynamically
  const allBins = Object.values(markers).map(marker => {
    const popupHTML = marker.getPopup().getContent();
    const binId = popupHTML.match(/Bin (\w+)/)[1];
    const level = parseInt(popupHTML.match(/Level: <b>(\d+)%/)[1]);
    return { binId, level };
  });
  renderChart(allBins);
});

// ----------------- Initial Load -----------------
loadBins();
