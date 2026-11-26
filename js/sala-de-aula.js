/* ==========================================================================
   LÓGICA E INTERATIVIDADES DA SALA DE AULA (NANKIM ART SCHOOL)
   Alinhada à grade oficial de Fundamentos do Desenho (3 Módulos · 12 Aulas)
   ========================================================================== */

// 1. VERIFICAÇÃO OBRIGATÓRIA DE SESSÃO DA PLATAFORMA
const sessaoAtiva = sessionStorage.getItem('nankim_sessao');
if (!sessaoAtiva) {
    window.location.href = 'index.html';
}

// Estrutura Oficial do Curso (idêntica a cursos.html)
const CURSO_DATA = {
    id: 'fundamentos-desenho',
    titulo: 'Fundamentos do Desenho',
    modulos: [
        {
            id: 'm1',
            titulo: 'Módulo I: Domínio do Traço e Figura Humana em Ação',
            pago: false, // Módulo I liberado gratuitamente na degustação
            aulas: [
                {
                    id: 'aula-1',
                    titulo: 'Aula 01 — Treinamento de Traço',
                    duracao: '1h de estudo e prática',
                    youtubeId: '-hkB80XpFpA',
                    descricao: 'Exercícios fundamentais de firmeza, precisão e controle da mão no papel para conquistar traços limpos, contínuos e seguros desde as primeiras linhas.',
                    dica: 'Evite apoiar o pulso travado no papel. Guie os traços longos usando o movimento fluido do ombro e do cotovelo.',
                    exercicio: 'Preencha 3 folhas A4 com sequências de linhas paralelas, curvas em S, círculos concêntricos e elipses sem usar régua.',
                    checklist: [
                        'Treinar linhas retas e paralelas em diferentes direções',
                        'Praticar círculos e elipses com traço contínuo',
                        'Manter a mão leve sem pressionar o grafite'
                    ],
                    materiais: [
                        { nome: 'Folha Guia de Aquecimento Motor (PDF)', tipo: 'pdf', url: '#' }
                    ]
                },
                {
                    id: 'aula-2',
                    titulo: 'Aula 02 — Estrutura e Esboço',
                    duracao: '1h de estudo e prática',
                    youtubeId: '36Y6DRcUtdo',
                    descricao: 'Aprenda a blocar formas básicas e construir o esboço estrutural de qualquer objeto ou personagem antes de partir para os detalhes finais.',
                    dica: 'Comece sempre pelas formas maiores e pela estrutura central. Detalhes só entram depois que a proporção estiver equilibrada.',
                    exercicio: 'Escolha 5 referências de objetos ou personagens e construa apenas a blocagem geométrica inicial com lápis HB.',
                    checklist: [
                        'Definir eixos de simetria e linha central',
                        'Blocar volumes principais com formas simples',
                        'Manter o esboço leve para facilitar ajustes'
                    ],
                    materiais: [
                        { nome: 'Guia de Blocagem e Formas Primárias (PDF)', tipo: 'pdf', url: '#' }
                    ]
                },
                {
                    id: 'aula-3',
                    titulo: 'Aula 03 — Corpo Musculoso e Proporção Heroica',
                    duracao: '1h de estudo e prática',
                    youtubeId: 'Gx9Otn0xXLU',
                    descricao: 'Construção anatômica estilizada de personagens de ação, entendendo o encaixe dos principais grupos musculares (tronco, ombros, braços e pernas) e a proporção heroica.',
                    dica: 'Pense nos músculos como blocos tridimensionais sobrepostos ao esqueleto, nunca como linhas soltas na silhueta.',
                    exercicio: 'Desenhe um personagem em pose frontal e três quartos aplicando a proporção de 8 cabeças e os blocos musculares principais.',
                    checklist: [
                        'Marcar a grade de proporção heroica',
                        'Encaixar caixa torácica, pelve e ombros',
                        'Definir volumes musculares com clareza'
                    ],
                    materiais: [
                        { nome: 'Mapa de Proporção Heroica (PDF)', tipo: 'pdf', url: '#' }
                    ]
                },
                {
                    id: 'aula-4',
                    titulo: 'Aula 04 — Corpo Humano em Movimento',
                    duracao: '1h de estudo e prática',
                    youtubeId: '9t0T9KIP1ok',
                    descricao: 'Como dar vida, peso e energia às poses utilizando linha de ação, contraposto, torção de tronco e equilíbrio dinâmico.',
                    dica: 'Se a linha de ação estiver rígida, toda a pose parecerá estática. Exagere a curva principal logo no primeiro rabisco.',
                    exercicio: 'Faça 6 estudos rápidos de poses dinâmicas (corrida, salto e golpe) priorizando a linha de ação e o equilíbrio.',
                    checklist: [
                        'Traçar a linha de ação antes da anatomia',
                        'Aplicar inclinação oposta entre ombros e quadril',
                        'Verificar centro de gravidade e apoio dos pés'
                    ],
                    materiais: [
                        { nome: 'Referências de Poses Dinâmicas (ZIP)', tipo: 'zip', url: '#' }
                    ]
                }
            ]
        },
        {
            id: 'm2',
            titulo: 'Módulo II: Criação de Personagens, Criaturas e Mundos',
            pago: true, // Requer Matrícula Completa
            aulas: [
                {
                    id: 'aula-5',
                    titulo: 'Aula 05 — Design de Criaturas (Dragão)',
                    duracao: '1h de estudo e prática',
                    youtubeId: 'EhWH-KQzt1s',
                    descricao: 'Anatomia fantástica aplicada à criação de criaturas: estrutura craniana, pescoço, asas, garras e distribuição natural de escamas em dragões.',
                    dica: 'Misture referências reais de répteis, aves de rapina e felinos para tornar criaturas fantásticas verossímeis.',
                    exercicio: 'Crie o concept completo de um dragão (cabeça em close e corpo inteiro) partindo do esqueleto estrutural.',
                    checklist: [
                        'Construir crânio, mandíbula e expressão do dragão',
                        'Estruturar envergadura das asas com articulações reais',
                        'Aplicar textura de escamas seguindo o volume'
                    ],
                    materiais: [
                        { nome: 'Guia Anatômico de Criaturas e Dragões (PDF)', tipo: 'pdf', url: '#' }
                    ]
                },
                {
                    id: 'aula-6',
                    titulo: 'Aula 06 — Transformando Personagens em Chibi',
                    duracao: '1h de estudo e prática',
                    youtubeId: 'tvqhebJsUKU',
                    descricao: 'Técnicas de estilização e síntese visual para adaptar qualquer personagem complexo para o estilo Chibi (2 a 3 cabeças) mantendo sua identidade e expressividade.',
                    dica: 'Simplifique detalhes pequenos das roupas e amplie olhos, cabeça e gestos para maximizar o carisma.',
                    exercicio: 'Escolha um personagem realista ou heroico e redesenhe-o na proporção Chibi de 2,5 cabeças.',
                    checklist: [
                        'Ajustar proporção para 2 a 3 cabeças',
                        'Preservar elementos-chave de reconhecimento do personagem',
                        'Exagerar expressões faciais e pose'
                    ],
                    materiais: [
                        { nome: 'Tabela de Proporções Chibi (PDF)', tipo: 'pdf', url: '#' }
                    ]
                },
                {
                    id: 'aula-7',
                    titulo: 'Aula 07 — Perspectiva em 3 Pontos de Fuga',
                    duracao: '1h de estudo e prática',
                    youtubeId: 'akkP7MYJXpQ',
                    descricao: 'Construção espacial avançada com 3 pontos de fuga para criar ângulos extremos (vista de cima e vista de baixo) com profundidade dramática.',
                    dica: 'O terceiro ponto de fuga controla a convergência vertical — quanto mais próximo da cena, maior a sensação de altura ou abismo.',
                    exercicio: 'Desenhe um conjunto de torres ou edifícios vistos de baixo para cima utilizando 3 pontos de fuga.',
                    checklist: [
                        'Posicionar Linha do Horizonte e os 3 pontos de fuga',
                        'Convergir todas as arestas verticais para o 3º ponto',
                        'Manter coerência de escala entre primeiro e segundo plano'
                    ],
                    materiais: [
                        { nome: 'Malha de Perspectiva 3 Pontos de Fuga (PNG)', tipo: 'image', url: '#' }
                    ]
                },
                {
                    id: 'aula-8',
                    titulo: 'Aula 08 — Construção de Cenário Medieval',
                    duracao: '1h de estudo e prática',
                    youtubeId: 'lxXHai3Y0Rs',
                    descricao: 'Ambientação, arquitetura histórica e composição de planos (primeiro plano, plano médio e fundo) na criação de um cenário medieval completo.',
                    dica: 'Separe claramente os três planos de profundidade usando espessura de linha e nível de detalhamento.',
                    exercicio: 'Construa uma cena de vila ou castelo medieval aplicando perspectiva, telhados, pedras e vegetação.',
                    checklist: [
                        'Dividir a cena em 3 planos de profundidade',
                        'Aplicar perspectiva nos elementos arquitetônicos',
                        'Adicionar elementos narrativos de ambientação'
                    ],
                    materiais: [
                        { nome: 'Pack de Arquitetura Medieval (ZIP)', tipo: 'zip', url: '#' }
                    ]
                }
            ]
        },
        {
            id: 'm3',
            titulo: 'Módulo III: Luz, Sombra, Arte-Final em Nanquim e Mercado',
            pago: true, // Requer Matrícula Completa
            aulas: [
                {
                    id: 'aula-9',
                    titulo: 'Aula 09 — Finalização com Caneta Nanquim',
                    duracao: '1h de estudo e prática',
                    youtubeId: '1WGaUz-fweM',
                    descricao: 'Técnicas profissionais de arte-final no papel: variação de peso de linha, contorno externo vs. interno, hachuras e acabamento limpo com caneta nanquim.',
                    dica: 'Use linhas mais grossas nas áreas de sombra e nas bordas externas para destacar o personagem do fundo.',
                    exercicio: 'Arte-finalize um dos seus desenhos dos módulos anteriores aplicando variação de espessura e hachuras.',
                    checklist: [
                        'Variar peso de linha entre luz e sombra',
                        'Aplicar hachuras seguindo a direção do volume',
                        'Aguardar secagem antes de apagar o grafite base'
                    ],
                    materiais: [
                        { nome: 'Guia de Hachuras e Peso de Linha (PDF)', tipo: 'pdf', url: '#' }
                    ]
                },
                {
                    id: 'aula-10',
                    titulo: 'Aula 10 — Luz e Sombra em Cenários',
                    duracao: '1h de estudo e prática',
                    youtubeId: 'j8blVerZTCs',
                    descricao: 'Definição de fonte luminosa direcional, leitura de valores tonais, contraste atmosférico e projeção de sombras em ambientes complexos.',
                    dica: 'Defina uma única fonte de luz principal antes de começar a sombrear para manter toda a cena coesa.',
                    exercicio: 'Aplique iluminação dramática (luz e sombra projetada) no cenário medieval criado no Módulo II.',
                    checklist: [
                        'Estabelecer direção única da fonte de luz',
                        'Separar áreas iluminadas, meios-tons e sombras',
                        'Criar contraste entre primeiro plano e fundo'
                    ],
                    materiais: [
                        { nome: 'Estudo de Valores Tonais em Cenários (PDF)', tipo: 'pdf', url: '#' }
                    ]
                },
                {
                    id: 'aula-11',
                    titulo: 'Aula 11 — Introdução à Colorização',
                    duracao: '1h de estudo e prática',
                    youtubeId: 'EYzzkSp0Jms',
                    descricao: 'Fundamentos de cor, temperatura (cores quentes e frias), harmonia cromática e aplicação prática para valorizar ilustrações arte-finalizadas.',
                    dica: 'Luz quente pede sombras mais frias (e vice-versa) — esse contraste dá vida imediata à pintura.',
                    exercicio: 'Colorize uma ilustração finalizada escolhendo uma paleta limitada de 3 a 4 cores harmônicas.',
                    checklist: [
                        'Definir paleta cromática antes de pintar',
                        'Aplicar cores base respeitando os valores de luz',
                        'Equilibrar temperatura entre luz e sombra'
                    ],
                    materiais: [
                        { nome: 'Roda Cromática e Paletas Prontas (PDF)', tipo: 'pdf', url: '#' }
                    ]
                },
                {
                    id: 'aula-12',
                    titulo: 'Aula 12 — Mentoria de Portfólio e Mercado',
                    duracao: '1h de estudo e prática',
                    youtubeId: 'DFo_WI6WmWY',
                    descricao: 'Como selecionar suas melhores peças, fotografar ou digitalizar seus desenhos com qualidade profissional, organizar seu portfólio e dar os primeiros passos no mercado criativo.',
                    dica: 'Qualidade vence quantidade: 6 a 8 peças bem finalizadas impressionam muito mais do que 30 rascunhos incompletos.',
                    exercicio: 'Selecione suas 5 melhores artes produzidas no curso, padronize a apresentação e monte a estrutura inicial do seu portfólio.',
                    checklist: [
                        'Selecionar de 5 a 8 trabalhos mais fortes',
                        'Digitalizar/fotografar com iluminação uniforme',
                        'Organizar apresentação com processo (esboço + arte-final)'
                    ],
                    materiais: [
                        { nome: 'Checklist de Portfólio Profissional (PDF)', tipo: 'pdf', url: '#' }
                    ]
                }
            ]
        }
    ]
};

let aulaAtualId = 'aula-1';
let aulasConcluidas = new Set();
let comentariosPorAula = {};
let usuarioMatriculado = false;

// 2. VERIFICAÇÃO DE MATRÍCULA NO BANCO LOCAL
function verificarMatriculaUsuario() {
    const sessao = sessionStorage.getItem('nankim_sessao');
    if (sessao) {
        const userObj = JSON.parse(sessao);
        const db = JSON.parse(localStorage.getItem('nankim_db')) || [];
        const usuario = db.find(u => String(u.email || '').toLowerCase() === String(userObj.email || '').toLowerCase());
        if (usuario && usuario.matriculado === true) {
            usuarioMatriculado = true;
        }
    }
}

// 3. CARREGAR ESTADO DE PROGRESSO E COMENTÁRIOS
function carregarEstado() {
    verificarMatriculaUsuario();

    const savedConcluidas = localStorage.getItem('nankim_aulas_concluidas');
    if (savedConcluidas) {
        try {
            aulasConcluidas = new Set(JSON.parse(savedConcluidas));
        } catch (e) {}
    }

    const savedUltimaAula = localStorage.getItem('nankim_ultima_aula');
    if (savedUltimaAula && obterAulaEModulo(savedUltimaAula)) {
        const dadosSalvos = obterAulaEModulo(savedUltimaAula);
        if (!dadosSalvos.modulo.pago || usuarioMatriculado) {
            aulaAtualId = savedUltimaAula;
        }
    }

    const savedComentarios = localStorage.getItem('nankim_comentarios');
    if (savedComentarios) {
        try {
            comentariosPorAula = JSON.parse(savedComentarios);
        } catch (e) {}
    } else {
        comentariosPorAula = {
            'aula-1': [
                { autor: 'Marcos Silva', avatar: 'M', data: 'Há 2 dias', texto: 'Ajustando o movimento pelo ombro meu traço ficou muito mais firme!' },
                { autor: 'Prof. Thiago Nankim', avatar: 'T', data: 'Há 1 dia', texto: 'Excelente Marcos! Esse controle motor é a base para todo o restante do curso.', oficial: true }
            ]
        };
    }
}

function sincronizarProgressoNoBanco() {
    const sessao = sessionStorage.getItem('nankim_sessao');
    if (!sessao) return;

    try {
        const userObj = JSON.parse(sessao);
        const db = JSON.parse(localStorage.getItem('nankim_db')) || [];
        const idx = db.findIndex(u => String(u.email || '').toLowerCase() === String(userObj.email || '').toLowerCase());
        if (idx === -1) return;

        let totalAulas = 0;
        CURSO_DATA.modulos.forEach(m => totalAulas += m.aulas.length);
        const porcentagem = totalAulas > 0 ? Math.round((aulasConcluidas.size / totalAulas) * 100) : 0;

        if (Array.isArray(db[idx].cursos) && db[idx].cursos.length > 0) {
            db[idx].cursos[0].progresso = porcentagem;
            db[idx].cursos[0].aulasConcluidas = Array.from(aulasConcluidas);
            db[idx].cursos[0].ultimaAula = aulaAtualId;
            localStorage.setItem('nankim_db', JSON.stringify(db));
        }
    } catch (e) {}
}

function salvarEstado() {
    localStorage.setItem('nankim_aulas_concluidas', JSON.stringify(Array.from(aulasConcluidas)));
    localStorage.setItem('nankim_ultima_aula', aulaAtualId);
    localStorage.setItem('nankim_comentarios', JSON.stringify(comentariosPorAula));
    sincronizarProgressoNoBanco();
}

// 4. INICIALIZAÇÃO DA PÁGINA
document.addEventListener('DOMContentLoaded', () => {
    carregarEstado();
    renderizarSidebarModulos();
    carregarAula(aulaAtualId);
    atualizarProgressoGeral();
    configurarEventosDOM();
});

// Helper para localização de dados da aula
function obterAulaEModulo(idAula) {
    for (const mod of CURSO_DATA.modulos) {
        const aula = mod.aulas.find(a => a.id === idAula);
        if (aula) return { aula, modulo: mod };
    }
    return null;
}

// 5. CARREGAMENTO DINÂMICO DE AULAS
function carregarAula(idAula) {
    const dados = obterAulaEModulo(idAula);
    if (!dados) return;

    const { aula, modulo } = dados;

    if (modulo.pago && !usuarioMatriculado) {
        alert('Este módulo é exclusivo para alunos matriculados no Curso Completo.');
        return;
    }

    aulaAtualId = idAula;
    salvarEstado();

    const iframe = document.getElementById('video-iframe');
    if (iframe) {
        iframe.src = `https://www.youtube.com/embed/${aula.youtubeId}?rel=0`;
    }

    const elemTitulo = document.getElementById('aula-titulo');
    const elemBadgeMod = document.getElementById('aula-modulo-badge');
    const elemBadgeDur = document.getElementById('aula-duracao-badge');
    const elemDesc = document.getElementById('aula-descricao');
    const elemDica = document.getElementById('aula-dica');
    const elemExercicio = document.getElementById('aula-exercicio-desc');
    const elemChecklist = document.getElementById('aula-checklist');

    if (elemTitulo) elemTitulo.innerText = aula.titulo;
    if (elemBadgeMod) elemBadgeMod.innerText = modulo.titulo.split(':')[0];
    if (elemBadgeDur) elemBadgeDur.innerHTML = `<i class="fa-regular fa-clock mr-1"></i>${aula.duracao}`;
    if (elemDesc) elemDesc.innerText = aula.descricao;
    if (elemDica) elemDica.innerText = aula.dica;
    if (elemExercicio) elemExercicio.innerText = aula.exercicio;

    if (elemChecklist) {
        elemChecklist.innerHTML = aula.checklist.map(item => `
            <li class="flex items-center gap-2.5">
                <i class="fa-regular fa-circle-check text-nankimGreen"></i> ${item}
            </li>
        `).join('');
    }

    const materiaisContainer = document.getElementById('aula-materiais-lista');
    if (materiaisContainer) {
        if (aula.materiais && aula.materiais.length > 0) {
            materiaisContainer.innerHTML = aula.materiais.map(mat => `
                <a href="${mat.url}" onclick="event.preventDefault(); alert('Download iniciado: ${mat.nome}');" class="flex items-center justify-between p-3 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-nankimGreen transition-all group">
                    <div class="flex items-center gap-3">
                        <i class="fa-solid ${mat.tipo === 'pdf' ? 'fa-file-pdf text-red-500' : mat.tipo === 'zip' ? 'fa-file-zipper text-amber-400' : 'fa-file-image text-blue-500'} text-lg"></i>
                        <span class="text-xs sm:text-sm font-semibold text-gray-200 group-hover:text-white">${mat.nome}</span>
                    </div>
                    <i class="fa-solid fa-download text-xs text-gray-500 group-hover:text-nankimGreen"></i>
                </a>
            `).join('');
        } else {
            materiaisContainer.innerHTML = `<p class="text-xs text-gray-500 italic">Nenhum arquivo complementar para esta aula.</p>`;
        }
    }

    atualizarBotaoConcluir();
    atualizarBotoesNavegacao();
    renderizarSidebarModulos();
    renderizarComentarios();
}

// 6. RENDERIZAÇÃO DA SIDEBAR LATERAL
function renderizarSidebarModulos(filtro = '') {
    const container = document.getElementById('container-modulos');
    if (!container) return;

    container.innerHTML = '';
    let totalAulas = 0;
    const query = filtro.toLowerCase().trim();

    CURSO_DATA.modulos.forEach((modulo) => {
        totalAulas += modulo.aulas.length;

        const estaBloqueado = modulo.pago && !usuarioMatriculado;
        const aulasFiltradas = modulo.aulas.filter(a => 
            a.titulo.toLowerCase().includes(query) || a.descricao.toLowerCase().includes(query)
        );

        if (query !== '' && aulasFiltradas.length === 0) return;

        const contemAulaAtiva = modulo.aulas.some(a => a.id === aulaAtualId);
        const estaExpandido = query !== '' || contemAulaAtiva;

        const moduloDiv = document.createElement('div');
        moduloDiv.className = 'border border-zinc-800/80 rounded-xl overflow-hidden bg-zinc-900/40';

        moduloDiv.innerHTML = `
            <button type="button" onclick="toggleModuloAccordion('${modulo.id}')" class="w-full flex items-center justify-between p-3.5 text-left bg-zinc-900/80 hover:bg-zinc-800/80 transition-colors">
                <div class="flex items-center gap-2.5">
                    <i id="icon-chevron-${modulo.id}" class="fa-solid fa-chevron-right text-xs text-gray-400 transition-transform ${estaExpandido ? 'rotate-90' : ''}"></i>
                    <span class="text-xs font-bold ${estaBloqueado ? 'text-gray-500' : 'text-gray-200'}">${modulo.titulo} ${estaBloqueado ? '🔒' : ''}</span>
                </div>
                <span class="text-[10px] font-bold text-gray-500 bg-black/40 px-2 py-0.5 rounded-full border border-zinc-800">
                    ${estaBloqueado ? 'Bloqueado' : `${modulo.aulas.filter(a => aulasConcluidas.has(a.id)).length}/${modulo.aulas.length}`}
                </span>
            </button>
            <div id="content-${modulo.id}" class="accordion-content ${estaExpandido ? '' : 'collapsed'} divide-y divide-zinc-800/50 bg-black/30">
                ${estaBloqueado ? `
                    <div class="p-4 text-center">
                        <p class="text-xs text-gray-400 mb-2">Conteúdo exclusivo para assinantes do Curso Completo.</p>
                        <a href="cursos.html#curso-fundamentos" class="inline-block text-xs font-bold text-nankimGreen hover:underline">Desbloquear Curso Completo</a>
                    </div>
                ` : aulasFiltradas.map(aula => {
                    const isAtiva = aula.id === aulaAtualId;
                    const isConclvida = aulasConcluidas.has(aula.id);

                    let statusIcon = '<i class="fa-regular fa-circle text-gray-600"></i>';
                    if (isConclvida) {
                        statusIcon = '<i class="fa-solid fa-circle-check text-nankimGreen"></i>';
                    } else if (isAtiva) {
                        statusIcon = '<i class="fa-solid fa-play text-amber-400 text-[10px] animate-pulse"></i>';
                    }

                    return `
                        <div onclick="carregarAula('${aula.id}')" class="p-3 flex items-center justify-between gap-3 cursor-pointer transition-all ${isAtiva ? 'bg-nankimGreen/10 border-l-4 border-nankimGreen pl-2.5' : 'hover:bg-zinc-900/60'}">
                            <div class="flex items-center gap-3">
                                <div class="w-4 flex items-center justify-center">${statusIcon}</div>
                                <div class="flex flex-col">
                                    <span class="text-xs font-medium ${isAtiva ? 'text-white font-bold' : 'text-gray-300'} line-clamp-1">${aula.titulo}</span>
                                    <span class="text-[10px] text-gray-500">${aula.duracao}</span>
                                </div>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;

        container.appendChild(moduloDiv);
    });

    const elemCount = document.getElementById('aulas-concluidas-count');
    if (elemCount) elemCount.innerText = `${aulasConcluidas.size}/${totalAulas} Aulas`;
}

function toggleModuloAccordion(modId) {
    const content = document.getElementById(`content-${modId}`);
    const chevron = document.getElementById(`icon-chevron-${modId}`);
    if (content) {
        content.classList.toggle('collapsed');
        if (chevron) chevron.classList.toggle('rotate-90');
    }
}

function todasAsAulasDisponiveis() {
    const lista = [];
    CURSO_DATA.modulos.forEach(m => {
        if (!m.pago || usuarioMatriculado) {
            m.aulas.forEach(a => lista.push(a));
        }
    });
    return lista;
}

function atualizarBotoesNavegacao() {
    const lista = todasAsAulasDisponiveis();
    const idx = lista.findIndex(a => a.id === aulaAtualId);
    const btnAnt = document.getElementById('btn-anterior');
    const btnProx = document.getElementById('btn-proxima');

    if (btnAnt) btnAnt.disabled = (idx <= 0);
    if (btnProx) btnProx.disabled = (idx >= lista.length - 1 || idx === -1);
}

function navegarAula(direcao) {
    const lista = todasAsAulasDisponiveis();
    const idx = lista.findIndex(a => a.id === aulaAtualId);
    const novoIdx = idx + direcao;

    if (novoIdx >= 0 && novoIdx < lista.length) {
        carregarAula(lista[novoIdx].id);
    }
}

function toggleAulaConcluida() {
    if (aulasConcluidas.has(aulaAtualId)) {
        aulasConcluidas.delete(aulaAtualId);
    } else {
        aulasConcluidas.add(aulaAtualId);
    }
    salvarEstado();
    atualizarBotaoConcluir();
    atualizarProgressoGeral();
    renderizarSidebarModulos();
}

function atualizarBotaoConcluir() {
    const isConclvida = aulasConcluidas.has(aulaAtualId);
    const btn = document.getElementById('btn-concluir');
    const icon = document.getElementById('btn-concluir-icon');
    const texto = document.getElementById('btn-concluir-texto');

    if (!btn || !icon || !texto) return;

    if (isConclvida) {
        btn.className = "flex-1 md:flex-none inline-flex items-center justify-center gap-2 bg-nankimGreen text-zinc-950 font-extrabold text-xs sm:text-sm px-4 py-2.5 rounded-lg transition-all cursor-pointer shadow-md";
        icon.className = "fa-solid fa-circle-check text-zinc-950 text-base";
        texto.innerText = "Aula Concluída";
    } else {
        btn.className = "flex-1 md:flex-none inline-flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-lg border border-zinc-700 transition-all cursor-pointer";
        icon.className = "fa-regular fa-circle text-nankimGreen text-base";
        texto.innerText = "Marcar como Concluída";
    }
}

function atualizarProgressoGeral() {
    let totalAulas = 0;
    CURSO_DATA.modulos.forEach(m => totalAulas += m.aulas.length);
    const concluidasCount = aulasConcluidas.size;
    const porcentagem = totalAulas > 0 ? Math.round((concluidasCount / totalAulas) * 100) : 0;

    const elemText = document.getElementById('header-percent-text');
    const elemBar = document.getElementById('header-progress-bar');

    if (elemText) elemText.innerText = `${porcentagem}%`;
    if (elemBar) elemBar.style.width = `${porcentagem}%`;
}

function mudarAba(abaId) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    
    const elemConteudo = document.getElementById(`conteudo-${abaId}`);
    const elemTab = document.getElementById(`tab-${abaId}`);

    if (elemConteudo) elemConteudo.classList.remove('hidden');
    if (elemTab) elemTab.classList.add('active');
}

function renderizarComentarios() {
    const container = document.getElementById('lista-comentarios');
    if (!container) return;

    const lista = comentariosPorAula[aulaAtualId] || [];

    if (lista.length === 0) {
        container.innerHTML = `<p class="text-xs text-gray-500 italic">Nenhum comentário publicado ainda nesta aula.</p>`;
        return;
    }

    container.innerHTML = lista.map(c => `
        <div class="flex gap-3 p-3.5 rounded-xl bg-zinc-900/70 border border-zinc-800/80">
            <div class="w-8 h-8 rounded-full ${c.oficial ? 'bg-nankimGreen text-zinc-950' : 'bg-zinc-700 text-gray-200'} font-bold flex items-center justify-center text-xs flex-shrink-0">
                ${c.avatar}
            </div>
            <div class="flex flex-col gap-1 w-full">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                        <span class="text-xs font-bold text-white">${c.autor}</span>
                        ${c.oficial ? '<span class="bg-nankimGreen/20 text-nankimGreen text-[9px] font-bold px-1.5 py-0.5 rounded border border-nankimGreen/30">Instrutor</span>' : ''}
                    </div>
                    <span class="text-[10px] text-gray-500">${c.data}</span>
                </div>
                <p class="text-xs sm:text-sm text-gray-300 mt-0.5">${c.texto}</p>
            </div>
        </div>
    `).join('');
}

function adicionarComentario() {
    const txtInput = document.getElementById('input-comentario');
    if (!txtInput) return;

    const texto = txtInput.value.trim();
    if (!texto) return;

    if (!comentariosPorAula[aulaAtualId]) {
        comentariosPorAula[aulaAtualId] = [];
    }

    let nomeAutor = 'Você (Aluno)';
    let inicial = 'A';
    try {
        const s = JSON.parse(sessionStorage.getItem('nankim_sessao'));
        if (s && s.nome) {
            nomeAutor = s.nome;
            inicial = s.nome.charAt(0).toUpperCase();
        }
    } catch (e) {}

    comentariosPorAula[aulaAtualId].unshift({
        autor: nomeAutor,
        avatar: inicial,
        data: 'Agora mesmo',
        texto: texto
    });

    salvarEstado();
    txtInput.value = '';
    renderizarComentarios();
}

// 7. EVENTOS DOS BOTÕES E ELEMENTOS INTERATIVOS DA DOM
function configurarEventosDOM() {
    const btnVoltar = document.getElementById('btn-voltar-painel');
    if (btnVoltar) {
        btnVoltar.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'area-aluno.html';
        });
    }

    const btnConcluir = document.getElementById('btn-concluir');
    if (btnConcluir) {
        btnConcluir.addEventListener('click', toggleAulaConcluida);
    }

    const btnAnterior = document.getElementById('btn-anterior');
    if (btnAnterior) {
        btnAnterior.addEventListener('click', () => navegarAula(-1));
    }

    const btnProxima = document.getElementById('btn-proxima');
    if (btnProxima) {
        btnProxima.addEventListener('click', () => navegarAula(1));
    }

    const btnPublicar = document.getElementById('btn-publicar-comentario');
    if (btnPublicar) {
        btnPublicar.addEventListener('click', adicionarComentario);
    }

    const inputBusca = document.getElementById('input-busca');
    if (inputBusca) {
        inputBusca.addEventListener('input', (e) => renderizarSidebarModulos(e.target.value));
    }

    const tabs = ['visao-geral', 'atividades', 'materiais', 'comentarios'];
    tabs.forEach(aba => {
        const btnTab = document.getElementById(`tab-${aba}`);
        if (btnTab) {
            btnTab.addEventListener('click', () => mudarAba(aba));
        }
    });
}