import { useState, useRef, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import PasswordGate from '../components/PasswordGate'
import { FanOracle } from '../components/Oracle'

const AUDIO_MAP = {
  serenidade:  '/audio/serenidade.mp3',
  energia:     '/audio/energia.mp3',
  intuicao:    '/audio/intuicao.mp3',
  purificacao: '/audio/purificacao.mp3',
}

const POEM = [
  'Tem um fio de luz que nunca apaga.',
  'Mesmo quando a noite pesa,',
  'mesmo quando o silêncio dói,',
  'a chama encontra o caminho.',
  null,
  'Essa vela é um lembrete:',
  'você é essa luz.',
]

// ── Botão de avanço ────────────────────────────────────────────
function FlowButton({ onClick, label = 'Deixa fluir →' }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: 'transparent',
        border: 'none',
        color: 'rgba(201,168,74,0.65)',
        fontFamily: "'Raleway', sans-serif",
        fontSize: '0.68rem',
        letterSpacing: '0.35em',
        textTransform: 'uppercase',
        cursor: 'pointer',
        padding: '0.75rem 1.5rem',
        transition: 'color 0.3s ease',
        animation: 'fadeInUp 0.9s ease forwards',
      }}
      onMouseEnter={e => { e.currentTarget.style.color = '#C9A84A' }}
      onMouseLeave={e => { e.currentTarget.style.color = 'rgba(201,168,74,0.65)' }}
    >
      {label}
    </button>
  )
}

// ── Botão mute ─────────────────────────────────────────────────
function MuteButton({ muted, onToggle }) {
  return (
    <button
      onClick={onToggle}
      aria-label={muted ? 'Ativar som' : 'Silenciar'}
      style={{
        position: 'fixed',
        bottom: 'calc(1.5rem + env(safe-area-inset-bottom))',
        right: 'calc(1.5rem + env(safe-area-inset-right))',
        zIndex: 300,
        width: '36px', height: '36px',
        borderRadius: '50%',
        background: 'transparent',
        border: '1px solid rgba(201,168,74,0.3)',
        color: '#C9A84A',
        cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.2s ease',
        opacity: 0.55,
      }}
      onMouseEnter={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.borderColor = 'rgba(201,168,74,0.7)' }}
      onMouseLeave={e => { e.currentTarget.style.opacity = '0.55'; e.currentTarget.style.borderColor = 'rgba(201,168,74,0.3)' }}
    >
      {muted ? (
        <svg viewBox="0 0 24 24" fill="none" width="15" height="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <path d="M11 5L6 9H2v6h4l5 4V5z"/>
          <line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" width="15" height="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <path d="M11 5L6 9H2v6h4l5 4V5z"/>
          <path d="M19.07 4.93a10 10 0 010 14.14"/>
          <path d="M15.54 8.46a5 5 0 010 7.07"/>
        </svg>
      )}
    </button>
  )
}

// ── Indicador de progresso ─────────────────────────────────────
function ProgressDots({ phase }) {
  return (
    <div style={{
      position: 'fixed', top: '1.25rem', left: '50%', transform: 'translateX(-50%)',
      zIndex: 300,
      display: 'flex', gap: '0.45rem', alignItems: 'center',
    }}>
      {[0, 1, 2, 3, 4, 5].map(i => (
        <div key={i} style={{
          width: i === phase ? '18px' : '5px',
          height: '5px',
          borderRadius: '3px',
          background: i === phase
            ? '#C9A84A'
            : i < phase
              ? 'rgba(201,168,74,0.35)'
              : 'rgba(255,255,255,0.12)',
          transition: 'all 0.5s ease',
        }} />
      ))}
    </div>
  )
}

// ── Shell comum a todas as fases ───────────────────────────────
function PhaseShell({ children, centered = true }) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60)
    return () => clearTimeout(t)
  }, [])
  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex',
      alignItems: centered ? 'center' : 'flex-start',
      justifyContent: 'center',
      padding: centered ? 'clamp(2rem, 5vw, 4rem)' : '2rem 1rem',
      overflowY: centered ? 'hidden' : 'auto',
      opacity: visible ? 1 : 0,
      transition: 'opacity 1s ease',
    }}>
      {children}
    </div>
  )
}

// ── Fase 0 — Entrada ───────────────────────────────────────────
function PhaseEntrada({ onNext }) {
  return (
    <PhaseShell>
      <div style={{ textAlign: 'center', maxWidth: '580px' }}>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at 50% 50%, rgba(155,111,196,0.12) 0%, transparent 65%)',
        }}>
          {[
            { left: '22%', bottom: '28%', animationDuration: '6s',   animationDelay: '0s'   },
            { left: '50%', bottom: '22%', animationDuration: '7.5s', animationDelay: '2.2s' },
            { left: '74%', bottom: '32%', animationDuration: '5.8s', animationDelay: '4.1s' },
          ].map((s, i) => (
            <div key={i} className="particle" style={{ position: 'absolute', ...s }} />
          ))}
        </div>
        <span style={{
          display: 'block',
          fontFamily: "'Raleway', sans-serif",
          fontSize: '0.62rem',
          letterSpacing: '0.5em',
          textTransform: 'uppercase',
          color: '#C9A84A',
          marginBottom: '2rem',
          opacity: 0.85,
        }}>
          Seu Momento
        </span>
        <h1 style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 'clamp(2.4rem, 5vw, 4rem)',
          fontWeight: 300,
          color: 'var(--text-primary)',
          lineHeight: 1.2,
          letterSpacing: '0.04em',
          marginBottom: '2rem',
        }}>
          O Ritual Começa Agora
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', justifyContent: 'center', margin: '0 auto 2rem' }}>
          <div style={{ width: '32px', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(201,168,74,0.55))' }} />
          <span style={{ color: '#C9A84A', fontSize: '0.65rem', opacity: 0.75 }}>✦</span>
          <div style={{ width: '32px', height: '1px', background: 'linear-gradient(90deg, rgba(201,168,74,0.55), transparent)' }} />
        </div>
        <p style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
          fontWeight: 300,
          fontStyle: 'italic',
          color: 'var(--text-secondary)',
          lineHeight: 1.9,
          marginBottom: '3rem',
        }}>
          Esse é o seu espaço. Um momento só seu — de pausa, intenção e reencontro.<br />
          Deixe o aroma guiar você e a chama iluminar o que importa de verdade.
        </p>
        <FlowButton onClick={onNext} label="Entrar no ritual →" />
      </div>
    </PhaseShell>
  )
}

// ── Fase 1 — Respira ───────────────────────────────────────────
function PhaseRespira({ onNext }) {
  const [showBtn, setShowBtn] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setShowBtn(true), 4500)
    return () => clearTimeout(t)
  }, [])
  return (
    <PhaseShell>
      <div style={{ textAlign: 'center', position: 'relative' }}>
        <div style={{
          position: 'fixed', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '320px', height: '320px',
          background: 'radial-gradient(circle, rgba(201,168,74,0.10) 0%, transparent 70%)',
          animation: 'breathe 4s ease-in-out infinite',
          pointerEvents: 'none',
          zIndex: 0,
        }} />
        <p style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 'clamp(3rem, 7vw, 6rem)',
          fontWeight: 300,
          fontStyle: 'italic',
          color: 'var(--text-primary)',
          letterSpacing: '0.08em',
          opacity: 0.55,
          position: 'relative', zIndex: 1,
          marginBottom: '5rem',
        }}>
          Respira.
        </p>
        {showBtn && (
          <div style={{ position: 'relative', zIndex: 1 }}>
            <FlowButton onClick={onNext} />
          </div>
        )}
      </div>
    </PhaseShell>
  )
}

// ── Fase 2 — Respiração Guiada ────────────────────────────────
const BREATH_TOTAL = 70
const BREATH_CYCLE = 14
const BREATH_PHASES = [
  { label: 'Inspire...', duration: 4, scale: 1.6 },
  { label: 'Segure.',    duration: 4, scale: 1.6 },
  { label: 'Expire...',  duration: 6, scale: 1.0 },
]

function PhaseRespiracao({ onNext }) {
  const [elapsed, setElapsed] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (done) return
    const id = setInterval(() => {
      setElapsed(e => {
        const next = parseFloat((e + 0.1).toFixed(1))
        if (next >= BREATH_TOTAL) { setDone(true); clearInterval(id); return BREATH_TOTAL }
        return next
      })
    }, 100)
    return () => clearInterval(id)
  }, [done])

  const posInCycle = elapsed % BREATH_CYCLE
  const phaseIdx = posInCycle < 4 ? 0 : posInCycle < 8 ? 1 : 2
  const currentBreath = BREATH_PHASES[phaseIdx]
  const cycleNum = Math.min(Math.floor(elapsed / BREATH_CYCLE) + 1, 5)
  const progress = (elapsed / BREATH_TOTAL) * 100

  const circleScale = phaseIdx === 0
    ? 1.6
    : phaseIdx === 1
      ? 1.6
      : 1.0

  const circleTransition = phaseIdx === 0
    ? 'transform 4s ease-in-out'
    : phaseIdx === 1
      ? 'none'
      : 'transform 6s ease-in-out'

  return (
    <PhaseShell>
      <div style={{ textAlign: 'center', position: 'relative', width: '100%', maxWidth: '420px' }}>

        {/* Introdução */}
        <span style={{
          display: 'block',
          fontFamily: "'Raleway', sans-serif",
          fontSize: '0.62rem',
          letterSpacing: '0.5em',
          textTransform: 'uppercase',
          color: '#C9A84A',
          marginBottom: '1rem',
          opacity: 0.85,
        }}>
          Pausa
        </span>
        <p style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)',
          fontWeight: 300,
          fontStyle: 'italic',
          color: 'var(--text-secondary)',
          lineHeight: 1.85,
          marginBottom: '2.5rem',
          letterSpacing: '0.02em',
        }}>
          Este é o seu minuto. Só seu.<br />
          Antes de seguir, um presente para você mesma —<br />
          um momento inteiro de silêncio e respiração.
        </p>

        {/* Círculo animado */}
        <div style={{
          width: '160px', height: '160px',
          borderRadius: '50%',
          margin: '3.5rem auto 2.5rem',
          position: 'relative',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {/* anel externo */}
          <div style={{
            position: 'absolute', inset: 0,
            borderRadius: '50%',
            border: '1px solid rgba(201,168,74,0.25)',
            transform: `scale(${circleScale})`,
            transition: circleTransition,
          }} />
          {/* anel interno */}
          <div style={{
            position: 'absolute', inset: '20px',
            borderRadius: '50%',
            background: `radial-gradient(circle, rgba(201,168,74,0.12) 0%, transparent 70%)`,
            transform: `scale(${circleScale})`,
            transition: circleTransition,
          }} />

          {/* Texto da fase */}
          {!done && (
            <p key={phaseIdx} style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'var(--text-primary)',
              letterSpacing: '0.04em',
              margin: 0,
              position: 'relative', zIndex: 1,
              animation: 'fadeInUp 0.5s ease forwards',
            }}>
              {currentBreath.label}
            </p>
          )}

          {done && (
            <p className="shimmer-text" style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: '0.95rem',
              fontWeight: 300,
              fontStyle: 'italic',
              letterSpacing: '0.04em',
              margin: 0,
              position: 'relative', zIndex: 1,
              animation: 'fadeInUp 0.8s ease forwards, shimmer 4s linear infinite',
              maxWidth: '130px',
              lineHeight: 1.5,
            }}>
              Bem feito.
            </p>
          )}
        </div>

        {/* Contador de ciclos */}
        {!done && (
          <p style={{
            fontFamily: "'Raleway', sans-serif",
            fontSize: '0.6rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'rgba(201,168,74,0.5)',
            marginBottom: '2rem',
          }}>
            ciclo {cycleNum} de 5
          </p>
        )}

        {/* Mensagem de conclusão */}
        {done && (
          <p style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: '1rem',
            fontStyle: 'italic',
            color: 'var(--text-secondary)',
            marginBottom: '2rem',
            animation: 'fadeInUp 0.9s ease forwards',
          }}>
            Sua mente está mais quieta agora.
          </p>
        )}

        {/* Barra de progresso */}
        <div style={{
          width: '200px', height: '1px',
          background: 'rgba(201,168,74,0.15)',
          margin: '0 auto 2.5rem',
          borderRadius: '1px',
          overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #C9A84A, #E8CC6C)',
            transition: 'width 0.1s linear',
            boxShadow: '0 0 8px rgba(201,168,74,0.45)',
          }} />
        </div>

        {/* Botão principal — aparece ao terminar */}
        {done && <FlowButton onClick={onNext} />}

        {/* Botão pular — sempre visível */}
        {!done && (
          <button
            onClick={onNext}
            style={{
              background: 'none', border: 'none',
              fontFamily: "'Raleway', sans-serif",
              fontSize: '0.6rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'rgba(201,168,74,0.3)',
              cursor: 'pointer',
              transition: 'color 0.3s ease',
              display: 'block',
              margin: '0 auto',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = 'rgba(201,168,74,0.65)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(201,168,74,0.3)' }}
          >
            pular →
          </button>
        )}
      </div>
    </PhaseShell>
  )
}

// ── Fase 3 — Acalanto ─────────────────────────────────────────
function PhaseAcalanto({ onNext }) {
  const [shown, setShown] = useState(0)
  const [showBtn, setShowBtn] = useState(false)

  useEffect(() => {
    if (shown >= POEM.length) {
      const t = setTimeout(() => setShowBtn(true), 800)
      return () => clearTimeout(t)
    }
    const delay = shown === 0 ? 600 : 1100
    const t = setTimeout(() => setShown(s => s + 1), delay)
    return () => clearTimeout(t)
  }, [shown])

  return (
    <PhaseShell>
      <div style={{ maxWidth: '520px', textAlign: 'center' }}>
        <div style={{
          width: '22px', height: '22px', borderRadius: '50%',
          border: '1px solid rgba(201,168,74,0.45)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 1.25rem', opacity: 0.65,
        }}>
          <span style={{ color: '#C9A84A', fontSize: '0.55rem' }}>✦</span>
        </div>
        <span style={{
          display: 'block',
          fontFamily: "'Raleway', sans-serif",
          fontSize: '0.6rem',
          letterSpacing: '0.5em',
          textTransform: 'uppercase',
          color: '#C9A84A',
          marginBottom: '2rem',
          opacity: 0.7,
        }}>
          Acalanto da Alma
        </span>
        <blockquote style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 'clamp(1.15rem, 2.5vw, 1.6rem)',
          fontWeight: 300,
          fontStyle: 'italic',
          color: 'var(--text-primary)',
          lineHeight: 1.95,
          letterSpacing: '0.02em',
          margin: '0 0 2.5rem',
          borderLeft: '1px solid rgba(201,168,74,0.3)',
          paddingLeft: '1.5rem',
          textAlign: 'left',
          minHeight: '11rem',
        }}>
          {POEM.slice(0, shown).map((line, i) =>
            line === null
              ? <br key={i} />
              : (
                <span key={i} style={{ display: 'block', animation: 'fadeInUp 0.8s ease forwards' }}>
                  {i === 6
                    ? <em style={{ color: '#C9A84A' }}>{line}</em>
                    : line}
                </span>
              )
          )}
        </blockquote>
        {showBtn && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', justifyContent: 'center', marginBottom: '1rem' }}>
              <div style={{ width: '24px', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(201,168,74,0.4))' }} />
              <span style={{ color: '#C9A84A', fontSize: '0.5rem', opacity: 0.55 }}>✦</span>
              <div style={{ width: '24px', height: '1px', background: 'linear-gradient(90deg, rgba(201,168,74,0.4), transparent)' }} />
            </div>
            <FlowButton onClick={onNext} />
          </>
        )}
      </div>
    </PhaseShell>
  )
}

// ── Fase 4 — Oracle ────────────────────────────────────────────
function PhaseOracle({ collection, onNext }) {
  const [revealed, setRevealed] = useState(false)
  return (
    <PhaseShell centered={false}>
      <div style={{ width: '100%', maxWidth: '900px', paddingTop: '2rem', paddingBottom: '2rem' }}>
        <FanOracle collection={collection} onReveal={() => setRevealed(true)} />
        {revealed && (
          <div style={{ textAlign: 'center', paddingTop: '0.5rem', paddingBottom: '1rem', animation: 'fadeInUp 0.9s ease forwards' }}>
            <FlowButton onClick={onNext} />
          </div>
        )}
      </div>
    </PhaseShell>
  )
}

// ── Fase 5 — Encerramento ──────────────────────────────────────
function PhaseEncerramento({ collection }) {
  const waText = encodeURIComponent('Olá! Gostaria de encomendar uma vela LuzComAromas. 🕯️')
  const waUrl = `https://wa.me/5541988427128?text=${waText}`
  return (
    <PhaseShell>
      <div style={{ textAlign: 'center', maxWidth: '560px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <div style={{ width: '40px', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(201,168,74,0.5))' }} />
          <span style={{ color: '#C9A84A', fontSize: '0.85rem', opacity: 0.85 }}>✦</span>
          <div style={{ width: '40px', height: '1px', background: 'linear-gradient(90deg, rgba(201,168,74,0.5), transparent)' }} />
        </div>
        <h2 style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
          fontWeight: 300,
          color: 'var(--text-primary)',
          letterSpacing: '0.03em',
          marginBottom: '0.75rem',
          textShadow: '0 0 60px rgba(201,168,74,0.22)',
        }}>
          A chama continua em você.
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', justifyContent: 'center', margin: '0 0 1.5rem' }}>
          <div style={{ width: '20px', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(201,168,74,0.35))' }} />
          <span style={{ color: '#C9A84A', fontSize: '0.5rem', opacity: 0.5 }}>✦</span>
          <div style={{ width: '20px', height: '1px', background: 'linear-gradient(90deg, rgba(201,168,74,0.35), transparent)' }} />
        </div>
        <p style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: '1.05rem',
          fontStyle: 'italic',
          color: 'var(--text-secondary)',
          lineHeight: 1.8,
          marginBottom: '3rem',
        }}>
          Sempre que precisar, volte aqui. Esse espaço é seu.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            to="/loja"
            style={{
              textDecoration: 'none',
              padding: '0.9rem 2.5rem',
              background: 'linear-gradient(135deg, #C9A84A, #C4A33A)',
              color: '#1E1035',
              fontFamily: "'Raleway', sans-serif",
              fontSize: '0.72rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              borderRadius: '1px',
              fontWeight: 500,
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.18)',
              transition: 'opacity 0.2s ease, box-shadow 0.2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.28), 0 0 20px rgba(201,168,74,0.3)' }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.18)' }}
          >
            Ver a Loja
          </Link>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: 'none',
              padding: '0.9rem 2.5rem',
              background: 'transparent',
              border: '1px solid #C9A84A',
              color: '#C9A84A',
              fontFamily: "'Raleway', sans-serif",
              fontSize: '0.72rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              borderRadius: '1px',
            }}
          >
            Pedir pelo WhatsApp
          </a>
        </div>
      </div>
    </PhaseShell>
  )
}

// ── Controlador principal ──────────────────────────────────────
function RitualContent({ collection }) {
  const [phase, setPhase] = useState(0)
  const [fading, setFading] = useState(false)
  const [muted, setMuted] = useState(false)
  const audioRef = useRef(null)

  const fadeInAudio = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = 0
    const interval = setInterval(() => {
      if (!audio) { clearInterval(interval); return }
      if (audio.volume < 0.45) {
        audio.volume = Math.min(audio.volume + 0.05, 0.5)
      } else {
        audio.volume = 0.5
        clearInterval(interval)
      }
    }, 300)
  }, [])

  const goTo = useCallback((next) => {
    setFading(true)
    setTimeout(() => {
      setPhase(next)
      setFading(false)
    }, 700)
  }, [])

  const handleEntrar = useCallback(() => {
    const audio = audioRef.current
    if (audio) {
      audio.play().then(fadeInAudio).catch(() => {})
    }
    goTo(1)
  }, [goTo, fadeInAudio])

  const toggleMute = useCallback(() => {
    if (audioRef.current) audioRef.current.muted = !muted
    setMuted(m => !m)
  }, [muted])

  const src = AUDIO_MAP[collection?.id] || '/audio/serenidade.mp3'

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100vh',
      height: '100dvh',
      backgroundColor: 'var(--bg-section-main)',
      overflow: 'hidden',
      paddingTop: '70px',
      paddingBottom: 'env(safe-area-inset-bottom)',
      boxSizing: 'border-box',
    }}>
      <audio ref={audioRef} src={src} loop preload="auto" />
      <MuteButton muted={muted} onToggle={toggleMute} />
      <ProgressDots phase={phase} />

      <div style={{
        position: 'relative',
        width: '100%',
        height: 'calc(100dvh - 70px)',
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.7s ease',
      }}>
        {phase === 0 && <PhaseEntrada onNext={handleEntrar} />}
        {phase === 1 && <PhaseRespira onNext={() => goTo(2)} />}
        {phase === 2 && <PhaseRespiracao onNext={() => goTo(3)} />}
        {phase === 3 && <PhaseAcalanto onNext={() => goTo(4)} />}
        {phase === 4 && <PhaseOracle collection={collection} onNext={() => goTo(5)} />}
        {phase === 5 && <PhaseEncerramento collection={collection} />}
      </div>

      <style>{`
        @keyframes breathe {
          0%, 100% { opacity: 0.4; transform: translate(-50%, -50%) scale(1); }
          50%       { opacity: 1;   transform: translate(-50%, -50%) scale(1.5); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

export default function Ritual() {
  return (
    <PasswordGate>
      {(unlockedCollection) => (
        <RitualContent collection={unlockedCollection} />
      )}
    </PasswordGate>
  )
}

