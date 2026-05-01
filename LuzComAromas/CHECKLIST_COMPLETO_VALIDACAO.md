# ✅ CHECKLIST COMPLETO — LuzComAromas
**Data:** 2026-04-30 | Todas as alterações desta sessão de trabalho

---

## 🔴 SEÇÃO 1 — COMPORTAMENTO DE NAVEGAÇÃO

### 1.1 Scroll ao Topo ao Trocar de Página
- [ ] Estando no final da home, clique em "Coleções" na navbar → página abre **do topo**
- [ ] Estando no final de `/colecoes`, clique em "Loja" → abre **do topo**
- [ ] Clique no CTA "Acessar manual de cuidados" → `/manual` abre **do topo**
- [ ] Clique no CTA "Conhecer as coleções" (manual) → `/colecoes` abre **do topo**
- [ ] Botão voltar do navegador → página retorna ao **topo**

### 1.2 Botão "Voltar ao Topo" (ScrollToTop)
- [ok] Role qualquer página além de 320px → botão circular com chama aparece (canto inf. direito)
- [ok] Clique no botão → volta ao topo com scroll **suave**
- [ok] Hover no botão → escala levemente e brilha
- [ok] Ao chegar ao topo → botão **desaparece**

---

## 🟠 SEÇÃO 2 — HOME

### 2.1 Botão "Entrar no Ritual" — Removido
- [ok] Seção "Portal Exclusivo" exibe: ícone, eyebrow, título e texto descritivo
- [ok] **Sem botão** "Entrar no Ritual" visível
- [ok] Console (F12) sem erros de `<Link>` indefinido

### 2.2 Seção de Cuidados — Teaser
- [ok] Título: **"Um cuidado à altura da sua luz"**
- [ok] Parágrafo itálico: "Para que cada momento com a sua vela siga bonito..."
- [ok] Parágrafo simples: "Veja o manual completo de cuidados..."
- [ok] CTA: **"ACESSAR MANUAL DE CUIDADOS"** (botão dourado)
- [ok] Clique no CTA → navega para `/manual`
- [ok] **Sem cards ou grid** de cuidados na home

### 2.3 CTA "Descobrir as Coleções"
- [ok] Botão aparece no hero com texto "Descobrir as Coleções"
- [ok] Clique → navega para `/colecoes` (não `/loja`)

### 2.4 Cards de Coleções na Home
- [ok] 4 cards aparecem com cores distintas
- [ok] Serenidade → roxo `#9B6FC4`
- [ok] Energia → laranja `#C97A4A`
- [ok] Intuição → violeta `#9A6A8D`
- [ok] Purificação → verde menta `#6FA88A`
- [ok] Nenhum card exibe `rgba(NaN...)` (verificar DevTools → Computed Styles)

---

## 🟡 SEÇÃO 3 — NAVBAR

### 3.1 Ícones nos Links (Desktop)
- [ok] **Home** → ícone de chama ao lado do texto
- [ok] **Sobre** → ícone de espiral/círculo
- [ok] **Coleções** → ícone de 4 círculos
- [ok] **Loja** → ícone de sacola
- [ok] **Ritual** → ícone de lua (botão destacado em dourado)
- [ok] Ícones são pequenos, alinhados ao texto, sem quebrar layout

### 3.2 Menu Mobile
- [ok] Hamburger abre menu com todos os links
- [ok] Cada link no mobile também exibe seu ícone
- [ok] Clique em qualquer link fecha o menu automaticamente

### 3.3 Link Ativo
- [ok] Link da página atual fica destacado em dourado com sublinhado
- [ok] Funciona em todas as rotas testadas

---

## 🟢 SEÇÃO 4 — MANUAL (`/manual`)

### 4.1 Hero da Página
- [ok] Eyebrow: "GUIA DE CUIDADOS"
- [ok] Título H1: **"Manual de Cuidados com a sua Vela"**
- [ok] Divisor dourado entre título e subtítulo
- [ok] Subtítulo itálico: "Pequenos gestos ajudam a preservar a beleza da queima..."

### 4.2 Bloco Introdutório
- [ok] "Cada vela carrega uma experiência pensada para durar com presença, beleza e segurança."
- [ok] "Com alguns cuidados simples, o ritual se mantém mais harmonioso..."

### 4.3 Os 8 Blocos de Cuidados (nesta ordem)
- [ok] **01** — Antes de acender
- [ok] **02** — A primeira queima
- [ok] **03** — Antes de reacender
- [ok] **04** — Durante o uso
- [ok] **05** — Enquanto estiver acesa
- [ok] **06** — Ao apagar
- [ok] **07** — Quando restar pouca cera
- [ok] **08** — Pequenos cuidados extras
- [ok] Cada bloco: número dourado translúcido + ícone SVG + título + texto
- [ok] Animação de entrada ao rolar (fade + slide, stagger suave)

### 4.4 Bloco Final
- [ok] "Cuidar da sua vela também é uma forma de prolongar a experiência."
- [ok] "Com presença nos pequenos gestos, cada chama segue mais bonita..."
- [ok] CTA: **"CONHECER AS COLEÇÕES"** → navega para `/colecoes`

---

## 🔵 SEÇÃO 5 — COLEÇÕES (`/colecoes`)

### 5.1 CTAs Oficiais por Coleção
- [ok] Serenidade → **"Permita a pausa"**
- [ok] Energia → **"Acenda sua intenção"**
- [ok] Intuição → **"Escute com presença"**
- [ok] Purificação → **"Renove o espaço"**

### 5.2 Cores dos Cards
- [ok] Todos os 4 cards com background colorido (não transparente/NaN)
- [ok] Hover → "brilho" suave aparece no card

---

## 🟣 SEÇÃO 6 — SOBRE (`/sobre`)

### 6.1 Gênero no Texto
- [ok] Seção Intuição → texto contém **"a si mesma"** (não "mesmo")

---

## ⚫ SEÇÃO 7 — ACESSIBILIDADE

### 7.1 Formulário de Contato
- [ok] Clique na label "Nome" → foca no input
- [ok] Clique na label "Email" → foca no input
- [ok] Clique na label "Coleção de Interesse" → abre o select
- [ok] Clique na label "Mensagem" → foca no textarea

### 7.2 Newsletter (Footer)
- [ok] Clique na label "Email" → foca no input
- [x] Email inválido → mensagem de erro em violeta
- [x] Email válido → mensagem de sucesso dourada

### 7.3 SVGs Decorativos
- [ok] DevTools → inspecionar ícone Instagram → `aria-hidden="true"` presente
- [ok] DevTools → inspecionar ícone WhatsApp → `aria-hidden="true"` presente

---

## 🟤 SEÇÃO 8 — FOOTER

### 8.1 Copyright
- [ok] Texto: `© 2026 LuzComAromas · Aromas que acendem momentos`
- [ok] Ano é dinâmico (`new Date().getFullYear()`)

### 8.2 Links Sociais
- [ok] Hover Instagram → cor muda para violeta `#9A6A8D`, ícone sobe
- [ok] Hover WhatsApp → cor muda para verde `#25D366`, ícone sobe

---

## ⚪ SEÇÃO 9 — CONSOLE E PERFORMANCE

- [ok] Home (`/`) — Console sem erros vermelhos
- [ok] Manual (`/manual`) — Console sem erros vermelhos
- [ok] Coleções (`/colecoes`) — Console sem erros vermelhos
- [ok] Nenhum `rgba(NaN...)` no DevTools → Computed Styles
- [ok] Páginas carregam em < 3 segundos

---

## 📊 RESULTADO FINAL

```
1. Scroll ao topo ao navegar:       ☑️ OK / ❌
2. Botão ScrollToTop:               ☑️ OK / ❌
3. Botão "Entrar no Ritual" removido: ☑️ OK / ❌
4. Home — seção de cuidados (teaser): ☑️ OK / ❌
5. Home — CTA "Descobrir as Coleções": ☑️ OK / ❌
6. Home — cores dos 4 cards:        ☑️ OK / ❌
7. Navbar com ícones:               ☑️ OK / ❌
8. Manual — hero atualizado:        ☑️ OK / ❌
9. Manual — 8 blocos canônicos:     ☑️ OK / ❌
10. Manual — bloco final + CTA:     ☑️ OK / ❌
11. Coleções — CTAs oficiais:       ☑️ OK / ❌
12. Sobre — "a si mesma":           ☑️ OK / ❌
13. Acessibilidade (htmlFor/aria):  ☑️ OK / ❌
14. Footer — copyright dinâmico:    ☑️ OK / ❌
15. Console sem erros:              ☑️ OK / ❌

Problemas encontrados:
- (descreva aqui)
```
1.1 Scroll ao Topo ao Trocar de Página

teste apenas em localhost - ainda não executado

percebi que o quiz sumiu tanto da home quanto da página da loja.
