const reduz = matchMedia('(prefers-reduced-motion: reduce)').matches;
const raiz = document.documentElement;
const corpo = document.body;
const limita = (n, a = 0, b = 1) => Math.min(b, Math.max(a, n));
if (!reduz) raiz.classList.add('anima');

// ===== Início: a animação de entrada começa assim que a página abre =====
// Espera as fontes carregarem (no máximo 1,2 s) para o título não "trocar de letra" no meio do efeito
const fontesProntas = document.fonts ? document.fonts.ready : Promise.resolve();
Promise.race([fontesProntas, new Promise(r => setTimeout(r, 1200))])
  .then(() => requestAnimationFrame(() => corpo.classList.add('dentro')));

// ===== Ano no rodapé =====
document.getElementById('ano').textContent = new Date().getFullYear();

// ===== Fundo muda de tom conforme a cena; pontos laterais mostram onde você está =====
const cenas = [...document.querySelectorAll('[data-fundo][id]')];
const pontos = [...document.querySelectorAll('.pontos-nav a')];
const observaCena = new IntersectionObserver(entradas => {
  entradas.forEach(e => {
    if (!e.isIntersecting) return;
    corpo.dataset.fundo = e.target.dataset.fundo;
    pontos.forEach(a => a.classList.toggle('ativo', a.getAttribute('href') === '#' + e.target.id));
  });
}, { rootMargin: '-45% 0px -45% 0px' });
cenas.forEach(c => observaCena.observe(c));

// ===== Perguntas frequentes: abre e fecha com a altura animada (o <details> nativo abre "seco") =====
document.querySelectorAll('.faq details').forEach(d => {
  const resumo = d.querySelector('summary');
  const resposta = d.querySelector('p');
  let animCaixa, animTexto;
  d.dataset.aberta = d.open ? '1' : '0';

  resumo.addEventListener('click', e => {
    if (reduz) return; // quem pediu menos movimento fica com o comportamento padrão
    e.preventDefault();
    const abrindo = d.dataset.aberta !== '1';
    const inicio = d.getBoundingClientRect().height; // altura atual (vale também se clicar no meio da animação)
    animCaixa?.cancel(); animTexto?.cancel();
    d.dataset.aberta = abrindo ? '1' : '0';

    // Mede a altura final: aberta (natural) ou fechada (só o título)
    let fim;
    if (abrindo) { d.open = true; fim = d.getBoundingClientRect().height; }
    else { d.open = false; fim = d.getBoundingClientRect().height; d.open = true; }

    const suave = 'cubic-bezier(.22, 1, .36, 1)';
    d.style.overflow = 'hidden';
    animCaixa = d.animate({ height: [inicio + 'px', fim + 'px'] }, { duration: 450, easing: suave });
    animTexto = resposta.animate(
      { opacity: abrindo ? [0, 1] : [1, 0], transform: abrindo ? ['translateY(-8px)', 'none'] : ['none', 'translateY(-8px)'] },
      { duration: abrindo ? 450 : 250, easing: 'ease', delay: abrindo ? 80 : 0, fill: 'both' }
    );
    animCaixa.onfinish = () => { d.open = abrindo; d.style.overflow = ''; animTexto.cancel(); };
  });
});

// ===== Serviços: o link de cada card leva o nome do serviço na mensagem do WhatsApp =====
document.querySelectorAll('.mais[data-servico]').forEach(a => {
  const texto = `Olá, Vanessa! Vim pelo site e gostaria de agendar: ${a.dataset.servico}.`;
  a.href = 'https://wa.me/5584999988091?text=' + encodeURIComponent(texto);
});

// ===== Entrada suave dos blocos comuns =====
if (!reduz) {
  const ver = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visivel'); ver.unobserve(e.target); }
  }), { threshold: .15 });
  document.querySelectorAll('[data-r]').forEach(el => ver.observe(el));
}

// ===== Depoimentos: troca sozinha a cada 6s (e pelas bolinhas) =====
const citacoes = [...document.querySelectorAll('.citacoes blockquote')];
const bolinhas = document.querySelector('.bolinhas');
let atual = 0, timer;
bolinhas.innerHTML = citacoes.map((_, i) => `<button type="button" aria-label="Depoimento ${i + 1}"></button>`).join('');
// A caixa acompanha a altura do depoimento visível (2,5rem de respiro em cima e embaixo)
const caixa = document.querySelector('.citacoes');
const ajustaAltura = () => {
  const respiro = parseFloat(getComputedStyle(document.documentElement).fontSize) * 5;
  caixa.style.height = citacoes[atual].offsetHeight + respiro + 'px';
};
caixa.classList.add('ajustavel');
addEventListener('resize', ajustaAltura);
if (document.fonts) document.fonts.ready.then(ajustaAltura);
const mostra = i => {
  atual = i;
  ajustaAltura();
  citacoes.forEach((c, n) => c.classList.toggle('ativo', n === i));
  [...bolinhas.children].forEach((b, n) => b.classList.toggle('ativo', n === i));
};
const agenda = () => { clearInterval(timer); if (!reduz) timer = setInterval(() => mostra((atual + 1) % citacoes.length), 6000); };
[...bolinhas.children].forEach((b, i) => b.addEventListener('click', () => { mostra(i); agenda(); }));
mostra(0); agenda();

if (!reduz) {
  // ===== Cenas presas: a rolagem controla --p (0 a 1) =====
  const pins = [...document.querySelectorAll('.pin')];
  const colunas = document.querySelector('#resultados');
  const cols = [...colunas.querySelectorAll('.col')];
  const atual = new Map(pins.map(p => [p, 0])); // progresso suavizado de cada cena
  let rodando = false, tAnterior = 0;

  const quadro = (t) => {
    let mexendo = false;
    // Suavização por TEMPO (não por quadro): o movimento fica igual em telas de 60 Hz, 120 Hz ou com quedas de quadro
    const dt = Math.min(64, t - tAnterior || 16); tAnterior = t;
    const k = 1 - Math.exp(-dt / 110);
    pins.forEach(p => {
      const r = p.getBoundingClientRect();
      // Cena longe da tela: não precisa atualizar nada
      if (r.bottom < -innerHeight || r.top > innerHeight * 2) return;
      const total = r.height - innerHeight;
      const alvo = total > 0 ? limita(-r.top / total) : 0;
      const antes = atual.get(p);
      let v = antes + (alvo - antes) * k;
      if (Math.abs(alvo - v) < .0005) v = alvo; else mexendo = true;
      if (v !== antes) { atual.set(p, v); p.style.setProperty('--p', v.toFixed(4)); } // só escreve se mudou
    });
    // Resultados: distância do centro da tela, usada pelas colunas (só quando a seção está perto da tela)
    const rc = colunas.getBoundingClientRect();
    if (rc.bottom > -200 && rc.top < innerHeight + 200) {
      // Limita o deslocamento (±600) para as colunas nunca invadirem o título
      const o = limita(rc.top + rc.height / 2 - innerHeight / 2, -600, 600).toFixed(1);
      cols.forEach(c => c.style.setProperty('--o', o));
    }
    // Continua animando até a suavização terminar
    if (mexendo) requestAnimationFrame(quadro); else rodando = false;
  };

  const pede = () => { if (rodando) return; rodando = true; tAnterior = performance.now(); requestAnimationFrame(quadro); };
  addEventListener('scroll', pede, { passive: true });
  addEventListener('resize', pede);
  addEventListener('load', pede);
  pede();

  // ===== Início: camadas se movem com o mouse =====
  const hero = document.getElementById('inicio');
  const brilho = document.querySelector('.brilho');
  // O mouse só guarda a posição; a tela é atualizada uma vez por quadro, direto no elemento (sem recalcular a página toda)
  let mx = 0, my = 0, mouseAgendado = false;
  addEventListener('pointermove', e => {
    mx = e.clientX; my = e.clientY;
    if (mouseAgendado) return;
    mouseAgendado = true;
    requestAnimationFrame(() => {
      mouseAgendado = false;
      brilho.classList.add('on');
      brilho.style.transform = `translate3d(${mx - 210}px, ${my - 210}px, 0)`;
      if (scrollY < innerHeight) { // camadas do topo só se mexem enquanto o topo está visível
        hero.style.setProperty('--px', ((mx / innerWidth - .5) * 2).toFixed(3));
        hero.style.setProperty('--py', ((my / innerHeight - .5) * 2).toFixed(3));
      }
    });
  }, { passive: true });
  hero.querySelectorAll('.camada').forEach(c => c.style.setProperty('--prof', c.dataset.prof));

  // ===== Partículas douradas flutuando =====
  const tela = document.getElementById('particulas');
  const ctx = tela.getContext('2d');
  let largura, altura, bolhas = [];
  const ajusta = () => {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    largura = tela.width = innerWidth * dpr; altura = tela.height = innerHeight * dpr;
    tela.style.width = innerWidth + 'px'; tela.style.height = innerHeight + 'px';
    const qtd = innerWidth < 768 ? 22 : 46;
    bolhas = Array.from({ length: qtd }, () => ({
      x: Math.random() * largura, y: Math.random() * altura,
      r: (Math.random() * 2.2 + .8) * dpr, v: (Math.random() * .35 + .12) * dpr, a: Math.random() * .4 + .15, f: Math.random() * 6.28
    }));
  };
  const anima = t => {
    ctx.clearRect(0, 0, largura, altura);
    bolhas.forEach(b => {
      b.y -= b.v; b.x += Math.sin(t / 2000 + b.f) * .25;
      if (b.y < -10) { b.y = altura + 10; b.x = Math.random() * largura; }
      ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, 6.283);
      ctx.fillStyle = `rgba(212, 160, 23, ${b.a})`; ctx.fill();
    });
    if (!document.hidden) requestAnimationFrame(anima);
  };
  addEventListener('resize', ajusta);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) requestAnimationFrame(anima); });
  ajusta(); requestAnimationFrame(anima);
}
