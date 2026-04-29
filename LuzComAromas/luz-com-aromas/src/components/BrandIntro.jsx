import { useEffect, useRef, useState } from 'react'

function useVisible(threshold = 0.2) {
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

function CandleSVG() {
  return (
    <svg viewBox="0 0 120 200" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', maxWidth: '160px', margin: '0 auto', display: 'block', opacity: 0.85 }}
    >
      {/* Chama */}
      <path
        d="M60 60 C60 60 42 80 44 96 C46 112 52 120 60 120 C68 120 74 112 76 96 C78 80 60 60 60 60Z"
        stroke="#C9A84A" strokeWidth="1.5" fill="rgba(212,184,74,0.08)"
      />
      <path
        d="M60 78 C60 78 54 88 55 95 C56 101 58 104 60 104 C62 104 64 101 65 95 C66 88 60 78 60 78Z"
        fill="rgba(217,142,180,0.25)" stroke="#D98EB4" strokeWidth="0.8"
      />
      {/* Pavio */}
      <line x1="60" y1="118" x2="60" y2="128" stroke="#C9A84A" strokeWidth="1.5" strokeLinecap="round"/>
      {/* Corpo da vela */}
      <rect x="36" y="128" width="48" height="60" rx="2" stroke="#9B6FC4" strokeWidth="1.2" fill="rgba(155,111,196,0.06)"/>
      {/* Topo da vela */}
      <ellipse cx="60" cy="128" rx="24" ry="5" stroke="#9B6FC4" strokeWidth="1.2" fill="rgba(155,111,196,0.10)"/>
      {/* Reflexo lateral */}
      <line x1="44" y1="138" x2="44" y2="178" stroke="rgba(155,111,196,0.3)" strokeWidth="1" strokeLinecap="round"/>
      {/* Gotas de cera */}
      <path d="M36 150 Q30 155 32 162 Q34 168 36 162 Z" stroke="#9B6FC4" strokeWidth="0.8" fill="rgba(155,111,196,0.08)"/>
      {/* Brilho da chama */}
      <circle cx="60" cy="90" r="28" stroke="rgba(212,184,74,0.12)" strokeWidth="1" fill="none"/>
      <circle cx="60" cy="90" r="20" stroke="rgba(212,184,74,0.08)" strokeWidth="1" fill="none"/>
    </svg>
  )
}

export default function BrandIntro() {
  const [leftRef, leftVisible] = useVisible(0.2)
  const [rightRef, rightVisible] = useVisible(0.2)

  return (
    <section
      id="essencia"
      style={{
        backgroundColor: 'var(--bg-section-main)',
        padding: 'clamp(6rem, 10vw, 10rem) clamp(1.5rem, 5vw, 4rem)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(ellipse at 70% 30%, rgba(155, 111, 196, 0.12) 0%, transparent 55%), radial-gradient(ellipse at 20% 70%, rgba(217, 142, 180, 0.08) 0%, transparent 50%)',
      }} />

      <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{
            fontFamily: "'Raleway', sans-serif",
            fontSize: '0.7rem',
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            color: '#C9A84A',
          }}>
            Nossa História
          </span>
          <div className="section-divider" style={{ marginTop: '1rem' }} />
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'clamp(3rem, 6vw, 6rem)',
          alignItems: 'center',
        }}>
          {/* Ilustração */}
          <div
            ref={leftRef}
            style={{
              opacity: leftVisible ? 1 : 0,
              transform: leftVisible ? 'translateX(0)' : 'translateX(-30px)',
              transition: 'all 1s ease-out',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2rem',
            }}
          >
            <CandleSVG />
            <blockquote style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'var(--text-primary)',
              lineHeight: 1.4,
              letterSpacing: '0.02em',
              margin: 0,
              textAlign: 'center',
              borderLeft: '1px solid rgba(212, 184, 74, 0.35)',
              paddingLeft: '1.5rem',
            }}>
              &ldquo;Cada aroma tem memória.<br />Cada chama tem intenção.&rdquo;
            </blockquote>
            <cite style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: '0.7rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#C9A84A',
              fontStyle: 'normal',
              opacity: 0.8,
            }}>
              — LuzComAromas
            </cite>
          </div>

          {/* Texto */}
          <div
            ref={rightRef}
            style={{
              opacity: rightVisible ? 1 : 0,
              transform: rightVisible ? 'translateX(0)' : 'translateX(30px)',
              transition: 'all 1s ease-out 0.2s',
            }}
          >
            <h2 style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: 'clamp(1.2rem, 2vw, 1.6rem)',
              fontWeight: 300,
              color: 'var(--text-primary)',
              letterSpacing: '0.1em',
              marginBottom: '1.75rem',
              textTransform: 'uppercase',
            }}>
              Sobre a Essência
            </h2>

            <p style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(1.05rem, 1.6vw, 1.2rem)',
              fontWeight: 300,
              lineHeight: 2,
              color: 'var(--text-secondary)',
              letterSpacing: '0.01em',
              marginBottom: '2.5rem',
            }}>
              A LuzComAromas nasceu do desejo de transformar a rotina em ritual. Cada vela carrega uma intenção — de criar momentos reais de presença, pausa e reencontro com o que importa de verdade. Acreditamos no poder do sensorial: no silêncio que aparece quando o ambiente muda, no respiro que chega quando a luz acende.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {[
                { icon: '✦', label: 'Ingredientes de origem natural' },
                { icon: '✦', label: 'Feita à mão, por encomenda' },
                { icon: '✦', label: 'Cada peça é única' },
              ].map(({ icon, label }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ color: '#C9A84A', fontSize: '0.6rem' }}>{icon}</span>
                  <span style={{
                    fontFamily: "'Raleway', sans-serif",
                    fontSize: '0.78rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--text-secondary)',
                    fontWeight: 300,
                  }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>

            <div style={{
              width: '40px', height: '1px',
              background: 'linear-gradient(90deg, #C9A84A, transparent)',
              marginTop: '2.5rem',
            }} />
          </div>
        </div>
      </div>
    </section>
  )
}
