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

const termosComponent = `
<div id="modal-termos" class="modal" role="dialog" aria-modal="true" aria-labelledby="termos-titulo" aria-hidden="true">
    <article class="modal-content modal-largo termos-card">
        <button class="close-btn" type="button" data-close="termos" aria-label="Fechar termos">&times;</button>
        <header class="termos-cabecalho">
            <p class="termos-eyebrow">Nankim Escola de Arte</p>
            <h2 id="termos-titulo">Termos de Uso e Política de Privacidade</h2>
        </header>
        <div class="conteudo-scroll" tabindex="0" aria-label="Conteúdo dos termos">
            <section><h3>1. Aceitação dos Termos</h3><p>Ao acessar ou utilizar os serviços da Nankim Escola de Arte, você declara ter lido, compreendido e concordado com estes Termos de Uso e com esta política. Caso não concorde, não utilize a plataforma.</p></section>
            <section><h3>2. Cadastro e Responsabilidades</h3><p>Você se compromete a fornecer informações verdadeiras, manter seus dados atualizados e proteger a confidencialidade da conta. Como este protótipo utiliza armazenamento local, não utilize dados reais sensíveis ou senhas reais.</p></section>
            <section><h3>3. Propriedade Intelectual</h3><p>Vídeos, apostilas, imagens, metodologias e demais conteúdos são protegidos por direitos autorais e pertencem à Nankim ou a seus titulares. É proibida a cópia, redistribuição, gravação ou comercialização não autorizada.</p><p>As criações enviadas pelo aluno permanecem de sua autoria. Sua divulgação exige autorização prévia do titular.</p></section>
            <section><h3>4. Dados pessoais tratados</h3><p>Em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 – LGPD), podemos tratar dados de identificação e contato, como nome e e-mail, além de informações fornecidas em formulários, preferências de conta e registros necessários ao funcionamento.</p></section>
            <section><h3>5. Finalidades, bases legais e compartilhamento</h3><p>Os dados podem ser utilizados para criar e administrar contas, prestar suporte, responder solicitações, demonstrar funcionalidades, cumprir obrigações legais, prevenir fraudes e melhorar a experiência. O compartilhamento ocorre somente com prestadores necessários, autoridades quando houver obrigação legal ou consentimento específico.</p></section>
            <section><h3>6. Cookies e preferências</h3><p>Cookies necessários podem ser essenciais ao funcionamento. Recursos opcionais dependem das preferências escolhidas pelo usuário. As opções podem ser alteradas pelo botão de Preferências de Cookies disponível no rodapé.</p></section>
            <section><h3>7. Armazenamento e segurança</h3><p>Neste protótipo, informações de demonstração são armazenadas localmente no navegador. A aplicação não oferece os controles de segurança de um ambiente de produção.</p></section>
            <section><h3>8. Direitos do titular</h3><p>Nos termos da LGPD, você pode solicitar confirmação e acesso aos dados, correção, anonimização, portabilidade, eliminação, informação sobre compartilhamentos, revogação do consentimento e revisão de decisões automatizadas.</p></section>
            <section><h3>9. Pagamentos, cancelamento e reembolso</h3><p>Esta versão demonstra o fluxo de matrícula e não processa cobranças. Em uma contratação real, valor, periodicidade, prazo, cancelamento e reembolso devem ser informados antes da confirmação da compra.</p></section>
            <section><h3>10. Conduta e alterações</h3><p>Os usuários devem respeitar colegas, instrutores e participantes. Assédio, discriminação, pirataria ou uso fraudulento podem resultar em suspensão. Estes termos podem ser atualizados.</p></section>
            <hr><p><small><em>Última atualização: 27 de outubro de 2026. Versão front-end para fins acadêmicos.</em></small></p>
        </div>
        <footer class="termos-acoes"><button type="button" class="termos-btn-concordar" data-agree-terms>Concordar e fechar</button></footer>
    </article>
</div>`;

let elementoTermosAnterior = null;

function atualizarBloqueioRolagemGlobal() {
    const cookieAberto = document.getElementById('cookie-banner')?.style.display === 'flex';
    const termosAberto = document.getElementById('modal-termos')?.style.display === 'flex';
    document.body.classList.toggle('modal-aberto', Boolean(cookieAberto || termosAberto));
}

function injetarModalTermos() {
    document.getElementById('modal-termos')?.remove();
    document.body.insertAdjacentHTML('beforeend', termosComponent);
}

function abrirModal(modalId) {
    const modal = document.getElementById(`modal-${modalId}`);
    if (!modal) return;
    if (modalId === 'termos') elementoTermosAnterior = document.activeElement;
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');
    atualizarBloqueioRolagemGlobal();
    if (modalId === 'termos') modal.querySelector('.close-btn')?.focus();
}

function fecharModal(modalId, concordou = false) {
    const modal = document.getElementById(`modal-${modalId}`);
    if (!modal) return;
    if (modalId === 'termos' && concordou) {
        localStorage.setItem('nankim_terms_acceptance', JSON.stringify({ accepted: true, date: new Date().toISOString() }));
    }
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    atualizarBloqueioRolagemGlobal();
    if (modalId === 'termos') elementoTermosAnterior?.focus();
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
                            <p class="rodape-desc-escola">A Nankim é uma escola de artes que tem como principal objetivo contribuir com o desenvolvimento artístico, cultural e intelectual de todos aqueles que se reconhecem através da arte.</p>
                        </div>
                    </div>
                    
                    <!-- Linha Inferior: Copyright e Links Legais -->
                    <div class="rodape-inferior">
                        <p class="rodape-copyright">&copy; 2026 equipe rocket. Todos os direitos reservados.</p>
                        <div class="rodape-links-legais">
                            <button type="button" class="link-preferencias-cookies link-magnetico" data-modal="termos">Termos de Uso e Política de Privacidade</button>
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

    const botaoConcordarTermos = alvo.closest('[data-agree-terms]');
    if (botaoConcordarTermos) {
        fecharModal('termos', true);
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
        fecharModal(event.target.id.replace('modal-', ''));
    }
});

document.addEventListener('keydown', (event) => {
    const modal = document.getElementById('modal-termos');
    if (!modal || modal.style.display !== 'flex') return;

    if (event.key === 'Escape') {
        fecharModal('termos');
        return;
    }

    if (event.key === 'Tab') {
        const elementos = Array.from(modal.querySelectorAll('button:not([disabled]), [tabindex="0"]'));
        if (!elementos.length) return;
        const primeiro = elementos[0];
        const ultimo = elementos[elementos.length - 1];
        if (event.shiftKey && document.activeElement === primeiro) {
            event.preventDefault();
            ultimo.focus();
        } else if (!event.shiftKey && document.activeElement === ultimo) {
            event.preventDefault();
            primeiro.focus();
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    injetarModalTermos();
    injetarMenuERodape();
});

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