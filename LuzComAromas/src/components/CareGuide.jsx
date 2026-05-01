import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function CareGuide() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)

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
      id="cuidados"
      style={{
        backgroundColor: 'var(--bg-section-mid)',
        padding: 'clamp(6rem, 10vw, 10rem) clamp(1.5rem, 5vw, 4rem)',
        textAlign: 'center',
      }}
    >
      <div
        ref={ref}
        style={{
          maxWidth: '640px',
          margin: '0 auto',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'all 0.9s ease-out',
        }}
      >
        <span style={{
          display: 'block',
          fontFamily: "'Raleway', sans-serif",
          fontSize: '0.7rem',
          letterSpacing: '0.4em',
          textTransform: 'uppercase',
          color: '#C9A84A',
          marginBottom: '1.25rem',
        }}>
          Cuidados com Intenção
        </span>

        <h2 style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 300,
          color: 'var(--text-primary)',
          lineHeight: 1.2,
          letterSpacing: '0.03em',
          marginBottom: '1.5rem',
        }}>
          Um cuidado à altura da sua luz
        </h2>

        <div className="section-divider mb-6" />

        <p style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
          fontWeight: 300,
          fontStyle: 'italic',
          lineHeight: 1.9,
          color: 'var(--text-secondary)',
          marginBottom: '1.25rem',
        }}>
          Para que cada momento com a sua vela siga bonito, seguro e acolhedor,
          alguns gestos fazem toda a diferença.
          Cuidar da chama também é uma forma de prolongar a experiência.
        </p>

        <p style={{
          fontFamily: "'Raleway', sans-serif",
          fontSize: 'clamp(0.82rem, 1.4vw, 0.92rem)',
          fontWeight: 300,
          lineHeight: 1.85,
          color: 'var(--text-muted)',
          marginBottom: '2.5rem',
        }}>
          Veja o manual completo de cuidados e aproveite cada ritual com mais presença.
        </p>

        <Link
          to="/manual"
          style={{
            textDecoration: 'none',
            display: 'inline-block',
            padding: '0.9rem 2.5rem',
            border: '1px solid #C9A84A',
            color: hovered ? '#1E1035' : '#C9A84A',
            background: hovered ? '#C9A84A' : 'transparent',
            fontFamily: "'Raleway', sans-serif",
            fontSize: '0.72rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            borderRadius: '1px',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          Acessar manual de cuidados
        </Link>
      </div>
    </section>
  )
}
