export const products = [
  // ── PURIFICAÇÃO ──────────────────────────────────────────────
  {
    id: 'manto-de-claridade',
    collectionId: 'purificacao',
    name: 'Manto de Claridade',
    price: 'R$ 79,90',
    priceValue: 79.90,
    tagline: 'Uma limpeza que começa pelo espaço e termina na alma.',
    badge: 'Carro-chefe',
    notes: {
      top: 'Sálvia Branca',
      heart: 'Alecrim',
      base: 'Lavanda Leve',
    },
    specs: {
      burn: '40h',
      weight: '220g',
      wax: 'Cera vegetal pura',
      wick: 'Pavio de algodão',
    },
    packaging: 'Embalagem sustentável e reutilizável',
    description: 'Uma vela criada para abrir espaço — no ambiente e dentro de você. Os aromas de sálvia branca, alecrim e lavanda leve trabalham juntos para dissipar o peso do dia e convidar ao recomeço.',
  },
  // ── SERENIDADE ───────────────────────────────────────────────
  {
    id: 'acalanto-da-alma',
    collectionId: 'serenidade',
    name: 'Acalanto da Alma',
    price: 'R$ 79,90',
    priceValue: 79.90,
    tagline: 'O abraço quente que chega depois do longo dia.',
    badge: null,
    notes: {
      top: 'Lavanda',
      heart: 'Chá Branco',
      base: 'Âmbar Suave',
    },
    specs: {
      burn: '40h',
      weight: '220g',
      wax: 'Cera vegetal pura',
      wick: 'Pavio de algodão',
    },
    packaging: 'Embalagem sustentável e reutilizável',
    description: 'Criado para os momentos em que o corpo quer parar e a mente ainda não consegue. A lavanda, o chá branco e o âmbar suave trabalham juntos para suavizar o que está tenso e acolher o que está cansado.',
  },
  // ── ENERGIA ──────────────────────────────────────────────────
  {
    id: 'despertar-solar',
    collectionId: 'energia',
    name: 'Despertar Solar',
    price: 'R$ 84,90',
    priceValue: 84.90,
    tagline: 'A intenção que antecede cada gesto do seu dia.',
    badge: null,
    notes: {
      top: 'Laranja Doce',
      heart: 'Canela',
      base: 'Pitanga',
    },
    specs: {
      burn: '40h',
      weight: '220g',
      wax: 'Cera vegetal pura',
      wick: 'Pavio de algodão',
    },
    packaging: 'Embalagem sustentável e reutilizável',
    description: 'Para manhãs que precisam de clareza e movimento. A combinação de laranja doce, canela e pitanga ativa o ambiente e convida o corpo a entrar em ação com leveza e vitalidade.',
  },
  // ── INTUIÇÃO ─────────────────────────────────────────────────
  {
    id: 'intuicao-lunar',
    collectionId: 'intuicao',
    name: 'Intuição Lunar',
    price: 'R$ 84,90',
    priceValue: 84.90,
    tagline: 'A sabedoria que reside além do pensamento.',
    badge: null,
    notes: {
      top: 'Lírio',
      heart: 'Sândalo',
      base: 'Âmbar Quente',
    },
    specs: {
      burn: '42h',
      weight: '230g',
      wax: 'Cera vegetal pura',
      wick: 'Pavio de algodão',
    },
    packaging: 'Embalagem sustentável e reutilizável',
    description: 'Criada para meditação e conexão profunda. Um aroma que fala ao inconsciente com suavidade — lírio, sândalo e âmbar quente guiam a mente para camadas mais calmas e sábias.',
  },
]

export const getProductsByCollection = (collectionId) =>
  products.filter((p) => p.collectionId === collectionId)

export const getProductById = (id) =>
  products.find((p) => p.id === id)
