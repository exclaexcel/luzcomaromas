import { useEffect, useRef, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { collections } from '../data/collections'

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `${r}, ${g}, ${b}`
}

function getVisibleCount() {
  if (typeof window === 'undefined') return 4
  if (window.innerWidth < 640) return 1
  if (window.innerWidth < 1024) return 2
  return 4
}

function CollectionCard({ collection, index, cardWidth }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{
        flexShrink: 0,
        width: cardWidth,
        boxSizing: 'border-box',
        padding: '0 0.75rem',
      }}
    >
      <div
        style={{
          background: `rgba(${hexToRgb(collection.softColor)}, 0.12)`,
          border: `1px solid rgba(${hexToRgb(collection.color)}, 0.45)`,
          borderRadius: '2px',
          padding: '2.5rem 2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          height: '100%',
          cursor: 'default',
          transition: 'all 0.4s ease',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(30px)',
          transitionDelay: `${index * 0.08}s`,
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'translateY(-6px)'
          e.currentTarget.style.background = `rgba(${hexToRgb(collection.softColor)}, 0.20)`
          e.currentTarget.style.boxShadow = `0 16px 40px rgba(${hexToRgb(collection.color)}, 0.25), 0 4px 20px rgba(${hexToRgb(collection.softColor)}, 0.15)`
          e.currentTarget.style.borderColor = collection.color
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.background = `rgba(${hexToRgb(collection.softColor)}, 0.12)`
          e.currentTarget.style.boxShadow = 'none'
          e.currentTarget.style.borderColor = `rgba(${hexToRgb(collection.color)}, 0.45)`
        }}
      >
        <div style={{ color: collection.color, marginBottom: '1.5rem' }}>
          {collection.icon}
        </div>

        <h3 style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: '1.5rem',
          fontWeight: 400,
          color: 'var(--text-primary)',
          letterSpacing: '0.04em',
          marginBottom: '0.4rem',
        }}>
          {collection.name}
        </h3>

        <span style={{
          fontFamily: "'Raleway', sans-serif",
          fontSize: '0.65rem',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: collection.color,
          marginBottom: '1rem',
          opacity: 0.9,
        }}>
          {collection.subtitle}
        </span>

        <div style={{
          width: '40px', height: '1px',
          background: collection.color,
          margin: '0 auto 1rem',
          opacity: 0.5,
        }} />

        <p style={{
          fontFamily: "'Raleway', sans-serif",
          fontSize: '0.75rem',
          letterSpacing: '0.08em',
          color: 'var(--text-secondary)',
          fontWeight: 300,
          marginBottom: '0.75rem',
        }}>
          {collection.description}
        </p>

        {collection.tagline && (
          <p style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: '0.85rem',
            fontStyle: 'italic',
            color: `rgba(${hexToRgb(collection.color)}, 0.85)`,
            lineHeight: 1.5,
            marginTop: 'auto',
          }}>
            {collection.tagline}
          </p>
        )}
      </div>
    </div>
  )
}

export default function CollectionsShowcase() {
  const titleRef = useRef(null)
  const [titleVisible, setTitleVisible] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleCount, setVisibleCount] = useState(getVisibleCount)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTitleVisible(true) },
      { threshold: 0.2 }
    )
    if (titleRef.current) observer.observe(titleRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const onResize = () => {
      const count = getVisibleCount()
      setVisibleCount(count)
      setCurrentIndex(0)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const maxIndex = Math.max(0, collections.length - visibleCount)
  const isDesktop = visibleCount >= 4

  const prev = useCallback(() => setCurrentIndex(i => Math.max(0, i - 1)), [])
  const next = useCallback(() => setCurrentIndex(i => Math.min(maxIndex, i + 1)), [maxIndex])

  const cardWidthPct = `${100 / visibleCount}%`
  const translateX = `calc(-${currentIndex * (100 / visibleCount)}%)`

  return (
    <section
      id="colecoes"
      style={{
        backgroundColor: 'var(--bg-section-mid)',
        padding: 'clamp(6rem, 10vw, 10rem) clamp(1.5rem, 5vw, 4rem)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div
          ref={titleRef}
          className="text-center mb-16"
          style={{
            opacity: titleVisible ? 1 : 0,
            transform: titleVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s ease-out',
          }}
        >
          <span style={{
            display: 'block',
            fontFamily: "'Raleway', sans-serif",
            fontSize: '0.7rem',
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            color: '#C9A84A',
            marginBottom: '1rem',
          }}>
            Nossas Coleções
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
            Cada aroma, uma intenção
          </h2>
          <div className="section-divider mb-6" />
          <p style={{
            fontFamily: "'Raleway', sans-serif",
            fontSize: '0.95rem',
            lineHeight: 1.8,
            color: 'var(--text-secondary)',
            fontWeight: 300,
            maxWidth: '520px',
            margin: '0 auto',
          }}>
            Quatro coleções, quatro estados de alma. Escolha a sua e deixe o aroma guiar você.
          </p>
        </div>

        {/* Carrossel */}
        <div style={{ position: 'relative', marginBottom: '3rem' }}>
          {/* Botão Prev */}
          {!isDesktop && (
            <button
              onClick={prev}
              disabled={currentIndex === 0}
              style={{
                position: 'absolute',
                left: '-1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 2,
                background: 'var(--bg-navbar)',
                border: `1px solid rgba(201, 168, 74, ${currentIndex === 0 ? 0.2 : 0.6})`,
                color: currentIndex === 0 ? 'rgba(201,168,74,0.3)' : '#C9A84A',
                width: '2.2rem',
                height: '2.2rem',
                borderRadius: '50%',
                cursor: currentIndex === 0 ? 'default' : 'pointer',
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
              }}
            >
              ←
            </button>
          )}

          {/* Track */}
          <div style={{ overflow: 'hidden' }}>
            <div
              style={{
                display: 'flex',
                transform: isDesktop ? 'none' : `translateX(${translateX})`,
                transition: 'transform 0.5s ease',
              }}
            >
              {collections.map((col, i) => (
                <CollectionCard
                  key={col.id}
                  collection={col}
                  index={i}
                  cardWidth={isDesktop ? `${100 / 4}%` : cardWidthPct}
                />
              ))}
            </div>
          </div>

          {/* Botão Next */}
          {!isDesktop && (
            <button
              onClick={next}
              disabled={currentIndex >= maxIndex}
              style={{
                position: 'absolute',
                right: '-1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 2,
                background: 'var(--bg-navbar)',
                border: `1px solid rgba(201, 168, 74, ${currentIndex >= maxIndex ? 0.2 : 0.6})`,
                color: currentIndex >= maxIndex ? 'rgba(201,168,74,0.3)' : '#C9A84A',
                width: '2.2rem',
                height: '2.2rem',
                borderRadius: '50%',
                cursor: currentIndex >= maxIndex ? 'default' : 'pointer',
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
              }}
            >
              →
            </button>
          )}
        </div>

        {/* Dots */}
        {!isDesktop && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '3rem' }}>
            {collections.map((col, i) => (
              <button
                key={col.id}
                onClick={() => setCurrentIndex(Math.min(i, maxIndex))}
                style={{
                  width: i === currentIndex ? '1.5rem' : '0.45rem',
                  height: '0.45rem',
                  borderRadius: '999px',
                  background: i === currentIndex ? collections[currentIndex].color : 'var(--text-faint)',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'all 0.35s ease',
                }}
              />
            ))}
          </div>
        )}

        <div style={{ textAlign: 'center' }}>
          <Link
            to="/loja"
            style={{
              textDecoration: 'none',
              fontFamily: "'Raleway', sans-serif",
              fontSize: '0.75rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#C9A84A',
              border: '1px solid #C9A84A',
              padding: '0.85rem 2.5rem',
              borderRadius: '1px',
              display: 'inline-block',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#C9A84A'
              e.currentTarget.style.color = '#1E1035'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = '#C9A84A'
            }}
          >
            Ver Loja
          </Link>
        </div>
      </div>
    </section>
  )
}

