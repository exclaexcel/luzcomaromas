import { useNavigate } from 'react-router-dom'

export default function QuizTeaser() {
  const navigate = useNavigate()

  return (
    <section
      style={{
        backgroundColor: 'var(--bg-section-main)',
        padding: 'clamp(6rem, 10vw, 10rem) clamp(1.5rem, 5vw, 4rem)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          backgroundImage:
            'radial-gradient(ellipse at 30% 50%, rgba(217, 142, 180, 0.08) 0%, transparent 55%), radial-gradient(ellipse at 70% 50%, rgba(155, 111, 196, 0.08) 0%, transparent 55%)',
        }}
      />

      <div style={{ maxWidth: '680px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 300,
              color: 'var(--text-primary)',
              lineHeight: 1.2,
              letterSpacing: '0.03em',
              marginBottom: '1.5rem',
            }}
          >
            Qual ritual chama você hoje?
          </h2>

          <p
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: '1.05rem',
              fontStyle: 'italic',
              color: 'var(--text-secondary)',
              lineHeight: 1.8,
              marginBottom: '2rem',
            }}
          >
            Nem sempre sabemos o que escolher. Às vezes, só sabemos como estamos. Responda 4 perguntas e
            descubra a coleção que mais combina com o seu momento.
          </p>

          <div className="section-divider" style={{ marginBottom: '2rem' }} />

          <div
            style={{
              display: 'flex',
              gap: 'clamp(1rem, 3vw, 1.5rem)',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: '1.5rem',
            }}
          >
            <button
              onClick={() => navigate('/quiz')}
              style={{
                padding: 'clamp(0.8rem, 2vw, 1rem) clamp(2rem, 5vw, 3rem)',
                background: '#C9A84A',
                border: 'none',
                color: '#1E1035',
                fontFamily: "'Raleway', sans-serif",
                fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                borderRadius: '1px',
                fontWeight: 600,
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(201, 168, 74, 0.4)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              Começar
            </button>

            <button
              onClick={() => navigate('/loja')}
              style={{
                padding: 'clamp(0.8rem, 2vw, 1rem) clamp(2rem, 5vw, 3rem)',
                background: 'transparent',
                border: '1px solid #C9A84A',
                color: '#C9A84A',
                fontFamily: "'Raleway', sans-serif",
                fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                borderRadius: '1px',
                fontWeight: 600,
                transition: 'all 0.3s ease',
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
              Ver a loja
            </button>
          </div>

          <p
            style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: '0.68rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
            }}
          >
            4 perguntas · menos de 1 minuto
          </p>
        </div>
      </div>
    </section>
  )
}
