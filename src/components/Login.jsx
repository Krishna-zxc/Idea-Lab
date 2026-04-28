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
            background: 'radial-gradient(circle at top left, #1E293B 0%, #0F172A 100%)',
            padding: '1rem',
            overflow: 'hidden'
        }}>
            {/* Abstract background shapes */}
            <div style={{ 
                position: 'absolute', top: '-10%', left: '-10%', width: '40vw', height: '40vw', 
                background: themeColor, opacity: '0.05', borderRadius: '50%', filter: 'blur(100px)',
                transition: 'background 0.5s ease'
            }} />
            <div style={{ 
                position: 'absolute', bottom: '-10%', right: '-10%', width: '40vw', height: '40vw', 
                background: '#F59E0B', opacity: '0.05', borderRadius: '50%', filter: 'blur(100px)' 
            }} />

            <div className="animate-scale-in" style={{
                width: '100%',
                maxWidth: '440px',
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '32px',
                overflow: 'hidden',
                boxShadow: '0 40px 80px -20px rgba(0, 0, 0, 0.6)',
                position: 'relative',
                zIndex: 1
            }}>
                {/* Header */}
                <div style={{ textAlign: 'center', padding: '3.5rem 2.5rem 2rem' }}>
                    <div style={{
                        width: '84px',
                        height: '84px',
                        background: `linear-gradient(135deg, ${themeColor} 0%, ${themeColor}bb 100%)`,
                        borderRadius: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1.75rem',
                        color: 'white',
                        boxShadow: `0 20px 40px -10px ${themeColor}66`,
                        transform: 'rotate(-6deg)',
                        transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                    }}>
                        <span style={{ fontSize: '38px', transform: 'rotate(6deg)' }}>🚍</span>
                    </div>
                    <h1 style={{ 
                        fontSize: '2.25rem', 
                        fontWeight: '800', 
                        color: 'white', 
                        marginBottom: '0.75rem', 
                        letterSpacing: '-0.04em',
                        fontFamily: 'Outfit, sans-serif'
                    }}>Smart<span style={{ color: themeColor }}>Bus</span></h1>
                    <p style={{ color: '#94A3B8', fontSize: '1rem', fontWeight: '500' }}>Excellence in School Transport</p>
                </div>

                {/* Portal Selector Tabs */}
                <div style={{ 
                    display: 'flex', 
                    padding: '0 2.5rem', 
                    marginBottom: '2.5rem',
                    gap: '0.75rem'
                }}>
                    <Tab active={activeTab === 'parent'} onClick={() => { setActiveTab('parent'); setError(''); }} color="#10B981" icon={<Users size={18} />} label="Parent" />
                    <Tab active={activeTab === 'driver'} onClick={() => { setActiveTab('driver'); setError(''); }} color="#F59E0B" icon={<Bus size={18} />} label="Driver" />
                    <Tab active={activeTab === 'admin'} onClick={() => { setActiveTab('admin'); setError(''); }} color="#3B82F6" icon={<Shield size={18} />} label="Admin" />
                </div>

                {/* Form */}
                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '0 2.5rem 3.5rem' }}>
                    <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
                        <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.85rem', fontWeight: '700', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Username</label>
                        <div style={{ position: 'relative' }}>
                            <span style={{ position: 'absolute', left: '18px', top: '16px', color: '#475569' }}>
                                <User size={20} />
                            </span>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder={`${activeTab} access ID`}
                                style={{
                                    width: '100%',
                                    padding: '1.1rem 1.25rem 1.1rem 3.5rem',
                                    borderRadius: '16px',
                                    border: '2px solid rgba(255,255,255,0.05)',
                                    background: 'rgba(15, 23, 42, 0.4)',
                                    color: 'white',
                                    fontSize: '1rem',
                                    outline: 'none',
                                    transition: 'all 0.3s ease',
                                    boxSizing: 'border-box',
                                    fontFamily: 'Inter, sans-serif'
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = themeColor;
                                    e.target.style.background = 'rgba(15, 23, 42, 0.6)';
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = 'rgba(255,255,255,0.05)';
                                    e.target.style.background = 'rgba(15, 23, 42, 0.4)';
                                }}
                            />
                        </div>
                    </div>

                    <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
                        <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.85rem', fontWeight: '700', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Security Key</label>
                        <div style={{ position: 'relative' }}>
                            <span style={{ position: 'absolute', left: '18px', top: '16px', color: '#475569' }}>
                                <Lock size={20} />
                            </span>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                style={{
                                    width: '100%',
                                    padding: '1.1rem 1.25rem 1.1rem 3.5rem',
                                    borderRadius: '16px',
                                    border: '2px solid rgba(255,255,255,0.05)',
                                    background: 'rgba(15, 23, 42, 0.4)',
                                    color: 'white',
                                    fontSize: '1rem',
                                    outline: 'none',
                                    transition: 'all 0.3s ease',
                                    boxSizing: 'border-box',
                                    fontFamily: 'Inter, sans-serif'
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = themeColor;
                                    e.target.style.background = 'rgba(15, 23, 42, 0.6)';
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = 'rgba(255,255,255,0.05)';
                                    e.target.style.background = 'rgba(15, 23, 42, 0.4)';
                                }}
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="animate-scale-in" style={{
                            padding: '1rem',
                            background: 'rgba(239, 68, 68, 0.1)',
                            border: '1px solid rgba(239, 68, 68, 0.2)',
                            color: '#FCA5A5',
                            borderRadius: '16px',
                            fontSize: '0.9rem',
                            textAlign: 'center',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.75rem',
                            fontWeight: '600'
                        }}>
                            <span>⚠️</span> {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="animate-slide-up"
                        style={{
                            marginTop: '0.5rem',
                            width: '100%',
                            background: `linear-gradient(135deg, ${themeColor} 0%, ${themeColor}dd 100%)`,
                            color: 'white',
                            fontSize: '1.1rem',
                            fontWeight: '800',
                            padding: '1.1rem',
                            borderRadius: '16px',
                            border: 'none',
                            cursor: 'pointer',
                            boxShadow: `0 15px 30px -5px ${themeColor}66`,
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            fontFamily: 'Outfit, sans-serif',
                            animationDelay: '0.3s'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.transform = 'translateY(-4px) scale(1.02)';
                            e.target.style.boxShadow = `0 20px 40px -5px ${themeColor}88`;
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = 'translateY(0) scale(1)';
                            e.target.style.boxShadow = `0 15px 30px -5px ${themeColor}66`;
                        }}
                    >
                        Access Dashboard
                    </button>

                    {/* Demo Credentials Helper */}
                    <div className="animate-fade-in" style={{ 
                        marginTop: '0.5rem', 
                        textAlign: 'center', 
                        fontSize: '0.85rem', 
                        color: '#64748B', 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: '0.5rem',
                        animationDelay: '0.5s'
                    }}>
                        <p>Demo Credentials:</p>
                        <div style={{ 
                            background: 'rgba(255,255,255,0.03)', 
                            padding: '0.5rem', 
                            borderRadius: '10px',
                            border: '1px solid rgba(255,255,255,0.05)'
                        }}>
                            <span style={{ color: themeColor, fontWeight: '700' }}>{activeTab}</span> / <span style={{ color: '#CBD5E1' }}>{activeTab}123</span>
                        </div>
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
            gap: '0.6rem',
            padding: '1rem 0',
            cursor: 'pointer',
            borderRadius: '16px',
            color: active ? 'white' : '#64748B',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            background: active ? `${color}15` : 'transparent',
            border: `2px solid ${active ? `${color}30` : 'transparent'}`,
            position: 'relative',
            overflow: 'hidden'
        }}
    >
        {active && (
            <div style={{
                position: 'absolute', bottom: 0, left: '25%', right: '25%', height: '3px',
                background: color, borderRadius: '10px 10px 0 0', boxShadow: `0 0 10px ${color}`
            }} />
        )}
        <span style={{ 
            color: active ? color : '#475569', 
            transition: 'all 0.3s ease',
            transform: active ? 'scale(1.2)' : 'scale(1)'
        }}>{icon}</span>
        <span style={{ 
            fontSize: '0.85rem', 
            fontWeight: active ? '800' : '600',
            fontFamily: 'Outfit, sans-serif'
        }}>{label}</span>
    </div>
);

export default Login;
