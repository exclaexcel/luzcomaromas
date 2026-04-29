import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { collections } from '../data/collections'
import { getProductById } from '../data/products'

const QUESTIONS = [
  {
    id: 1,
    text: 'O que você mais precisa neste momento?',
    options: [
      { text: 'Descansar sem culpa', collection: 'serenidade' },
      { text: 'Sentir mais ânimo e presença', collection: 'energia' },
      { text: 'Escutar o que existe dentro de mim', collection: 'intuicao' },
      { text: 'Limpar o que está pesado e recomeçar', collection: 'purificacao' },
    ],
  },
  {
    id: 2,
    text: 'Como você quer se sentir depois do seu ritual?',
    options: [
      { text: 'Acolhida e em paz', collection: 'serenidade' },
      { text: 'Desperta e em movimento', collection: 'energia' },
      { text: 'Conectada com minha verdade', collection: 'intuicao' },
      { text: 'Leve e renovada', collection: 'purificacao' },
    ],
  },
  {
    id: 3,
    text: 'Qual imagem combina mais com o seu agora?',
    options: [
      { text: 'Um quarto silencioso, luz suave e tempo desacelerando', collection: 'serenidade' },
      { text: 'O sol entrando pela janela e o corpo ganhando impulso', collection: 'energia' },
      { text: 'A noite calma, a lua alta e um instante de escuta', collection: 'intuicao' },
      { text: 'Ar novo atravessando a casa depois de abrir tudo', collection: 'purificacao' },
    ],
  },
  {
    id: 4,
    text: 'Se o seu ritual pudesse te oferecer uma palavra hoje, qual seria?',
    options: [
      { text: 'Pausa', collection: 'serenidade' },
      { text: 'Chama', collection: 'energia' },
      { text: 'Escuta', collection: 'intuicao' },
      { text: 'Renovação', collection: 'purificacao' },
    ],
  },
]

const RESULTS = {
  purificacao: {
    title: 'Névoa Sagrada',
    subtitle: 'Renovar o espaço',
    text: 'Seu momento pede limpeza, clareza e uma pausa para deixar ir o que pesa.\nTalvez seja hora de abrir as janelas — do ambiente e de dentro — e permitir que o ar mude, que a energia se mova e que o excesso encontre saída.',
    productId: 'manto-de-claridade',
    productName: 'Manto de Claridade',
    productText: 'Um ritual para purificar o ambiente, suavizar a atmosfera e marcar recomeços com presença e intenção.',
  },
  serenidade: {
    title: 'Águas Calmas',
    subtitle: 'Viver a pausa',
    text: 'Seu agora parece pedir desaceleração, acolhimento e um respiro mais gentil.\nTalvez seja o momento de baixar o ritmo, amaciar o corpo e lembrar que pausar não é parar — é também uma forma de cuidado.',
    productId: 'acalanto-da-alma',
    productName: 'Acalanto da Alma',
    productText: 'Um ritual para envolver o ambiente em quietude, ternura e descanso sensorial.',
  },
  energia: {
    title: 'Chama Viva',
    subtitle: 'Acender a intenção',
    text: 'Seu momento pede presença, impulso e uma chama acesa no lugar certo.\nNão se trata de pressa, mas de movimento com direção — um convite para despertar o corpo, clarear a mente e se aproximar do que quer ganhar forma.',
    productId: 'despertar-solar',
    productName: 'Despertar Solar',
    productText: 'Um ritual para trazer vitalidade ao ambiente e reacender a força suave do começo.',
  },
  intuicao: {
    title: 'Lua Interior',
    subtitle: 'Escutar o interior',
    text: 'Seu agora parece pedir escuta, presença e menos ruído.\nTalvez seja hora de se aproximar do que é sutil, desacelerar as distrações e abrir espaço para aquilo que já existe em você, mesmo antes de ganhar nome.',
    productId: 'intuicao-lunar',
    productName: 'Intuição Lunar',
    productText: 'Um ritual para envolver o ambiente em recolhimento, profundidade e conexão interior.',
  },
}

function calcResult(answers) {
  const counts = { serenidade: 0, energia: 0, intuicao: 0, purificacao: 0 }
  answers.forEach((a) => counts[a]++)
  const max = Math.max(...Object.values(counts))
  const winners = Object.keys(counts).filter((k) => counts[k] === max)
  return winners.length === 1 ? winners[0] : answers[0]
}

export default function Quiz() {
  const navigate = useNavigate()
  const [phase, setPhase] = useState('intro')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState([])

  const handleAnswer = (collectionId) => {
    const newAnswers = [...answers, collectionId]
    setAnswers(newAnswers)

    if (currentQuestion === 3) {
      const result = calcResult(newAnswers)
      setTimeout(() => {
        setPhase('transition')
      }, 100)
      setTimeout(() => {
        setPhase('result')
      }, 2500)
    } else {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handleReset = () => {
    setPhase('intro')
    setCurrentQuestion(0)
    setAnswers([])
  }

  if (phase === 'intro') {
    return <IntroPhase onStart={() => setPhase('question')} />
  }

  if (phase === 'question') {
    return <QuestionPhase question={QUESTIONS[currentQuestion]} onAnswer={handleAnswer} progress={currentQuestion + 1} />
  }

  if (phase === 'transition') {
    return <TransitionPhase />
  }

  if (phase === 'result') {
    const resultCollectionId = calcResult(answers)
    const resultData = RESULTS[resultCollectionId]
    const collection = collections.find((c) => c.id === resultCollectionId)
    const product = getProductById(resultData.productId)

    return <ResultPhase result={resultData} collection={collection} product={product} onReset={handleReset} />
  }
}

function IntroPhase({ onStart }) {
  return (
    <div
      style={{
        minHeight: '100dvh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(2rem, 5vw, 4rem)',
        backgroundColor: 'var(--bg-page)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          backgroundImage:
            'radial-gradient(ellipse at 30% 50%, rgba(217, 142, 180, 0.08) 0%, transparent 55%), radial-gradient(ellipse at 70% 50%, rgba(155, 111, 196, 0.08) 0%, transparent 55%)',
        }}
      />

      <div style={{ maxWidth: '600px', width: '100%', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem', animation: 'fadeInUp 0.6s ease 0.1s both' }}>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(2rem, 6vw, 3.5rem)',
              fontWeight: 300,
              color: 'var(--text-primary)',
              marginBottom: '1.5rem',
              letterSpacing: '0.03em',
              lineHeight: 1.2,
            }}
          >
            Qual ritual chama você hoje?
          </h1>

          <p
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(1rem, 3vw, 1.2rem)',
              fontStyle: 'italic',
              color: 'var(--text-secondary)',
              lineHeight: 1.8,
              marginBottom: '0.5rem',
            }}
          >
            Nem sempre sabemos o que escolher. Às vezes, só sabemos como estamos.
          </p>

          <p
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(1rem, 3vw, 1.2rem)',
              fontStyle: 'italic',
              color: 'var(--text-secondary)',
              lineHeight: 1.8,
              marginBottom: '2rem',
            }}
          >
            Responda 4 perguntas e descubra a coleção que mais combina com o seu momento.
          </p>

          <div className="section-divider" style={{ marginBottom: '2rem' }} />
        </div>

        <div
          style={{
            display: 'flex',
            gap: 'clamp(1rem, 3vw, 1.5rem)',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '1.5rem',
            animation: 'fadeInUp 0.6s ease 0.2s both',
          }}
        >
          <button
            onClick={onStart}
            style={{
              padding: 'clamp(0.8rem, 2vw, 1rem) clamp(2rem, 5vw, 3rem)',
              background: '#C9A84A',
              border: 'none',
              color: '#1E1035',
              fontFamily: "'Raleway', sans-serif",
              fontSize: 'clamp(0.85rem, 2vw, 1rem)',
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
            onClick={() => (window.location.href = '/loja')}
            style={{
              padding: 'clamp(0.8rem, 2vw, 1rem) clamp(2rem, 5vw, 3rem)',
              background: 'transparent',
              border: '1px solid #C9A84A',
              color: '#C9A84A',
              fontFamily: "'Raleway', sans-serif",
              fontSize: 'clamp(0.85rem, 2vw, 1rem)',
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
            fontSize: 'clamp(0.65rem, 1.5vw, 0.75rem)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            textAlign: 'center',
            animation: 'fadeInUp 0.6s ease 0.3s both',
          }}
        >
          4 perguntas · menos de 1 minuto
        </p>
      </div>
    </div>
  )
}

function QuestionPhase({ question, onAnswer, progress }) {
  return (
    <div
      style={{
        minHeight: '100dvh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(2rem, 5vw, 4rem)',
        backgroundColor: 'var(--bg-page)',
      }}
    >
      <div style={{ maxWidth: '600px', width: '100%' }}>
        <div style={{ marginBottom: '2rem' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem',
            }}
          >
            <span
              style={{
                fontFamily: "'Raleway', sans-serif",
                fontSize: '0.7rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
              }}
            >
              Pergunta {progress}
            </span>
            <span
              style={{
                fontFamily: "'Raleway', sans-serif",
                fontSize: '0.7rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
              }}
            >
              {progress}/4
            </span>
          </div>

          <div
            style={{
              height: '3px',
              background: 'var(--border-subtle)',
              borderRadius: '1px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                background: '#C9A84A',
                width: `${(progress / 4) * 100}%`,
                transition: 'width 0.4s ease',
              }}
            />
          </div>
        </div>

        <h2
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(1.8rem, 5vw, 2.5rem)',
            fontWeight: 300,
            color: 'var(--text-primary)',
            marginBottom: '2.5rem',
            letterSpacing: '0.02em',
            lineHeight: 1.3,
          }}
        >
          {question.text}
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1rem, 3vw, 1.5rem)' }}>
          {question.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => onAnswer(option.collection)}
              style={{
                padding: 'clamp(1rem, 3vw, 1.5rem)',
                background: 'transparent',
                border: '1px solid rgba(201, 168, 74, 0.4)',
                color: 'var(--text-primary)',
                fontFamily: "'Raleway', sans-serif",
                fontSize: 'clamp(0.9rem, 3vw, 1rem)',
                letterSpacing: '0.05em',
                cursor: 'pointer',
                borderRadius: '1px',
                transition: 'all 0.3s ease',
                textAlign: 'left',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#C9A84A'
                e.currentTarget.style.background = 'rgba(201, 168, 74, 0.05)'
                e.currentTarget.style.transform = 'translateX(8px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(201, 168, 74, 0.4)'
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.transform = 'translateX(0)'
              }}
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function TransitionPhase() {
  return (
    <div
      style={{
        minHeight: '100dvh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(2rem, 5vw, 4rem)',
        backgroundColor: 'var(--bg-page)',
      }}
    >
      <style>{`
        @keyframes pulseGlow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
        .transition-pulse {
          animation: pulseGlow 1.5s ease-in-out infinite;
        }
      `}</style>

      <div style={{ textAlign: 'center', maxWidth: '400px' }}>
        <div
          className="transition-pulse"
          style={{
            fontSize: '4rem',
            marginBottom: '2rem',
            color: '#C9A84A',
          }}
        >
          ✨
        </div>
        <p
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(1.2rem, 4vw, 1.8rem)',
            fontStyle: 'italic',
            color: 'var(--text-secondary)',
            letterSpacing: '0.05em',
          }}
        >
          O ritual encontrou você…
        </p>
      </div>
    </div>
  )
}

function ResultPhase({ result, collection, product, onReset }) {
  const navigate = useNavigate()

  return (
    <div
      style={{
        minHeight: '100dvh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(2rem, 5vw, 4rem)',
        backgroundColor: 'var(--bg-page)',
      }}
    >
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div style={{ maxWidth: '640px', width: '100%' }}>
        <div
          style={{
            textAlign: 'center',
            marginBottom: '2rem',
            animation: 'fadeInUp 0.6s ease 0.1s both',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '2rem',
              color: collection.color,
            }}
          >
            {collection.icon}
          </div>

          <span
            style={{
              display: 'block',
              fontFamily: "'Raleway', sans-serif",
              fontSize: '0.7rem',
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              color: '#C9A84A',
              marginBottom: '1rem',
            }}
          >
            Seu ritual de agora é
          </span>

          <h1
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(2rem, 6vw, 3rem)',
              fontWeight: 300,
              color: 'var(--text-primary)',
              marginBottom: '0.5rem',
              letterSpacing: '0.02em',
            }}
          >
            {collection.name}
          </h1>

          <h2
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(1.3rem, 4vw, 1.8rem)',
              fontStyle: 'italic',
              color: collection.color,
              marginBottom: '0.5rem',
              letterSpacing: '0.02em',
            }}
          >
            {result.title}
          </h2>

          <p
            style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: '0.75rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              marginBottom: '1.5rem',
            }}
          >
            {result.subtitle}
          </p>

          <div className="section-divider" style={{ marginBottom: '2rem' }} />
        </div>

        <div
          style={{
            animation: 'fadeInUp 0.6s ease 0.2s both',
          }}
        >
          {result.text.split('\n').map((paragraph, idx) => (
            <p
              key={idx}
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(1rem, 2.5vw, 1.15rem)',
                fontStyle: 'italic',
                color: 'var(--text-secondary)',
                lineHeight: 1.8,
                marginBottom: '1.2rem',
              }}
            >
              {paragraph}
            </p>
          ))}
        </div>

        <div
          style={{
            marginTop: '2.5rem',
            padding: '1.5rem',
            border: `1px solid ${collection.color}`,
            borderRadius: '2px',
            animation: 'fadeInUp 0.6s ease 0.3s both',
          }}
        >
          <span
            style={{
              display: 'block',
              fontFamily: "'Raleway', sans-serif",
              fontSize: '0.65rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              marginBottom: '0.8rem',
            }}
          >
            Produto indicado
          </span>

          <h3
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(1.2rem, 4vw, 1.5rem)',
              fontWeight: 300,
              color: 'var(--text-primary)',
              marginBottom: '0.8rem',
              letterSpacing: '0.02em',
            }}
          >
            {result.productName}
          </h3>

          <p
            style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: 'clamp(0.9rem, 2vw, 1rem)',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
            }}
          >
            {result.productText}
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: window.innerWidth < 600 ? 'column' : 'row',
            gap: '1.5rem',
            marginTop: '2rem',
            animation: 'fadeInUp 0.6s ease 0.4s both',
          }}
        >
          <button
            onClick={() => navigate('/colecoes')}
            style={{
              flex: 1,
              padding: 'clamp(0.9rem, 2vw, 1.1rem)',
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
            Conhecer a coleção
          </button>

          <button
            onClick={() => navigate(`/produto/${result.productId}`)}
            style={{
              flex: 1,
              padding: 'clamp(0.9rem, 2vw, 1.1rem)',
              background: collection.color,
              border: 'none',
              color: '#fff',
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
              e.currentTarget.style.boxShadow = `0 8px 20px ${collection.glowColor}`
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            Ver o produto
          </button>
        </div>

        <div
          style={{
            textAlign: 'center',
            marginTop: '2rem',
            animation: 'fadeInUp 0.6s ease 0.5s both',
          }}
        >
          <button
            onClick={onReset}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              fontFamily: "'Raleway', sans-serif",
              fontSize: '0.85rem',
              letterSpacing: '0.1em',
              cursor: 'pointer',
              transition: 'color 0.3s ease',
              padding: '0.5rem',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#C9A84A'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--text-muted)'
            }}
          >
            → refazer o quiz
          </button>
        </div>
      </div>
    </div>
  )
}
