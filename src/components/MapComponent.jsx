import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Custom Bus Icon using Emoji
const busIcon = L.divIcon({
    html: '<div style="font-size: 24px; background: white; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 10px rgba(0,0,0,0.2); border: 2px solid #0F172A;">🚍</div>',
    className: 'custom-bus-icon',
    iconSize: [40, 40],
    iconAnchor: [20, 20]
});

const MapComponent = () => {
    // Start near Mira Bhayandar
    const [position, setPosition] = useState([19.2952, 72.8544]);

    const stops = [
        [19.2980, 72.8550],
        [19.2930, 72.8520],
        [19.3000, 72.8500],
        [19.2910, 72.8580],
        [19.2950, 72.8480],
        [19.3020, 72.8600],
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setPosition(prev => [
                prev[0] + (Math.random() - 0.5) * 0.0002,
                prev[1] + (Math.random() - 0.5) * 0.0002
            ]);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ height: '100%', width: '100%', position: 'relative' }}>
            <MapContainer center={[19.2952, 72.8544]} zoom={15} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
                {/* Stop Markers (Red Circles) */}
                {stops.map((stop, idx) => (
                    <CircleMarker 
                        key={idx} 
                        center={stop} 
                        radius={6} 
                        pathOptions={{ color: 'white', fillColor: '#EF4444', fillOpacity: 1, weight: 2 }}
                    />
                ))}

                {/* Bus Marker */}
                <Marker position={position} icon={busIcon}>
                    <Popup>
                        <div style={{ padding: '0.5rem' }}>
                            <strong style={{ display: 'block', marginBottom: '0.25rem' }}>Bus MH-04-1234</strong>
                            <span style={{ fontSize: '0.85rem', color: '#64748B' }}>Speed: 45 km/h</span><br />
                            <span style={{ fontSize: '0.85rem', color: '#64748B' }}>Route: A</span>
                        </div>
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

export default MapComponent;
