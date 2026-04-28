import React, { useState } from 'react'
import { User, Edit2, Trash2, Plus, RefreshCw, Clock, CheckCircle } from 'lucide-react'

const ROUTES = {
  SB1: 'Route A - Morning',
  SB2: 'Route B - Morning',
  SB3: 'Route C - Morning',
}

const AdminMonitor = ({ students, setStudents, buses, setBuses }) => {
  const [activeTab, setActiveTab] = useState('students')
  const [showStudentModal, setShowStudentModal] = useState(false)
  const [showBusModal, setShowBusModal] = useState(false)
  const [editingStudent, setEditingStudent] = useState(null)
  const [editingBus, setEditingBus] = useState(null)
  const [studentForm, setStudentForm] = useState({ name: '', stop: '', bus: '' })
  const [busForm, setBusForm] = useState({ name: '', route: '', driver: '', contact: '' })

  const pickedCount = students.filter(s => s.status === 'picked').length
  const pendingCount = students.filter(s => s.status === 'pending').length
  const progress = students.length ? Math.round((pickedCount / students.length) * 100) : 0

  // --- Student CRUD ---
  const openAddStudent = () => {
    setEditingStudent(null)
    setStudentForm({ name: '', stop: '', bus: '' })
    setShowStudentModal(true)
  }
  const openEditStudent = (s) => {
    setEditingStudent(s)
    setStudentForm({ name: s.name, stop: s.stop, bus: s.bus || '' })
    setShowStudentModal(true)
  }
  const saveStudent = (e) => {
    e.preventDefault()
    if (editingStudent) {
      setStudents(prev => prev.map(s => s.id === editingStudent.id ? { ...s, ...studentForm } : s))
    } else {
      setStudents(prev => [...prev, { id: Date.now(), status: 'pending', ...studentForm }])
    }
    setShowStudentModal(false)
  }
  const deleteStudent = (id) => {
    if (window.confirm('Remove this student?')) setStudents(prev => prev.filter(s => s.id !== id))
  }
  const assignBus = (studentId, busName) => {
    setStudents(prev => prev.map(s => s.id === studentId ? { ...s, bus: busName } : s))
  }

  // --- Bus CRUD ---
  const openAddBus = () => {
    setEditingBus(null)
    setBusForm({ name: '', route: '', driver: '', contact: '' })
    setShowBusModal(true)
  }
  const openEditBus = (b) => {
    setEditingBus(b)
    setBusForm({ name: b.name, route: b.route || ROUTES[b.name] || '', driver: b.driver, contact: b.contact })
    setShowBusModal(true)
  }
  const saveBus = (e) => {
    e.preventDefault()
    if (editingBus) {
      setBuses(prev => prev.map(b => b.id === editingBus.id ? { ...b, ...busForm } : b))
    } else {
      setBuses(prev => [...prev, { id: Date.now(), status: 'Active', ...busForm }])
    }
    setShowBusModal(false)
  }
  const deleteBus = (id) => {
    if (window.confirm('Remove this bus?')) setBuses(prev => prev.filter(b => b.id !== id))
  }

  return (
    <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

      {/* Stats Header */}
      <div className="glass-panel" style={{ background: 'white', padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#1E293B', marginBottom: '0.2rem' }}>Admin Dashboard</h2>
          <p style={{ color: '#64748B', fontSize: '0.9rem' }}>Manage students and buses</p>
        </div>
        <div style={{ display: 'flex', gap: '2.5rem', textAlign: 'center' }}>
          <div>
            <p style={{ fontSize: '1.8rem', fontWeight: '800', color: '#10B981' }}>{pickedCount}</p>
            <p style={{ fontSize: '0.7rem', color: '#64748B', textTransform: 'uppercase', fontWeight: '600' }}>Picked Up</p>
          </div>
          <div>
            <p style={{ fontSize: '1.8rem', fontWeight: '800', color: '#F59E0B' }}>{pendingCount}</p>
            <p style={{ fontSize: '0.7rem', color: '#64748B', textTransform: 'uppercase', fontWeight: '600' }}>Pending</p>
          </div>
          <div>
            <p style={{ fontSize: '1.8rem', fontWeight: '800', color: '#3B82F6' }}>{buses.length}</p>
            <p style={{ fontSize: '0.7rem', color: '#64748B', textTransform: 'uppercase', fontWeight: '600' }}>Buses</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.25rem', borderBottom: '2px solid #E2E8F0', paddingBottom: '0' }}>
        {['students', 'buses'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{
            padding: '0.6rem 1.5rem',
            border: 'none',
            background: 'none',
            fontWeight: '700',
            fontSize: '0.95rem',
            color: activeTab === tab ? '#1E293B' : '#94A3B8',
            borderBottom: activeTab === tab ? '2px solid #1E293B' : '2px solid transparent',
            marginBottom: '-2px',
            cursor: 'pointer',
            textTransform: 'capitalize',
            transition: 'all 0.2s ease'
          }}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Students Tab */}
      {activeTab === 'students' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Action Bar */}
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <button onClick={openAddStudent} style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              background: '#0F172A', color: 'white', border: 'none',
              padding: '0.5rem 1.1rem', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', fontSize: '0.9rem'
            }}>
              <Plus size={16} /> Add Student
            </button>
            <button style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              background: '#DCFCE7', color: '#16A34A', border: '1px solid #86EFAC',
              padding: '0.5rem 1.1rem', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', fontSize: '0.9rem'
            }}>
              <RefreshCw size={14} /> Sync to Firebase
            </button>
          </div>

          {/* Progress */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: '600', color: '#64748B' }}>Progress</span>
            <span style={{ fontSize: '0.9rem', fontWeight: '600', color: '#64748B' }}>{progress}% Complete</span>
          </div>
          <div style={{ width: '100%', height: '6px', background: '#E2E8F0', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ width: `${progress}%`, height: '100%', background: '#10B981', transition: 'width 0.5s ease' }} />
          </div>

          {/* Table */}
          <div className="glass-panel" style={{ background: 'white', overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                    {['ID', 'Student Name', 'Stop Location', 'Assigned Bus', 'Status', 'Actions'].map(h => (
                      <th key={h} style={{ padding: '0.875rem 1.25rem', fontSize: '0.82rem', fontWeight: '700', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.03em' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {students.map(student => (
                    <tr key={student.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                      <td style={{ padding: '0.875rem 1.25rem', color: '#64748B', fontSize: '0.85rem' }}>#{student.id}</td>
                      <td style={{ padding: '0.875rem 1.25rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                          <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <User size={14} color="#94A3B8" />
                          </div>
                          <span style={{ fontWeight: '600', color: '#1E293B' }}>{student.name}</span>
                        </div>
                      </td>
                      <td style={{ padding: '0.875rem 1.25rem', color: '#3B82F6', fontWeight: '500' }}>{student.stop}</td>
                      <td style={{ padding: '0.875rem 1.25rem' }}>
                        <select
                          value={student.bus || ''}
                          onChange={e => assignBus(student.id, e.target.value)}
                          style={{ border: '1px solid #E2E8F0', borderRadius: '6px', padding: '0.3rem 0.6rem', color: student.bus ? '#1E293B' : '#94A3B8', fontSize: '0.85rem', background: 'white', cursor: 'pointer' }}
                        >
                          <option value="">Not Assigned</option>
                          {buses.map(b => <option key={b.id} value={b.name}>{b.name}</option>)}
                        </select>
                      </td>
                      <td style={{ padding: '0.875rem 1.25rem' }}>
                        <span style={{
                          display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                          padding: '0.2rem 0.7rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '700',
                          background: student.status === 'picked' ? '#DCFCE7' : '#FEF3C7',
                          color: student.status === 'picked' ? '#16A34A' : '#D97706'
                        }}>
                          {student.status === 'picked' ? <CheckCircle size={12} /> : <Clock size={12} />}
                          {student.status === 'picked' ? 'Picked Up' : 'Pending'}
                        </span>
                      </td>
                      <td style={{ padding: '0.875rem 1.25rem' }}>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button onClick={() => openEditStudent(student)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B', padding: '0.25rem' }}>
                            <Edit2 size={16} />
                          </button>
                          <button onClick={() => deleteStudent(student.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#EF4444', padding: '0.25rem' }}>
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Buses Tab */}
      {activeTab === 'buses' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Action Bar */}
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <button onClick={openAddBus} style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              background: '#0F172A', color: 'white', border: 'none',
              padding: '0.5rem 1.1rem', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', fontSize: '0.9rem'
            }}>
              <Plus size={16} /> Add Bus
            </button>
            <button style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              background: '#DCFCE7', color: '#16A34A', border: '1px solid #86EFAC',
              padding: '0.5rem 1.1rem', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', fontSize: '0.9rem'
            }}>
              <RefreshCw size={14} /> Sync to Firebase
            </button>
          </div>

          {/* Table */}
          <div className="glass-panel" style={{ background: 'white', overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                    {['Bus', 'Route', 'Driver', 'Contact', 'Actions'].map(h => (
                      <th key={h} style={{ padding: '0.875rem 1.25rem', fontSize: '0.82rem', fontWeight: '700', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.03em' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {buses.map(bus => (
                    <tr key={bus.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                      <td style={{ padding: '0.875rem 1.25rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                          <span style={{ fontSize: '1.1rem' }}>🚌</span>
                          <span style={{ fontWeight: '700', color: '#3B82F6' }}>{bus.name}</span>
                        </div>
                      </td>
                      <td style={{ padding: '0.875rem 1.25rem', color: '#1E293B' }}>{bus.route || ROUTES[bus.name] || 'N/A'}</td>
                      <td style={{ padding: '0.875rem 1.25rem', color: '#1E293B' }}>{bus.driver}</td>
                      <td style={{ padding: '0.875rem 1.25rem', color: '#1E293B' }}>{bus.contact}</td>
                      <td style={{ padding: '0.875rem 1.25rem' }}>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button onClick={() => openEditBus(bus)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B', padding: '0.25rem' }}>
                            <Edit2 size={16} />
                          </button>
                          <button onClick={() => deleteBus(bus.id)} style={{ background: '#FEE2E2', border: 'none', cursor: 'pointer', color: '#EF4444', padding: '0.35rem', borderRadius: '6px' }}>
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Student Modal */}
      {showStudentModal && (
        <Modal title={editingStudent ? 'Edit Student' : 'Add Student'} onClose={() => setShowStudentModal(false)}>
          <form onSubmit={saveStudent} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <FormField label="Student Name">
              <input required value={studentForm.name} onChange={e => setStudentForm({ ...studentForm, name: e.target.value })} placeholder="e.g. Aarav Sharma" />
            </FormField>
            <FormField label="Stop Location">
              <input required value={studentForm.stop} onChange={e => setStudentForm({ ...studentForm, stop: e.target.value })} placeholder="e.g. Shanti Nagar" />
            </FormField>
            <FormField label="Assign Bus">
              <select value={studentForm.bus} onChange={e => setStudentForm({ ...studentForm, bus: e.target.value })}>
                <option value="">Not Assigned</option>
                {buses.map(b => <option key={b.id} value={b.name}>{b.name}</option>)}
              </select>
            </FormField>
            <button type="submit" style={{ background: '#0F172A', color: 'white', border: 'none', padding: '0.75rem', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', marginTop: '0.5rem' }}>
              {editingStudent ? 'Save Changes' : 'Add Student'}
            </button>
          </form>
        </Modal>
      )}

      {/* Bus Modal */}
      {showBusModal && (
        <Modal title={editingBus ? 'Edit Bus' : 'Add Bus'} onClose={() => setShowBusModal(false)}>
          <form onSubmit={saveBus} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <FormField label="Bus Name">
              <input required value={busForm.name} onChange={e => setBusForm({ ...busForm, name: e.target.value })} placeholder="e.g. SB3" />
            </FormField>
            <FormField label="Route">
              <input required value={busForm.route} onChange={e => setBusForm({ ...busForm, route: e.target.value })} placeholder="e.g. Route C - Morning" />
            </FormField>
            <FormField label="Driver Name">
              <input required value={busForm.driver} onChange={e => setBusForm({ ...busForm, driver: e.target.value })} placeholder="e.g. Amit Singh" />
            </FormField>
            <FormField label="Contact">
              <input required value={busForm.contact} onChange={e => setBusForm({ ...busForm, contact: e.target.value })} placeholder="e.g. +91 98765 43212" />
            </FormField>
            <button type="submit" style={{ background: '#0F172A', color: 'white', border: 'none', padding: '0.75rem', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', marginTop: '0.5rem' }}>
              {editingBus ? 'Save Changes' : 'Add Bus'}
            </button>
          </form>
        </Modal>
      )}
    </div>
  )
}

const Modal = ({ title, onClose, children }) => (
  <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, backdropFilter: 'blur(4px)' }}>
    <div className="glass-panel" style={{ background: 'white', width: '100%', maxWidth: '440px', padding: '2rem', borderRadius: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h3 style={{ fontWeight: '800', fontSize: '1.1rem', color: '#1E293B' }}>{title}</h3>
        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.3rem', color: '#64748B' }}>✕</button>
      </div>
      {children}
    </div>
  </div>
)

const FormField = ({ label, children }) => (
  <div>
    <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: '600', color: '#475569' }}>{label}</label>
    {React.cloneElement(children, {
      style: { width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none', fontSize: '0.95rem', boxSizing: 'border-box' }
    })}
  </div>
)

export default AdminMonitor
