import { useCart } from '../context/CartContext'

export default function CartButton({ onClick }) {
  const { count } = useCart()

  return (
    <button
      onClick={onClick}
      aria-label={`Carrinho — ${count} ${count === 1 ? 'item' : 'itens'}`}
      style={{
        position: 'relative',
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        background: 'transparent',
        border: '1px solid rgba(201, 168, 74, 0.4)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s ease',
        color: '#C9A84A',
        flexShrink: 0,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = '#C9A84A'
        e.currentTarget.style.background = 'rgba(201, 168, 74, 0.1)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(201, 168, 74, 0.4)'
        e.currentTarget.style.background = 'transparent'
      }}
    >
      <svg viewBox="0 0 24 24" fill="none" width="16" height="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>

      {count > 0 && (
        <span
          style={{
            position: 'absolute',
            top: '-6px',
            right: '-6px',
            width: '18px',
            height: '18px',
            borderRadius: '50%',
            background: '#C9A84A',
            color: '#1E1035',
            fontFamily: "'Raleway', sans-serif",
            fontSize: '0.6rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            lineHeight: 1,
          }}
        >
          {count > 9 ? '9+' : count}
        </span>
      )}
    </button>
  )
}
