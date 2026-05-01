import RitualManual from '../components/RitualManual'

export default function Manual() {
  return (
    <div style={{ paddingTop: '70px' }}>
      <div style={{
        backgroundColor: 'var(--bg-section-dark)',
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 4rem) 2rem',
        textAlign: 'center',
        borderBottom: '1px solid var(--border-gold)',
      }}>
        <span style={{
          display: 'block',
          fontFamily: "'Raleway', sans-serif",
          fontSize: '0.62rem',
          letterSpacing: '0.5em',
          textTransform: 'uppercase',
          color: '#C9A84A',
          marginBottom: '1rem',
        }}>
          Guia de Cuidados
        </span>
        <h1 style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 300,
          color: 'var(--text-primary)',
          letterSpacing: '0.04em',
          marginBottom: '1rem',
        }}>
          Manual de Cuidados com a sua Vela
        </h1>
        <div style={{
          width: '50px', height: '1px',
          background: 'linear-gradient(90deg, transparent, #C9A84A, transparent)',
          margin: '1.5rem auto',
        }} />
        <p style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 'clamp(0.95rem, 1.6vw, 1.1rem)',
          fontWeight: 300,
          fontStyle: 'italic',
          lineHeight: 1.85,
          color: 'var(--text-muted)',
          maxWidth: '520px',
          margin: '0 auto',
        }}>
          Pequenos gestos ajudam a preservar a beleza da queima, a fragrância e a qualidade de cada ritual.
        </p>
      </div>
      <RitualManual />
    </div>
  )
}
