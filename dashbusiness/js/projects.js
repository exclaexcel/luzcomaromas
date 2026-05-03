/* ============================================================
   Dash Business — projects.js
   Fonte única de dados dos projetos.
   Usado por: index.html (destaques) e projetos/index.html (biblioteca)
   ============================================================ */

const DB_PROJECTS = [
  {
    id: 'sistema-gestao-clinica',
    title: 'Sistema Integrado de Gestão Clínica',
    description: 'Solução completa para gestão clínica — controle de pacientes, prontuários, faturamento e indicadores operacionais integrados.',
    category: 'controle-operacional',
    tags: ['Excel', 'Access', 'VBA'],
    image: 'assets/img/projetos/sistema-gestao-clinica.jpg',
    featured: true,
    status: 'available'
  },
  {
    id: 'sistema-agenda-consultas',
    title: 'Sistema de Agenda e Confirmação de Consultas',
    description: 'Automação completa da agenda médica com confirmação automática, controle de faltas e relatórios de ocupação.',
    category: 'automacao',
    tags: ['Excel', 'VBA'],
    image: 'assets/img/projetos/sistema-agenda-consultas.jpg',
    featured: true,
    status: 'available'
  }
];

const CATEGORY_LABELS = {
  'dashboards':              'Dashboard',
  'automacao':               'Automação',
  'analise-dados':           'Análise de Dados',
  'controle-operacional':    'Controle Operacional',
  'solucoes-personalizadas': 'Solução Personalizada'
};

/**
 * Renders project cards into a container element.
 * @param {string} containerId
 * @param {object} [opts]
 * @param {boolean}     [opts.featured=false]          render only featured projects
 * @param {string}      [opts.filter='all']             category filter
 * @param {number|null} [opts.limit=null]               max cards to render
 * @param {string}      [opts.contactUrl='#contato']    CTA destination
 * @param {string}      [opts.imgBase='']                base path for image URLs
 */
function renderProjectCards(containerId, opts) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const o = Object.assign(
    { featured: false, filter: 'all', limit: null, contactUrl: '#contato', imgBase: '' },
    opts
  );

  let list = DB_PROJECTS;
  if (o.featured)        list = list.filter(p => p.featured);
  if (o.filter !== 'all') list = list.filter(p => p.category === o.filter);
  if (o.limit)           list = list.slice(0, o.limit);

  container.innerHTML = list.map(p => _buildCardHTML(p, o.contactUrl, o.imgBase)).join('');

  _observeCards(container);
}

/**
 * Filters already-rendered cards by toggling the .hidden class.
 * @param {string} containerId
 * @param {string} category  'all' or a category key
 */
function filterProjectCards(containerId, category) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.querySelectorAll('.project-card[data-category]').forEach(function(card) {
    var show = category === 'all' || card.dataset.category === category;
    card.classList.toggle('hidden', !show);
  });
}

/* --- internals ------------------------------------------------ */

function _observeCards(container) {
  if (typeof IntersectionObserver === 'undefined') {
    container.querySelectorAll('.project-card').forEach(function(c) {
      c.classList.add('visible');
    });
    return;
  }
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        var siblings = Array.from(entry.target.parentElement.children);
        var delay    = siblings.indexOf(entry.target) * 80;
        setTimeout(function() { entry.target.classList.add('visible'); }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.10 });

  container.querySelectorAll('.project-card').forEach(function(c) {
    observer.observe(c);
  });
}

function _buildCardHTML(p, contactUrl, imgBase) {
  var typeLabel = CATEGORY_LABELS[p.category] || p.category;

  var tagsHtml = p.tags.map(function(tag) {
    var cls = p.status === 'confidential' ? 'card-ctx-tag confidential' : 'card-ctx-tag';
    return '<span class="' + cls + '">' + tag + '</span>';
  }).join('');

  var imgSrc = p.image ? (imgBase || '') + p.image : null;
  var thumbHtml = imgSrc
    ? '<img src="' + imgSrc + '" alt="' + p.title + '" loading="lazy">'
    : '<div class="project-card-thumb-placeholder">' + (p.emoji || '✦') + '</div>';

  return '<a class="project-card" href="' + contactUrl + '" data-category="' + p.category + '">'
    + '<div class="project-card-thumb">' + thumbHtml + '</div>'
    + '<div class="project-card-body">'
    +   '<span class="project-type">' + typeLabel + '</span>'
    +   '<h3>' + p.title + '</h3>'
    +   '<p>' + p.description + '</p>'
    +   '<div class="card-context">' + tagsHtml + '</div>'
    +   '<div class="project-arrow">Ver projeto →</div>'
    + '</div>'
    + '</a>';
}
