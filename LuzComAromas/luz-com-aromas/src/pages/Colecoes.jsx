import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { collections } from '../data/collections'

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `${r}, ${g}, ${b}`
}

function CollectionCard({ col, index }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.12 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const aromas = col.description.split('·').map(s => s.trim()).filter(Boolean)

  const waText = encodeURIComponent(
    `Olá! Tenho interesse em encomendar a coleção *${col.name}* — ${col.description}. Poderia me passar mais informações? 🕯️`
  )
  const waUrl = `https://wa.me/5541988427128?text=${waText}`

  return (
    <div
      ref={ref}
      onClick={() => setOpen(o => !o)}
      style={{
        borderRadius: '3px',
        overflow: 'hidden',
        border: `1px solid rgba(${hexToRgb(col.color)}, ${open ? 0.65 : 0.25})`,
        boxShadow: open
          ? `0 28px 70px rgba(${hexToRgb(col.color)}, 0.2), 0 4px 20px rgba(0,0,0,0.35)`
          : '0 4px 20px rgba(0,0,0,0.18)',
        transform: visible ? 'translateY(0)' : 'translateY(36px)',
        opacity: visible ? 1 : 0,
        transition: `
          transform 0.6s ease ${index * 0.12}s,
          opacity  0.7s ease ${index * 0.12}s,
          box-shadow 0.5s ease,
          border-color 0.5s ease
        `,
        cursor: 'pointer',
      }}
    >
      {/* ── Bloco fechado — sempre visível ────────────────────── */}
      <div style={{
        background: `linear-gradient(160deg,
          rgba(${hexToRgb(col.color)}, ${open ? 0.28 : 0.16}) 0%,
          rgba(${hexToRgb(col.softColor)}, ${open ? 0.18 : 0.10}) 100%)`,
        padding: '2.5rem 2rem 2.25rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        position: 'relative',
        transition: 'background 0.6s ease',
      }}>
        {/* Ritual badge */}
        <span style={{
          position: 'absolute',
          top: '1.25rem',
          right: '1.25rem',
          fontFamily: "'Raleway', sans-serif",
          fontSize: '0.55rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: col.color,
          border: `1px solid rgba(${hexToRgb(col.color)}, 0.35)`,
          padding: '0.18rem 0.5rem',
          borderRadius: '1px',
          opacity: 0.8,
        }}>
          {col.ritual}
        </span>

        {/* Ícone */}
        <div style={{
          color: col.color,
          marginBottom: '1.5rem',
          filter: open
            ? `drop-shadow(0 0 16px rgba(${hexToRgb(col.color)}, 0.6))`
            : 'none',
          transform: open ? 'scale(1.08)' : 'scale(1)',
          transition: 'filter 0.6s ease, transform 0.6s ease',
        }}>
          {col.icon}
        </div>

        {/* Nome */}
        <h2 style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 'clamp(1.9rem, 3vw, 2.6rem)',
          fontWeight: 300,
          color: 'var(--text-primary)',
          letterSpacing: '0.05em',
          lineHeight: 1.1,
          margin: 0,
        }}>
          {col.name}
        </h2>

        {/* Subtítulo */}
        <span style={{
          fontFamily: "'Raleway', sans-serif",
          fontSize: '0.6rem',
          letterSpacing: '0.35em',
          textTransform: 'uppercase',
          color: col.color,
          opacity: 0.75,
          marginTop: '0.5rem',
        }}>
          {col.subtitle}
        </span>

        {/* Convite a abrir */}
        <span style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: '0.85rem',
          fontStyle: 'italic',
          color: 'var(--text-muted)',
          marginTop: '1.75rem',
          letterSpacing: '0.02em',
          transition: 'opacity 0.4s ease',
          opacity: open ? 0 : 1,
        }}>
          {col.microcopy} ↓
        </span>
      </div>

      {/* ── Bloco revelado — abre devagar ─────────────────────── */}
      <div style={{
        display: 'grid',
        gridTemplateRows: open ? '1fr' : '0fr',
        transition: 'grid-template-rows 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
      }}>
        <div style={{ overflow: 'hidden' }}>
          <div style={{
            background: 'rgba(10, 4, 26, 0.82)',
            borderTop: `1px solid rgba(${hexToRgb(col.color)}, 0.2)`,
            padding: '2rem 2rem 2.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
            opacity: open ? 1 : 0,
            transform: open ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.5s ease 0.15s, transform 0.5s ease 0.15s',
          }}>

            {/* Frase emocional */}
            <p style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
              fontStyle: 'italic',
              fontWeight: 300,
              color: col.color,
              lineHeight: 1.65,
              margin: 0,
            }}>
              {col.tagline}
            </p>

            {/* Descrição sensorial */}
            <p style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: '0.75rem',
              lineHeight: 1.8,
              color: 'var(--text-muted)',
              fontWeight: 300,
              margin: 0,
            }}>
              {col.taglineDesc}
            </p>

            {/* Notas aromáticas */}
            <div style={{
              display: 'flex',
              gap: '1.5rem',
              flexWrap: 'wrap',
              paddingTop: '0.25rem',
            }}>
              {aromas.map((aroma, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: col.color,
                    opacity: 1 - i * 0.2,
                    flexShrink: 0,
                  }} />
                  <span style={{
                    fontFamily: "'Raleway', sans-serif",
                    fontSize: '0.65rem',
                    letterSpacing: '0.06em',
                    color: 'var(--text-muted)',
                  }}>
                    {aroma}
                  </span>
                </div>
              ))}
            </div>

            {/* Momento de uso */}
            <div style={{
              paddingTop: '1rem',
              borderTop: `1px solid rgba(${hexToRgb(col.color)}, 0.12)`,
              display: 'flex',
              gap: '0.75rem',
              alignItems: 'flex-start',
              flexWrap: 'wrap',
            }}>
              <span style={{
                fontFamily: "'Raleway', sans-serif",
                fontSize: '0.58rem',
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: col.color,
                opacity: 0.6,
                flexShrink: 0,
                paddingTop: '0.1rem',
              }}>
                Ideal para
              </span>
              <span style={{
                fontFamily: "'Raleway', sans-serif",
                fontSize: '0.68rem',
                color: 'var(--text-muted)',
                lineHeight: 1.5,
              }}>
                {col.momentoDeUso}
              </span>
            </div>

            {/* CTA */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.25rem' }}>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                style={{
                  textDecoration: 'none',
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: '0.65rem',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: '#1E1035',
                  background: col.color,
                  padding: '0.65rem 1.5rem',
                  borderRadius: '1px',
                  transition: 'opacity 0.3s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '0.8' }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
              >
                Pedir pelo WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Colecoes() {
  const headerRef = useRef(null)
  const [headerVisible, setHeaderVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setHeaderVisible(true) },
      { threshold: 0.2 }
    )
    if (headerRef.current) observer.observe(headerRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div style={{ paddingTop: '64px', backgroundColor: 'var(--bg-section-main)', minHeight: '100vh' }}>
      <section style={{ padding: 'clamp(6rem, 10vw, 10rem) clamp(1.5rem, 5vw, 4rem)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

          {/* Header */}
          <div
            ref={headerRef}
            style={{
              textAlign: 'center',
              marginBottom: 'clamp(3.5rem, 7vw, 6rem)',
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? 'translateY(0)' : 'translateY(24px)',
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
              marginBottom: '1rem',
            }}>
              O Nosso Universo
            </span>
            <h1 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
              fontWeight: 300,
              color: 'var(--text-primary)',
              lineHeight: 1.2,
              letterSpacing: '0.03em',
              marginBottom: '1.5rem',
            }}>
              As Coleções
            </h1>
            <div className="section-divider" style={{ marginBottom: '1.5rem' }} />
            <p style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: '0.9rem',
              lineHeight: 1.9,
              color: 'var(--text-muted)',
              fontWeight: 300,
              maxWidth: '460px',
              margin: '0 auto',
            }}>
              Toque em uma coleção para descobrir sua essência.
            </p>
          </div>

          {/* Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1.75rem',
          }}>
            {collections.map((col, i) => (
              <CollectionCard key={col.id} col={col} index={i} />
            ))}
          </div>

          {/* Rodapé */}
          <div style={{
            textAlign: 'center',
            marginTop: 'clamp(3rem, 6vw, 5rem)',
            paddingTop: '2.5rem',
            borderTop: '1px solid var(--border-subtle)',
          }}>
            <p style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: '1rem',
              fontStyle: 'italic',
              color: 'var(--text-faint)',
              marginBottom: '1.5rem',
            }}>
              Todas as velas são artesanais e produzidas sob encomenda.
            </p>
            <Link
              to="/loja"
              style={{
                textDecoration: 'none',
                fontFamily: "'Raleway', sans-serif",
                fontSize: '0.7rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: '#C9A84A',
                border: '1px solid rgba(201,168,74,0.45)',
                padding: '0.8rem 2rem',
                borderRadius: '1px',
                display: 'inline-block',
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
              Ver Loja Completa
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

