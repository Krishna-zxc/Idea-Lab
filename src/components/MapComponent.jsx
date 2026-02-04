import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapComponent = () => {
    // Start near Mira Bhayandar
    const [position, setPosition] = useState([19.2952, 72.8544]);

    useEffect(() => {
        const interval = setInterval(() => {
            setPosition(prev => [
                prev[0] + (Math.random() - 0.5) * 0.001,
                prev[1] + (Math.random() - 0.5) * 0.001
            ]);
        }, 2000); // Move every 2 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ height: '100%', width: '100%', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
            <MapContainer center={[19.2952, 72.8544]} zoom={14} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                    <Popup>
                        <strong>Bus MH-04-1234</strong><br />
                        Speed: 45 km/h<br />
                        Route: A
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

export default MapComponent;
