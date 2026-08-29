function injetarModalTermos() {
    const html = `
        <div id="modal-termos" class="modal">
            <div class="modal-content modal-largo">
                <span class="close-btn" data-close="termos">&times;</span>
                <h2>Termos de Uso e Política de Privacidade</h2>
                
                <div class="conteudo-scroll">
                    <h3>1. Aceitação dos Termos</h3>
                    <p>Ao acessar e utilizar a plataforma Nankim Escola de Arte, você concorda expressamente com estes Termos de Uso. Caso não concorde com alguma cláusula, solicitamos que não utilize nossos serviços.</p>

                    <h3>2. Propriedade Intelectual e Direitos Autorais</h3>
                    <p><strong>2.1. Nosso Conteúdo:</strong> Todos os vídeos, apostilas, metodologias e designs apresentados na plataforma são de propriedade exclusiva da Nankim. É terminantemente proibida a cópia, pirataria ou distribuição não autorizada.</p>
                    <p><strong>2.2. Sua Arte:</strong> Os exercícios e desenhos submetidos por você na Área do Aluno pertencem exclusivamente a você. A Nankim não reivindica direitos autorais sobre suas criações, mas reserva-se o direito de solicitar autorização para exibi-los em murais de "Trabalhos de Alunos" com os devidos créditos.</p>

                    <h3>3. Política de Privacidade e Tratamento de Dados</h3>
                    <p>Respeitamos sua privacidade em conformidade com a LGPD (Lei Geral de Proteção de Dados):</p>
                    <ul>
                        <li><strong>Coleta:</strong> Coletamos apenas dados essenciais para o funcionamento da sua conta (nome, e-mail e senha criptografada).</li>
                        <li><strong>Cookies:</strong> Utilizamos cookies para manter sua sessão ativa e analisar métricas de acesso, conforme gerenciado por você em nosso painel de preferências de cookies.</li>
                        <li><strong>Compartilhamento:</strong> Não vendemos nem compartilhamos seus dados pessoais com terceiros sob nenhuma hipótese.</li>
                    </ul>

                    <h3>4. Pagamentos e Política de Reembolso</h3>
                    <p>Os pagamentos são processados por gateways seguros e independentes. Em conformidade com o Código de Defesa do Consumidor, oferecemos uma garantia incondicional de 7 (sete) dias. Caso o método de ensino de Fundamentos do Desenho não atenda às suas expectativas, o reembolso integral pode ser solicitado dentro deste prazo.</p>

                    <h3>5. Regras de Conduta</h3>
                    <p>O ambiente da comunidade e a área de feedback de exercícios devem ser locais de respeito mútuo. Não será tolerado assédio, discriminação ou críticas destrutivas aos trabalhos de outros estudantes. A violação desta regra resultará no banimento imediato da conta sem direito a reembolso.</p>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', html);
}

document.addEventListener('DOMContentLoaded', injetarModalTermos);