/* ==========================================================================
   MENU-ALUNO.JS - Cabeçalho Logado Integrado ao global.js (Nankim)
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

    const notificacoes = garantirNotificacaoPerfil(usuarioAtual);
    const naoLidas = notificacoes.filter((n) => !n.lida).length;

    const paginaAtual = window.location.pathname.split('/').pop() || 'area-aluno.html';
    const isCursos = paginaAtual === 'area-aluno.html' || paginaAtual === 'sala-de-aula.html';
    const isPerfil = paginaAtual === 'meu-perfil.html';

    container.innerHTML = `
        <header class="header-logado">
            <div class="header-logado-container">
                <a href="area-aluno.html" class="logo-logado" aria-label="Nankim Área do Aluno">
                    <div class="logo-icone-wrapper">
                        <img src="./assets/icons/logo.svg" alt="Nankim" class="logo-img-simbolo"
                             onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' viewBox=\\'0 0 40 40\\'><circle cx=\\'20\\' cy=\\'20\\' r=\\'18\\' fill=\\'%23f39c12\\'/><text x=\\'50%\\' y=\\'58%\\' text-anchor=\\'middle\\' fill=\\'white\\' font-size=\\'20\\' font-family=\\'Georgia\\'>N</text></svg>'">
                    </div>
                    <div class="logo-texto-wrapper">
                        <span class="logo-fixo">Nankim</span>
                        <span class="logo-expansivel">Art School</span>
                    </div>
                </a>

                <nav class="nav-logado" aria-label="Navegação do Aluno">
                    <a href="area-aluno.html" class="link-nav-logado link-magnetico ${isCursos ? 'ativo' : ''}">Cursos</a>
                    <a href="meu-perfil.html" class="link-nav-logado link-magnetico ${isPerfil ? 'ativo' : ''}">Meu Perfil</a>
                </nav>

                <div class="acoes-nav-logado">
                    <!-- Notificações -->
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

                    <!-- Botão Tema Claro / Escuro (usa o mesmo id #btn-toggle-tema do global.js) -->
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

                    <!-- Botão Sair -->
                    <button type="button" class="btn-sair-pill link-magnetico" id="btn-sair-logado">Sair</button>
                </div>
            </div>
        </header>
    `;

    configurarEventosMenuLogado(usuarioAtual);

    // Reutiliza a função oficial e sutil do global.js (MAX_X = 7, MAX_Y = 5)
    if (typeof aplicarEfeitoMagnetico === 'function') {
        aplicarEfeitoMagnetico();
    }
}

function garantirNotificacaoPerfil(usuario) {
    const chaveNotif = `nankim_notificacoes_${String(usuario.email || '').toLowerCase()}`;
    let lista = [];
    try {
        lista = JSON.parse(localStorage.getItem(chaveNotif)) || [];
    } catch (_) {
        lista = [];
    }

    const perfilCompleto = Boolean(usuario.telefone && usuario.cpf && usuario.nivelArte);
    const jaExiste = lista.some((n) => n.id === 'completar-perfil');

    if (!perfilCompleto && !jaExiste) {
        lista.unshift({
            id: 'completar-perfil',
            titulo: 'Complete seu perfil de artista',
            mensagem: 'Adicione seus dados e nível artístico para personalizar sua trilha e habilitar seus certificados.',
            link: 'meu-perfil.html',
            acaoTexto: 'Completar perfil agora →',
            lida: false
        });
        localStorage.setItem(chaveNotif, JSON.stringify(lista));
    }

    return lista;
}

function renderizarItensNotificacao(lista) {
    if (!lista.length) {
        return `<div class="item-notificacao"><p>Você não tem novas notificações no momento.</p></div>`;
    }

    return lista.map((item) => `
        <a href="${item.link || 'meu-perfil.html'}" class="item-notificacao ${item.lida ? '' : 'nao-lida'}" data-notif-id="${item.id}">
            <strong>${item.titulo}</strong>
            <p>${item.mensagem}</p>
            ${item.acaoTexto ? `<span>${item.acaoTexto}</span>` : ''}
        </a>
    `).join('');
}

function configurarEventosMenuLogado(usuarioAtual) {
    const btnNotif = document.getElementById('btn-notificacoes');
    const painelNotif = document.getElementById('painel-notificacoes');
    const btnMarcarLidas = document.getElementById('btn-marcar-todas-lidas');
    const badge = document.getElementById('badge-notif');
    const chaveNotif = `nankim_notificacoes_${String(usuarioAtual.email || '').toLowerCase()}`;

    if (btnNotif && painelNotif) {
        btnNotif.addEventListener('click', (e) => {
            e.stopPropagation();
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

    if (btnMarcarLidas) {
        btnMarcarLidas.addEventListener('click', () => {
            const lista = JSON.parse(localStorage.getItem(chaveNotif)) || [];
            const atualizada = lista.map((n) => ({ ...n, lida: true }));
            localStorage.setItem(chaveNotif, JSON.stringify(atualizada));
            document.querySelectorAll('.item-notificacao.nao-lida').forEach((el) => el.classList.remove('nao-lida'));
            if (badge) badge.hidden = true;
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