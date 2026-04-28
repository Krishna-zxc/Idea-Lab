import React, { useState } from 'react';
import { User, MapPin, Phone, Clock, ChevronDown, UserCircle, ShieldCheck, BusFront } from 'lucide-react';

const ParentDashboard = ({ students = [], buses = [] }) => {
    const [selectedStudent, setSelectedStudent] = useState(students[0] || { name: 'Aarav Sharma', stop: 'Shanti Nagar', status: 'pending' });
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Keep selectedStudent in sync when students array updates
    const liveStudent = students.find(s => s.id === selectedStudent.id) || selectedStudent;
    const isPicked = liveStudent.status === 'picked';
    const assignedBus = buses.find(b => b.name === liveStudent.bus) || null;

    const getStatusColor = () => {
        if (isPicked) return 'var(--success)';
        if (assignedBus) return 'var(--info)';
        return 'var(--warning)';
    };

    return (
        <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* Student Selector Card */}
            <div className="card-premium animate-slide-up" style={{ 
                position: 'relative', 
                zIndex: isDropdownOpen ? 1000 : 1,
                padding: '1.25rem 2rem'
            }}>
                <div 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <div style={{ 
                            background: '#F1F5F9', 
                            padding: '0.75rem', 
                            borderRadius: '12px',
                            color: 'var(--primary)'
                        }}>
                            <User size={24} />
                        </div>
                        <div>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Viewing Status For</p>
                            <h3 style={{ fontSize: '1.25rem', margin: 0 }}>{liveStudent.name}</h3>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem', marginLeft: '1rem' }}>
                            <span className={`badge ${isPicked ? 'badge-success' : (assignedBus ? 'badge-info' : 'badge-warning')}`}>
                                {isPicked ? 'Picked Up' : (assignedBus ? 'Bus Assigned' : 'Scheduled')}
                            </span>
                            {liveStudent.bus && (
                                <span className="badge badge-info">
                                    🚌 {liveStudent.bus}
                                </span>
                            )}
                        </div>
                    </div>
                    <ChevronDown size={24} color="#64748B" style={{ transform: isDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }} />
                </div>

                {isDropdownOpen && (
                    <div className="glass-panel animate-scale-in" style={{ 
                        position: 'absolute', 
                        top: '105%', 
                        left: 0, 
                        right: 0, 
                        zIndex: 100, 
                        background: 'white', 
                        marginTop: '0.5rem',
                        maxHeight: '300px',
                        overflowY: 'auto',
                        padding: '0.5rem'
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
                                    borderRadius: '12px',
                                    marginBottom: '2px',
                                    transition: 'var(--transition)'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = '#F1F5F9'}
                                onMouseLeave={(e) => e.currentTarget.style.background = selectedStudent.id === s.id ? '#F8FAFC' : 'transparent'}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: s.status === 'picked' ? 'var(--success)' : (s.bus ? 'var(--info)' : 'var(--warning)') }} />
                                    <span style={{ fontWeight: '600' }}>{s.name}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    {s.bus && <span style={{ fontSize: '0.75rem', color: 'var(--info)', fontWeight: '700' }}>{s.bus}</span>}
                                    <ChevronDown size={16} style={{ transform: 'rotate(-90deg)', opacity: 0.3 }} />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Status Hero Card */}
            <div className="animate-slide-up" style={{ 
                background: `linear-gradient(135deg, ${getStatusColor()} 0%, ${getStatusColor()}dd 100%)`, 
                borderRadius: '32px', 
                padding: '3rem', 
                color: (assignedBus || isPicked) ? 'white' : 'var(--primary)', // Darker text for 'Scheduled' state
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: `0 20px 40px -10px ${getStatusColor()}44`,
                animationDelay: '0.1s',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{ position: 'absolute', right: '-5%', top: '-10%', opacity: 0.1 }}>
                    <BusFront size={280} />
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem', position: 'relative', zIndex: 1 }}>
                    <div style={{ 
                        background: 'rgba(255,255,255,0.2)', 
                        backdropFilter: 'blur(10px)',
                        padding: '1.5rem', 
                        borderRadius: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                    }}>
                        <UserCircle size={64} strokeWidth={1.5} />
                    </div>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                            <ShieldCheck size={20} />
                            <span style={{ fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.85rem', opacity: 0.9 }}>Live Transit Status</span>
                        </div>
                        <h2 style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '0.5rem', lineHeight: 1 }}>
                            {isPicked ? 'Home Safe' : (assignedBus ? 'In Transit' : 'Scheduled')}
                        </h2>
                        <p style={{ opacity: 0.9, fontSize: '1.25rem', fontWeight: '500' }}>{liveStudent.name} • {liveStudent.stop}</p>
                    </div>
                </div>

                <div style={{ textAlign: 'right', position: 'relative', zIndex: 1 }}>
                    <p style={{ fontSize: '1rem', opacity: 0.8, marginBottom: '0.5rem', fontWeight: '600' }}>Estimated Arrival</p>
                    <h3 style={{ fontSize: '2.5rem', fontWeight: '800' }}>{isPicked ? 'Arrived' : '12 mins'}</h3>
                </div>
            </div>

            {/* Details Grid */}
            <div className="grid-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
                {/* Trip Info */}
                <div className="card-premium">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                        <div style={{ padding: '0.75rem', borderRadius: '12px', background: '#F8FAFC', color: 'var(--primary)' }}>
                            <BusFront size={24} />
                        </div>
                        <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Transport Details</h3>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <DetailRow label="Assigned Bus" value={assignedBus ? assignedBus.name : 'Not Assigned'} valueColor={assignedBus ? 'var(--info)' : 'var(--text-muted)'} />
                        <DetailRow label="Route Name" value={assignedBus?.route || 'Standard Route'} />
                        <DetailRow label="Current Status" value={isPicked ? 'Picked Up' : 'Scheduled'} valueColor={isPicked ? 'var(--success)' : 'var(--primary)'} />
                    </div>
                </div>

                {/* Driver Info */}
                <div className="card-premium">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                        <div style={{ padding: '0.75rem', borderRadius: '12px', background: '#F8FAFC', color: 'var(--primary)' }}>
                            <Phone size={24} />
                        </div>
                        <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Contact Information</h3>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <DetailRow label="Primary Driver" value={assignedBus?.driver || 'Assigning...'} />
                        <DetailRow label="Emergency Contact" value={assignedBus?.contact || 'N/A'} icon={<Phone size={14} />} />
                        <DetailRow label="Live Location" value="Active" valueColor="var(--success)" icon={<MapPin size={14} />} />
                    </div>
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
        <span style={{ color: 'var(--text-muted)', fontWeight: '500', fontSize: '0.95rem' }}>{label}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            {icon && <span style={{ color: 'var(--text-muted)' }}>{icon}</span>}
            <span style={{ 
                fontWeight: '700', 
                color: valueColor || 'var(--primary)',
                fontSize: '1rem'
            }}>{value}</span>
        </div>
    </div>
);

export default ParentDashboard;
