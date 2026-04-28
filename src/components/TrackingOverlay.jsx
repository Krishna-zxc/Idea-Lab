import React from 'react';

const TrackingOverlay = () => {
    return (
        <div className="glass-panel" style={{
            position: 'absolute',
            top: '30px',
            right: '30px',
            zIndex: 1000,
            padding: '2rem',
            width: '350px',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <h3 style={{ color: '#0F172A', margin: 0, fontSize: '1.2rem', fontWeight: '800' }}>Bus Status: Route A</h3>
                <span style={{
                    fontSize: '0.75rem',
                    backgroundColor: '#ECFDF5',
                    color: '#10B981',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '20px',
                    fontWeight: '700',
                    border: '1px solid #10B981'
                }}>
                    On Time
                </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <StatusRow label="Current Speed" value="45 km/h" />
                <StatusRow label="Next Stop" value="Shanti Nagar" />
                <StatusRow label="Distance" value="2.4 km away" />

                <button style={{
                    marginTop: '0.5rem',
                    background: '#0F172A',
                    color: 'white',
                    padding: '1.25rem',
                    borderRadius: '12px',
                    textAlign: 'center',
                    fontWeight: '800',
                    fontSize: '1.1rem',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(15, 23, 42, 0.2)'
                }}>
                    ETA: 5 Minutes
                </button>
            </div>
        </div>
    );
};

const StatusRow = ({ label, value }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: '#64748B', fontSize: '0.95rem', fontWeight: '500' }}>{label}</span>
        <span style={{ fontWeight: '800', color: '#1E293B', fontSize: '1.05rem' }}>{value}</span>
    </div>
);

export default TrackingOverlay;
