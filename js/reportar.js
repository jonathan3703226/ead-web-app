/* ==========================================================================
   NANKIM ESCOLA DE ARTE - MODAL REPORTAR ERRO / SUPORTE (PADRONIZADO)
   ========================================================================== */

(function () {
    function injetarModalReportarErro() {
        if (document.getElementById('modal-reportar-erro')) return;

        const modalHTML = `
        <div id="modal-reportar-erro" class="modal modal-reportar-overlay-fix" role="dialog" aria-modal="true" aria-labelledby="titulo-reportar-modal" style="display: none;">
            <div class="modal-content modal-reportar-card-fix">
                <button type="button" class="close-btn btn-fechar-x-report" id="btn-reportar-fechar-x" aria-label="Fechar">&times;</button>

                <!-- Formulário de Envio -->
                <div id="reportar-erro-form-wrapper">
                    <span class="modal-eyebrow-padrao">Suporte Nankim</span>
                    <h2 id="titulo-reportar-modal" class="titulo-reportar-fix">Reportar um Erro</h2>
                    <p class="subtitulo-reportar-fix">Encontrou algo incorreto ou com falha? Selecione a opção abaixo para nos avisar.</p>

                    <form id="form-reportar-erro" class="form-reportar-corpo">
                        <div class="grupo-opcoes-erro">
                            <label class="opcao-erro-card">
                                <input type="radio" name="categoria_erro" value="layout" checked>
                                <span class="opcao-erro-label">Problema Visual / Layout</span>
                            </label>
                            <label class="opcao-erro-card">
                                <input type="radio" name="categoria_erro" value="link">
                                <span class="opcao-erro-label">Link ou Botão quebrado</span>
                            </label>
                            <label class="opcao-erro-card">
                                <input type="radio" name="categoria_erro" value="video">
                                <span class="opcao-erro-label">Vídeo/Mídia não carrega</span>
                            </label>
                            <label class="opcao-erro-card">
                                <input type="radio" name="categoria_erro" value="outro">
                                <span class="opcao-erro-label">Outro problema</span>
                            </label>
                        </div>

                        <div class="input-group campo-texto-erro">
                            <label for="descricao-erro-input" class="label-textarea">Descrição detalhada (opcional)</label>
                            <textarea id="descricao-erro-input" name="descricao" placeholder="Descreva o que aconteceu ou cole detalhes relevantes..." rows="3"></textarea>
                        </div>

                        <button type="submit" class="btn-enviar-report">Enviar Relatório</button>
                    </form>
                </div>

                <!-- Tela de Confirmação de Sucesso -->
                <div id="reportar-erro-sucesso" class="reportar-sucesso-wrapper" style="display: none;">
                    <div class="msg-sucesso-card reportar-card-confirmacao">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#27ae60" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        <div>
                            <strong class="titulo-sucesso-report">Relatório enviado com sucesso!</strong>
                            <p class="texto-sucesso-report">Obrigado por ajudar a melhorar a plataforma. Nossa equipe analisará a falha em breve.</p>
                        </div>
                    </div>
                    <button type="button" class="btn-fechar-sucesso" id="btn-reportar-concluir">Concluir</button>
                </div>
            </div>
        </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
        vincularEventosInternos();
    }

    function abrirModal() {
        injetarModalReportarErro();
        const modal = document.getElementById('modal-reportar-erro');
        const formWrapper = document.getElementById('reportar-erro-form-wrapper');
        const sucessoWrapper = document.getElementById('reportar-erro-sucesso');
        const form = document.getElementById('form-reportar-erro');

        if (formWrapper) formWrapper.style.display = 'block';
        if (sucessoWrapper) sucessoWrapper.style.display = 'none';
        if (form) form.reset();

        if (modal) modal.style.display = 'flex';
    }

    function fecharModal() {
        const modal = document.getElementById('modal-reportar-erro');
        if (modal) modal.style.display = 'none';
    }

    function vincularEventosInternos() {
        const btnX = document.getElementById('btn-reportar-fechar-x');
        const btnConcluir = document.getElementById('btn-reportar-concluir');
        const form = document.getElementById('form-reportar-erro');
        const modal = document.getElementById('modal-reportar-erro');

        if (btnX) btnX.onclick = fecharModal;
        if (btnConcluir) btnConcluir.onclick = fecharModal;

        if (modal) {
            modal.onclick = (e) => {
                if (e.target === modal) fecharModal();
            };
        }

        if (form) {
            form.onsubmit = (e) => {
                e.preventDefault();
                document.getElementById('reportar-erro-form-wrapper').style.display = 'none';
                document.getElementById('reportar-erro-sucesso').style.display = 'block';
            };
        }
    }

    document.addEventListener('click', (e) => {
        const btnReportar = e.target.closest('[data-modal="reportar-erro"]');
        if (btnReportar) {
            e.preventDefault();
            e.stopPropagation();
            abrirModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        const modal = document.getElementById('modal-reportar-erro');
        if (e.key === 'Escape' && modal && modal.style.display === 'flex') {
            fecharModal();
        }
    });

    document.addEventListener('DOMContentLoaded', injetarModalReportarErro);
})();