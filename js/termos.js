/* ==========================================================================
   NANKIM ESCOLA DE ARTE - MODAL DE TERMOS E PRIVACIDADE (LGPD)
   ========================================================================== */

const termosStyles = `
<style id="termos-styles">
    /* Modal de Termos Base */
    #modal-termos.modal {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        width: 100vw !important;
        height: 100vh !important;
        background-color: rgba(0, 0, 0, 0.65) !important;
        backdrop-filter: blur(4px) !important;
        z-index: 99999 !important;
        display: none;
        align-items: center !important;
        justify-content: center !important;
        padding: 20px !important;
        box-sizing: border-box !important;
    }

    .termos-card {
        position: relative !important;
        background-color: #ffffff !important;
        color: #111111 !important;
        width: min(720px, 100%) !important;
        max-height: 85vh !important;
        border-radius: 20px !important;
        padding: 2rem !important;
        display: flex !important;
        flex-direction: column !important;
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3) !important;
        border: 1px solid rgba(0, 0, 0, 0.1) !important;
        font-family: 'Montserrat', sans-serif !important;
        animation: termosEntrada 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
    }

    /* Suporte ao Modo Escuro */
    :root[data-theme="dark"] .termos-card {
        background-color: #181818 !important;
        color: #ffffff !important;
        border-color: rgba(255, 255, 255, 0.12) !important;
    }

    .termos-cabecalho {
        margin-bottom: 1.2rem !important;
        padding-bottom: 0.8rem !important;
        border-bottom: 1px solid rgba(128, 128, 128, 0.2) !important;
    }

    .termos-eyebrow {
        font-size: 0.8rem !important;
        text-transform: uppercase !important;
        letter-spacing: 1.5px !important;
        color: #b33f30 !important;
        font-weight: 700 !important;
        margin: 0 0 4px 0 !important;
    }

    .termos-cabecalho h2 {
        margin: 0 !important;
        font-size: 1.4rem !important;
        font-weight: 800 !important;
        color: inherit !important;
    }

    .conteudo-scroll {
        overflow-y: auto !important;
        flex: 1 !important;
        padding-right: 12px !important;
        margin-bottom: 1.5rem !important;
        display: flex !important;
        flex-direction: column !important;
        gap: 1.2rem !important;
    }

    .conteudo-scroll section h3 {
        font-size: 1rem !important;
        margin: 0 0 0.4rem 0 !important;
        color: inherit !important;
        font-weight: 700 !important;
    }

    .conteudo-scroll section p {
        font-size: 0.88rem !important;
        line-height: 1.6 !important;
        margin: 0 0 0.5rem 0 !important;
        opacity: 0.85 !important;
        color: inherit !important;
    }

    .conteudo-scroll hr {
        border: none !important;
        border-top: 1px solid rgba(128, 128, 128, 0.2) !important;
        margin: 1rem 0 0.5rem 0 !important;
    }

    .termos-acoes {
        display: flex !important;
        justify-content: flex-end !important;
    }

    .termos-btn-concordar {
        background-color: #b33f30 !important;
        color: #ffffff !important;
        border: none !important;
        padding: 0.8rem 1.8rem !important;
        border-radius: 50px !important;
        font-weight: 700 !important;
        font-size: 0.9rem !important;
        cursor: pointer !important;
        transition: all 0.2s ease !important;
    }

    .termos-btn-concordar:hover {
        background-color: #963225 !important;
        transform: translateY(-2px) !important;
    }

    .termos-card .close-btn {
        position: absolute !important;
        top: 1.2rem !important;
        right: 1.4rem !important;
        background: transparent !important;
        border: none !important;
        font-size: 1.8rem !important;
        cursor: pointer !important;
        color: inherit !important;
        opacity: 0.6 !important;
        line-height: 1 !important;
    }

    .termos-card .close-btn:hover {
        opacity: 1 !important;
    }

    @keyframes termosEntrada {
        from { transform: scale(0.95); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
    }
</style>
`;

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
        <footer class="termos-acoes">
            <button type="button" class="termos-btn-concordar" data-agree-terms>Concordar e fechar</button>
        </footer>
    </article>
</div>
`;

let elementoTermosAnterior = null;

function injetarEInicializarTermos() {
    if (!document.getElementById('termos-styles')) {
        document.head.insertAdjacentHTML('beforeend', termosStyles);
    }
    if (!document.getElementById('modal-termos')) {
        document.body.insertAdjacentHTML('beforeend', termosComponent);
    }
}

function abrirModalTermos() {
    injetarEInicializarTermos();
    const modal = document.getElementById('modal-termos');
    if (!modal) return;
    
    elementoTermosAnterior = document.activeElement;
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-aberto');
    modal.querySelector('.close-btn')?.focus();
}

function fecharModalTermos(concordou = false) {
    const modal = document.getElementById('modal-termos');
    if (!modal) return;
    
    if (concordou) {
        localStorage.setItem('nankim_terms_acceptance', JSON.stringify({ 
            accepted: true, 
            date: new Date().toISOString() 
        }));
    }
    
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-aberto');
    if (elementoTermosAnterior) elementoTermosAnterior.focus();
}

// Ouvintes globais para o modal de Termos
document.addEventListener('click', (event) => {
    const alvo = event.target instanceof Element ? event.target : null;
    if (!alvo) return;

    if (alvo.closest('[data-modal="termos"]')) {
        event.preventDefault();
        abrirModalTermos();
    }

    if (alvo.closest('[data-close="termos"]')) {
        fecharModalTermos(false);
    }

    if (alvo.closest('[data-agree-terms]')) {
        fecharModalTermos(true);
    }
});

document.addEventListener('keydown', (event) => {
    const modal = document.getElementById('modal-termos');
    if (!modal || modal.style.display !== 'flex') return;

    if (event.key === 'Escape') {
        fecharModalTermos(false);
    }
});

document.addEventListener('DOMContentLoaded', injetarEInicializarTermos);