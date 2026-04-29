export const cares = [
  // Os 3 primeiros são exibidos no CareGuide da home.
  // Todos os 6 são usados no RitualManual da página /ritual.
  {
    title: 'O Corte',
    desc: 'Corte o pavio para 5mm antes de cada queima. Um corte limpo garante uma chama serena, sem fuligem e sem desperdício.',
    tip: '5 mm',
    tipLabel: 'a medida certa',
    icon: (
      <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
        <path d="M14 20 C14 20 10 16 13 13 C16 10 20 14 20 14 L36 42" stroke="#C5A059" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        <path d="M46 20 C46 20 50 16 47 13 C44 10 40 14 40 14 L24 42" stroke="#C5A059" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        <circle cx="30" cy="31" r="2.5" stroke="#C5A059" strokeWidth="1" fill="rgba(197,160,89,0.15)"/>
        <circle cx="16" cy="22" r="5" stroke="#C5A059" strokeWidth="1" fill="none"/>
        <circle cx="44" cy="22" r="5" stroke="#C5A059" strokeWidth="1" fill="none"/>
      </svg>
    ),
  },
  {
    title: 'A Memória',
    desc: 'Na primeira queima, deixe a cera derreter até a borda. A vela guarda essa memória — e repete o padrão para sempre.',
    tip: '2 a 3h',
    tipLabel: 'na primeira vez',
    icon: (
      <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
        <rect x="22" y="30" width="16" height="22" rx="1" stroke="#C5A059" strokeWidth="1.5" fill="rgba(197,160,89,0.06)"/>
        <ellipse cx="30" cy="30" rx="9" ry="2.5" stroke="#C5A059" strokeWidth="1" fill="rgba(197,160,89,0.12)"/>
        <line x1="30" y1="23" x2="30" y2="27.5" stroke="#C5A059" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M30 22 C30 22 24 16 26 11 C27 8 30 6 30 6 C30 6 33 8 34 11 C36 16 30 22 30 22Z" stroke="#C5A059" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
        <path d="M30 20 C30 20 27 16 28 13 C29 11 30 10 30 10 C30 10 31 11 32 13 C33 16 30 20 30 20Z" fill="rgba(197,160,89,0.15)"/>
      </svg>
    ),
  },
  {
    title: 'O Cuidado',
    desc: 'Guarde sua vela longe da luz direta e de correntes de ar. Acenda com intenção, apague com suavidade. A magia se preserva.',
    tip: 'fresco e calmo',
    tipLabel: 'o ambiente ideal',
    icon: (
      <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
        <path d="M30 50 C30 50 12 38 12 24 C12 14 20 8 30 8 C40 8 48 14 48 24 C48 38 30 50 30 50Z" stroke="#C5A059" strokeWidth="1.5" fill="rgba(197,160,89,0.07)" strokeLinejoin="round"/>
        <line x1="30" y1="50" x2="30" y2="12" stroke="#C5A059" strokeWidth="1" strokeLinecap="round" opacity="0.7"/>
        <path d="M30 22 Q22 20 18 17" stroke="#C5A059" strokeWidth="0.75" strokeLinecap="round" opacity="0.5"/>
        <path d="M30 30 Q20 28 16 24" stroke="#C5A059" strokeWidth="0.75" strokeLinecap="round" opacity="0.5"/>
        <path d="M30 38 Q21 36 18 32" stroke="#C5A059" strokeWidth="0.75" strokeLinecap="round" opacity="0.5"/>
        <path d="M30 22 Q38 20 42 17" stroke="#C5A059" strokeWidth="0.75" strokeLinecap="round" opacity="0.5"/>
        <path d="M30 30 Q40 28 44 24" stroke="#C5A059" strokeWidth="0.75" strokeLinecap="round" opacity="0.5"/>
        <path d="M30 38 Q39 36 42 32" stroke="#C5A059" strokeWidth="0.75" strokeLinecap="round" opacity="0.5"/>
      </svg>
    ),
  },
  {
    title: 'O Tempo',
    desc: 'Respeite os ciclos da sua vela. Não acenda por mais de 4 horas seguidas — o calor acumulado pode alterar a estrutura da cera e encurtar a vida da vela.',
    tip: 'máx. 4h',
    tipLabel: 'por queima',
    icon: (
      <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
        <circle cx="30" cy="32" r="16" stroke="#C5A059" strokeWidth="1.5" fill="rgba(197,160,89,0.06)"/>
        <path d="M30 20 L30 32 L38 36" stroke="#C5A059" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M24 10 L36 10" stroke="#C5A059" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="30" y1="10" x2="30" y2="16" stroke="#C5A059" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: 'A Extinção',
    desc: 'Nunca apague a chama com um sopro. Use um apagador ou dobre suavemente o pavio para dentro da cera líquida — evita fumaça e preserva o aroma.',
    tip: 'sem sopro',
    tipLabel: 'com delicadeza',
    icon: (
      <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
        <path d="M30 42 C30 42 22 36 22 28 C22 22 25.6 17 30 17 C34.4 17 38 22 38 28 C38 36 30 42 30 42Z" stroke="#C5A059" strokeWidth="1.5" fill="none"/>
        <path d="M26 32 Q30 28 34 32" stroke="#C5A059" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.6"/>
        <line x1="14" y1="14" x2="46" y2="46" stroke="#C5A059" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
        <line x1="46" y1="14" x2="14" y2="46" stroke="#C5A059" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
      </svg>
    ),
  },
  {
    title: 'O Renascimento',
    desc: 'Quando sua vela chegar ao fim, o frasco é seu. Limpe com água quente e reutilize para guardar flores secas, cristais ou anotações. A magia continua.',
    tip: 'upcycling',
    tipLabel: 'nova vida ao frasco',
    icon: (
      <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
        <path d="M30 14 C22 14 16 20 16 28 C16 36 22 42 30 42 C38 42 44 36 44 28" stroke="#C5A059" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M44 18 L44 28 L34 28" stroke="#C5A059" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="30" cy="28" r="4" fill="rgba(197,160,89,0.18)" stroke="#C5A059" strokeWidth="1"/>
        <path d="M27 46 L33 46 M29 46 L29 50 M31 46 L31 50" stroke="#C5A059" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
      </svg>
    ),
  },
]
