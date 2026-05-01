# ✅ CHECKLIST — Seção de Cuidados e Manual
**Data:** 2026-04-30 | **Duração estimada:** 8-10 minutos

---

## 1. HOME — Seção "Cuidados com Intenção"

Acesse a home e role até a seção de cuidados.

- [ok] **Título aparece:** "Um cuidado à altura da sua luz"
- [ok] **Parágrafo 1 (itálico):** "Para que cada momento com a sua vela siga bonito, seguro e acolhedor, alguns gestos fazem toda a diferença. Cuidar da chama também é uma forma de prolongar a experiência."
- [ok] **Parágrafo 2:** "Veja o manual completo de cuidados e aproveite cada ritual com mais presença."
- [ok] **CTA aparece:** botão "ACESSAR MANUAL DE CUIDADOS" (dourado, borda fina)
- [ok] **Hover no CTA:** fundo preenche de dourado, texto fica escuro — transição suave
- [ok] **Clique no CTA:** navega para `/manual` ✓ (não para outra página)
- [ok] **Sem cards de cuidados** — nenhum grid, nenhuma lista, nenhum mini-manual
- [ok] **Animação de entrada:** seção aparece com fade + slide suave ao rolar

---

## 2. MANUAL — Hero da Página (`/manual`)

- [ok] **Eyebrow (texto topo):** "GUIA DE CUIDADOS" (dourado, capslock, espaçado)
- [ok] **Título H1:** "Manual de Cuidados com a sua Vela"
- [ok] **Divisor dourado** aparece entre o título e o subtítulo
- [ok] **Subtítulo (itálico):** "Pequenos gestos ajudam a preservar a beleza da queima, a fragrância e a qualidade de cada ritual."
- [ok] **Borda inferior dourada** separa o hero do conteúdo

---

## 3. MANUAL — Bloco Introdutório

Logo abaixo do hero, antes da lista de cuidados:

- [ok] **Parágrafo 1 (itálico):** "Cada vela carrega uma experiência pensada para durar com presença, beleza e segurança."
- [ok] **Parágrafo 2:** "Com alguns cuidados simples, o ritual se mantém mais harmonioso e a chama segue bonita do primeiro ao último acender."
- [ok] **Divisor dourado** separa o bloco introdutório dos blocos de cuidados

---

## 4. MANUAL — 8 Blocos de Cuidados

Role pela página e confirme que os 8 blocos aparecem **nesta ordem exata:**

| # | Título esperado |
|---|---|
| 01 | Antes de acender |
| 02 | A primeira queima |
| 03 | Antes de reacender |
| 04 | Durante o uso |
| 05 | Enquanto estiver acesa |
| 06 | Ao apagar |
| 07 | Quando restar pouca cera |
| 08 | Pequenos cuidados extras |

Para cada bloco:
- [ok] **Número** aparece à esquerda (dourado translúcido, ex: "01")
- [ok] **Ícone SVG** dourado ao lado do título
- [ok] **Título** em Cormorant Garamond
- [ok] **Texto descritivo** com tom elegante e claro
- [ok] **Linha divisória** entre os blocos (exceto o último)
- [ok] **Animação de entrada:** cada bloco aparece com fade ao rolar (stagger suave)

---

## 5. MANUAL — Bloco Final e CTA

Ao final da lista de blocos:

- [ok] **Divisor dourado** aparece
- [ok] **Parágrafo 1 (itálico):** "Cuidar da sua vela também é uma forma de prolongar a experiência."
- [ok] **Parágrafo 2:** "Com presença nos pequenos gestos, cada chama segue mais bonita, segura e harmoniosa ao longo do tempo."
- [ok] **CTA aparece:** "CONHECER AS COLEÇÕES" (botão dourado com borda)
- [ok] **Hover no CTA:** fundo preenche de dourado, texto fica escuro
- [ok] **Clique no CTA:** navega para `/colecoes` ✓

---

## 6. NAVEGAÇÃO E FLUXO

Teste o fluxo completo de navegação:

- [ok] **Home → CTA "Acessar manual"** → chega em `/manual` com hero correto
- [ok] **Manual → CTA "Conhecer as coleções"** → chega em `/colecoes`
- [ok] **Navbar → "Manual"** (se existir link) → chega na página correta
- [ok] **Botão de voltar ao topo** aparece ao rolar pela página do manual
- [ok] **Footer** aparece normalmente após o conteúdo do manual

---

## 7. RESPONSIVIDADE RÁPIDA

- [ok] **Mobile (375px):** seção da home sem cards empilhados → apenas texto + botão
- [ok] **Mobile:** blocos do manual em coluna única, ícones e números alinhados
- [ok] **Desktop:** layout preservado, textos centralizados, máx-width respeitado

---

## 8. CONSOLE (F12)

- [ok] Abra DevTools → aba **Console**
- [ok] Acesse `/` (home) → nenhum erro vermelho
- [ok] Acesse `/manual` → nenhum erro vermelho
- [ok] Navegue entre as páginas → sem warning de `Link` indefinido ou componente ausente

---

## RESULTADO

```
Home — Seção de Cuidados: ☑️ OK / ❌ Divergência
Manual — Hero:            ☑️ OK / ❌ Divergência
Manual — Bloco intro:     ☑️ OK / ❌ Divergência
Manual — 8 blocos:        ☑️ OK / ❌ Divergência
Manual — Bloco final/CTA: ☑️ OK / ❌ Divergência
Navegação entre páginas:  ☑️ OK / ❌ Divergência
Console (sem erros):      ☑️ OK / ❌ Erros encontrados

Problemas encontrados:
- (descreva aqui se houver)
```
ao trocar de páginas, percebi que não vai para o topo e sim para o final de todas as páginas
