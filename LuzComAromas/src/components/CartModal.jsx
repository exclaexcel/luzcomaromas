import { useEffect, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useCart } from '../context/CartContext'
import { collections } from '../data/collections'

const WHATSAPP_NUMBER = '5541988427128'

function buildWhatsAppMessage(items, total) {
  const lines = items.map(
    (item) => `• ${item.name} (x${item.quantity}) — ${(item.priceValue * item.quantity).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`
  )
  return encodeURIComponent(
    `Olá! Gostaria de encomendar:\n\n${lines.join('\n')}\n\nTotal: ${total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}\n\nPoderia confirmar a disponibilidade? 🕯️`
  )
}

export default function CartModal({ onClose }) {
  const { items, removeItem, updateQuantity, clearCart, total } = useCart()
  const closeButtonRef = useRef(null)
  const previousFocusRef = useRef(null)

  useEffect(() => {
    previousFocusRef.current = document.activeElement
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
      previousFocusRef.current?.focus()
    }
  }, [onClose])

  const handleWhatsApp = useCallback(() => {
    const msg = buildWhatsAppMessage(items, total)
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank', 'noopener,noreferrer')
  }, [items, total])

  const getCollectionColor = (collectionId) => {
    const col = collections.find((c) => c.id === collectionId)
    return col?.color || '#C9A84A'
  }

  return createPortal(
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        backgroundColor: 'rgba(10, 5, 20, 0.75)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Carrinho de compras"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 'min(420px, 95vw)',
          height: '100%',
          background: 'rgba(18, 8, 40, 0.98)',
          borderLeft: '1px solid rgba(212, 184, 74, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          animation: 'slideInRight 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '2rem 1.75rem 1.5rem',
          borderBottom: '1px solid rgba(212, 184, 74, 0.12)',
        }}>
          <div>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: '1.6rem',
              fontWeight: 300,
              color: 'var(--text-primary)',
              margin: 0,
              letterSpacing: '0.04em',
            }}>
              Seu Ritual
            </h2>
            <span style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: '0.6rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
            }}>
              {items.length === 0 ? 'vazio' : `${items.reduce((s, i) => s + i.quantity, 0)} peças`}
            </span>
          </div>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Fechar carrinho"
            style={{
              width: '32px',
              height: '32px',
              background: 'transparent',
              border: '1px solid var(--text-faint)',
              borderRadius: '50%',
              cursor: 'pointer',
              color: 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#C9A84A'; e.currentTarget.style.color = '#C9A84A' }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--text-faint)'; e.currentTarget.style.color = 'var(--text-secondary)' }}
          >
            <svg viewBox="0 0 24 24" fill="none" width="14" height="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Lista de itens */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem 1.75rem' }}>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', paddingTop: '4rem' }}>
              <svg viewBox="0 0 60 60" fill="none" width="48" height="48" style={{ margin: '0 auto 1.5rem', display: 'block', opacity: 0.2 }}>
                <path d="M30 52 C30 52 14 40 14 26 C14 16 21 10 30 10 C39 10 46 16 46 26 C46 40 30 52 30 52Z" stroke="#C9A84A" strokeWidth="1.5" fill="none"/>
                <line x1="30" y1="10" x2="30" y2="4" stroke="#C9A84A" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <p style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: '1.1rem',
                fontStyle: 'italic',
                color: 'var(--text-faint)',
                margin: 0,
              }}>
                Nenhuma vela escolhida ainda.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {items.map((item) => {
                const color = getCollectionColor(item.collectionId)
                return (
                  <div
                    key={item.id}
                    style={{
                      display: 'flex',
                      gap: '1rem',
                      alignItems: 'center',
                      padding: '1rem',
                      border: `1px solid rgba(${hexToRgb(color)}, 0.2)`,
                      borderRadius: '2px',
                      background: `rgba(${hexToRgb(color)}, 0.05)`,
                    }}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontSize: '1rem',
                        color: 'var(--text-primary)',
                        margin: '0 0 0.2rem',
                        letterSpacing: '0.02em',
                      }}>
                        {item.name}
                      </p>
                      <p style={{
                        fontFamily: "'Raleway', sans-serif",
                        fontSize: '0.65rem',
                        color: color,
                        margin: 0,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                      }}>
                        {item.price}
                      </p>
                    </div>

                    {/* Quantidade */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <QuantityBtn onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</QuantityBtn>
                      <span style={{
                        fontFamily: "'Raleway', sans-serif",
                        fontSize: '0.8rem',
                        color: 'var(--text-primary)',
                        minWidth: '20px',
                        textAlign: 'center',
                      }}>
                        {item.quantity}
                      </span>
                      <QuantityBtn onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</QuantityBtn>
                    </div>

                    {/* Remover */}
                    <button
                      onClick={() => removeItem(item.id)}
                      aria-label={`Remover ${item.name}`}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        color: 'var(--text-faint)',
                        padding: '0.25rem',
                        transition: 'color 0.2s ease',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = '#9A6A8D' }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-faint)' }}
                    >
                      <svg viewBox="0 0 24 24" fill="none" width="14" height="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                        <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6M14 11v6" />
                      </svg>
                    </button>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div style={{
            padding: '1.5rem 1.75rem 2rem',
            borderTop: '1px solid rgba(212, 184, 74, 0.12)',
          }}>
            {/* Total */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              marginBottom: '1.5rem',
            }}>
              <span style={{
                fontFamily: "'Raleway', sans-serif",
                fontSize: '0.65rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
              }}>
                Total estimado
              </span>
              <span style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: '1.6rem',
                fontWeight: 400,
                color: '#C9A84A',
                letterSpacing: '0.02em',
              }}>
                {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </span>
            </div>

            {/* Botão principal */}
            <button
              onClick={handleWhatsApp}
              style={{
                width: '100%',
                padding: '0.9rem',
                background: '#C9A84A',
                border: 'none',
                color: '#1E1035',
                fontFamily: "'Raleway', sans-serif",
                fontSize: '0.72rem',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                borderRadius: '1px',
                marginBottom: '0.75rem',
                transition: 'opacity 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.85' }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Finalizar via WhatsApp
            </button>

            {/* Limpar carrinho */}
            <button
              onClick={clearCart}
              style={{
                width: '100%',
                padding: '0.6rem',
                background: 'transparent',
                border: '1px solid var(--border-light)',
                color: 'var(--text-muted)',
                fontFamily: "'Raleway', sans-serif",
                fontSize: '0.65rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                borderRadius: '1px',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--text-faint)'; e.currentTarget.style.color = 'var(--text-secondary)' }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-light)'; e.currentTarget.style.color = 'var(--text-muted)' }}
            >
              Limpar carrinho
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to   { transform: translateX(0);   opacity: 1; }
        }
      `}</style>
    </div>,
    document.body
  )
}

function QuantityBtn({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: '24px',
        height: '24px',
        background: 'transparent',
        border: '1px solid rgba(212, 184, 74, 0.3)',
        color: '#C9A84A',
        cursor: 'pointer',
        borderRadius: '1px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Raleway', sans-serif",
        fontSize: '0.85rem',
        lineHeight: 1,
        transition: 'all 0.2s ease',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(201,168,74,0.15)' }}
      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
    >
      {children}
    </button>
  )
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `${r}, ${g}, ${b}`
}

