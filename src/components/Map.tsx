import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useState, useEffect } from 'react';

const Map = ({ address }: { address: string }) => {
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    // Convert address to coordinates
    const geocodeAddress = async () => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            address,
          )}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
        );
        const data = await response.json();
        if (data.results.length) {
          const { lat, lng } = data.results[0].geometry.location;
          setCoordinates({ lat, lng });
        }
      } catch (error) {
        console.error('Error fetching geocode data:', error);
      }
    };

    geocodeAddress();
  }, [address]);

  return (
    <LoadScript
      googleMapsApiKey={`${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
    >
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '400px' }}
        center={coordinates}
        zoom={14}
      >
        <Marker position={coordinates} />
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
