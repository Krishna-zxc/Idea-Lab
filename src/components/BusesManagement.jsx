import React, { useState } from 'react';
import { Bus, Plus, Search, Edit2, Trash2, X } from 'lucide-react';

const BusesManagement = ({ buses, setBuses }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentBus, setCurrentBus] = useState({ name: '', driver: '', contact: '', status: 'Active' });
    const [isEditing, setIsEditing] = useState(false);

    const handleAddBus = (e) => {
        e.preventDefault();
        if (isEditing) {
            setBuses(buses.map(b => b.id === currentBus.id ? currentBus : b));
        } else {
            setBuses([...buses, { ...currentBus, id: Date.now() }]);
        }
        closeModal();
    };

    const openModal = (bus = null) => {
        if (bus) {
            setCurrentBus(bus);
            setIsEditing(true);
        } else {
            setCurrentBus({ name: '', driver: '', contact: '', status: 'Active' });
            setIsEditing(false);
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentBus({ name: '', driver: '', contact: '', status: 'Active' });
    };

    const deleteBus = (id) => {
        if (window.confirm('Are you sure you want to remove this bus?')) {
            setBuses(buses.filter(b => b.id !== id));
        }
    };

    const filteredBuses = buses.filter(b =>
        (b.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.driver.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Header Section */}
            <div className="card-premium animate-slide-up" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white', padding: '1.5rem 2rem' }}>
                <div>
                    <h2 style={{ fontSize: '1.5rem', color: 'var(--primary)', margin: 0 }}>Bus Management</h2>
                    <p style={{ color: 'var(--text-muted)', margin: '4px 0 0' }}>Track and manage school bus fleet</p>
                </div>
                <button className="btn-premium btn-premium-primary" onClick={() => openModal()}>
                    <Plus size={18} /> <span>Add New Bus</span>
                </button>
            </div>

            {/* Search Bar */}
            <div className="glass-panel" style={{ padding: '1rem', background: 'white', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Search size={20} color="var(--text-secondary)" />
                <input
                    type="text"
                    placeholder="Search by bus name or driver..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ border: 'none', outline: 'none', width: '100%', fontSize: '1rem', background: 'transparent' }}
                />
            </div>

            {/* Table Section */}
            <div className="glass-panel" style={{ background: 'white', overflow: 'hidden' }}>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                            <tr>
                                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)' }}>Bus Name</th>
                                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)' }}>Driver Name</th>
                                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)' }}>Contact</th>
                                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)' }}>Status</th>
                                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredBuses.map(bus => (
                                <tr key={bus.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                    <td style={{ padding: '1rem 1.5rem', fontWeight: 'bold' }}>{bus.name}</td>
                                    <td style={{ padding: '1rem 1.5rem' }}>{bus.driver}</td>
                                    <td style={{ padding: '1rem 1.5rem' }}>{bus.contact}</td>
                                    <td style={{ padding: '1rem 1.5rem' }}>
                                        <span style={{
                                            padding: '0.25rem 0.75rem',
                                            borderRadius: '20px',
                                            fontSize: '0.85rem',
                                            fontWeight: '600',
                                            background: bus.status === 'Active' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                                            color: bus.status === 'Active' ? 'var(--success-color)' : 'var(--danger-color)'
                                        }}>
                                            {bus.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem 1.5rem' }}>
                                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                                            <button onClick={() => openModal(bus)} style={{ background: 'none', border: 'none', color: 'var(--primary-color)', cursor: 'pointer' }}><Edit2 size={18} /></button>
                                            <button onClick={() => deleteBus(bus.id)} style={{ background: 'none', border: 'none', color: 'var(--danger-color)', cursor: 'pointer' }}><Trash2 size={18} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, backdropFilter: 'blur(4px)' }}>
                    <div className="glass-panel" style={{ background: 'white', width: '100%', maxWidth: '450px', padding: '2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                            <h3>{isEditing ? 'Edit Bus' : 'Add New Bus'}</h3>
                            <button onClick={closeModal} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={24} /></button>
                        </div>
                        <form onSubmit={handleAddBus} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Bus Name</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. SB1"
                                    value={currentBus.name}
                                    onChange={(e) => setCurrentBus({ ...currentBus, name: e.target.value })}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Driver Name</label>
                                <input
                                    type="text"
                                    required
                                    value={currentBus.driver}
                                    onChange={(e) => setCurrentBus({ ...currentBus, driver: e.target.value })}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Driver Contact</label>
                                <input
                                    type="text"
                                    required
                                    value={currentBus.contact}
                                    onChange={(e) => setCurrentBus({ ...currentBus, contact: e.target.value })}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Status</label>
                                <select
                                    value={currentBus.status}
                                    onChange={(e) => setCurrentBus({ ...currentBus, status: e.target.value })}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none' }}
                                >
                                    <option value="Active">Active</option>
                                    <option value="Maintenance">Maintenance</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>
                            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem', background: 'var(--primary-color)' }}>
                                {isEditing ? 'Save Changes' : 'Register Bus'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BusesManagement;
