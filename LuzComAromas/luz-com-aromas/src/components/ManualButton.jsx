import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function ManualButton() {
  const navigate = useNavigate()
  const [hovered, setHovered] = useState(false)

  return (
    <button
      onClick={() => navigate('/manual')}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Manual do Ritual"
      title="Manual do Ritual"
      style={{
        position: 'fixed',
        bottom: '2rem',
        left: '2rem',
        zIndex: 999,
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        background: 'rgba(30, 16, 53, 0.92)',
        border: '1px solid rgba(201, 168, 74, 0.4)',
        color: '#C9A84A',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
        transition: 'all 0.3s ease',
        transform: hovered ? 'scale(1.08)' : 'scale(1)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
      {hovered && (
        <span style={{
          position: 'absolute',
          left: '56px',
          top: '50%',
          transform: 'translateY(-50%)',
          whiteSpace: 'nowrap',
          background: 'rgba(30, 16, 53, 0.95)',
          border: '1px solid rgba(201, 168, 74, 0.3)',
          padding: '0.3rem 0.8rem',
          borderRadius: '2px',
          fontFamily: "'Raleway', sans-serif",
          fontSize: '0.65rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: '#C9A84A',
          pointerEvents: 'none',
        }}>
          Manual do Ritual
        </span>
      )}
    </button>
  )
}
