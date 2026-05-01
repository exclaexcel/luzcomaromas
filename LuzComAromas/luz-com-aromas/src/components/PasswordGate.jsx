import { useState, useCallback, useMemo } from 'react'
import { collections } from '../data/collections'

export default function PasswordGate({ children }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [unlockedCollection, setUnlockedCollection] = useState(null)

  const stars = useMemo(() =>
    [...Array(80)].map((_, i) => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: i % 7 === 0 ? `${Math.random() * 2 + 2}px` : `${Math.random() * 1.5 + 0.5}px`,
      isGold: i % 9 === 0,
      duration: `${2 + Math.random() * 5}s`,
      delay: `${Math.random() * 7}s`,
      opacity: Math.random() * 0.5 + 0.1,
    })), [])

  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    const normalized = password.toLowerCase().trim()
    const match = collections.find((c) => c.id === normalized)
    if (match) {
      sessionStorage.setItem('colecao', match.id)
      setUnlockedCollection(match)
    } else {
      setError(true)
      setPassword('')
      setTimeout(() => setError(false), 1500)
    }
  }, [password])

  if (unlockedCollection) {
    return typeof children === 'function'
      ? children(unlockedCollection)
      : children
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'clamp(2rem, 5vw, 4rem)',
      position: 'relative',
      overflow: 'hidden',
      animation: 'bgPulse 12s ease-in-out infinite',
    }}>
      {/* Campo estelar */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {stars.map((s, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: s.size, height: s.size,
            borderRadius: '50%',
            left: s.left, top: s.top,
            background: s.isGold ? '#C9A84A' : 'var(--text-primary)',
            opacity: s.opacity,
            animation: `starTwinkleLogin ${s.duration} ${s.delay} infinite ease-in-out alternate`,
          }} />
        ))}
      </div>

      {/* Halo central */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px', height: '600px',
        background: 'radial-gradient(circle, rgba(155, 111, 196, 0.12) 0%, transparent 65%)',
        filter: 'blur(40px)',
        pointerEvents: 'none',
      }} />

      {/* Card central */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        textAlign: 'center',
        maxWidth: '420px',
        width: '100%',
        background: 'linear-gradient(135deg, var(--bg-section-main), var(--bg-section-dark))',
        border: '1px solid rgba(201, 168, 74, 0.3)',
        borderRadius: '3px',
        padding: 'clamp(2.5rem, 5vw, 4rem) clamp(2rem, 4vw, 3rem)',
        boxShadow: '0 30px 80px rgba(0,0,0,0.35)',
      }}>
        {/* Candle */}
        <div style={{
          fontSize: '2.5rem',
          marginBottom: '1.5rem',
          display: 'block',
          animation: 'candleFlicker 2.5s ease-in-out infinite',
        }}>
          🕯️
        </div>

        <h1 style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
          fontWeight: 300,
          color: 'var(--text-primary)',
          letterSpacing: '0.05em',
          marginBottom: '0.5rem',
        }}>
          Acesso ao Ritual
        </h1>

        <p style={{
          fontFamily: "'Raleway', sans-serif",
          fontSize: '0.65rem',
          letterSpacing: '0.4em',
          textTransform: 'uppercase',
          color: '#C9A84A',
          marginBottom: '0.75rem',
          opacity: 0.85,
        }}>
          Exclusivo para clientes
        </p>

        <div style={{
          width: '40px', height: '1px',
          background: 'linear-gradient(90deg, transparent, #C9A84A, transparent)',
          margin: '0 auto 2rem',
        }} />

        <p style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: '0.9rem',
          fontStyle: 'italic',
          color: 'var(--text-muted)',
          marginBottom: '2.5rem',
          lineHeight: 1.7,
        }}>
          Digite a senha que acompanha a sua carta ritual.
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '2rem' }}>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="· · · · · · · ·"
              autoComplete="off"
              aria-label="Senha da coleção"
              aria-describedby={error ? 'erro-senha' : undefined}
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                borderBottom: `1px solid ${error ? '#9A6A8D' : 'rgba(212, 184, 74, 0.5)'}`,
                outline: 'none',
                padding: '0.75rem 0',
                textAlign: 'center',
                fontFamily: "'Raleway', sans-serif",
                fontSize: '1.1rem',
                letterSpacing: '0.5em',
                color: 'var(--text-primary)',
                transition: 'border-color 0.3s ease',
                animation: error ? 'shake 0.5s ease-in-out' : 'none',
                boxSizing: 'border-box',
              }}
              onFocus={e => { e.currentTarget.style.borderBottomColor = '#C9A84A' }}
              onBlur={e => { e.currentTarget.style.borderBottomColor = error ? '#9A6A8D' : 'rgba(212, 184, 74, 0.5)' }}
            />
          </div>

          {error && (
            <p
              id="erro-senha"
              role="alert"
              aria-live="assertive"
              style={{
                fontFamily: "'Raleway', sans-serif",
                fontSize: '0.7rem',
                letterSpacing: '0.2em',
                color: '#9A6A8D',
                marginBottom: '1.5rem',
                textTransform: 'uppercase',
              }}
            >
              Senha não reconhecida. Verifique a carta do seu ritual.
            </p>
          )}

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '0.9rem 2rem',
              background: 'transparent',
              border: '1px solid #C9A84A',
              color: '#C9A84A',
              fontFamily: "'Raleway', sans-serif",
              fontSize: '0.75rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              borderRadius: '1px',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#C9A84A'
              e.currentTarget.style.color = '#1E1035'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = '#C9A84A'
            }}
          >
            Entrar no Ritual
          </button>
        </form>
      </div>

      <style>{`
        @keyframes bgPulse {
          0%, 100% { filter: brightness(0.9); }
          50%       { filter: brightness(1.05); }
        }
        @keyframes starTwinkleLogin {
          0%   { opacity: 0.1; transform: scale(1); }
          100% { opacity: 0.75; transform: scale(1.4); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%       { transform: translateX(-6px); }
          40%       { transform: translateX(6px); }
          60%       { transform: translateX(-4px); }
          80%       { transform: translateX(4px); }
        }
      `}</style>
    </div>
  )
}

