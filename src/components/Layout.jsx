import React, { useState } from 'react';
import { LayoutDashboard, Map, Bus, Settings, Bell, User } from 'lucide-react';

const Layout = ({ children, activeTab, setActiveTab, userRole }) => {
    const allNavItems = [
        { id: 'dashboard', icon: LayoutDashboard, label: 'Analytics', roles: ['school', 'parent'] },
        { id: 'monitor', icon: User, label: 'Admin Monitor', roles: ['school'] },
        { id: 'parent', icon: User, label: 'Parent Portal', roles: ['parent'] },
        { id: 'driver', icon: User, label: 'Driver Mode', roles: ['school'] },
        { id: 'tracking', icon: Map, label: 'Live Tracking', roles: ['school', 'parent'] },
    ];

    const navItems = allNavItems.filter(item => item.roles.includes(userRole));

    return (
        <div className="layout-container">
            {/* Sidebar */}
            <aside className="sidebar glass-panel">
                <div className="logo-area">
                    <Bus size={32} color="var(--accent-color)" />
                    <h2>Smart<span style={{ color: 'var(--accent-color)' }}>Bus</span></h2>
                </div>

                <nav>
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(item.id)}
                        >
                            <item.icon size={20} />
                            <span>{item.label}</span>
                        </button>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="main-content">
                <header className="top-header glass-panel">
                    <div className="header-title">
                        <h1>School Transport Overview</h1>
                    </div>
                    <div className="header-actions">
                        <button className="icon-btn">
                            <Bell size={20} />
                            <span className="badge">3</span>
                        </button>
                        <div className="user-profile">
                            <User size={20} />
                            <span>Admin</span>
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
          padding: var(--radius-md);
          gap: var(--radius-md);
          background: linear-gradient(135deg, #e2e8f0 0%, #f1f5f9 100%);
        }

        .sidebar {
          width: 260px;
          display: flex;
          flex-direction: column;
          padding: 1.5rem;
          height: 100%;
        }

        .logo-area {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 3rem;
          font-weight: 800;
          font-size: 1.25rem;
          color: var(--primary-color);
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          width: 100%;
          padding: 0.85rem 1rem;
          border: none;
          background: transparent;
          color: var(--text-secondary);
          font-weight: 500;
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all 0.2s ease;
          margin-bottom: 0.5rem;
        }

        .nav-item:hover {
          background: rgba(15, 23, 42, 0.05);
          color: var(--primary-color);
        }

        .nav-item.active {
          background: var(--primary-color);
          color: white;
          box-shadow: 0 4px 12px rgba(15, 23, 42, 0.2);
        }

        .main-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: var(--radius-md);
          height: 100%;
          overflow: hidden;
        }

        .top-header {
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 2rem;
        }
        
        .header-title h1 {
          font-size: 1.25rem;
          color: var(--primary-color);
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
          color: var(--text-secondary);
        }

        .badge {
          position: absolute;
          top: -5px;
          right: -5px;
          background: var(--danger-color);
          color: white;
          font-size: 0.7rem;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .content-area {
          flex: 1;
          overflow-y: auto;
          border-radius: var(--radius-lg);
          position: relative;
        }
      `}</style>
        </div>
    );
};

export default Layout;
