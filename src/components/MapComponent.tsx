// // MapComponent.tsx


"use client"
import { useEffect } from "react";
import Script from "next/script";

const MapComponent = () => {
  useEffect(() => {
    // Ensure the map initializes after scripts load
    if (typeof window !== "undefined" && window.initializeMap) {
      window.initializeMap();
    }
  }, []);

  return (
    <div>
      {/* Dynamically load map scripts */}
      <Script type="text/javascript" src="/map/mapdata.js" />
      <Script type="text/javascript" src="/map/countrymap.js"/>

      {/* Map container */}
      <div id="map" style={{ width: "10%", height: "250px" }} />
    </div>
  );
};

export default MapComponent;
