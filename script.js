// ---------- Dummy Bin Data ----------
let bins = [
    { id: 'B-101', lat: 12.9716, lng: 77.5946, level: 85, status: 'To Be Cleaned' },
    { id: 'B-102', lat: 12.9726, lng: 77.5956, level: 40, status: 'Normal' },
    { id: 'B-103', lat: 12.9736, lng: 77.5936, level: 70, status: 'Cleaning Now' },
    { id: 'B-104', lat: 12.9746, lng: 77.5926, level: 0, status: 'Cleaned' }
];

// ---------- Initialize Map ----------
const map = L.map('map').setView([12.9716, 77.5946], 15);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(map);

// ---------- Map Markers ----------
bins.forEach(bin => {
    let color;
    switch(bin.status) {
        case 'To Be Cleaned': color = 'red'; break;
        case 'Cleaning Now': color = 'orange'; break;
        case 'Cleaned': color = 'green'; break;
        default: color = 'blue';
    }

    const marker = L.circleMarker([bin.lat, bin.lng], {
        color: color,
        radius: 10,
        fillOpacity: 0.8
    }).addTo(map);

    marker.bindPopup(`<b>${bin.id}</b><br>Level: ${bin.level}%<br>Status: ${bin.status}`);
});

// ---------- Populate Table ----------
const tableBody = document.querySelector('#binTable tbody');
tableBody.innerHTML = '';

bins.forEach(bin => {
    const row = document.createElement('tr');
    let statusColor;
    switch(bin.status) {
        case 'To Be Cleaned': statusColor = 'red'; break;
        case 'Cleaning Now': statusColor = 'orange'; break;
        case 'Cleaned': statusColor = 'green'; break;
        default: statusColor = '#f0f0f0';
    }

    // Determine what to show in "Actions"
    let actionText = '';
    if (bin.status === 'To Be Cleaned') actionText = 'To Be Cleaned';
    else if (bin.status === 'Cleaned') actionText = 'Already Cleaned';
    else actionText = '-'; // for normal or cleaning now

    row.innerHTML = `
        <td>${bin.id}</td>
        <td>${bin.level}</td>
        <td style="color:${statusColor}; font-weight:bold">${bin.status}</td>
        <td style="color:${statusColor}; font-weight:bold">${actionText}</td>
    `;
    tableBody.appendChild(row);
});
