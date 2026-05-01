# 🎬 Guia Prático de Validação Visual — LuzComAromas

## 📍 Localização do Servidor
**URL:** http://localhost:5173 (ou a porta exibida no terminal)

---

## 🎨 Validação por Elemento Visual

### 1️⃣ CARDS DE COLEÇÕES (Home / Colecoes page)

#### Em Modo Escuro
```
Card Serenidade:
├─ Background: Roxo escuro (#1E1035 ou derivado)
├─ Border/Borda: Roxo sutil (rgba(155,111,196,0.35))
├─ Texto Primário: Branco (#EDE6F7)
├─ Destaque/Título: Roxo vibrante (#9B6FC4) ← VERIFICAR ESTE
├─ Hover (mouse em cima):
│  ├─ BG suave: Roxo muito transparente (rgba(155,111,196,0.12))
│  └─ Transição: Suave 0.3s
└─ Glow (brilho):
   ├─ Ao redor do card: Roxo com halo (rgba(155,111,196,0.30))
   └─ Efeito: box-shadow duplo (aro + halo)

Card Energia:
├─ Cor primária: Laranja quente (#C97A4A) ← NOVA, VERIFICAR
├─ Soft BG (hover): Laranja muito transparente (rgba(201,122,74,0.12))
├─ Glow: Laranja com halo (rgba(201,122,74,0.30))
└─ Ícone: Cor atual (laranja dinamicamente)

Card Intuição:
├─ Cor primária: Violeta suave (#9A6A8D) ← ATUALIZADA, VERIFICAR
├─ Soft BG (hover): Violeta leve (rgba(154,106,141,0.12))
├─ Glow: Violeta com halo (rgba(154,106,141,0.30))
└─ Mensagens/hover: Violeta em textos destacados

Card Purificação:
├─ Cor primária: Verde menta (#6FA88A) ← ATUALIZADA, VERIFICAR
├─ Soft BG (hover): Verde muito leve (rgba(111,168,138,0.12))
├─ Glow: Verde com halo (rgba(111,168,138,0.30))
└─ Badge/ícone: Verde menta coerente
```

#### Em Modo Claro
```
Fundo geral: Lilás cromático (#F3ECFA)
Texto dos cards: Roxo profundo (#241B31) — LEGÍVEL sobre lilás

Serenidade:
├─ Título/Destaque: Roxo (#9B6FC4) — mesmo em claro
└─ Ink (texto adicional): Roxo escuro (#8854B9) ← NOVO, VERIFICAR

Energia:
├─ Título/Destaque: Laranja (#C97A4A) — mesmo em claro
└─ Ink (texto): Laranja escuro (#8C4E2C) ← NOVO, VERIFICAR

Intuição:
├─ Título/Destaque: Violeta (#9A6A8D) — mesmo em claro
└─ Ink (texto): Violeta escuro (#643F5E) ← NOVO, VERIFICAR

Purificação:
├─ Título/Destaque: Verde (#6FA88A) — mesmo em claro
└─ Ink (texto): Verde escuro (#456E5A) ← NOVO, VERIFICAR
```

**O que você deve ver:**
- ✅ 4 cards distintos com 4 cores diferentes
- ✅ Cores primárias aparecem no título/ícone
- ✅ Ao passar mouse: soft bg aparece suavemente
- ✅ Nenhuma cor "piscando" ou mudando abruptamente
- ✅ Glows ao redor são sutis mas visíveis
- ✅ Modo claro: ink colors aparecem em textos secundários

---

### 2️⃣ PÁGINA PRODUTO INDIVIDUAL

#### Badge de Embalagem (Purificação — exemplo)
```
Status Atual Esperado:
├─ Ícone: Verde menta (#6FA88A) com stroke
├─ Texto "Embalagem": Verde menta (#6FA88A)
├─ Background: Verde muito leve (rgba(111,168,138,0.08))
├─ Border: Verde sutil (rgba(111,168,138,0.20))
└─ Aparência: Card pequeno, elegante, destacado
```

**O que você deve ver:**
- ✅ Ícone em verde consistente
- ✅ Texto ao lado em mesmo verde
- ✅ BG do card em verde muito transparente
- ✅ Sem mistura de cores (não roxo, não laranja)
- ✅ Border sutil mas definida

---

### 3️⃣ FOOTER — Newsletter + Links

#### Newsletter
```
Título: "Receba as chamas de Luz com Aromas"
├─ Cor: Ouro (#C9A84A) em itálico
└─ Aparência: Elegante e suave

Input de Email:
├─ Border: Ouro (rgba com opacidade)
├─ Focus: Ouro mais brilhante
└─ Texto: Branco/claro

Mensagem de Erro:
├─ Cor do texto: Violeta (#9A6A8D) ← VERIFICAR
├─ Mensagem: "Por favor, insira um e-mail válido."
└─ Aparência: Sutil mas legível
```

#### Link Instagram
```
No hover (normal):
├─ Cor: Cinza claro (texto)
└─ Ícone: Transparente

No hover (mouse em cima):
├─ Cor: Violeta (#9A6A8D) ← VERIFICAR
├─ Transição: Suave, sem "salto"
└─ Transform: Slight lift (translateY -3px)
```

**O que você deve ver:**
- ✅ Newsletter com ouro destacado
- ✅ Input com borda ouro, foco em ouro mais brilhante
- ✅ Erro em violeta coerente
- ✅ Instagram icon: gray → violeta no hover
- ✅ Navbar sempre escura (sem inversão)

---

### 4️⃣ PASSWORD GATE (Página Protegida)

```
Input de Senha:
├─ Border (normal): Ouro (#C9A84A)
├─ Border (erro): Violeta (#9A6A8D) ← VERIFICAR
├─ Animação de erro: Shake suave
└─ Feedback visual: Imediato

Mensagem de Erro:
├─ Cor: Violeta (#9A6A8D) ← DEVE CORRESPONDER À BORDA
├─ Tamanho: Pequeno, 0.7rem
├─ Estilo: UPPERCASE, espaçamento 0.2em
└─ Visibilidade: Obrigatória em caso de erro
```

**O que você deve ver:**
- ✅ Input com borda ouro por padrão
- ✅ Em erro: borda muda para violeta (#9A6A8D)
- ✅ Mensagem de erro em violeta (mesmo tom da borda)
- ✅ Shake animation ao falhar
- ✅ Coerência visual entre borda e mensagem

---

### 5️⃣ CARRINHO / CART MODAL

```
Botão de Remover (X) ao lado de cada item:
├─ Normal: Cor cinza (#text-faint)
├─ Hover: Violeta (#9A6A8D) ← VERIFICAR
├─ Transição: color 0.2s ease
└─ Transform: Nenhum (apenas cor)

Resumo Total:
├─ Texto: Branco/claro (#text-primary)
├─ Valores: Ouro (#C9A84A)
└─ Aparência: Elegante, sem cores desnecessárias
```

**O que você deve ver:**
- ✅ Botão X em cinza por padrão
- ✅ Hover em X: muda para violeta suavemente
- ✅ Nenhum "pulo" ou mudança abrupta
- ✅ Resumo com ouro em valores importantes

---

### 6️⃣ PÁGINA SOBRE — Destaque de Produtos

```
Seção "Carro-Chefe" (Purificação):
├─ Ícone/label: Verde (#6FA88A) em uppercase
├─ Nome do produto: Verde destacado
├─ Descrição: Branco normal
└─ Aparência: Card elegante com destaque em verde

Seção "Acalanto da Alma" (Serenidade):
├─ Nome: Roxo destacado (#9B6FC4)
├─ Cor de contraste: Roxo em negrito
└─ Aparência: Harmônico com tema geral
```

**O que você deve ver:**
- ✅ "Carro-chefe" em verde (#6FA88A)
- ✅ "Acalanto" em roxo (#9B6FC4)
- ✅ Cores primárias coerentes com coleções
- ✅ Textos legíveis em ambos os temas

---

### 7️⃣ PÁGINA LOJA — Filtros + Cards

#### Filtros de Coleção
```
4 botões de filtro:
├─ Serenidade: Roxo (#9B6FC4)
├─ Energia: Laranja (#C97A4A) ← NOVA, VERIFICAR
├─ Intuição: Violeta (#9A6A8D) ← ATUALIZADA, VERIFICAR
└─ Purificação: Verde (#6FA88A) ← ATUALIZADA, VERIFICAR

Ativo (selecionado):
├─ BG: Cor primária (mais opaco)
├─ Texto: Branco
└─ Border: Cor primária

Inativo (hover):
├─ BG: Cor primária muito transparente (rgba .12)
├─ Transição: Suave
└─ Cursor: Pointer
```

#### Cards de Produto
```
Cada card mostra coleção:
├─ Badge/label: Cor da coleção
├─ Borda superior: Cor da coleção (subtle)
├─ Destaque ao hover: Soft color aparece
└─ Coerência: Card reflete coleção do produto
```

**O que você deve ver:**
- ✅ 4 cores diferentes nos 4 filtros
- ✅ Clique em filtro: ativa com cor sólida
- ✅ Hover em inativo: aparece soft color
- ✅ Cards mudam de aparência baseado em coleção
- ✅ Energia em laranja consistente

---

## 🔄 TESTE DE ALTERNÂNCIA DE TEMA

### De Escuro para Claro
```
1. Abrir Home em modo escuro
2. Clicar toggle de tema (sun/moon icon)
3. Observar:
   ├─ Fundo muda de roxo escuro (#1E1035) para lilás (#F3ECFA)
   ├─ Texto muda de claro para roxo escuro (#241B31)
   ├─ Cards mantêm cores primárias (não mudam)
   ├─ Soft colors adaptam com novo fundo
   ├─ Navbar/Footer permanecem ESCUROS (sem inversão)
   ├─ Transição é suave (0.4s ease)
   └─ Contraste sempre legível
```

### Volta para Escuro
```
1. Clicar toggle novamente
2. Observar reversão suave
3. Cores retornam ao normal
4. Nenhum "efeito piscante"
5. Transição contínua (não instantânea)
```

**O que você deve ver:**
- ✅ Transição suave de cores
- ✅ Navbar/Footer sempre escuros
- ✅ Sem flashes de cores erradas
- ✅ Contraste mantido em ambos modos
- ✅ Tema salvo em localStorage (permanece ao refresh)

---

## ✅ CHECKLIST RÁPIDO — 5 Minutos

Abrir browser em http://localhost:5173 e fazer:

```
[ ] 1. Home (escuro) — 4 cards em cores diferentes visíveis
[ ] 2. Home (claro) — ink colors aparecem em textos secundários
[ ] 3. Loja — 4 filtros em cores diferentes
[ ] 4. Produto Purificação — badge em verde (#6FA88A)
[ ] 5. Produto Intuição — destaque em violeta (#9A6A8D)
[ ] 6. Footer — erro em violeta (#9A6A8D)
[ ] 7. Footer — Instagram hover em violeta (#9A6A8D)
[ ] 8. Password — borda erro em violeta (#9A6A8D)
[ ] 9. Sobre — "Carro-chefe" em verde (#6FA88A)
[ ] 10. Sobre — "Acalanto" em roxo (#9B6FC4)
[ ] 11. Toggle tema — transição suave, navbar permanece escuro
[ ] 12. Carrinho — X button hover em violeta (#9A6A8D)
```

**Resultado esperado:** ✅ Todos 12 itens devem passar

---

## 🐛 Se Algo Parecer Errado

### Cores não aparecem / aparecem erradas
```
1. Abrir DevTools (F12)
2. Inspecionar elemento (direita)
3. Verificar computed styles
4. Procurar por:
   - background-color
   - color
   - border-color
   - box-shadow
5. Comparar com tabela de cores oficial (linhas 1-47 deste doc)
```

### Transições não são suaves
```
1. Verificar em DevTools se transition está aplicado
2. Procurar em theme.css por "transition: "
3. Verificar se é "0.3s ease" ou "0.4s ease"
```

### Modo claro não mostra ink colors
```
1. Abrir elemento em inspect
2. Verificar se tem classe .text-*-ink
3. Se não tiver, é um bug em ContactSection ou componente
4. Deve estar em html assim: <span class="text-energia-ink">
```

### Navbar não permanece escuro em tema claro
```
1. Procurar em theme.css por:
   [data-theme="light"] nav
   [data-theme="light"] footer
2. Deve ter regras que mantêm --text-primary em #EDE6F7
3. Se não tiver, é um bug em theme.css
```

---

## 📊 Resumo Técnico para Referência

### Cores Canônicas (não mudam nunca)
```css
--color-serenidade: #9B6FC4;      /* Roxo profundo */
--color-energia: #C97A4A;          /* Laranja quente */
--color-intuicao: #9A6A8D;         /* Violeta suave */
--color-purificacao: #6FA88A;      /* Verde menta */
--color-golden: #C9A84A;           /* Ouro */
```

### Derivações RGB (mantêm proporção)
```
Serenidade:  RGB(155, 111, 196)
├─ Soft:     rgba(155, 111, 196, 0.12)
├─ Glow:     rgba(155, 111, 196, 0.30)
└─ Border:   rgba(155, 111, 196, 0.35)

Energia:     RGB(201, 122, 74)
├─ Soft:     rgba(201, 122, 74, 0.12)
├─ Glow:     rgba(201, 122, 74, 0.30)
└─ Border:   rgba(201, 122, 74, 0.35)

Intuição:    RGB(154, 106, 141)
├─ Soft:     rgba(154, 106, 141, 0.12)
├─ Glow:     rgba(154, 106, 141, 0.30)
└─ Border:   rgba(154, 106, 141, 0.35)

Purificação: RGB(111, 168, 138)
├─ Soft:     rgba(111, 168, 138, 0.12)
├─ Glow:     rgba(111, 168, 138, 0.30)
└─ Border:   rgba(111, 168, 138, 0.35)
```

---

## 🎬 Próximas Ações

1. **Abrir URL:** http://localhost:5173
2. **Validar:** Usar checklist acima (5 min)
3. **Documentar:** Prints de cada seção se necessário
4. **Confirmar:** Todas as cores alinhadas ✅
5. **Celebrar:** Sistema de cores agora 100% coerente! 🎉
