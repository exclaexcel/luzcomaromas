import { useEffect, useRef, useState } from 'react'
import { cares } from '../data/care'

function CareCard({ care, index }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="glass-card-light p-8 flex flex-col items-center text-center group"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: `all 0.7s ease-out ${index * 0.1}s`,
        borderRadius: '2px',
      }}
    >
      <div className="mb-5 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
        {care.icon}
      </div>
      <h3 style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontSize: '1.3rem',
        fontWeight: 400,
        color: 'var(--text-primary)',
        marginBottom: '0.75rem',
        letterSpacing: '0.03em',
      }}>
        {care.title}
      </h3>
      <p style={{
        fontFamily: "'Raleway', sans-serif",
        fontSize: '0.875rem',
        lineHeight: 1.75,
        color: 'var(--text-secondary)',
        fontWeight: 300,
        marginBottom: '1.25rem',
        flexGrow: 1,
      }}>
        {care.desc}
      </p>
      <div style={{
        borderTop: '1px solid rgba(212, 184, 74, 0.25)',
        paddingTop: '1rem',
        width: '100%',
      }}>
        <span style={{
          display: 'block',
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: '1.1rem',
          color: '#C9A84A',
          fontWeight: 500,
          letterSpacing: '0.05em',
        }}>
          {care.tip}
        </span>
        <span style={{
          display: 'block',
          fontFamily: "'Raleway', sans-serif",
          fontSize: '0.7rem',
          color: 'var(--text-muted)',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          marginTop: '0.2rem',
        }}>
          {care.tipLabel}
        </span>
      </div>
    </div>
  )
}

export default function CareGuide() {
  const titleRef = useRef(null)
  const [titleVisible, setTitleVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTitleVisible(true) },
      { threshold: 0.2 }
    )
    if (titleRef.current) observer.observe(titleRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="cuidados"
      style={{
        backgroundColor: 'var(--bg-section-mid)',
        padding: 'clamp(6rem, 10vw, 10rem) clamp(1.5rem, 5vw, 4rem)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div
          ref={titleRef}
          className="text-center mb-16"
          style={{
            opacity: titleVisible ? 1 : 0,
            transform: titleVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s ease-out',
          }}
        >
          <span style={{
            display: 'block',
            fontFamily: "'Raleway', sans-serif",
            fontSize: '0.7rem',
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            color: '#C9A84A',
            marginBottom: '1rem',
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
            Como cuidar da sua vela
          </h2>
          <div className="section-divider mb-6" />
          <p style={{
            fontFamily: "'Raleway', sans-serif",
            fontSize: '0.95rem',
            lineHeight: 1.8,
            color: 'var(--text-secondary)',
            fontWeight: 300,
            maxWidth: '520px',
            margin: '0 auto',
          }}>
            Cada vela carrega uma intenção. Cuide dela com gestos simples que prolongam a magia e o seu momento.
          </p>
        </div>

        <div className="care-grid">
          {cares.map((care, i) => (
            <CareCard key={care.title} care={care} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
