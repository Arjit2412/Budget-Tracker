'use client';
import React, { useEffect, useState } from 'react';
import Script from 'next/script';

const MapComponent: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const loadScript = (src: string) => {
        return new Promise<void>((resolve, reject) => {
          const script = document.createElement('script');
          script.src = src;
          script.type = 'text/javascript';
          script.onload = () => resolve();
          script.onerror = () => reject(new Error(`Failed to load script ${src}`));
          document.body.appendChild(script);
        });
      };

      const initializeMap = async () => {
        try {
          await loadScript('/map/mapdata.js');
          await loadScript('/map/countrymap.js');
          if (window.initializeMap) {
            window.initializeMap();
          }
        } catch (error) {
          console.error(error);
        }
      };

      initializeMap();
    }
  }, [isClient]);

  if (!isClient) {
    return null;
  }

  return (
    <div>
      {/* Map container */}
      <div id="map" style={{ width: '100%', height: '250px' }} />
    </div>
  );
};

export default MapComponent;