// ===== Menu: abrir/fechar no celular =====
const menu = document.getElementById('menu');
const botaoMenu = document.querySelector('.menu-btn');
botaoMenu.addEventListener('click', () => {
  const aberto = menu.classList.toggle('aberto');
  botaoMenu.setAttribute('aria-expanded', aberto);
});
menu.addEventListener('click', e => {
  if (e.target.tagName === 'A') { menu.classList.remove('aberto'); botaoMenu.setAttribute('aria-expanded', false); }
});

// ===== Destaca no menu a seção que está na tela =====
const links = [...document.querySelectorAll('.menu a[href^="#"]')];
const observador = new IntersectionObserver(entradas => {
  entradas.forEach(e => {
    if (!e.isIntersecting) return;
    links.forEach(a => a.classList.toggle('ativo', a.getAttribute('href') === '#' + e.target.id));
  });
}, { rootMargin: '-40% 0px -55% 0px' });
links.forEach(a => { const s = document.querySelector(a.getAttribute('href')); if (s) observador.observe(s); });

// ===== Ano atual no rodapé =====
document.getElementById('ano').textContent = new Date().getFullYear();

// ===== Abas de serviços: mostra só os cards da categoria escolhida =====
const abas = document.querySelectorAll('.aba');
const cartoes = document.querySelectorAll('#servicos .card[data-cat]');
abas.forEach(aba => aba.addEventListener('click', () => {
  abas.forEach(a => { a.classList.toggle('ativa', a === aba); a.setAttribute('aria-selected', a === aba); });
  cartoes.forEach(c => { c.hidden = c.dataset.cat !== aba.dataset.cat; });
}));

// ===== Carrosséis: setas e pontinhos =====
document.querySelectorAll('.carrossel').forEach(car => {
  const faixa = car.querySelector('.faixa');
  const slides = [...faixa.children];
  const pontos = car.querySelector('.pontos');
  pontos.innerHTML = slides.map(() => '<i></i>').join('');
  const passo = () => slides[1] ? slides[1].offsetLeft - slides[0].offsetLeft : faixa.clientWidth;

  car.querySelector('.ant').addEventListener('click', () => faixa.scrollBy({ left: -passo(), behavior: 'smooth' }));
  car.querySelector('.prox').addEventListener('click', () => faixa.scrollBy({ left: passo(), behavior: 'smooth' }));

  const atualiza = () => {
    const i = Math.min(slides.length - 1, Math.round(faixa.scrollLeft / passo()));
    [...pontos.children].forEach((p, n) => p.classList.toggle('ativo', n === i));
  };
  faixa.addEventListener('scroll', atualiza, { passive: true });
  atualiza();
});

// ===== Formulário: monta a mensagem e abre o WhatsApp =====
document.getElementById('form-zap').addEventListener('submit', e => {
  e.preventDefault();
  const d = new FormData(e.target);
  let texto = `Olá, Vanessa! Meu nome é ${d.get('nome')}. Tenho interesse em ${d.get('interesse')}.`;
  if (d.get('mensagem').trim()) texto += ` ${d.get('mensagem').trim()}`;
  window.open('https://wa.me/5584999988091?text=' + encodeURIComponent(texto), '_blank', 'noopener');
});

// ===== Animações de rolagem (só se a classe "anima" estiver ligada) =====
if (document.documentElement.classList.contains('anima')) {
  // Atraso escalonado entre elementos irmãos
  document.querySelectorAll('[data-r]').forEach(el => {
    const irmaos = [...el.parentElement.children].filter(x => x.hasAttribute('data-r'));
    el.style.setProperty('--i', irmaos.indexOf(el));
  });

  const entrada = new IntersectionObserver(entradas => {
    entradas.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('visivel');
      entrada.unobserve(e.target);
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('[data-r]').forEach(el => entrada.observe(el));

  // Barra de progresso (1 atualização por quadro)
  const raiz = document.documentElement;
  let esperando = false;
  addEventListener('scroll', () => {
    if (esperando) return;
    esperando = true;
    requestAnimationFrame(() => {
      const total = raiz.scrollHeight - innerHeight;
      raiz.style.setProperty('--prog', total > 0 ? scrollY / total : 0);
      esperando = false;
    });
  }, { passive: true });
}
