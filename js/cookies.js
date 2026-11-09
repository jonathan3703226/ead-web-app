/* ==========================================================================
   NANKIM ESCOLA DE ARTE - GERENCIAMENTO DE COOKIES E LGPD
   ========================================================================== */

const cookieComponent = `
    <div id="cookie-banner" class="cookie-modal-avancado" role="dialog" aria-modal="true" aria-labelledby="cookie-titulo" style="display: none;">
        <section class="cookie-card">
            <div class="cookie-header">
                <div class="cookie-texto">
                    <h2 id="cookie-titulo">Suas preferências de cookies</h2>
                    <p>Utilizamos cookies para proporcionar uma experiência melhor na Nankim Escola de Arte. Você pode alterar sua escolha quando quiser pelo rodapé.</p>
                </div>
            </div>
            <div class="cookie-botoes">
                <button id="btn-rejeitar" type="button">Rejeitar opcionais</button>
                <button id="btn-aceitar-cookies" type="button">Aceitar todos</button>
            </div>
            <div id="cookie-detalhes" class="cookie-detalhes" hidden>
                <div class="cookie-opcao">
                    <input type="checkbox" id="chk-necessarios" checked disabled>
                    <label for="chk-necessarios"><strong>Necessários</strong><br>Essenciais para o funcionamento do site. Sempre ativos.</label>
                </div>
                <div class="cookie-opcao">
                    <input type="checkbox" id="chk-funcionais">
                    <label for="chk-funcionais"><strong>Funcionais</strong><br>Permitem lembrar suas preferências e escolhas.</label>
                </div>
                <div class="cookie-opcao">
                    <input type="checkbox" id="chk-analiticos">
                    <label for="chk-analiticos"><strong>Analíticos</strong><br>Ajudam a entender como os visitantes interagem com o site.</label>
                </div>
                <div class="cookie-opcao">
                    <input type="checkbox" id="chk-marketing">
                    <label for="chk-marketing"><strong>Marketing</strong><br>Usados para fornecer material publicitário relevante.</label>
                </div>
                <button id="btn-salvar-pref" type="button">Salvar preferências</button>
            </div>
        </section>
    </div>
`;

function gerenciarCookies() {
    // Injeta o HTML apenas se ele ainda não estiver no DOM
    if (!document.getElementById('cookie-banner')) {
        document.body.insertAdjacentHTML('beforeend', cookieComponent);
    }

    const banner = document.getElementById('cookie-banner');
    const painelDetalhes = document.getElementById('cookie-detalhes');
    const btnAceitar = document.getElementById('btn-aceitar-cookies');
    const btnRejeitar = document.getElementById('btn-rejeitar');
    const btnSalvarPref = document.getElementById('btn-salvar-pref');
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
            console.error('Não foi possível carregar as preferências de cookies:', error);
            return false;
        }
    }

    function abrirBannerInicial() {
        carregarEstadoSalvo();
        if (painelDetalhes) painelDetalhes.hidden = true;
        if (banner) banner.style.display = 'flex';
    }

    function abrirPreferenciasRodape() {
        carregarEstadoSalvo();
        if (painelDetalhes) painelDetalhes.hidden = false;
        if (banner) {
            banner.style.display = 'flex';
            btnAceitar?.focus();
        }
    }

    function salvarEFechar(funcionais, analiticos, marketing) {
        const preferencias = { funcionais, analiticos, marketing };
        localStorage.setItem('nankim_cookie_prefs', JSON.stringify(preferencias));
        if (chkFuncionais) chkFuncionais.checked = funcionais;
        if (chkAnaliticos) chkAnaliticos.checked = analiticos;
        if (chkMarketing) chkMarketing.checked = marketing;
        if (banner) banner.style.display = 'none';
        if (painelDetalhes) painelDetalhes.hidden = true;
    }

    // Exibe apenas se o usuário ainda não tiver aceito/salvo preferências
    if (!localStorage.getItem('nankim_cookie_prefs')) {
        abrirBannerInicial();
    } else {
        carregarEstadoSalvo();
    }

    // Ouvinte para o botão no rodapé "Preferências de Cookies"
    document.addEventListener('click', (event) => {
        const elemento = event.target instanceof Element ? event.target : null;
        if (!elemento) return;
        if (elemento.closest('[data-cookie-preferences]')) {
            abrirPreferenciasRodape();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && banner && banner.style.display === 'flex') {
            banner.style.display = 'none';
        }
    });

    if (btnAceitar) {
        btnAceitar.onclick = function(e) {
            e.stopPropagation();
            salvarEFechar(true, true, true);
        };
    }

    if (btnRejeitar) {
        btnRejeitar.onclick = function(e) {
            e.stopPropagation();
            salvarEFechar(false, false, false);
        };
    }

    if (btnSalvarPref) {
        btnSalvarPref.onclick = function(e) {
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