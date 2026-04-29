import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import ThemeToggle from '../ThemeToggle'
import CartButton from '../CartButton'
import CartModal from '../CartModal'

function IconHome() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" width="13" height="13">
      <path d="M8 3 C8 3 5 6 5 9 C5 10.7 6.3 12 8 12 C9.7 12 11 10.7 11 9 C11 6 8 3 8 3Z" />
      <circle cx="8" cy="9" r="1.5" fill="currentColor" opacity="0.5" stroke="none" />
    </svg>
  )
}

function IconSobre() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" width="13" height="13">
      <circle cx="8" cy="8" r="5.5" />
      <circle cx="8" cy="8" r="1.5" fill="currentColor" opacity="0.4" stroke="none" />
      <path d="M8 2.5 L8 4 M8 12 L8 13.5 M2.5 8 L4 8 M12 8 L13.5 8" strokeWidth="1" />
    </svg>
  )
}

function IconColecoes() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" width="13" height="13">
      <circle cx="5" cy="5" r="2.5" />
      <circle cx="11" cy="5" r="2.5" />
      <circle cx="5" cy="11" r="2.5" />
      <circle cx="11" cy="11" r="2.5" />
    </svg>
  )
}

function IconLoja() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" width="13" height="13">
      <path d="M5 7 C5 5 6 3.5 8 3.5 C10 3.5 11 5 11 7" />
      <rect x="3" y="7" width="10" height="6" rx="1" />
    </svg>
  )
}

function IconRitual() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" width="13" height="13">
      <path d="M10 3 C8 2.5 5.5 4 5 7 C4.5 10 6.5 12.5 9.5 13 C7 13.5 4 11 3.5 8 C3 5 5 2.5 8 2 C9 1.8 9.6 2.3 10 3Z" />
      <circle cx="12" cy="4" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="13" cy="7" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

const NAV_LINKS = [
  { to: '/',         label: 'Home',     icon: <IconHome /> },
  { to: '/sobre',    label: 'Sobre',    icon: <IconSobre /> },
  { to: '/colecoes', label: 'Coleções', icon: <IconColecoes /> },
  { to: '/loja',     label: 'Loja',     icon: <IconLoja /> },
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
            {NAV_LINKS.map(({ to, label, icon }) => (
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
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                }}
                onMouseEnter={e => { if (pathname !== to) e.currentTarget.style.color = textHover }}
                onMouseLeave={e => { if (pathname !== to) e.currentTarget.style.color = textColor }}
              >
                {icon}
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
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
              }}
              onMouseEnter={e => { if (pathname !== '/ritual') { e.currentTarget.style.background = '#C9A84A'; e.currentTarget.style.color = '#1E1035' }}}
              onMouseLeave={e => { if (pathname !== '/ritual') { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#C9A84A' }}}
            >
              <IconRitual />
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
            {[...NAV_LINKS, { to: '/ritual', label: 'Ritual', icon: <IconRitual /> }].map(({ to, label, icon }) => (
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
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                {icon}
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

