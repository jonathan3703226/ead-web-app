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
    const modal = document.getElementById(`modal-${modalId}`);
    if (modal) modal.style.display = 'flex';
}

function fecharModal(modalId) {
    const modal = document.getElementById(`modal-${modalId}`);
    if (modal) modal.style.display = 'none';
}

function injetarMenuERodape() {
    const header = document.getElementById('header-container');
    const footer = document.getElementById('footer-container');

    // Detecta se a página atual está na pasta /pages/
    const estaEmPages = window.location.pathname.includes('/pages/');

    // Prefixo para voltar à raiz (../) se estiver dentro de /pages/
    const prefixoAssets = estaEmPages ? '../' : './';
    // Prefixo para acessar páginas internas a partir da raiz (pages/)
    const prefixoPages  = estaEmPages ? '' : 'pages/';

    // 1. INJEÇÃO DO HEADER GLOBAL
    if (header) {
        header.innerHTML = `
<header class="menu-global">
    <a class="logo" href="${prefixoAssets}index.html" aria-label="Nankim Escola de Arte - início">
        <div class="logo-icone-wrapper">
            <img src="${prefixoAssets}assets/icons/logo.svg" alt="Selo Nankim" class="logo-img-simbolo" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' viewBox=\\'0 0 40 40\\'><circle cx=\\'20\\' cy=\\'20\\' r=\\'18\\' fill=\\'%23b33f30\\'/><text x=\\'50%\\' y=\\'58%\\' text-anchor=\\'middle\\' fill=\\'white\\' font-size=\\'20\\' font-family=\\'Georgia\\'>N</text></svg>'">
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
        <a href="${prefixoPages}quem-somos.html" class="link-magnetico"><span class="dot-hover"></span>Quem Somos</a>
        <a href="${prefixoPages}cursos.html" class="link-magnetico"><span class="dot-hover"></span>Cursos</a>
        <a href="${prefixoPages}contato.html" class="link-magnetico"><span class="dot-hover"></span>Contato</a>
        <button data-modal="login" class="btn-login link-magnetico">Login</button>
    </nav>
</header>
`;

        const botaoMenu = header.querySelector('.btn-mobile');
        const navegacao = header.querySelector('.menu-global nav');
        const paginaAtual = window.location.pathname.split('/').pop() || 'index.html';

        navegacao.querySelectorAll('a[href]').forEach((link) => {
            if (link.getAttribute('href').endsWith(paginaAtual)) {
                link.classList.add('pagina-ativa');
                link.setAttribute('aria-current', 'page');
            }
        });

        if (botaoMenu && navegacao) {
            botaoMenu.addEventListener('click', () => {
                const menuAberto = navegacao.classList.toggle('menu-aberto');
                botaoMenu.setAttribute('aria-expanded', String(menuAberto));
                botaoMenu.setAttribute('aria-label', menuAberto ? 'Fechar menu' : 'Abrir menu');
            });
        }

        aplicarEfeitoMagnetico();
    }

    // 2. INJEÇÃO DO FOOTER GLOBAL
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
                    
                    <!-- Linha Inferior: Copyright e Links Legais -->
                    <div class="rodape-inferior">
                        <p class="rodape-copyright">&copy; 2026 equipe rocket. Todos os direitos reservados.</p>
                        <div class="rodape-links-legais">
                            <a href="${prefixoPages}politica-privacidade.html" class="link-magnetico">Política de uso e termos de privacidade</a>
                            <button type="button" class="link-preferencias-cookies link-magnetico" data-cookie-preferences>Preferências de Cookies</button>
                        </div>
                    </div>
                    
                </div>
            </footer>
        `;

        aplicarEfeitoMagnetico();
    }
}

// Funções para Efeito Magnético do Cursor
function aplicarEfeitoMagnetico() {
    const elementos = document.querySelectorAll('.link-magnetico, .logo-magnetico');

    elementos.forEach((el) => {
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

document.addEventListener('click', (event) => {
    const alvo = event.target instanceof Element ? event.target : null;
    if (!alvo) return;

    const botaoConta = alvo.closest('[data-account-menu]');
    if (botaoConta) {
        const aberto = botaoConta.getAttribute('aria-expanded') === 'true';
        botaoConta.setAttribute('aria-expanded', String(!aberto));
        const opcoes = document.getElementById('menu-conta-opcoes');
        if (opcoes) opcoes.hidden = aberto;
        return;
    }

    const botaoAbrir = alvo.closest('[data-modal]');
    if (botaoAbrir) {
        event.preventDefault();
        if (botaoAbrir.hasAttribute('data-account-switch')) {
            fecharMenuConta();
        }
        abrirModal(botaoAbrir.getAttribute('data-modal'));
        if (botaoAbrir.getAttribute('data-aba') === 'cadastro') {
            const btnAlternar = document.querySelector('#modal-login .alternar-cadastro button, #modal-login [data-trocar-aba="cadastro"]');
            if (btnAlternar) btnAlternar.click();
        }
        return;
    }

    const botaoFechar = alvo.closest('[data-close]');
    if (botaoFechar) {
        fecharModal(botaoFechar.getAttribute('data-close'));
        return;
    }

    if (!alvo.closest('.menu-conta')) {
        fecharMenuConta();
    }
});

document.addEventListener('mousedown', (event) => {
    if (event.target instanceof Element && event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
});

document.addEventListener('DOMContentLoaded', injetarMenuERodape);

// Efeito de transição do Menu no Scroll
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

// Rolagem suave ao clicar na logo estando na Home
document.addEventListener('click', (event) => {
    const logoLink = event.target.closest('.menu-global .logo');

    if (logoLink) {
        const caminhoAtual = window.location.pathname.split('/').pop() || 'index.html';

        if (caminhoAtual === 'index.html' || caminhoAtual === '') {
            event.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }
});
function injetarHeaderAluno() {
    const containerHeader = document.getElementById('header-aluno-container');
    if (!containerHeader) return;

    // Logo alterada de <a> para <div> (elemento apenas visual)
    containerHeader.innerHTML = `
        <header class="header-aluno">
            <div class="header-aluno-container">
                <div class="logo-aluno-wrapper">
                    <div class="logo-icone-wrapper">
                        <img src="./assets/icons/logo.svg" alt="Nankim" class="logo-img-simbolo" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' viewBox=\\'0 0 40 40\\'><circle cx=\\'20\\' cy=\\'20\\' r=\\'18\\' fill=\\'%23b33f30\\'/><text x=\\'50%\\' y=\\'58%\\' text-anchor=\'middle\\' fill=\'white\\' font-size=\'20\\' font-family=\'Georgia\\'>N</text></svg>'">
                    </div>
                    <div class="logo-texto-wrapper">
                        <span class="logo-fixo">Nankim</span>
                        <span class="logo-expansivel">Art School</span>
                    </div>
                </div>
                
                <div class="perfil-dropdown" style="position: relative;">
                    <button class="btn-perfil" id="btn-menu-perfil" type="button" aria-expanded="false">
                        <div class="avatar-aluno" id="avatar-iniciais">AL</div>
                        <span id="nome-aluno-topo">Carregando...</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="margin-left: 4px;"><path d="M6 9l6 6 6-6"/></svg>
                    </button>
                    
                    <div class="dropdown-menu" id="dropdown-perfil" style="display: none;">
                        <a href="area-aluno.html">Cursos</a>
                        <a href="meu-perfil.html">Meu Perfil</a>
                        <div class="linha-divisoria"></div>
                        <button type="button" id="btn-sair" class="btn-sair-conta">Sair da conta</button>
                    </div>
                </div>
            </div>
        </header>
    `;

    // Carrega nome e avatar da sessão
    const sessaoData = sessionStorage.getItem('nankim_sessao');
    if (sessaoData) {
        try {
            const usuarioSessao = JSON.parse(sessaoData);
            const primeiroNome = usuarioSessao.nome ? usuarioSessao.nome.split(' ')[0] : 'Aluno';

            const elNome = document.getElementById('nome-aluno-topo');
            const elAvatar = document.getElementById('avatar-iniciais');

            if (elNome) elNome.textContent = primeiroNome;
            if (elAvatar) elAvatar.textContent = primeiroNome.charAt(0).toUpperCase();
        } catch (e) { }
    }
}