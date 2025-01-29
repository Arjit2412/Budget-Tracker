// MapComponent.tsx
"use client";

import React, { useEffect } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { useRouter } from "next/navigation";
import "leaflet/dist/leaflet.css";
import indiaGeoJson from "../../public/geojson/india_states2.json"; // Your GeoJSON file path

const indiaBounds = [
  [10.0, 69.0], // South-West corner
  [33.0, 96.0], // North-East corner
];

const MapComponent = () => {
  const router = useRouter();

  // Function to handle state clicks
  const onEachState = (feature: any, layer: any) => {
    layer.on({
      click: () => {
        const stateName = feature.properties.NAME_1; // Use NAME_1 for the state name
        const formattedStateName = stateName.replace(/\s+/g, "-").toLowerCase(); // Format for URL if needed
        router.push(`/states/${formattedStateName}`); // Navigate to the state page
      },
    });
    layer.bindTooltip(feature.properties.NAME_1); // Show state name on hover
  };
   

  return (
    <MapContainer
      style={{ height: "500px", width: "100%" }}
      bounds={indiaBounds}
      maxBounds={indiaBounds}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <GeoJSON
        data={indiaGeoJson}
        style={{
          fillColor: "#0078FF",
          color: "#0056b3",
          weight: 2,
          fillOpacity: 0.7,
        }}
        onEachFeature={onEachState}
      />
    </MapContainer>
  );
};

export default MapComponent;


// 'use client';

// import { useEffect } from 'react';
// import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS

// let L: any; // Declare Leaflet dynamically

// const MapComponent = () => {
//   useEffect(() => {
//     // Dynamically import Leaflet to avoid SSR issues
//     (async () => {
//       const leaflet = await import('leaflet');
//       L = leaflet;

//       // Initialize the map only if it doesn't already exist
//       if (!document.getElementById('map')._leaflet_id) {
//         const map = L.map('map').setView([28.6139, 77.2090], 4); // Centered on Delhi

//         // Add the tile layer for rendering the map
//         L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//           attribution: '© OpenStreetMap contributors',
//         }).addTo(map);

    
//         const geojsonResponse = await fetch('/geojson/india_states2.json'); // Place your GeoJSON file in the public folder
//       const indiaGeoJSON = await geojsonResponse.json();

//       // Add GeoJSON layer to the map
//       L.geoJSON(indiaGeoJSON, {
//         style: {
//           color: '#ff7800', // Boundary color
//           weight: 2, // Line thickness
//           fillColor: '#ffd700', // Fill color for the country
//           fillOpacity: 0.4, // Fill opacity
//         },
//       }).addTo(map);

//       // Fit map to the GeoJSON boundaries
//       map.fitBounds(L.geoJSON(indiaGeoJSON).getBounds());
//       const indiaBounds = [
//         [10.0, 69.0], // South-West corner (latitude, longitude)
//         [33.0, 96.0], // North-East corner (latitude, longitude)
//       ];

//       map.fitBounds(indiaBounds); // Automatically zoom and center map on India
//       map.setMaxBounds(indiaBounds);
//       map.setMinZoom(4)


//       }
//     })();
//   }, []);

//   return (
//     <div id="map" style={{ height: '500px', width: '100%' }}>
//       {/* The map will be rendered here */}
//     </div>
//   );
// };

// export default MapComponent;
