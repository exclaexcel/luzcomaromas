import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { products } from '../data/products'
import { collections } from '../data/collections'
import { useCart } from '../context/CartContext'
import CartButton from '../components/CartButton'
import CartModal from '../components/CartModal'

const WHATSAPP_NUMBER = '5541988427128'

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `${r}, ${g}, ${b}`
}

function ProductCard({ product }) {
  const navigate = useNavigate()
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const collection = collections.find((c) => c.id === product.collectionId)
  const color = collection?.color || '#C9A84A'
  const softColor = collection?.softColor || '#C9A84A'

  const waText = encodeURIComponent(
    `Olá! Tenho interesse em encomendar a vela *${product.name}* — ${collection?.name || ''} (${product.price}). Poderia me passar mais informações? 🕯️`
  )

  const handleAdd = () => {
    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div
      style={{
        border: `1px solid rgba(${hexToRgb(color)}, 0.30)`,
        borderRadius: '2px',
        padding: 'clamp(1.5rem, 3vw, 2rem)',
        background: `rgba(${hexToRgb(softColor)}, 0.07)`,
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
        transition: 'all 0.4s ease',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = color
        e.currentTarget.style.boxShadow = `0 16px 50px rgba(${hexToRgb(color)}, 0.15)`
        e.currentTarget.style.transform = 'translateY(-4px)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = `rgba(${hexToRgb(color)}, 0.30)`
        e.currentTarget.style.boxShadow = 'none'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      {/* Badge */}
      {product.badge && (
        <span style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          fontFamily: "'Raleway', sans-serif",
          fontSize: '0.58rem',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: color,
          border: `1px solid rgba(${hexToRgb(color)}, 0.4)`,
          padding: '0.2rem 0.5rem',
          borderRadius: '1px',
        }}>
          {product.badge}
        </span>
      )}

      {/* Ícone da coleção */}
      <div style={{ color: color, display: 'flex', justifyContent: 'center' }}>
        {collection?.icon}
      </div>

      {/* Nome + coleção */}
      <div style={{ textAlign: 'center' }}>
        <h2 style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 'clamp(1.4rem, 2.2vw, 1.8rem)',
          fontWeight: 400,
          color: 'var(--text-primary)',
          letterSpacing: '0.04em',
          marginBottom: '0.3rem',
        }}>
          {product.name}
        </h2>
        <span style={{
          fontFamily: "'Raleway', sans-serif",
          fontSize: '0.6rem',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: color,
          opacity: 0.8,
        }}>
          {collection?.name} · {collection?.subtitle}
        </span>
      </div>

      {/* Divisor */}
      <div style={{ width: '40px', height: '1px', background: `linear-gradient(90deg, transparent, ${color}, transparent)`, margin: '0 auto', opacity: 0.6 }} />

      {/* Notas aromáticas compactas */}
      <div style={{ textAlign: 'center' }}>
        {[
          { label: 'T', value: product.notes.top },
          { label: 'C', value: product.notes.heart },
          { label: 'B', value: product.notes.base },
        ].map(({ label, value }) => (
          <p key={label} style={{
            fontFamily: "'Raleway', sans-serif",
            fontSize: '0.65rem',
            letterSpacing: '0.06em',
            color: 'var(--text-muted)',
            margin: '0.2rem 0',
            fontWeight: 300,
          }}>
            <span style={{ color: color, opacity: 0.7, marginRight: '0.4rem' }}>{label}</span>
            {value}
          </p>
        ))}
      </div>

      {/* Preço */}
      <div style={{ textAlign: 'center' }}>
        <span style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: '1.4rem',
          fontStyle: 'italic',
          color: color,
          letterSpacing: '0.02em',
        }}>
          {product.price}
        </span>
      </div>

      {/* CTAs */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: 'auto' }}>
        <button
          onClick={() => navigate(`/produto/${product.id}`)}
          style={{
            padding: '0.7rem 1rem',
            background: 'transparent',
            border: `1px solid rgba(${hexToRgb(color)}, 0.5)`,
            color: color,
            fontFamily: "'Raleway', sans-serif",
            fontSize: '0.65rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            borderRadius: '1px',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = `rgba(${hexToRgb(color)}, 0.1)` }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
        >
          Ver detalhes
        </button>

        <button
          onClick={handleAdd}
          style={{
            padding: '0.7rem 1rem',
            background: added ? 'rgba(90,158,122,0.85)' : color,
            border: 'none',
            color: '#1E1035',
            fontFamily: "'Raleway', sans-serif",
            fontSize: '0.65rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            borderRadius: '1px',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={e => { if (!added) e.currentTarget.style.opacity = '0.85' }}
          onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
        >
          {added ? '✓ Adicionado' : 'Adicionar'}
        </button>

        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.4rem',
            textDecoration: 'none',
            padding: '0.7rem 1rem',
            background: 'transparent',
            color: 'var(--text-muted)',
            fontFamily: "'Raleway', sans-serif",
            fontSize: '0.62rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            borderRadius: '1px',
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)' }}
          onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)' }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
          WhatsApp
        </a>
      </div>
    </div>
  )
}

const FILTERS = [
  { id: 'todas', label: 'Todas' },
  { id: 'serenidade', label: 'Serenidade' },
  { id: 'energia', label: 'Energia' },
  { id: 'intuicao', label: 'Intuição' },
  { id: 'purificacao', label: 'Purificação' },
]

export default function Loja() {
  const navigate = useNavigate()
  const [selectedCollection, setSelectedCollection] = useState('todas')
  const [cartOpen, setCartOpen] = useState(false)

  const filtered = selectedCollection === 'todas'
    ? products
    : products.filter((p) => p.collectionId === selectedCollection)

  const activeColor = selectedCollection !== 'todas'
    ? collections.find((c) => c.id === selectedCollection)?.color
    : '#C9A84A'

  return (
    <div style={{ paddingTop: '70px', backgroundColor: 'rgba(18, 8, 40, 0.95)', minHeight: '100vh' }}>
      {cartOpen && <CartModal onClose={() => setCartOpen(false)} />}

      {/* Quiz Teaser */}
      <section
        style={{
          padding: 'clamp(3rem, 7vw, 5rem) clamp(1.5rem, 5vw, 4rem)',
          borderBottom: '1px solid var(--border-gold)',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 'clamp(1.5rem, 3vw, 3rem)',
            }}
          >
            <div>
              <h3
                style={{
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: 'clamp(0.7rem, 2vw, 0.85rem)',
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  color: '#C9A84A',
                  marginBottom: '0.5rem',
                }}
              >
                Não sabe por onde começar?
              </h3>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
                  fontStyle: 'italic',
                  color: 'var(--text-secondary)',
                  maxWidth: '400px',
                }}
              >
                Descubra o ritual que acompanha o seu momento agora.
              </p>
            </div>
            <button
              onClick={() => navigate('/quiz')}
              style={{
                padding: 'clamp(0.75rem, 1.5vw, 0.9rem) clamp(1.5rem, 3vw, 2.5rem)',
                background: 'transparent',
                border: '1px solid #C9A84A',
                color: '#C9A84A',
                fontFamily: "'Raleway', sans-serif",
                fontSize: 'clamp(0.75rem, 1.5vw, 0.85rem)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                borderRadius: '1px',
                fontWeight: 600,
                transition: 'all 0.3s ease',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#C9A84A'
                e.currentTarget.style.color = '#1E1035'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = '#C9A84A'
              }}
            >
              Descobrir meu ritual
            </button>
          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 6vw, 5rem)' }}>
            <span style={{
              display: 'block',
              fontFamily: "'Raleway', sans-serif",
              fontSize: '0.7rem',
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              color: '#C9A84A',
              marginBottom: '1rem',
            }}>
              As Nossas Criações
            </span>
            <h1 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
              fontWeight: 300,
              color: 'var(--text-primary)',
              lineHeight: 1.2,
              letterSpacing: '0.03em',
              marginBottom: '0.75rem',
            }}>
              Escolha seu aroma
            </h1>
            <p style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: '0.65rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'var(--text-faint)',
              marginBottom: '1.5rem',
            }}>
              Intencione · Sinta · Energize
            </p>
            <div className="section-divider" style={{ marginBottom: '1.5rem' }} />
            <p style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: '0.9rem',
              lineHeight: 1.9,
              color: 'var(--text-secondary)',
              fontWeight: 300,
              maxWidth: '480px',
              margin: '0 auto',
            }}>
              Velas artesanais feitas com intenção, uma a uma. Cada encomenda é única — entre em contato e vamos criar juntos seu momento.
            </p>
          </div>

          {/* Filtros + CartButton */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '2.5rem',
          }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {FILTERS.map(({ id, label }) => {
                const col = collections.find((c) => c.id === id)
                const btnColor = col?.color || '#C9A84A'
                const isActive = selectedCollection === id
                return (
                  <button
                    key={id}
                    onClick={() => setSelectedCollection(id)}
                    style={{
                      padding: '0.5rem 1rem',
                      background: isActive ? (id === 'todas' ? '#C9A84A' : btnColor) : 'transparent',
                      border: `1px solid ${isActive ? (id === 'todas' ? '#C9A84A' : btnColor) : 'var(--border-light)'}`,
                      color: isActive ? '#1E1035' : 'var(--text-muted)',
                      fontFamily: "'Raleway', sans-serif",
                      fontSize: '0.65rem',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      borderRadius: '1px',
                      transition: 'all 0.25s ease',
                    }}
                    onMouseEnter={e => { if (!isActive) { e.currentTarget.style.borderColor = id === 'todas' ? '#C9A84A' : btnColor; e.currentTarget.style.color = id === 'todas' ? '#C9A84A' : btnColor }}}
                    onMouseLeave={e => { if (!isActive) { e.currentTarget.style.borderColor = 'var(--border-light)'; e.currentTarget.style.color = 'var(--text-muted)' }}}
                  >
                    {label}
                  </button>
                )
              })}
            </div>
            <CartButton onClick={() => setCartOpen(true)} />
          </div>

          {/* Grid de produtos */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.75rem',
          }}>
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Nota de rodapé */}
          <div style={{
            textAlign: 'center',
            marginTop: '4rem',
            padding: '2rem',
            borderTop: '1px solid var(--border-subtle)',
          }}>
            <p style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: '1rem',
              fontStyle: 'italic',
              color: 'var(--text-faint)',
              lineHeight: 1.8,
            }}>
              Todas as velas são produzidas sob encomenda, com ingredientes de origem natural e entregues com cuidado. · Prazo a confirmar no momento do pedido.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

