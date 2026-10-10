# Site da Vanessa Araújo Estética

## Sobre o projeto
Site institucional (one-page) para a esteticista Vanessa Araújo, de Natal/RN, com foco em apresentar os serviços, passar confiança e levar o visitante a agendar pelo WhatsApp.

## Informações da cliente
- **Nome da profissional / marca:** Vanessa Araújo
- **Cidade:** Natal/RN
- **WhatsApp / telefone:** (84) 99998-8091
- **Link do WhatsApp:** https://wa.me/5584999988091
- **Instagram:** @vanessaaraujoestetica_ (https://www.instagram.com/vanessaaraujoestetica__)
- **Endereço:** Av. Bernardo Vieira, 3081, Lagoa Seca, Natal/RN
- **Horário de atendimento:** segunda a sexta, 9h às 18h; sábado, 9h às 16h

## Objetivo do site
1. Apresentar a profissional e seus serviços.
2. Mostrar resultados (galeria de antes e depois, se as clientes autorizarem).
3. Gerar contato: o botão de WhatsApp é a ação principal em todas as seções.

## Público-alvo
Mulheres de Natal e região que buscam cuidados com a pele e o corpo, em sua maioria acessando pelo celular (Instagram e WhatsApp).

## Seções do site
1. **Topo (hero):** nome da marca, frase de impacto e botão "Agendar pelo WhatsApp"
2. **Serviços:** cards com nome, breve descrição e, se houver, valor ou "a partir de"
3. **Sobre:** foto e história da Vanessa, formação e diferenciais
4. **Galeria:** fotos do espaço e dos resultados
5. **Depoimentos:** relatos de clientes (somente reais e autorizados)
6. **Perguntas frequentes:** dúvidas comuns sobre os procedimentos
7. **Contato e localização:** WhatsApp, Instagram, horário, endereço e mapa (Google Maps incorporado)
8. **Rodapé:** direitos autorais, Instagram e WhatsApp

## Identidade visual
- **Bege (fundo principal):** `#fdebdb`
- **Branco (fundos de cards e seções alternadas):** `#ffffff`
- **Dourado (detalhes, linhas, ícones e botões):** `#f8e157`
- **Cor de texto (sugestão, para dar contraste):** marrom escuro `#4a3b32`
- **Fonte dos títulos:** The Seasons. Se o arquivo da fonte não estiver na pasta (ela é paga), usar Cormorant Garamond (Google Fonts) como alternativa parecida.
- **Fonte do texto:** Montserrat (Google Fonts)
- **Estilo:** elegante, delicado e acolhedor. Bastante espaço em branco, títulos grandes em serifada, cantos arredondados suaves, linhas finas douradas como detalhe e fotos com visual limpo e luminoso.
- **Logo (versão atual, só o monograma):** arquivo em `imagens/logo.png`. É o monograma "VA" em dourado degradê, com um traço fino em espiral ao fundo, sem o nome escrito. O fundo é transparente.
  - Como a logo não traz o nome, escrever "Vanessa Araújo Estética" em texto HTML ao lado ou abaixo dela no topo e no rodapé, usando a fonte dos títulos (The Seasons ou a alternativa).
  - Usar o monograma como favicon (ícone da aba do navegador) e como elemento decorativo discreto (por exemplo, marca d'água suave no topo ou no rodapé).
  - Se existir também a versão completa, com o nome embaixo, salvar como `imagens/logo-completa.png` e usar onde couber o nome junto, como no rodapé.
  - Usar a logo sem distorcer, sem mudar as cores e com espaço livre ao redor.
  - Sobre o fundo bege `#fdebdb` ou branco ela funciona bem. Evitar fundos escuros ou muito coloridos.
  - O degradê da logo tem tons de dourado mais profundos que o `#f8e157`. Para linhas finas, bordas e ícones, pode-se usar um dourado mais escuro (ex.: `#d4a017`) que combine com a logo.

### Cuidados com as cores
- O dourado `#f8e157` é bem claro. Não usar como cor de texto sobre bege ou branco, porque fica difícil de ler.
- Em botões dourados, usar texto marrom escuro `#4a3b32`.
- Para destaques em texto, usar o marrom escuro.

## Tom de voz
Acolhedor, profissional e próximo. Evitar termos técnicos demais e jamais prometer resultados garantidos ou milagrosos.

## Stack e organização
- HTML, CSS e JavaScript simples, sem frameworks, para facilitar a manutenção.
- Estrutura de pastas:
  - `index.html`
  - `css/style.css`
  - `js/main.js`
  - `imagens/`
  - `fontes/` (para a fonte The Seasons, se houver o arquivo)
  - `versao-classica/` (versão anterior do site, guardada como alternativa; não é a principal)
  - `design-demos/` (rascunhos das 3 direções visuais; histórico)
- **Versão principal:** a imersiva (portal de entrada, cenas presas na rolagem, partículas). Está na raiz: `index.html`, `css/style.css`, `js/main.js`.
- Sem dependências externas, exceto Google Fonts (Montserrat e alternativa dos títulos) e ícones, se necessário.

## Regras de desenvolvimento
- **Mobile first:** projetar primeiro para celular e depois adaptar para telas maiores.
- Layout responsivo testado em larguras de 360px, 768px e 1280px.
- HTML semântico (`header`, `main`, `section`, `footer`) e texto alternativo em todas as imagens.
- Boa legibilidade: contraste adequado e tamanho de fonte mínimo de 16px no corpo do texto.
- Imagens otimizadas (formato WebP ou JPG comprimido) para carregar rápido.
- **Botão de WhatsApp:** usar `https://wa.me/5584999988091` com mensagem pré-preenchida (por exemplo, `?text=Olá, Vanessa! Vim pelo site e gostaria de agendar um horário.`, com o texto codificado na URL). Deve abrir em nova aba e ficar fixo no canto da tela no celular.
- Link do Instagram abrindo em nova aba, com `rel="noopener"`.
- Incluir título, descrição e imagem de compartilhamento (meta tags) para SEO e redes sociais, com foco em "esteticista em Natal/RN".
- Comentar o código de forma simples e em português.

## Cuidados importantes
- Não inventar depoimentos, preços, fotos de resultados ou dados da cliente. Usar texto de exemplo claramente marcado como `[EXEMPLO]` até receber o conteúdo real.
- Fotos de antes e depois só com autorização das clientes.
- Não fazer promessas de cura ou resultado garantido nos textos.

## Como trabalhar neste projeto
- Antes de mudanças grandes, explicar o plano em poucas linhas.
- Fazer alterações pequenas e mostrar o que mudou.
- Para ver o site, abrir `index.html` no navegador ou rodar um servidor local.
- Ao final de cada etapa, listar o que falta preencher (textos, fotos, serviços, horários).

## Próximos passos
- [x] Dados de contato e identidade visual definidos
- [ ] Colocar o arquivo da logo em `imagens/`
- [ ] Definir lista de serviços, horário de atendimento e textos
- [ ] Reunir fotos (espaço, Vanessa e resultados autorizados)
- [ ] Criar a primeira versão do `index.html`
- [ ] Revisar no celular
- [ ] Publicar (ex.: Netlify, Vercel ou GitHub Pages) e conectar o domínio
