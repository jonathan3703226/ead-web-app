/* ==========================================================================
   ADMIN.JS - Lógica do Backoffice Administrativo (Nankim Escola de Arte)
   ========================================================================== */

const ADMIN_EMAIL_PADRAO = 'admin@nankim.com.br';
const CHAVE_CMS_SIMULADOR = 'nankim_admin_cms_simulador';
const CHAVE_RASCUNHO_CURSO = 'nankim_rascunho_cms_curso';
const CHAVE_RASCUNHO_MODULO = 'nankim_rascunho_cms_modulo';
const CHAVE_RASCUNHO_AULA = 'nankim_rascunho_cms_aula';

// 1. Guarda de Rota: bloqueia acesso direto sem sessão de administrador
(function protegerRotaAdmin() {
    let sessao = null;
    try {
        sessao = JSON.parse(sessionStorage.getItem('nankim_sessao'));
    } catch (_) {}

    const db = JSON.parse(localStorage.getItem('nankim_db')) || [];
    const contaBanco = sessao
        ? db.find((u) => String(u.email || '').toLowerCase() === String(sessao.email || '').toLowerCase())
        : null;

    const ehAdmin =
        sessao &&
        sessao.logado === true &&
        (sessao.role === 'admin' ||
            contaBanco?.role === 'admin' ||
            String(sessao.email || '').toLowerCase() === ADMIN_EMAIL_PADRAO);

    if (!ehAdmin) {
        window.location.href = 'index.html';
    }
})();

const CATALOGO_AULAS_ADMIN = [
    { id: 'aula-1', titulo: 'Aula 01 — Treinamento de Traço' },
    { id: 'aula-2', titulo: 'Aula 02 — Estrutura e Esboço' },
    { id: 'aula-3', titulo: 'Aula 03 — Corpo Musculoso e Proporção Heroica' },
    { id: 'aula-4', titulo: 'Aula 04 — Corpo Humano em Movimento' },
    { id: 'aula-5', titulo: 'Aula 05 — Design de Criaturas (Dragão)' },
    { id: 'aula-6', titulo: 'Aula 06 — Transformando Personagens em Chibi' },
    { id: 'aula-7', titulo: 'Aula 07 — Perspectiva em 3 Pontos de Fuga' },
    { id: 'aula-8', titulo: 'Aula 08 — Construção de Cenário Medieval' },
    { id: 'aula-9', titulo: 'Aula 09 — Finalização com Caneta Nanquim' },
    { id: 'aula-10', titulo: 'Aula 10 — Luz e Sombra em Cenários' },
    { id: 'aula-11', titulo: 'Aula 11 — Introdução à Colorização' },
    { id: 'aula-12', titulo: 'Aula 12 — Mentoria de Portfólio e Mercado' }
];

// Estado inicial do Simulador CMS
function obterDadosIniciaisCMS() {
    return [
        {
            id: 'curso-fundamentos',
            titulo: 'Fundamentos do Desenho',
            descricao: 'Formação essencial da Nankim Escola de Arte: 3 módulos intensivos e 100% práticos que levam você do controle de traço até a arte-final em nanquim e montagem de portfólio.',
            cargaHoraria: '12 horas',
            preco: '12x R$ 39,90 (Anual)',
            status: 'disponivel',
            capa: 'fundamentos-desenho.jpg',
            modulos: [
                {
                    id: 'mod-1',
                    titulo: 'Módulo I — Domínio do Traço e Figura Humana em Ação',
                    acesso: 'gratis',
                    carga: '4 horas',
                    aulas: [
                        { id: 'a-1', titulo: 'Aula 01 — Treinamento de Traço', youtube: 'https://www.youtube.com/watch?v=nankim01', pdf: 'guia-traco.pdf', resumo: 'Exercícios fundamentais de firmeza e controle da mão no papel.', exercicio: 'Preencher 3 folhas A4 com linhas paralelas, elipses e hachuras.', checklist: ['Completar prancha de linhas paralelas', 'Executar 30 círculos e elipses'] },
                        { id: 'a-2', titulo: 'Aula 02 — Estrutura e Esboço', youtube: 'https://www.youtube.com/watch?v=nankim02', pdf: 'esboco-estrutural.pdf', resumo: 'Blocagem de formas geométricas básicas antes dos detalhes.', exercicio: 'Construir 5 objetos do cotidiano usando caixas e cilindros.', checklist: ['Traçar linha central e eixos', 'Construir volumes com cilindros e caixas'] },
                        { id: 'a-3', titulo: 'Aula 03 — Corpo Musculoso e Proporção Heroica', youtube: 'https://www.youtube.com/watch?v=nankim03', pdf: 'anatomia-heroica.pdf', resumo: 'Construção anatômica estilizada de personagens de ação.', exercicio: 'Desenhar manequim heroico em vista frontal e 3/4.', checklist: ['Dividir grade de 8 cabeças', 'Posicionar principais grupos musculares'] },
                        { id: 'a-4', titulo: 'Aula 04 — Corpo Humano em Movimento', youtube: 'https://www.youtube.com/watch?v=nankim04', pdf: 'linha-de-acao.pdf', resumo: 'Linha de ação, equilíbrio e poses dinâmicas.', exercicio: 'Esboçar 6 poses dinâmicas em gestual rápido.', checklist: ['Iniciar todas as 6 poses pela linha de ação', 'Aplicar contraposto entre ombros e quadril'] }
                    ]
                },
                {
                    id: 'mod-2',
                    titulo: 'Módulo II — Criação de Personagens, Criaturas e Mundos',
                    acesso: 'completo',
                    carga: '4 horas',
                    aulas: [
                        { id: 'a-5', titulo: 'Aula 05 — Design de Criaturas (Dragão)', youtube: 'https://www.youtube.com/watch?v=nankim05', pdf: 'design-dragao.pdf', resumo: 'Anatomia fantástica, estrutura de cabeça e proporção de dragões.', exercicio: 'Criar busto de dragão aplicando estrutura óssea e escamas.', checklist: ['Estruturar crânio e mandíbula', 'Desenhar articulações das asas'] },
                        { id: 'a-6', titulo: 'Aula 06 — Transformando Personagens em Chibi', youtube: 'https://www.youtube.com/watch?v=nankim06', pdf: 'guia-chibi.pdf', resumo: 'Adaptação de traços e proporções reduzidas no estilo chibi.', exercicio: 'Converter um personagem realista para proporção 2 cabeças.', checklist: ['Respeitar proporção de 2,5 cabeças'] },
                        { id: 'a-7', titulo: 'Aula 07 — Perspectiva em 3 Pontos de Fuga', youtube: 'https://www.youtube.com/watch?v=nankim07', pdf: 'perspectiva-3pf.pdf', resumo: 'Profundidade dramática e ângulos extremos.', exercicio: 'Desenhar torre medieval vista de baixo para cima.', checklist: ['Marcar Linha do Horizonte e 3 pontos de fuga'] },
                        { id: 'a-8', titulo: 'Aula 08 — Construção de Cenário Medieval', youtube: 'https://www.youtube.com/watch?v=nankim08', pdf: 'cenario-medieval.pdf', resumo: 'Ambientação, arquitetura e composição de planos.', exercicio: 'Compor cenário com primeiro plano, plano médio e fundo.', checklist: ['Separar primeiro plano, plano médio e fundo'] }
                    ]
                },
                {
                    id: 'mod-3',
                    titulo: 'Módulo III — Luz, Sombra, Arte-Final em Nanquim e Mercado',
                    acesso: 'completo',
                    carga: '4 horas',
                    aulas: [
                        { id: 'a-9', titulo: 'Aula 09 — Finalização com Caneta Nanquim', youtube: 'https://www.youtube.com/watch?v=nankim09', pdf: 'tecnicas-nanquim.pdf', resumo: 'Peso de linha, hachuras e acabamento limpo.', exercicio: 'Arte-finalizar um esboço aplicando variação de espessura.', checklist: ['Variar espessura de linha nas sombras'] },
                        { id: 'a-10', titulo: 'Aula 10 — Luz e Sombra em Cenários', youtube: 'https://www.youtube.com/watch?v=nankim10', pdf: 'luz-sombra.pdf', resumo: 'Definição de fonte luminosa, contraste e volume atmosférico.', exercicio: 'Aplicar blocos de sombra projetada no cenário da Aula 08.', checklist: ['Definir direção única da fonte de luz'] },
                        { id: 'a-11', titulo: 'Aula 11 — Introdução à Colorização', youtube: 'https://www.youtube.com/watch?v=nankim11', pdf: 'teoria-cores.pdf', resumo: 'Harmonia cromática e valorização do desenho finalizado.', exercicio: 'Colorir ilustração usando paleta complementar.', checklist: ['Montar paleta limitada de 3 a 4 cores'] },
                        { id: 'a-12', titulo: 'Aula 12 — Mentoria de Portfólio e Mercado', youtube: 'https://www.youtube.com/watch?v=nankim12', pdf: 'checklist-portfolio.pdf', resumo: 'Como selecionar, organizar e apresentar trabalhos para clientes.', exercicio: 'Montar seleção final com 6 peças estruturadas.', checklist: ['Selecionar as 5 melhores ilustrações finais'] }
                    ]
                }
            ]
        },
        {
            id: 'curso-anatomia',
            titulo: 'Anatomia & Movimento',
            descricao: 'Proporções do corpo humano, estrutura esquelética, grupos musculares e dinamismo para dar vida aos seus personagens.',
            cargaHoraria: '16 horas',
            preco: 'Em definição',
            status: 'em-breve',
            capa: 'anatomia-humana.jpg',
            modulos: []
        },
        {
            id: 'curso-especializacao',
            titulo: 'Especialização & Mercado',
            descricao: 'Pintura digital, teoria das cores e acabamento profissional para montar seu portfólio e atuar no mercado criativo.',
            cargaHoraria: '20 horas',
            preco: 'Em definição',
            status: 'em-breve',
            capa: 'ilustracao-digital.jpg',
            modulos: []
        }
    ];
}

function obterCursosCMS() {
    try {
        const salvo = JSON.parse(localStorage.getItem(CHAVE_CMS_SIMULADOR));
        if (Array.isArray(salvo) && salvo.length > 0) return salvo;
    } catch (_) {}
    const inicial = obterDadosIniciaisCMS();
    localStorage.setItem(CHAVE_CMS_SIMULADOR, JSON.stringify(inicial));
    return inicial;
}

function salvarCursosCMS(cursos) {
    localStorage.setItem(CHAVE_CMS_SIMULADOR, JSON.stringify(cursos));
    renderizarCursosCMS();
}

// ==========================================================================
// TOAST DE FEEDBACK VISUAL
// ==========================================================================
function exibirToastAdmin(mensagem) {
    const container = document.getElementById('admin-toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'admin-toast';
    toast.innerHTML = `<i class="fa-solid fa-circle-check"></i><span>${mensagem}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.25s ease';
        setTimeout(() => toast.remove(), 260);
    }, 3200);
}

// Garante que toda pergunta e resposta tenham IDs únicos para evitar duplicação
function normalizarIdsComentarios() {
    try {
        const comentariosObj = JSON.parse(localStorage.getItem('nankim_comentarios')) || {};
        let alterou = false;

        Object.keys(comentariosObj).forEach((aulaId) => {
            const lista = comentariosObj[aulaId];
            if (!Array.isArray(lista)) return;

            // Remove eventual comentário fictício legado
            const filtrado = lista.filter(
                (c) => String(c.autor || '').trim().toLowerCase() !== 'marcos silva'
            );
            if (filtrado.length !== lista.length) alterou = true;

            filtrado.forEach((item, i) => {
                if (!item.id) {
                    item.id = `msg-${aulaId}-${Date.now()}-${i}-${Math.random().toString(36).slice(2, 6)}`;
                    alterou = true;
                }
            });

            comentariosObj[aulaId] = filtrado;
        });

        if (alterou) {
            localStorage.setItem('nankim_comentarios', JSON.stringify(comentariosObj));
        }
    } catch (_) {}
}

document.addEventListener('DOMContentLoaded', () => {
    try {
        const sessao = JSON.parse(sessionStorage.getItem('nankim_sessao'));
        const elName = document.getElementById('admin-logged-name');
        if (elName && sessao?.nome) {
            elName.textContent = sessao.nome;
        }
    } catch (_) {}

    normalizarIdsComentarios();
    configurarModalConfirmacao();
    configurarEventosAdmin();
    configurarEventosCMS();
    atualizarPainelCompleto();
});

// ==========================================================================
// MODAL DE CONFIRMAÇÃO CUSTOMIZADO (SUBSTITUI CONFIRM NATIVO)
// ==========================================================================
let acaoConfirmacaoPendente = null;

function configurarModalConfirmacao() {
    const modal = document.getElementById('modal-admin-confirm');
    const btnCancelar = document.getElementById('btn-confirm-cancelar');
    const btnExecutar = document.getElementById('btn-confirm-executar');

    btnCancelar?.addEventListener('click', () => {
        acaoConfirmacaoPendente = null;
        modal?.classList.remove('aberto');
    });

    btnExecutar?.addEventListener('click', () => {
        if (typeof acaoConfirmacaoPendente === 'function') {
            acaoConfirmacaoPendente();
        }
        acaoConfirmacaoPendente = null;
        modal?.classList.remove('aberto');
    });

    modal?.addEventListener('click', (e) => {
        if (e.target === modal) {
            acaoConfirmacaoPendente = null;
            modal.classList.remove('aberto');
        }
    });
}

function solicitarConfirmacaoAdmin({ titulo, mensagem, textoBotao = 'Sim, excluir', onConfirm }) {
    document.getElementById('confirm-modal-titulo').textContent = titulo;
    document.getElementById('confirm-modal-mensagem').textContent = mensagem;
    document.getElementById('btn-confirm-executar').textContent = textoBotao;
    acaoConfirmacaoPendente = onConfirm;
    document.getElementById('modal-admin-confirm')?.classList.add('aberto');
}

function configurarEventosAdmin() {
    document.getElementById('btn-admin-sair')?.addEventListener('click', () => {
        sessionStorage.removeItem('nankim_sessao');
        window.location.href = 'index.html';
    });

    document.querySelectorAll('.admin-nav-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            selecionarAbaAdmin(btn.getAttribute('data-tab'));
        });
    });

    document.querySelectorAll('[data-jump]').forEach((btn) => {
        btn.addEventListener('click', () => {
            selecionarAbaAdmin(btn.getAttribute('data-jump'));
        });
    });

    document.getElementById('filtro-alunos')?.addEventListener('input', renderizarTabelaAlunos);
    document.getElementById('filtro-aula-duvidas')?.addEventListener('change', renderizarDuvidasAdmin);
    document.getElementById('filtro-status-reportes')?.addEventListener('change', renderizarReportesAdmin);

    const selectAulas = document.getElementById('filtro-aula-duvidas');
    if (selectAulas) {
        CATALOGO_AULAS_ADMIN.forEach((a) => {
            const opt = document.createElement('option');
            opt.value = a.id;
            opt.textContent = a.titulo;
            selectAulas.appendChild(opt);
        });
    }
}

function selecionarAbaAdmin(tabId) {
    const titulos = {
        'visao-geral': ['Visão Geral da Escola', 'Acompanhe matrículas, progresso dos alunos e suporte técnico em tempo real.'],
        'alunos': ['Alunos & Matrículas', 'Gerencie planos ativos, libere cursos completos e controle certificados.'],
        'duvidas': ['Dúvidas & Fórum', 'Responda dúvidas públicas ou privadas diretamente como instrutor oficial.'],
        'reportes': ['Reportes de Erro', 'Monitore e resolva problemas técnicos reportados na sala de aula.'],
        'cursos': ['Cursos & Conteúdo', 'Simulador completo de criação e edição de cursos, módulos, vídeos e materiais.']
    };

    document.querySelectorAll('.admin-nav-btn').forEach((b) => {
        b.classList.toggle('active', b.getAttribute('data-tab') === tabId);
    });

    document.querySelectorAll('.admin-tab-section').forEach((sec) => {
        sec.classList.toggle('hidden', sec.id !== `sec-${tabId}`);
    });

    const info = titulos[tabId];
    if (info) {
        document.getElementById('admin-page-title').textContent = info[0];
        document.getElementById('admin-page-subtitle').textContent = info[1];
    }
}

function atualizarPainelCompleto() {
    normalizarIdsComentarios();
    renderizarKPIs();
    renderizarTabelaAlunos();
    renderizarDuvidasAdmin();
    renderizarReportesAdmin();
    renderizarCursosCMS();
}

// ==========================================================================
// DISPARO DE NOTIFICAÇÕES INTEGRADO AO MENU-ALUNO.JS
// ==========================================================================
function registrarNotificacaoParaAluno({ email, nome, id, titulo, mensagem, link = '', aulaId = '', acaoTexto = '' }) {
    const db = JSON.parse(localStorage.getItem('nankim_db')) || [];
    const aluno = db.find((u) =>
        (email && String(u.email || '').toLowerCase() === String(email).toLowerCase()) ||
        (nome && String(u.nome || '').toLowerCase().includes(String(nome).toLowerCase()))
    );

    if (!aluno || !aluno.email) return;

    const chaveNotif = `nankim_notificacoes_${String(aluno.email).toLowerCase().trim()}`;
    let lista = [];
    try {
        lista = JSON.parse(localStorage.getItem(chaveNotif)) || [];
    } catch (_) {
        lista = [];
    }

    if (id) {
        lista = lista.filter((n) => n.id !== id);
    }

    lista.unshift({
        id: id || `notif-admin-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        titulo,
        mensagem,
        link,
        aulaId,
        acaoTexto,
        data: new Date().toISOString(),
        lida: false
    });

    localStorage.setItem(chaveNotif, JSON.stringify(lista.slice(0, 25)));
}

// ==========================================================================
// 1. KPIS E RESUMOS
// ==========================================================================
function obterAlunosSomente() {
    const db = JSON.parse(localStorage.getItem('nankim_db')) || [];
    return db.filter((u) => u.role !== 'admin' && String(u.email || '').toLowerCase() !== ADMIN_EMAIL_PADRAO);
}

function renderizarKPIs() {
    const alunos = obterAlunosSomente();
    const pagantes = alunos.filter((a) => a.matriculado === true).length;
    const certificados = alunos.filter((a) => a.certificadoLiberado === true).length;

    const comentariosObj = JSON.parse(localStorage.getItem('nankim_comentarios')) || {};
    const totalPerguntas = Object.values(comentariosObj).reduce(
        (acc, lista) => acc + (Array.isArray(lista) ? lista.filter((c) => !c.oficial).length : 0),
        0
    );

    const reportes = JSON.parse(localStorage.getItem('nankim_reportes')) || [];
    const reportesAbertos = reportes.filter((r) => r.status !== 'resolvido').length;

    document.getElementById('kpi-alunos-total').textContent = alunos.length;
    document.getElementById('kpi-alunos-pagos').textContent = pagantes;
    document.getElementById('kpi-certificados').textContent = certificados;
    document.getElementById('kpi-reportes-abertos').textContent = reportesAbertos;

    document.getElementById('badge-total-alunos').textContent = alunos.length;
    document.getElementById('badge-total-duvidas').textContent = totalPerguntas;
    document.getElementById('badge-total-reportes').textContent = reportesAbertos;

    const boxDuvidas = document.getElementById('resumo-ultimas-duvidas');
    const todasDuvidas = [];
    Object.entries(comentariosObj).forEach(([aulaId, lista]) => {
        const aulaInfo = CATALOGO_AULAS_ADMIN.find((a) => a.id === aulaId);
        (lista || []).forEach((c) => {
            if (!c.oficial) {
                todasDuvidas.push({ ...c, aulaTitulo: aulaInfo ? aulaInfo.titulo : aulaId });
            }
        });
    });

    boxDuvidas.innerHTML = todasDuvidas.length === 0
        ? '<p class="empty-state-admin">Nenhuma dúvida pendente dos alunos.</p>'
        : todasDuvidas.slice(0, 3).map((d) => `
            <div class="stack-item-card">
                <div class="stack-item-topo">
                    <strong style="font-size:0.82rem;color:#fff;">${d.autor}</strong>
                    <span class="status-pill ${d.privado ? 'pago' : 'gratis'}">${d.privado ? '🔒 Privada' : '🌐 Pública'}</span>
                </div>
                <small style="color:#f39c12;font-size:0.72rem;font-weight:700;">${d.aulaTitulo}</small>
                <p class="stack-item-texto">${d.texto}</p>
            </div>
        `).join('');

    const boxReportes = document.getElementById('resumo-ultimos-reportes');
    boxReportes.innerHTML = reportes.length === 0
        ? '<p class="empty-state-admin">Nenhum reporte técnico registrado.</p>'
        : reportes.slice(-3).reverse().map((r) => `
            <div class="stack-item-card">
                <div class="stack-item-topo">
                    <strong style="font-size:0.82rem;color:#fff;text-transform:uppercase;">${r.tipo || 'Erro'}</strong>
                    <span class="status-pill ${r.status === 'resolvido' ? 'resolvido' : 'pendente'}">
                        ${r.status === 'resolvido' ? 'Resolvido' : 'Pendente'}
                    </span>
                </div>
                <p class="stack-item-texto">${r.descricao}</p>
            </div>
        `).join('');
}

// ==========================================================================
// 2. GESTÃO DE ALUNOS (AO EXCLUIR ALUNO, REMOVE TAMBÉM SUAS DÚVIDAS)
// ==========================================================================
function renderizarTabelaAlunos() {
    const tbody = document.getElementById('tabela-alunos-body');
    if (!tbody) return;

    const termo = (document.getElementById('filtro-alunos')?.value || '').toLowerCase().trim();
    const alunos = obterAlunosSomente().filter(
        (a) => String(a.nome || '').toLowerCase().includes(termo) || String(a.email || '').toLowerCase().includes(termo)
    );

    if (alunos.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" class="empty-state-admin">Nenhum aluno encontrado.</td></tr>';
        return;
    }

    tbody.innerHTML = alunos.map((aluno) => {
        const emailSafe = String(aluno.email || '').replace(/'/g, "\\'");
        const nomeSafe = String(aluno.nome || 'Aluno').replace(/'/g, "\\'");
        const pago = aluno.matriculado === true;
        const cert = aluno.certificadoLiberado === true;

        return `
            <tr>
                <td>
                    <strong style="color:#fff;display:block;">${aluno.nome || 'Aluno sem nome'}</strong>
                    <small style="color:#9ca3af;">${aluno.email}</small>
                </td>
                <td>
                    <span class="status-pill ${pago ? 'pago' : 'gratis'}">
                        ${pago ? '★ Curso Completo' : 'Módulo I Grátis'}
                    </span>
                </td>
                <td>
                    <span class="status-pill ${cert ? 'resolvido' : 'gratis'}">
                        ${cert ? 'Liberado' : 'Em andamento'}
                    </span>
                </td>
                <td>
                    <div class="acoes-cell">
                        <button type="button" class="btn-mini destaque" onclick="alternarMatriculaAluno('${emailSafe}')">
                            ${pago ? 'Revogar Completo' : 'Liberar Completo'}
                        </button>
                        <button type="button" class="btn-mini" onclick="alternarCertificadoAluno('${emailSafe}')">
                            ${cert ? 'Remover Cert.' : 'Liberar Cert.'}
                        </button>
                        <button type="button" class="btn-mini perigo" onclick="excluirAlunoAdmin('${emailSafe}', '${nomeSafe}')">
                            Excluir
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

function alternarMatriculaAluno(email) {
    const db = JSON.parse(localStorage.getItem('nankim_db')) || [];
    const idx = db.findIndex((u) => String(u.email || '').toLowerCase() === email.toLowerCase());
    if (idx === -1) return;

    const liberado = !db[idx].matriculado;
    db[idx].matriculado = liberado;
    db[idx].modulo1_liberado = true;
    localStorage.setItem('nankim_db', JSON.stringify(db));

    registrarNotificacaoParaAluno({
        email: db[idx].email,
        id: 'status-matricula',
        titulo: liberado ? 'Acesso Completo Liberado!' : 'Status da Matrícula Atualizado',
        mensagem: liberado
            ? 'Seu acesso aos Módulos II e III de Fundamentos do Desenho foi liberado pela administração.'
            : 'Seu plano retornou para a degustação gratuita (Módulo I).',
        link: 'area-aluno.html',
        acaoTexto: liberado ? 'Acessar minhas aulas →' : 'Ver meus cursos →'
    });

    exibirToastAdmin(liberado ? 'Curso Completo liberado para o aluno!' : 'Acesso revogado para Módulo I Grátis.');
    atualizarPainelCompleto();
}

function alternarCertificadoAluno(email) {
    const db = JSON.parse(localStorage.getItem('nankim_db')) || [];
    const idx = db.findIndex((u) => String(u.email || '').toLowerCase() === email.toLowerCase());
    if (idx === -1) return;

    const novoEstado = !db[idx].certificadoLiberado;
    db[idx].certificadoLiberado = novoEstado;
    if (novoEstado) {
        db[idx].matriculado = true;
        localStorage.setItem('nankim_certificado_liberado', 'true');
        const todas = Array.from({ length: 12 }, (_, i) => `aula-${i + 1}`);
        localStorage.setItem('nankim_aulas_concluidas', JSON.stringify(todas));
    }
    localStorage.setItem('nankim_db', JSON.stringify(db));

    registrarNotificacaoParaAluno({
        email: db[idx].email,
        id: 'status-certificado',
        titulo: novoEstado ? 'Certificado Liberado!' : 'Certificado Revogado',
        mensagem: novoEstado
            ? 'Parabéns! Seu certificado oficial de conclusão (12h) já está disponível para emissão.'
            : 'A emissão do seu certificado foi revogada pela administração.',
        link: 'meu-perfil.html',
        acaoTexto: novoEstado ? 'Emitir certificado agora →' : 'Ver meu perfil →'
    });

    exibirToastAdmin(novoEstado ? 'Certificado oficial liberado!' : 'Certificado revogado.');
    atualizarPainelCompleto();
}

function removerComentariosDoAlunoExcluido(email, nome) {
    const comentariosObj = JSON.parse(localStorage.getItem('nankim_comentarios')) || {};
    const emailNorm = String(email || '').toLowerCase().trim();
    const nomeNorm = String(nome || '').toLowerCase().trim();

    Object.keys(comentariosObj).forEach((aulaId) => {
        const lista = comentariosObj[aulaId];
        if (!Array.isArray(lista)) return;

        // Identifica IDs das perguntas do aluno excluído
        const idsPerguntasAluno = new Set();
        lista.forEach((item) => {
            if (item.oficial) return;
            const bateEmail = item.autorEmail && String(item.autorEmail).toLowerCase().trim() === emailNorm;
            const bateNome = !item.autorEmail && String(item.autor || '').toLowerCase().trim() === nomeNorm;
            if (bateEmail || bateNome) {
                if (item.id) idsPerguntasAluno.add(item.id);
            }
        });

        // Remove as perguntas do aluno e as respostas oficiais vinculadas a elas
        comentariosObj[aulaId] = lista.filter((item) => {
            if (item.oficial) {
                return !(item.replyToId && idsPerguntasAluno.has(item.replyToId));
            }
            const bateEmail = item.autorEmail && String(item.autorEmail).toLowerCase().trim() === emailNorm;
            const bateNome = !item.autorEmail && String(item.autor || '').toLowerCase().trim() === nomeNorm;
            return !(bateEmail || bateNome);
        });
    });

    localStorage.setItem('nankim_comentarios', JSON.stringify(comentariosObj));
}

function excluirAlunoAdmin(email, nome) {
    solicitarConfirmacaoAdmin({
        titulo: 'Excluir conta do aluno?',
        mensagem: `Tem certeza que deseja remover permanentemente a conta de ${nome} (${email}) e suas dúvidas no fórum? Os reportes técnicos serão mantidos para histórico.`,
        textoBotao: 'Excluir Aluno',
        onConfirm: () => {
            const db = JSON.parse(localStorage.getItem('nankim_db')) || [];
            const filtrado = db.filter((u) => String(u.email || '').toLowerCase() !== email.toLowerCase());
            localStorage.setItem('nankim_db', JSON.stringify(filtrado));
            localStorage.removeItem(`nankim_notificacoes_${email.toLowerCase().trim()}`);
            removerComentariosDoAlunoExcluido(email, nome);
            exibirToastAdmin(`Conta de ${nome} removida com sucesso.`);
            atualizarPainelCompleto();
        }
    });
}

// ==========================================================================
// 3. CENTRAL DE DÚVIDAS & RESPOSTAS INDIVIDUAIS COM EDIÇÃO
// ==========================================================================
let edicaoRespostaAtiva = null; // { aulaId, replyId }

function renderizarDuvidasAdmin() {
    const container = document.getElementById('lista-admin-duvidas');
    if (!container) return;

    const filtroAula = document.getElementById('filtro-aula-duvidas')?.value || 'todas';
    const comentariosObj = JSON.parse(localStorage.getItem('nankim_comentarios')) || {};

    const perguntas = [];

    Object.entries(comentariosObj).forEach(([aulaId, lista]) => {
        if (filtroAula !== 'todas' && aulaId !== filtroAula) return;
        if (!Array.isArray(lista)) return;

        const aulaInfo = CATALOGO_AULAS_ADMIN.find((a) => a.id === aulaId);
        const aulaTitulo = aulaInfo ? aulaInfo.titulo : aulaId;

        lista.forEach((item) => {
            if (item.oficial) return;

            const perguntaId = item.id;
            const prefixoAutor = `@${item.autor} — `;

            // Vincula EXCLUSIVAMENTE pelo replyToId único desta pergunta
            const respostaObj = lista.find((r) => r.oficial && r.replyToId === perguntaId) || null;
            const textoLimpoResposta = respostaObj
                ? String(respostaObj.texto || '').replace(prefixoAutor, '')
                : '';

            perguntas.push({
                aulaId,
                aulaTitulo,
                perguntaId,
                pergunta: item,
                respostaObj,
                textoLimpoResposta
            });
        });
    });

    if (perguntas.length === 0) {
        container.innerHTML = '<p class="empty-state-admin">Nenhuma dúvida enviada pelos alunos para este filtro.</p>';
        return;
    }

    container.innerHTML = perguntas.map((entry) => {
        const { aulaId, aulaTitulo, perguntaId, pergunta, respostaObj, textoLimpoResposta } = entry;
        const autorSafe = String(pergunta.autor || 'Aluno').replace(/'/g, "\\'");
        const editandoEsta =
            edicaoRespostaAtiva &&
            edicaoRespostaAtiva.aulaId === aulaId &&
            respostaObj &&
            edicaoRespostaAtiva.replyId === respostaObj.id;

        let blocoRespostaHtml = '';

        if (respostaObj && !editandoEsta) {
            blocoRespostaHtml = `
                <div class="resposta-oficial-box">
                    <div class="resposta-oficial-topo">
                        <span class="resposta-oficial-autor">
                            <i class="fa-solid fa-circle-check"></i> ${respostaObj.autor || 'Prof. Thiago Nankim'} · ${respostaObj.data || 'Respondido'}
                        </span>
                        <button type="button" class="btn-mini" onclick="iniciarEdicaoResposta('${aulaId}', '${respostaObj.id}')">
                            <i class="fa-solid fa-pen"></i> Editar resposta
                        </button>
                    </div>
                    <p class="resposta-oficial-texto">${textoLimpoResposta}</p>
                </div>
            `;
        } else if (respostaObj && editandoEsta) {
            const valorEscapado = textoLimpoResposta.replace(/"/g, '&quot;');
            blocoRespostaHtml = `
                <div class="resposta-oficial-box">
                    <span class="resposta-oficial-autor"><i class="fa-solid fa-pen"></i> Editando resposta oficial</span>
                    <form class="reply-form-admin" onsubmit="salvarEdicaoResposta(event, '${aulaId}', '${respostaObj.id}', '${autorSafe}')">
                        <input type="text" value="${valorEscapado}" required autofocus>
                        <button type="button" class="btn-mini" onclick="cancelarEdicaoResposta()">Cancelar</button>
                        <button type="submit" class="btn-mini destaque">Salvar Alteração</button>
                    </form>
                </div>
            `;
        } else {
            blocoRespostaHtml = `
                <form class="reply-form-admin" onsubmit="responderDuvidaComoInstrutor(event, '${aulaId}', '${perguntaId}', '${autorSafe}', ${Boolean(pergunta.privado)})">
                    <input type="text" placeholder="Escreva sua resposta como Prof. Thiago Nankim..." required>
                    <button type="submit" class="btn-mini destaque">Responder</button>
                </form>
            `;
        }

        return `
            <article class="stack-item-card">
                <div class="stack-item-topo">
                    <div>
                        <strong style="color:#fff;font-size:0.9rem;">${pergunta.autor}</strong>
                        <span style="color:#9ca3af;font-size:0.75rem;margin-left:0.5rem;">• ${pergunta.data || 'Recente'}</span>
                    </div>
                    <div style="display:flex;gap:0.4rem;align-items:center;flex-wrap:wrap;">
                        <span class="status-pill ${respostaObj ? 'resolvido' : 'pendente'}">
                            ${respostaObj ? '✓ Respondida' : 'Aguardando resposta'}
                        </span>
                        <span class="status-pill ${pergunta.privado ? 'pago' : 'gratis'}">
                            ${pergunta.privado ? '🔒 Privado (Instrutor)' : '🌐 Público'}
                        </span>
                        <button type="button" class="btn-mini perigo" onclick="excluirDuvidaCompletaAdmin('${aulaId}', '${perguntaId}')">
                            Excluir
                        </button>
                    </div>
                </div>
                <small style="color:#f39c12;font-weight:700;font-size:0.75rem;">${aulaTitulo}</small>
                <p class="stack-item-texto">${pergunta.texto}</p>

                ${blocoRespostaHtml}
            </article>
        `;
    }).join('');
}

function responderDuvidaComoInstrutor(event, aulaId, perguntaId, nomeAluno, eraPrivada) {
    event.preventDefault();
    const input = event.target.querySelector('input');
    const resposta = input?.value.trim();
    if (!resposta) return;

    const comentariosObj = JSON.parse(localStorage.getItem('nankim_comentarios')) || {};
    if (!Array.isArray(comentariosObj[aulaId])) {
        comentariosObj[aulaId] = [];
    }

    comentariosObj[aulaId].unshift({
        id: `resp-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        replyToId: perguntaId,
        autor: 'Prof. Thiago Nankim',
        avatar: 'T',
        data: 'Respondido agora',
        oficial: true,
        privado: eraPrivada,
        texto: `@${nomeAluno} — ${resposta}`
    });

    localStorage.setItem('nankim_comentarios', JSON.stringify(comentariosObj));

    const aulaInfo = CATALOGO_AULAS_ADMIN.find((a) => a.id === aulaId);
    registrarNotificacaoParaAluno({
        nome: nomeAluno,
        titulo: 'Prof. Thiago respondeu sua dúvida',
        mensagem: `${aulaInfo ? aulaInfo.titulo : 'Na sala de aula'}: "${resposta}"`,
        link: 'sala-de-aula.html',
        aulaId: aulaId,
        acaoTexto: 'Abrir aula e ver resposta →'
    });

    exibirToastAdmin('Resposta publicada e aluno notificado!');
    atualizarPainelCompleto();
}

function iniciarEdicaoResposta(aulaId, replyId) {
    edicaoRespostaAtiva = { aulaId, replyId };
    renderizarDuvidasAdmin();
}

function cancelarEdicaoResposta() {
    edicaoRespostaAtiva = null;
    renderizarDuvidasAdmin();
}

function salvarEdicaoResposta(event, aulaId, replyId, nomeAluno) {
    event.preventDefault();
    const input = event.target.querySelector('input');
    const novoTexto = input?.value.trim();
    if (!novoTexto) return;

    const comentariosObj = JSON.parse(localStorage.getItem('nankim_comentarios')) || {};
    const lista = comentariosObj[aulaId];
    if (!Array.isArray(lista)) return;

    const replyObj = lista.find((r) => r.id === replyId);
    if (!replyObj) return;

    replyObj.texto = `@${nomeAluno} — ${novoTexto}`;
    replyObj.data = 'Editado agora';
    localStorage.setItem('nankim_comentarios', JSON.stringify(comentariosObj));

    const aulaInfo = CATALOGO_AULAS_ADMIN.find((a) => a.id === aulaId);
    registrarNotificacaoParaAluno({
        nome: nomeAluno,
        titulo: 'Prof. Thiago atualizou a resposta',
        mensagem: `${aulaInfo ? aulaInfo.titulo : 'Na sala de aula'}: "${novoTexto}"`,
        link: 'sala-de-aula.html',
        aulaId: aulaId,
        acaoTexto: 'Ver resposta atualizada →'
    });

    edicaoRespostaAtiva = null;
    exibirToastAdmin('Resposta atualizada com sucesso!');
    atualizarPainelCompleto();
}

function excluirDuvidaCompletaAdmin(aulaId, perguntaId) {
    solicitarConfirmacaoAdmin({
        titulo: 'Excluir dúvida do fórum?',
        mensagem: 'Esta dúvida e a resposta vinculada (se houver) serão removidas da sala de aula.',
        textoBotao: 'Remover Dúvida',
        onConfirm: () => {
            const comentariosObj = JSON.parse(localStorage.getItem('nankim_comentarios')) || {};
            if (!Array.isArray(comentariosObj[aulaId])) return;

            comentariosObj[aulaId] = comentariosObj[aulaId].filter(
                (item) => item.id !== perguntaId && item.replyToId !== perguntaId
            );

            localStorage.setItem('nankim_comentarios', JSON.stringify(comentariosObj));
            edicaoRespostaAtiva = null;
            exibirToastAdmin('Dúvida removida do fórum.');
            atualizarPainelCompleto();
        }
    });
}

// ==========================================================================
// 4. REPORTES DE ERRO
// ==========================================================================
function renderizarReportesAdmin() {
    const container = document.getElementById('lista-admin-reportes');
    if (!container) return;

    const filtro = document.getElementById('filtro-status-reportes')?.value || 'todos';
    const reportes = JSON.parse(localStorage.getItem('nankim_reportes')) || [];

    const listaFiltrada = reportes
        .map((r, originalIndex) => ({ ...r, originalIndex }))
        .filter((r) => {
            const st = r.status === 'resolvido' ? 'resolvido' : 'pendente';
            return filtro === 'todos' || st === filtro;
        })
        .reverse();

    if (listaFiltrada.length === 0) {
        container.innerHTML = '<p class="empty-state-admin">Nenhum reporte encontrado nesta categoria.</p>';
        return;
    }

    container.innerHTML = listaFiltrada.map((rep) => {
        const resolvido = rep.status === 'resolvido';
        return `
            <article class="stack-item-card">
                <div class="stack-item-topo">
                    <div>
                        <strong style="color:#fff;font-size:0.88rem;text-transform:uppercase;">Categoria: ${rep.tipo || 'Geral'}</strong>
                        <span style="color:#9ca3af;font-size:0.75rem;margin-left:0.5rem;">• ${rep.data || 'Data não registrada'}</span>
                    </div>
                    <div style="display:flex;gap:0.45rem;align-items:center;">
                        <span class="status-pill ${resolvido ? 'resolvido' : 'pendente'}">
                            ${resolvido ? 'Resolvido' : 'Pendente'}
                        </span>
                        <button type="button" class="btn-mini destaque" onclick="alternarStatusReporte(${rep.originalIndex})">
                            ${resolvido ? 'Reabrir' : 'Marcar Resolvido'}
                        </button>
                    </div>
                </div>
                <small style="color:#9ca3af;font-size:0.74rem;">Página: ${rep.pagina || 'Plataforma'} ${rep.email ? `| Contato: ${rep.email}` : ''}</small>
                <p class="stack-item-texto">${rep.descricao}</p>
            </article>
        `;
    }).join('');
}

function alternarStatusReporte(index) {
    const reportes = JSON.parse(localStorage.getItem('nankim_reportes')) || [];
    if (!reportes[index]) return;
    const novoStatus = reportes[index].status === 'resolvido' ? 'pendente' : 'resolvido';
    reportes[index].status = novoStatus;
    localStorage.setItem('nankim_reportes', JSON.stringify(reportes));
    exibirToastAdmin(novoStatus === 'resolvido' ? 'Reporte marcado como resolvido!' : 'Reporte reaberto.');
    atualizarPainelCompleto();
}

// ==========================================================================
// 5. SIMULADOR CMS: PERSISTÊNCIA DE RASCUNHO, VALIDAÇÃO, UPLOAD E CHECKLIST
// ==========================================================================
let checklistEmEdicao = [];

function definirFeedbackCampoCMS(inputEl, mensagemErro, opcionalVazio = false) {
    if (!inputEl) return false;
    const grupo = inputEl.closest('.admin-field');
    if (!grupo) return !mensagemErro;

    const feedback = grupo.querySelector('.admin-field-feedback');
    if (mensagemErro) {
        grupo.classList.add('erro');
        grupo.classList.remove('sucesso');
        if (feedback) feedback.textContent = mensagemErro;
        return false;
    } else {
        grupo.classList.remove('erro');
        if (!opcionalVazio) {
            grupo.classList.add('sucesso');
        } else {
            grupo.classList.remove('sucesso');
        }
        if (feedback) feedback.textContent = '';
        return true;
    }
}

function limparValidacaoFormCMS(form) {
    if (!form) return;
    form.querySelectorAll('.admin-field').forEach((f) => f.classList.remove('erro', 'sucesso'));
    form.querySelectorAll('.admin-field-feedback').forEach((fb) => (fb.textContent = ''));
}

// Máscara automática para horas
function aplicarMascaraHoras(input) {
    const digitos = input.value.replace(/\D/g, '').slice(0, 3);
    input.value = digitos ? `${digitos} ${Number(digitos) === 1 ? 'hora' : 'horas'}` : '';
}

function validarCampoCurso(id) {
    const el = document.getElementById(id);
    if (!el) return true;
    const val = el.value.trim();

    if (id === 'cms-curso-titulo') {
        return definirFeedbackCampoCMS(el, val.length < 3 ? 'Informe um título com pelo menos 3 caracteres.' : '');
    }
    if (id === 'cms-curso-carga') {
        const num = Number(val.replace(/\D/g, ''));
        return definirFeedbackCampoCMS(el, !num || num < 1 ? 'Informe a carga horária em horas (ex: 12).' : '');
    }
    if (id === 'cms-curso-preco') {
        return definirFeedbackCampoCMS(el, val.length < 3 ? 'Informe o valor ou plano (ex: 12x R$ 39,90).' : '');
    }
    if (id === 'cms-curso-descricao') {
        return definirFeedbackCampoCMS(el, val.length < 15 ? 'Descreva a ementa com pelo menos 15 caracteres.' : '');
    }
    return true;
}

function validarCampoModulo(id) {
    const el = document.getElementById(id);
    if (!el) return true;
    const val = el.value.trim();

    if (id === 'cms-mod-titulo') {
        return definirFeedbackCampoCMS(el, val.length < 3 ? 'Informe o nome do módulo (mín. 3 caracteres).' : '');
    }
    if (id === 'cms-mod-carga') {
        const num = Number(val.replace(/\D/g, ''));
        return definirFeedbackCampoCMS(el, !num || num < 1 ? 'Informe a carga horária do módulo (ex: 4).' : '');
    }
    return true;
}

function validarCampoAula(id) {
    const el = document.getElementById(id);
    if (!el) return true;
    const val = el.value.trim();

    if (id === 'cms-aula-titulo') {
        return definirFeedbackCampoCMS(el, val.length < 3 ? 'Informe o título da aula (mín. 3 caracteres).' : '');
    }
    if (id === 'cms-aula-youtube') {
        const regexYt = /^https?:\/\/(www\.)?(youtube\.com\/(watch\?v=[\w-]{6,}|embed\/[\w-]{6,}|shorts\/[\w-]{6,})|youtu\.be\/[\w-]{6,})/i;
        return definirFeedbackCampoCMS(el, !regexYt.test(val) ? 'Cole uma URL completa do YouTube (ex: https://www.youtube.com/watch?v=...).' : '');
    }
    if (id === 'cms-aula-resumo') {
        return definirFeedbackCampoCMS(el, val.length < 10 ? 'Escreva um resumo com pelo menos 10 caracteres.' : '');
    }
    return true;
}

// --- Persistência de Rascunhos em sessionStorage ---
function salvarRascunhoCurso() {
    if (document.getElementById('cms-curso-id').value) return; // Só guarda rascunho de criação
    const dados = {
        titulo: document.getElementById('cms-curso-titulo').value,
        carga: document.getElementById('cms-curso-carga').value,
        preco: document.getElementById('cms-curso-preco').value,
        status: document.getElementById('cms-curso-status').value,
        capaNome: document.getElementById('cms-curso-capa-nome').value,
        descricao: document.getElementById('cms-curso-descricao').value
    };
    sessionStorage.setItem(CHAVE_RASCUNHO_CURSO, JSON.stringify(dados));
}

function salvarRascunhoModulo() {
    if (document.getElementById('cms-mod-id').value) return;
    const dados = {
        cursoId: document.getElementById('cms-mod-curso-id').value,
        titulo: document.getElementById('cms-mod-titulo').value,
        acesso: document.getElementById('cms-mod-acesso').value,
        carga: document.getElementById('cms-mod-carga').value
    };
    sessionStorage.setItem(CHAVE_RASCUNHO_MODULO, JSON.stringify(dados));
}

function salvarRascunhoAula() {
    if (document.getElementById('cms-aula-id').value) return;
    const dados = {
        cursoId: document.getElementById('cms-aula-curso-id').value,
        modId: document.getElementById('cms-aula-mod-id').value,
        titulo: document.getElementById('cms-aula-titulo').value,
        youtube: document.getElementById('cms-aula-youtube').value,
        pdfNome: document.getElementById('cms-aula-pdf-nome').value,
        resumo: document.getElementById('cms-aula-resumo').value,
        exercicio: document.getElementById('cms-aula-exercicio').value,
        checklist: [...checklistEmEdicao]
    };
    sessionStorage.setItem(CHAVE_RASCUNHO_AULA, JSON.stringify(dados));
}

function abrirModalCMS(id) {
    document.getElementById(id)?.classList.add('aberto');
}

function fecharModalCMS(id, descartarRascunho = false) {
    document.getElementById(id)?.classList.remove('aberto');
    if (descartarRascunho) {
        if (id === 'modal-cms-curso') sessionStorage.removeItem(CHAVE_RASCUNHO_CURSO);
        if (id === 'modal-cms-modulo') sessionStorage.removeItem(CHAVE_RASCUNHO_MODULO);
        if (id === 'modal-cms-aula') sessionStorage.removeItem(CHAVE_RASCUNHO_AULA);
    }
}

function renderizarChecklistPreviewModal() {
    const ul = document.getElementById('lista-cms-checklist-preview');
    if (!ul) return;

    if (checklistEmEdicao.length === 0) {
        ul.innerHTML = '<li style="font-size:0.76rem;color:#6b7280;padding:0.25rem 0;">Nenhuma etapa adicionada ao checklist ainda.</li>';
        return;
    }

    ul.innerHTML = checklistEmEdicao.map((texto, idx) => `
        <li class="cms-checklist-preview-item">
            <span><i class="fa-regular fa-square-check"></i> ${texto}</span>
            <button type="button" class="btn-mini perigo" onclick="removerEtapaChecklistModal(${idx})">Remover</button>
        </li>
    `).join('');
}

function removerEtapaChecklistModal(index) {
    checklistEmEdicao.splice(index, 1);
    renderizarChecklistPreviewModal();
    salvarRascunhoAula();
}

function configurarEventosCMS() {
    // Fechar no X ou fora do modal MANTÉM o rascunho salvo
    document.querySelectorAll('[data-close-modal]').forEach((btn) => {
        btn.addEventListener('click', () => {
            fecharModalCMS(btn.getAttribute('data-close-modal'), false);
        });
    });

    // Botão Cancelar DESCARTA o rascunho
    document.querySelectorAll('[data-cancel-modal]').forEach((btn) => {
        btn.addEventListener('click', () => {
            fecharModalCMS(btn.getAttribute('data-cancel-modal'), true);
        });
    });

    document.querySelectorAll('.admin-modal-overlay').forEach((overlay) => {
        if (overlay.id === 'modal-admin-confirm') return;
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) overlay.classList.remove('aberto');
        });
    });

    document.getElementById('btn-novo-curso')?.addEventListener('click', () => abrirFormularioCurso());

    // Upload de Capa do Curso
    document.getElementById('cms-curso-capa-file')?.addEventListener('change', (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        document.getElementById('cms-curso-capa-nome').value = file.name;
        document.getElementById('label-cms-curso-capa').textContent = file.name;
        definirFeedbackCampoCMS(e.target, '');
        salvarRascunhoCurso();
    });

    // Upload de Material PDF/ZIP da Aula
    document.getElementById('cms-aula-pdf-file')?.addEventListener('change', (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        document.getElementById('cms-aula-pdf-nome').value = file.name;
        document.getElementById('label-cms-aula-pdf').textContent = file.name;
        definirFeedbackCampoCMS(e.target, '');
        salvarRascunhoAula();
    });

    // Adicionar etapa ao Checklist da Aula
    const btnAddEtapa = document.getElementById('btn-add-checklist-item');
    const inputNovaEtapa = document.getElementById('cms-checklist-novo-item');

    const adicionarEtapa = () => {
        const val = inputNovaEtapa?.value.trim();
        if (!val) return;
        checklistEmEdicao.push(val);
        inputNovaEtapa.value = '';
        renderizarChecklistPreviewModal();
        salvarRascunhoAula();
    };

    btnAddEtapa?.addEventListener('click', adicionarEtapa);
    inputNovaEtapa?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            adicionarEtapa();
        }
    });

    // Listeners instantâneos (focus + input + rascunho) — Curso
    const inputCargaCurso = document.getElementById('cms-curso-carga');
    inputCargaCurso?.addEventListener('input', () => {
        aplicarMascaraHoras(inputCargaCurso);
        validarCampoCurso('cms-curso-carga');
        salvarRascunhoCurso();
    });
    ['cms-curso-titulo', 'cms-curso-preco', 'cms-curso-descricao'].forEach((id) => {
        const el = document.getElementById(id);
        el?.addEventListener('focus', () => validarCampoCurso(id));
        el?.addEventListener('input', () => {
            validarCampoCurso(id);
            salvarRascunhoCurso();
        });
    });
    document.getElementById('cms-curso-status')?.addEventListener('change', salvarRascunhoCurso);

    // Listeners instantâneos — Módulo
    const inputCargaMod = document.getElementById('cms-mod-carga');
    inputCargaMod?.addEventListener('input', () => {
        aplicarMascaraHoras(inputCargaMod);
        validarCampoModulo('cms-mod-carga');
        salvarRascunhoModulo();
    });
    const inputTituloMod = document.getElementById('cms-mod-titulo');
    inputTituloMod?.addEventListener('focus', () => validarCampoModulo('cms-mod-titulo'));
    inputTituloMod?.addEventListener('input', () => {
        validarCampoModulo('cms-mod-titulo');
        salvarRascunhoModulo();
    });
    document.getElementById('cms-mod-acesso')?.addEventListener('change', salvarRascunhoModulo);

    // Listeners instantâneos — Aula
    ['cms-aula-titulo', 'cms-aula-youtube', 'cms-aula-resumo'].forEach((id) => {
        const el = document.getElementById(id);
        el?.addEventListener('focus', () => validarCampoAula(id));
        el?.addEventListener('input', () => {
            validarCampoAula(id);
            salvarRascunhoAula();
        });
    });
    document.getElementById('cms-aula-exercicio')?.addEventListener('input', salvarRascunhoAula);

    // Submit Curso
    document.getElementById('form-cms-curso')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const okTitulo = validarCampoCurso('cms-curso-titulo');
        const okCarga = validarCampoCurso('cms-curso-carga');
        const okPreco = validarCampoCurso('cms-curso-preco');
        const okDesc = validarCampoCurso('cms-curso-descricao');
        if (!okTitulo || !okCarga || !okPreco || !okDesc) return;

        const cursos = obterCursosCMS();
        const id = document.getElementById('cms-curso-id').value;
        const capaEscolhida = document.getElementById('cms-curso-capa-nome').value.trim();

        const dados = {
            titulo: document.getElementById('cms-curso-titulo').value.trim(),
            cargaHoraria: document.getElementById('cms-curso-carga').value.trim(),
            preco: document.getElementById('cms-curso-preco').value.trim(),
            status: document.getElementById('cms-curso-status').value,
            capa: capaEscolhida || 'capa-curso-nankim.jpg',
            descricao: document.getElementById('cms-curso-descricao').value.trim()
        };

        if (id) {
            const idx = cursos.findIndex((c) => c.id === id);
            if (idx !== -1) cursos[idx] = { ...cursos[idx], ...dados };
            exibirToastAdmin(`Curso "${dados.titulo}" atualizado!`);
        } else {
            cursos.push({
                id: `curso-${Date.now()}`,
                ...dados,
                modulos: []
            });
            exibirToastAdmin(`Curso "${dados.titulo}" criado com sucesso!`);
        }

        salvarCursosCMS(cursos);
        fecharModalCMS('modal-cms-curso', true);
    });

    // Submit Módulo
    document.getElementById('form-cms-modulo')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const okTit = validarCampoModulo('cms-mod-titulo');
        const okCarga = validarCampoModulo('cms-mod-carga');
        if (!okTit || !okCarga) return;

        const cursos = obterCursosCMS();
        const cursoId = document.getElementById('cms-mod-curso-id').value;
        const modId = document.getElementById('cms-mod-id').value;
        const curso = cursos.find((c) => c.id === cursoId);
        if (!curso) return;

        const dados = {
            titulo: document.getElementById('cms-mod-titulo').value.trim(),
            acesso: document.getElementById('cms-mod-acesso').value,
            carga: document.getElementById('cms-mod-carga').value.trim()
        };

        if (modId) {
            const idx = curso.modulos.findIndex((m) => m.id === modId);
            if (idx !== -1) curso.modulos[idx] = { ...curso.modulos[idx], ...dados };
            exibirToastAdmin(`Módulo "${dados.titulo}" atualizado!`);
        } else {
            curso.modulos.push({
                id: `mod-${Date.now()}`,
                ...dados,
                aulas: []
            });
            exibirToastAdmin(`Módulo "${dados.titulo}" adicionado!`);
        }

        salvarCursosCMS(cursos);
        fecharModalCMS('modal-cms-modulo', true);
    });

    // Submit Aula
    document.getElementById('form-cms-aula')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const okTit = validarCampoAula('cms-aula-titulo');
        const okYt = validarCampoAula('cms-aula-youtube');
        const okRes = validarCampoAula('cms-aula-resumo');
        if (!okTit || !okYt || !okRes) return;

        const cursos = obterCursosCMS();
        const cursoId = document.getElementById('cms-aula-curso-id').value;
        const modId = document.getElementById('cms-aula-mod-id').value;
        const aulaId = document.getElementById('cms-aula-id').value;

        const curso = cursos.find((c) => c.id === cursoId);
        const modulo = curso?.modulos.find((m) => m.id === modId);
        if (!modulo) return;

        const dados = {
            titulo: document.getElementById('cms-aula-titulo').value.trim(),
            youtube: document.getElementById('cms-aula-youtube').value.trim(),
            pdf: document.getElementById('cms-aula-pdf-nome').value.trim(),
            resumo: document.getElementById('cms-aula-resumo').value.trim(),
            exercicio: document.getElementById('cms-aula-exercicio').value.trim(),
            checklist: [...checklistEmEdicao]
        };

        if (aulaId) {
            const idx = modulo.aulas.findIndex((a) => a.id === aulaId);
            if (idx !== -1) modulo.aulas[idx] = { ...modulo.aulas[idx], ...dados };
            exibirToastAdmin(`Aula "${dados.titulo}" atualizada!`);
        } else {
            modulo.aulas.push({
                id: `aula-sim-${Date.now()}`,
                ...dados
            });
            exibirToastAdmin(`Aula "${dados.titulo}" adicionada ao módulo!`);
        }

        salvarCursosCMS(cursos);
        fecharModalCMS('modal-cms-aula', true);
    });
}

function abrirFormularioCurso(cursoId = '') {
    const form = document.getElementById('form-cms-curso');
    limparValidacaoFormCMS(form);
    const badgeRascunho = document.getElementById('badge-rascunho-curso');
    badgeRascunho?.classList.add('hidden');

    const curso = cursoId ? obterCursosCMS().find((c) => c.id === cursoId) : null;
    document.getElementById('titulo-modal-curso').textContent = curso ? 'Editar Curso' : 'Criar Novo Curso';
    document.getElementById('cms-curso-id').value = curso ? curso.id : '';

    if (curso) {
        document.getElementById('cms-curso-titulo').value = curso.titulo;
        document.getElementById('cms-curso-carga').value = curso.cargaHoraria;
        document.getElementById('cms-curso-preco').value = curso.preco;
        document.getElementById('cms-curso-status').value = curso.status;
        document.getElementById('cms-curso-capa-nome').value = curso.capa || '';
        document.getElementById('label-cms-curso-capa').textContent = curso.capa || 'Selecionar imagem de capa...';
        document.getElementById('cms-curso-descricao').value = curso.descricao;
    } else {
        let rascunho = null;
        try {
            rascunho = JSON.parse(sessionStorage.getItem(CHAVE_RASCUNHO_CURSO));
        } catch (_) {}

        const temDados = rascunho && (rascunho.titulo || rascunho.carga || rascunho.preco || rascunho.descricao);
        document.getElementById('cms-curso-titulo').value = temDados ? rascunho.titulo : '';
        document.getElementById('cms-curso-carga').value = temDados ? rascunho.carga : '';
        document.getElementById('cms-curso-preco').value = temDados ? rascunho.preco : '';
        document.getElementById('cms-curso-status').value = temDados ? rascunho.status : 'disponivel';
        document.getElementById('cms-curso-capa-nome').value = temDados ? rascunho.capaNome : '';
        document.getElementById('label-cms-curso-capa').textContent = (temDados && rascunho.capaNome) ? rascunho.capaNome : 'Selecionar imagem de capa...';
        document.getElementById('cms-curso-descricao').value = temDados ? rascunho.descricao : '';

        if (temDados) badgeRascunho?.classList.remove('hidden');
    }

    abrirModalCMS('modal-cms-curso');
}

function excluirCursoCMS(cursoId) {
    const curso = obterCursosCMS().find((c) => c.id === cursoId);
    solicitarConfirmacaoAdmin({
        titulo: 'Excluir curso do simulador?',
        mensagem: `Deseja remover "${curso?.titulo || 'este curso'}" e todos os seus módulos e aulas?`,
        textoBotao: 'Excluir Curso',
        onConfirm: () => {
            const filtrados = obterCursosCMS().filter((c) => c.id !== cursoId);
            salvarCursosCMS(filtrados);
            exibirToastAdmin('Curso removido do simulador.');
        }
    });
}

function abrirFormularioModulo(cursoId, modId = '') {
    const form = document.getElementById('form-cms-modulo');
    limparValidacaoFormCMS(form);
    const badgeRascunho = document.getElementById('badge-rascunho-modulo');
    badgeRascunho?.classList.add('hidden');

    const curso = obterCursosCMS().find((c) => c.id === cursoId);
    const mod = modId ? curso?.modulos.find((m) => m.id === modId) : null;
    document.getElementById('titulo-modal-modulo').textContent = mod ? 'Editar Módulo' : 'Adicionar Módulo';
    document.getElementById('cms-mod-curso-id').value = cursoId;
    document.getElementById('cms-mod-id').value = mod ? mod.id : '';

    if (mod) {
        document.getElementById('cms-mod-titulo').value = mod.titulo;
        document.getElementById('cms-mod-acesso').value = mod.acesso;
        document.getElementById('cms-mod-carga').value = mod.carga;
    } else {
        let rascunho = null;
        try {
            rascunho = JSON.parse(sessionStorage.getItem(CHAVE_RASCUNHO_MODULO));
        } catch (_) {}

        const temDados = rascunho && rascunho.cursoId === cursoId && (rascunho.titulo || rascunho.carga);
        document.getElementById('cms-mod-titulo').value = temDados ? rascunho.titulo : '';
        document.getElementById('cms-mod-acesso').value = temDados ? rascunho.acesso : 'completo';
        document.getElementById('cms-mod-carga').value = temDados ? rascunho.carga : '';

        if (temDados) badgeRascunho?.classList.remove('hidden');
    }

    abrirModalCMS('modal-cms-modulo');
}

function excluirModuloCMS(cursoId, modId) {
    solicitarConfirmacaoAdmin({
        titulo: 'Remover módulo?',
        mensagem: 'Este módulo e todas as aulas vinculadas a ele serão removidos.',
        textoBotao: 'Remover Módulo',
        onConfirm: () => {
            const cursos = obterCursosCMS();
            const curso = cursos.find((c) => c.id === cursoId);
            if (!curso) return;
            curso.modulos = curso.modulos.filter((m) => m.id !== modId);
            salvarCursosCMS(cursos);
            exibirToastAdmin('Módulo removido.');
        }
    });
}

function abrirFormularioAula(cursoId, modId, aulaId = '') {
    const form = document.getElementById('form-cms-aula');
    limparValidacaoFormCMS(form);
    const badgeRascunho = document.getElementById('badge-rascunho-aula');
    badgeRascunho?.classList.add('hidden');

    const curso = obterCursosCMS().find((c) => c.id === cursoId);
    const mod = curso?.modulos.find((m) => m.id === modId);
    const aula = aulaId ? mod?.aulas.find((a) => a.id === aulaId) : null;

    document.getElementById('titulo-modal-aula').textContent = aula ? 'Editar Aula' : 'Adicionar Nova Aula';
    document.getElementById('cms-aula-curso-id').value = cursoId;
    document.getElementById('cms-aula-mod-id').value = modId;
    document.getElementById('cms-aula-id').value = aula ? aula.id : '';
    document.getElementById('cms-checklist-novo-item').value = '';

    if (aula) {
        document.getElementById('cms-aula-titulo').value = aula.titulo;
        document.getElementById('cms-aula-youtube').value = aula.youtube;
        document.getElementById('cms-aula-pdf-nome').value = aula.pdf || '';
        document.getElementById('label-cms-aula-pdf').textContent = aula.pdf || 'Anexar apostila ou ficha...';
        document.getElementById('cms-aula-resumo').value = aula.resumo;
        document.getElementById('cms-aula-exercicio').value = aula.exercicio || '';
        checklistEmEdicao = Array.isArray(aula.checklist) ? [...aula.checklist] : [];
    } else {
        let rascunho = null;
        try {
            rascunho = JSON.parse(sessionStorage.getItem(CHAVE_RASCUNHO_AULA));
        } catch (_) {}

        const temDados =
            rascunho &&
            rascunho.cursoId === cursoId &&
            rascunho.modId === modId &&
            (rascunho.titulo || rascunho.youtube || rascunho.resumo || rascunho.exercicio || (rascunho.checklist && rascunho.checklist.length));

        document.getElementById('cms-aula-titulo').value = temDados ? rascunho.titulo : '';
        document.getElementById('cms-aula-youtube').value = temDados ? rascunho.youtube : '';
        document.getElementById('cms-aula-pdf-nome').value = temDados ? rascunho.pdfNome : '';
        document.getElementById('label-cms-aula-pdf').textContent = (temDados && rascunho.pdfNome) ? rascunho.pdfNome : 'Anexar apostila ou ficha...';
        document.getElementById('cms-aula-resumo').value = temDados ? rascunho.resumo : '';
        document.getElementById('cms-aula-exercicio').value = temDados ? rascunho.exercicio : '';
        checklistEmEdicao = temDados && Array.isArray(rascunho.checklist) ? [...rascunho.checklist] : [];

        if (temDados) badgeRascunho?.classList.remove('hidden');
    }

    renderizarChecklistPreviewModal();
    abrirModalCMS('modal-cms-aula');
}

function excluirAulaCMS(cursoId, modId, aulaId) {
    solicitarConfirmacaoAdmin({
        titulo: 'Excluir aula?',
        mensagem: 'Tem certeza que deseja remover esta aula do módulo?',
        textoBotao: 'Excluir Aula',
        onConfirm: () => {
            const cursos = obterCursosCMS();
            const curso = cursos.find((c) => c.id === cursoId);
            const mod = curso?.modulos.find((m) => m.id === modId);
            if (!mod) return;
            mod.aulas = mod.aulas.filter((a) => a.id !== aulaId);
            salvarCursosCMS(cursos);
            exibirToastAdmin('Aula removida do módulo.');
        }
    });
}

function renderizarCursosCMS() {
    const container = document.getElementById('lista-cms-cursos');
    if (!container) return;

    const cursos = obterCursosCMS();
    if (cursos.length === 0) {
        container.innerHTML = '<p class="empty-state-admin">Nenhum curso cadastrado. Clique em "Criar Novo Curso" abaixo.</p>';
        return;
    }

    container.innerHTML = cursos.map((curso) => {
        const disponivel = curso.status === 'disponivel';
        const totalAulas = curso.modulos.reduce((acc, m) => acc + (m.aulas?.length || 0), 0);

        const modulosHtml = curso.modulos.length === 0
            ? '<p class="empty-state-admin" style="padding:0.75rem;">Nenhum módulo neste curso ainda. Clique em "+ Módulo".</p>'
            : curso.modulos.map((mod) => {
                const ehGratis = mod.acesso === 'gratis';
                const aulasHtml = (mod.aulas || []).length === 0
                    ? '<small style="color:#6b7280;font-size:0.76rem;">Nenhuma aula cadastrada neste módulo.</small>'
                    : mod.aulas.map((aula) => {
                        const qtdChecklist = Array.isArray(aula.checklist) ? aula.checklist.length : 0;
                        return `
                            <div class="cms-aula-row">
                                <div class="cms-aula-info">
                                    <strong style="color:#f3f4f6;font-size:0.83rem;">${aula.titulo}</strong>
                                    <div class="cms-aula-tags">
                                        <span><i class="fa-brands fa-youtube" style="color:#ef4444;"></i> ${aula.youtube || 'Sem vídeo'}</span>
                                        ${aula.pdf ? `<span><i class="fa-solid fa-file-pdf" style="color:#f39c12;"></i> ${aula.pdf}</span>` : ''}
                                        ${(aula.exercicio || qtdChecklist > 0) ? `<span><i class="fa-solid fa-list-check"></i> Exercício (${qtdChecklist} ${qtdChecklist === 1 ? 'etapa' : 'etapas'})</span>` : ''}
                                    </div>
                                </div>
                                <div style="display:flex;gap:0.4rem;">
                                    <button type="button" class="btn-mini" onclick="abrirFormularioAula('${curso.id}', '${mod.id}', '${aula.id}')">Editar</button>
                                    <button type="button" class="btn-mini perigo" onclick="excluirAulaCMS('${curso.id}', '${mod.id}', '${aula.id}')">Excluir</button>
                                </div>
                            </div>
                        `;
                    }).join('');

                return `
                    <div class="cms-modulo-box">
                        <div class="cms-modulo-topo">
                            <div>
                                <strong style="color:#fff;font-size:0.88rem;">${mod.titulo}</strong>
                                <span class="status-pill ${ehGratis ? 'resolvido' : 'pago'}" style="margin-left:0.5rem;">
                                    ${ehGratis ? 'Grátis' : 'Completo'}
                                </span>
                                <small style="display:block;color:#9ca3af;font-size:0.74rem;margin-top:0.2rem;">${mod.carga || ''}</small>
                            </div>
                            <div style="display:flex;gap:0.4rem;flex-wrap:wrap;">
                                <button type="button" class="btn-mini destaque" onclick="abrirFormularioAula('${curso.id}', '${mod.id}')">+ Aula</button>
                                <button type="button" class="btn-mini" onclick="abrirFormularioModulo('${curso.id}', '${mod.id}')">Editar</button>
                                <button type="button" class="btn-mini perigo" onclick="excluirModuloCMS('${curso.id}', '${mod.id}')">Excluir</button>
                            </div>
                        </div>
                        <div style="display:flex;flex-direction:column;gap:0.45rem;">
                            ${aulasHtml}
                        </div>
                    </div>
                `;
            }).join('');

        return `
            <article class="cms-curso-card">
                <div class="cms-curso-header">
                    <div style="max-width:720px;">
                        <div style="display:flex;align-items:center;gap:0.55rem;flex-wrap:wrap;">
                            <h3 style="color:#fff;font-size:1.05rem;font-weight:800;margin:0;">${curso.titulo}</h3>
                            <span class="status-pill ${disponivel ? 'resolvido' : 'gratis'}">
                                ${disponivel ? '● Disponível' : '🔒 Em Breve'}
                            </span>
                        </div>
                        <p style="color:#cbd5e1;font-size:0.82rem;margin:0.4rem 0 0;line-height:1.45;">${curso.descricao}</p>
                        <div class="cms-curso-meta">
                            <span><i class="fa-regular fa-clock"></i> ${curso.cargaHoraria}</span>
                            <span><i class="fa-solid fa-tag"></i> ${curso.preco}</span>
                            <span><i class="fa-solid fa-layer-group"></i> ${curso.modulos.length} módulos · ${totalAulas} aulas</span>
                            <span><i class="fa-regular fa-image"></i> ${curso.capa}</span>
                        </div>
                    </div>

                    <div style="display:flex;gap:0.45rem;flex-wrap:wrap;">
                        <button type="button" class="btn-mini destaque" onclick="abrirFormularioModulo('${curso.id}')">+ Módulo</button>
                        <button type="button" class="btn-mini" onclick="abrirFormularioCurso('${curso.id}')">Editar Curso</button>
                        <button type="button" class="btn-mini perigo" onclick="excluirCursoCMS('${curso.id}')">Excluir</button>
                    </div>
                </div>

                <div class="cms-curso-body">
                    ${modulosHtml}
                </div>
            </article>
        `;
    }).join('');
}