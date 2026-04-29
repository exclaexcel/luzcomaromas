import { useRef, useState, useEffect } from 'react'
import { cares } from '../data/care'

function useVisible(threshold = 0.1) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])
  return [ref, visible]
}

function ManualItem({ care, index }) {
  const [ref, visible] = useVisible()
  return (
    <div
      ref={ref}
      style={{
        display: 'grid',
        gridTemplateColumns: '60px 1fr',
        gap: '2rem',
        padding: 'clamp(2rem, 4vw, 2.5rem) 0',
        borderBottom: index < cares.length - 1 ? '1px solid var(--border-subtle)' : 'none',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.7s ease-out ${index * 0.08}s, transform 0.7s ease-out ${index * 0.08}s`,
        alignItems: 'start',
      }}
    >
      {/* Número */}
      <div style={{ textAlign: 'center', paddingTop: '0.25rem' }}>
        <span style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: '2.5rem',
          fontWeight: 300,
          color: 'rgba(201, 168, 74, 0.25)',
          lineHeight: 1,
          display: 'block',
        }}>
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* Conteúdo */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <div style={{ color: '#C9A84A', flexShrink: 0 }}>{care.icon}</div>
          <h3 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
            fontWeight: 400,
            color: 'var(--text-primary)',
            margin: 0,
            letterSpacing: '0.03em',
          }}>
            {care.title}
          </h3>
        </div>

        <p style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
          fontWeight: 300,
          lineHeight: 1.9,
          color: 'var(--text-secondary)',
          margin: '0 0 1rem',
        }}>
          {care.desc}
        </p>

        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontFamily: "'Raleway', sans-serif",
          fontSize: '0.62rem',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: '#C9A84A',
          opacity: 0.7,
        }}>
          <span style={{ width: '20px', height: '1px', background: 'linear-gradient(90deg, #C9A84A, transparent)', display: 'inline-block' }} />
          {care.tip} · {care.tipLabel}
        </span>
      </div>
    </div>
  )
}

export default function RitualManual() {
  const [headerRef, headerVisible] = useVisible()

  return (
    <section style={{
      backgroundColor: 'var(--bg-section-dark)',
      padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem)',
      borderTop: '1px solid rgba(212, 184, 74, 0.1)',
    }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        {/* Header */}
        <div
          ref={headerRef}
          style={{
            textAlign: 'center',
            marginBottom: 'clamp(3rem, 6vw, 5rem)',
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.9s ease-out',
          }}
        >
          <span style={{
            display: 'block',
            fontFamily: "'Raleway', sans-serif",
            fontSize: '0.65rem',
            letterSpacing: '0.5em',
            textTransform: 'uppercase',
            color: '#C9A84A',
            marginBottom: '1.25rem',
          }}>
            Manual do Ritual
          </span>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 300,
            color: 'var(--text-primary)',
            lineHeight: 1.25,
            letterSpacing: '0.03em',
            marginBottom: '0.75rem',
          }}>
            Cada gesto importa.
          </h2>
          <div style={{ width: '40px', height: '1px', background: 'linear-gradient(90deg, transparent, #C9A84A, transparent)', margin: '1.5rem auto' }} />
          <p style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(0.95rem, 1.6vw, 1.1rem)',
            fontStyle: 'italic',
            fontWeight: 300,
            lineHeight: 1.85,
            color: 'var(--text-muted)',
            maxWidth: '540px',
            margin: '0 auto',
          }}>
            Cuidar de sua vela é parte do ritual. Estes seis gestos garantem que a chama a acompanhe por mais tempo — e com mais beleza.
          </p>
        </div>

        {/* Lista de cuidados */}
        <div>
          {cares.map((care, index) => (
            <ManualItem key={care.title} care={care} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

