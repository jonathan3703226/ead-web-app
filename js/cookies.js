/* ==========================================================================
   NANKIM ESCOLA DE ARTE - BANNER DISCRETO INICIAL + MODAL DE PREFERÊNCIAS
   ========================================================================== */

const cookieInitialBar = `
    <aside id="cookie-banner-inicial" class="cookie-barra-discreta" role="region" aria-label="Aviso de cookies" style="display: none;">
        <div class="cookie-barra-conteudo">
            <p class="cookie-barra-texto">
                Usamos cookies para melhorar sua experiência na <strong>Nankim Escola de Arte</strong>.
                <button type="button" id="btn-abrir-personalizar-cookie" class="cookie-link-personalizar">Personalizar</button>
            </p>
            <div class="cookie-barra-acoes">
                <button id="btn-barra-rejeitar" type="button" class="cookie-btn-sec">Rejeitar opcionais</button>
                <button id="btn-barra-aceitar" type="button" class="cookie-btn-pri">Aceitar todos</button>
            </div>
        </div>
    </aside>
`;

const cookieModalComponent = `
    <div id="cookie-banner" class="cookie-modal-avancado" role="dialog" aria-modal="true" aria-labelledby="cookie-titulo" style="display: none;">
        <section class="cookie-card">
            <button type="button" class="close-btn cookie-close-btn" id="btn-fechar-cookies-x" aria-label="Fechar preferências">&times;</button>
            <div class="cookie-header">
                <div class="cookie-texto">
                    <span class="modal-eyebrow-padrao">Privacidade & LGPD</span>
                    <h2 id="cookie-titulo">Preferências de Cookies</h2>
                    <p>Escolha quais categorias de cookies você autoriza na Nankim Escola de Arte. Você pode alterar suas escolhas a qualquer momento pelo rodapé.</p>
                </div>
            </div>

            <div id="cookie-detalhes" class="cookie-detalhes">
                <div class="cookie-opcao">
                    <input type="checkbox" id="chk-necessarios" checked disabled>
                    <label for="chk-necessarios"><strong>Necessários</strong><br>Essenciais para o funcionamento do site. Sempre ativos.</label>
                </div>
                <div class="cookie-opcao">
                    <input type="checkbox" id="chk-funcionais">
                    <label for="chk-funcionais"><strong>Funcionais</strong><br>Permitem lembrar suas preferências e escolhas de tema.</label>
                </div>
                <div class="cookie-opcao">
                    <input type="checkbox" id="chk-analiticos">
                    <label for="chk-analiticos"><strong>Analíticos</strong><br>Ajudam a entender como os visitantes interagem com a plataforma.</label>
                </div>
                <div class="cookie-opcao">
                    <input type="checkbox" id="chk-marketing">
                    <label for="chk-marketing"><strong>Marketing</strong><br>Usados para fornecer comunicações e conteúdos relevantes.</label>
                </div>
            </div>

            <div class="cookie-botoes">
                <button id="btn-rejeitar" type="button">Rejeitar opcionais</button>
                <button id="btn-salvar-pref" type="button">Salvar preferências</button>
                <button id="btn-aceitar-cookies" type="button">Aceitar todos</button>
            </div>
        </section>
    </div>
`;

function gerenciarCookies() {
    if (!document.getElementById('cookie-banner-inicial')) {
        document.body.insertAdjacentHTML('beforeend', cookieInitialBar);
    }
    if (!document.getElementById('cookie-banner')) {
        document.body.insertAdjacentHTML('beforeend', cookieModalComponent);
    }

    const barraInicial = document.getElementById('cookie-banner-inicial');
    const modalPreferencias = document.getElementById('cookie-banner');

    const btnBarraAceitar = document.getElementById('btn-barra-aceitar');
    const btnBarraRejeitar = document.getElementById('btn-barra-rejeitar');
    const btnPersonalizar = document.getElementById('btn-abrir-personalizar-cookie');

    const btnAceitar = document.getElementById('btn-aceitar-cookies');
    const btnRejeitar = document.getElementById('btn-rejeitar');
    const btnSalvarPref = document.getElementById('btn-salvar-pref');
    const btnFecharX = document.getElementById('btn-fechar-cookies-x');

    const chkFuncionais = document.getElementById('chk-funcionais');
    const chkAnaliticos = document.getElementById('chk-analiticos');
    const chkMarketing = document.getElementById('chk-marketing');

    function carregarEstadoSalvo() {
        try {
            const preferencias = JSON.parse(localStorage.getItem('nankim_cookie_prefs'));
            if (!preferencias) return false;
            if (chkFuncionais) chkFuncionais.checked = Boolean(preferencias.funcionais);
            if (chkAnaliticos) chkAnaliticos.checked = Boolean(preferencias.analiticos);
            if (chkMarketing) chkMarketing.checked = Boolean(preferencias.marketing);
            return true;
        } catch (error) {
            return false;
        }
    }

    function abrirBarraDiscreta() {
        if (barraInicial) barraInicial.style.display = 'flex';
    }

    function abrirModalPreferencias() {
        carregarEstadoSalvo();
        if (barraInicial) barraInicial.style.display = 'none';
        if (modalPreferencias) {
            modalPreferencias.style.display = 'flex';
            const card = modalPreferencias.querySelector('.cookie-card');
            if (card) card.scrollTop = 0;
            btnFecharX?.focus({ preventScroll: true });
        }
    }

    function fecharModalPreferencias() {
        if (modalPreferencias) modalPreferencias.style.display = 'none';
        if (!localStorage.getItem('nankim_cookie_prefs')) {
            abrirBarraDiscreta();
        }
    }

    function salvarEFechar(funcionais, analiticos, marketing) {
        const preferencias = { funcionais, analiticos, marketing };
        localStorage.setItem('nankim_cookie_prefs', JSON.stringify(preferencias));
        if (chkFuncionais) chkFuncionais.checked = funcionais;
        if (chkAnaliticos) chkAnaliticos.checked = analiticos;
        if (chkMarketing) chkMarketing.checked = marketing;
        if (barraInicial) barraInicial.style.display = 'none';
        if (modalPreferencias) modalPreferencias.style.display = 'none';
    }

    // Na primeira visita mostra apenas a barra discreta na base (sem bloquear a tela)
    if (!localStorage.getItem('nankim_cookie_prefs')) {
        abrirBarraDiscreta();
    } else {
        carregarEstadoSalvo();
    }

    // Botão no rodapé "Preferências de Cookies"
    document.addEventListener('click', (event) => {
        const elemento = event.target instanceof Element ? event.target : null;
        if (!elemento) return;
        if (elemento.closest('[data-cookie-preferences]')) {
            event.preventDefault();
            abrirModalPreferencias();
        }
    });

    if (btnPersonalizar) {
        btnPersonalizar.onclick = () => abrirModalPreferencias();
    }

    if (btnBarraAceitar) {
        btnBarraAceitar.onclick = () => salvarEFechar(true, true, true);
    }

    if (btnBarraRejeitar) {
        btnBarraRejeitar.onclick = () => salvarEFechar(false, false, false);
    }

    if (modalPreferencias) {
        modalPreferencias.addEventListener('click', (e) => {
            if (e.target === modalPreferencias) fecharModalPreferencias();
        });
    }

    if (btnFecharX) {
        btnFecharX.onclick = () => fecharModalPreferencias();
    }

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modalPreferencias && modalPreferencias.style.display === 'flex') {
            fecharModalPreferencias();
        }
    });

    if (btnAceitar) {
        btnAceitar.onclick = (e) => {
            e.stopPropagation();
            salvarEFechar(true, true, true);
        };
    }

    if (btnRejeitar) {
        btnRejeitar.onclick = (e) => {
            e.stopPropagation();
            salvarEFechar(false, false, false);
        };
    }

    if (btnSalvarPref) {
        btnSalvarPref.onclick = (e) => {
            e.stopPropagation();
            salvarEFechar(
                chkFuncionais ? chkFuncionais.checked : false,
                chkAnaliticos ? chkAnaliticos.checked : false,
                chkMarketing ? chkMarketing.checked : false
            );
        };
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', gerenciarCookies);
} else {
    gerenciarCookies();
}