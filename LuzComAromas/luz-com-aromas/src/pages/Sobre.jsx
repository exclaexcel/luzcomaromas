import { useEffect, useRef, useState } from 'react'

function useVisible(threshold = 0.15) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])
  return [ref, visible]
}

/* ── Componentes de layout ─────────────────────────────────── */

function Reveal({ children, delay = 0, style = {} }) {
  const [ref, visible] = useVisible()
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.9s ease-out ${delay}s, transform 0.9s ease-out ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

function Label({ children }) {
  return (
    <span style={{
      display: 'block',
      fontFamily: "'Raleway', sans-serif",
      fontSize: '0.65rem',
      letterSpacing: '0.45em',
      textTransform: 'uppercase',
      color: '#C9A84A',
      marginBottom: '1.25rem',
    }}>
      {children}
    </span>
  )
}

function SectionTitle({ children }) {
  return (
    <h2 style={{
      fontFamily: "'Cormorant Garamond', Georgia, serif",
      fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
      fontWeight: 300,
      color: 'var(--text-primary)',
      lineHeight: 1.25,
      letterSpacing: '0.03em',
      marginBottom: '0.75rem',
    }}>
      {children}
    </h2>
  )
}

function AccentLine({ align = 'left' }) {
  return (
    <div style={{
      width: '40px',
      height: '1px',
      background: 'linear-gradient(90deg, #C9A84A, transparent)',
      marginBottom: '2rem',
      marginLeft: align === 'center' ? 'auto' : 0,
      marginRight: align === 'center' ? 'auto' : 0,
    }} />
  )
}

function Body({ children, center = false, style = {} }) {
  return (
    <p style={{
      fontFamily: "'Cormorant Garamond', Georgia, serif",
      fontSize: 'clamp(1rem, 1.6vw, 1.15rem)',
      fontWeight: 300,
      lineHeight: 2,
      color: 'var(--text-secondary)',
      letterSpacing: '0.01em',
      marginBottom: '1.25rem',
      textAlign: center ? 'center' : 'left',
      ...style,
    }}>
      {children}
    </p>
  )
}

/* Citação em destaque — peça visual */
function BigQuote({ children, color = '#C9A84A' }) {
  const [ref, visible] = useVisible(0.2)
  return (
    <div
      ref={ref}
      style={{
        padding: 'clamp(3.5rem, 7vw, 6rem) clamp(1.5rem, 5vw, 4rem)',
        textAlign: 'center',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 1s ease-out',
      }}
    >
      <span style={{
        display: 'block',
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
        fontWeight: 300,
        fontStyle: 'italic',
        color,
        lineHeight: 1.65,
        letterSpacing: '0.02em',
        maxWidth: '700px',
        margin: '0 auto',
      }}>
        {children}
      </span>
    </div>
  )
}

/* Destaque de crença — mini card */
function BeliefCard({ children, index }) {
  const [ref, visible] = useVisible()
  return (
    <div
      ref={ref}
      style={{
        borderLeft: '2px solid rgba(201, 168, 74, 0.4)',
        paddingLeft: '1.5rem',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : 'translateX(-16px)',
        transition: `all 0.7s ease-out ${index * 0.1}s`,
      }}
    >
      <p style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontSize: 'clamp(1rem, 1.5vw, 1.1rem)',
        fontWeight: 300,
        lineHeight: 1.8,
        color: 'var(--text-secondary)',
        margin: 0,
      }}>
        {children}
      </p>
    </div>
  )
}

/* Coleção em linha */
function CollectionLine({ name, color, desc, index }) {
  const [ref, visible] = useVisible()
  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1.25rem',
        padding: '1.25rem 0',
        borderBottom: '1px solid var(--border-subtle)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        transition: `all 0.6s ease-out ${index * 0.08}s`,
      }}
    >
      <span style={{
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        background: color,
        flexShrink: 0,
        opacity: 0.8,
      }} />
      <span style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontSize: 'clamp(1rem, 1.5vw, 1.1rem)',
        fontWeight: 500,
        color,
        letterSpacing: '0.04em',
        flexShrink: 0,
        minWidth: '110px',
      }}>
        {name}
      </span>
      <span style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontSize: 'clamp(0.9rem, 1.4vw, 1rem)',
        fontWeight: 300,
        fontStyle: 'italic',
        color: 'var(--text-secondary)',
        lineHeight: 1.5,
      }}>
        {desc}
      </span>
    </div>
  )
}

/* Separador full-width */
function FullDivider() {
  return (
    <div style={{
      width: '100%',
      height: '1px',
      background: 'linear-gradient(90deg, transparent, rgba(212,184,74,0.18), transparent)',
      margin: 'clamp(4rem, 8vw, 7rem) 0',
    }} />
  )
}

/* ── Página ────────────────────────────────────────────────── */

export default function Sobre() {
  const [heroRef, heroVisible] = useVisible(0.1)

  return (
    <div style={{ paddingTop: '64px', position: 'relative', zIndex: 1 }}>

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section style={{
        backgroundColor: 'var(--bg-section-dark)',
        padding: 'clamp(5rem, 10vw, 9rem) clamp(1.5rem, 5vw, 4rem) clamp(4rem, 7vw, 7rem)',
        textAlign: 'center',
        borderBottom: '1px solid rgba(212,184,74,0.1)',
      }}>
        <div
          ref={heroRef}
          style={{
            maxWidth: '820px',
            margin: '0 auto',
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? 'translateY(0)' : 'translateY(28px)',
            transition: 'all 1.2s ease-out',
          }}
        >
          <span style={{
            display: 'block',
            fontFamily: "'Raleway', sans-serif",
            fontSize: '0.65rem',
            letterSpacing: '0.5em',
            textTransform: 'uppercase',
            color: '#C9A84A',
            marginBottom: '2rem',
          }}>
            Sobre a LuzComAromas
          </span>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(2rem, 5vw, 3.8rem)',
            fontWeight: 300,
            color: 'var(--text-primary)',
            lineHeight: 1.3,
            letterSpacing: '0.04em',
            marginBottom: '2.5rem',
          }}>
            Aroma que transforma.<br />
            Luz que acolhe.<br />
            <em style={{ color: '#C9A84A' }}>Ritual que permanece.</em>
          </h1>
          <div className="section-divider" style={{ marginBottom: '2.5rem' }} />
          <p style={{
            fontFamily: "'Raleway', sans-serif",
            fontSize: 'clamp(0.85rem, 1.4vw, 0.95rem)',
            lineHeight: 2.1,
            color: 'var(--text-muted)',
            fontWeight: 300,
            letterSpacing: '0.06em',
          }}>
            A LuzComAromas nasceu do desejo de transformar rotinas em rituais.
          </p>

          <p style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
            fontStyle: 'italic',
            color: '#C9A84A',
            marginTop: '1.5rem',
            marginBottom: '0.5rem',
            letterSpacing: '0.02em',
          }}>
            "Aromas que acendem momentos."
          </p>
          <p style={{
            fontFamily: "'Raleway', sans-serif",
            fontSize: '0.7rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'var(--text-faint)',
          }}>
            Um portal sensorial que transforma rotina em ritual.
          </p>
        </div>
      </section>

      {/* ── Manifesto (abertura) ──────────────────────────────── */}
      <BigQuote>
        "Aqui, cada vela carrega a intenção de criar momentos de presença,
        pausa e reencontro com o que realmente importa."
      </BigQuote>

      {/* ── A Origem ──────────────────────────────────────────── */}
      <section style={{
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 4rem)',
        backgroundColor: 'var(--bg-section-main)',
      }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <Reveal>
            <Label>Como tudo começou</Label>
            <SectionTitle>Do cansaço à claridade.</SectionTitle>
            <AccentLine />
            <Body>
              Havia um cansaço que o descanso não resolvia. Dias que se tornavam semanas, semanas que se tornavam uma névoa de obrigações sem pausa real. Foi nesse ponto de exaustão que surgiu um gesto simples: acender uma vela, sentar em silêncio, respirar com atenção.
            </Body>
            <Body>
              O que começou como um pequeno refúgio tornou-se uma prática. E da prática surgiu a curiosidade: e se eu criasse os próprios aromas? E se cada chama pudesse carregar uma intenção específica — não apenas iluminar um quarto, mas iluminar um momento?
            </Body>
            <Body style={{ color: '#C9A84A', fontStyle: 'italic' }}>
              De um ritual pessoal, nasceu uma missão.
            </Body>
          </Reveal>
        </div>
      </section>

      {/* ── A Essência da Marca ────────────────────────────────────── */}
      <section style={{
        backgroundColor: 'var(--bg-section-mid)',
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 4rem)',
      }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <Reveal>
            <Label>A Essência da Marca</Label>
            <SectionTitle>Delicadeza. Estética. Presença.</SectionTitle>
            <AccentLine />
            <Body>
              Cada peça une delicadeza, estética minimalista e uma atmosfera mística que abraça, sem pesar. Cada detalhe — a luz, o aroma, a brisa que se espalha — é pensado para conduzir o corpo e a mente a um lugar mais calmo.
            </Body>
            <Body>
              Cada produto existe para marcar o tempo de um jeito diferente: com suavidade, com intenção, com alma.
            </Body>
          </Reveal>
        </div>
      </section>

      {/* ── O que Acreditamos ─────────────────────────────────── */}
      <section style={{
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 4rem)',
      }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <Reveal>
            <Label>O que Acreditamos</Label>
            <SectionTitle>Clareza é um lugar.</SectionTitle>
            <AccentLine />
          </Reveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '0.5rem' }}>
            {[
              'Que o ambiente em que você vive influencia o que você sente.',
              'Que a pausa não é luxo — é necessidade.',
              'Que pequenos rituais têm o poder de reorganizar o mundo dentro de nós.',
              'Que acender uma vela não é só iluminar o espaço — é iluminar o instante.',
            ].map((belief, i) => (
              <BeliefCard key={i} index={i}>{belief}</BeliefCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── Citação de respiro ────────────────────────────────── */}
      <BigQuote color="var(--text-muted)">
        "A LuzComAromas é uma marca que acredita no poder do sensorial como linguagem.<br />
        No silêncio que nasce quando o ambiente muda.<br />
        No respiro que chega quando a luz acende."
      </BigQuote>

      {/* ── O Jeito de Fazer ──────────────────────────────── */}
      <section style={{
        backgroundColor: 'var(--bg-section-dark)',
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 4rem)',
      }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <Reveal>
            <Label>O Jeito de Fazer</Label>
            <SectionTitle>Nada aqui é feito às pressas.</SectionTitle>
            <AccentLine />
            <Body>
              Cada aroma é pensado para carregar um propósito. Cada detalhe visual é desenhado para trazer calma. Cada embalagem é um convite ao toque, à respiração, ao momento.
            </Body>
            <Body>
              Cada produto vem acompanhado de instruções cuidadosas para que o ritual seja seguro, leve e prazeroso — sempre de um jeito simples, acolhedor e acessível.
            </Body>
          </Reveal>

          {/* Blockquote de destaque */}
          <Reveal delay={0.2}>
            <blockquote style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'var(--text-primary)',
              lineHeight: 1.65,
              borderLeft: '2px solid rgba(201,168,74,0.5)',
              paddingLeft: '1.75rem',
              margin: '3rem 0 0',
            }}>
              "Cada peça foi criada para que você sinta que está segurando algo feito com presença."
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* ── As Coleções ───────────────────────────────────────── */}
      <section style={{
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 4rem)',
      }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <Reveal>
            <Label>Coleções que Conversam com o Sentir</Label>
            <SectionTitle>Cada coleção nasce de um estado de espírito.</SectionTitle>
            <AccentLine />
            <Body>
              A LuzComAromas não cria por categoria — cria por sensação. Cada linha tem um momento, um ritual, uma intenção — e os aromas foram escolhidos para despertar exatamente isso.
            </Body>
          </Reveal>

          <div style={{ margin: '2.5rem 0 3rem' }}>
            {[
              { name: 'Serenidade', color: '#9B6FC4', desc: 'para dias que pedem maciez e leveza.' },
              { name: 'Energia',    color: '#C97A4A', desc: 'para iluminar o movimento interno e ativar o dia.' },
              { name: 'Intuição',   color: '#9A6A8D', desc: 'para ouvir a si mesma com mais profundidade.' },
              { name: 'Purificação',color: '#6FA88A', desc: 'para renovar o ar, a mente e o espaço.' },
            ].map(({ name, color, desc }, i) => (
              <CollectionLine key={name} name={name} color={color} desc={desc} index={i} />
            ))}
          </div>

          <Reveal delay={0.1}>
            <div style={{
              background: 'rgba(90, 158, 122, 0.08)',
              border: '1px solid rgba(90, 158, 122, 0.25)',
              borderRadius: '2px',
              padding: '1.75rem 2rem',
              marginBottom: '1.5rem',
            }}>
              <span style={{
                display: 'block',
                fontFamily: "'Raleway', sans-serif",
                fontSize: '0.6rem',
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                color: '#6FA88A',
                marginBottom: '0.75rem',
              }}>
                Carro-chefe
              </span>
              <p style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
                fontWeight: 300,
                fontStyle: 'italic',
                color: 'var(--text-primary)',
                lineHeight: 1.75,
                margin: 0,
              }}>
                O <strong style={{ color: '#6FA88A', fontWeight: 400 }}>Manto de Claridade</strong>, da coleção Purificação — um ritual de limpeza e renascimento que abre espaço dentro da casa e dentro da alma.
              </p>
            </div>

            <Body>
              E quando a mente encontra lugar para repousar, chega o <strong style={{ color: '#9B6FC4', fontWeight: 400 }}>Acalanto da Alma</strong> — o abraço quente após o longo dia.
            </Body>
          </Reveal>
        </div>
      </section>

      {/* ── Portal Ritual ─────────────────────────────────────── */}
      <section style={{
        backgroundColor: 'var(--bg-section-mid)',
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 4rem)',
      }}>
        <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
          <Reveal>
            <Label>Um presente que só existe porque você acendeu</Label>
            <SectionTitle>Um Portal que Só se Abre para Quem Acende.</SectionTitle>
            <AccentLine align="center" />
            <Body center>
              Junto da sua peça, você recebe uma carta especial — um convite silencioso.
            </Body>
            <Body center>
              Nela, há um acesso exclusivo para um ritual digital: um espaço onde a experiência se prolonga com palavras, sons e uma atmosfera criada para acompanhá-la no seu momento de pausa.
            </Body>
          </Reveal>

          <Reveal delay={0.2}>
            <p style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(1.05rem, 1.8vw, 1.3rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: '#C9A84A',
              letterSpacing: '0.02em',
              lineHeight: 1.75,
              marginTop: '2rem',
            }}>
              "É um presente que só existe porque você acendeu.<br />
              Porque você escolheu o ritual."
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Promessa final ────────────────────────────────────── */}
      <section style={{
        padding: 'clamp(5rem, 10vw, 9rem) clamp(1.5rem, 5vw, 4rem)',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <Reveal>
            <Label>A Promessa</Label>
            <div className="section-divider" style={{ marginBottom: '3rem' }} />
            <p style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(1.3rem, 2.8vw, 2.1rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              lineHeight: 1.75,
              color: 'var(--text-primary)',
              letterSpacing: '0.02em',
            }}>
              Que cada produto LuzComAromas se torne um pequeno portal.<br />
              Um espaço seguro. Um momento seu.<br />
              Uma luz que acende por dentro.<br />
              <span style={{ color: '#C9A84A' }}>Um aroma que transforma por fora.</span><br />
              E um instante que permanece em você.
            </p>
          </Reveal>
        </div>
      </section>

    </div>
  )
}

