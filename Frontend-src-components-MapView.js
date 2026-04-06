import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function MapView() {

  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {

    const fetchVehicles = () => {
      fetch("http://localhost:5000/api/vehicles")
        .then(res => res.json())
        .then(data => setVehicles(data))
        .catch(err => console.log(err));
    };

    fetchVehicles();

    const interval = setInterval(fetchVehicles, 3000);

    return () => clearInterval(interval);

  }, []);

  return (
    <div>
      <h2>🚗 Live Vehicle Tracking</h2>

      <MapContainer
        center={[13.0827, 80.2707]}
        zoom={12}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {vehicles.map(v => (
          <Marker key={v.id} position={[v.lat, v.lng]}>
            <Popup>
              <h3>{v.name}</h3>
              <p>Driver: {v.driver}</p>
              <p>Status: {v.status}</p>
              <p>Speed: {v.speed}</p>
            </Popup>
          </Marker>
        ))}

      </MapContainer>

    </div>
  );
}

export default MapView;
