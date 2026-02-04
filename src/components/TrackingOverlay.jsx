import React from 'react';

const TrackingOverlay = () => {
    return (
        <div className="glass-panel" style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            zIndex: 1000,
            padding: '1.5rem',
            width: '320px',
            transition: 'all 0.3s ease'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <h3 style={{ color: 'var(--primary-color)', margin: 0 }}>Bus Status: Route A</h3>
                <span style={{
                    fontSize: '0.75rem',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    color: 'var(--success-color)',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '12px',
                    border: '1px solid currentColor'
                }}>
                    On Time
                </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Current Speed</span>
                    <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>45 km/h</span>
                </div>

                <div style={{ width: '100%', height: '1px', background: 'rgba(0,0,0,0.05)' }}></div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Next Stop</span>
                    <span style={{ fontWeight: 'bold' }}>Shanti Nagar</span>
                </div>

                <div style={{ width: '100%', height: '1px', background: 'rgba(0,0,0,0.05)' }}></div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Distance</span>
                    <span>2.4 km away</span>
                </div>

                <div style={{
                    marginTop: '0.5rem',
                    background: 'var(--primary-color)',
                    color: 'white',
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-md)',
                    textAlign: 'center',
                    fontWeight: 'bold'
                }}>
                    ETA: 5 Minutes
                </div>
            </div>
        </div>
    );
};

export default TrackingOverlay;
