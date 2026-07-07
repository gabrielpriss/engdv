# Design System — Marko (Digital Marketing Agency)
Baseado em: `markoreact1.foxcreation.net` (template "Marko" — Fox_Creation)

> **Nota de origem:** este documento foi revisado a partir de um print real de página inteira do site de referência. Todos os padrões estruturais, componentes e assinaturas visuais abaixo foram observados diretamente na tela — não são mais uma reconstrução por convenção de mercado. A cor original do site (rosa/magenta em gradiente sobre fundo roxo-escuro) foi **totalmente substituída** pela paleta do projeto, e o framework de estilo foi migrado de **Bootstrap 5 para Tailwind CSS**, seguindo a mesma arquitetura do `pta-layout-system.md`.

---

## 1. Stack obrigatória

| Camada | Tecnologia |
|--------|------------|
| Estrutura | React 19 + Vite (ou HTML5 estático, conforme o projeto) |
| Estilo | **Tailwind CSS** via CDN (ou build integrado ao Vite) + bloco `<style>` com utilitários customizados |
| Tipografia | Google Fonts: **Inter** (único family — corpo e títulos, pesos 400 a 800) |
| Ícones | Font Awesome 6.4 (`cdnjs`) + ícones line-art custom (estilo SVG Repo) |
| Animações de scroll | AOS 2.3.1 (`unpkg`) |
| JavaScript | Vanilla JS inline no final do `<body>` |
| Popup de captura | `#popup-captura` — mesmo padrão do `pta-layout-system.md`, com tokens `brand.*` do Marko |
| Tema | Dark mode padrão + toggle claro/escuro (ícone de lua no header) |

**Não usar:** Bootstrap, jQuery ou frameworks CSS concorrentes ao Tailwind.

---

## 2. Tailwind config (tokens `brand.*`)

```js
tailwind.config = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          bg:            '#0B0D11', // fundo principal (quase preto)
          surface:       '#222A31', // cards, header, footer, popup
          primary:       '#D9FF6A', // CTA, links ativos, ícones, bordas de destaque
          primaryHover:  '#E8FEAE', // hover dos botões primários
          accent:        '#E8FEAE', // ponta de gradiente (badges, anéis de avatar, glow)
          textPrimary:   '#D8DEE3', // títulos e texto principal
          textSecondary: '#7B8793', // parágrafos, metadados
          textMuted:     '#7B8793', // labels, footer, placeholders
          border:        '#7B8793', // usar sempre com opacidade (/10, /20, /30)
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Inter', 'sans-serif'],
      },
      maxWidth: {
        site: '1300px',
        'site-md': '1040px',
        'site-sm': '860px',
      },
      borderRadius: {
        xl: '20px',
        '2xl': '28px',
        '3xl': '36px', // containers grandes (hero, wrappers de seção, footer)
      },
      boxShadow: {
        card: '0 4px 24px rgba(0,0,0,0.30)',
        'card-hover': '0 8px 32px rgba(0,0,0,0.40)',
        glow: '0 0 32px rgba(217,255,106,0.25)',
      },
    },
  },
};
```

> Usar **somente** classes `brand-*` para cor de marca. Utilitários neutros do Tailwind (`bg-black/90`, `text-red-400` para erros, `bg-yellow-400` para estrelas de avaliação) continuam liberados para overlays e estados pontuais.

### 2.1 Google Fonts (`<head>`)

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
```

---

## 3. Tipografia

**Inter** para tudo — corpo, títulos, botões, labels.

| Estilo | Classe Tailwind sugerida | Peso |
|---|---|---|
| Display / H1 (hero) | `text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1]` | 800 |
| H2 (título de seção) | `text-3xl md:text-5xl font-extrabold tracking-tight leading-[1.15]` | 800 |
| H3 | `text-2xl md:text-3xl font-bold` | 700 |
| H4 | `text-xl md:text-2xl font-bold` | 700 |
| H5 | `text-lg font-bold` | 700 |
| Eyebrow / label de seção | `text-xs md:text-sm font-semibold` (não é uppercase no original) | 600 |
| Body Large | `text-lg leading-relaxed` | 400 |
| Body | `text-base leading-relaxed` | 400 |
| Small / caption | `text-sm` | 400–500 |
| Botão | `text-sm md:text-base font-semibold` | 600 |

### 3.1 Assinatura visual: texto com "fade" (`.text-fade`)

**Todo H2 de seção no site de referência usa um efeito de degradê no próprio texto** — parte das palavras fica no branco/claro sólido (`brand-textPrimary`) e a outra parte esmaece para uma cor bem mais apagada, como se o texto estivesse "sumindo" horizontalmente ou entre linhas. É a marca visual mais reconhecível do template — reproduzir em toda seção de título.

```css
.text-fade {
  background: linear-gradient(90deg, var(--tw-fade-from, #D8DEE3) 0%, var(--tw-fade-from, #D8DEE3) 55%, rgba(216,222,227,0.25) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
```

```html
<h2 class="text-fade text-3xl md:text-5xl font-extrabold tracking-tight">
  Data Driven Strategies, Measurable Results
</h2>
```

> Em títulos de 2–3 linhas, o fade pode ser aplicado por `<span>` (ex.: 1ª linha sólida, 2ª linha com `.text-fade`) para replicar a variação vista no site — nem toda a frase esmaece por igual.

### 3.2 Eyebrow (label de seção)

Ícone circular (ponto central com anel, estilo "alvo") + texto em `brand.primary`, peso 600, **não uppercase** (title case, ex.: "Our Expertise", "Case Studies", "How It Work"):

```html
<p class="flex items-center gap-2 text-brand-primary font-semibold text-sm mb-3">
  <i class="fas fa-circle-dot text-xs"></i> Our Expertise
</p>
```

---

## 4. Layout, grid e breakpoints

Breakpoints padrão do **Tailwind**:

| Prefixo | Largura mínima |
|---|---|
| `sm:` | 640px |
| `md:` | 768px |
| `lg:` | 1024px |
| `xl:` | 1280px |
| `2xl:` | 1536px |

Container: `class="container mx-auto px-6 max-w-site"`.

**Espaçamento (escala nativa do Tailwind, base 4px):**
```
1 = 4px · 2 = 8px · 3 = 12px · 4 = 16px · 6 = 24px · 8 = 32px · 12 = 48px · 16 = 64px · 24 = 96px
```
- Padding interno de cards: `p-8`
- Padding de wrappers grandes (hero, case studies, how-it-works, newsletter): `p-10 md:p-16`
- Espaço entre seções: `py-24`
- Gap entre cards em grid: `gap-6`

**Importante (correção vs. versão anterior deste documento):** o fundo do site é **quase todo `brand.bg` sólido** — não há alternância forte `bg` ↔ `surface` entre seções. A separação visual vem de **containers com borda/glow** (hero, case studies, how-it-works, pricing, newsletter, footer ficam dentro de blocos arredondados com borda `brand-primary/20-30`), não de blocos de fundo alternados.

---

## 5. Padrões visuais assinatura do template

Esses 5 padrões se repetem o site inteiro e devem ser tratados como componentes de primeira classe:

1. **`.text-fade`** — títulos H2 com degradê no próprio texto (seção 3.1)
2. **Split button** — botão pill + círculo de ícone grudado na direita (seção 7.1)
3. **Glow border** — cards/containers de destaque usam borda `brand-primary/20-30` fina em vez de sombra preta pesada
4. **Photo-overlap card** — card pequeno com borda de destaque, sobreposto no canto de uma foto grande (seção 7.4)
5. **Tag cloud sobre imagem** — pills soltos sobre a foto do case study, sem grid alinhado (seção 7.6)

---

## 6. Classes utilitárias customizadas (bloco `<style>`)

| Classe | Uso |
|--------|-----|
| `.text-fade` | Degradê no texto de títulos H2 (seção 3.1) |
| `.split-btn` | Botão pill + círculo de ícone anexado |
| `.glass-strong` | Header, popup |
| `.card-lift` | Hover com elevação em cards |
| `.icon-badge` | Container de ícone com borda gradiente |
| `.stat-stroke` | Número grande com contorno (ex.: "21+") |
| `.photo-overlap` | Card sobreposto em foto |
| `.tag-pill` | Tag flutuante sobre imagem de case study |
| `.checklist-item` | Item de lista com ícone de check circular |
| `.marquee` | Faixa de logos de parceiros com scroll infinito |
| `.faq-item` / `.faq-answer` | Accordion do FAQ |
| `.mobile-float` | CTA fixo no rodapé (apenas mobile) |
| `.gradient-rule` | Divisor horizontal entre blocos (footer) |

```css
.stat-stroke {
  font-weight: 800;
  -webkit-text-stroke: 1.5px #D9FF6A;
  color: transparent;
}

.icon-badge {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(217,255,106,0.06);
  border: 1px solid rgba(217,255,106,0.35);
  color: #D9FF6A;
}

.marquee {
  display: flex;
  gap: 3rem;
  animation: marquee-scroll 30s linear infinite;
}
.marquee:hover { animation-play-state: paused; }
@keyframes marquee-scroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
```

---

## 7. Componentes

### 7.1 Split button (assinatura do template)

Padrão de CTA em **todo** o site: botão pill (sólido ou outline) + círculo de ícone preenchido, grudados, sem espaço entre eles. Usado no hero, nos cards de serviço ("View Details"), no pricing e na newsletter ("Subscribe").

```html
<!-- Sólido (hero) -->
<div class="split-btn inline-flex items-center rounded-full bg-brand-bg/40 border border-brand-primary/30 p-1">
  <span class="px-6 py-3 text-sm font-semibold text-brand-textPrimary">Get Started</span>
  <span class="w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center">
    <i class="fas fa-arrow-right text-brand-bg text-sm"></i>
  </span>
</div>

<!-- Outline (cards de serviço / pricing) -->
<div class="split-btn inline-flex items-center justify-between w-full rounded-full border border-brand-primary/40 p-1">
  <span class="px-6 py-3 text-sm font-semibold text-brand-textPrimary">View Details</span>
  <span class="w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center">
    <i class="fas fa-arrow-right text-brand-bg text-sm"></i>
  </span>
</div>
```

### 7.2 Header (full-width, não flutuante)

O header **não** é um pill flutuante — é uma barra horizontal de largura total, fundo `brand.bg`/`brand.surface`, sem grandes bordas arredondadas.

```html
<header class="w-full bg-brand-bg/95 border-b border-brand-border/10">
  <div class="container mx-auto px-6 max-w-site flex items-center justify-between h-20">
    <div class="flex items-center gap-2">
      <img src="assets/logo-mark.svg" alt="" class="h-8 w-auto">
      <div>
        <p class="font-bold text-lg text-brand-textPrimary leading-none">marko</p>
        <p class="text-[10px] text-brand-textMuted leading-none mt-0.5">Digital Marketing Agency</p>
      </div>
    </div>
    <nav class="hidden lg:flex items-center gap-8 text-sm font-medium text-brand-textPrimary">
      <a href="#home" class="text-brand-primary">Home</a>
      <a href="#about" class="hover:text-brand-primary transition">About</a>
      <a href="#services" class="hover:text-brand-primary transition">Services</a>
      <a href="#pages" class="hover:text-brand-primary transition">Pages</a>
      <a href="#contato" class="hover:text-brand-primary transition">Contact Us</a>
    </nav>
    <div class="flex items-center gap-3">
      <button id="theme-toggle" aria-label="Alternar tema" class="w-10 h-10 rounded-full flex items-center justify-center text-brand-textSecondary hover:text-brand-primary transition">
        <i class="fas fa-moon text-sm"></i>
      </button>
      <a href="tel:+5511999999999" class="flex items-center gap-2 pl-2 pr-4 py-1.5 rounded-full border border-brand-primary/30">
        <span class="w-9 h-9 rounded-full bg-brand-primary flex items-center justify-center">
          <i class="fas fa-phone text-brand-bg text-xs"></i>
        </span>
        <span class="text-sm font-semibold text-brand-textPrimary">+1 (62) 987 7543</span>
      </a>
    </div>
  </div>
</header>
```

### 7.3 Hero (`#home`)

Container arredondado com margem em relação às bordas da tela (não é full-bleed), fundo escuro com gradiente + gráfico abstrato de linhas/ondas de luz (posicionado como imagem/SVG decorativo, `absolute`, `pointer-events-none`).

```html
<section id="home" class="relative mx-4 md:mx-6 mt-4 rounded-3xl overflow-hidden bg-gradient-to-br from-brand-surface via-brand-bg to-brand-bg min-h-[80vh] flex items-center">
  <div class="absolute inset-0 opacity-60">
    <!-- SVG/imagem de ondas de luz decorativas em brand.primary, blur -->
  </div>
  <div class="container mx-auto px-8 md:px-16 relative z-10">
    <h1 class="text-fade text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.1] max-w-3xl mb-6">
      Amplify Your Brand with Cutting-Edge Digital Marketing
    </h1>
    <p class="text-brand-textSecondary max-w-md mb-8">
      Marko empowers businesses to grow online with data driven digital marketing, innovative branding, and performance focused strategies trusted by top brands.
    </p>
    <div class="flex flex-wrap items-center gap-8">
      <div class="flex items-center gap-3">
        <button class="w-14 h-14 rounded-full bg-brand-bg/60 border border-brand-primary/40 flex items-center justify-center">
          <i class="fas fa-play text-brand-textPrimary text-sm"></i>
        </button>
        <p class="text-xs text-brand-textMuted max-w-[160px]">Watch our video reviews and see how businesses achieve success</p>
      </div>
    </div>
    <div class="flex flex-wrap items-center gap-6 mt-8">
      <!-- split-btn "Get Started" aqui -->
      <div class="flex items-center gap-3">
        <div class="flex -space-x-3">
          <img class="w-10 h-10 rounded-full border-2 border-brand-primary" src="" alt="">
          <img class="w-10 h-10 rounded-full border-2 border-brand-primary" src="" alt="">
          <img class="w-10 h-10 rounded-full border-2 border-brand-primary" src="" alt="">
        </div>
        <p class="text-sm font-semibold text-brand-textPrimary">2.7k Positive Reviews</p>
      </div>
    </div>
  </div>
</section>
```

### 7.4 Photo-overlap card

Card pequeno com borda de destaque, sobreposto ao canto de uma foto grande (usado em "About/Expertise" e "Why Choose Marko"):

```html
<div class="relative">
  <img src="" alt="" class="rounded-2xl w-full">
  <div class="absolute -bottom-6 right-6 bg-brand-surface border border-brand-primary/40 rounded-2xl p-6 max-w-xs shadow-card-hover">
    <p class="font-bold text-brand-textPrimary mb-2">Partner with Marko & take your brand to the next level.</p>
    <a href="#" class="text-brand-primary text-sm font-semibold inline-flex items-center gap-1">
      Let's Talk Strategy <i class="fas fa-arrow-right text-xs"></i>
    </a>
  </div>
</div>
```

### 7.5 Cards de serviço (ícone + split-btn)

```html
<div class="card-lift bg-brand-surface border border-brand-border/15 rounded-2xl p-8">
  <div class="icon-badge mb-6"><i class="fas fa-share-nodes"></i></div>
  <h4 class="text-xl font-bold text-brand-textPrimary mb-3">Social Media Marketing</h4>
  <p class="text-brand-textSecondary text-sm mb-6">Build brand awareness &amp; engage your audience effectively.</p>
  <!-- split-btn "View Details" outline aqui -->
</div>
```

### 7.6 Case study card (tag cloud sobre imagem)

```html
<div class="relative rounded-2xl overflow-hidden group">
  <img src="" alt="" class="w-full h-72 object-cover">
  <div class="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/40 to-transparent"></div>
  <div class="absolute top-4 right-4 flex flex-wrap gap-2 max-w-[70%] justify-end">
    <span class="tag-pill">Social</span>
    <span class="tag-pill">Influencer</span>
    <span class="tag-pill">Retargeting</span>
    <span class="tag-pill">Google</span>
  </div>
  <div class="absolute bottom-6 left-6 right-6">
    <h4 class="text-xl font-bold text-brand-textPrimary mb-1">Local Business Digital Transformation</h4>
    <p class="text-brand-textSecondary text-sm">5x ROI on social media campaigns &amp; 80% increase in engagement...</p>
  </div>
</div>
```

```css
.tag-pill {
  font-size: 11px;
  padding: 4px 12px;
  border-radius: 999px;
  border: 1px solid rgba(217,255,106,0.35);
  color: #D8DEE3;
  background: rgba(11,13,17,0.5);
  backdrop-filter: blur(4px);
}
```

### 7.7 Stat card + stat-stroke

```html
<div class="bg-brand-surface border border-brand-primary/30 rounded-2xl p-8 flex items-center gap-6">
  <span class="stat-stroke text-6xl">21+</span>
  <div>
    <h5 class="font-bold text-brand-textPrimary mb-2">Years of Experience on Digital Marketing Services</h5>
    <p class="text-brand-textSecondary text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
  </div>
</div>
```

### 7.8 Checklist item

```html
<div class="checklist-item flex items-center gap-3">
  <span class="w-5 h-5 rounded-full border border-brand-primary flex items-center justify-center">
    <i class="fas fa-check text-[10px] text-brand-primary"></i>
  </span>
  <span class="text-sm text-brand-textPrimary">Performance Marketing</span>
</div>
```

### 7.9 Testimonial card

```html
<div class="bg-brand-surface border border-brand-border/15 rounded-2xl p-6">
  <div class="flex items-start justify-between mb-4">
    <div class="flex gap-1 text-yellow-400 text-xs">★★★★★</div>
    <i class="fas fa-quote-right text-brand-primary text-xl"></i>
  </div>
  <div class="flex items-center gap-3 mb-4">
    <img src="" class="w-11 h-11 rounded-full" alt="">
    <div>
      <p class="font-bold text-brand-textPrimary text-sm">Emma Richard</p>
      <p class="text-brand-textMuted text-xs">CEO Nexatech</p>
    </div>
  </div>
  <p class="text-brand-textSecondary text-sm">"Marko completely transformed our online presence!..."</p>
</div>
```

### 7.10 Process row (How It Work — colunas divididas)

```html
<div class="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-brand-border/15 border border-brand-border/15 rounded-2xl overflow-hidden">
  <div class="p-8">
    <div class="flex items-start justify-between mb-6">
      <i class="fas fa-magnifying-glass text-brand-primary text-2xl"></i>
      <span class="text-brand-textMuted text-sm">01</span>
    </div>
    <h5 class="font-bold text-brand-textPrimary mb-2">Discovery &amp; Consult</h5>
    <p class="text-brand-textSecondary text-sm">Lorem ipsum dolor adipiscing elit tell luctus nec.</p>
  </div>
  <!-- repetir para 02, 03, 04 -->
</div>
```

### 7.11 Pricing (bento grid — não é 3 cards iguais)

Layout real: coluna central (plano em destaque) ocupa a altura total com glow radial de fundo; colunas laterais são divididas em 2 blocos empilhados (topo: card de intro/CTA; base: card de preço).

```html
<div class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
  <!-- Coluna esquerda: intro + Starter -->
  <div class="flex flex-col gap-6">
    <div class="bg-brand-surface border border-brand-border/15 rounded-2xl p-8 text-center flex-1 flex flex-col justify-center">
      <h4 class="text-fade text-2xl font-extrabold mb-3">Let's Find the Right Strategy for You!</h4>
      <a href="#" class="text-brand-primary text-sm font-semibold">Book a Free Consultation →</a>
    </div>
    <div class="bg-brand-surface border border-brand-border/15 rounded-2xl p-8">
      <h4 class="font-bold text-brand-textPrimary mb-1">Starter</h4>
      <p class="text-brand-textMuted text-sm mb-4">Perfect for startups &amp; small businesses</p>
      <p class="text-4xl font-extrabold text-brand-textPrimary mb-6">$99 <span class="text-sm text-brand-textMuted font-normal">/Month</span></p>
      <!-- split-btn "View Details" -->
      <ul class="mt-6 space-y-3"><!-- checklist-item x3 --></ul>
    </div>
  </div>

  <!-- Coluna central: plano em destaque -->
  <div class="bg-gradient-to-b from-brand-primary/15 to-brand-surface border border-brand-primary/40 rounded-2xl p-8 shadow-glow flex flex-col">
    <h4 class="font-bold text-brand-textPrimary mb-1">Enterprise</h4>
    <p class="text-brand-textMuted text-sm mb-4">Full scale marketing for maximum impact</p>
    <p class="text-4xl font-extrabold text-brand-textPrimary mb-6">$399 <span class="text-sm text-brand-textMuted font-normal">/Month</span></p>
    <!-- split-btn "View Details" sólido -->
    <div class="border-t border-brand-border/15 my-6"></div>
    <ul class="space-y-3 mb-6"><!-- 3 itens com ícone simples --></ul>
    <div class="border-t border-brand-border/15 my-6"></div>
    <ul class="space-y-3"><!-- checklist-item x N --></ul>
  </div>

  <!-- Coluna direita: destaques + Growth -->
  <div class="flex flex-col gap-6">
    <div class="bg-brand-surface border border-brand-border/15 rounded-2xl p-6">
      <h4 class="font-bold text-brand-textPrimary mb-4">Your Growth, Our Priority!</h4>
      <ul class="space-y-2"><!-- itens com fundo bg-brand-bg rounded-xl p-3 flex justify-between --></ul>
    </div>
    <div class="bg-brand-surface border border-brand-border/15 rounded-2xl p-8">
      <h4 class="font-bold text-brand-textPrimary mb-1">Growth</h4>
      <p class="text-brand-textMuted text-sm mb-4">Best for growing businesses ready</p>
      <p class="text-4xl font-extrabold text-brand-textPrimary mb-6">$299 <span class="text-sm text-brand-textMuted font-normal">/Month</span></p>
      <!-- split-btn "View Details" -->
      <ul class="mt-6 space-y-3"><!-- checklist-item x3 --></ul>
    </div>
  </div>
</div>
```

### 7.12 Newsletter (input + botão combinados em pill único)

```html
<div class="bg-brand-surface border border-brand-primary/30 rounded-3xl p-10 md:p-16 text-center">
  <h2 class="text-fade text-3xl md:text-4xl font-extrabold mb-3">Stay Ahead in Digital Marketing</h2>
  <p class="text-brand-textSecondary mb-8">Get exclusive insights, trends, and strategies delivered straight to your inbox.</p>
  <form class="inline-flex items-center bg-brand-bg border border-brand-primary/30 rounded-full p-1.5 max-w-md w-full mx-auto">
    <input type="email" placeholder="Give your best email" class="flex-1 bg-transparent px-5 text-sm text-brand-textPrimary placeholder:text-brand-textMuted focus:outline-none">
    <button type="submit" class="split-btn flex items-center gap-2 bg-brand-bg/40 rounded-full pl-4 pr-1.5 py-1.5">
      <span class="text-sm font-semibold text-brand-textPrimary">Subscribe</span>
      <span class="w-9 h-9 rounded-full bg-brand-primary flex items-center justify-center">
        <i class="fas fa-arrow-right text-brand-bg text-xs"></i>
      </span>
    </button>
  </form>
</div>
```

### 7.13 Blog card

```html
<div class="rounded-2xl overflow-hidden">
  <img src="" alt="" class="w-full h-56 object-cover rounded-2xl mb-5">
  <div class="flex items-center gap-4 text-xs text-brand-textMuted mb-3">
    <span class="flex items-center gap-1.5"><i class="far fa-calendar text-brand-primary"></i> April 14, 2025</span>
    <span class="flex items-center gap-1.5"><i class="fas fa-tag text-brand-primary"></i> Social Media</span>
  </div>
  <h4 class="text-lg font-bold text-brand-textPrimary mb-2">Mastering Instagram and Facebook Ads</h4>
  <p class="text-brand-textSecondary text-sm mb-3">Lorem ipsum dolor si amet elit tellus luctus nec.</p>
  <a href="#" class="text-brand-primary text-sm font-semibold">Read More</a>
</div>
```

### 7.14 Footer

```html
<footer class="mx-4 md:mx-6 mb-4 rounded-t-3xl border border-b-0 border-brand-primary/25 bg-brand-surface pt-16 pb-8 px-8 md:px-16">
  <div class="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
    <div>
      <div class="flex items-center gap-2 mb-4">
        <img src="assets/logo-mark.svg" class="h-7" alt="">
        <span class="font-bold text-brand-textPrimary">marko</span>
      </div>
      <h5 class="font-bold text-brand-textPrimary mb-3">Driving Digital Growth with Innovation &amp; Strategy</h5>
      <p class="text-brand-textMuted text-sm">Lorem ipsum dolor sit amet consectetur.</p>
    </div>
    <div>
      <h6 class="font-bold text-brand-textPrimary mb-4">Quick Links</h6>
      <ul class="space-y-2 text-sm text-brand-textMuted"><!-- links --></ul>
    </div>
    <div>
      <h6 class="font-bold text-brand-textPrimary mb-4">Services</h6>
      <ul class="space-y-2 text-sm text-brand-textMuted"><!-- links --></ul>
    </div>
    <div>
      <h6 class="font-bold text-brand-textPrimary mb-4">Contact Info</h6>
      <p class="text-brand-textMuted text-sm mb-2">hello@markoagency.com</p>
      <p class="text-brand-textMuted text-sm mb-4">+1 234 567 890</p>
      <h6 class="font-bold text-brand-textPrimary mb-3">Social Media</h6>
      <div class="flex gap-3">
        <a class="w-9 h-9 rounded-full bg-brand-primary/15 border border-brand-primary/30 flex items-center justify-center text-brand-primary"><i class="fab fa-facebook-f text-xs"></i></a>
        <a class="w-9 h-9 rounded-full bg-brand-primary/15 border border-brand-primary/30 flex items-center justify-center text-brand-primary"><i class="fab fa-youtube text-xs"></i></a>
        <a class="w-9 h-9 rounded-full bg-brand-primary/15 border border-brand-primary/30 flex items-center justify-center text-brand-primary"><i class="fab fa-instagram text-xs"></i></a>
        <a class="w-9 h-9 rounded-full bg-brand-primary/15 border border-brand-primary/30 flex items-center justify-center text-brand-primary"><i class="fab fa-linkedin-in text-xs"></i></a>
      </div>
    </div>
  </div>
  <div class="gradient-rule mb-6"></div>
  <div class="flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-brand-textMuted">
    <p>&copy; 2026 Marko. Fox Creation All Rights Reserved.</p>
    <div class="flex gap-6"><a href="#">Terms of Service</a><a href="#">Privacy Policy</a></div>
  </div>
</footer>
```

---

## 8. Popup de captura (`#popup-captura`)

Mesmo padrão do `pta-layout-system.md`, com os tokens `brand.*` do Marko (não existe popup nativo no template de referência — este é o padrão do agency para geração de leads).

### 8.1 Estrutura HTML obrigatória

```html
<div id="popup-captura"
  class="fixed inset-0 z-[100] hidden items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
  aria-hidden="true">
  <div class="relative bg-brand-surface border border-brand-primary/30 rounded-2xl shadow-2xl max-w-md w-full p-8 md:p-10">
    <div class="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-brand-primary to-brand-accent rounded-t-2xl"></div>

    <button type="button" onclick="fecharPopup()" aria-label="Fechar"
      class="absolute top-6 right-6 text-brand-textMuted hover:text-brand-primary transition-colors">
      <i class="fas fa-times text-sm"></i>
    </button>

    <div class="text-center mb-6">
      <p class="text-brand-primary font-semibold text-xs mb-2">Vamos conversar</p>
      <h3 class="font-display font-bold text-2xl text-brand-textPrimary tracking-tight mb-1">Solicite uma proposta</h3>
      <p class="text-sm text-brand-textMuted">Preencha seus dados e nossa equipe retorna em até 1 dia útil.</p>
    </div>

    <form id="form-captura" class="space-y-4">
      <input type="text" id="lead-nome" name="nome" placeholder="Nome completo" required
        class="w-full bg-brand-bg border border-brand-border/25 rounded-xl px-4 py-3 text-sm text-brand-textPrimary placeholder:text-brand-textMuted focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition">

      <input type="email" id="lead-email" name="email" placeholder="E-mail" required
        class="w-full bg-brand-bg border border-brand-border/25 rounded-xl px-4 py-3 text-sm text-brand-textPrimary placeholder:text-brand-textMuted focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition">

      <div class="flex items-stretch">
        <span class="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-brand-border/25 bg-brand-bg text-brand-textMuted text-sm">+55</span>
        <input type="tel" id="lead-telefone" name="telefone" placeholder="(00) 00000-0000" required maxlength="15"
          class="w-full bg-brand-bg border border-brand-border/25 rounded-r-xl px-4 py-3 text-sm text-brand-textPrimary placeholder:text-brand-textMuted focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition">
      </div>

      <!-- Campos ocultos UTM (obrigatórios) -->
      <input type="hidden" id="utm_source" name="utm_source">
      <input type="hidden" id="utm_term" name="utm_term">
      <input type="hidden" id="utm_campaign" name="utm_campaign">
      <input type="hidden" id="utm_medium" name="utm_medium">
      <input type="hidden" id="utm_content" name="utm_content">
      <input type="hidden" id="url" name="url">

      <p class="error-msg text-red-400 text-xs hidden">Informe o DDD e o número completo.</p>

      <button type="submit"
        class="w-full split-btn flex items-center justify-center gap-2 bg-brand-primary text-brand-bg font-semibold text-sm rounded-full py-4 hover:bg-brand-primaryHover transition-colors btn-submit">
        Enviar solicitação
      </button>
    </form>
  </div>
</div>
```

### 8.2 Campo telefone
- Prefixo visual **+55** fixo (não editável)
- Máscara brasileira: `(11) 99999-9999`
- Validar mínimo 10 dígitos (sem contar +55)
- No payload, enviar como `telefone: '+55' + rawPhone`

### 8.3 Comportamento do popup

```js
const popup = document.getElementById('popup-captura');

function abrirPopup() {
  popup.classList.remove('hidden');
  popup.classList.add('flex');
  document.body.style.overflow = 'hidden';
}
function fecharPopup() {
  popup.classList.add('hidden');
  popup.classList.remove('flex');
  document.body.style.overflow = '';
}
popup.addEventListener('click', (e) => { if (e.target === popup) fecharPopup(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') fecharPopup(); });
```

Todos os CTAs da página (hero, split-buttons de serviço/pricing, header) chamam `abrirPopup()`.

---

## 9. UTMs, máscara de telefone e submit

### 9.1 Preenchimento de UTMs no load

```js
(function preencherUTMs() {
  const params = new URLSearchParams(window.location.search);
  ['utm_source', 'utm_term', 'utm_campaign', 'utm_medium', 'utm_content'].forEach((campo) => {
    const el = document.getElementById(campo);
    if (el) el.value = params.get(campo) || '';
  });
  const urlField = document.getElementById('url');
  if (urlField) urlField.value = window.location.href;
})();
```

### 9.2 Máscara de telefone

```js
const telInput = document.getElementById('lead-telefone');
telInput.addEventListener('input', function (e) {
  let value = e.target.value.replace(/\D/g, '');
  if (value.startsWith('55') && value.length > 2) value = value.slice(2);
  value = value.slice(0, 11);
  let formatado = value;
  if (value.length > 2) formatado = `(${value.slice(0, 2)}) ` + value.slice(2);
  if (value.length > 7) formatado = formatado.slice(0, 10) + '-' + formatado.slice(10);
  e.target.value = formatado;
  document.querySelector('.error-msg')?.classList.add('hidden');
});
```

### 9.3 Submit completo (webhook Make/n8n)

```js
document.getElementById('form-captura').addEventListener('submit', async function (e) {
  e.preventDefault();

  const btnSubmit = this.querySelector('.btn-submit');
  const errorMsg = this.querySelector('.error-msg');
  const telInput = document.getElementById('lead-telefone');

  const rawPhone = telInput.value.replace(/\D/g, '');
  if (rawPhone.length < 10) {
    errorMsg.classList.remove('hidden');
    telInput.focus();
    return;
  }

  btnSubmit.disabled = true;
  btnSubmit.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Enviando...';

  const payload = {
    nome: document.getElementById('lead-nome').value.trim(),
    email: document.getElementById('lead-email').value.trim(),
    telefone: '+55' + rawPhone,
    utm_source: document.getElementById('utm_source')?.value || '',
    utm_term: document.getElementById('utm_term')?.value || '',
    utm_campaign: document.getElementById('utm_campaign')?.value || '',
    utm_medium: document.getElementById('utm_medium')?.value || '',
    utm_content: document.getElementById('utm_content')?.value || '',
    url: document.getElementById('url')?.value || window.location.href
  };

  const WEBHOOK_URL = 'WEBHOOK_DO_PROJETO'; // ← Make ou n8n, definir por projeto
  const redirectUrl = ''; // ← opcional: URL de obrigado/checkout

  try {
    await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      mode: 'no-cors'
    });
  } catch (error) {
    console.error(error);
  } finally {
    if (redirectUrl) {
      const query = new URLSearchParams(payload).toString();
      window.location.href = redirectUrl + '?' + query;
    } else {
      fecharPopup();
      btnSubmit.disabled = false;
      btnSubmit.innerHTML = 'Enviar solicitação';
    }
  }
});
```

> **Importante:** usar sempre `telefone`, nunca `phone`.

---

## 10. Iconografia

- **Font Awesome** — setas, redes sociais, UI (play, phone, moon, quote, star, calendar, tag)
- **Line-art custom** (estilo SVG Repo) — ícones de serviço dentro do `.icon-badge` (megafone, gráfico, funil, etc.)
- Estilo: sempre dentro de `.icon-badge` (quadrado arredondado 56px, borda gradiente, fundo escuro) — nunca ícone solto sem container em cards de destaque

---

## 11. Anatomia da página (ordem real observada)

```
1.  Header           barra full-width, logo + tagline, nav central, toggle de tema + telefone
2.  Hero              #home — container arredondado com margem, ondas de luz, headline .text-fade, split-btn
3.  Expertise/About    colagem de fotos + photo-overlap card, checklist, stat-stroke card
4.  Logo strip         marquee de marcas parceiras
5.  Why Choose Marko   3 feature-rows com icon-badge + foto com photo-overlap card
6.  Video/CTA banner   foto full-bleed com overlay escuro, play button, headline .text-fade
7.  Serviços           grid 3x2 de cards com icon-badge + split-btn "View Details"
8.  Case Studies        wrapper com borda glow, grid 2x2 de cards com tag cloud sobre imagem
9.  Stats + Testemunhos  card de stats + header .text-fade + grid 3 testimonial cards
10. How It Work         wrapper com borda, header + process-row dividido em 4 colunas
11. Pricing              bento grid 3 colunas (ver 7.11)
12. Newsletter           wrapper com borda glow, input+botão combinados
13. Blog                 grid 2 colunas de blog cards
14. Footer               container arredondado no topo, borda glow, 4 colunas + bottom bar
—   Popup                #popup-captura (overlay, fora do fluxo de scroll)
—   Mobile CTA            .mobile-float (lg:hidden)
```

---

## 12. Modo Claro/Escuro

```css
:root {
  --brand-bg: #0B0D11;
  --brand-surface: #222A31;
  --brand-primary: #D9FF6A;
  --brand-primaryHover: #E8FEAE;
  --brand-textPrimary: #D8DEE3;
  --brand-textSecondary: #7B8793;
}

[data-theme="light"] {
  --brand-bg: #D8DEE3;
  --brand-surface: #EDEFF1;
  --brand-primary: #D9FF6A;
  --brand-primaryHover: #B7DF4E;
  --brand-textPrimary: #0B0D11;
  --brand-textSecondary: #222A31;
}
```

```js
document.getElementById('theme-toggle').addEventListener('click', () => {
  const html = document.documentElement;
  const isLight = html.getAttribute('data-theme') === 'light';
  html.setAttribute('data-theme', isLight ? 'dark' : 'light');
});
```

---

## 13. Motion / Interação

- Transições padrão: `transition duration-300 ease-out`
- Hover de card: `.card-lift` (elevação leve + `shadow-card-hover`)
- Entrada de elementos ao scroll: AOS `fade-up`, `once: true`
- `.marquee` de logos: loop infinito, pausa no hover
- Split button: círculo de ícone com leve escala no hover (`hover:scale-105`)
- `.tag-pill` sobre case studies: leve fade-in escalonado ao entrar na viewport

---

## 14. Checklist antes de publicar

- [ ] Tailwind config com tokens `brand.*` da paleta do projeto
- [ ] Google Fonts Inter carregada; `body` com `font-sans`
- [ ] `.text-fade` aplicado em todos os H2 de seção
- [ ] Split-button usado em todos os CTAs (hero, cards, pricing, newsletter)
- [ ] Header como barra full-width (não pill flutuante)
- [ ] Popup `#popup-captura` com campos `nome`, `email`, `telefone` + UTMs ocultas + `url`
- [ ] Payload usa `telefone` (não `phone`)
- [ ] Todos os CTAs abrem o popup (`abrirPopup()`)
- [ ] Pricing em bento grid (não 3 cards iguais)
- [ ] Mobile float CTA visível apenas em `< lg`
- [ ] Toggle de tema claro/escuro funcional
- [ ] AOS inicializado (`once: true`)

---

## 15. Stack técnica / notas finais

- **Framework de estilo:** Tailwind CSS (substituiu Bootstrap 5 da versão original do template)
- **Estrutura:** React 19 + Vite, ou HTML estático conforme o projeto
- Fonte: Google Fonts — Inter
- Ícones: Font Awesome + line-art custom
- Popup, UTMs e submit seguem o mesmo contrato do `pta-layout-system.md`, com tokens de cor `brand.primary` (`#D9FF6A`) no lugar da paleta da PTA
