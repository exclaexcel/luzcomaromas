// @ts-nocheck
import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
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
  return /** @type {const} */ ([ref, visible])
}

function CareItem({ care, index }) {
  const [ref, visible] = useVisible()
  return (
    <div
      ref={ref}
      style={{
        display: 'grid',
        gridTemplateColumns: '56px 1fr',
        gap: '2rem',
        padding: 'clamp(2rem, 4vw, 2.5rem) 0',
        borderBottom: index < cares.length - 1 ? '1px solid var(--border-subtle)' : 'none',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.7s ease-out ${index * 0.07}s, transform 0.7s ease-out ${index * 0.07}s`,
        alignItems: 'start',
      }}
    >
      <div style={{ textAlign: 'center', paddingTop: '0.15rem' }}>
        <span style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: '2.2rem',
          fontWeight: 300,
          color: 'rgba(201, 168, 74, 0.22)',
          lineHeight: 1,
          display: 'block',
        }}>
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

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
          margin: 0,
        }}>
          {care.desc}
        </p>
      </div>
    </div>
  )
}

export default function RitualManual() {
  const [introRef, introVisible] = useVisible(0.15)
  const [footerRef, footerVisible] = useVisible(0.15)
  const [ctaHovered, setCtaHovered] = useState(false)

  return (
    <section style={{
      backgroundColor: 'var(--bg-section-dark)',
      padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 4rem)',
      borderTop: '1px solid rgba(212, 184, 74, 0.1)',
    }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>

        {/* Bloco introdutório */}
        <div
          ref={introRef}
          style={{
            textAlign: 'center',
            marginBottom: 'clamp(3rem, 6vw, 5rem)',
            opacity: introVisible ? 1 : 0,
            transform: introVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.9s ease-out',
          }}
        >
          <p style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(1rem, 1.7vw, 1.15rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            lineHeight: 1.9,
            color: 'var(--text-secondary)',
            maxWidth: '580px',
            margin: '0 auto 1rem',
          }}>
            Cada vela carrega uma experiência pensada para durar com presença, beleza e segurança.
          </p>
          <p style={{
            fontFamily: "'Raleway', sans-serif",
            fontSize: 'clamp(0.82rem, 1.4vw, 0.92rem)',
            fontWeight: 300,
            lineHeight: 1.85,
            color: 'var(--text-muted)',
            maxWidth: '540px',
            margin: '0 auto',
          }}>
            Com alguns cuidados simples, o ritual se mantém mais harmonioso e a chama segue bonita do primeiro ao último acender.
          </p>
        </div>

        <div style={{ width: '40px', height: '1px', background: 'linear-gradient(90deg, transparent, #C9A84A, transparent)', margin: '0 auto clamp(3rem, 6vw, 5rem)' }} />

        {/* Blocos de cuidados */}
        <div>
          {cares.map((care, index) => (
            <CareItem key={care.title} care={care} index={index} />
          ))}
        </div>

        {/* Bloco final */}
        <div
          ref={footerRef}
          style={{
            textAlign: 'center',
            marginTop: 'clamp(4rem, 8vw, 6rem)',
            opacity: footerVisible ? 1 : 0,
            transform: footerVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.9s ease-out',
          }}
        >
          <div style={{ width: '40px', height: '1px', background: 'linear-gradient(90deg, transparent, #C9A84A, transparent)', margin: '0 auto 2.5rem' }} />

          <p style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(1rem, 1.7vw, 1.15rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            lineHeight: 1.9,
            color: 'var(--text-secondary)',
            maxWidth: '540px',
            margin: '0 auto 1rem',
          }}>
            Cuidar da sua vela também é uma forma de prolongar a experiência.
          </p>
          <p style={{
            fontFamily: "'Raleway', sans-serif",
            fontSize: 'clamp(0.82rem, 1.4vw, 0.92rem)',
            fontWeight: 300,
            lineHeight: 1.85,
            color: 'var(--text-muted)',
            maxWidth: '500px',
            margin: '0 auto 3rem',
          }}>
            Com presença nos pequenos gestos, cada chama segue mais bonita, segura e harmoniosa ao longo do tempo.
          </p>

          <Link
            to="/colecoes"
            style={{
              textDecoration: 'none',
              display: 'inline-block',
              padding: '0.9rem 2.5rem',
              border: '1px solid #C9A84A',
              color: ctaHovered ? '#1E1035' : '#C9A84A',
              background: ctaHovered ? '#C9A84A' : 'transparent',
              fontFamily: "'Raleway', sans-serif",
              fontSize: '0.72rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              borderRadius: '1px',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={() => setCtaHovered(true)}
            onMouseLeave={() => setCtaHovered(false)}
          >
            Conhecer as coleções
          </Link>
        </div>

      </div>
    </section>
  )
}
