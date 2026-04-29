import { useState, useRef, useEffect, useCallback, useMemo } from 'react' // useRef mantido por GridOracle e FanOracle
import { createPortal } from 'react-dom'
import { collections } from '../data/collections'

/** @type {Record<string, string>} */
const SPOTIFY_MAP = {
  serenidade:  '6PSXB8rNM8RUYj6eUe2ZfJ',
  energia:     '7rGcJI1PqvDyJh8d38qSqJ',
  intuicao:    '4CqsKFIRFpkLrLPuG7Jjkd',
  purificacao: '0t6VkUIETQJ1DXpMIl2vLx',
}

function SpotifyPlayer({ trackId }) {
  if (!trackId) return null
  return (
    <iframe
      style={{ borderRadius: '8px', display: 'block' }}
      src={`https://open.spotify.com/embed/track/${trackId}?utm_source=generator`}
      width="100%"
      height="80"
      frameBorder="0"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
      title="Som do ritual"
    />
  )
}

// Retorna 1 mensagem por dia (persiste em localStorage); "Puxar outra chama" usa getNextMessage
/** @param {string} collectionId @param {string[]} messages @returns {string} */
function getDailyMessage(collectionId, messages) {
  const today = new Date().toISOString().split('T')[0]
  const key = `oracle_dia_${collectionId}_${today}`
  try {
    const cached = localStorage.getItem(key)
    if (cached) return cached
    const idx = Math.floor(Math.random() * messages.length)
    const msg = messages[idx]
    localStorage.setItem(key, msg)
    return msg
  } catch {
    return messages[Math.floor(Math.random() * messages.length)]
  }
}

function getNextMessage(collectionId, messages) {
  const key = `oracle-seen-${collectionId}`
  let seen = []
  try { seen = JSON.parse(sessionStorage.getItem(key) || '[]') } catch { seen = [] }
  const available = messages.map((_, i) => i).filter((i) => !seen.includes(i))
  const pool = available.length > 0 ? available : messages.map((_, i) => i)
  const idx = pool[Math.floor(Math.random() * pool.length)]
  const newSeen = available.length > 0 ? [...seen, idx] : [idx]
  sessionStorage.setItem(key, JSON.stringify(newSeen))
  return messages[idx]
}

function CandleSVG({ height = 52 }) {
  const w = Math.round(height * 0.69)
  return (
    <svg width={w} height={height} viewBox="0 0 36 52" fill="none" style={{ display: 'inline-block', animation: 'candleFlicker 1.8s ease-in-out infinite' }}>
      <ellipse cx="18" cy="9"  rx="5"   ry="7"  fill="#E8CC6C" opacity="0.92" />
      <ellipse cx="18" cy="11" rx="2.5" ry="4"  fill="#FFFAE0" opacity="0.72" />
      <line x1="18" y1="16" x2="18" y2="20" stroke="#7B5B2A" strokeWidth="1.2" strokeLinecap="round" />
      <rect x="10" y="20" width="16" height="24" rx="2" fill="url(#cgOracle)" opacity="0.9" />
      <rect x="7"  y="42" width="22" height="4"  rx="1" fill="rgba(201,168,74,0.28)" />
      <defs>
        <linearGradient id="cgOracle" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="rgba(220,205,175,0.95)" />
          <stop offset="50%"  stopColor="rgba(245,235,210,0.98)" />
          <stop offset="100%" stopColor="rgba(205,190,160,0.90)" />
        </linearGradient>
      </defs>
    </svg>
  )
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `${r}, ${g}, ${b}`
}

// Fan rotations + offsets matching portal-oraculo.html
const FAN = [
  { rot: -18, tx: 10 },
  { rot: -6,  tx: 5  },
  { rot:  6,  tx: -5 },
  { rot:  18, tx: -10 },
]

function RevealOverlay({ collection, message, onClose, onNew }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [onClose])

  const rgb = hexToRgb(collection.color)

  return createPortal(
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(10, 5, 25, 0.88)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(1rem, 4vw, 3rem)',
        animation: 'overlayIn 0.4s ease',
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Mensagem do oráculo"
        onClick={e => e.stopPropagation()}
        style={{
          width: 'min(480px, 94vw)',
          background: `
            radial-gradient(ellipse 80% 50% at 50% 0%, rgba(${rgb}, 0.18) 0%, transparent 70%),
            linear-gradient(160deg, var(--bg-section-main) 0%, var(--bg-section-dark) 60%, #120830 100%)
          `,
          border: '1px solid rgba(201, 168, 74, 0.45)',
          borderRadius: '18px',
          boxShadow: `
            0 0 0 1px rgba(201, 168, 74, 0.12),
            0 0 80px rgba(201, 168, 74, 0.2),
            inset 0 1px 0 rgba(201, 168, 74, 0.3)
          `,
          padding: 'clamp(2rem, 5vw, 3rem) clamp(1.5rem, 4vw, 2.5rem)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.2rem',
          position: 'relative',
          animation: 'cardIn 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* inner border */}
        <div style={{
          position: 'absolute', inset: '8px',
          borderRadius: '12px',
          border: '1px solid rgba(201, 168, 74, 0.12)',
          pointerEvents: 'none',
        }} />

        {/* centelhas */}
        {[
          { left: '12%', bottom: '6%',  animationDuration: '5s',   animationDelay: '0s'   },
          { left: '50%', bottom: '3%',  animationDuration: '6.5s', animationDelay: '1.8s' },
          { left: '83%', bottom: '8%',  animationDuration: '5.5s', animationDelay: '3.2s' },
        ].map((s, i) => (
          <div key={i} className="particle" style={{ position: 'absolute', ...s }} />
        ))}

        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: '1rem', right: '1.2rem',
            background: 'none', border: 'none',
            color: 'var(--text-muted)', fontSize: '1.1rem',
            cursor: 'pointer', transition: 'opacity 0.3s', opacity: 0.5,
          }}
          onMouseEnter={e => { e.currentTarget.style.opacity = '1' }}
          onMouseLeave={e => { e.currentTarget.style.opacity = '0.5' }}
          aria-label="Fechar"
        >
          ✕
        </button>

        <p style={{
          fontFamily: "'Raleway', sans-serif",
          fontSize: '0.65rem',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: 'var(--text-muted)',
          opacity: 0.8,
        }}>
          Coleção {collection.name}
        </p>

        <div style={{ fontSize: '2.6rem' }}>{collection.icon}</div>

        <p style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 'clamp(0.85rem, 2vw, 1rem)',
          fontWeight: 300,
          fontStyle: 'italic',
          color: '#C9A84A',
          letterSpacing: '0.06em',
          textAlign: 'center',
          opacity: 0.9,
        }}>
          Sua Chama de Sabedoria de hoje:
        </p>

        {/* divisor ornamental */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', width: '80%' }}>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(201,168,74,0.45), transparent)' }} />
          <span style={{ color: '#C9A84A', fontSize: '0.65rem', opacity: 0.7 }}>✦</span>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(201,168,74,0.45), transparent)' }} />
        </div>

        <blockquote style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 'clamp(1.3rem, 3.5vw, 1.75rem)',
          fontWeight: 400,
          fontStyle: 'italic',
          color: 'var(--text-primary)',
          textAlign: 'center',
          lineHeight: 1.55,
          letterSpacing: '0.02em',
          textShadow: '0 0 40px rgba(201, 168, 74, 0.3)',
          margin: 0,
        }}>
          {message}
        </blockquote>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', width: '80%' }}>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(201,168,74,0.45), transparent)' }} />
          <span style={{ color: '#C9A84A', fontSize: '0.65rem', opacity: 0.7 }}>✦</span>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(201,168,74,0.45), transparent)' }} />
        </div>

        {/* Player Spotify — descomentar quando tiver IDs válidos */}
        {/* <SpotifyPlayer trackId={SPOTIFY_MAP[collection.id]} /> */}

        {/* Guia do Ritual */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.45rem',
          paddingTop: '0.25rem',
        }}>
          {['Acenda sua vela', 'Respire fundo três vezes', 'Deixe o aroma e o som se encontrarem'].map(step => (
            <p key={step} style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: '0.62rem',
              letterSpacing: '0.2em',
              color: 'var(--text-muted)',
              margin: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}>
              <span style={{ color: '#C9A84A', fontSize: '0.5rem' }}>✦</span>
              {step}
            </p>
          ))}
        </div>

        <p style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: '0.78rem',
          fontStyle: 'italic',
          color: 'rgba(201,168,74,0.5)',
          letterSpacing: '0.08em',
          marginTop: '0.5rem',
          textAlign: 'center',
        }}>
          Essa chama foi revelada para você nesse acesso.
        </p>
      </div>

      <style>{`
        @keyframes overlayIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes cardIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>,
    document.body
  )
}

// Fan Oracle — shown when preSelectedCollection is provided
export function FanOracle({ collection, onReveal }) {
  const [message, setMessage] = useState(/** @type {string|null} */ (null))

  // Random position for the active card (0-3)
  const activePos = useMemo(() => Math.floor(Math.random() * 4), [])

  // Build the sequence: 3 misteriosas + 1 ativa at activePos
  const sequence = useMemo(() => {
    const others = collections.filter(c => c.id !== collection.id)
    const seq = [...others]
    seq.splice(activePos, 0, collection)
    return seq
  }, [collection, activePos])

  const handleReveal = useCallback(() => {
    const msg = getDailyMessage(collection.id, collection.messages)
    setMessage(msg)
    if (onReveal) onReveal(msg)
  }, [collection, onReveal])

  const handleNew = useCallback(() => {
    setMessage(getNextMessage(collection.id, collection.messages))
  }, [collection])

  const handleClose = useCallback(() => setMessage(null), [])

  const rgb = hexToRgb(collection.color)

  return (
    <section
      id="oraculo"
      style={{
        padding: 'clamp(4rem, 8vw, 8rem) clamp(1rem, 4vw, 3rem)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Halo de cor da coleção */}
      <div style={{
        position: 'absolute',
        top: '40%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px', height: '600px',
        background: `radial-gradient(circle, rgba(${rgb}, 0.08) 0%, transparent 65%)`,
        filter: 'blur(40px)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '860px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Título */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 5vw, 4rem)' }}>
          <span style={{
            display: 'block',
            fontFamily: "'Raleway', sans-serif",
            fontSize: '0.62rem',
            letterSpacing: '0.5em',
            textTransform: 'uppercase',
            color: '#C9A84A',
            marginBottom: '1rem',
          }}>
            Portal do Oráculo
          </span>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(2rem, 5vw, 3.4rem)',
            fontWeight: 400,
            color: 'var(--text-primary)',
            letterSpacing: '0.06em',
            textShadow: '0 0 50px rgba(201, 168, 74, 0.3)',
            marginBottom: '0.5rem',
          }}>
            Chamas de Sabedoria
          </h2>
          <p style={{
            fontFamily: "'Raleway', sans-serif",
            fontSize: '0.75rem',
            fontWeight: 300,
            letterSpacing: '0.14em',
            color: 'var(--text-muted)',
          }}>
            Portal do Oráculo
          </p>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: '0.8rem', marginTop: '1.2rem',
          }}>
            <div style={{ height: '1px', width: '60px', background: 'linear-gradient(90deg, transparent, #C9A84A, transparent)' }} />
            <span style={{ color: '#C9A84A', fontSize: '0.7rem', opacity: 0.85 }}>✦</span>
            <div style={{ height: '1px', width: '60px', background: 'linear-gradient(90deg, transparent, #C9A84A, transparent)' }} />
          </div>
        </div>

        {/* Vela */}
        <div style={{
          textAlign: 'center',
          marginBottom: '0.5rem',
          filter: 'drop-shadow(0 0 14px rgba(201,168,74,0.7))',
        }}>
          <CandleSVG height={52} />
        </div>

        {/* Toalha */}
        <div style={{
          position: 'relative',
          borderRadius: '18px 18px 60% 60% / 18px 18px 40px 40px',
          background: `
            radial-gradient(ellipse 70% 40% at 50% 20%, rgba(80,50,140,.25) 0%, transparent 70%),
            radial-gradient(ellipse 100% 60% at 50% 80%, rgba(20,10,40,.4)  0%, transparent 70%),
            linear-gradient(175deg, var(--bg-section-mid) 0%, var(--bg-section-dark) 60%, #120830 100%)
          `,
          border: '1px solid rgba(201, 168, 74, 0.3)',
          boxShadow: `
            0 0 0 1px rgba(201,168,74,.08),
            0 0 60px rgba(201,168,74,.07),
            inset 0 1px 0 rgba(201,168,74,.2),
            0 40px 120px rgba(10,5,30,.6)
          `,
          padding: 'clamp(2rem, 4vw, 3rem) clamp(1rem, 3vw, 2.5rem) clamp(3rem, 6vw, 5rem)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          {/* borda interna */}
          <div style={{
            position: 'absolute', inset: '10px',
            borderRadius: '12px 12px 55% 55% / 12px 12px 34px 34px',
            border: '1px solid rgba(201, 168, 74, 0.12)',
            pointerEvents: 'none',
          }} />

          {/* franja base */}
          <div style={{
            position: 'absolute', bottom: '-10px', left: '5%', right: '5%', height: '10px',
            background: 'repeating-linear-gradient(90deg, rgba(201,168,74,0.3) 0px, rgba(201,168,74,0.3) 2px, transparent 2px, transparent 10px)',
            boxShadow: '0 2px 8px rgba(201,168,74,0.15)',
          }} />

          {/* cantos ornamentais da toalha */}
          {[
            { top: '18px',   left: '18px',  borderTop:    '1px solid rgba(201,168,74,0.28)', borderLeft:  '1px solid rgba(201,168,74,0.28)' },
            { top: '18px',   right: '18px', borderTop:    '1px solid rgba(201,168,74,0.28)', borderRight: '1px solid rgba(201,168,74,0.28)' },
            { bottom: '28px', left: '18px',  borderBottom: '1px solid rgba(201,168,74,0.28)', borderLeft:  '1px solid rgba(201,168,74,0.28)' },
            { bottom: '28px', right: '18px', borderBottom: '1px solid rgba(201,168,74,0.28)', borderRight: '1px solid rgba(201,168,74,0.28)' },
          ].map((s, i) => (
            <div key={i} style={{ position: 'absolute', width: '12px', height: '12px', pointerEvents: 'none', ...s }} />
          ))}

          {/* Nome da coleção */}
          <p style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(0.9rem, 2.5vw, 1.2rem)',
            fontWeight: 300,
            letterSpacing: '0.2em',
            color: collection.color,
            textTransform: 'uppercase',
            marginBottom: 'clamp(1.5rem, 4vw, 2.5rem)',
            opacity: 0.9,
          }}>
            Coleção {collection.name}
          </p>

          {/* Leque */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
            minHeight: '200px',
            marginBottom: '2rem',
            position: 'relative',
          }}>
            {sequence.map((col, i) => {
              const isAtiva = col.id === collection.id
              const fan = FAN[i]
              const rgb2 = hexToRgb(col.color)
              return (
                <div
                  key={col.id}
                  onClick={isAtiva ? handleReveal : undefined}
                  role={isAtiva ? 'button' : undefined}
                  tabIndex={isAtiva ? 0 : undefined}
                  aria-label={isAtiva ? `Revelar carta ${col.name}` : undefined}
                  onKeyDown={isAtiva ? (e) => { if (e.key === 'Enter' || e.key === ' ') handleReveal() } : undefined}
                  style={{
                    width: 'clamp(90px, 14vw, 126px)',
                    height: 'clamp(148px, 24vw, 192px)',
                    borderRadius: '12px',
                    border: `1px solid ${isAtiva ? 'rgba(201,168,74,0.5)' : 'rgba(184,196,208,0.2)'}`,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    flexShrink: 0,
                    cursor: isAtiva ? 'pointer' : 'default',
                    userSelect: 'none',
                    transformOrigin: 'bottom center',
                    background: isAtiva
                      ? `linear-gradient(160deg, rgba(${rgb2}, 0.25) 0%, var(--bg-section-dark) 100%)`
                      : 'linear-gradient(160deg, var(--bg-section-dark) 0%, #120830 100%)',
                    opacity: isAtiva ? 1 : 0.4,
                    transform: `rotate(${fan.rot}deg) translateX(${fan.tx}px)`,
                    animation: isAtiva
                      ? `fanFloat${i} 4s ease-in-out infinite, brilhoBorda 3s ease-in-out infinite`
                      : 'none',
                    boxShadow: isAtiva
                      ? `0 0 0 1px rgba(201,168,74,.15), 0 0 30px rgba(201,168,74,.2), inset 0 1px 0 rgba(201,168,74,.3)`
                      : 'none',
                    zIndex: isAtiva ? 2 : 1,
                    position: 'relative',
                  }}
                >
                  {isAtiva ? (
                    <>
                      <span style={{ fontSize: '1.8rem' }}>{col.icon}</span>
                      <span style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontSize: '0.85rem',
                        fontWeight: 500,
                        letterSpacing: '0.08em',
                        color: 'var(--text-primary)',
                        textAlign: 'center',
                        padding: '0 0.4rem',
                      }}>{col.name}</span>
                      <span style={{
                        fontSize: '0.6rem',
                        fontWeight: 300,
                        color: 'var(--text-muted)',
                        letterSpacing: '0.05em',
                      }}>toque para revelar</span>

                    </>
                  ) : (
                    <span style={{ color: 'rgba(184,196,208,0.3)', fontSize: '1.4rem' }}>✦</span>
                  )}
                </div>
              )
            })}
          </div>

          {/* Instrução */}
          <p style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: '0.82rem',
            fontWeight: 300,
            fontStyle: 'italic',
            color: 'var(--text-muted)',
            letterSpacing: '0.1em',
            animation: 'piscar 2.5s ease-in-out infinite',
          }}>
            Toque na sua carta para revelar a chama ✦
          </p>
        </div>
      </div>

      {message && (
        <RevealOverlay
          collection={collection}
          message={message}
          onClose={handleClose}
          onNew={handleNew}
        />
      )}

      <style>{`
        @keyframes fanFloat0 {
          0%,100% { transform: rotate(-18deg) translateX(10px) translateY(0); }
          50%      { transform: rotate(-18deg) translateX(10px) translateY(-6px); }
        }
        @keyframes fanFloat1 {
          0%,100% { transform: rotate(-6deg) translateX(5px) translateY(0); }
          50%      { transform: rotate(-6deg) translateX(5px) translateY(-6px); }
        }
        @keyframes fanFloat2 {
          0%,100% { transform: rotate(6deg) translateX(-5px) translateY(0); }
          50%      { transform: rotate(6deg) translateX(-5px) translateY(-6px); }
        }
        @keyframes fanFloat3 {
          0%,100% { transform: rotate(18deg) translateX(-10px) translateY(0); }
          50%      { transform: rotate(18deg) translateX(-10px) translateY(-6px); }
        }
        @keyframes brilhoBorda {
          0%,100% { box-shadow: 0 0 0 1px rgba(201,168,74,.15), 0 0 20px rgba(201,168,74,.15), inset 0 1px 0 rgba(201,168,74,.25); }
          50%      { box-shadow: 0 0 0 1px rgba(201,168,74,.35), 0 0 40px rgba(201,168,74,.3),  inset 0 1px 0 rgba(201,168,74,.4); }
        }
        @keyframes piscar {
          0%,100% { opacity: 0.6; }
          50%      { opacity: 0.25; }
        }
      `}</style>
    </section>
  )
}

// Grid Oracle — fallback when no collection is pre-selected
function GridOracle() {
  const [selected, setSelected] = useState(null)
  const [message, setMessage] = useState(null)
  const titleRef = useRef(null)
  const [titleVisible, setTitleVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTitleVisible(true) },
      { threshold: 0.15 }
    )
    if (titleRef.current) observer.observe(titleRef.current)
    return () => observer.disconnect()
  }, [])

  const handleSelect = (col) => {
    if (selected?.id === col.id) return
    setSelected(col)
    setMessage(null)
  }

  const handleReveal = () => {
    if (!selected) return
    setMessage(getNextMessage(selected.id, selected.messages))
  }

  const handleNew = () => {
    if (!selected) return
    setMessage(getNextMessage(selected.id, selected.messages))
  }

  const handleClose = useCallback(() => setMessage(null), [])

  return (
    <section
      id="oraculo"
      style={{
        backgroundColor: 'var(--bg-section-main)',
        padding: 'clamp(6rem, 10vw, 10rem) clamp(1.5rem, 5vw, 4rem)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(155,111,196,0.10) 0%, transparent 40%), radial-gradient(circle at 80% 80%, rgba(217,142,180,0.08) 0%, transparent 40%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div
          ref={titleRef}
          style={{
            textAlign: 'center',
            marginBottom: 'clamp(3rem, 6vw, 5rem)',
            opacity: titleVisible ? 1 : 0,
            transform: titleVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s ease-out',
          }}
        >
          <span style={{
            display: 'block',
            fontFamily: "'Raleway', sans-serif",
            fontSize: '0.62rem',
            letterSpacing: '0.5em',
            textTransform: 'uppercase',
            color: '#C9A84A',
            marginBottom: '1rem',
          }}>
            Portal do Oráculo
          </span>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(2rem, 4vw, 3.4rem)',
            fontWeight: 400,
            color: 'var(--text-primary)',
            letterSpacing: '0.06em',
            marginBottom: '1.5rem',
          }}>
            Chamas de Sabedoria
          </h2>
          <div className="section-divider" style={{ marginBottom: '1.5rem' }} />
          <p style={{
            fontFamily: "'Raleway', sans-serif",
            fontSize: '0.85rem',
            lineHeight: 1.85,
            color: 'var(--text-secondary)',
            fontWeight: 300,
            maxWidth: '500px',
            margin: '0 auto',
          }}>
            Escolha a coleção que ressoa com o seu momento.
            A intuição sabe o caminho — o oráculo tem uma mensagem pra você.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.25rem',
        }}>
          {collections.map((col, i) => {
            const fanAngles = [-5, -1.5, 1.5, 5]
            const isSelected = selected?.id === col.id
            const hasSelection = selected !== null
            const rgb = hexToRgb(col.color)
            return (
              <div
                key={col.id}
                style={{
                  transform: hasSelection
                    ? isSelected ? 'rotate(0deg) translateY(-4px)' : `rotate(${fanAngles[i]}deg)`
                    : `rotate(${fanAngles[i]}deg)`,
                  transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  transformOrigin: 'bottom center',
                }}
              >
                <button
                  onClick={() => handleSelect(col)}
                  style={{
                    width: '100%',
                    background: isSelected
                      ? `linear-gradient(135deg, rgba(${rgb}, 0.2), var(--bg-section-main))`
                      : 'var(--bg-card)',
                    border: `1px solid ${isSelected ? col.color : 'var(--border-gold)'}`,
                    borderRadius: '2px',
                    padding: '2rem 1.5rem',
                    textAlign: 'center',
                    cursor: 'pointer',
                    boxShadow: isSelected ? `0 20px 60px rgba(${rgb}, 0.3)` : 'none',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <div style={{ color: col.color, marginBottom: '1rem' }}>{col.icon}</div>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: '1.4rem',
                    fontWeight: 400,
                    color: isSelected ? col.color : 'var(--text-primary)',
                    letterSpacing: '0.05em',
                    marginBottom: '0.3rem',
                  }}>
                    {col.name}
                  </div>
                  <div style={{
                    fontFamily: "'Raleway', sans-serif",
                    fontSize: '0.65rem',
                    letterSpacing: '0.3em',
                    textTransform: 'uppercase',
                    color: isSelected ? col.color : 'var(--text-faint)',
                    marginBottom: '1rem',
                    opacity: 0.9,
                  }}>
                    {col.subtitle}
                  </div>
                  <div style={{
                    width: '40px', height: '1px',
                    background: isSelected ? col.color : 'var(--border-gold)',
                    margin: '0 auto 1rem',
                  }} />
                  <div style={{
                    fontFamily: "'Raleway', sans-serif",
                    fontSize: '0.7rem',
                    letterSpacing: '0.1em',
                    color: isSelected ? 'var(--text-secondary)' : 'var(--text-faint)',
                    fontWeight: 300,
                  }}>
                    {col.description}
                  </div>
                </button>
              </div>
            )
          })}
        </div>

        {selected && !message && (
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <button
              onClick={handleReveal}
              style={{
                padding: '1rem 3rem',
                background: 'transparent',
                border: '1px solid #C9A84A',
                color: '#C9A84A',
                fontFamily: "'Raleway', sans-serif",
                fontSize: '0.78rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.35s ease',
                borderRadius: '1px',
                animation: 'piscarBtn 2s ease-in-out infinite',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#C9A84A'; e.currentTarget.style.color = '#1E1035' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#C9A84A' }}
            >
              Revelar a Mensagem
            </button>
          </div>
        )}

        {message && selected && (
          <RevealOverlay collection={selected} message={message} onClose={handleClose} onNew={handleNew} />
        )}
      </div>

      <style>{`
        @keyframes piscar { 0%,100% { opacity: 0.6; } 50% { opacity: 0.25; } }
        @keyframes piscarBtn { 0%,100% { box-shadow: 0 0 0 rgba(201,168,74,0); } 50% { box-shadow: 0 0 20px rgba(201,168,74,0.3); } }
      `}</style>
    </section>
  )
}

export default function Oracle({ preSelectedCollection = null }) {
  if (preSelectedCollection) {
    return <FanOracle collection={preSelectedCollection} />
  }
  return <GridOracle />
}
