import { useState, useEffect } from 'react'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Voltar ao topo"
      title="Voltar ao topo"
      style={{
        position: 'fixed',
        bottom: '5.5rem',
        right: '2rem',
        zIndex: 999,
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        background: 'rgba(30, 16, 53, 0.92)',
        border: `1px solid rgba(201, 168, 74, ${hovered ? '0.8' : '0.4'})`,
        color: '#C9A84A',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: hovered
          ? '0 6px 24px rgba(201, 168, 74, 0.25)'
          : '0 4px 20px rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(8px)',
        transition: 'all 0.3s ease',
        transform: hovered ? 'scale(1.1) translateY(-2px)' : 'scale(1) translateY(0)',
      }}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
           strokeLinecap="round" strokeLinejoin="round" width="20" height="20" aria-hidden="true">
        <path d="M12 3 C12 3 7 9 7 14 C7 17.3 9.2 20 12 20 C14.8 20 17 17.3 17 14 C17 9 12 3 12 3Z" />
        <ellipse cx="12" cy="15" rx="2.5" ry="3" fill="currentColor" opacity="0.25" stroke="none" />
      </svg>
    </button>
  )
}
