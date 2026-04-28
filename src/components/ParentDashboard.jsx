import React, { useState } from 'react';
import { User, MapPin, Phone, Clock, ChevronDown, UserCircle } from 'lucide-react';

const ParentDashboard = ({ students = [], buses = [] }) => {
    const [selectedStudent, setSelectedStudent] = useState(students[0] || { name: 'Aarav Sharma', stop: 'Shanti Nagar', status: 'pending' });
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Keep selectedStudent in sync when students array updates
    const liveStudent = students.find(s => s.id === selectedStudent.id) || selectedStudent;
    const isPicked = liveStudent.status === 'picked';
    const assignedBus = buses.find(b => b.name === liveStudent.bus) || null;

    return (
        <div style={{ padding: '0.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Student Selector */}
            <div className="glass-panel" style={{ 
                position: 'relative', 
                background: 'white', 
                padding: '0.75rem 1.5rem',
                zIndex: isDropdownOpen ? 1000 : 1
            }}>
                <div 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <User size={20} color="#64748B" />
                        <span style={{ fontWeight: '500' }}>{liveStudent.name}</span>
                        <span style={{ 
                            fontSize: '0.75rem', 
                            background: isPicked ? '#DCFCE7' : '#FEF3C7', 
                            color: isPicked ? '#16A34A' : '#D97706', 
                            padding: '0.1rem 0.5rem', 
                            borderRadius: '12px',
                            fontWeight: '600'
                        }}>
                            {isPicked ? 'Picked' : 'Pending'}
                        </span>
                        {liveStudent.bus && (
                            <span style={{ fontSize: '0.75rem', background: '#EFF6FF', color: '#3B82F6', padding: '0.1rem 0.5rem', borderRadius: '12px', fontWeight: '600' }}>
                                🚌 {liveStudent.bus}
                            </span>
                        )}
                    </div>
                    <ChevronDown size={20} color="#64748B" style={{ transform: isDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                </div>

                {isDropdownOpen && (
                    <div className="glass-panel" style={{ 
                        position: 'absolute', 
                        top: '100%', 
                        left: 0, 
                        right: 0, 
                        zIndex: 100, 
                        background: 'white', 
                        marginTop: '0.5rem',
                        maxHeight: '300px',
                        overflowY: 'auto',
                        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
                    }}>
                        {students.map(s => (
                            <div 
                                key={s.id}
                                onClick={() => {
                                    setSelectedStudent(s);
                                    setIsDropdownOpen(false);
                                }}
                                style={{ 
                                    padding: '1rem 1.5rem', 
                                    cursor: 'pointer',
                                    background: selectedStudent.id === s.id ? '#F8FAFC' : 'transparent',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    borderBottom: '1px solid #F1F5F9'
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <span style={{ fontWeight: '500' }}>{s.name}</span>
                                    {s.status === 'picked' && <span style={{ color: '#16A34A', fontSize: '0.7rem', background: '#DCFCE7', padding: '1px 6px', borderRadius: '10px' }}>✓</span>}
                                </div>
                                <Clock size={16} color={s.status === 'picked' ? '#16A34A' : '#D97706'} />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Status Banner */}
            <div style={{ 
                background: isPicked ? '#16A34A' : '#E68A00', 
                borderRadius: '16px', 
                padding: '2.5rem', 
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                gap: '2rem',
                boxShadow: `0 4px 20px ${isPicked ? 'rgba(22, 163, 74, 0.2)' : 'rgba(230, 138, 0, 0.2)'}`,
                transition: 'all 0.3s ease'
            }}>
                <div style={{ 
                    background: 'rgba(255,255,255,0.2)', 
                    padding: '1rem', 
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <UserCircle size={48} />
                </div>
                <div>
                    <h2 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '0.25rem' }}>
                        {isPicked ? 'Picked Up' : 'Waiting'}
                    </h2>
                    <p style={{ opacity: 0.9, fontSize: '1.1rem' }}>{liveStudent.name}</p>
                    {assignedBus ? (
                        <p style={{ opacity: 0.8, fontSize: '0.9rem', marginTop: '0.4rem' }}>Bus: {assignedBus.name} · {assignedBus.route || 'N/A'}</p>
                    ) : (
                        <p style={{ opacity: 0.6, fontSize: '0.85rem', marginTop: '0.4rem' }}>No bus assigned yet</p>
                    )}
                </div>
            </div>

            {/* Details Section */}
            <div className="glass-panel" style={{ background: 'white', padding: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                    <div style={{ padding: '0.5rem', borderRadius: '50%', background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                        <Clock size={20} />
                    </div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '700' }}>Driver & Trip Details</h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <DetailRow label="Assigned Bus" value={assignedBus ? assignedBus.name : 'Not Assigned'} valueColor={assignedBus ? '#3B82F6' : '#94A3B8'} />
                    <DetailRow label="Route" value={assignedBus?.route || 'N/A'} />
                    <DetailRow label="Pickup Stop" value={liveStudent.stop} icon={<MapPin size={16} />} />
                    <DetailRow label="Driver" value={assignedBus?.driver || 'N/A'} />
                    <DetailRow label="Contact" value={assignedBus?.contact || 'N/A'} icon={<Phone size={16} />} />
                    <DetailRow label="Est. Arrival" value={isPicked ? 'Arrived' : '~12 mins'} valueColor="#10B981" />
                    <DetailRow 
                        label="Status" 
                        value={isPicked ? 'Picked Up' : 'Awaiting Pickup'} 
                        valueColor={isPicked ? '#16A34A' : '#D97706'} 
                    />
                </div>
            </div>
        </div>
    );
};

const DetailRow = ({ label, value, icon, valueColor }) => (
    <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        paddingBottom: '1rem', 
        borderBottom: '1px solid #F1F5F9' 
    }}>
        <span style={{ color: '#64748B', fontWeight: '500' }}>{label}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {icon && <span style={{ color: '#64748B' }}>{icon}</span>}
            <span style={{ 
                fontWeight: '700', 
                color: valueColor || '#1E293B' 
            }}>{value}</span>
        </div>
    </div>
);

export default ParentDashboard;
