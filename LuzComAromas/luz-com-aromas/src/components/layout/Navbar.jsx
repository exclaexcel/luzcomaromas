import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import ThemeToggle from '../ThemeToggle'
import CartButton from '../CartButton'
import CartModal from '../CartModal'

const NAV_LINKS = [
  { to: '/',         label: 'Home' },
  { to: '/sobre',    label: 'Sobre' },
  { to: '/colecoes', label: 'Coleções' },
  { to: '/loja',     label: 'Loja' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const { pathname } = useLocation()

  const bgColor        = 'rgba(30, 16, 53, 0.95)'
  const textColor      = 'rgba(237, 230, 247, 0.65)'
  const textActive     = '#C9A84A'
  const textHover      = '#EDE6F7'
  const logoMainColor  = '#EDE6F7'
  const borderColor    = 'rgba(212, 184, 74, 0.2)'
  const hamburgerColor = '#C9A84A'

  return (
    <>
      {cartOpen && <CartModal onClose={() => setCartOpen(false)} />}

      <header
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 900,
          backgroundColor: bgColor,
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          borderBottom: `1px solid ${borderColor}`,
          transition: 'all 0.4s ease',
        }}
      >
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 clamp(1.5rem, 5vw, 4rem)',
          height: '70px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'baseline' }}>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', fontWeight: 400, color: logoMainColor, letterSpacing: '0.04em' }}>
              Luz
            </span>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', fontWeight: 300, color: '#C9A84A', letterSpacing: '0.04em' }}>
              ComAromas
            </span>
          </Link>

          {/* Nav desktop */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="hidden-mobile">
            {NAV_LINKS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                style={{
                  textDecoration: 'none',
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: '0.75rem',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: pathname === to ? textActive : textColor,
                  transition: 'color 0.3s ease',
                  borderBottom: pathname === to ? `1px solid ${textActive}` : '1px solid transparent',
                  paddingBottom: '4px',
                }}
                onMouseEnter={e => { if (pathname !== to) e.currentTarget.style.color = textHover }}
                onMouseLeave={e => { if (pathname !== to) e.currentTarget.style.color = textColor }}
              >
                {label}
              </Link>
            ))}

            <Link
              to="/ritual"
              style={{
                textDecoration: 'none',
                fontFamily: "'Raleway', sans-serif",
                fontSize: '0.75rem',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: pathname === '/ritual' ? '#1E1035' : '#C9A84A',
                background: pathname === '/ritual' ? '#C9A84A' : 'transparent',
                border: '1px solid #C9A84A',
                padding: '0.6rem 1.5rem',
                borderRadius: '1px',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => { if (pathname !== '/ritual') { e.currentTarget.style.background = '#C9A84A'; e.currentTarget.style.color = '#1E1035' }}}
              onMouseLeave={e => { if (pathname !== '/ritual') { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#C9A84A' }}}
            >
              Ritual
            </Link>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: '0.25rem' }}>
              <ThemeToggle />
              <CartButton onClick={() => setCartOpen(true)} />
            </div>
          </nav>

          {/* Mobile: toggle + cart + hamburger */}
          <div className="show-mobile" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ThemeToggle />
            <CartButton onClick={() => setCartOpen(true)} />
            <button
              onClick={() => setOpen(o => !o)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem', display: 'flex', flexDirection: 'column', gap: '6px' }}
              aria-label="Menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              {[0, 1, 2].map(i => (
                <span key={i} style={{
                  display: 'block', width: '24px', height: '1px',
                  background: hamburgerColor,
                  transition: 'all 0.3s ease',
                  transform: open && i === 0 ? 'translateY(7px) rotate(45deg)' :
                             open && i === 1 ? 'scaleX(0)' :
                             open && i === 2 ? 'translateY(-7px) rotate(-45deg)' : 'none',
                }} />
              ))}
            </button>
          </div>
        </div>

        {/* Menu mobile expandido */}
        {open && (
          <div id="mobile-menu" className="show-mobile" style={{
            borderTop: `1px solid ${borderColor}`,
            background: bgColor,
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
          }}>
            {[...NAV_LINKS, { to: '/ritual', label: 'Ritual' }].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                style={{
                  textDecoration: 'none',
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: '0.9rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: pathname === to ? textActive : textColor,
                }}
              >
                {label}
              </Link>
            ))}
          </div>
        )}

        <style>{`
          @media (min-width: 768px) { .show-mobile { display: none !important; } }
          @media (max-width: 767px) { .hidden-mobile { display: none !important; } }
          nav a:focus-visible,
          header a:focus-visible,
          header button:focus-visible {
            outline: 2px solid #C9A84A;
            outline-offset: 3px;
            border-radius: 2px;
          }
        `}</style>
      </header>
    </>
  )
}

