import React, { useState, useEffect } from 'react'
import Layout from './components/Layout'
import MapComponent from './components/MapComponent'
import TrackingOverlay from './components/TrackingOverlay'
import AnalyticsDashboard from './components/AnalyticsDashboard'
import DriverDashboard from './components/DriverDashboard'
import AdminMonitor from './components/AdminMonitor'
import ParentDashboard from './components/ParentDashboard'
import StudentsManagement from './components/StudentsManagement'
import BusesManagement from './components/BusesManagement'
import Login from './components/Login'
import './index.css'

function App() {
  const [appState, setAppState] = useState({
    isAuthenticated: false,
    userRole: null,
    activeTab: 'tracking'
  });

  const { isAuthenticated, userRole, activeTab } = appState;

  const setActiveTab = (val) => {
    setAppState(prev => ({ ...prev, activeTab: val }))
  }

  const [students, setStudents] = useState(() => {
    try {
      const saved = localStorage.getItem('global_students');
      const parsed = saved ? JSON.parse(saved) : null;
      return Array.isArray(parsed) ? parsed : [
        { id: 1, name: 'Aarav Sharma', stop: 'Shanti Nagar', status: 'pending' },
        { id: 2, name: 'Ishaan Joshi', stop: 'Kanakia Road', status: 'pending' },
        { id: 3, name: 'Mira Reddy', stop: 'Pleasant Park', status: 'pending' },
        { id: 4, name: 'Advait Nair', stop: 'Maxus Mall', status: 'pending' },
        { id: 5, name: 'Tara Iyer', stop: 'Beverly Park', status: 'pending' },
        { id: 6, name: 'Vihaan Rao', stop: 'Green Valley', status: 'pending' },
        { id: 7, name: 'Zara Khan', stop: 'Royal Palms', status: 'pending' },
        { id: 8, name: 'Reyansh Shah', stop: 'Silver Oaks', status: 'pending' },
        { id: 9, name: 'Anvi Chopra', stop: 'Diamond City', status: 'pending' },
        { id: 10, name: 'Ayaan Bhatia', stop: 'Emerald Heights', status: 'pending' },
        { id: 11, name: 'Myra Agarwal', stop: 'Ruby Enclave', status: 'pending' },
        { id: 12, name: 'Vivaan Patel', stop: 'Sapphire Gardens', status: 'pending' },
      ];
    } catch (e) {
      console.error("Error loading students:", e);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('global_students', JSON.stringify(students || []));
  }, [students]);

  // Sync state across tabs
  useEffect(() => {
    const handleStorageChange = (e) => {
      try {
        if (e.key === 'global_students' && e.newValue) {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed)) setStudents(parsed);
        }
        if (e.key === 'global_buses' && e.newValue) {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed)) setBuses(parsed);
        }
      } catch (err) {
        console.error("Storage sync error:", err);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const [buses, setBuses] = useState(() => {
    try {
      const saved = localStorage.getItem('global_buses');
      const parsed = saved ? JSON.parse(saved) : null;
      return Array.isArray(parsed) ? parsed : [
        { id: 1, name: 'SB1', driver: 'Rajesh Kumar', contact: '+91 98765 43210', status: 'Active' },
        { id: 2, name: 'SB2', driver: 'Suresh Patil', contact: '+91 98765 00000', status: 'Active' },
      ];
    } catch (e) {
      console.error("Error loading buses:", e);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('global_buses', JSON.stringify(buses || []));
  }, [buses]);


  const handleLogin = (role) => {
    let defaultTab = 'tracking'
    if (role === 'admin') defaultTab = 'monitor'
    else if (role === 'driver') defaultTab = 'driver'
    else if (role === 'parent') defaultTab = 'parent'

    setAppState({
      isAuthenticated: true,
      userRole: role,
      activeTab: defaultTab
    })
  }

  const handleLogout = () => {
    setAppState({
      isAuthenticated: false,
      userRole: null,
      activeTab: 'tracking'
    })
  }

  const toggleStudentStatus = (id) => {
    setStudents(prev => prev.map(s =>
      s.id === id
        ? { ...s, status: s.status === 'pending' ? 'picked' : 'pending' }
        : s
    ));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'tracking':
        return (
          <div style={{ height: '100%', width: '100%', position: 'relative' }}>
            <MapComponent />
            <TrackingOverlay />
          </div>
        );
      case 'dashboard':
        return <AnalyticsDashboard students={students} />;
      case 'driver':
        return <DriverDashboard students={students} onTogglePickup={toggleStudentStatus} buses={buses} />;
      case 'monitor':
        return <AdminMonitor students={students} setStudents={setStudents} buses={buses} setBuses={setBuses} />;
      case 'parent':
        return <ParentDashboard students={students} buses={buses} />;
      case 'students':
        return <StudentsManagement students={students} setStudents={setStudents} buses={buses} />;
      case 'buses':
        return <BusesManagement buses={buses} setBuses={setBuses} />;
      default:
        return null;
    }
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }
  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab} userRole={userRole} onLogout={handleLogout}>
      {renderContent()}
    </Layout>
  )
}

const RoleCard = ({ title, icon, subtitle, onClick }) => (
  <div 
    onClick={onClick}
    className="glass-panel" 
    style={{ 
      width: '280px', 
      padding: '2.5rem', 
      background: 'rgba(255, 255, 255, 0.05)', 
      border: '1px solid rgba(255, 255, 255, 0.1)', 
      color: 'white', 
      textAlign: 'center', 
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
      e.currentTarget.style.transform = 'translateY(-10px)';
      e.currentTarget.style.borderColor = 'var(--accent-color)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
    }}
  >
    <div style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>{icon}</div>
    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{title}</h3>
    <p style={{ opacity: 0.6, fontSize: '0.9rem' }}>{subtitle}</p>
  </div>
);

export default App
