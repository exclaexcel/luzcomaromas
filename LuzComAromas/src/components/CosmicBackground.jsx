import { useMemo } from 'react'
import { useTheme } from '../context/ThemeContext'

export default function CosmicBackground() {
  const { isDark } = useTheme()
  const stars = useMemo(() =>
    [...Array(100)].map((_, i) => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() < 0.12 ? `${Math.random() * 2 + 2}px` : `${Math.random() * 1.5 + 0.5}px`,
      isGold: i % 6 === 0,
      duration: `${3 + Math.random() * 6}s`,
      delay: `${Math.random() * 8}s`,
      opacity: Math.random() * 0.5 + 0.15,
    })), [])

  const dust = useMemo(() =>
    [...Array(18)].map(() => ({
      left: `${20 + Math.random() * 60}%`,
      bottom: `${Math.random() * 50}%`,
      size: `${Math.random() * 2.5 + 1}px`,
      duration: `${8 + Math.random() * 10}s`,
      delay: `${Math.random() * 8}s`,
      drift: `${(Math.random() - 0.5) * 60}px`,
    })), [])

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 0,
      pointerEvents: 'none',
      overflow: 'hidden',
      background: isDark
        ? 'radial-gradient(ellipse at 50% 100%, #2D1450 0%, #1A0C36 45%, #0E0620 100%)'
        : 'radial-gradient(ellipse at 50% 100%, #C8B4E8 0%, #DAD0F5 45%, #F3ECFA 100%)',
    }}>
      {/* Estrelas */}
      {stars.map((s, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: s.size, height: s.size,
          borderRadius: '50%',
          left: s.left, top: s.top,
          background: s.isGold ? '#C9A84A' : (isDark ? 'var(--text-primary)' : '#9B6FC4'),
          opacity: isDark ? s.opacity : s.opacity * 0.35,
          boxShadow: s.isGold
            ? '0 0 5px rgba(212,184,74,0.9)'
            : '0 0 3px var(--text-secondary)',
          animation: `cosmicTwinkle ${s.duration} ${s.delay} infinite ease-in-out alternate`,
        }} />
      ))}

      {/* Raio de luz dourado central */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        height: '70%',
        background: 'conic-gradient(from 270deg at 50% 100%, transparent 65deg, rgba(212,184,74,0.05) 88deg, rgba(212,184,74,0.09) 100deg, rgba(212,184,74,0.05) 112deg, transparent 135deg)',
      }} />

      {/* Halo suave no centro-baixo */}
      <div style={{
        position: 'absolute',
        bottom: '-80px', left: '50%',
        transform: 'translateX(-50%)',
        width: '700px', height: '400px',
        background: 'radial-gradient(ellipse at 50% 80%, rgba(212,184,74,0.10) 0%, rgba(155,111,196,0.07) 45%, transparent 70%)',
        filter: 'blur(50px)',
      }} />

      {/* Halo violeta esquerdo */}
      <div style={{
        position: 'absolute',
        top: '20%', left: '-10%',
        width: '500px', height: '500px',
        background: 'radial-gradient(circle, rgba(155,111,196,0.10) 0%, transparent 70%)',
        filter: 'blur(60px)',
        animation: 'driftA 20s infinite alternate ease-in-out',
      }} />

      {/* Halo rosado direito */}
      <div style={{
        position: 'absolute',
        bottom: '15%', right: '-10%',
        width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(217,142,180,0.08) 0%, transparent 70%)',
        filter: 'blur(60px)',
        animation: 'driftB 16s infinite alternate ease-in-out',
      }} />

      {/* Linhas geométricas douradas */}
      <svg style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        opacity: 0.13,
      }} viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        <line x1="720" y1="900" x2="0"    y2="80"  stroke="#C9A84A" strokeWidth="0.6"/>
        <line x1="720" y1="900" x2="1440" y2="80"  stroke="#C9A84A" strokeWidth="0.6"/>
        <line x1="720" y1="900" x2="180"  y2="0"   stroke="#C9A84A" strokeWidth="0.35"/>
        <line x1="720" y1="900" x2="1260" y2="0"   stroke="#C9A84A" strokeWidth="0.35"/>
        <polygon points="720,220 830,420 720,620 610,420" stroke="#C9A84A" strokeWidth="0.6" fill="none"/>
        <ellipse cx="720" cy="-80" rx="420" ry="360" stroke="#C9A84A" strokeWidth="0.4" fill="none"/>
      </svg>

      {/* Poeira dourada flutuante */}
      {dust.map((p, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: p.size, height: p.size,
          background: 'radial-gradient(circle, rgba(212,184,74,0.9), transparent)',
          borderRadius: '50%',
          left: p.left, bottom: p.bottom,
          animation: `cosmicDust ${p.duration} ${p.delay} infinite ease-in-out`,
          '--drift': p.drift,
        }} />
      ))}

      <style>{`
        @keyframes cosmicTwinkle {
          0%   { opacity: 0.15; transform: scale(1); }
          100% { opacity: 0.85; transform: scale(1.5); }
        }
        @keyframes cosmicDust {
          0%   { opacity: 0;   transform: translateY(0) translateX(0) scale(0.4); }
          20%  { opacity: 0.6; }
          80%  { opacity: 0.2; }
          100% { opacity: 0;   transform: translateY(-200px) translateX(var(--drift, 0)) scale(1.2); }
        }
        @keyframes driftA {
          0%   { transform: translate(0, 0) scale(1); }
          100% { transform: translate(50px, 70px) scale(1.1); }
        }
        @keyframes driftB {
          0%   { transform: translate(0, 0) scale(1); }
          100% { transform: translate(-40px, -50px) scale(1.08); }
        }
      `}</style>
    </div>
  )
}

