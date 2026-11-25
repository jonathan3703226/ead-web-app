const CHECKOUT_COURSE = { id: 'fundamentos-desenho', nome: 'Fundamentos do Desenho' };

const PLANOS_NANKIM = {
    mensal: {
        id: 'mensal',
        nome: 'Plano Mensal',
        duracaoMeses: 1,
        valorMensal: 89.90,
        valorTotal: 89.90,
        maxParcelas: 1,
        apenasCartao: false,
        resumo: 'R$ 89,90/mês · Cartão, PIX ou Boleto'
    },
    semestral: {
        id: 'semestral',
        nome: 'Plano Semestral',
        duracaoMeses: 6,
        valorMensal: 58.31,
        valorTotal: 349.90,
        maxParcelas: 6,
        apenasCartao: true,
        resumo: 'R$ 58,31/mês (6x de R$ 58,31 sem juros · total R$ 349,90)'
    },
    anual: {
        id: 'anual',
        nome: 'Plano Anual',
        duracaoMeses: 12,
        valorMensal: 39.90,
        valorTotal: 478.80,
        maxParcelas: 12,
        apenasCartao: true,
        resumo: 'R$ 39,90/mês (12x de R$ 39,90 sem juros · total R$ 478,80)'
    }
};

let planoSelecionadoCheckout = 'anual';
let modoCheckoutLogado = false;

// Estado em memória do checkout (preserva dados apenas enquanto a compra não foi finalizada)
const estadoCheckout = {
    nome: '',
    email: '',
    cpf: '',
    metodo: 'cartao',
    numCartao: '',
    validade: '',
    cvv: '',
    parcelas: null,
    touched: {}
};

function limparEstadoCheckout() {
    estadoCheckout.nome = '';
    estadoCheckout.email = '';
    estadoCheckout.cpf = '';
    estadoCheckout.metodo = 'cartao';
    estadoCheckout.numCartao = '';
    estadoCheckout.validade = '';
    estadoCheckout.cvv = '';
    estadoCheckout.parcelas = null;
    estadoCheckout.touched = {};
}

function formatarMoedaBR(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function obterUsuariosCheckout() {
    const dados = localStorage.getItem('nankim_db');
    if (!dados) return [];
    try {
        const usuarios = JSON.parse(dados);
        return Array.isArray(usuarios) ? usuarios : [];
    } catch (e) {
        return [];
    }
}

function obterUsuarioSessaoCheckout() {
    try {
        const sessao = JSON.parse(sessionStorage.getItem('nankim_sessao') || 'null');
        if (!sessao || !sessao.email) return null;
        const usuarios = obterUsuariosCheckout();
        return usuarios.find((u) => u.email.toLowerCase() === String(sessao.email).toLowerCase()) || sessao;
    } catch (e) {
        return null;
    }
}

function emailJaPossuiAssinatura(email) {
    if (!email) return false;
    const usuarios = obterUsuariosCheckout();
    const existente = usuarios.find((u) => u.email.toLowerCase() === email.toLowerCase());
    return Boolean(existente && existente.matriculado === true);
}

function atualizarTituloCheckout(titulo, subtitulo) {
    document.getElementById('checkout-titulo').textContent = titulo;
    document.getElementById('checkout-subtitulo').textContent = subtitulo;
}

function mostrarErroCheckout(mensagem, mostrarBotaoLogin = false) {
    const container = document.getElementById('checkout-stage');
    container.querySelectorAll('.msg-erro, .box-ja-assinante').forEach((el) => el.remove());
    if (!mensagem) return;

    const erro = document.createElement('div');
    erro.className = 'msg-erro';
    erro.setAttribute('role', 'alert');
    erro.innerHTML = `<span>${mensagem}</span>`;

    if (mostrarBotaoLogin) {
        const btnLogin = document.createElement('button');
        btnLogin.type = 'button';
        btnLogin.className = 'btn-pula-login';
        btnLogin.style.marginTop = '8px';
        btnLogin.textContent = 'Ir para Login / Área do Aluno';
        btnLogin.addEventListener('click', () => {
            document.getElementById('modal-checkout').style.display = 'none';
            if (typeof abrirModal === 'function') abrirModal('login');
        });
        erro.appendChild(btnLogin);
    }

    container.prepend(erro);
}

function definirErroCampoCheckout(inputEl, mensagem) {
    if (!inputEl) return;
    const grupo = inputEl.closest('.input-group');
    if (!grupo) return;

    let feedback = grupo.querySelector('.input-feedback');
    if (!feedback) {
        feedback = document.createElement('small');
        feedback.className = 'input-feedback';
        grupo.appendChild(feedback);
    }

    if (mensagem) {
        grupo.classList.add('erro');
        grupo.classList.remove('sucesso');
        feedback.textContent = mensagem;
    } else {
        grupo.classList.remove('erro');
        grupo.classList.add('sucesso');
        feedback.textContent = '';
    }
}

function vincularValidacaoInstantanea(inputEl, campoKey, fnValidar) {
    if (!inputEl) return;
    inputEl.addEventListener('focus', () => {
        estadoCheckout.touched[campoKey] = true;
        fnValidar();
    });
    inputEl.addEventListener('input', () => {
        estadoCheckout.touched[campoKey] = true;
        fnValidar();
    });
}

function validarCpf(cpf) {
    const numeros = cpf.replace(/\D/g, '');
    return numeros.length === 11 && !/^(\d)\1{10}$/.test(numeros);
}

function validarVencimentoCartao(validade) {
    if (!/^\d{2}\/\d{2}$/.test(validade)) return false;
    const [mes, ano] = validade.split('/').map(Number);
    if (mes < 1 || mes > 12) return false;
    const agora = new Date();
    const anoAtual = Number(String(agora.getFullYear()).slice(-2));
    return ano > anoAtual || (ano === anoAtual && mes >= agora.getMonth() + 1);
}

function detectarBandeiraCartao(numero) {
    const n = numero.replace(/\D/g, '');
    if (/^4/.test(n)) return 'Visa';
    if (/^(5[1-5]|2[2-7])/.test(n)) return 'Mastercard';
    if (/^(4011|4312|4389|5041|5066|509|6277|6362|6363|650|6516|6550)/.test(n)) return 'Elo';
    if (/^3[47]/.test(n)) return 'Amex';
    if (/^606282/.test(n)) return 'Hipercard';
    return '';
}

function gerarPayloadPix(valorPix) {
    const valorStr = valorPix.toFixed(2);
    const txid = `NANKIM${Date.now().toString().slice(-6)}`;
    return `00020126580014BR.GOV.BCB.PIX0136pagamentos@escolanankim.com.br5204000053039865406${valorStr}5802BR5920NANKIM ESCOLA DE ARTE6008BRASILIA62160512${txid}6304A1B2`;
}

function gerarLinhaDigitavelBoleto(valorBoleto) {
    const centavos = String(Math.round(valorBoleto * 100)).padStart(10, '0');
    return `34191.79001 01043.510047 91020.150008 7 9856${centavos}`;
}

function gerarOpcoesParcelamento(plano, parcelaSalva = null) {
    let html = '';
    const alvoSelecionado = (parcelaSalva && parcelaSalva <= plano.maxParcelas)
        ? Number(parcelaSalva)
        : plano.maxParcelas;

    for (let i = 1; i <= plano.maxParcelas; i++) {
        const valorParcela = plano.valorTotal / i;
        const selecionado = i === alvoSelecionado ? 'selected' : '';
        const rotulo = i === 1
            ? `1x de ${formatarMoedaBR(valorParcela)} à vista`
            : `${i}x de ${formatarMoedaBR(valorParcela)} sem juros`;
        html += `<option value="${i}" ${selecionado}>${rotulo}</option>`;
    }
    return html;
}

// Fluxo comercial padrão (página cursos.html)
function iniciarCheckout(event) {
    modoCheckoutLogado = false;

    if (event && event.currentTarget) {
        const planoBtn = event.currentTarget.getAttribute('data-plano');
        if (planoBtn && PLANOS_NANKIM[planoBtn] && planoBtn !== planoSelecionadoCheckout) {
            planoSelecionadoCheckout = planoBtn;
            estadoCheckout.parcelas = null;
        }
    }

    const modal = document.getElementById('modal-checkout');
    if (modal) modal.style.display = 'flex';

    renderizarCheckoutUnico();
}

// Fluxo da Área do Aluno (mantém todos os campos idênticos e preenche automaticamente)
function iniciarCheckoutLogado(planoInicial = 'anual') {
    modoCheckoutLogado = true;

    if (PLANOS_NANKIM[planoInicial] && planoInicial !== planoSelecionadoCheckout) {
        planoSelecionadoCheckout = planoInicial;
        estadoCheckout.parcelas = null;
    }

    const usuarioLogado = obterUsuarioSessaoCheckout();
    if (usuarioLogado) {
        estadoCheckout.nome = usuarioLogado.nome || '';
        estadoCheckout.email = usuarioLogado.email || '';
        estadoCheckout.cpf = usuarioLogado.cpf || '';
    }

    const modal = document.getElementById('modal-checkout');
    if (modal) modal.style.display = 'flex';

    renderizarCheckoutUnico();
}

function renderizarCheckoutUnico() {
    const planoInicial = PLANOS_NANKIM[planoSelecionadoCheckout] || PLANOS_NANKIM.anual;
    const usuarioLogado = modoCheckoutLogado ? obterUsuarioSessaoCheckout() : null;

    if (planoInicial.apenasCartao) {
        estadoCheckout.metodo = 'cartao';
    }

    atualizarTituloCheckout(
        'Finalizar Assinatura Nankim',
        modoCheckoutLogado && usuarioLogado
            ? 'Confira seus dados preenchidos, informe o CPF e escolha seu plano.'
            : 'Preencha seus dados e escolha o plano. Sua conta é liberada na hora.'
    );

    const payloadPixMensal = gerarPayloadPix(PLANOS_NANKIM.mensal.valorTotal);
    const qrUrlMensal = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(payloadPixMensal)}`;
    const linhaBoletoMensal = gerarLinhaDigitavelBoleto(PLANOS_NANKIM.mensal.valorTotal);

    document.getElementById('checkout-stage').innerHTML = `
        <form id="form-pagamento" novalidate autocomplete="off">
            <!-- Seletor de Planos -->
            <div class="checkout-planos-resumo" id="seletor-planos-checkout">
                <button type="button" class="btn-plano-modal ${planoSelecionadoCheckout === 'mensal' ? 'ativo' : ''}" data-plano="mensal">
                    <strong>Mensal</strong>
                    <span>R$ 89,90/mês</span>
                </button>
                <button type="button" class="btn-plano-modal ${planoSelecionadoCheckout === 'semestral' ? 'ativo' : ''}" data-plano="semestral">
                    <strong>Semestral</strong>
                    <span>R$ 58,31/mês</span>
                    <small>-35% OFF</small>
                </button>
                <button type="button" class="btn-plano-modal ${planoSelecionadoCheckout === 'anual' ? 'ativo' : ''}" data-plano="anual">
                    <span class="tag-recomendado-mini">MAIS ESCOLHIDO</span>
                    <strong>Anual</strong>
                    <span>R$ 39,90/mês</span>
                    <small>-55% OFF</small>
                </button>
            </div>

            <!-- Dados do Aluno (idênticos em todas as páginas; preenchidos se logado) -->
            <div class="linha-inputs">
                <div class="input-group">
                    <label for="checkout-nome">Nome completo</label>
                    <input type="text" id="checkout-nome" autocomplete="off" placeholder="Seu nome e sobrenome" value="${estadoCheckout.nome}" required>
                    <small class="input-feedback"></small>
                </div>
                <div class="input-group">
                    <label for="checkout-email">E-mail de acesso</label>
                    <input type="email" id="checkout-email" autocomplete="off" placeholder="seuemail@dominio.com" value="${estadoCheckout.email}" ${modoCheckoutLogado && usuarioLogado ? 'readonly' : ''} required>
                    <small class="input-feedback"></small>
                </div>
            </div>

            <div class="input-group">
                <label for="checkout-cpf">CPF do titular</label>
                <input type="text" id="checkout-cpf" inputmode="numeric" autocomplete="off" maxlength="14" placeholder="000.000.000-00" value="${estadoCheckout.cpf}" required>
                <small class="input-feedback"></small>
            </div>

            <!-- Seletor de Método (apenas no Plano Mensal) -->
            <fieldset class="metodos-pagamento" id="fieldset-metodos" ${planoInicial.apenasCartao ? 'hidden' : ''}>
                <legend>Forma de pagamento</legend>
                <label><input type="radio" name="metodo-pagamento" value="cartao" ${estadoCheckout.metodo === 'cartao' ? 'checked' : ''}> Cartão</label>
                <label><input type="radio" name="metodo-pagamento" value="pix" ${estadoCheckout.metodo === 'pix' ? 'checked' : ''}> PIX QR Code</label>
                <label><input type="radio" name="metodo-pagamento" value="boleto" ${estadoCheckout.metodo === 'boleto' ? 'checked' : ''}> Boleto</label>
            </fieldset>

            <!-- 1. CARTÃO DE CRÉDITO -->
            <div id="dados-cartao" class="dados-cartao">
                <div class="input-group">
                    <label for="check-num-cartao">Número do cartão</label>
                    <div class="campo-cartao-wrapper">
                        <input type="text" id="check-num-cartao" inputmode="numeric" autocomplete="off" maxlength="19" placeholder="0000 0000 0000 0000" value="${estadoCheckout.numCartao}" required>
                        <span class="badge-bandeira-cartao" id="badge-bandeira">Cartão</span>
                    </div>
                    <small class="input-feedback"></small>
                </div>

                <div class="linha-inputs">
                    <div class="input-group">
                        <label for="check-validade">Validade</label>
                        <input type="text" id="check-validade" inputmode="numeric" autocomplete="off" maxlength="5" placeholder="MM/AA" value="${estadoCheckout.validade}" required>
                        <small class="input-feedback"></small>
                    </div>
                    <div class="input-group">
                        <label for="check-cvv">CVV</label>
                        <input type="text" id="check-cvv" inputmode="numeric" autocomplete="off" maxlength="4" placeholder="123" value="${estadoCheckout.cvv}" required>
                        <small class="input-feedback"></small>
                    </div>
                </div>

                <div class="input-group">
                    <label for="check-parcelas">Parcelamento</label>
                    <select id="check-parcelas" class="select-parcelas">
                        ${gerarOpcoesParcelamento(planoInicial, estadoCheckout.parcelas)}
                    </select>
                </div>
            </div>

            <!-- 2. PIX QR CODE (APENAS MENSAL) -->
            <div id="painel-pix" class="painel-metodo-box" hidden>
                <div class="pix-qr-layout">
                    <img id="img-qrcode-pix" class="pix-qr-imagem" src="${qrUrlMensal}" alt="QR Code PIX Nankim">
                    <div class="pix-info-texto">
                        <h4>PIX à vista (Plano Mensal)</h4>
                        <p>Valor: <strong>R$ 89,90</strong> · Liberação imediata após leitura do QR Code.</p>
                        <div class="linha-copia-cola">
                            <input type="text" id="input-pix-copia-cola" readonly value="${payloadPixMensal}">
                            <button type="button" class="btn-copiar-codigo" id="btn-copiar-pix">Copiar PIX</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 3. BOLETO BANCÁRIO (APENAS MENSAL) -->
            <div id="painel-boleto" class="painel-metodo-box boleto-box" hidden>
                <h4>Boleto Bancário (Plano Mensal)</h4>
                <p>Valor do documento: <strong>R$ 89,90</strong> · Vencimento em 3 dias úteis.</p>
                <div class="boleto-barras-visual" aria-label="Código de barras do boleto"></div>
                <div class="linha-copia-cola">
                    <input type="text" id="input-boleto-linha" readonly value="${linhaBoletoMensal}">
                    <button type="button" class="btn-copiar-codigo" id="btn-copiar-boleto">Copiar código</button>
                </div>
            </div>

            <p class="checkout-nota" id="resumo-cobranca-checkout"></p>

            <button type="submit" id="btn-submit-checkout"></button>
        </form>
    `;

    const form = document.getElementById('form-pagamento');
    const inputNome = document.getElementById('checkout-nome');
    const inputEmail = document.getElementById('checkout-email');
    const inputCpf = document.getElementById('checkout-cpf');
    const fieldsetMetodos = document.getElementById('fieldset-metodos');
    const dadosCartao = document.getElementById('dados-cartao');
    const painelPix = document.getElementById('painel-pix');
    const painelBoleto = document.getElementById('painel-boleto');
    const camposCartao = [...dadosCartao.querySelectorAll('input')];
    const selectParcelas = document.getElementById('check-parcelas');
    const numCartao = document.getElementById('check-num-cartao');
    const badgeBandeira = document.getElementById('badge-bandeira');
    const validadeCartao = document.getElementById('check-validade');
    const cvvCartao = document.getElementById('check-cvv');

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    function salvarEstadoCheckout() {
        estadoCheckout.nome = inputNome.value;
        estadoCheckout.email = inputEmail.value;
        estadoCheckout.cpf = inputCpf.value;
        estadoCheckout.metodo = obterMetodoAtual();
        estadoCheckout.numCartao = numCartao.value;
        estadoCheckout.validade = validadeCartao.value;
        estadoCheckout.cvv = cvvCartao.value;
        estadoCheckout.parcelas = Number(selectParcelas.value) || null;
    }

    function obterMetodoAtual() {
        const plano = PLANOS_NANKIM[planoSelecionadoCheckout] || PLANOS_NANKIM.anual;
        if (plano.apenasCartao) return 'cartao';
        return form.querySelector('input[name="metodo-pagamento"]:checked')?.value || 'cartao';
    }

    function atualizarInterfacePorPlanoEMetodo() {
        const plano = PLANOS_NANKIM[planoSelecionadoCheckout] || PLANOS_NANKIM.anual;

        fieldsetMetodos.hidden = plano.apenasCartao;
        if (plano.apenasCartao) {
            const radioCartao = form.querySelector('input[name="metodo-pagamento"][value="cartao"]');
            if (radioCartao) radioCartao.checked = true;
        }

        const metodo = obterMetodoAtual();
        const usaCartao = metodo === 'cartao';

        dadosCartao.hidden = !usaCartao;
        painelPix.hidden = metodo !== 'pix';
        painelBoleto.hidden = metodo !== 'boleto';

        camposCartao.forEach((campo) => {
            campo.disabled = !usaCartao;
            campo.required = usaCartao;
            if (!usaCartao) {
                campo.closest('.input-group')?.classList.remove('erro', 'sucesso');
            }
        });

        const qtdParcelas = Number(selectParcelas.value) || plano.maxParcelas;
        const valorParcela = plano.valorTotal / qtdParcelas;
        const btnSubmit = document.getElementById('btn-submit-checkout');

        if (usaCartao) {
            btnSubmit.textContent = qtdParcelas > 1
                ? `Finalizar assinatura (${qtdParcelas}x de ${formatarMoedaBR(valorParcela)})`
                : `Finalizar assinatura (${formatarMoedaBR(plano.valorTotal)})`;
        } else if (metodo === 'pix') {
            btnSubmit.textContent = `Confirmar PIX (${formatarMoedaBR(plano.valorTotal)})`;
        } else {
            btnSubmit.textContent = `Gerar Boleto (${formatarMoedaBR(plano.valorTotal)})`;
        }

        document.getElementById('resumo-cobranca-checkout').innerHTML = `
            <strong>${plano.nome}</strong> · ${plano.resumo}. Acesso liberado imediatamente na Área do Aluno.
        `;

        salvarEstadoCheckout();
    }

    document.querySelectorAll('#seletor-planos-checkout .btn-plano-modal').forEach((btn) => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('#seletor-planos-checkout .btn-plano-modal').forEach(b => b.classList.remove('ativo'));
            btn.classList.add('ativo');
            planoSelecionadoCheckout = btn.getAttribute('data-plano') || 'anual';
            estadoCheckout.parcelas = null;

            const plano = PLANOS_NANKIM[planoSelecionadoCheckout];
            selectParcelas.innerHTML = gerarOpcoesParcelamento(plano);
            atualizarInterfacePorPlanoEMetodo();
        });
    });

    selectParcelas.addEventListener('change', atualizarInterfacePorPlanoEMetodo);

    document.querySelectorAll('input[name="metodo-pagamento"]').forEach((radio) => {
        radio.addEventListener('change', atualizarInterfacePorPlanoEMetodo);
    });

    document.getElementById('btn-copiar-pix').addEventListener('click', (e) => {
        navigator.clipboard?.writeText(document.getElementById('input-pix-copia-cola').value);
        e.currentTarget.textContent = 'Copiado!';
        setTimeout(() => { e.target.textContent = 'Copiar PIX'; }, 1800);
    });

    document.getElementById('btn-copiar-boleto').addEventListener('click', (e) => {
        navigator.clipboard?.writeText(document.getElementById('input-boleto-linha').value);
        e.currentTarget.textContent = 'Copiado!';
        setTimeout(() => { e.target.textContent = 'Copiar código'; }, 1800);
    });

    function validarNome() {
        salvarEstadoCheckout();
        const v = inputNome.value.trim();
        definirErroCampoCheckout(inputNome, (v.length < 3 || !v.includes(' ')) ? 'Digite seu nome e sobrenome.' : '');
    }

    function validarEmail() {
        salvarEstadoCheckout();
        const v = inputEmail.value.trim().toLowerCase();
        if (!regexEmail.test(v)) {
            definirErroCampoCheckout(inputEmail, 'Informe um e-mail válido.');
            return;
        }
        if (emailJaPossuiAssinatura(v)) {
            definirErroCampoCheckout(inputEmail, 'Este e-mail já possui assinatura ativa.');
            return;
        }
        definirErroCampoCheckout(inputEmail, '');
    }

    function validarCampoCpf() {
        const digitos = inputCpf.value.replace(/\D/g, '').slice(0, 11);
        inputCpf.value = digitos
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        salvarEstadoCheckout();
        definirErroCampoCheckout(inputCpf, !validarCpf(inputCpf.value) ? 'Informe os 11 dígitos válidos do CPF.' : '');
    }

    function validarNumCartao() {
        const numeros = numCartao.value.replace(/\D/g, '').slice(0, 16);
        numCartao.value = numeros.replace(/(\d{4})(?=\d)/g, '$1 ');
        badgeBandeira.textContent = detectarBandeiraCartao(numeros) || 'Cartão';
        salvarEstadoCheckout();
        definirErroCampoCheckout(numCartao, numeros.length < 16 ? 'O cartão deve ter 16 dígitos.' : '');
    }

    function validarValidade() {
        const numeros = validadeCartao.value.replace(/\D/g, '').slice(0, 4);
        validadeCartao.value = numeros.length > 2 ? `${numeros.slice(0, 2)}/${numeros.slice(2)}` : numeros;
        salvarEstadoCheckout();
        definirErroCampoCheckout(validadeCartao, !validarVencimentoCartao(validadeCartao.value) ? 'Validade inválida (MM/AA).' : '');
    }

    function validarCvv() {
        cvvCartao.value = cvvCartao.value.replace(/\D/g, '').slice(0, 4);
        salvarEstadoCheckout();
        definirErroCampoCheckout(cvvCartao, cvvCartao.value.length < 3 ? 'CVV deve ter 3 ou 4 dígitos.' : '');
    }

    vincularValidacaoInstantanea(inputNome, 'nome', validarNome);
    vincularValidacaoInstantanea(inputEmail, 'email', validarEmail);
    vincularValidacaoInstantanea(inputCpf, 'cpf', validarCampoCpf);
    vincularValidacaoInstantanea(numCartao, 'numCartao', validarNumCartao);
    vincularValidacaoInstantanea(validadeCartao, 'validade', validarValidade);
    vincularValidacaoInstantanea(cvvCartao, 'cvv', validarCvv);

    atualizarInterfacePorPlanoEMetodo();

    // Valida visualmente os campos já preenchidos quando o aluno está logado
    if (modoCheckoutLogado && usuarioLogado) {
        if (inputNome.value.trim()) validarNome();
        if (inputEmail.value.trim()) validarEmail();
        if (inputCpf.value.trim()) validarCampoCpf();
    } else {
        if (estadoCheckout.touched.nome) validarNome();
        if (estadoCheckout.touched.email) validarEmail();
        if (estadoCheckout.touched.cpf) validarCampoCpf();
    }

    if (obterMetodoAtual() === 'cartao') {
        if (estadoCheckout.touched.numCartao) validarNumCartao();
        if (estadoCheckout.touched.validade) validarValidade();
        if (estadoCheckout.touched.cvv) validarCvv();
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        mostrarErroCheckout('');

        validarNome();
        validarEmail();
        validarCampoCpf();

        const emailDigitado = inputEmail.value.trim().toLowerCase();
        if (emailJaPossuiAssinatura(emailDigitado)) {
            mostrarErroCheckout('Este e-mail já possui uma assinatura ativa e não pode comprar novamente.', !modoCheckoutLogado);
            if (!modoCheckoutLogado) inputEmail.focus();
            return;
        }

        const metodo = obterMetodoAtual();
        const parcelas = metodo === 'cartao' ? Number(selectParcelas.value) : 1;

        if (metodo === 'cartao') {
            validarNumCartao();
            validarValidade();
            validarCvv();
        }

        if (form.querySelectorAll('.input-group.erro').length > 0) {
            mostrarErroCheckout('Corrija os campos destacados em vermelho antes de finalizar.');
            const primeiroErro = form.querySelector('.input-group.erro input');
            if (primeiroErro) primeiroErro.focus();
            return;
        }

        concluirCheckout({
            nome: inputNome.value.trim(),
            email: emailDigitado,
            cpf: inputCpf.value.trim(),
            metodo,
            parcelas
        });
    });
}

function concluirCheckout({ nome, email, cpf, metodo, parcelas }) {
    const usuarios = obterUsuariosCheckout();
    const plano = PLANOS_NANKIM[planoSelecionadoCheckout] || PLANOS_NANKIM.anual;

    if (emailJaPossuiAssinatura(email)) {
        mostrarErroCheckout('Este e-mail já possui uma assinatura ativa e não pode comprar novamente.', !modoCheckoutLogado);
        return;
    }

    const expiraEm = new Date();
    expiraEm.setMonth(expiraEm.getMonth() + plano.duracaoMeses);

    const dadosAssinatura = {
        id: plano.id,
        nome: plano.nome,
        valorTotal: plano.valorTotal,
        parcelas: parcelas,
        metodoPagamento: metodo,
        dataAssinatura: new Date().toISOString(),
        expiraEm: expiraEm.toISOString()
    };

    let indice = usuarios.findIndex((u) => u.email.toLowerCase() === email);
    let usuario;

    if (indice >= 0) {
        usuario = usuarios[indice];
        usuario.nome = nome;
        usuario.matriculado = true;
        usuario.cpf = cpf;
        usuario.planoAtivo = dadosAssinatura;
        usuario.cursos = Array.isArray(usuario.cursos) ? usuario.cursos : [];

        const cursoExistente = usuario.cursos.find((c) => c.id === CHECKOUT_COURSE.id);
        if (cursoExistente) {
            cursoExistente.apenasModulo1 = false;
            cursoExistente.plano = plano.nome;
            cursoExistente.parcelas = parcelas;
            cursoExistente.metodoPagamento = metodo;
            cursoExistente.statusPagamento = 'aprovado';
        } else {
            usuario.cursos.push({
                ...CHECKOUT_COURSE,
                apenasModulo1: false,
                progresso: 0,
                ultimaAula: 0,
                aulasConcluidas: [],
                plano: plano.nome,
                parcelas: parcelas,
                metodoPagamento: metodo,
                statusPagamento: 'aprovado'
            });
        }
        usuarios[indice] = usuario;
    } else {
        usuario = {
            id: Date.now(),
            nome: nome,
            email: email,
            cpf: cpf,
            telefone: '',
            senha: `Nankim@${Date.now().toString().slice(-4)}`,
            matriculado: true,
            planoAtivo: dadosAssinatura,
            cursos: [
                {
                    ...CHECKOUT_COURSE,
                    apenasModulo1: false,
                    progresso: 0,
                    ultimaAula: 0,
                    aulasConcluidas: [],
                    plano: plano.nome,
                    parcelas: parcelas,
                    metodoPagamento: metodo,
                    statusPagamento: 'aprovado'
                }
            ]
        };
        usuarios.push(usuario);
    }

    try {
        localStorage.setItem('nankim_db', JSON.stringify(usuarios));
        sessionStorage.setItem('nankim_sessao', JSON.stringify({
            logado: true,
            tipo: 'aluno',
            perfil: 'aluno',
            nome: usuario.nome,
            email: usuario.email
        }));
    } catch (error) {
        mostrarErroCheckout('Não foi possível salvar sua assinatura neste navegador.');
        return;
    }

    limparEstadoCheckout();

    atualizarTituloCheckout('Assinatura confirmada!', '');
    document.getElementById('checkout-stage').innerHTML = `
        <div class="msg-liberado-card" style="margin-top: 1rem; align-items: center; justify-content: center; text-align: center;">
            <div class="liberado-icone-wrapper">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#27ae60" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
            <div class="liberado-textos">
                <strong style="font-size: 1.1rem; color: #166534;">${plano.nome} ativado! Acesso liberado.</strong>
            </div>
        </div>
        <div class="barra-carregando-wrapper" style="margin-top: 1rem;">
            <div class="barra-carregando-progresso" style="animation-duration: 1.5s;"></div>
        </div>
    `;

    setTimeout(() => {
        if (window.location.pathname.includes('area-aluno.html')) {
            window.location.reload();
        } else {
            window.location.href = 'area-aluno.html';
        }
    }, 1500);
}

// Limpa e fecha o modal caso o usuário clique no botão Voltar do navegador (bfcache)
window.addEventListener('pageshow', () => {
    limparEstadoCheckout();
    const modal = document.getElementById('modal-checkout');
    if (modal) {
        modal.style.display = 'none';
    }
    const stage = document.getElementById('checkout-stage');
    if (stage) {
        stage.innerHTML = '';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.botao-assinar[data-modal="checkout"]').forEach((botao) => {
        botao.addEventListener('click', iniciarCheckout);
    });
});