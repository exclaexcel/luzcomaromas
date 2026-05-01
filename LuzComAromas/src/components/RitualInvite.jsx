import { useEffect, useRef, useState } from 'react'

export default function RitualInvite() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      style={{
        backgroundColor: 'var(--bg-section-main)',
        padding: 'clamp(6rem, 10vw, 10rem) clamp(1.5rem, 5vw, 4rem)',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
      }}
    >
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `
          radial-gradient(ellipse at 50% 0%, rgba(155, 111, 196, 0.12) 0%, transparent 60%),
          radial-gradient(ellipse at 50% 100%, rgba(217, 142, 180, 0.08) 0%, transparent 50%)
        `,
      }} />

      <div
        ref={ref}
        style={{
          maxWidth: '700px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 1s ease-out',
        }}
      >
        <div style={{ marginBottom: '2rem' }}>
          <svg viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg"
            style={{ width: '40px', height: '53px', margin: '0 auto', display: 'block' }}
          >
            <rect x="18" y="42" width="24" height="32" rx="1" stroke="#C9A84A" strokeWidth="1" fill="rgba(212,184,74,0.05)"/>
            <ellipse cx="30" cy="42" rx="13" ry="3" stroke="#C9A84A" strokeWidth="1" fill="rgba(212,184,74,0.10)"/>
            <line x1="30" y1="34" x2="30" y2="39" stroke="#C9A84A" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M30 33 C30 33 24 26 26 20 C27 16 30 14 30 14 C30 14 33 16 34 20 C36 26 30 33 30 33Z"
              stroke="#C9A84A" strokeWidth="1" fill="rgba(212,184,74,0.12)" strokeLinejoin="round"/>
          </svg>
        </div>

        <span style={{
          display: 'block',
          fontFamily: "'Raleway', sans-serif",
          fontSize: '0.7rem',
          letterSpacing: '0.4em',
          textTransform: 'uppercase',
          color: '#C9A84A',
          marginBottom: '1.5rem',
          opacity: 0.8,
        }}>
          Portal Exclusivo
        </span>

        <h2 style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 'clamp(2rem, 4vw, 3.2rem)',
          fontWeight: 300,
          color: 'var(--text-primary)',
          lineHeight: 1.2,
          letterSpacing: '0.03em',
          marginBottom: '1.5rem',
        }}>
          O Oráculo está esperando por você
        </h2>

        <div className="section-divider mb-8" />

        <p style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
          fontWeight: 300,
          fontStyle: 'italic',
          lineHeight: 1.8,
          color: 'var(--text-secondary)',
          maxWidth: '500px',
          margin: '0 auto 3rem',
        }}>
          Um espaço íntimo e exclusivo, onde sua coleção revela a mensagem que
          o universo preparou para esse momento. Acesse com sua palavra de intenção.
        </p>
      </div>
    </section>
  )
}
