import React from 'react';

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
        <div className="logo-area animate-fade-in">
          <span style={{ fontSize: '32px' }}>🚍</span>
          <h2>Smart<span style={{ color: 'var(--accent)' }}>Bus</span></h2>
        </div>

        <nav style={{ flex: 1 }}>
          {navItems.map((item, index) => (
            <button
              key={item.id}
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <span style={{ fontSize: '20px' }}>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <button 
          onClick={onLogout} 
          className="btn-logout"
        >
          <span>🚪</span>
          <span>Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="top-header animate-slide-up">
          <div className="header-title">
            <h1>{
              activeTab === 'parent' ? 'Parent Portal' : 
              activeTab === 'tracking' ? 'Live Bus Tracking' : 
              activeTab === 'dashboard' ? 'Analytics Dashboard' :
              activeTab === 'monitor' ? 'Fleet Monitor' :
              'School Transport'
            }</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
              Welcome back, {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
            </p>
          </div>
          
          <div className="header-actions">
            <div className="user-badge">
              <div style={{ 
                width: '32px', 
                height: '32px', 
                borderRadius: '50%', 
                background: 'var(--primary)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '0.8rem'
              }}>
                {userRole.charAt(0).toUpperCase()}
              </div>
              <span style={{ fontWeight: '600', fontSize: '0.9rem', color: 'var(--primary)' }}>
                {userRole === 'admin' ? 'Administrator' : userRole === 'driver' ? 'Driver' : 'Parent'}
              </span>
            </div>
          </div>
        </header>

        <div className="content-area animate-fade-in">
          {children}
        </div>
      </main>

      <style>{`
        .layout-container {
          display: flex;
          height: 100vh;
          width: 100vw;
          padding: 1rem;
          gap: 1rem;
          background: var(--bg-main);
          overflow: hidden;
        }

        .sidebar {
          width: 280px;
          display: flex;
          flex-direction: column;
          padding: 2.5rem 1.5rem;
          height: 100%;
          background: var(--bg-sidebar);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-premium);
          border: 1px solid rgba(0,0,0,0.02);
        }

        .logo-area {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 3.5rem;
          padding-left: 0.5rem;
        }

        .logo-area h2 {
          font-size: 1.75rem;
          color: var(--primary);
          margin: 0;
          font-family: 'Outfit', sans-serif;
          letter-spacing: -0.03em;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          width: 100%;
          padding: 1.15rem 1.25rem;
          border: none;
          background: transparent;
          color: var(--text-muted);
          font-weight: 600;
          font-family: 'Inter', sans-serif;
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: var(--transition);
          margin-bottom: 0.5rem;
          text-align: left;
          animation: slideInRight 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) both;
        }

        .nav-item:hover {
          background: #F8FAFC;
          color: var(--primary);
          transform: translateX(6px);
        }

        .nav-item.active {
          background: var(--primary);
          color: white;
          box-shadow: 0 10px 20px -5px rgba(15, 23, 42, 0.25);
        }

        .nav-item.active span:first-child {
          transform: scale(1.2);
        }
        
        .btn-logout {
          margin-top: auto;
          background: #FFF1F2;
          color: #E11D48;
          border: 1px solid #FFE4E6;
          padding: 1rem;
          border-radius: var(--radius-md);
          cursor: pointer;
          font-weight: 700;
          transition: var(--transition);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          font-family: 'Inter', sans-serif;
        }

        .btn-logout:hover {
          background: #E11D48;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 10px 15px -3px rgba(225, 29, 72, 0.2);
        }

        .main-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          height: 100%;
          overflow: hidden;
        }

        .top-header {
          height: 90px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 2.5rem;
          background: white;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-premium);
          border: 1px solid rgba(0,0,0,0.02);
        }
        
        .header-title h1 {
          font-size: 1.75rem;
          color: var(--primary);
          margin: 0;
          font-family: 'Outfit', sans-serif;
        }

        .header-actions {
          display: flex;
          gap: 2rem;
          align-items: center;
        }

        .user-badge {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.6rem 1.25rem;
          background: #F8FAFC;
          border-radius: 100px;
          border: 1px solid #E2E8F0;
          transition: var(--transition);
        }
        
        .user-badge:hover {
          background: white;
          border-color: var(--primary);
          box-shadow: var(--shadow-sm);
        }

        .content-area {
          flex: 1;
          overflow-y: auto;
          position: relative;
          padding: 0.5rem;
        }

        /* Mobile Adjustments */
        @media (max-width: 768px) {
          .layout-container {
            padding: 0.5rem;
            flex-direction: column;
            gap: 0.5rem;
          }
          .sidebar {
            display: none;
          }
          .top-header {
            border-radius: var(--radius-md);
            padding: 0 1.25rem;
            height: 80px;
          }
          .header-title h1 {
            font-size: 1.25rem;
          }
          .header-title p {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default Layout;
