import React, { useState } from 'react'
import { User, Edit2, Trash2, Plus, RefreshCw, Clock, CheckCircle, Search, Filter, Download, LayoutDashboard, Bus, Users } from 'lucide-react'

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
  const [searchTerm, setSearchTerm] = useState('')

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
    if (window.confirm('Remove this student from the manifest?')) setStudents(prev => prev.filter(s => s.id !== id))
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
    if (window.confirm('Decommission this bus?')) setBuses(prev => prev.filter(b => b.id !== id))
  }

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.stop.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredBuses = buses.filter(b => 
    b.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    b.driver.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>

      {/* Hero Stats */}
      <div className="animate-slide-up" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
        <StatCard title="Active Students" value={students.length} icon={<Users size={24} />} color="var(--primary)" delay="0s" />
        <StatCard title="On Board" value={pickedCount} icon={<CheckCircle size={24} />} color="var(--success)" delay="0.1s" />
        <StatCard title="Scheduled" value={pendingCount} icon={<Clock size={24} />} color="var(--warning)" delay="0.2s" />
        <StatCard title="Active Fleet" value={buses.length} icon={<Bus size={24} />} color="var(--info)" delay="0.3s" />
      </div>

      {/* Main Content Area */}
      <div className="card-premium animate-fade-in" style={{ padding: 0, overflow: 'hidden', animationDelay: '0.4s' }}>
        {/* Toolbar */}
        <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#F8FAFC' }}>
          <div style={{ display: 'flex', gap: '2rem' }}>
            {['students', 'buses'].map(tab => (
              <button 
                key={tab} 
                onClick={() => { setActiveTab(tab); setSearchTerm(''); }} 
                style={{
                  padding: '0.5rem 0',
                  border: 'none',
                  background: 'none',
                  fontWeight: '700',
                  fontSize: '1rem',
                  color: activeTab === tab ? 'var(--primary)' : 'var(--text-muted)',
                  borderBottom: activeTab === tab ? '3px solid var(--primary)' : '3px solid transparent',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  transition: 'var(--transition)'
                }}
              >
                {tab}
              </button>
            ))}
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                placeholder={`Search ${activeTab}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  padding: '0.6rem 1rem 0.6rem 2.5rem',
                  borderRadius: '100px',
                  border: '1px solid #E2E8F0',
                  outline: 'none',
                  fontSize: '0.9rem',
                  width: '240px',
                  transition: 'var(--transition)'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                onBlur={(e) => e.target.style.borderColor = '#E2E8F0'}
              />
            </div>
            <button className="btn-premium btn-premium-primary" onClick={activeTab === 'students' ? openAddStudent : openAddBus}>
              <Plus size={18} />
              <span>Add {activeTab === 'students' ? 'Student' : 'Bus'}</span>
            </button>
          </div>
        </div>

        {/* Content Table */}
        <div style={{ overflowX: 'auto' }}>
          {activeTab === 'students' ? (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #F1F5F9', textAlign: 'left' }}>
                  <th style={{ padding: '1.25rem 2rem', fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Student Detail</th>
                  <th style={{ padding: '1.25rem 2rem', fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Pickup Point</th>
                  <th style={{ padding: '1.25rem 2rem', fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Assigned Fleet</th>
                  <th style={{ padding: '1.25rem 2rem', fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Status</th>
                  <th style={{ padding: '1.25rem 2rem', fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((s, idx) => (
                  <tr key={s.id} className="animate-fade-in" style={{ borderBottom: '1px solid #F1F5F9', transition: 'var(--transition)', animationDelay: `${idx * 0.05}s` }}>
                    <td style={{ padding: '1.25rem 2rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                          <User size={20} />
                        </div>
                        <div>
                          <p style={{ fontWeight: '700', color: 'var(--primary)', margin: 0 }}>{s.name}</p>
                          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>ID: #{s.id.toString().slice(-4)}</p>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '1.25rem 2rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--info)', fontWeight: '600' }}>
                        <Search size={14} />
                        <span>{s.stop}</span>
                      </div>
                    </td>
                    <td style={{ padding: '1.25rem 2rem' }}>
                      <select
                        value={s.bus || ''}
                        onChange={e => assignBus(s.id, e.target.value)}
                        style={{ 
                          padding: '0.5rem 1rem', 
                          borderRadius: '8px', 
                          border: '1px solid #E2E8F0', 
                          background: s.bus ? 'var(--primary)' : 'white', 
                          color: s.bus ? 'white' : 'var(--text-muted)',
                          fontWeight: '600',
                          fontSize: '0.85rem',
                          cursor: 'pointer',
                          outline: 'none'
                        }}
                      >
                        <option value="">Unassigned</option>
                        {buses.map(b => <option key={b.id} value={b.name}>{b.name}</option>)}
                      </select>
                    </td>
                    <td style={{ padding: '1.25rem 2rem' }}>
                      <span className={`badge ${s.status === 'picked' ? 'badge-success' : 'badge-warning'}`}>
                        {s.status === 'picked' ? 'On Board' : 'Scheduled'}
                      </span>
                    </td>
                    <td style={{ padding: '1.25rem 2rem', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                        <button onClick={() => openEditStudent(s)} className="btn-icon" style={{ padding: '0.5rem', borderRadius: '8px', background: '#F1F5F9', border: 'none', cursor: 'pointer', color: 'var(--primary)' }}><Edit2 size={16} /></button>
                        <button onClick={() => deleteStudent(s.id)} className="btn-icon" style={{ padding: '0.5rem', borderRadius: '8px', background: '#FEE2E2', border: 'none', cursor: 'pointer', color: 'var(--danger)' }}><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #F1F5F9', textAlign: 'left' }}>
                  <th style={{ padding: '1.25rem 2rem', fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Bus Identity</th>
                  <th style={{ padding: '1.25rem 2rem', fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Route Details</th>
                  <th style={{ padding: '1.25rem 2rem', fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Captain / Driver</th>
                  <th style={{ padding: '1.25rem 2rem', fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Contact</th>
                  <th style={{ padding: '1.25rem 2rem', fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBuses.map((b, idx) => (
                  <tr key={b.id} className="animate-fade-in" style={{ borderBottom: '1px solid #F1F5F9', transition: 'var(--transition)', animationDelay: `${idx * 0.05}s` }}>
                    <td style={{ padding: '1.25rem 2rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
                          <Bus size={20} />
                        </div>
                        <span style={{ fontWeight: '800', color: 'var(--primary)', fontSize: '1.1rem' }}>{b.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: '1.25rem 2rem', fontWeight: '600', color: 'var(--primary)' }}>{b.route || ROUTES[b.name] || 'Not Defined'}</td>
                    <td style={{ padding: '1.25rem 2rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--success)' }} />
                        <span style={{ fontWeight: '600' }}>{b.driver}</span>
                      </div>
                    </td>
                    <td style={{ padding: '1.25rem 2rem', color: 'var(--text-muted)', fontWeight: '500' }}>{b.contact}</td>
                    <td style={{ padding: '1.25rem 2rem', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                        <button onClick={() => openEditBus(b)} className="btn-icon" style={{ padding: '0.5rem', borderRadius: '8px', background: '#F1F5F9', border: 'none', cursor: 'pointer', color: 'var(--primary)' }}><Edit2 size={16} /></button>
                        <button onClick={() => deleteBus(b.id)} className="btn-icon" style={{ padding: '0.5rem', borderRadius: '8px', background: '#FEE2E2', border: 'none', cursor: 'pointer', color: 'var(--danger)' }}><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Modals */}
      {(showStudentModal || showBusModal) && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, animation: 'fadeIn 0.3s ease' }}>
          <div className="card-premium animate-scale-in" style={{ width: '100%', maxWidth: '500px', padding: '2.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2 style={{ margin: 0, fontSize: '1.5rem' }}>{showStudentModal ? (editingStudent ? 'Edit Student Profile' : 'Register New Student') : (editingBus ? 'Modify Fleet Asset' : 'Add Fleet Asset')}</h2>
              <button onClick={() => { setShowStudentModal(false); setShowBusModal(false); }} style={{ background: '#F1F5F9', border: 'none', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', color: 'var(--text-muted)' }}>✕</button>
            </div>
            
            {showStudentModal ? (
              <form onSubmit={saveStudent} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <FormField label="Full Name"><input required value={studentForm.name} onChange={e => setStudentForm({ ...studentForm, name: e.target.value })} placeholder="John Doe" /></FormField>
                <FormField label="Pickup Point"><input required value={studentForm.stop} onChange={e => setStudentForm({ ...studentForm, stop: e.target.value })} placeholder="Main Gate, Block 4" /></FormField>
                <FormField label="Assign Fleet Asset">
                  <select value={studentForm.bus} onChange={e => setStudentForm({ ...studentForm, bus: e.target.value })}>
                    <option value="">Awaiting Assignment</option>
                    {buses.map(b => <option key={b.id} value={b.name}>{b.name}</option>)}
                  </select>
                </FormField>
                <button type="submit" className="btn-premium btn-premium-primary" style={{ width: '100%', padding: '1rem', marginTop: '1rem' }}>{editingStudent ? 'Apply Changes' : 'Complete Registration'}</button>
              </form>
            ) : (
              <form onSubmit={saveBus} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <FormField label="Bus Designation"><input required value={busForm.name} onChange={e => setBusForm({ ...busForm, name: e.target.value })} placeholder="SB-101" /></FormField>
                <FormField label="Operational Route"><input required value={busForm.route} onChange={e => setBusForm({ ...busForm, route: e.target.value })} placeholder="East Sector Morning" /></FormField>
                <FormField label="Assigned Driver"><input required value={busForm.driver} onChange={e => setBusForm({ ...busForm, driver: e.target.value })} placeholder="Captain Jack" /></FormField>
                <FormField label="Emergency Contact"><input required value={busForm.contact} onChange={e => setBusForm({ ...busForm, contact: e.target.value })} placeholder="+1 234 567 890" /></FormField>
                <button type="submit" className="btn-premium btn-premium-primary" style={{ width: '100%', padding: '1rem', marginTop: '1rem' }}>{editingBus ? 'Update Fleet Record' : 'Add to Active Fleet'}</button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

const StatCard = ({ title, value, icon, color, delay }) => (
  <div className="card-premium animate-slide-up" style={{ animationDelay: delay, padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
    <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: `${color}10`, color: color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {icon}
    </div>
    <div>
      <p style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '2px' }}>{title}</p>
      <h3 style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--primary)', margin: 0 }}>{value}</h3>
    </div>
  </div>
)

const FormField = ({ label, children }) => (
  <div>
    <label style={{ display: 'block', marginBottom: '0.6rem', fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</label>
    {React.cloneElement(children, {
      style: { 
        width: '100%', 
        padding: '1rem', 
        borderRadius: '12px', 
        border: '2px solid #F1F5F9', 
        background: '#F8FAFC', 
        outline: 'none', 
        fontSize: '1rem', 
        boxSizing: 'border-box',
        fontFamily: 'Inter, sans-serif',
        transition: 'var(--transition)'
      }
    })}
  </div>
)

export default AdminMonitor
