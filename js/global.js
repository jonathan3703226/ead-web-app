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

    if (header) {
        header.innerHTML = `
    <header class="menu-global">
        <a class="logo" href="index.html" aria-label="Nankim Escola de Arte - início">
            <div class="logo-icone-wrapper">
                <img src="./assets/icons/logo.svg" alt="Selo Nankim" class="logo-img-simbolo" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 40 40\'><circle cx=\'20\' cy=\'20\' r=\'18\' fill=\'%23b33f30\'/><text x=\'50%\' y=\'58%\' text-anchor=\'middle\' fill=\'white\' font-size=\'20\' font-family=\'Georgia\'>N</text></svg>'">
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
            <button data-modal="login" class="btn-login link-magnetico">Login</button>
        </nav>
    </header>
`;
        const botaoMenu = header.querySelector('.btn-mobile');
        const navegacao = header.querySelector('.menu-global nav');
        const botaoLogin = navegacao.querySelector('.btn-login');
        const paginaAtual = window.location.pathname.split('/').pop() || 'index.html';
        const aluno = obterAlunoLogado();

        if (aluno) {
            const nome = aluno.nome.trim().split(/\s+/)[0];
            const menuConta = document.createElement('div');
            menuConta.className = 'menu-conta';

            const botaoConta = document.createElement('button');
            botaoConta.className = 'btn-login usuario-menu link-magnetico';
            botaoConta.type = 'button';
            botaoConta.dataset.accountMenu = '';
            botaoConta.setAttribute('aria-expanded', 'false');
            botaoConta.setAttribute('aria-controls', 'menu-conta-opcoes');
            botaoConta.setAttribute('aria-label', `Opções da conta de ${nome}`);
            botaoConta.textContent = nome;

            const opcoesConta = document.createElement('div');
            opcoesConta.className = 'menu-conta-opcoes';
            opcoesConta.id = 'menu-conta-opcoes';
            opcoesConta.hidden = true;

            const linkArea = document.createElement('a');
            linkArea.href = 'area-aluno.html';
            linkArea.textContent = 'Minha Área';

            const botaoTrocarConta = document.createElement('button');
            botaoTrocarConta.type = 'button';
            botaoTrocarConta.dataset.modal = 'login';
            botaoTrocarConta.dataset.accountSwitch = '';
            botaoTrocarConta.textContent = 'Trocar de conta';

            opcoesConta.append(linkArea, botaoTrocarConta);
            menuConta.append(botaoConta, opcoesConta);
            botaoLogin.replaceWith(menuConta);
        }

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

        // Inicializa o efeito magnético nos itens do menu
        aplicarEfeitoMagnetico();
    }

    if (footer) {
        footer.innerHTML = `
            <footer class="rodape-global">
                <p>&copy; 2026 Nankim Escola de Arte. Todos os direitos reservados.</p>
                <div class="rodape-links">
                    <a href="politica-privacidade.html">Termos e Políticas de Privacidade</a>
                    <button type="button" class="link-preferencias-cookies" data-cookie-preferences>Preferências de Cookies</button>
                </div>
            </footer>
        `;
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