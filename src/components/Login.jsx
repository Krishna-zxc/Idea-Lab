import React, { useState } from 'react';
import { User, Lock, Bus, Shield, Users } from 'lucide-react';

const Login = ({ onLogin }) => {
    const [activeTab, setActiveTab] = useState('parent');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');

        // Mock Authentication Logic based on selected portal
        if (activeTab === 'admin' && username === 'admin' && password === 'admin123') {
            onLogin('admin');
        } else if (activeTab === 'driver' && username === 'driver' && password === 'driver123') {
            onLogin('driver');
        } else if (activeTab === 'parent' && username === 'parent' && password === 'parent123') {
            onLogin('parent');
        } else {
            setError('Invalid username or password for this portal.');
        }
    };

    const getThemeColor = () => {
        if (activeTab === 'admin') return '#3B82F6'; // Blue
        if (activeTab === 'driver') return '#F59E0B'; // Amber
        return '#10B981'; // Green for parent
    };

    const themeColor = getThemeColor();

    return (
        <div style={{
            height: '100vh',
            width: '100vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
            padding: '1rem',
            fontFamily: 'Inter, sans-serif'
        }}>
            <div className="glass-panel" style={{
                width: '100%',
                maxWidth: '420px',
                background: 'rgba(30, 41, 59, 0.7)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}>
                {/* Header */}
                <div style={{ textAlign: 'center', padding: '2.5rem 2rem 1.5rem' }}>
                    <div style={{
                        width: '72px',
                        height: '72px',
                        background: `linear-gradient(135deg, ${themeColor} 0%, ${themeColor}dd 100%)`,
                        borderRadius: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1.5rem',
                        color: 'white',
                        boxShadow: `0 10px 25px -5px ${themeColor}66`,
                        transform: 'rotate(-5deg)'
                    }}>
                        <span style={{ fontSize: '32px', transform: 'rotate(5deg)' }}>🚍</span>
                    </div>
                    <h1 style={{ fontSize: '1.8rem', fontWeight: '800', color: 'white', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>SmartBus System</h1>
                    <p style={{ color: '#94A3B8', fontSize: '0.95rem' }}>Sign in to access your portal</p>
                </div>

                {/* Portal Selector Tabs */}
                <div style={{ display: 'flex', padding: '0 2rem', marginBottom: '2rem' }}>
                    <Tab active={activeTab === 'parent'} onClick={() => { setActiveTab('parent'); setError(''); }} color="#10B981" icon={<Users size={16} />} label="Parent" />
                    <Tab active={activeTab === 'driver'} onClick={() => { setActiveTab('driver'); setError(''); }} color="#F59E0B" icon={<Bus size={16} />} label="Driver" />
                    <Tab active={activeTab === 'admin'} onClick={() => { setActiveTab('admin'); setError(''); }} color="#3B82F6" icon={<Shield size={16} />} label="Admin" />
                </div>

                {/* Form */}
                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', padding: '0 2rem 2.5rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: '600', color: '#94A3B8' }}>Username</label>
                        <div style={{ position: 'relative' }}>
                            <span style={{ position: 'absolute', left: '16px', top: '14px', color: '#64748B' }}>
                                <User size={18} />
                            </span>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder={`Enter ${activeTab} username`}
                                style={{
                                    width: '100%',
                                    padding: '0.85rem 1rem 0.85rem 3rem',
                                    borderRadius: '12px',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    background: 'rgba(15, 23, 42, 0.6)',
                                    color: 'white',
                                    fontSize: '0.95rem',
                                    outline: 'none',
                                    transition: 'border-color 0.2s',
                                    boxSizing: 'border-box'
                                }}
                                onFocus={(e) => e.target.style.borderColor = themeColor}
                                onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                            />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: '600', color: '#94A3B8' }}>Password</label>
                        <div style={{ position: 'relative' }}>
                            <span style={{ position: 'absolute', left: '16px', top: '14px', color: '#64748B' }}>
                                <Lock size={18} />
                            </span>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter password"
                                style={{
                                    width: '100%',
                                    padding: '0.85rem 1rem 0.85rem 3rem',
                                    borderRadius: '12px',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    background: 'rgba(15, 23, 42, 0.6)',
                                    color: 'white',
                                    fontSize: '0.95rem',
                                    outline: 'none',
                                    transition: 'border-color 0.2s',
                                    boxSizing: 'border-box'
                                }}
                                onFocus={(e) => e.target.style.borderColor = themeColor}
                                onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                            />
                        </div>
                    </div>

                    {error && (
                        <div style={{
                            padding: '0.85rem',
                            background: 'rgba(239, 68, 68, 0.1)',
                            border: '1px solid rgba(239, 68, 68, 0.2)',
                            color: '#FCA5A5',
                            borderRadius: '12px',
                            fontSize: '0.85rem',
                            textAlign: 'center',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            fontWeight: '500'
                        }}>
                            <span>⚠️</span> {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        style={{
                            marginTop: '0.5rem',
                            width: '100%',
                            background: themeColor,
                            color: 'white',
                            fontSize: '1rem',
                            fontWeight: '700',
                            padding: '0.9rem',
                            borderRadius: '12px',
                            border: 'none',
                            cursor: 'pointer',
                            boxShadow: `0 4px 14px 0 ${themeColor}40`,
                            transition: 'all 0.2s',
                        }}
                        onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                        onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                    >
                        Login to Dashboard
                    </button>

                    {/* Demo Credentials Helper */}
                    <div style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.75rem', color: '#64748B', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                        <span style={{ fontWeight: '600', color: '#94A3B8' }}>Demo Credentials:</span>
                        <span>User: <b>{activeTab}</b> | Pass: <b>{activeTab}123</b></span>
                    </div>
                </form>
            </div>
        </div>
    );
};

const Tab = ({ active, onClick, color, icon, label }) => (
    <div
        onClick={onClick}
        style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.75rem 0',
            cursor: 'pointer',
            borderBottom: `2px solid ${active ? color : 'transparent'}`,
            color: active ? 'white' : '#64748B',
            transition: 'all 0.2s',
            background: active ? `linear-gradient(to top, ${color}15, transparent)` : 'transparent',
            borderTopLeftRadius: '8px',
            borderTopRightRadius: '8px',
        }}
    >
        <span style={{ color: active ? color : '#64748B', transition: 'color 0.2s' }}>{icon}</span>
        <span style={{ fontSize: '0.8rem', fontWeight: active ? '700' : '600' }}>{label}</span>
    </div>
);

export default Login;
