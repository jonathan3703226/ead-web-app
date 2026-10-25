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
                <button id="btn-rejeitar" class="btn-outline" type="button">Rejeitar opcionais</button>
                <button id="btn-personalizar" class="btn-outline" type="button">Personalizar</button>
                <button id="btn-aceitar-cookies" type="button">Aceitar todos</button>
            </div>
            <div id="cookie-detalhes" class="cookie-detalhes">
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
    if (!document.getElementById('cookie-banner')) {
        document.body.insertAdjacentHTML('beforeend', cookieComponent);
    }

    const banner = document.getElementById('cookie-banner');
    const painelDetalhes = document.getElementById('cookie-detalhes');
    const btnAceitar = document.getElementById('btn-aceitar-cookies');
    const btnRejeitar = document.getElementById('btn-rejeitar');
    const btnPersonalizar = document.getElementById('btn-personalizar');
    const btnSalvarPref = document.getElementById('btn-salvar-pref');
    const chkFuncionais = document.getElementById('chk-funcionais');
    const chkAnaliticos = document.getElementById('chk-analiticos');
    const chkMarketing = document.getElementById('chk-marketing');

    function carregarEstadoSalvo() {
        try {
            const preferencias = JSON.parse(localStorage.getItem('nankim_cookie_prefs'));
            if (!preferencias) return false;
            chkFuncionais.checked = Boolean(preferencias.funcionais);
            chkAnaliticos.checked = Boolean(preferencias.analiticos);
            chkMarketing.checked = Boolean(preferencias.marketing);
            return true;
        } catch (error) {
            console.error('Não foi possível carregar as preferências de cookies:', error);
            return false;
        }
    }

    function abrirPreferencias() {
        carregarEstadoSalvo();
        painelDetalhes.hidden = false;
        banner.style.display = 'flex';
        document.body.classList.add('modal-aberto');
        btnAceitar.focus();
    }

    function salvarEFechar(funcionais, analiticos, marketing) {
        const preferencias = { funcionais, analiticos, marketing };
        localStorage.setItem('nankim_cookie_prefs', JSON.stringify(preferencias));
        chkFuncionais.checked = funcionais;
        chkAnaliticos.checked = analiticos;
        chkMarketing.checked = marketing;
        banner.style.display = 'none';
        painelDetalhes.hidden = true;
        document.body.classList.remove('modal-aberto');
    }

    if (!localStorage.getItem('nankim_cookie_prefs')) {
        abrirPreferencias();
    } else {
        carregarEstadoSalvo();
    }

    document.addEventListener('click', (event) => {
        const elemento = event.target instanceof Element ? event.target : null;
        if (!elemento) return;
        if (elemento.closest('[data-cookie-preferences]')) abrirPreferencias();
        if (elemento === banner) {
            banner.style.display = 'none';
            document.body.classList.remove('modal-aberto');
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && banner.style.display === 'flex') {
            banner.style.display = 'none';
            document.body.classList.remove('modal-aberto');
        }
    });

    btnAceitar.addEventListener('click', () => salvarEFechar(true, true, true));
    btnRejeitar.addEventListener('click', () => salvarEFechar(false, false, false));
    btnPersonalizar.addEventListener('click', () => {
        painelDetalhes.hidden = !painelDetalhes.hidden;
    });
    btnSalvarPref.addEventListener('click', () => {
        salvarEFechar(chkFuncionais.checked, chkAnaliticos.checked, chkMarketing.checked);
    });
}

document.addEventListener('DOMContentLoaded', gerenciarCookies);
