/* ==========================================================================
   NANKIM ESCOLA DE ARTE - SCRIPT GLOBAL UNIFICADO
   Contém: Gerenciamento de Tema, Controle de Sessão/Modais Gerais, Menus
   e Gestão do Modal de Reportar Erro/Suporte
   ========================================================================== */

/* --------------------------------------------------------------------------
   1. GERENCIAMENTO DE TEMA (DARK / LIGHT)
   -------------------------------------------------------------------------- */
function obterOuInicializarTema() {
    let temaSalvo = localStorage.getItem('nankim_tema');

    if (!temaSalvo) {
        const sistemaEstaEmModoEscuro = window.matchMedia('(prefers-color-scheme: dark)').matches;
        temaSalvo = sistemaEstaEmModoEscuro ? 'dark' : 'light';
        localStorage.setItem('nankim_tema', temaSalvo);
    }

    return temaSalvo;
}

function aplicarTema(tema) {
    if (tema === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.removeAttribute('data-theme');
    }

    const btnTema = document.getElementById('btn-toggle-tema');
    if (btnTema) {
        btnTema.setAttribute('aria-label', tema === 'dark' ? 'Mudar para modo claro' : 'Mudar para modo escuro');
    }
}

function alternarTema() {
    const temaAtual = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const novoTema = temaAtual === 'dark' ? 'light' : 'dark';

    localStorage.setItem('nankim_tema', novoTema);
    aplicarTema(novoTema);
}

// Aplicação imediata do tema para evitar oscilação de cor ao carregar a página
aplicarTema(obterOuInicializarTema());


/* --------------------------------------------------------------------------
   2. GERENCIAMENTO DE SESSÃO E MODAIS GERAIS
   -------------------------------------------------------------------------- */
function obterAlunoLogado() {
    try {
        const sessao = JSON.parse(sessionStorage.getItem('nankim_sessao') || 'null');
        if (!sessao || sessao.logado !== true || !sessao.email) return null;

        const usuarios = JSON.parse(localStorage.getItem('nankim_db') || '[]');
        if (!Array.isArray(usuarios)) {
            throw new TypeError('O cadastro local precisa ser uma lista.');
        }

        return usuarios.find((conta) =>
            conta.email.toLowerCase() === String(sessao.email).toLowerCase()
        ) || null;
    } catch (error) {
        console.error('Não foi possível verificar a sessão do menu:', error);
        return null;
    }
}

function fecharMenuConta() {
    const botao = document.querySelector('[data-account-menu][aria-expanded="true"]');
    if (botao) botao.setAttribute('aria-expanded', 'false');

    const opcoes = document.getElementById('menu-conta-opcoes');
    if (opcoes) opcoes.hidden = true;
}

function abrirModal(modalId) {
    if (modalId === 'termos') return; // O termos.js trata o modal dele sozinho
    const modal = document.getElementById(`modal-${modalId}`);
    if (modal) {
        modal.style.display = 'flex';
        modal.classList.add('ativo');
        modal.setAttribute('aria-hidden', 'false');

        // Reseta visual se for o modal de reportar erro
        if (modalId === 'reportar-erro') {
            const formWrapper = document.getElementById('reportar-erro-form-wrapper');
            const sucessoWrapper = document.getElementById('reportar-erro-sucesso');
            const form = document.getElementById('form-reportar-erro');

            if (formWrapper) formWrapper.style.display = 'block';
            if (sucessoWrapper) sucessoWrapper.style.display = 'none';
            if (form) form.reset();
        }
    }
}

function fecharModal(modalId) {
    if (modalId === 'termos') return;
    const modal = document.getElementById(`modal-${modalId}`);
    if (modal) {
        modal.style.display = 'none';
        modal.classList.remove('ativo');
        modal.setAttribute('aria-hidden', 'true');
    }
}


/* --------------------------------------------------------------------------
   3. EFEITOS VISUAIS E INTERAÇÕES (LINK MAGNÉTICO CORRIGIDO)
   -------------------------------------------------------------------------- */
function aplicarEfeitoMagnetico() {
    const elementos = document.querySelectorAll('.link-magnetico, .logo-magnetico');

    elementos.forEach((el) => {
        // Evita duplicar listeners
        if (el.getAttribute('data-magnetico-ativo')) return;
        el.setAttribute('data-magnetico-ativo', 'true');

        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            el.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = 'translate(0px, 0px)';
        });
    });
}


/* --------------------------------------------------------------------------
   4. INJEÇÃO DINÂMICA DO MENU E RODAPÉ
   -------------------------------------------------------------------------- */
function injetarMenuERodape() {
    const header = document.getElementById('header-container');
    const footer = document.getElementById('footer-container');

    if (header) {
        header.innerHTML = `
<header class="menu-global">
    <a class="logo" href="index.html" aria-label="Nankim Escola de Arte - início">
        <div class="logo-icone-wrapper">
            <img src="./assets/icons/logo.svg" alt="Selo Nankim" class="logo-img-simbolo" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' viewBox=\\'0 0 40 40\\'><circle cx=\\'20\\' cy=\\'20\\' r=\\'18\\' fill=\\'%23b33f30\\'/><text x=\\'50%\\' y=\\'58%\\' text-anchor=\\'middle\\' fill=\\'white\\' font-size=\\'20\\' font-family=\\'Georgia\\'>N</text></svg>'">
        </div>
        <div class="logo-texto-wrapper">
            <span class="logo-fixo">Nankim</span>
            <span class="logo-expansivel">Art School</span>
        </div>
    </a>

    <button class="btn-mobile" aria-label="Abrir menu" aria-expanded="false" type="button">
        <span></span>
        <span></span>
        <span></span>
    </button>
    <nav>
        <a href="quem-somos.html" class="link-magnetico"><span class="dot-hover"></span>Quem Somos</a>
        <a href="cursos.html" class="link-magnetico"><span class="dot-hover"></span>Cursos</a>
        <a href="contato.html" class="link-magnetico"><span class="dot-hover"></span>Contato</a>
        
        <button id="btn-toggle-tema" class="btn-toggle-tema link-magnetico" type="button" aria-label="Alternar Tema">
            <span class="icone-sol">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
            </span>
            <span class="icone-lua">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            </span>
        </button>

        <button data-modal="login" class="btn-login link-magnetico">Login</button>
    </nav>
</header>
`;

        const botaoMenu = header.querySelector('.btn-mobile');
        const navegacao = header.querySelector('.menu-global nav');
        const paginaAtual = window.location.pathname.split('/').pop() || 'index.html';

        navegacao.querySelectorAll('a[href]').forEach((link) => {
            if (link.getAttribute('href') === paginaAtual) {
                link.classList.add('pagina-ativa');
                link.setAttribute('aria-current', 'page');
            }
        });

        botaoMenu.addEventListener('click', () => {
            const menuAberto = navegacao.classList.toggle('menu-aberto');
            botaoMenu.setAttribute('aria-expanded', String(menuAberto));
            botaoMenu.setAttribute('aria-label', menuAberto ? 'Fechar menu' : 'Abrir menu');
        });

        const btnTema = document.getElementById('btn-toggle-tema');
        if (btnTema) {
            btnTema.addEventListener('click', alternarTema);
        }
    }

    if (footer) {
        footer.innerHTML = `
            <footer class="rodape-global">
                <div class="rodape-container">
                    
                    <div class="rodape-superior">
                        <!-- Canto Direito: Redes Sociais com Efeito Magnético e Descrição -->
                        <div class="rodape-col-dir">
                            <div class="rodape-sociais">
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="link-magnetico" aria-label="Instagram">
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                                </a>
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" class="link-magnetico" aria-label="Facebook">
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                                </a>
                                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" class="link-magnetico" aria-label="TikTok">
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.04.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v7.2c0 1.96-.5 3.96-1.74 5.48-1.5 1.83-3.9 2.85-6.26 2.6-2.9-.3-5.32-2.35-6.13-5.14-.94-3.23.49-6.84 3.4-8.47 1.25-.7 2.68-1.04 4.12-1.04v4.06c-1.2.03-2.42.4-3.24 1.3-.96 1.06-1.15 2.68-.56 3.95.53 1.14 1.73 1.93 3.01 2.02 1.8.12 3.53-1 3.94-2.73.17-.72.21-1.48.21-2.22V.02h3.24z"/></svg>
                                </a>
                                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" class="link-magnetico" aria-label="YouTube">
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.501 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.377.55 9.377.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                                </a>
                            </div>
                            <p class="rodape-desc-escola">A Nankim é a escola de artes onde o seu sonho ganha traço. Desenvolvemos um ecossistema de ensino organizado para guiar você do primeiro esboço ao nível profissional.</p>
                        </div>
                    </div>
                    
                    <!-- Linha Inferior: Botão de Reportar Erro Atualizado para Abrir o Modal -->
                    <div class="rodape-inferior">
                        <p class="rodape-copyright">&copy; 2026 equipe rocket. Todos os direitos reservados.</p>
                        <div class="rodape-links-legais">
                            <button type="button" class="link-preferencias-cookies link-magnetico" data-modal="reportar-erro" style="display: inline-flex; align-items: center; gap: 5px; background: none; border: none; cursor: pointer;">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                                Reportar Erro / Suporte
                            </button>
                            <button type="button" class="link-preferencias-cookies link-magnetico" data-modal="termos">Termos de Uso e Política de Privacidade</button>
                            <button type="button" class="link-preferencias-cookies link-magnetico" data-cookie-preferences>Preferências de Cookies</button>
                        </div>
                    </div>
                    
                </div>
            </footer>
        `;
    }

    // Aplica o efeito magnético a todos os elementos injetados
    aplicarEfeitoMagnetico();
}


/* --------------------------------------------------------------------------
   5. OUVINTES DE EVENTOS (LISTENERS GLOBAIS)
   -------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
    injetarMenuERodape();
    aplicarEfeitoMagnetico();
});

window.addEventListener('scroll', () => {
    const nav = document.querySelector('.menu-global');
    if (nav) {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }
});

// Manipulador Único de Cliques Globais
document.addEventListener('click', (event) => {
    const alvo = event.target instanceof Element ? event.target : null;
    if (!alvo) return;

    // Rola suavemente até o topo ao clicar na Logo estando na Home
    const logoLink = alvo.closest('.menu-global .logo');
    if (logoLink) {
        const caminhoAtual = window.location.pathname.split('/').pop() || 'index.html';
        if (caminhoAtual === 'index.html' || caminhoAtual === '') {
            event.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
    }

    // Menu da Conta
    const botaoConta = alvo.closest('[data-account-menu]');
    if (botaoConta) {
        const aberto = botaoConta.getAttribute('aria-expanded') === 'true';
        botaoConta.setAttribute('aria-expanded', String(!aberto));
        const opcoes = document.getElementById('menu-conta-opcoes');
        if (opcoes) opcoes.hidden = aberto;
        return;
    }

    // Abertura de Modais Genéricos (Login, Cadastro, Reportar Erro, etc)
    const botaoAbrir = alvo.closest('[data-modal]');
    if (botaoAbrir && botaoAbrir.getAttribute('data-modal') !== 'termos') {
        event.preventDefault();
        if (botaoAbrir.hasAttribute('data-account-switch')) {
            fecharMenuConta();
        }

        const modalId = botaoAbrir.getAttribute('data-modal');
        abrirModal(modalId);

        if (botaoAbrir.getAttribute('data-aba') === 'cadastro') {
            const btnAlternar = document.querySelector('#modal-login .alternar-cadastro button, #modal-login [data-trocar-aba="cadastro"]');
            if (btnAlternar) btnAlternar.click();
        }
        return;
    }

    // Fechamento de Modais (por atributo data-close ou data-fechar-modal)
    const botaoFechar = alvo.closest('[data-close], [data-fechar-modal]');
    if (botaoFechar) {
        const attrClose = botaoFechar.getAttribute('data-close');
        if (attrClose && attrClose !== 'termos') {
            fecharModal(attrClose);
            return;
        }

        // Fechamento genérico encontrando a overlay pai
        const modalPai = botaoFechar.closest('.modal, .modal-overlay');
        if (modalPai && modalPai.id !== 'modal-termos') {
            modalPai.style.display = 'none';
            modalPai.classList.remove('ativo');
            modalPai.setAttribute('aria-hidden', 'true');
            return;
        }
    }

    if (!alvo.closest('.menu-conta')) {
        fecharMenuConta();
    }
});

// Fechamento ao clicar na área externa (Overlay) dos modais
document.addEventListener('mousedown', (event) => {
    if (event.target instanceof Element && (event.target.classList.contains('modal') || event.target.classList.contains('modal-overlay')) && event.target.id !== 'modal-termos') {
        event.target.style.display = 'none';
        event.target.classList.remove('ativo');
        event.target.setAttribute('aria-hidden', 'true');
    }
});

// Simulação de Envio do Formulário de Reportar Erro
document.addEventListener('submit', (e) => {
    if (e.target && e.target.id === 'form-reportar-erro') {
        e.preventDefault();

        const formWrapper = document.getElementById('reportar-erro-form-wrapper');
        const sucessoWrapper = document.getElementById('reportar-erro-sucesso');

        if (formWrapper && sucessoWrapper) {
            formWrapper.style.display = 'none';
            sucessoWrapper.style.display = 'block';
        }
    }
});