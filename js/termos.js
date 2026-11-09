/* ==========================================================================
   NANKIM ESCOLA DE ARTE - MODAL DE TERMOS E PRIVACIDADE (LGPD)
   ========================================================================== */

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
    const modaisAntigos = document.querySelectorAll('#modal-termos');
    modaisAntigos.forEach(el => el.remove());
    document.body.insertAdjacentHTML('beforeend', termosComponent);
}

function abrirModalTermos() {
    let modal = document.getElementById('modal-termos');
    if (!modal) {
        injetarEInicializarTermos();
        modal = document.getElementById('modal-termos');
    }
    
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

// Ouvintes globais
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

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injetarEInicializarTermos);
} else {
    injetarEInicializarTermos();
}