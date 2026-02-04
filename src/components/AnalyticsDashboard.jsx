import React from 'react';
import { TrendingUp, Fuel, Clock, AlertTriangle } from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, trend, color }) => (
    <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{
                padding: '0.5rem',
                borderRadius: '8px',
                background: `${color}15`,
                color: color
            }}>
                <Icon size={24} />
            </div>
            {trend && (
                <span style={{
                    fontSize: '0.8rem',
                    color: trend > 0 ? 'var(--success-color)' : 'var(--danger-color)',
                    fontWeight: '600'
                }}>
                    {trend > 0 ? '+' : ''}{trend}%
                </span>
            )}
        </div>
        <h3 style={{ fontSize: '1.75rem', margin: '0.5rem 0 0', fontWeight: 'bold' }}>{value}</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>{label}</p>
    </div>
);

const AnalyticsDashboard = ({ students = [] }) => {
    const pickedCount = students.filter(s => s.status === 'picked').length;
    const totalCount = students.length;
    return (
        <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            {/* Top Stats Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
                <StatCard
                    icon={TrendingUp}
                    label="Route Efficiency"
                    value="94%"
                    trend={2.5}
                    color="#10B981"
                />
                <StatCard
                    icon={Fuel}
                    label="Fuel Saved"
                    value="128 L"
                    trend={5.2}
                    color="#F59E0B"
                />
                <StatCard
                    icon={Clock}
                    label="Avg. Commute Time"
                    value="28m"
                    trend={-1.5}
                    color="#3B82F6"
                />
                <StatCard
                    icon={AlertTriangle}
                    label="Safety Alerts"
                    value="2"
                    trend={0}
                    color="#EF4444"
                />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
                {/* Main Chart Area (Visual Mockup) */}
                <div className="glass-panel" style={{ padding: '2rem', height: '400px', display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ marginBottom: '1.5rem' }}>Transportation & Fuel Analytics</h3>

                    <div style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'space-between',
                        gap: '1rem',
                        paddingBottom: '1rem',
                        borderBottom: '1px solid #e2e8f0'
                    }}>
                        {[40, 65, 50, 80, 55, 90, 70].map((h, i) => (
                            <div key={i} style={{
                                width: '100%',
                                height: `${h}%`,
                                background: i === 5 ? 'var(--primary-color)' : '#cbd5e1',
                                borderRadius: '6px 6px 0 0',
                                transition: 'height 0.5s ease',
                                position: 'relative',
                                cursor: 'pointer'
                            }}>
                                <div style={{
                                    position: 'absolute',
                                    bottom: '-25px',
                                    width: '100%',
                                    textAlign: 'center',
                                    fontSize: '0.8rem',
                                    color: 'var(--text-secondary)'
                                }}>Daily</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Student Monitor - Dynamic Updates */}
                <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ marginBottom: '1rem' }}>Live Pickup Status</h3>

                    <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <div style={{
                            width: '100%',
                            height: '8px',
                            background: '#e2e8f0',
                            borderRadius: '10px',
                            overflow: 'hidden'
                        }}>
                            <div style={{
                                width: `${totalCount > 0 ? (pickedCount / totalCount) * 100 : 0}%`,
                                height: '100%',
                                background: 'var(--success-color)',
                                transition: 'width 0.5s ease'
                            }}></div>
                        </div>
                        <span style={{ fontWeight: 'bold', minWidth: '60px' }}>{pickedCount}/{totalCount}</span>
                    </div>

                    <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {students.map(student => (
                            <div key={student.id} style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '0.75rem',
                                background: 'var(--background-bg)',
                                borderRadius: '8px',
                                opacity: student.status === 'picked' ? 0.6 : 1
                            }}>
                                <span style={{ fontWeight: '500' }}>{student.name}</span>
                                <span style={{
                                    fontSize: '0.75rem',
                                    padding: '0.2rem 0.6rem',
                                    borderRadius: '12px',
                                    background: student.status === 'picked' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                                    color: student.status === 'picked' ? 'var(--success-color)' : 'var(--accent-color)'
                                }}>
                                    {student.status === 'picked' ? 'Picked' : 'Pending'}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsDashboard;
