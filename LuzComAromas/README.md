# Luz com Aromas 🕯️

Plataforma de e-commerce e rituais para velas artesanais com identidade visual e experiência imersiva.

## Estrutura do Projeto

```
luzcomaromas/
├── src/                  # Código-fonte React
│   ├── pages/           # Páginas principais
│   ├── components/      # Componentes reutilizáveis
│   ├── data/            # Dados (produtos, coleções, cuidados)
│   ├── styles/          # Estilos globais e tema
│   └── context/         # Context APIs (theme, cart)
├── public/              # Assets estáticos
├── docs/                # Documentação e materiais de referência
│   ├── logos/           # Logos da marca
│   ├── guias/           # Guias de uso
│   └── assets/          # Imagens e recursos
├── package.json         # Dependências e scripts
├── vite.config.js       # Configuração Vite
├── vercel.json          # Configuração Vercel
└── README.md            # Este arquivo
```

## Stack Técnico

- **Frontend:** React 18 + Vite
- **Styling:** CSS Custom Properties (tema claro/escuro)
- **Backend:** Supabase (auth, database)
- **Email:** EmailJS
- **Deployment:** Vercel

## Começar

```bash
npm install
npm run dev
```

Acessar em `http://localhost:5173`

## Coleções

1. **Purificação** → Manto de Claridade
2. **Serenidade** → Acalanto da Alma
3. **Energia** → Despertar Solar
4. **Intuição** → Intuição Lunar

## Páginas

- `/` — Home
- `/colecoes` — Todas as coleções
- `/loja` — Loja com 4 produtos
- `/sobre` — História e propósito
- `/ritual` — Portal interativo de rituais
- `/produto/:id` — Detalhe de produto

## Deploy

```bash
vercel deploy        # Preview
vercel deploy --prod # Produção
```

## Ambiente

Variáveis necessárias em `.env.local`:
```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
VITE_EMAILJS_SERVICE_ID=...
VITE_EMAILJS_TEMPLATE_ID=...
VITE_EMAILJS_PUBLIC_KEY=...
```

## Versão

Atualmente em fase de desenvolvimento. Versão estável será marcada como `v1.0` no GitHub.

---

Para mais detalhes, consulte `docs/`.
