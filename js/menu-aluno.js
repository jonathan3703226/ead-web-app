/* ==========================================================================
   MENU-ALUNO.JS - Cabeçalho Logado Integrado ao global.js (Nankim)
   Suporta Modo Padrão (Área do Aluno / Meu Perfil) e Modo Foco (Sala de Aula)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    injetarMenuLogado();
});

function injetarMenuLogado() {
    const container = document.getElementById('header-container');
    if (!container) return;

    // Sinaliza ao global.js para não sobrescrever com o menu comercial
    container.dataset.menuLogado = 'true';

    const sessaoData = sessionStorage.getItem('nankim_sessao');
    if (!sessaoData) {
        window.location.href = 'index.html';
        return;
    }

    const usuarioSessao = JSON.parse(sessaoData);
    const dbUsuarios = JSON.parse(localStorage.getItem('nankim_db')) || [];
    const idxUsuario = dbUsuarios.findIndex(
        (u) => String(u.email || '').toLowerCase() === String(usuarioSessao.email || '').toLowerCase()
    );
    const usuarioAtual = idxUsuario !== -1 ? dbUsuarios[idxUsuario] : usuarioSessao;

    // Bloqueia acesso silenciosamente sem alert() nativo e abre o modal estilizado na home
    if (usuarioAtual.acessoBloqueado === true) {
        sessionStorage.removeItem('nankim_sessao');
        window.location.href = 'index.html?bloqueado=1';
        return;
    }

    // Monitora em tempo real caso o admin bloqueie enquanto o aluno estiver com a página aberta
    window.addEventListener('storage', (e) => {
        if (e.key === 'nankim_db') {
            const listaAtualizada = JSON.parse(localStorage.getItem('nankim_db')) || [];
            const conta = listaAtualizada.find(
                (u) => String(u.email || '').toLowerCase() === String(usuarioAtual.email || '').toLowerCase()
            );
            if (conta && conta.acessoBloqueado === true) {
                sessionStorage.removeItem('nankim_sessao');
                window.location.href = 'index.html?bloqueado=1';
            }
        }
    });

    const notificacoes = garantirNotificacaoPerfil(usuarioAtual);
    const naoLidas = notificacoes.filter((n) => !n.lida).length;

    const paginaAtual = window.location.pathname.split('/').pop() || 'area-aluno.html';
    const isSalaDeAula = paginaAtual === 'sala-de-aula.html' || document.body.classList.contains('sala-de-aula');
    const isCursos = paginaAtual === 'area-aluno.html';
    const isPerfil = paginaAtual === 'meu-perfil.html';

    // Calcula progresso inicial caso esteja na Sala de Aula
    const concluidas = JSON.parse(localStorage.getItem('nankim_aulas_concluidas') || '[]');
    const qtdConcluidas = Array.isArray(concluidas) ? concluidas.length : 0;
    const pctInicial = Math.min(Math.round((qtdConcluidas / 12) * 100), 100);

    const logoHtml = `
        <div class="logo-logado" aria-label="Nankim Art School">
            <div class="logo-icone-wrapper">
                <img src="./assets/icons/logo.svg" alt="Nankim" class="logo-img-simbolo"
                     onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' viewBox=\\'0 0 40 40\\'><circle cx=\\'20\\' cy=\\'20\\' r=\\'18\\' fill=\\'%23f39c12\\'/><text x=\\'50%\\' y=\\'58%\\' text-anchor=\\'middle\\' fill=\\'white\\' font-size=\\'20\\' font-family=\\'Georgia\\'>N</text></svg>'">
            </div>
            <div class="logo-texto-wrapper">
                <span class="logo-fixo">Nankim</span>
                <span class="logo-expansivel">Art School</span>
            </div>
        </div>
    `;

    const notificacoesHtml = `
        <div class="wrapper-notificacoes">
            <button type="button" class="btn-icone-header link-magnetico" id="btn-notificacoes" aria-label="Notificações" aria-expanded="false">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                </svg>
                <span class="badge-notificacao" id="badge-notif" ${naoLidas === 0 ? 'hidden' : ''}>${naoLidas}</span>
            </button>

            <div class="painel-notificacoes" id="painel-notificacoes" role="region" aria-label="Lista de Notificações">
                <div class="cabecalho-notificacoes">
                    <h3>Notificações</h3>
                    <button type="button" class="btn-marcar-lidas" id="btn-marcar-todas-lidas">Marcar como lidas</button>
                </div>
                <div class="lista-notificacoes" id="lista-notificacoes">
                    ${renderizarItensNotificacao(notificacoes)}
                </div>
            </div>
        </div>
    `;

    const botaoTemaHtml = `
        <button type="button" class="btn-icone-header btn-tema-logado link-magnetico" id="btn-toggle-tema" aria-label="Alternar tema claro e escuro" title="Alternar tema">
            <span class="icone-sol" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="5"/>
                    <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72 1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                </svg>
            </span>
            <span class="icone-lua" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
            </span>
        </button>
    `;

    if (isSalaDeAula) {
        container.innerHTML = `
            <header class="header-logado header-modo-foco">
                <div class="header-logado-container header-foco-container">
                    <div class="foco-esquerda">
                        ${logoHtml}
                        <span class="divisor-foco" aria-hidden="true"></span>
                        <nav class="breadcrumb-foco" aria-label="Navegação do curso">
                            <a href="area-aluno.html" class="breadcrumb-link-foco">Área do Aluno</a>
                            <span class="breadcrumb-sep-foco" aria-hidden="true">›</span>
                            <span id="breadcrumb-curso" class="breadcrumb-atual-foco">Fundamentos do Desenho</span>
                        </nav>
                    </div>

                    <div class="acoes-nav-logado">
                        <div class="progresso-header-foco" aria-label="Progresso geral do curso">
                            <div class="progresso-foco-textos">
                                <span class="progresso-foco-label">Progresso Geral</span>
                                <strong id="header-percent-text" class="progresso-foco-valor">${pctInicial}%</strong>
                            </div>
                            <div class="progresso-foco-trilha">
                                <div id="header-progress-bar" class="progresso-foco-fill" style="width: ${pctInicial}%"></div>
                            </div>
                        </div>

                        ${notificacoesHtml}
                        ${botaoTemaHtml}

                        <a href="area-aluno.html" class="btn-voltar-foco link-magnetico" id="btn-voltar-painel">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="19" y1="12" x2="5" y2="12"></line>
                                <polyline points="12 19 5 12 12 5"></polyline>
                            </svg>
                            <span>Voltar</span>
                        </a>
                    </div>
                </div>
            </header>
        `;
    } else {
        container.innerHTML = `
            <header class="header-logado">
                <div class="header-logado-container">
                    ${logoHtml}

                    <nav class="nav-logado" aria-label="Navegação do Aluno">
                        <a href="area-aluno.html" class="link-nav-logado link-magnetico ${isCursos ? 'ativo' : ''}">Cursos</a>
                        <a href="meu-perfil.html" class="link-nav-logado link-magnetico ${isPerfil ? 'ativo' : ''}">Meu Perfil</a>
                    </nav>

                    <div class="acoes-nav-logado">
                        ${notificacoesHtml}
                        ${botaoTemaHtml}
                        <button type="button" class="btn-sair-pill link-magnetico" id="btn-sair-logado">Sair</button>
                    </div>
                </div>
            </header>
        `;
    }

    configurarEventosMenuLogado(usuarioAtual);

    if (typeof aplicarEfeitoMagnetico === 'function') {
        aplicarEfeitoMagnetico();
    }
}

function obterChaveNotifUsuario(usuario) {
    const email = String(usuario?.email || '').toLowerCase().trim();
    return `nankim_notificacoes_${email}`;
}

function obterUsuarioLogadoAtual() {
    try {
        const sessao = JSON.parse(sessionStorage.getItem('nankim_sessao'));
        if (!sessao) return null;
        const db = JSON.parse(localStorage.getItem('nankim_db')) || [];
        return db.find((u) => String(u.email || '').toLowerCase() === String(sessao.email || '').toLowerCase()) || sessao;
    } catch (_) {
        return null;
    }
}

function garantirNotificacaoPerfil(usuario) {
    const chaveNotif = obterChaveNotifUsuario(usuario);
    let lista = [];
    try {
        lista = JSON.parse(localStorage.getItem(chaveNotif)) || [];
    } catch (_) {
        lista = [];
    }

    const perfilCompleto = Boolean(usuario.telefone && usuario.cpf && usuario.nivelArte);
    const idxPerfil = lista.findIndex((n) => n.id === 'completar-perfil');

    if (!perfilCompleto && idxPerfil === -1) {
        lista.unshift({
            id: 'completar-perfil',
            titulo: 'Complete seu perfil de artista',
            mensagem: 'Adicione seus dados e nível artístico para personalizar sua trilha e habilitar seus certificados.',
            link: 'meu-perfil.html',
            acaoTexto: 'Completar perfil agora →',
            data: new Date().toISOString(),
            lida: false
        });
        localStorage.setItem(chaveNotif, JSON.stringify(lista));
    } else if (perfilCompleto && idxPerfil !== -1) {
        lista.splice(idxPerfil, 1);
        localStorage.setItem(chaveNotif, JSON.stringify(lista));
    }

    return lista;
}

function formatarTempoNotificacao(isoDate) {
    if (!isoDate) return '';
    const diffMin = Math.floor((Date.now() - new Date(isoDate).getTime()) / 60000);
    if (diffMin < 1) return 'Agora mesmo';
    if (diffMin < 60) return `Há ${diffMin} min`;
    const diffHoras = Math.floor(diffMin / 60);
    if (diffHoras < 24) return `Há ${diffHoras}h`;
    const diffDias = Math.floor(diffHoras / 24);
    return `Há ${diffDias}d`;
}

function renderizarItensNotificacao(lista) {
    const naoLidas = lista.filter((item) => !item.lida);

    if (!naoLidas.length) {
        return `<div class="item-notificacao"><p>Você não tem novas notificações no momento.</p></div>`;
    }

    return naoLidas.map((item) => {
        const tempo = formatarTempoNotificacao(item.data);
        const destinoUrl = item.aulaId
            ? `sala-de-aula.html?aula=${encodeURIComponent(item.aulaId)}${item.abaDestino ? `&aba=${encodeURIComponent(item.abaDestino)}` : ''}`
            : (item.link || '#');

        return `
            <a href="${destinoUrl}"
               class="item-notificacao nao-lida"
               data-notif-id="${item.id}"
               data-aula-id="${item.aulaId || ''}"
               data-aba-destino="${item.abaDestino || ''}">
                <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;">
                    <strong>${item.titulo}</strong>
                    ${tempo ? `<small style="font-size:0.68rem;color:var(--texto-suave);flex-shrink:0;">${tempo}</small>` : ''}
                </div>
                <p>${item.mensagem}</p>
                ${item.acaoTexto ? `<span>${item.acaoTexto}</span>` : ''}
            </a>
        `;
    }).join('');
}

function atualizarPainelNotificacoesUI(usuarioAtual) {
    const chaveNotif = obterChaveNotifUsuario(usuarioAtual);
    let lista = [];
    try {
        lista = JSON.parse(localStorage.getItem(chaveNotif)) || [];
    } catch (_) {}

    const naoLidas = lista.filter((n) => !n.lida);
    const badge = document.getElementById('badge-notif');
    const containerLista = document.getElementById('lista-notificacoes');

    if (badge) {
        badge.textContent = String(naoLidas.length);
        badge.hidden = naoLidas.length === 0;
    }
    if (containerLista) {
        containerLista.innerHTML = renderizarItensNotificacao(naoLidas);
    }
}

window.NankimNotificacoes = {
    adicionar({ id, titulo, mensagem, link = '', aulaId = '', abaDestino = '', acaoTexto = '' }) {
        const usuario = obterUsuarioLogadoAtual();
        if (!usuario) return;

        const chaveNotif = obterChaveNotifUsuario(usuario);
        let lista = [];
        try {
            lista = JSON.parse(localStorage.getItem(chaveNotif)) || [];
        } catch (_) {}

        if (id) {
            lista = lista.filter((n) => n.id !== id);
        }

        lista.unshift({
            id: id || `notif-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
            titulo,
            mensagem,
            link,
            aulaId,
            abaDestino,
            acaoTexto,
            data: new Date().toISOString(),
            lida: false
        });

        localStorage.setItem(chaveNotif, JSON.stringify(lista.slice(0, 25)));
        atualizarPainelNotificacoesUI(usuario);
    }
};

function configurarEventosMenuLogado(usuarioAtual) {
    const btnNotif = document.getElementById('btn-notificacoes');
    const painelNotif = document.getElementById('painel-notificacoes');
    const btnMarcarLidas = document.getElementById('btn-marcar-todas-lidas');
    const listaNotifEl = document.getElementById('lista-notificacoes');
    const chaveNotif = obterChaveNotifUsuario(usuarioAtual);

    // Sincroniza notificações em tempo real se o professor responder ou resolver algo
    window.addEventListener('storage', (e) => {
        if (e.key === chaveNotif) {
            atualizarPainelNotificacoesUI(usuarioAtual);
        }
    });

    if (btnNotif && painelNotif) {
        btnNotif.addEventListener('click', (e) => {
            e.stopPropagation();
            atualizarPainelNotificacoesUI(usuarioAtual);
            const aberto = painelNotif.classList.toggle('aberto');
            btnNotif.setAttribute('aria-expanded', String(aberto));
        });

        document.addEventListener('click', (e) => {
            if (!painelNotif.contains(e.target) && !btnNotif.contains(e.target)) {
                painelNotif.classList.remove('aberto');
                btnNotif.setAttribute('aria-expanded', 'false');
            }
        });
    }

    if (listaNotifEl) {
        listaNotifEl.addEventListener('click', (e) => {
            const itemEl = e.target.closest('.item-notificacao[data-notif-id]');
            if (!itemEl) return;

            const notifId = itemEl.dataset.notifId;
            const aulaId = itemEl.dataset.aulaId;
            const abaDestino = itemEl.dataset.abaDestino;
            const href = itemEl.getAttribute('href');

            const lista = JSON.parse(localStorage.getItem(chaveNotif)) || [];
            const atualizada = lista.map((n) => (n.id === notifId ? { ...n, lida: true } : n));
            localStorage.setItem(chaveNotif, JSON.stringify(atualizada));
            atualizarPainelNotificacoesUI(usuarioAtual);

            if (aulaId && typeof carregarAula === 'function') {
                e.preventDefault();
                carregarAula(aulaId);
                if (abaDestino && typeof mudarAba === 'function') {
                    mudarAba(abaDestino);
                    setTimeout(() => {
                        document.getElementById(`conteudo-${abaDestino}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 100);
                } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
                painelNotif.classList.remove('aberto');
            } else if (!href || href === '#') {
                e.preventDefault();
            }
        });
    }

    if (btnMarcarLidas) {
        btnMarcarLidas.addEventListener('click', () => {
            const lista = JSON.parse(localStorage.getItem(chaveNotif)) || [];
            const atualizada = lista.map((n) => ({ ...n, lida: true }));
            localStorage.setItem(chaveNotif, JSON.stringify(atualizada));
            atualizarPainelNotificacoesUI(usuarioAtual);
        });
    }

    const btnSair = document.getElementById('btn-sair-logado');
    if (btnSair) {
        btnSair.addEventListener('click', () => {
            sessionStorage.removeItem('nankim_sessao');
            window.location.href = 'index.html';
        });
    }
}