import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Custom Bus Icon using Emoji with premium styling
const busIcon = L.divIcon({
    html: `
        <div class="bus-marker-container">
            <div class="bus-marker-ping"></div>
            <div class="bus-marker-core">
                <span style="font-size: 20px;">🚍</span>
            </div>
        </div>
    `,
    className: 'custom-bus-icon',
    iconSize: [44, 44],
    iconAnchor: [22, 22]
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
                prev[0] + (Math.random() - 0.5) * 0.0003,
                prev[1] + (Math.random() - 0.5) * 0.0003
            ]);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ height: '100%', width: '100%', position: 'relative', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
            <MapContainer center={[19.2952, 72.8544]} zoom={15} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" // Cleaner, lighter map style
                />
                
                {/* Stop Markers */}
                {stops.map((stop, idx) => (
                    <CircleMarker 
                        key={idx} 
                        center={stop} 
                        radius={8} 
                        pathOptions={{ 
                            color: 'white', 
                            fillColor: '#F59E0B', // Amber for stops
                            fillOpacity: 1, 
                            weight: 3 
                        }}
                    >
                        <Popup>
                            <div style={{ padding: '0.25rem', textAlign: 'center' }}>
                                <strong style={{ fontFamily: 'Outfit, sans-serif' }}>Stop #{idx + 1}</strong>
                                <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: '#64748B' }}>Scheduled Pickup</p>
                            </div>
                        </Popup>
                    </CircleMarker>
                ))}

                {/* Bus Marker */}
                <Marker position={position} icon={busIcon}>
                    <Popup className="premium-popup">
                        <div style={{ padding: '0.75rem', minWidth: '150px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--success)' }} />
                                <strong style={{ fontSize: '1rem', fontFamily: 'Outfit, sans-serif', color: 'var(--primary)' }}>Bus MH-04-1234</strong>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                <span style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: '600' }}>⚡ Speed: 42 km/h</span>
                                <span style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: '600' }}>📍 Route: A-101</span>
                            </div>
                        </div>
                    </Popup>
                </Marker>
            </MapContainer>

            <style>{`
                .bus-marker-container {
                    position: relative;
                    width: 44px;
                    height: 44px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .bus-marker-core {
                    width: 40px;
                    height: 40px;
                    background: white;
                    border: 3px solid var(--primary);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 10px 20px rgba(15, 23, 42, 0.2);
                    z-index: 2;
                }
                .bus-marker-ping {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    background: var(--primary);
                    border-radius: 50%;
                    opacity: 0.4;
                    animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
                    z-index: 1;
                }
                @keyframes ping {
                    75%, 100% {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
                .premium-popup .leaflet-popup-content-wrapper {
                    border-radius: 16px;
                    box-shadow: 0 20px 40px -10px rgba(0,0,0,0.15);
                    border: 1px solid #F1F5F9;
                }
                .premium-popup .leaflet-popup-tip {
                    box-shadow: none;
                }
            `}</style>
        </div>
    );
};

export default MapComponent;
