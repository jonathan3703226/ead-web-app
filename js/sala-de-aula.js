/* ==========================================================================
   LÓGICA E INTERATIVIDADES DA SALA DE AULA (NANKIM ART SCHOOL)
   ========================================================================== */

// 1. VERIFICAÇÃO OBRIGATÓRIA DE SESSÃO DA PLATAFORMA
const sessaoAtiva = sessionStorage.getItem('nankim_sessao');
if (!sessaoAtiva) {
    window.location.href = 'index.html';
}

// Estrutura de Dados Oficial do Curso
const CURSO_DATA = {
    id: 'fundamentos-desenho',
    titulo: 'Fundamentos do Desenho',
    modulos: [
        {
            id: 'm1',
            titulo: 'Módulo 1: Traço, Forma e Controle',
            pago: false, // Grátis para degustação
            aulas: [
                {
                    id: 'aula-1',
                    titulo: '1. Postura, Empunhadura e Aquecimento de Linhas',
                    duracao: '12 min',
                    youtubeId: 'L_LUpnjgPso',
                    descricao: 'Nesta aula introdutória, você aprenderá a postura correta para desenhar sem fadiga muscular, as diferentes empunhaduras de lápis e exercícios para soltar o traço.',
                    dica: 'Não apoie o pulso firmemente no papel. Faça movimentos fluidos partindo do cotovelo e ombro.',
                    exercicio: 'Desenhe 3 páginas completas de linhas paralelas, círculos concentricos e elipses.',
                    checklist: ['Soltar o traço usando o ombro', 'Preencher 3 folhas de aquecimento', 'Fotografar para feedback'],
                    materiais: [{ nome: 'Guia de Aquecimento (PDF)', tipo: 'pdf', url: '#' }]
                },
                {
                    id: 'aula-2',
                    titulo: '2. Desconstruindo o Mundo em Formas Básicas',
                    duracao: '18 min',
                    youtubeId: '7R08XyO8N_o',
                    descricao: 'Aprenda a enxergar objetos complexos através das formas primárias: quadrado, círculo e triângulo.',
                    dica: 'Ao olhar para qualquer objeto, pergunte-se: qual é a forma geométrica mais simples que o define?',
                    exercicio: 'Escolha 5 objetos do seu cotidiano e desenhe apenas suas formas geométricas base.',
                    checklist: ['Identificar formas estruturais', 'Manter traços leves', 'Não detalhar antes da hora'],
                    materiais: [{ nome: 'E-book: A Geometria na Arte (PDF)', tipo: 'pdf', url: '#' }]
                },
                {
                    id: 'aula-3',
                    titulo: '3. Medição Relativa e Proporções',
                    duracao: '15 min',
                    youtubeId: 'e2On_m3rR48',
                    descricao: 'Entenda como utilizar o próprio lápis como ferramenta de medição angular e proporcional.',
                    dica: 'Mantenha o braço totalmente esticado ao medir com o lápis.',
                    exercicio: 'Faça o desenho de um bodegão estático aplicando a técnica da medição.',
                    checklist: ['Usar a medição de braço esticado', 'Verificar ângulos e alinhamentos'],
                    materiais: [{ nome: 'Tabela de Proporções Básicas (PDF)', tipo: 'pdf', url: '#' }]
                }
            ]
        },
        {
            id: 'm2',
            titulo: 'Módulo 2: Volumetria, Luz e Sombra',
            pago: true, // Requer Matrícula Completa
            aulas: [
                {
                    id: 'aula-4',
                    titulo: '4. Transformando 2D em 3D: Cilíndros, Esferas e Cubos',
                    duracao: '22 min',
                    youtubeId: 'V3WmrQUEjk0',
                    descricao: 'Aprenda a dar tridimensionalidade aos seus desenhos aplicando linhas de contorno cruzado.',
                    dica: 'Linhas curvas envolvem a forma e revelam a orientação do objeto no espaço 3D.',
                    exercicio: 'Desenhe uma composição com 1 cubo, 1 esfera e 1 cilindro sobrepostos.',
                    checklist: ['Aplicar contornos cruzados', 'Garantir sobreposição correta'],
                    materiais: [{ nome: 'Pack de Referências 3D (ZIP)', tipo: 'zip', url: '#' }]
                },
                {
                    id: 'aula-5',
                    titulo: '5. A Física da Luz: Terminologia e Degradê',
                    duracao: '25 min',
                    youtubeId: 'vM39giW4P1A',
                    descricao: 'Entenda o comportamento da luz: luz direta, brilho máximo, sombra própria, penumbra e sombra projetada.',
                    dica: 'A luz refletida NUNCA é mais clara do que a área diretamente iluminada.',
                    exercicio: 'Desenhe uma esfera totalmente sombreada com lápis 2B e 6B.',
                    checklist: ['Mapear a fonte de luz', 'Criar transição suave de degradê'],
                    materiais: [{ nome: 'Guia Ilustrado de Luz (PDF)', tipo: 'pdf', url: '#' }]
                }
            ]
        },
        {
            id: 'm3',
            titulo: 'Módulo 3: Perspectiva e Espaço',
            pago: true, // Requer Matrícula Completa
            aulas: [
                {
                    id: 'aula-6',
                    titulo: '6. Perspectiva de 1 Ponto de Fuga',
                    duracao: '20 min',
                    youtubeId: 'xrAQToR_1vE',
                    descricao: 'Domine a linha do horizonte e o ponto de fuga para criar cenários com profundidade realista.',
                    dica: 'Todas as linhas convergentes se encontram no mesmo ponto de fuga.',
                    exercicio: 'Desenhe um quarto ou corredor em perspectiva de 1 ponto de fuga.',
                    checklist: ['Definir Linha do Horizonte', 'Convergir linhas de profundidade'],
                    materiais: [{ nome: 'Grid de Perspectiva 1PF (PNG)', tipo: 'image', url: '#' }]
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
        const usuario = db.find(u => u.email === userObj.email);
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
        try { aulasConcluidas = new Set(JSON.parse(savedConcluidas)); } catch (e) {}
    }

    const savedUltimaAula = localStorage.getItem('nankim_ultima_aula');
    if (savedUltimaAula) { aulaAtualId = savedUltimaAula; }

    const savedComentarios = localStorage.getItem('nankim_comentarios');
    if (savedComentarios) {
        try { comentariosPorAula = JSON.parse(savedComentarios); } catch (e) {}
    } else {
        comentariosPorAula = {
            'aula-1': [
                { autor: 'Marcos Silva', avatar: 'M', data: 'Há 2 dias', texto: 'Ajustando a posição do ombro a dor no pulso sumiu!' },
                { autor: 'Prof. Lucas (Nankim)', avatar: 'L', data: 'Há 1 dia', texto: 'Excelente Marcos! O controle deve vir do ombro.', oficial: true }
            ]
        };
    }
}

function salvarEstado() {
    localStorage.setItem('nankim_aulas_concluidas', JSON.stringify(Array.from(aulasConcluidas)));
    localStorage.setItem('nankim_ultima_aula', aulaAtualId);
    localStorage.setItem('nankim_comentarios', JSON.stringify(comentariosPorAula));
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
        iframe.src = `https://www.youtube.com/embed/${aula.youtubeId}?autoplay=1&rel=0`;
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
                        <i class="fa-solid ${mat.tipo === 'pdf' ? 'fa-file-pdf text-red-500' : 'fa-file-image text-blue-500'} text-lg"></i>
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
            <button onclick="toggleModuloAccordion('${modulo.id}')" class="w-full flex items-center justify-between p-3.5 text-left bg-zinc-900/80 hover:bg-zinc-800/80 transition-colors">
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
                        <a href="area-aluno.html" class="inline-block text-xs font-bold text-nankimGreen hover:underline">Assinar Agora por R$ 49,90</a>
                    </div>
                ` : aulasFiltradas.map(aula => {
                    const isAtiva = aula.id === aulaAtualId;
                    const isConclvida = aulasConcluidas.has(aula.id);

                    let statusIcon = '<i class="fa-regular fa-circle text-gray-600"></i>';
                    if (isConclvida) {
                        statusIcon = '<i class="fa-solid fa-circle-check text-nankimGreen"></i>';
                    } else if (isAtiva) {
                        statusIcon = '<i class="fa-solid fa-play text-red-500 text-[10px] animate-pulse"></i>';
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
        btn.className = "flex-1 md:flex-none inline-flex items-center justify-center gap-2 bg-nankimGreen text-white font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-lg transition-all cursor-pointer shadow-md";
        icon.className = "fa-solid fa-circle-check text-white text-base";
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
            <div class="w-8 h-8 rounded-full ${c.oficial ? 'bg-nankimGreen text-white' : 'bg-zinc-700 text-gray-200'} font-bold flex items-center justify-center text-xs flex-shrink-0">
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

    comentariosPorAula[aulaAtualId].unshift({
        autor: 'Você (Aluno)',
        avatar: 'A',
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

    // Abas
    const tabs = ['visao-geral', 'atividades', 'materiais', 'comentarios'];
    tabs.forEach(aba => {
        const btnTab = document.getElementById(`tab-${aba}`);
        if (btnTab) {
            btnTab.addEventListener('click', () => mudarAba(aba));
        }
    });
}