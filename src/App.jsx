import React, { useState } from 'react'
import Layout from './components/Layout'
import MapComponent from './components/MapComponent'
import TrackingOverlay from './components/TrackingOverlay'
import AnalyticsDashboard from './components/AnalyticsDashboard'
import DriverDashboard from './components/DriverDashboard'
import AdminMonitor from './components/AdminMonitor'
import ParentDashboard from './components/ParentDashboard'
import Login from './components/Login'
import './index.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null); // 'school', 'parent'
  const [activeTab, setActiveTab] = useState('tracking');

  const [students, setStudents] = useState([
    { id: 1, name: 'Aarav Sharma', stop: 'Shanti Nagar', status: 'pending' },
    { id: 2, name: 'Vivaan Patel', stop: 'Kanakia Road', status: 'pending' },
    { id: 3, name: 'Diya Verma', stop: 'Pleasant Park', status: 'pending' },
    { id: 4, name: 'Ananya Gupta', stop: 'Maxus Mall', status: 'pending' },
    { id: 5, name: 'Rohan Singh', stop: 'Beverly Park', status: 'pending' },
  ]);

  const handleLogin = (role) => {
    setIsAuthenticated(true);
    setUserRole(role);
    // Set default tab based on role
    if (role === 'school') setActiveTab('driver');
    else if (role === 'parent') setActiveTab('parent');
    else setActiveTab('tracking');
  };

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
        return <DriverDashboard students={students} onTogglePickup={toggleStudentStatus} />;
      case 'monitor':
        return <AdminMonitor students={students} />;
      case 'parent':
        return <ParentDashboard student={students[0]} />;
      default:
        return null;
    }
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab} userRole={userRole}>
      {renderContent()}
    </Layout>
  )
}

export default App
