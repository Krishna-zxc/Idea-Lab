import React from 'react';
import { UserCheck, MapPin, CheckCircle, Circle } from 'lucide-react';

const DriverDashboard = ({ students, onTogglePickup }) => {
    const pendingCount = students.filter(s => s.status === 'pending').length;

    return (
        <div style={{ padding: '1rem', maxWidth: '600px', margin: '0 auto' }}>

            {/* Header Stats */}
            <div className="glass-panel" style={{
                padding: '1.5rem',
                marginBottom: '2rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'linear-gradient(135deg, var(--primary-color), #334155)',
                color: 'white'
            }}>
                <div>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Route A - Morning</h2>
                    <p style={{ opacity: 0.8 }}>Bus MH-04-1234</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '2rem', fontWeight: 'bold' }}>{pendingCount}</span>
                    <p style={{ fontSize: '0.8rem', opacity: 0.8 }}>Students Left</p>
                </div>
            </div>

            {/* Student List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {students.map((student) => {
                    const isPicked = student.status === 'picked';
                    return (
                        <div
                            key={student.id}
                            onClick={() => onTogglePickup(student.id)}
                            className="glass-panel"
                            style={{
                                padding: '1rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                background: isPicked ? 'rgba(255, 255, 255, 0.4)' : 'var(--card-bg)',
                                opacity: isPicked ? 0.7 : 1,
                                borderLeft: isPicked ? '4px solid var(--success-color)' : '4px solid var(--accent-color)'
                            }}
                        >
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                background: isPicked ? 'var(--success-color)' : '#e2e8f0',
                                color: isPicked ? 'white' : 'var(--text-secondary)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                {isPicked ? <CheckCircle size={24} /> : <Circle size={24} />}
                            </div>

                            <div style={{ flex: 1 }}>
                                <h3 style={{
                                    margin: 0,
                                    fontSize: '1.1rem',
                                    textDecoration: isPicked ? 'line-through' : 'none',
                                    color: isPicked ? 'var(--text-secondary)' : 'var(--text-primary)'
                                }}>
                                    {student.name}
                                </h3>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                                    <MapPin size={14} />
                                    <span>{student.stop}</span>
                                </div>
                            </div>

                            {isPicked && (
                                <span style={{
                                    fontSize: '0.75rem',
                                    fontWeight: 'bold',
                                    color: 'var(--success-color)',
                                    background: 'rgba(16, 185, 129, 0.1)',
                                    padding: '0.25rem 0.75rem',
                                    borderRadius: '1rem'
                                }}>
                                    PICKED UP
                                </span>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default DriverDashboard;
