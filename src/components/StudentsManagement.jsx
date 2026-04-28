import React, { useState } from 'react'
import { UserPlus, Search, Edit2, Trash2, Clock, CheckCircle } from 'lucide-react'

const StudentsManagement = ({ students, setStudents, buses = [] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentStudent, setCurrentStudent] = useState({ name: '', stop: '', bus: '' })
  const [isEditing, setIsEditing] = useState(false)

  const handleSave = (e) => {
    e.preventDefault()
    if (isEditing) {
      setStudents(students.map(s => s.id === currentStudent.id ? { ...s, ...currentStudent } : s))
    } else {
      setStudents([...students, { ...currentStudent, id: Date.now(), status: 'pending' }])
    }
    closeModal()
  }

  const openModal = (student = null) => {
    if (student) {
      setCurrentStudent({ name: student.name, stop: student.stop, bus: student.bus || '', id: student.id })
      setIsEditing(true)
    } else {
      setCurrentStudent({ name: '', stop: '', bus: '' })
      setIsEditing(false)
    }
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentStudent({ name: '', stop: '', bus: '' })
  }

  const deleteStudent = (id) => {
    if (window.confirm('Remove this student?')) {
      setStudents(students.filter(s => s.id !== id))
    }
  }

  const assignBus = (studentId, busName) => {
    setStudents(students.map(s => s.id === studentId ? { ...s, bus: busName } : s))
  }

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.stop.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

      {/* Header */}
      <div className="card-premium animate-slide-up" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white', padding: '1.5rem 2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--primary)', margin: 0 }}>Manage Students</h2>
          <p style={{ color: 'var(--text-muted)', margin: '4px 0 0' }}>Manage student enrollments and bus assignments</p>
        </div>
        <button onClick={() => openModal()} className="btn-premium btn-premium-primary">
          <UserPlus size={18} /> <span>Add Student</span>
        </button>
      </div>

      {/* Search */}
      <div className="glass-panel" style={{ padding: '1rem', background: 'white', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Search size={20} color="var(--text-secondary)" />
        <input
          type="text"
          placeholder="Search by name or stop..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ border: 'none', outline: 'none', width: '100%', fontSize: '1rem', background: 'transparent' }}
        />
      </div>

      {/* Table */}
      <div className="glass-panel" style={{ background: 'white', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                {['#', 'Student Name', 'Pickup Stop', 'Assigned Bus', 'Status', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '0.875rem 1.25rem', fontSize: '0.82rem', fontWeight: '700', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.03em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((student, i) => (
                <tr key={student.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '0.875rem 1.25rem', color: '#94A3B8', fontSize: '0.85rem' }}>#{i + 1}</td>
                  <td style={{ padding: '0.875rem 1.25rem', fontWeight: '600', color: '#1E293B' }}>{student.name}</td>
                  <td style={{ padding: '0.875rem 1.25rem', color: '#3B82F6', fontWeight: '500' }}>{student.stop}</td>
                  <td style={{ padding: '0.875rem 1.25rem' }}>
                    <select
                      value={student.bus || ''}
                      onChange={e => assignBus(student.id, e.target.value)}
                      style={{
                        border: '1px solid #E2E8F0', borderRadius: '6px',
                        padding: '0.3rem 0.5rem', fontSize: '0.85rem',
                        color: student.bus ? '#1E293B' : '#94A3B8',
                        background: 'white', cursor: 'pointer', outline: 'none'
                      }}
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
                      <button onClick={() => openModal(student)} style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer' }}><Edit2 size={16} /></button>
                      <button onClick={() => deleteStudent(student.id)} style={{ background: '#FEE2E2', border: 'none', color: '#EF4444', cursor: 'pointer', padding: '0.3rem', borderRadius: '6px' }}><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, backdropFilter: 'blur(4px)' }}>
          <div className="glass-panel" style={{ background: 'white', width: '100%', maxWidth: '440px', padding: '2rem', borderRadius: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h3 style={{ fontWeight: '800', color: '#1E293B' }}>{isEditing ? 'Edit Student' : 'Add New Student'}</h3>
              <button onClick={closeModal} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.3rem', color: '#64748B' }}>✕</button>
            </div>
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: '600', color: '#475569' }}>Full Name</label>
                <input required value={currentStudent.name}
                  onChange={e => setCurrentStudent({ ...currentStudent, name: e.target.value })}
                  placeholder="e.g. Aarav Sharma"
                  style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none', fontSize: '0.95rem', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: '600', color: '#475569' }}>Pickup Stop</label>
                <input required value={currentStudent.stop}
                  onChange={e => setCurrentStudent({ ...currentStudent, stop: e.target.value })}
                  placeholder="e.g. Shanti Nagar"
                  style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none', fontSize: '0.95rem', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: '600', color: '#475569' }}>Assign Bus</label>
                <select value={currentStudent.bus}
                  onChange={e => setCurrentStudent({ ...currentStudent, bus: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none', fontSize: '0.95rem', boxSizing: 'border-box', background: 'white' }}>
                  <option value="">Not Assigned</option>
                  {buses.map(b => <option key={b.id} value={b.name}>{b.name}{b.route ? ` — ${b.route}` : ''}</option>)}
                </select>
              </div>
              <button type="submit" style={{ background: '#0F172A', color: 'white', border: 'none', padding: '0.75rem', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', marginTop: '0.5rem', fontSize: '1rem' }}>
                {isEditing ? 'Save Changes' : 'Enroll Student'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default StudentsManagement
