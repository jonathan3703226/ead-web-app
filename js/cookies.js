// Estilos injetados diretamente para garantir a renderização e interatividade
const cookieStyles = `
<style id="cookie-styles">
    .cookie-modal-avancado {
        position: fixed !important;
        bottom: 24px !important;
        left: 0 !important;
        right: 0 !important;
        z-index: 999999 !important;
        display: flex !important;
        justify-content: center !important;
        align-items: flex-end !important;
        padding: 0 16px !important;
        pointer-events: none !important;
    }

    .cookie-modal-avancado[style*="display: none"] {
        display: none !important;
    }

    .cookie-card {
        pointer-events: auto !important;
        position: relative !important;
        z-index: 1000000 !important;
        width: min(600px, 100%) !important;
        max-height: 85vh !important;
        overflow-y: auto !important;
        padding: 1.6rem 2rem !important;
        border-radius: 20px !important;
        background-color: #ffffff !important;
        color: #111111 !important;
        border: 1px solid rgba(0, 0, 0, 0.12) !important;
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.35) !important;
        font-family: 'Montserrat', sans-serif !important;
        animation: cookieSubir 0.35s cubic-bezier(0.16, 1, 0.3, 1) !important;
    }

    /* Modo Escuro */
    :root[data-theme="dark"] .cookie-card {
        background-color: #181818 !important;
        color: #ffffff !important;
        border-color: rgba(255, 255, 255, 0.15) !important;
    }

    .cookie-texto h2 {
        margin: 0 0 0.5rem !important;
        color: inherit !important;
        font-size: 1.2rem !important;
        font-weight: 800 !important;
    }

    .cookie-texto p {
        margin: 0 !important;
        color: inherit !important;
        opacity: 0.85 !important;
        font-size: 0.9rem !important;
        line-height: 1.5 !important;
    }

    .cookie-botoes {
        display: flex !important;
        align-items: center !important;
        justify-content: flex-end !important;
        gap: 0.75rem !important;
        margin-top: 1.4rem !important;
        pointer-events: auto !important;
    }

    .cookie-botoes button,
    #btn-salvar-pref {
        font-family: 'Montserrat', sans-serif !important;
        font-size: 0.85rem !important;
        font-weight: 700 !important;
        padding: 0.75rem 1.4rem !important;
        border-radius: 50px !important;
        cursor: pointer !important;
        transition: all 0.2s ease !important;
        pointer-events: auto !important;
    }

    /* Botão Rejeitar (Destaque Vermelho Nankim) */
    #btn-rejeitar {
        background-color: #b33f30 !important;
        color: #ffffff !important;
        border: 1px solid #b33f30 !important;
    }

    #btn-rejeitar:hover {
        background-color: #963225 !important;
        border-color: #963225 !important;
        transform: translateY(-2px) !important;
    }

    /* Botão Aceitar (Estilo Neutro/Outline) */
    #btn-aceitar-cookies {
        background: transparent !important;
        border: 1px solid rgba(128, 128, 128, 0.4) !important;
        color: inherit !important;
    }

    #btn-aceitar-cookies:hover {
        border-color: currentColor !important;
        background-color: rgba(128, 128, 128, 0.12) !important;
    }

    /* Painel de Opções */
    .cookie-detalhes {
        display: flex !important;
        flex-direction: column !important;
        gap: 0.75rem !important;
        margin-top: 1.2rem !important;
        padding-top: 1.2rem !important;
        border-top: 1px solid rgba(128, 128, 128, 0.2) !important;
    }

    .cookie-detalhes[hidden] {
        display: none !important;
    }

    .cookie-opcao {
        display: flex !important;
        align-items: flex-start !important;
        gap: 0.75rem !important;
        padding: 0.85rem 1rem !important;
        border-radius: 12px !important;
        background: rgba(128, 128, 128, 0.08) !important;
        border: 1px solid rgba(128, 128, 128, 0.15) !important;
    }

    .cookie-opcao input[type="checkbox"] {
        width: 18px !important;
        height: 18px !important;
        flex: 0 0 18px !important;
        margin-top: 2px !important;
        accent-color: #b33f30 !important;
        cursor: pointer !important;
    }

    .cookie-opcao label {
        color: inherit !important;
        opacity: 0.9 !important;
        font-size: 0.85rem !important;
        line-height: 1.45 !important;
        cursor: pointer !important;
    }

    .cookie-opcao label strong {
        color: inherit !important;
        opacity: 1 !important;
        font-size: 0.9rem !important;
    }

    #btn-salvar-pref {
        width: 100% !important;
        margin-top: 0.5rem !important;
        background-color: #111111 !important;
        color: #ffffff !important;
        border: 1px solid #111111 !important;
    }

    :root[data-theme="dark"] #btn-salvar-pref {
        background-color: #ffffff !important;
        color: #111111 !important;
    }

    @keyframes cookieSubir {
        from { transform: translateY(30px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }

    @media (max-width: 600px) {
        .cookie-modal-avancado {
            bottom: 12px !important;
            padding: 0 10px !important;
        }

        .cookie-botoes {
            flex-direction: column-reverse !important;
            width: 100% !important;
        }

        .cookie-botoes button {
            width: 100% !important;
        }
    }
</style>
`;

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
    if (!document.getElementById('cookie-styles')) {
        document.head.insertAdjacentHTML('beforeend', cookieStyles);
    }

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
            chkFuncionais.checked = Boolean(preferencias.funcionais);
            chkAnaliticos.checked = Boolean(preferencias.analiticos);
            chkMarketing.checked = Boolean(preferencias.marketing);
            return true;
        } catch (error) {
            console.error('Não foi possível carregar as preferências de cookies:', error);
            return false;
        }
    }

    function abrirBannerInicial() {
        carregarEstadoSalvo();
        painelDetalhes.hidden = true;
        banner.style.display = 'flex';
    }

    function abrirPreferenciasRodape() {
        carregarEstadoSalvo();
        painelDetalhes.hidden = false;
        banner.style.display = 'flex';
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
    }

    if (!localStorage.getItem('nankim_cookie_prefs')) {
        abrirBannerInicial();
    } else {
        carregarEstadoSalvo();
    }

    document.addEventListener('click', (event) => {
        const elemento = event.target instanceof Element ? event.target : null;
        if (!elemento) return;
        if (elemento.closest('[data-cookie-preferences]')) {
            abrirPreferenciasRodape();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && banner.style.display === 'flex') {
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
            salvarEFechar(chkFuncionais.checked, chkAnaliticos.checked, chkMarketing.checked);
        };
    }
}

document.addEventListener('DOMContentLoaded', gerenciarCookies);