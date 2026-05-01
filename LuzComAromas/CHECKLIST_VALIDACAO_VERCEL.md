# ✅ CHECKLIST DE VALIDAÇÃO — LuzComAromas no Vercel

**Data:** 2026-04-30  
**URL Vercel:** (será preenchida após deploy)  
**Duração estimada:** 10-15 minutos  
**Navegador:** Chrome/Edge (F12 aberto para DevTools)

---

## 📋 SEÇÃO 1: MUDANÇAS CRÍTICAS IMPLEMENTADAS

### 1.1 Remoção do Botão "Entrar no Ritual"
- [ ] **Home page carrega** sem erros de console
- [ ] **Seção "Portal Exclusivo"** aparece com:
  - Ícone de chama aceso
  - Título "O Oráculo está esperando por você"
  - Texto descritivo completo
  - **SEM botão "Entrar no Ritual"** ✓
- [ ] **DevTools (F12) → Console:** Nenhum erro de `<Link>` indefinido
- [ ] **Comportamento:** Seção ainda tem animação de entrada suave (fade + slideUp)

### 1.2 Sistema de Cores Canônicas
Validar em `/colecoes` e `/loja`:

| Coleção | Cor esperada | Card visível? | Hover funciona? |
|---------|---|---|---|
| **Serenidade** | `#9B6FC4` (roxo) | ☐ | ☐ |
| **Energia** | `#C97A4A` (laranja) | ☐ | ☐ |
| **Intuição** | `#9A6A8D` (violeta) | ☐ | ☐ |
| **Purificação** | `#6FA88A` (verde menta) | ☐ | ☐ |

**DevTools check:**
- [ ] Inspecionar cada card → **Computed Styles**
- [ ] `background-color` deve ser cor hexadecimal ou rgba válido
- [ ] ❌ **NUNCA** deve aparecer `rgba(NaN, NaN, NaN, ...)`

### 1.3 Soft Color (Hover nos Cards)
- [ ] Passar mouse sobre card → aparece "brilho" suave (muito transparente)
- [ ] DevTools → background-color do card em hover → deve ser rgba com opacidade baixa (0.15-0.25)
- [ ] ❌ Nunca `rgba(NaN...)`

---

## 🔤 SEÇÃO 2: CTÁS E TEXTOS OFICIAIS

### 2.1 Página `/colecoes` — CTAs por Coleção
Clicar em cada card e verificar:

- [ ] **Serenidade:** Botão diz "Permita a pausa"
- [ ] **Energia:** Botão diz "Acenda sua intenção"
- [ ] **Intuição:** Botão diz "Escute com presença"
- [ ] **Purificação:** Botão diz "Renove o espaço"

**Hover nos CTAs:**
- [ ] Botão muda cor e tem efeito visual (sobe/brilho)
- [ ] Transição é suave (sem piscar)

### 2.2 Home — "Descobrir as Coleções"
- [ ] Texto dourado no hero: "Descobrir as Coleções"
- [ ] **Clique nele:**
  - ✓ Navega para `/colecoes` (não `/loja`)
  - ✓ URL muda para `/.../colecoes`
- [ ] Hover: botão tem efeito visual

### 2.3 Página `/sobre` — Gênero
- [ ] Buscar no texto seção "Intuição"
- [ ] Deve dizer: "...para ouvir a si **mesma**" (não "mesmo")
- [ ] DevTools → Ctrl+F → buscar `"si mesma"` → deve encontrar

---

## 🎨 SEÇÃO 3: NAVBAR E NAVEGAÇÃO

### 3.1 Navbar Desktop (≥768px)
- [ ] Logo "LuzComAromas" aparece (Luz branco + ComAromas dourado)
- [ ] Links: Home, Sobre, Coleções, Loja com **ícones** ao lado
  - ☐ Home → ícone chama
  - ☐ Sobre → ícone espiral/círculo
  - ☐ Coleções → ícone 4 círculos
  - ☐ Loja → ícone sacola
- [ ] Botão "Ritual" com background dourado (destaque)
- [ ] Ícone sol/lua (Theme Toggle) funciona
- [ ] Ícone carrinho (Cart Button) funciona

### 3.2 Navbar Mobile (<768px)
- [ ] Hamburger menu aparece
- [ ] Clique abre menu com todos os links + ícones
- [ ] Clique em link fecha menu automaticamente
- [ ] Theme Toggle e Cart Button estão presentes

### 3.3 Link Ativo
- [ ] Na página `/colecoes`, o link "Coleções" está destacado (cor dourada `#C9A84A`)
- [ ] Na página `/sobre`, o link "Sobre" está destacado
- [ ] Comportamento funciona em todas as rotas

---

## 🔼 SEÇÃO 4: SCROLL TO TOP

### 4.1 Botão de Voltar ao Topo
- [ ] **Scroll down** na página (role > 320px de altura)
- [ ] Botão circular aparece no canto inferior direito
- [ ] Botão tem ícone de **chama** inside
- [ ] **Clique nele:**
  - ✓ Página volta ao topo com scroll suave (não pula)
  - ✓ Botão desaparece quando volta ao topo
- [ ] **Hover:** Botão fica maior (scale 1.1) e brilha mais

### 4.2 Posicionamento
- [ ] Botão não fica por cima de conteúdo importante
- [ ] Posição: canto inferior direito (acima do ManualButton)

---

## 📬 SEÇÃO 5: ACESSIBILIDADE

### 5.1 Formulário de Contato (`/`)
- [ ] Clique na label **"Nome"** → foca no input (não clica vazio)
- [ ] Clique na label **"Email"** → foca no input
- [ ] Clique na label **"Coleção de Interesse"** → abre select/dropdown
- [ ] Clique na label **"Mensagem"** → foca no textarea
- [ ] **DevTools (F12):**
  - Inspecione cada label
  - Deve ter atributo `htmlFor="..."`
  - Input deve ter matching `id="..."`

### 5.2 Newsletter (Footer)
- [ ] Clique na label **"Email"** → foca no input
- [ ] Insira email válido (ex: teste@email.com) → inscrição funciona
- [ ] Insira email inválido (sem @) → aparece erro em **violeta** `#9A6A8D`
- [ ] Message de sucesso: "✓ Bem-vindo ao círculo de luz!"

### 5.3 SVGs Decorativos
- [ ] **DevTools (F12) → Inspector**
- [ ] Clique em ícone Instagram (footer) → Inspecione
- [ ] Procure por `aria-hidden="true"` no SVG
- [ ] ✓ Deve estar presente
- [ ] Repita para WhatsApp, ícones da navbar

---

## 🎨 SEÇÃO 6: TEMA (LIGHT/DARK)

### 6.1 Toggle Dark → Light
- [ ] Clique no ícone sol/lua no header
- [ ] **Background:**
  - Dark: roxo escuro (`#1E1035`)
  - Light: lilás claro (`#F3ECFA`)
- [ ] **Cores primárias** (roxo, laranja, etc) **mantêm valores**
- [ ] Navbar continua escuro (não inverte)
- [ ] Footer continua escuro (não inverte)

### 6.2 Contraste e Legibilidade
- [ ] **Light mode:** Textos legíveis contra background claro
- [ ] **Dark mode:** Textos legíveis contra background escuro
- [ ] Transição é suave (não pisca)

### 6.3 Persistência
- [ ] Trocar tema
- [ ] Recarregar página (F5)
- [ ] Tema mantém seleção anterior (salvo em localStorage)

---

## 📅 SEÇÃO 7: FOOTER

### 7.1 Copyright Dinâmico
- [ ] Verificar texto: `© 2026 LuzComAromas · Aromas que acendem momentos`
- [ ] Ano deve ser **dinâmico** (usar `new Date().getFullYear()`)
- [ ] Se estiver em 2026 → `© 2026`
- [ ] Se estiver em 2027 → `© 2027` (automaticamente)

### 7.2 Links Sociais
- [ ] Instagram link clicável → abre instagram.com/luzcomaromas
- [ ] WhatsApp link clicável → abre wa.me/...
- [ ] **Hover Instagram:** cor muda para violeta `#9A6A8D`, ícone sobe levemente
- [ ] **Hover WhatsApp:** cor muda para verde `#25D366`, ícone sobe levemente

### 7.3 Newsletter
- [ ] Seção "Luz na Caixa" aparece
- [ ] Label "Email" tem `htmlFor="newsletter-email"`
- [ ] Input tem matching `id="newsletter-email"`

---

## 🚀 SEÇÃO 8: PERFORMANCE & RESPONSIVIDADE

### 8.1 Mobile (375px)
- [ ] Página carrega corretamente
- [ ] Cards stackam verticalmente
- [ ] Navbar hamburger funciona
- [ ] ScrollToTop aparece quando necessário
- [ ] Sem elementos sobrepostos

### 8.2 Tablet (768px)
- [ ] Layout intermediário funciona
- [ ] Navbar transita para desktop
- [ ] Grid de cards adapta (2 colunas se aplicável)

### 8.3 Desktop (1440px)
- [ ] Layout original preservado
- [ ] Hover effects funcionam
- [ ] Espaçamento mantém proporções

### 8.4 Carregamento
- [ ] Página carrega em < 3 segundos
- [ ] Nenhum erro no console (F12)
- [ ] Imagens carregam corretamente

---

## ✅ SEÇÃO 9: VALIDAÇÃO RÁPIDA POR PÁGINA

### Home (`/`)
- [ ] ☐ Hero com "Descobrir as Coleções" (rota correta `/colecoes`)
- [ ] ☐ Seção Coleções com 4 cards (cores corretas)
- [ ] ☐ Seção Portal Exclusivo (SEM botão)
- [ ] ☐ ScrollToTop funciona
- [ ] ☐ Footer aparece

### Sobre (`/sobre`)
- [ ] ☐ Texto de "Intuição" com "a si mesma" (gênero correto)
- [ ] ☐ Todas as seções carregam
- [ ] ☐ Links funcionam

### Coleções (`/colecoes`)
- [ ] ☐ 4 cards aparecem com cores canônicas
- [ ] ☐ Backgrounds não são NaN
- [ ] ☐ CTAs oficiais (Permita a pausa, Acenda sua intenção, etc)
- [ ] ☐ Hover nos cards e CTAs funciona
- [ ] ☐ Soft color brilha suavemente

### Loja (`/loja`)
- [ ] ☐ Cards aparecem com mesmas cores
- [ ] ☐ Produtos listam corretamente
- [ ] ☐ Carrinho funciona

### Produto (`/produto/:id`)
- [ ] ☐ Página carrega com produto específico
- [ ] ☐ Cores corretas (se aplicável)
- [ ] ☐ Botão "Adicionar ao Carrinho" funciona

### Ritual (`/ritual`)
- [ ] ☐ Página carrega sem erros
- [ ] ☐ Quiz sensorial funciona (se implementado)

---

## 🔴 PROBLEMAS ENCONTRADOS

Caso encontre divergências:

1. **Anote o problema:**
   - Página: (ex: `/colecoes`)
   - Elemento: (ex: "Card Energia")
   - O que viu: (ex: "Background cinza, não laranja")
   - O que esperava: (ex: "#C97A4A")

2. **Tire screenshot:**
   - Windows: Win + Shift + S
   - Salve na pasta do projeto

3. **Inspecione com DevTools (F12):**
   - Clique no elemento → **Inspector**
   - Vá para **Computed Styles**
   - Procure por `background-color`, `color`, `border-color`
   - Copie o valor exato

4. **Reporte para correção**

---

## 📊 RESULTADO FINAL

Após completar todas as seções, responda:

```
✅ VALIDAÇÃO NO VERCEL: [COMPLETA / COM DIVERGÊNCIAS]

Total de itens verificados: ___/___

Problemas encontrados: (número)
- Problema 1: [página] → [elemento] → [descrição]
- Problema 2: ...

Screenshots:
- [ ] Sim, anexadas
- [ ] Não encontrou problemas

Observações gerais:
(espaço livre)
```

---

## 🎯 PRIORIDADE DOS TESTES

**Crítico (fazer primeiro):**
1. Botão "Entrar no Ritual" removido ✓
2. Cores dos 4 cards (sem NaN)
3. CTAs oficiais corretos
4. Rota "/colecoes" funcionando

**Importante (fazer depois):**
5. Acessibilidade (htmlFor, aria-hidden)
6. Navbar com ícones
7. ScrollToTop funcionando

**Bônus (se tempo permitir):**
8. Tema light/dark
9. Responsividade em 3 breakpoints
10. Performance/console errors

---

## 🔗 LINKS RÁPIDOS

- **App (Vercel):** https://luzcomaromas.vercel.app (ou URL do seu deploy)
- **Colecoes:** `.../colecoes`
- **Loja:** `.../loja`
- **Sobre:** `.../sobre`
- **DevTools:** F12 ou Ctrl+Shift+I

---

**Status:** Pronto para validação  
**Tempo estimado:** 10-15 minutos  
**Próximo passo:** Reportar resultados ou abrir issues para correções
