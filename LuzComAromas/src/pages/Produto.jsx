import { useParams, Link, useNavigate } from 'react-router-dom'
import { getProductById, getProductsByCollection } from '../data/products'
import { collections } from '../data/collections'
import { cares } from '../data/care'
import { useCart } from '../context/CartContext'
import { useState } from 'react'

const WHATSAPP_NUMBER = '5541988427128'

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `${r}, ${g}, ${b}`
}

function NoteRow({ label, value, color }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', padding: '0.75rem 0', borderBottom: `1px solid rgba(${hexToRgb(color)}, 0.15)` }}>
      <span style={{
        fontFamily: "'Raleway', sans-serif",
        fontSize: '0.58rem',
        letterSpacing: '0.4em',
        textTransform: 'uppercase',
        color: color,
        opacity: 0.7,
        minWidth: '72px',
        flexShrink: 0,
      }}>
        {label}
      </span>
      <span style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontSize: '1rem',
        fontStyle: 'italic',
        color: 'var(--text-secondary)',
        lineHeight: 1.5,
      }}>
        {value}
      </span>
    </div>
  )
}

function SpecItem({ label, value }) {
  return (
    <div style={{
      padding: '0.75rem',
      border: '1px solid var(--border-subtle)',
      borderRadius: '2px',
      textAlign: 'center',
    }}>
      <span style={{
        display: 'block',
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontSize: '1.2rem',
        fontWeight: 400,
        color: 'var(--text-primary)',
        marginBottom: '0.2rem',
      }}>
        {value}
      </span>
      <span style={{
        fontFamily: "'Raleway', sans-serif",
        fontSize: '0.58rem',
        letterSpacing: '0.25em',
        textTransform: 'uppercase',
        color: 'var(--text-muted)',
      }}>
        {label}
      </span>
    </div>
  )
}

export default function Produto() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const product = getProductById(id)

  if (!product) {
    return (
      <div style={{ paddingTop: '70px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', color: 'var(--text-primary)', fontStyle: 'italic' }}>
            Vela não encontrada.
          </p>
          <Link to="/loja" style={{ color: '#C9A84A', fontFamily: "'Raleway', sans-serif", fontSize: '0.75rem', letterSpacing: '0.3em', textTransform: 'uppercase' }}>
            Voltar à loja
          </Link>
        </div>
      </div>
    )
  }

  const collection = collections.find((c) => c.id === product.collectionId)
  const color = collection?.color || '#C9A84A'
  const relatedProducts = getProductsByCollection(product.collectionId).filter((p) => p.id !== product.id)

  const waText = encodeURIComponent(
    `Olá! Tenho interesse em encomendar a vela *${product.name}* — ${collection?.name || ''} (${product.price}). Poderia confirmar a disponibilidade? 🕯️`
  )

  const handleAddToCart = () => {
    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div style={{ paddingTop: '70px', backgroundColor: 'rgba(18, 8, 40, 0.95)', minHeight: '100vh' }}>

      {/* Breadcrumb */}
      <div style={{ padding: '1.5rem clamp(1.5rem, 5vw, 4rem)', borderBottom: '1px solid var(--border-subtle)', maxWidth: '1200px', margin: '0 auto' }}>
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {[{ to: '/', label: 'Home' }, { to: '/loja', label: 'Loja' }].map(({ to, label }) => (
            <span key={to} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Link to={to} style={{ fontFamily: "'Raleway', sans-serif", fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', textDecoration: 'none' }}
                onMouseEnter={e => e.currentTarget.style.color = '#C9A84A'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
              >{label}</Link>
              <span style={{ color: 'var(--text-faint)', fontSize: '0.6rem' }}>·</span>
            </span>
          ))}
          <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: color }}>{product.name}</span>
        </nav>
      </div>

      {/* Hero */}
      <section style={{ padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 5vw, 4rem)', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 6vw, 5rem)' }}>
          {product.badge && (
            <span style={{
              display: 'inline-block',
              fontFamily: "'Raleway', sans-serif",
              fontSize: '0.58rem',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: color,
              border: `1px solid rgba(${hexToRgb(color)}, 0.5)`,
              padding: '0.25rem 0.8rem',
              borderRadius: '1px',
              marginBottom: '1.25rem',
            }}>
              {product.badge}
            </span>
          )}
          <h1 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 300,
            color: 'var(--text-primary)',
            letterSpacing: '0.04em',
            lineHeight: 1.2,
            marginBottom: '0.6rem',
          }}>
            {product.name}
          </h1>
          <span style={{
            fontFamily: "'Raleway', sans-serif",
            fontSize: '0.65rem',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: color,
            opacity: 0.85,
          }}>
            Coleção {collection?.name}
          </span>
          {product.tagline && (
            <p style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
              fontStyle: 'italic',
              color: 'var(--text-secondary)',
              marginTop: '1rem',
              lineHeight: 1.6,
            }}>
              {product.tagline}
            </p>
          )}
        </div>

        {/* Corpo: 2 colunas */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'clamp(2rem, 4vw, 4rem)',
          alignItems: 'start',
        }}>
          {/* Coluna esquerda: ícone + notas */}
          <div>
            <div style={{ color: color, display: 'flex', justifyContent: 'center', marginBottom: '2.5rem', filter: `drop-shadow(0 0 20px rgba(${hexToRgb(color)}, 0.35))` }}>
              {collection?.icon && <div style={{ transform: 'scale(1.3)' }}>{collection.icon}</div>}
            </div>

            <div style={{ marginBottom: '0.75rem' }}>
              <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: '0.6rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: color, opacity: 0.7 }}>
                Notas Aromáticas
              </span>
            </div>
            <div style={{ width: '40px', height: '1px', background: `linear-gradient(90deg, ${color}, transparent)`, marginBottom: '0.5rem' }} />

            <NoteRow label="Topo" value={product.notes.top} color={color} />
            <NoteRow label="Coração" value={product.notes.heart} color={color} />
            <NoteRow label="Base" value={product.notes.base} color={color} />

            {product.description && (
              <p style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: '1rem',
                lineHeight: 1.85,
                color: 'var(--text-secondary)',
                fontWeight: 300,
                marginTop: '2rem',
                fontStyle: 'italic',
              }}>
                {product.description}
              </p>
            )}
          </div>

          {/* Coluna direita: preço + specs + CTAs */}
          <div style={{
            padding: 'clamp(1.5rem, 3vw, 2.5rem)',
            border: `1px solid rgba(${hexToRgb(color)}, 0.25)`,
            borderRadius: '2px',
            background: `rgba(${hexToRgb(color)}, 0.04)`,
            display: 'flex',
            flexDirection: 'column',
            gap: '1.75rem',
          }}>
            {/* Preço */}
            <div>
              <span style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(2.2rem, 4vw, 3rem)',
                fontWeight: 300,
                color: color,
                letterSpacing: '0.02em',
              }}>
                {product.price}
              </span>
              <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-faint)', marginLeft: '0.75rem' }}>
                por unidade
              </span>
            </div>

            {/* Specs */}
            <div>
              <span style={{ display: 'block', fontFamily: "'Raleway', sans-serif", fontSize: '0.58rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                Especificações
              </span>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                <SpecItem label="Queima" value={product.specs.burn} />
                <SpecItem label="Peso" value={product.specs.weight} />
                <SpecItem label="Cera" value={product.specs.wax} />
                <SpecItem label="Pavio" value={product.specs.wick} />
              </div>
            </div>

            {/* Embalagem */}
            {product.packaging && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.75rem',
                background: 'rgba(90, 158, 122, 0.08)',
                border: '1px solid rgba(90, 158, 122, 0.2)',
                borderRadius: '2px',
              }}>
                <svg viewBox="0 0 24 24" fill="none" width="14" height="14" stroke="#5A9E7A" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: '0.65rem', letterSpacing: '0.1em', color: '#5A9E7A' }}>
                  {product.packaging}
                </span>
              </div>
            )}

            {/* CTAs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button
                onClick={handleAddToCart}
                style={{
                  padding: '0.9rem 1.5rem',
                  background: added ? 'rgba(90,158,122,0.9)' : color,
                  border: 'none',
                  color: '#1E1035',
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: '0.72rem',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  borderRadius: '1px',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={e => { if (!added) e.currentTarget.style.opacity = '0.85' }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
              >
                {added ? '✓ Adicionado' : 'Adicionar ao Ritual'}
              </button>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.9rem 1.5rem',
                  background: 'transparent',
                  border: `1px solid rgba(${hexToRgb(color)}, 0.5)`,
                  color: color,
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: '0.72rem',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  borderRadius: '1px',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = `rgba(${hexToRgb(color)}, 0.1)` }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Encomendar via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Seção: Como cuidar (3 primeiros) */}
      <section style={{ padding: 'clamp(3rem, 5vw, 5rem) clamp(1.5rem, 5vw, 4rem)', borderTop: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-section-dark)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: '0.65rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#C9A84A', display: 'block', marginBottom: '0.75rem' }}>
              Cuidado
            </span>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 300, color: 'var(--text-primary)', margin: 0 }}>
              Como cuidar da sua chama
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
            {cares.slice(0, 3).map((care) => (
              <div key={care.title} style={{ padding: '1.5rem', border: '1px solid rgba(212,184,74,0.12)', borderRadius: '2px', textAlign: 'center' }}>
                <div style={{ color: '#C9A84A', display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>{care.icon}</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem', fontWeight: 400, color: 'var(--text-primary)', margin: '0 0 0.5rem' }}>{care.title}</h3>
                <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: '0.75rem', lineHeight: 1.7, color: 'var(--text-muted)', margin: 0 }}>{care.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center' }}>
            <Link to="/ritual" style={{ fontFamily: "'Raleway', sans-serif", fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C9A84A', textDecoration: 'none', borderBottom: '1px solid rgba(201,168,74,0.4)', paddingBottom: '2px' }}>
              Ver o manual completo do ritual →
            </Link>
          </div>
        </div>
      </section>

      {/* Seção: Da mesma coleção */}
      {relatedProducts.length > 0 && (
        <section style={{ padding: 'clamp(3rem, 5vw, 5rem) clamp(1.5rem, 5vw, 4rem)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: '0.65rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: color, display: 'block', marginBottom: '0.75rem', opacity: 0.8 }}>
                Coleção {collection?.name}
              </span>
              <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 300, color: 'var(--text-primary)', margin: 0 }}>
                Da mesma coleção
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
              {relatedProducts.map((p) => (
                <div
                  key={p.id}
                  onClick={() => navigate(`/produto/${p.id}`)}
                  style={{
                    border: `1px solid rgba(${hexToRgb(color)}, 0.2)`,
                    borderRadius: '2px',
                    padding: '1.5rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    textAlign: 'center',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = color; e.currentTarget.style.transform = 'translateY(-3px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = `rgba(${hexToRgb(color)}, 0.2)`; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem', fontWeight: 400, color: 'var(--text-primary)', margin: '0 0 0.4rem' }}>{p.name}</h3>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.95rem', fontStyle: 'italic', color: color }}>{p.price}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

