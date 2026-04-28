import React from 'react';
import { TrendingUp, Fuel, Clock, AlertTriangle, BarChart3, Activity, PieChart, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, trend, color, delay }) => (
    <div className="card-premium animate-slide-up" style={{ animationDelay: delay, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{
                padding: '0.75rem',
                borderRadius: '12px',
                background: `${color}10`,
                color: color
            }}>
                <Icon size={24} />
            </div>
            {trend && (
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '2px',
                    fontSize: '0.85rem',
                    color: trend > 0 ? 'var(--success)' : 'var(--danger)',
                    fontWeight: '700',
                    background: trend > 0 ? '#DCFCE7' : '#FEE2E2',
                    padding: '2px 8px',
                    borderRadius: '20px'
                }}>
                    {trend > 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    {Math.abs(trend)}%
                </div>
            )}
        </div>
        <div>
            <h3 style={{ fontSize: '2rem', margin: 0, fontWeight: '800', color: 'var(--primary)', letterSpacing: '-0.02em' }}>{value}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: '600', marginTop: '4px' }}>{label}</p>
        </div>
    </div>
);

const AnalyticsDashboard = ({ students = [] }) => {
    const pickedCount = students.filter(s => s.status === 'picked').length;
    const totalCount = students.length;
    const progress = totalCount > 0 ? Math.round((pickedCount / totalCount) * 100) : 0;

    return (
        <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            {/* Top Stats Row */}
            <div className="grid-auto">
                <StatCard icon={TrendingUp} label="Fleet Efficiency" value="94.2%" trend={2.5} color="var(--info)" delay="0s" />
                <StatCard icon={Fuel} label="Fuel Efficiency" value="12.8 km/L" trend={5.2} color="var(--warning)" delay="0.1s" />
                <StatCard icon={Clock} label="On-Time Rate" value="98.5%" trend={1.5} color="var(--success)" delay="0.2s" />
                <StatCard icon={AlertTriangle} label="Incident Reports" value="0" trend={0} color="var(--danger)" delay="0.3s" />
            </div>

            <div className="grid-auto" style={{ gridTemplateColumns: '2fr 1fr' }}>
                {/* Main Chart Area */}
                <div className="card-premium animate-fade-in" style={{ animationDelay: '0.4s', padding: '2.5rem', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                        <div>
                            <h3 style={{ fontSize: '1.5rem', margin: 0 }}>Transport Performance</h3>
                            <p style={{ color: 'var(--text-muted)', margin: '4px 0 0', fontSize: '0.9rem' }}>Weekly operations and fuel analysis</p>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button className="badge badge-info" style={{ border: 'none', cursor: 'pointer' }}>Weekly</button>
                            <button className="badge" style={{ border: 'none', cursor: 'pointer', background: '#F1F5F9', color: '#64748B' }}>Monthly</button>
                        </div>
                    </div>

                    <div style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'space-between',
                        gap: '1.5rem',
                        padding: '1rem 0 2rem',
                        borderBottom: '2px solid #F1F5F9'
                    }}>
                        {[45, 65, 52, 85, 58, 92, 75].map((h, i) => (
                            <div key={i} style={{
                                flex: 1,
                                height: `${h}%`,
                                background: i === 5 ? 'var(--primary)' : 'var(--bg-main)',
                                borderRadius: '12px 12px 4px 4px',
                                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                                position: 'relative',
                                cursor: 'pointer',
                                boxShadow: i === 5 ? '0 10px 20px -5px rgba(15, 23, 42, 0.3)' : 'none'
                            }}
                            onMouseEnter={(e) => e.target.style.transform = 'scaleY(1.05)'}
                            onMouseLeave={(e) => e.target.style.transform = 'scaleY(1)'}
                            >
                                <div style={{
                                    position: 'absolute',
                                    bottom: '-35px',
                                    width: '100%',
                                    textAlign: 'center',
                                    fontSize: '0.75rem',
                                    fontWeight: '700',
                                    color: i === 5 ? 'var(--primary)' : 'var(--text-muted)'
                                }}>{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}</div>
                                {i === 5 && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '-40px',
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        background: 'var(--primary)',
                                        color: 'white',
                                        padding: '4px 10px',
                                        borderRadius: '8px',
                                        fontSize: '0.75rem',
                                        fontWeight: 'bold'
                                    }}>{h}%</div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Live Tracking Card */}
                <div className="card-premium animate-fade-in" style={{ animationDelay: '0.5s', padding: '2rem', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                        <div style={{ padding: '0.5rem', borderRadius: '10px', background: '#DCFCE7', color: 'var(--success)' }}>
                            <Activity size={20} />
                        </div>
                        <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Boarding Status</h3>
                    </div>

                    <div style={{ marginBottom: '2.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <span style={{ fontWeight: '700', color: 'var(--primary)' }}>Completion Progress</span>
                            <span style={{ fontWeight: '800', color: 'var(--success)' }}>{progress}%</span>
                        </div>
                        <div style={{
                            width: '100%',
                            height: '12px',
                            background: '#F1F5F9',
                            borderRadius: '100px',
                            overflow: 'hidden',
                            border: '1px solid #E2E8F0'
                        }}>
                            <div style={{
                                width: `${progress}%`,
                                height: '100%',
                                background: 'linear-gradient(90deg, var(--success) 0%, #34D399 100%)',
                                transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)'
                            }}></div>
                        </div>
                        <p style={{ margin: '1rem 0 0', fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                            <b>{pickedCount}</b> of <b>{totalCount}</b> students safely on board
                        </p>
                    </div>

                    <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingRight: '0.5rem' }}>
                        {students.map((student, idx) => (
                            <div key={student.id} style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '1rem',
                                background: '#F8FAFC',
                                borderRadius: '12px',
                                border: '1px solid #F1F5F9',
                                animation: `fadeIn 0.5s ease both ${0.6 + (idx * 0.05)}s`
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: student.status === 'picked' ? 'var(--success)' : 'var(--warning)' }} />
                                    <span style={{ fontWeight: '600', color: 'var(--primary)', fontSize: '0.95rem' }}>{student.name}</span>
                                </div>
                                <span className={`badge ${student.status === 'picked' ? 'badge-success' : 'badge-warning'}`} style={{ fontSize: '0.65rem' }}>
                                    {student.status === 'picked' ? 'Boarded' : 'Scheduled'}
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
