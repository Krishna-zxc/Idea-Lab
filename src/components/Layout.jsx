import React, { useState } from 'react';

const Layout = ({ children, activeTab, setActiveTab, userRole, onLogout }) => {
  const allNavItems = [
    { id: 'dashboard', icon: '📊', label: 'Analytics', roles: ['admin'] },
    { id: 'monitor', icon: '👤', label: 'Admin Monitor', roles: ['admin'] },
    { id: 'parent', icon: '👪', label: 'Parent Portal', roles: ['parent'] },
    { id: 'driver', icon: '🚍', label: 'Driver Mode', roles: ['driver'] },
    { id: 'tracking', icon: '🗺️', label: 'Live Tracking', roles: ['admin', 'driver', 'parent'] },
  ];

  const navItems = allNavItems.filter(item => item.roles.includes(userRole));

  return (
    <div className="layout-container">
      {/* Sidebar */}
      <aside className="sidebar glass-panel">
        <div className="logo-area">
          <span style={{ fontSize: '28px' }}>🚍</span>
          <h2>Smart<span style={{ color: 'var(--accent-color)' }}>Bus</span></h2>
        </div>

        <nav>
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <span style={{ fontSize: '18px' }}>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="top-header glass-panel" style={{ background: 'white' }}>
          <div className="header-title">
            <h1>{activeTab === 'parent' ? 'Parent Portal' : activeTab === 'tracking' ? 'Live Bus Tracking' : 'School Transport Overview'}</h1>
          </div>
          <div className="header-actions">
            <button className="icon-btn" style={{ fontSize: '1.2rem' }}>🌙</button>
            <div className="user-profile" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.2rem' }}>👤</span>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  {userRole === 'admin' ? 'Administrator' : userRole === 'driver' ? 'Driver Mode' : 'Parent Portal'}
                </span>
              </div>
              <button 
                onClick={onLogout} 
                className="btn-logout"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        <div className="content-area">
          {children}
        </div>
      </main>

      <style>{`
        .layout-container {
          display: flex;
          height: 100vh;
          width: 100vw;
          padding: 1.5rem;
          gap: 1.5rem;
          background: #E5EBF2;
        }

        .sidebar {
          width: 260px;
          display: flex;
          flex-direction: column;
          padding: 1.5rem;
          height: 100%;
          background: #F8FAFC;
        }

        .logo-area {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 3rem;
          font-weight: 800;
          font-size: 1.5rem;
          color: #0F172A;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          width: 100%;
          padding: 1rem 1.25rem;
          border: none;
          background: transparent;
          color: #64748B;
          font-weight: 600;
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all 0.2s ease;
          margin-bottom: 0.75rem;
        }

        .nav-item:hover {
          background: rgba(15, 23, 42, 0.05);
        }

        .nav-item.active {
          background: #0F172A;
          color: #F59E0B;
        }
        
        .btn-logout {
          background: #EF4444;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
        }

        .main-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          height: 100%;
          overflow: hidden;
        }

        .top-header {
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 1.5rem;
        }
        
        .header-title h1 {
          font-size: 1.25rem;
          color: #1E293B;
          font-weight: 700;
        }

        .header-actions {
          display: flex;
          gap: 1.5rem;
          align-items: center;
        }

        .icon-btn {
          background: none;
          border: none;
          position: relative;
          cursor: pointer;
          color: #F59E0B;
        }

        .content-area {
          flex: 1;
          overflow-y: auto;
          position: relative;
        }

        /* Mobile Adjustments */
        @media (max-width: 768px) {
          .layout-container {
            padding: 0;
            gap: 0;
          }
          .sidebar {
            display: none;
          }
          .top-header {
            border-radius: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Layout;
