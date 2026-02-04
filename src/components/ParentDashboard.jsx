import React from 'react';
import { User, Phone, Info } from 'lucide-react';
import MapComponent from './MapComponent';

const ParentDashboard = ({ student }) => {
    const child = student || { name: 'Aarav Sharma', stop: 'Shanti Nagar', status: 'pending' };
    const isPicked = child.status === 'picked';

    return (
        <div style={{ padding: '1rem', height: '100%', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Student Status Card */}
            <div className="glass-panel" style={{
                padding: '2rem',
                background: isPicked
                    ? 'linear-gradient(135deg, var(--success-color), #059669)'
                    : 'linear-gradient(135deg, var(--accent-color), #d97706)',
                color: 'white',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div>
                    <h2 style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                        {isPicked ? 'On the Way!' : 'Waiting for Bus'}
                    </h2>
                    <p style={{ opacity: 0.9, fontSize: '1.1rem', marginTop: '0.5rem' }}>
                        {isPicked
                            ? `${child.name} has been picked up.`
                            : `${child.name} is scheduled for pickup at ${child.stop}.`}
                    </p>
                </div>
                <div style={{
                    background: 'rgba(255,255,255,0.2)',
                    padding: '1rem',
                    borderRadius: '50%',
                    backdropFilter: 'blur(5px)'
                }}>
                    <User size={48} />
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', flex: 1 }}>

                {/* Driver & Bus Info */}
                <div className="glass-panel" style={{ padding: '1.5rem', background: 'white' }}>
                    <h3 style={{ color: 'var(--primary-color)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Info size={20} /> Trip Details
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid #f1f5f9' }}>
                            <span style={{ color: 'var(--text-secondary)' }}>Bus Number</span>
                            <span style={{ fontWeight: '600' }}>MH-04-1234</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid #f1f5f9' }}>
                            <span style={{ color: 'var(--text-secondary)' }}>Driver Name</span>
                            <span style={{ fontWeight: '600' }}>Rajesh Kumar</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid #f1f5f9' }}>
                            <span style={{ color: 'var(--text-secondary)' }}>Driver Contact</span>
                            <span style={{ fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary-color)' }}>
                                <Phone size={16} /> +91 98765 43210
                            </span>
                        </div>
                    </div>
                </div>

                {/* Live Tracking Map */}
                <div className="glass-panel" style={{ overflow: 'hidden', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.5)' }}>
                    <div style={{ padding: '1rem', background: 'var(--primary-color)', color: 'white' }}>
                        <h3 style={{ margin: 0, fontSize: '1rem' }}>Live Bus Tracking</h3>
                    </div>
                    <div style={{ height: '100%' }}>
                        <MapComponent />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ParentDashboard;
