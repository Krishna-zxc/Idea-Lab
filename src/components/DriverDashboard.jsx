import React, { useState } from 'react'
import { MapPin, CheckCircle, Circle, Bus, Users, ClipboardList, TrendingUp } from 'lucide-react'

const ROUTES = { SB1: 'Route A - Morning', SB2: 'Route B - Morning', SB3: 'Route C - Morning' }

const DriverDashboard = ({ students, onTogglePickup, buses = [] }) => {
  const [selectedBus, setSelectedBus] = useState('all')

  const getBusStudents = (busName) =>
    students.filter(s => s.bus === busName)

  const visibleBuses = selectedBus === 'all' ? buses : buses.filter(b => b.name === selectedBus)

  const totalPending = selectedBus === 'all'
    ? students.filter(s => s.status === 'pending').length
    : getBusStudents(selectedBus).filter(s => s.status === 'pending').length

  const totalPicked = selectedBus === 'all'
    ? students.filter(s => s.status === 'picked').length
    : getBusStudents(selectedBus).filter(s => s.status === 'picked').length

  const summaryLabel = selectedBus === 'all'
    ? 'All Assigned Fleet'
    : `Bus ${selectedBus}`

  const getSubtitle = () => {
    if (selectedBus === 'all') return 'Monitoring student boarding across all routes'
    const bus = buses.find(b => b.name === selectedBus)
    return bus?.route || ROUTES[selectedBus] || 'Assigned Route'
  }

  return (
    <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>

      {/* Bus Selection Control */}
      <div className="card-premium animate-slide-up" style={{ padding: '1.5rem 2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ padding: '0.6rem', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.1)', color: 'var(--accent)' }}>
            <Bus size={20} />
          </div>
          <h3 style={{ fontSize: '1.1rem', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Route Selection</h3>
        </div>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <BusTab
            label="Unified View"
            active={selectedBus === 'all'}
            onClick={() => setSelectedBus('all')}
          />
          {buses.map(bus => (
            <BusTab
              key={bus.id}
              label={bus.name}
              active={selectedBus === bus.name}
              onClick={() => setSelectedBus(bus.name)}
            />
          ))}
        </div>
      </div>

      {/* Analytics Summary */}
      <div className="animate-slide-up" style={{
        background: 'linear-gradient(135deg, var(--primary) 0%, #1E293B 100%)',
        borderRadius: '24px',
        padding: '2.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: 'white',
        boxShadow: '0 20px 40px -10px rgba(15, 23, 42, 0.3)',
        animationDelay: '0.1s'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', opacity: 0.8 }}>
            <TrendingUp size={18} />
            <span style={{ fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Real-time Statistics</span>
          </div>
          <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.25rem' }}>{summaryLabel}</h2>
          <p style={{ opacity: 0.6, fontSize: '1rem', fontWeight: '500' }}>{getSubtitle()}</p>
        </div>
        
        <div style={{ display: 'flex', gap: '3rem' }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--accent)', lineHeight: 1 }}>{totalPending}</p>
            <p style={{ fontSize: '0.85rem', fontWeight: '700', opacity: 0.6, marginTop: '4px' }}>SCHEDULED</p>
          </div>
          <div style={{ width: '1px', background: 'rgba(255,255,255,0.1)' }} />
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--success)', lineHeight: 1 }}>{totalPicked}</p>
            <p style={{ fontSize: '0.85rem', fontWeight: '700', opacity: 0.6, marginTop: '4px' }}>BOARDED</p>
          </div>
        </div>
      </div>

      {/* Student Manifest Sections */}
      <div className="grid-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
        {visibleBuses.map((bus, idx) => {
          const busStudents = getBusStudents(bus.name)
          return (
            <div key={bus.id} className="card-premium" style={{ 
              borderTop: '6px solid var(--accent)',
              display: 'flex',
              flexDirection: 'column',
              animationDelay: `${0.3 + (idx * 0.1)}s`
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ padding: '0.5rem', background: '#F8FAFC', borderRadius: '8px' }}>
                    <ClipboardList size={20} color="var(--primary)" />
                  </div>
                  <h3 style={{ fontWeight: '800', fontSize: '1.2rem' }}>
                    {bus.name} Manifest
                  </h3>
                </div>
                <span className="badge badge-info" style={{ fontSize: '0.7rem' }}>
                  {busStudents.length} Students
                </span>
              </div>

              {busStudents.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem 0', opacity: 0.5 }}>
                  <Users size={40} strokeWidth={1} style={{ marginBottom: '1rem' }} />
                  <p>No students assigned</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {busStudents.map(student => {
                    const isPicked = student.status === 'picked'
                    return (
                      <div
                        key={student.id}
                        onClick={() => onTogglePickup(student.id)}
                        className="animate-scale-in"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1.25rem',
                          padding: '1rem 1.25rem',
                          borderRadius: '16px',
                          background: isPicked ? 'rgba(16, 185, 129, 0.05)' : '#F8FAFC',
                          cursor: 'pointer',
                          border: `2px solid ${isPicked ? 'rgba(16, 185, 129, 0.2)' : 'transparent'}`,
                          transition: 'var(--transition)'
                        }}
                        onMouseEnter={(e) => !isPicked && (e.currentTarget.style.background = '#F1F5F9')}
                        onMouseLeave={(e) => !isPicked && (e.currentTarget.style.background = '#F8FAFC')}
                      >
                        <div style={{
                          width: '44px', height: '44px', borderRadius: '14px',
                          background: isPicked ? 'var(--success)' : '#E2E8F0',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white',
                          transition: 'var(--transition)',
                          flexShrink: 0,
                          boxShadow: isPicked ? '0 8px 16px -4px rgba(16, 185, 129, 0.4)' : 'none'
                        }}>
                          {isPicked ? <CheckCircle size={24} /> : <Circle size={24} color="#94A3B8" />}
                        </div>
                        <div style={{ flex: 1 }}>
                          <p style={{
                            fontWeight: '700', margin: 0,
                            color: isPicked ? 'var(--text-muted)' : 'var(--primary)',
                            fontSize: '1.05rem',
                            transition: 'var(--transition)'
                          }}>{student.name}</p>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                            <MapPin size={14} />
                            <span>{student.stop}</span>
                          </div>
                        </div>
                        {isPicked && (
                          <span className="badge badge-success" style={{ fontSize: '0.65rem' }}>ON BOARD</span>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

const BusTab = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    style={{
      padding: '0.8rem 1.5rem',
      borderRadius: '12px',
      border: active ? 'none' : '1px solid #E2E8F0',
      background: active ? 'var(--primary)' : 'white',
      color: active ? 'white' : 'var(--text-muted)',
      fontWeight: '700',
      cursor: 'pointer',
      fontSize: '0.95rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      transition: 'var(--transition)',
      fontFamily: 'Inter, sans-serif'
    }}
    onMouseEnter={(e) => !active && (e.target.style.borderColor = 'var(--primary)')}
    onMouseLeave={(e) => !active && (e.target.style.borderColor = '#E2E8F0')}
  >
    {label !== 'Unified View' && <Bus size={16} />}
    {label}
  </button>
)

export default DriverDashboard
