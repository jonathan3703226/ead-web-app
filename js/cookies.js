const cookieComponent = `
    <div id="cookie-banner" class="cookie-modal-avancado" style="display: none;">
        <div class="cookie-header">
            <div class="cookie-texto">
                <p>Utilizamos cookies para proporcionar uma experiência ótima e comunicação relevante na Nankim Escola de Arte.</p>
            </div>
            <div class="cookie-botoes">
                <button id="btn-rejeitar" class="btn-outline">Rejeitar tudo</button>
                <button id="btn-aceitar-cookies">Aceitar tudo</button>
            </div>
        </div>

        <!-- Lista de seleção (Inicia oculta) -->
        <div id="cookie-detalhes" class="cookie-detalhes" style="display: none;">
            <div class="cookie-opcao">
                <input type="checkbox" id="chk-necessarios" checked disabled>
                <label for="chk-necessarios"><strong>Necessários</strong><br>Cookies essenciais para o funcionamento do site. (Sempre ativos)</label>
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
            <button id="btn-salvar-pref" class="btn-outline" style="margin-top: 10px; width: 100%;">Salvar preferências selecionadas</button>
        </div>
    </div>

    <button id="btn-flutuante-termos" class="btn-flutuante" title="Preferências de Cookies">🍪</button>
`;

function gerenciarCookies() {
    document.body.insertAdjacentHTML('beforeend', cookieComponent);

    const banner = document.getElementById('cookie-banner');
    const painelDetalhes = document.getElementById('cookie-detalhes');
    const btnFlutuante = document.getElementById('btn-flutuante-termos');
    const btnAceitar = document.getElementById('btn-aceitar-cookies');
    const btnRejeitar = document.getElementById('btn-rejeitar');
    const btnSalvarPref = document.getElementById('btn-salvar-pref');

    const chkFuncionais = document.getElementById('chk-funcionais');
    const chkAnaliticos = document.getElementById('chk-analiticos');
    const chkMarketing = document.getElementById('chk-marketing');

    // Sincroniza a interface com o banco local
    function carregarEstadoSalvo() {
        const prefsSalvas = JSON.parse(localStorage.getItem('nankim_cookie_prefs'));
        if (prefsSalvas) {
            chkFuncionais.checked = prefsSalvas.funcionais;
            chkAnaliticos.checked = prefsSalvas.analiticos;
            chkMarketing.checked = prefsSalvas.marketing;
            return true;
        }
        return false;
    }

    // Salva no banco, fecha e reseta visualização
    function salvarEFechar(funcionais, analiticos, marketing) {
        chkFuncionais.checked = funcionais;
        chkAnaliticos.checked = analiticos;
        chkMarketing.checked = marketing;

        const preferencias = { funcionais, analiticos, marketing };
        localStorage.setItem('nankim_cookie_prefs', JSON.stringify(preferencias));

        painelDetalhes.style.display = 'none';
        banner.style.display = 'none';
        btnFlutuante.style.display = 'flex';
    }

    // Inicialização
    if (carregarEstadoSalvo()) {
        btnFlutuante.style.display = 'flex';
    } else {
        banner.style.display = 'flex';
    }

    // Aceitar tudo: SEMPRE força marcar todos os campos e salva
    btnAceitar.addEventListener('click', () => {
        salvarEFechar(true, true, true);
    });

    // Rejeitar tudo: SEMPRE força desmarcar todos os campos e salva
    btnRejeitar.addEventListener('click', () => {
        salvarEFechar(false, false, false);
    });

    // Salvar Selecionados: Salva exatamente o que estiver marcado nos checkboxes na hora
    btnSalvarPref.addEventListener('click', () => {
        salvarEFechar(chkFuncionais.checked, chkAnaliticos.checked, chkMarketing.checked);
    });

    // Clique na bolinha 🍪: Abre sempre atualizado
    btnFlutuante.addEventListener('click', () => {
        carregarEstadoSalvo();
        painelDetalhes.style.display = 'flex';
        banner.style.display = 'flex';
        btnFlutuante.style.display = 'none';
    });
}

document.addEventListener('DOMContentLoaded', gerenciarCookies);