import { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

const COLECOES = ['Serenidade', 'Energia', 'Intuição', 'Purificação', 'Ainda não sei']

const inputStyle = {
  width: '100%',
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid rgba(212, 184, 74, 0.4)',
  outline: 'none',
  padding: '0.75rem 0',
  fontFamily: "'Raleway', sans-serif",
  fontSize: '0.9rem',
  color: 'var(--text-primary)',
  letterSpacing: '0.05em',
  transition: 'border-color 0.3s ease',
  boxSizing: 'border-box',
}

export default function ContactSection() {
  const formRef = useRef(null)
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [form, setForm] = useState({ name: '', email: '', colecao: '', message: '' })

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('sending')
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      setStatus('success')
      setForm({ name: '', email: '', colecao: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <section
      id="contato"
      style={{
        backgroundColor: 'var(--bg-section-main)',
        padding: 'clamp(6rem, 10vw, 10rem) clamp(1.5rem, 5vw, 4rem)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(ellipse at 30% 50%, rgba(217, 142, 180, 0.08) 0%, transparent 55%), radial-gradient(ellipse at 70% 50%, rgba(155, 111, 196, 0.08) 0%, transparent 55%)',
      }} />

      <div style={{ maxWidth: '680px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span style={{
            display: 'block',
            fontFamily: "'Raleway', sans-serif",
            fontSize: '0.7rem',
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            color: '#C9A84A',
            marginBottom: '1rem',
          }}>
            Um Gesto de Presença
          </span>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 300,
            color: 'var(--text-primary)',
            lineHeight: 1.2,
            letterSpacing: '0.03em',
            marginBottom: '1.5rem',
          }}>
            Entre em Contato
          </h2>
          <div className="section-divider" style={{ marginBottom: '1.5rem' }} />
          <p style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: '1.05rem',
            fontStyle: 'italic',
            color: 'var(--text-secondary)',
            lineHeight: 1.8,
          }}>
            Cada pedido é único. Conte seu momento e encontramos o aroma certo juntos.
          </p>
        </div>

        {status === 'success' ? (
          <div
            role="status"
            aria-live="polite"
            style={{
              textAlign: 'center',
              padding: '3rem',
              border: '1px solid rgba(212, 184, 74, 0.3)',
              borderRadius: '2px',
            }}
          >
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>✨</div>
            <p style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: '1.3rem',
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'var(--text-primary)',
              marginBottom: '0.5rem',
            }}>
              Mensagem enviada com intenção.
            </p>
            <p style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: '0.75rem',
              letterSpacing: '0.15em',
              color: '#C9A84A',
              textTransform: 'uppercase',
            }}>
              Responderei em breve
            </p>
          </div>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem' }}>
              <div>
                <label style={{ display: 'block', fontFamily: "'Raleway', sans-serif", fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                  Nome
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Seu nome"
                  style={{ ...inputStyle, '::placeholder': { color: 'var(--text-faint)' } }}
                  onFocus={e => e.currentTarget.style.borderBottomColor = '#C9A84A'}
                  onBlur={e => e.currentTarget.style.borderBottomColor = 'rgba(212, 184, 74, 0.4)'}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontFamily: "'Raleway', sans-serif", fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="seu@email.com"
                  style={inputStyle}
                  onFocus={e => e.currentTarget.style.borderBottomColor = '#C9A84A'}
                  onBlur={e => e.currentTarget.style.borderBottomColor = 'rgba(212, 184, 74, 0.4)'}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontFamily: "'Raleway', sans-serif", fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                Coleção de Interesse
              </label>
              <select
                name="colecao"
                value={form.colecao}
                onChange={handleChange}
                style={{
                  ...inputStyle,
                  background: 'transparent',
                  appearance: 'none',
                  cursor: 'pointer',
                  color: form.colecao ? 'var(--text-primary)' : 'var(--text-faint)',
                }}
                onFocus={e => e.currentTarget.style.borderBottomColor = '#C9A84A'}
                onBlur={e => e.currentTarget.style.borderBottomColor = 'rgba(212, 184, 74, 0.4)'}
              >
                <option value="" disabled style={{ background: '#1E1035' }}>Escolha uma coleção...</option>
                {COLECOES.map(c => (
                  <option key={c} value={c} style={{ background: '#1E1035', color: 'var(--text-primary)' }}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontFamily: "'Raleway', sans-serif", fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                Mensagem
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Conte-nos o que você precisa..."
                style={{
                  ...inputStyle,
                  resize: 'none',
                  borderBottom: 'none',
                  border: '1px solid rgba(212, 184, 74, 0.4)',
                  padding: '0.75rem',
                  borderRadius: '1px',
                }}
                onFocus={e => e.currentTarget.style.borderColor = '#C9A84A'}
                onBlur={e => e.currentTarget.style.borderColor = 'rgba(212, 184, 74, 0.4)'}
              />
            </div>

            {status === 'error' && (
              <p
                role="alert"
                aria-live="assertive"
                style={{ fontFamily: "'Raleway', sans-serif", fontSize: '0.72rem', color: '#D98EB4', letterSpacing: '0.15em', textAlign: 'center', textTransform: 'uppercase' }}
              >
                Algo deu errado. Tente novamente ou fale pelo WhatsApp.
              </p>
            )}

            <div style={{ textAlign: 'center' }}>
              <button
                type="submit"
                disabled={status === 'sending'}
                style={{
                  padding: '1rem 3.5rem',
                  background: 'transparent',
                  border: '1px solid #C9A84A',
                  color: '#C9A84A',
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: '0.75rem',
                  letterSpacing: '0.35em',
                  textTransform: 'uppercase',
                  cursor: status === 'sending' ? 'wait' : 'pointer',
                  borderRadius: '1px',
                  transition: 'all 0.3s ease',
                  opacity: status === 'sending' ? 0.6 : 1,
                }}
                onMouseEnter={e => { if (status !== 'sending') { e.currentTarget.style.background = '#C9A84A'; e.currentTarget.style.color = '#1E1035' }}}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#C9A84A' }}
              >
                {status === 'sending' ? 'Enviando...' : 'Enviar Mensagem'}
              </button>
            </div>

            <p style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: '0.9rem',
              fontStyle: 'italic',
              color: 'var(--text-faint)',
              textAlign: 'center',
              marginTop: '1.5rem',
            }}>
              Respondemos com atenção e carinho.
            </p>
          </form>
        )}
      </div>
    </section>
  )
}

