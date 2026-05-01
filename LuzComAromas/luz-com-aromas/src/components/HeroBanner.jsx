import { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'

export default function HeroBanner() {
  const [loaded, setLoaded] = useState(false)

  const stars = useMemo(() =>
    [...Array(80)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 85}%`,
      size: Math.random() < 0.15 ? `${Math.random() * 2 + 2}px` : `${Math.random() * 1.5 + 0.5}px`,
      opacity: Math.random() * 0.6 + 0.2,
      duration: `${3 + Math.random() * 5}s`,
      delay: `${Math.random() * 6}s`,
    })), [])

  const goldenDust = useMemo(() =>
    [...Array(24)].map(() => ({
      left: `${30 + Math.random() * 40}%`,
      bottom: `${5 + Math.random() * 45}%`,
      size: `${Math.random() * 3 + 1}px`,
      duration: `${6 + Math.random() * 8}s`,
      delay: `${Math.random() * 7}s`,
      drift: `${(Math.random() - 0.5) * 80}px`,
    })), [])

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 150)
    return () => clearTimeout(t)
  }, [])

  const scrollToEssencia = () => {
    document.getElementById('essencia')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section style={{
      minHeight: '100vh',
      background: 'transparent',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '120px clamp(1.5rem, 5vw, 4rem) 80px',
      position: 'relative',
      overflow: 'hidden',
      textAlign: 'center',
    }}>

      {/* Campo estelar */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        {stars.map((s, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: s.size, height: s.size,
            background: i % 5 === 0 ? '#C9A84A' : 'var(--text-primary)',
            borderRadius: '50%',
            left: s.left, top: s.top,
            opacity: s.opacity,
            animation: `starTwinkle ${s.duration} ${s.delay} infinite ease-in-out alternate`,
            boxShadow: i % 5 === 0 ? '0 0 4px rgba(212,184,74,0.8)' : '0 0 3px var(--text-muted)',
          }} />
        ))}
      </div>

      {/* Raio de luz dourado — emanando do centro-base */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        height: '75%',
        background: 'conic-gradient(from 270deg at 50% 100%, transparent 70deg, rgba(212,184,74,0.06) 90deg, rgba(212,184,74,0.10) 100deg, rgba(212,184,74,0.06) 110deg, transparent 130deg)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* Halo central suave */}
      <div style={{
        position: 'absolute',
        bottom: '-100px', left: '50%',
        transform: 'translateX(-50%)',
        width: '600px', height: '400px',
        background: 'radial-gradient(ellipse at 50% 80%, rgba(212,184,74,0.12) 0%, rgba(155,111,196,0.08) 40%, transparent 70%)',
        filter: 'blur(40px)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* Partículas douradas flutuando */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
        {goldenDust.map((p, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: p.size, height: p.size,
            background: 'radial-gradient(circle, #C9A84A, transparent)',
            borderRadius: '50%',
            left: p.left, bottom: p.bottom,
            animation: `dustRise ${p.duration} ${p.delay} infinite ease-in-out`,
            '--drift': p.drift,
          }} />
        ))}
      </div>

      {/* Linhas geométricas douradas — decorativas */}
      <svg style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 1, opacity: 0.18,
      }} viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        {/* Linhas diagonais finas */}
        <line x1="720" y1="900" x2="0" y2="100" stroke="#C9A84A" strokeWidth="0.5"/>
        <line x1="720" y1="900" x2="1440" y2="100" stroke="#C9A84A" strokeWidth="0.5"/>
        <line x1="720" y1="900" x2="200" y2="0" stroke="#C9A84A" strokeWidth="0.3"/>
        <line x1="720" y1="900" x2="1240" y2="0" stroke="#C9A84A" strokeWidth="0.3"/>
        {/* Losango central */}
        <polygon
          points="720,200 820,380 720,560 620,380"
          stroke="#C9A84A" strokeWidth="0.6" fill="none"
        />
        {/* Arco sutil no topo */}
        <ellipse cx="720" cy="-100" rx="400" ry="350" stroke="#C9A84A" strokeWidth="0.4" fill="none"/>
      </svg>

      {/* Conteúdo central */}
      <div style={{
        position: 'relative', zIndex: 2,
        maxWidth: '820px',
        opacity: loaded ? 1 : 0,
        transform: loaded ? 'translateY(0)' : 'translateY(24px)',
        transition: 'all 1.4s cubic-bezier(0.2, 1, 0.3, 1)',
      }}>


        {/* Logo nome */}
        <div style={{ marginBottom: '1.5rem' }}>
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(2.8rem, 6vw, 5rem)',
            fontWeight: 400,
            color: 'var(--text-primary)',
            letterSpacing: '0.06em',
          }}>
            Luz
          </span>
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(2.8rem, 6vw, 5rem)',
            fontWeight: 300,
            color: '#C9A84A',
            letterSpacing: '0.06em',
          }}>
            ComAromas
          </span>
        </div>

        {/* Divisor dourado */}
        <div style={{
          width: '60px', height: '1px',
          background: 'linear-gradient(90deg, transparent, #C9A84A, transparent)',
          margin: '0 auto 2.5rem',
        }} />

        {/* Headline */}
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(1.9rem, 4.5vw, 3.8rem)',
          fontWeight: 300,
          color: 'var(--text-primary)',
          lineHeight: 1.25,
          letterSpacing: '0.04em',
          marginBottom: '2rem',
        }}>
          A <em style={{ fontStyle: 'italic', color: '#C9A84A' }}>luz</em> que acolhe.<br />
          O aroma que <em style={{
            fontStyle: 'italic',
            background: 'linear-gradient(90deg, var(--text-primary), #C9A84A)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>transforma</em>.
        </h1>

        {/* Subtítulo */}
        <p style={{
          fontFamily: "'Raleway', sans-serif",
          fontSize: 'clamp(0.8rem, 1.4vw, 0.95rem)',
          color: 'var(--text-muted)',
          letterSpacing: '0.1em',
          lineHeight: 2,
          fontWeight: 300,
          maxWidth: '480px',
          margin: '0 auto 3.5rem',
        }}>
          Cada vela nasce de uma intenção. Escolha sua coleção e deixe o aroma guiar seu momento.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: '1.25rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            to="/colecoes"
            style={{
              display: 'inline-block',
              padding: '1.1rem 3rem',
              background: 'linear-gradient(135deg, #C9A84A 0%, #C4A33A 100%)',
              color: '#1E1035',
              textDecoration: 'none',
              fontFamily: "'Raleway', sans-serif",
              fontWeight: 500,
              letterSpacing: '0.35em',
              fontSize: '0.72rem',
              textTransform: 'uppercase',
              borderRadius: '1px',
              transition: 'all 0.4s ease',
              boxShadow: '0 8px 30px rgba(212, 184, 74, 0.30)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = '0 12px 45px rgba(212, 184, 74, 0.50)'
              e.currentTarget.style.transform = 'translateY(-3px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(212, 184, 74, 0.30)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            Descobrir as Coleções
          </Link>

          <button
            onClick={scrollToEssencia}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '1.1rem 2.5rem',
              background: 'transparent',
              border: '1px solid rgba(212, 184, 74, 0.35)',
              color: 'var(--text-secondary)',
              fontFamily: "'Raleway', sans-serif",
              fontWeight: 300,
              letterSpacing: '0.3em',
              fontSize: '0.72rem',
              textTransform: 'uppercase',
              cursor: 'pointer',
              borderRadius: '1px',
              transition: 'all 0.4s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#C9A84A'
              e.currentTarget.style.color = '#C9A84A'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(212, 184, 74, 0.35)'
              e.currentTarget.style.color = 'var(--text-secondary)'
            }}
          >
            Como Funciona
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 5v14M5 12l7 7 7-7"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: '2.5rem', left: '50%',
        transform: 'translateX(-50%)',
        opacity: loaded ? 0.5 : 0,
        transition: 'opacity 1s ease 1.5s',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
      }}>
        <span style={{
          fontFamily: "'Raleway', sans-serif",
          fontSize: '0.55rem', letterSpacing: '0.4em',
          textTransform: 'uppercase', color: '#C9A84A',
        }}>Rolar</span>
        <div style={{
          width: '1px', height: '36px',
          background: 'linear-gradient(to bottom, #C9A84A, transparent)',
          animation: 'pulseDown 2s infinite ease-in-out',
        }} />
      </div>

      <style>{`
        @keyframes starTwinkle {
          0% { opacity: var(--op, 0.2); transform: scale(1); }
          100% { opacity: calc(var(--op, 0.2) + 0.4); transform: scale(1.3); }
        }
        @keyframes dustRise {
          0%   { opacity: 0; transform: translateY(0) translateX(0) scale(0.5); }
          20%  { opacity: 0.7; }
          80%  { opacity: 0.3; }
          100% { opacity: 0; transform: translateY(-180px) translateX(var(--drift, 0)) scale(1); }
        }
        @keyframes pulseDown {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
      `}</style>
    </section>
  )
}

