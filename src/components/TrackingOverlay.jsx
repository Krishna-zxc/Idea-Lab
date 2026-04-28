import React from 'react';
import { Navigation, Clock, Zap, MapPin, Bus } from 'lucide-react';

const TrackingOverlay = () => {
    return (
        <div className="card-premium animate-slide-up" style={{
            position: 'absolute',
            top: '24px',
            right: '24px',
            zIndex: 1000,
            padding: '2.5rem',
            width: '380px',
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.4)',
            boxShadow: '0 40px 60px -15px rgba(0, 0, 0, 0.15)',
            animationDelay: '0.2s'
        }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ padding: '0.5rem', background: 'var(--primary)', borderRadius: '10px', color: 'white' }}>
                        <Bus size={20} />
                    </div>
                    <h3 style={{ color: 'var(--primary)', margin: 0, fontSize: '1.25rem', fontWeight: '800', fontFamily: 'Outfit, sans-serif' }}>Route A-101</h3>
                </div>
                <span className="badge badge-success" style={{ padding: '0.4rem 1rem' }}>
                    Live
                </span>
            </div>

            {/* Metrics */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                    <MetricBox icon={<Zap size={16} />} label="Speed" value="42 km/h" />
                    <MetricBox icon={<Clock size={16} />} label="Delay" value="None" color="var(--success)" />
                </div>

                <div style={{ padding: '1.25rem', background: '#F8FAFC', borderRadius: '16px', border: '1px solid #F1F5F9' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                        <MapPin size={16} color="var(--info)" />
                        <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Current Location</span>
                    </div>
                    <p style={{ margin: 0, fontWeight: '800', color: 'var(--primary)', fontSize: '1.1rem' }}>Near Shanti Nagar Junction</p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <StatusRow label="Next Stop" value="Royal Palms" />
                    <StatusRow label="Distance" value="1.8 km" />
                </div>

                <button className="btn-premium btn-premium-primary" style={{
                    marginTop: '0.5rem',
                    padding: '1.25rem',
                    borderRadius: '16px',
                    fontSize: '1.25rem',
                    width: '100%',
                    justifyContent: 'center',
                    boxShadow: '0 15px 30px -5px rgba(15, 23, 42, 0.3)'
                }}>
                    <Navigation size={20} />
                    <span>ETA: 04 Mins</span>
                </button>
            </div>
        </div>
    );
};

const MetricBox = ({ icon, label, value, color }) => (
    <div style={{ padding: '1rem', background: '#F8FAFC', borderRadius: '16px', border: '1px solid #F1F5F9' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem', color: 'var(--text-muted)' }}>
            {icon}
            <span style={{ fontSize: '0.75rem', fontWeight: '600' }}>{label}</span>
        </div>
        <p style={{ margin: 0, fontWeight: '800', fontSize: '1.1rem', color: color || 'var(--primary)' }}>{value}</p>
    </div>
);

const StatusRow = ({ label, value }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.25rem 0.5rem' }}>
        <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: '600' }}>{label}</span>
        <span style={{ fontWeight: '800', color: 'var(--primary)', fontSize: '1rem' }}>{value}</span>
    </div>
);

export default TrackingOverlay;
