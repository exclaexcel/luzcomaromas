import { useState } from 'react'

const INSTAGRAM_URL = 'https://instagram.com/luzcomaromas'
const WHATSAPP_URL  = 'https://wa.me/5541988427128'

function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
    </svg>
  )
}

function IconWhatsApp() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  )
}

function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | success | error

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!e.currentTarget.checkValidity()) {
      setStatus('error')
      return
    }
    setStatus('success')
    setEmail('')
  }

  return (
    <div style={{
      marginBottom: '3rem',
      padding: '2rem 0',
      borderTop: '1px solid var(--border-gold)',
      borderBottom: '1px solid var(--border-gold)',
    }}>
      <p style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontSize: '1.3rem',
        fontWeight: 300,
        fontStyle: 'italic',
        color: 'var(--text-primary)',
        marginBottom: '0.4rem',
      }}>
        Luz na Caixa
      </p>
      <p style={{
        fontFamily: "'Raleway', sans-serif",
        fontSize: '0.65rem',
        letterSpacing: '0.3em',
        textTransform: 'uppercase',
        color: 'var(--text-muted)',
        marginBottom: '1.5rem',
      }}>
        Receba ofertas e rituais exclusivos
      </p>

      {status === 'success' ? (
        <p style={{
          fontFamily: "'Raleway', sans-serif",
          fontSize: '0.78rem',
          letterSpacing: '0.15em',
          color: '#C9A84A',
          textTransform: 'uppercase',
        }}>
          ✓ Bem-vindo ao círculo de luz!
        </p>
      ) : status === 'error' ? (
        <p
          role="alert"
          style={{
            fontFamily: "'Raleway', sans-serif",
            fontSize: '0.75rem',
            letterSpacing: '0.1em',
            color: '#9A6A8D',
          }}
        >
          Por favor, insira um e-mail válido.
        </p>
      ) : (
        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', flexDirection: 'column', alignItems: 'center' }}
        >
          <label htmlFor="newsletter-email-mirror" style={{ fontFamily: "'Raleway', sans-serif", fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
            Email
          </label>
          <input
            id="newsletter-email-mirror"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="seu@email.com"
            required
            style={{
              background: 'transparent',
              border: 'none',
              borderBottom: '1px solid rgba(212, 184, 74, 0.4)',
              outline: 'none',
              padding: '0.5rem 0',
              fontFamily: "'Raleway', sans-serif",
              fontSize: '0.85rem',
              color: 'var(--text-primary)',
              letterSpacing: '0.05em',
              width: '220px',
              textAlign: 'center',
            }}
            onFocus={e => { e.currentTarget.style.borderBottomColor = '#C9A84A' }}
            onBlur={e => { e.currentTarget.style.borderBottomColor = 'rgba(212, 184, 74, 0.4)' }}
          />
          <button
            type="submit"
            style={{
              padding: '0.5rem 1.5rem',
              background: 'transparent',
              border: '1px solid #C9A84A',
              color: '#C9A84A',
              fontFamily: "'Raleway', sans-serif",
              fontSize: '0.65rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              borderRadius: '1px',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#C9A84A'; e.currentTarget.style.color = 'var(--bg-page)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#C9A84A' }}
          >
            Inscrever
          </button>
        </form>
      )}
    </div>
  )
}

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: 'var(--bg-footer)',
      borderTop: '1px solid var(--border-gold)',
      padding: 'clamp(4rem, 7vw, 6rem) clamp(1.5rem, 5vw, 4rem)',
      textAlign: 'center',
    }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.6rem', fontWeight: 300, color: 'var(--text-primary)', letterSpacing: '0.2em' }}>
          Luz
        </span>
        <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.6rem', fontWeight: 300, color: '#C9A84A', letterSpacing: '0.2em' }}>
          ComAromas
        </span>
      </div>

      <div className="section-divider" style={{ marginBottom: '1.5rem' }} />

      <p style={{
        fontFamily: "'Raleway', sans-serif",
        fontSize: '0.7rem',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: 'var(--text-faint)',
        fontWeight: 300,
        marginBottom: '2rem',
      }}>
        Aromas que acendem momentos
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '3rem' }}>
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram LuzComAromas"
          style={{
            color: 'var(--text-faint)',
            transition: 'color 0.3s ease, transform 0.3s ease',
            display: 'flex',
            alignItems: 'center',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = '#9A6A8D'; e.currentTarget.style.transform = 'translateY(-3px)' }}
          onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-faint)'; e.currentTarget.style.transform = 'translateY(0)' }}
        >
          <IconInstagram />
        </a>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp LuzComAromas"
          style={{
            color: 'var(--text-faint)',
            transition: 'color 0.3s ease, transform 0.3s ease',
            display: 'flex',
            alignItems: 'center',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = '#25D366'; e.currentTarget.style.transform = 'translateY(-3px)' }}
          onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-faint)'; e.currentTarget.style.transform = 'translateY(0)' }}
        >
          <IconWhatsApp />
        </a>
      </div>

      <Newsletter />

      <p style={{
        fontFamily: "'Raleway', sans-serif",
        fontSize: '0.68rem',
        color: 'var(--text-faint)',
        fontWeight: 300,
        letterSpacing: '0.1em',
      }}>
         © {new Date().getFullYear()} LuzComAromas · Aromas que acendem momentos</p>
    </footer>
  )
}
