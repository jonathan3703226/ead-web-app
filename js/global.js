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
                    <span class="logo-selo" aria-hidden="true">N</span>
                    <span>Nankim <small>Escola de Arte</small></span>
                </a>
                <button class="btn-mobile" aria-label="Abrir menu" aria-expanded="false" type="button">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <nav>
                    <a href="index.html">Home</a>
                    <a href="quem-somos.html">Quem Somos</a>
                    <a href="cursos.html">Cursos</a>
                    <a href="contato.html">Contato</a>
                    <a href="area-aluno.html">Área do Aluno</a>
                    <button data-modal="login" class="btn-login">Login</button>
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
            botaoConta.className = 'btn-login usuario-menu';
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