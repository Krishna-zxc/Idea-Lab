import React from 'react';
import { User, CheckCircle, Clock } from 'lucide-react';

const AdminMonitor = ({ students }) => {
    const pickedCount = students.filter(s => s.status === 'picked').length;
    const totalCount = students.length;
    const progress = (pickedCount / totalCount) * 100;

    return (
        <div style={{ padding: '1rem', height: '100%', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            {/* Overview Header */}
            <div className="glass-panel" style={{
                padding: '2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'white'
            }}>
                <div>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--primary-color)' }}>Student Pickup Monitor</h2>
                    <p style={{ color: 'var(--text-secondary)' }}>Live verification of Route A (Morning)</p>
                </div>

                <div style={{ display: 'flex', gap: '2rem', textAlign: 'center' }}>
                    <div>
                        <span style={{ display: 'block', fontSize: '2rem', fontWeight: 'bold', color: 'var(--success-color)' }}>{pickedCount}</span>
                        <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Picked Up</span>
                    </div>
                    <div>
                        <span style={{ display: 'block', fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent-color)' }}>{totalCount - pickedCount}</span>
                        <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Pending</span>
                    </div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="glass-panel" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontWeight: '600' }}>
                    <span>Progress</span>
                    <span>{Math.round(progress)}% Complete</span>
                </div>
                <div style={{ width: '100%', height: '12px', background: '#e2e8f0', borderRadius: '6px', overflow: 'hidden' }}>
                    <div style={{
                        width: `${progress}%`,
                        height: '100%',
                        background: 'var(--success-color)',
                        transition: 'width 0.5s ease',
                        backgroundImage: 'linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)',
                        backgroundSize: '1rem 1rem'
                    }}></div>
                </div>
            </div>

            {/* Main Table List */}
            <div className="glass-panel" style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '0.5fr 2fr 2fr 1fr',
                    padding: '1rem 1.5rem',
                    background: '#f8fafc',
                    borderBottom: '1px solid #e2e8f0',
                    fontWeight: '600',
                    color: 'var(--text-secondary)'
                }}>
                    <span>ID</span>
                    <span>Student Name</span>
                    <span>Stop Location</span>
                    <span>Status</span>
                </div>

                <div style={{ overflowY: 'auto', flex: 1 }}>
                    {students.map((student, index) => (
                        <div key={student.id} style={{
                            display: 'grid',
                            gridTemplateColumns: '0.5fr 2fr 2fr 1fr',
                            padding: '1rem 1.5rem',
                            borderBottom: '1px solid #f1f5f9',
                            alignItems: 'center',
                            background: student.status === 'picked' ? 'rgba(16, 185, 129, 0.02)' : 'white'
                        }}>
                            <span style={{ color: 'var(--text-secondary)' }}>#{student.id}</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <div style={{
                                    width: '32px', height: '32px', borderRadius: '50%', background: '#e2e8f0',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)'
                                }}>
                                    <User size={16} />
                                </div>
                                <span style={{ fontWeight: '500' }}>{student.name}</span>
                            </div>
                            <span style={{ color: 'var(--text-secondary)' }}>{student.stop}</span>
                            <div>
                                {student.status === 'picked' ? (
                                    <span style={{
                                        display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                                        padding: '0.25rem 0.75rem', borderRadius: '20px',
                                        background: 'rgba(16, 185, 129, 0.15)', color: 'var(--success-color)',
                                        fontSize: '0.85rem', fontWeight: '600'
                                    }}>
                                        <CheckCircle size={14} /> Picked Up
                                    </span>
                                ) : (
                                    <span style={{
                                        display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                                        padding: '0.25rem 0.75rem', borderRadius: '20px',
                                        background: 'rgba(245, 158, 11, 0.15)', color: 'var(--accent-color)',
                                        fontSize: '0.85rem', fontWeight: '600'
                                    }}>
                                        <Clock size={14} /> Pending
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminMonitor;
