// Inisialisasi peta dengan koordinat tengah dan zoom level
var map = L.map('map').setView([-2.0538389230438985, 102.27511784386269], 13);

// Tambahkan peta OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// URL ikon marker berwarna
var iconUrls = {
    "red": 'img/markerred.png',
            "blue": 'img/markerblue.png',
            "green": 'img/markergreen.png',
            "black": 'img/markerblack.png'
};

// Fungsi untuk membuat ikon marker dengan warna yang berbeda
function createColoredMarker(color) {
    return L.icon({
        iconUrl: iconUrls[color],
        shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });
}

// Koordinat lokasi sumber daya (contoh)
var resourceLocations = [
    { name: "Sumber Daya 1", location: [-2.158824686124802, 102.22430608064482], focus: "red" }, // Contoh lokasi 1
    { name: "Sumber Daya 2", location: [-2.1430429670623576, 102.13160894504466], focus: "blue" }, // Contoh lokasi 2
    { name: "Sumber Daya 3", location: [-2.1438429670623576, 102.11160894504466], focus: "green" }, // Contoh lokasi 3
    { name: "Sumber Daya 4", location: [-2.1630429670623576, 102.14160894504466], focus: "black" }  // Contoh lokasi 4
];

// Tambahkan marker untuk setiap lokasi sumber daya
resourceLocations.forEach(function(resource) {
    L.marker(resource.location, { icon: createColoredMarker(resource.focus) }).addTo(map)
        .bindPopup(`<b>${resource.name}</b><br>Lokasi Sumber Daya`);
});