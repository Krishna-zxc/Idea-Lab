import React, { useState } from 'react'
import { MapPin, CheckCircle, Circle } from 'lucide-react'

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
    ? 'All Buses'
    : selectedBus

  const getSubtitle = () => {
    if (selectedBus === 'all') return 'Viewing all buses'
    const bus = buses.find(b => b.name === selectedBus)
    return bus?.route || ROUTES[selectedBus] || 'Route'
  }

  const summarySubtitle = getSubtitle()

  return (
    <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

      {/* Bus Selector Tabs */}
      <div className="glass-panel" style={{ background: 'white', padding: '1rem 1.5rem' }}>
        <p style={{ fontSize: '0.8rem', color: '#64748B', marginBottom: '0.75rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Select Your Bus
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <BusTab
            label="All Buses"
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

      {/* Summary Card */}
      <div style={{
        background: '#0F172A',
        borderRadius: '14px',
        padding: '1.5rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: 'white'
      }}>
        <div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '0.25rem' }}>{summaryLabel}</h3>
          <p style={{ opacity: 0.6, fontSize: '0.9rem' }}>{summarySubtitle}</p>
        </div>
        <div style={{ display: 'flex', gap: '2.5rem' }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '1.8rem', fontWeight: '800', color: '#F59E0B' }}>{totalPending}</p>
            <p style={{ fontSize: '0.75rem', opacity: 0.6 }}>Pending</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '1.8rem', fontWeight: '800', color: '#10B981' }}>{totalPicked}</p>
            <p style={{ fontSize: '0.75rem', opacity: 0.6 }}>Picked</p>
          </div>
        </div>
      </div>

      {/* Bus Sections */}
      {visibleBuses.map(bus => {
        const busStudents = getBusStudents(bus.name)
        return (
          <div key={bus.id} className="glass-panel" style={{
            background: 'white',
            borderLeft: '4px solid #F59E0B',
            padding: '1.5rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <span style={{ fontSize: '1.3rem' }}>🚌</span>
              <h3 style={{ fontWeight: '700', color: '#1E293B' }}>
                {bus.name} - {bus.route || ROUTES[bus.name] || 'Route'}
              </h3>
            </div>

            {busStudents.length === 0 ? (
              <p style={{ color: '#94A3B8', textAlign: 'center', padding: '1rem 0', fontSize: '0.9rem' }}>
                No students assigned to {bus.name}
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {busStudents.map(student => {
                  const isPicked = student.status === 'picked'
                  return (
                    <div
                      key={student.id}
                      onClick={() => onTogglePickup(student.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        padding: '0.875rem 1rem',
                        borderRadius: '10px',
                        background: isPicked ? '#F0FDF4' : '#F8FAFC',
                        cursor: 'pointer',
                        border: `1px solid ${isPicked ? '#86EFAC' : '#E2E8F0'}`,
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div style={{
                        width: '36px', height: '36px', borderRadius: '50%',
                        background: isPicked ? '#10B981' : '#E2E8F0',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white',
                        flexShrink: 0
                      }}>
                        {isPicked ? <CheckCircle size={20} /> : <Circle size={20} color="#94A3B8" />}
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{
                          fontWeight: '700', margin: 0,
                          color: isPicked ? '#64748B' : '#1E293B',
                          textDecoration: isPicked ? 'line-through' : 'none'
                        }}>{student.name}</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#94A3B8', fontSize: '0.82rem', marginTop: '0.2rem' }}>
                          <MapPin size={12} />
                          <span>{student.stop}</span>
                        </div>
                      </div>
                      {isPicked && (
                        <span style={{
                          fontSize: '0.7rem', fontWeight: '700', color: '#10B981',
                          background: '#DCFCE7', padding: '0.2rem 0.6rem', borderRadius: '20px'
                        }}>PICKED UP</span>
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
  )
}

const BusTab = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    style={{
      padding: '0.4rem 1rem',
      borderRadius: '20px',
      border: active ? '2px solid #F59E0B' : '1px solid #E2E8F0',
      background: active ? '#FEF3C7' : 'white',
      color: active ? '#D97706' : '#64748B',
      fontWeight: active ? '700' : '500',
      cursor: 'pointer',
      fontSize: '0.9rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.4rem',
      transition: 'all 0.2s ease'
    }}
  >
    {label !== 'All Buses' && <span style={{ fontSize: '0.9rem' }}>🚌</span>}
    {label}
  </button>
)

export default DriverDashboard
