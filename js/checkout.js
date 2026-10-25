const CHECKOUT_COURSE = { id: 'fundamentos-desenho', nome: 'Fundamentos do Desenho' };
let usuarioCheckout = null;
let emailCheckout = '';

// SVGs minimalistas para visibilidade de senha
const SVG_OLHO_ABERTO = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
const SVG_OLHO_FECHADO = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`;

function obterUsuariosCheckout() {
    const dados = localStorage.getItem('nankim_db');
    if (!dados) return [];
    try {
        const usuarios = JSON.parse(dados);
        if (!Array.isArray(usuarios)) throw new TypeError('O cadastro local está em formato inválido.');
        return usuarios;
    } catch (e) {
        return [];
    }
}

function atualizarTituloCheckout(titulo, subtitulo) {
    document.getElementById('checkout-titulo').textContent = titulo;
    document.getElementById('checkout-subtitulo').textContent = subtitulo;
}

function mostrarErroCheckout(mensagem) {
    const container = document.getElementById('checkout-stage');
    container.querySelectorAll('.msg-erro, .msg-sucesso-info').forEach((erro) => erro.remove());
    if (!mensagem) return;
    const erro = document.createElement('p');
    erro.className = 'msg-erro';
    erro.setAttribute('role', 'alert');
    erro.textContent = mensagem;
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

// 1. ETAPA DE IDENTIFICAÇÃO (E-MAIL)
function iniciarCheckout() {
    usuarioCheckout = null;
    emailCheckout = '';
    atualizarTituloCheckout('Assinar Fundamentos do Desenho', 'Identifique sua conta para continuar.');
    
    document.getElementById('checkout-stage').innerHTML = `
        <form id="form-identificacao" novalidate>
            <div class="input-group">
                <label for="checkout-email">E-mail de acesso</label>
                <input type="email" id="checkout-email" autocomplete="email" placeholder="seuemail@dominio.com" required>
                <small class="input-feedback"></small>
            </div>
            <button type="submit" id="btn-submit-identificacao">Continuar</button>
        </form>
    `;

    const emailInput = document.getElementById('checkout-email');
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    emailInput.addEventListener('input', () => {
        const v = emailInput.value.trim().toLowerCase();
        if (!v) {
            definirErroCampoCheckout(emailInput, 'Informe seu e-mail para continuar.');
        } else if (!regexEmail.test(v)) {
            definirErroCampoCheckout(emailInput, 'E-mail inválido. Ex: nome@dominio.com.');
        } else {
            definirErroCampoCheckout(emailInput, '');
        }
    });

    document.getElementById('form-identificacao').addEventListener('submit', (event) => {
        event.preventDefault();
        emailCheckout = emailInput.value.trim().toLowerCase();
        
        if (!regexEmail.test(emailCheckout)) {
            definirErroCampoCheckout(emailInput, 'Informe um e-mail válido para continuar.');
            return;
        }

        let usuarios = obterUsuariosCheckout();
        const existente = usuarios.find((usuario) => usuario.email.toLowerCase() === emailCheckout);
        
        if (existente && existente.matriculado === true) {
            atualizarTituloCheckout('Você já tem acesso', 'Este e-mail já possui uma matrícula ativa neste curso.');
            document.getElementById('checkout-stage').innerHTML = `
                <p class="checkout-nota">Entre na sua conta para continuar os estudos.</p>
                <button type="button" id="checkout-ir-login" class="btn-pula-login">Fazer login</button>
            `;
            document.getElementById('checkout-ir-login').addEventListener('click', () => {
                document.getElementById('modal-checkout').style.display = 'none';
                if (typeof abrirModal === 'function') abrirModal('login');
            });
            return;
        }

        if (existente) {
            usuarioCheckout = existente;
            mostrarEtapaLoginCheckout();
        } else {
            mostrarEtapaCadastroCheckout();
        }
    });
}

// 2. ETAPA DE CADASTRO NO CHECKOUT
function mostrarEtapaCadastroCheckout() {
    atualizarTituloCheckout('Crie seu cadastro', 'Preencha seus dados para criar sua conta Nankim antes de finalizar.');
    
    document.getElementById('checkout-stage').innerHTML = `
        <form id="form-cadastro-checkout" novalidate>
            <div class="input-group">
                <label for="check-nome">Nome completo</label>
                <input type="text" id="check-nome" autocomplete="name" placeholder="Seu nome e sobrenome" required>
                <small class="input-feedback"></small>
            </div>

            <div class="linha-inputs">
                <div class="input-group">
                    <label for="check-email">E-mail de acesso</label>
                    <input type="email" id="check-email" readonly>
                </div>
                <div class="input-group">
                    <label for="check-confirm-email">Confirme seu e-mail</label>
                    <input type="email" id="check-confirm-email" placeholder="Repita seu e-mail" required autocomplete="off">
                    <small class="input-feedback"></small>
                </div>
            </div>

            <div class="input-group">
                <label for="check-telefone">Celular / WhatsApp (DDD + 9 dígitos)</label>
                <input type="tel" id="check-telefone" placeholder="(00) 90000-0000" maxlength="15" autocomplete="tel" required>
                <small class="input-feedback"></small>
            </div>

            <div class="linha-inputs">
                <div class="input-group">
                    <label for="check-senha">Crie sua senha</label>
                    <div class="campo-senha-wrapper">
                        <input type="password" id="check-senha" autocomplete="new-password" required placeholder="Sua senha">
                        <button type="button" class="btn-toggle-senha btn-eye" aria-label="Mostrar senha">${SVG_OLHO_ABERTO}</button>
                    </div>
                    <small class="input-feedback"></small>
                </div>
                <div class="input-group">
                    <label for="check-confirm-senha">Confirme sua senha</label>
                    <div class="campo-senha-wrapper">
                        <input type="password" id="check-confirm-senha" autocomplete="new-password" required placeholder="Repita a senha">
                        <button type="button" class="btn-toggle-senha btn-eye" aria-label="Mostrar senha">${SVG_OLHO_ABERTO}</button>
                    </div>
                    <small class="input-feedback"></small>
                </div>
            </div>

            <div class="senha-requisitos" id="painel-req-checkout">
                <span id="req-chk-minimo" class="req-item">✖ Mínimo de 8 caracteres</span>
                <span id="req-chk-maiuscula" class="req-item">✖ Pelo menos 1 letra maiúscula</span>
                <span id="req-chk-numero" class="req-item">✖ Pelo menos 1 número</span>
                <span id="req-chk-simbolo" class="req-item">✖ Pelo menos 1 caractere especial (!@#$)</span>
            </div>

            <div class="input-group checkbox-group">
                <label class="label-termos">
                    <input type="checkbox" id="check-termos" required>
                    <span>Li e concordo com os <a href="politica-privacidade.html" target="_blank">Termos de Uso e Políticas de Privacidade</a></span>
                </label>
                <small class="input-feedback"></small>
            </div>

            <button type="submit">Criar cadastro e continuar</button>
        </form>
    `;

    document.getElementById('check-email').value = emailCheckout;

    const formCad = document.getElementById('form-cadastro-checkout');
    const inputNome = document.getElementById('check-nome');
    const inputConfirmEmail = document.getElementById('check-confirm-email');
    const inputTelefone = document.getElementById('check-telefone');
    const inputSenha = document.getElementById('check-senha');
    const inputConfirmSenha = document.getElementById('check-confirm-senha');
    const checkTermos = document.getElementById('check-termos');

    inputTelefone.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 11) value = value.slice(0, 11);
        if (value.length > 6) {
            value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
        } else if (value.length > 2) {
            value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
        } else if (value.length > 0) {
            value = `(${value}`;
        }
        e.target.value = value;

        const digitos = value.replace(/\D/g, '');
        if (digitos.length < 11) {
            definirErroCampoCheckout(inputTelefone, 'Informe DDD + 9 dígitos (Ex: (61) 98765-4321).');
        } else {
            definirErroCampoCheckout(inputTelefone, '');
        }
    });

    inputNome.addEventListener('input', () => {
        const v = inputNome.value.trim();
        if (v.length < 3 || !v.includes(' ')) {
            definirErroCampoCheckout(inputNome, 'Digite seu nome e sobrenome.');
        } else {
            definirErroCampoCheckout(inputNome, '');
        }
    });

    inputConfirmEmail.addEventListener('input', () => {
        const confirmVal = inputConfirmEmail.value.trim().toLowerCase();
        if (confirmVal !== emailCheckout) {
            definirErroCampoCheckout(inputConfirmEmail, 'Os e-mails digitados não são iguais.');
        } else {
            definirErroCampoCheckout(inputConfirmEmail, '');
        }
    });

    inputSenha.addEventListener('input', () => {
        const val = inputSenha.value;
        const temMin = val.length >= 8;
        const temMai = /[A-Z]/.test(val);
        const temNum = /[0-9]/.test(val);
        const temSim = /[^A-Za-z0-9]/.test(val);

        atualizarReqChk('req-chk-minimo', temMin, 'Mínimo de 8 caracteres');
        atualizarReqChk('req-chk-maiuscula', temMai, 'Pelo menos 1 letra maiúscula');
        atualizarReqChk('req-chk-numero', temNum, 'Pelo menos 1 número');
        atualizarReqChk('req-chk-simbolo', temSim, 'Pelo menos 1 caractere especial (!@#$)');

        if (temMin && temMai && temNum && temSim) {
            definirErroCampoCheckout(inputSenha, '');
        } else {
            definirErroCampoCheckout(inputSenha, 'A senha não atende aos requisitos.');
        }

        if (inputConfirmSenha.value) {
            inputConfirmSenha.dispatchEvent(new Event('input'));
        }
    });

    function atualizarReqChk(id, valido, texto) {
        const el = document.getElementById(id);
        if (!el) return;
        if (valido) {
            el.classList.add('valido');
            el.textContent = `✔ ${texto}`;
        } else {
            el.classList.remove('valido');
            el.textContent = `x ${texto}`;
        }
    }

    inputConfirmSenha.addEventListener('input', () => {
        if (inputConfirmSenha.value !== inputSenha.value) {
            definirErroCampoCheckout(inputConfirmSenha, 'As senhas digitadas não coincidem.');
        } else {
            definirErroCampoCheckout(inputConfirmSenha, '');
        }
    });

    checkTermos.addEventListener('change', () => {
        if (!checkTermos.checked) {
            definirErroCampoCheckout(checkTermos, 'Você deve aceitar os termos de uso.');
        } else {
            definirErroCampoCheckout(checkTermos, '');
        }
    });

    formCad.querySelectorAll('.btn-toggle-senha').forEach(btn => {
        btn.addEventListener('click', () => {
            const input = btn.closest('.campo-senha-wrapper').querySelector('input');
            const visivel = input.type === 'password';
            input.type = visivel ? 'text' : 'password';
            btn.innerHTML = visivel ? SVG_OLHO_FECHADO : SVG_OLHO_ABERTO;
        });
    });

    formCad.addEventListener('submit', (event) => {
        event.preventDefault();

        [inputNome, inputConfirmEmail, inputTelefone, inputSenha, inputConfirmSenha].forEach(el => el.dispatchEvent(new Event('input')));
        checkTermos.dispatchEvent(new Event('change'));

        if (formCad.querySelectorAll('.input-group.erro').length > 0) {
            mostrarErroCheckout('Corrija os campos marcados em vermelho acima antes de prosseguir.');
            return;
        }

        let usuarios = obterUsuariosCheckout();
        if (usuarios.some((u) => u.email.toLowerCase() === emailCheckout)) {
            mostrarErroCheckout('Este e-mail já foi cadastrado.');
            return;
        }

        usuarioCheckout = {
            id: Date.now(),
            nome: inputNome.value.trim(),
            email: emailCheckout,
            telefone: inputTelefone.value.trim(),
            senha: inputSenha.value,
            matriculado: false,
            cursos: []
        };

        usuarios.push(usuarioCheckout);
        try {
            localStorage.setItem('nankim_db', JSON.stringify(usuarios));
        } catch (error) {
            mostrarErroCheckout('Não foi possível salvar seu cadastro.');
            return;
        }

        // CONFIRMAÇÃO DIRETA E ENXUTA (Sem botões)
        atualizarTituloCheckout('Cadastro realizado com sucesso!', '');
        document.getElementById('checkout-stage').innerHTML = `
            <div class="msg-sucesso-card" style="margin-top: 1rem;">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#27ae60" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                <span>Conta criada com sucesso!</span>
            </div>
            <div class="barra-carregando-wrapper" style="margin-top: 1rem;">
                <div class="barra-carregando-progresso" style="animation-duration: 1.5s;"></div>
            </div>
        `;

        // Transição automática para o pagamento em 1.5s
        setTimeout(() => {
            mostrarEtapaPagamento();
        }, 1500);
    });
}

// 3. ETAPA DE LOGIN NO CHECKOUT
function mostrarEtapaLoginCheckout() {
    atualizarTituloCheckout('Confirme sua conta', 'Este e-mail já está cadastrado. Digite sua senha para continuar.');
    
    document.getElementById('checkout-stage').innerHTML = `
        <form id="form-login-checkout" novalidate>
            <div class="input-group">
                <label for="checkout-email-existente">E-mail</label>
                <input type="email" id="checkout-email-existente" readonly>
            </div>
            <div class="input-group">
                <label for="checkout-senha-existente">Senha da conta</label>
                <div class="campo-senha-wrapper">
                    <input type="password" id="checkout-senha-existente" autocomplete="current-password" required placeholder="Digite sua senha">
                    <button type="button" class="btn-toggle-senha btn-eye" aria-label="Mostrar senha">${SVG_OLHO_ABERTO}</button>
                </div>
                <small class="input-feedback"></small>
            </div>
            <button type="submit">Confirmar e continuar</button>
        </form>
    `;

    document.getElementById('checkout-email-existente').value = emailCheckout;
    const formLog = document.getElementById('form-login-checkout');
    const inputSenhaEx = document.getElementById('checkout-senha-existente');

    inputSenhaEx.addEventListener('input', () => {
        if (!inputSenhaEx.value) {
            definirErroCampoCheckout(inputSenhaEx, 'Digite a senha da sua conta.');
        } else {
            definirErroCampoCheckout(inputSenhaEx, '');
        }
    });

    formLog.querySelector('.btn-toggle-senha').addEventListener('click', (e) => {
        const btn = e.currentTarget;
        const visivel = inputSenhaEx.type === 'password';
        inputSenhaEx.type = visivel ? 'text' : 'password';
        btn.innerHTML = visivel ? SVG_OLHO_FECHADO : SVG_OLHO_ABERTO;
    });

    formLog.addEventListener('submit', (event) => {
        event.preventDefault();
        if (inputSenhaEx.value !== usuarioCheckout.senha) {
            definirErroCampoCheckout(inputSenhaEx, 'Senha incorreta. Verifique seus dados.');
            mostrarErroCheckout('Senha incorreta. Confira seus dados e tente novamente.');
            return;
        }
        mostrarEtapaPagamento();
    });
}

// 4. ETAPA DE PAGAMENTO (CPF e CVV Sem Ocultar Dígitos)
function validarCpf(cpf) {
    const numeros = cpf.replace(/\D/g, '');
    if (numeros.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(numeros)) return false;
    return true;
}

function validarVencimentoCartao(validade) {
    if (!/^\d{2}\/\d{2}$/.test(validade)) return false;
    const [mes, ano] = validade.split('/').map(Number);
    if (mes < 1 || mes > 12) return false;
    const agora = new Date();
    const anoAtual = Number(String(agora.getFullYear()).slice(-2));
    return ano > anoAtual || (ano === anoAtual && mes >= agora.getMonth() + 1);
}

function mostrarEtapaPagamento() {
    atualizarTituloCheckout('Dados de assinatura', 'Informe CPF, titular do pagamento e escolha a forma de pagamento.');
    
    document.getElementById('checkout-stage').innerHTML = `
        <form id="form-pagamento" novalidate>
            <div class="input-group">
                <label for="checkout-cpf">CPF</label>
                <input type="text" id="checkout-cpf" inputmode="numeric" autocomplete="off" maxlength="14" placeholder="000.000.000-00" required>
                <small class="input-feedback"></small>
            </div>
            <div class="input-group">
                <label for="checkout-nome-cartao">Nome do titular do pagamento</label>
                <input type="text" id="checkout-nome-cartao" autocomplete="cc-name" placeholder="Nome como no cartão/documento" required>
                <small class="input-feedback"></small>
            </div>
            <fieldset class="metodos-pagamento">
                <legend>Método de pagamento</legend>
                <label><input type="radio" name="metodo-pagamento" value="pix" checked> PIX</label>
                <label><input type="radio" name="metodo-pagamento" value="boleto"> Boleto</label>
                <label><input type="radio" name="metodo-pagamento" value="cartao"> Cartão</label>
            </fieldset>
            <div id="dados-cartao" class="dados-cartao" hidden>
                <div class="input-group">
                    <label for="check-num-cartao">Número do cartão</label>
                    <input type="text" id="check-num-cartao" inputmode="numeric" autocomplete="cc-number" maxlength="19" placeholder="0000 0000 0000 0000" disabled>
                    <small class="input-feedback"></small>
                </div>
                <div class="linha-inputs">
                    <div class="input-group">
                        <label for="check-validade">Validade</label>
                        <input type="text" id="check-validade" inputmode="numeric" autocomplete="cc-exp" maxlength="5" placeholder="MM/AA" disabled>
                        <small class="input-feedback"></small>
                    </div>
                    <div class="input-group">
                        <label for="check-cvv">CVV</label>
                        <!-- type="text" para NÃO ocultar os dígitos do CVV -->
                        <input type="text" id="check-cvv" inputmode="numeric" autocomplete="cc-csc" maxlength="4" disabled placeholder="123">
                        <small class="input-feedback"></small>
                    </div>
                </div>
            </div>
            <p class="checkout-nota">Demonstração front-end: nenhuma cobrança real será realizada.</p>
            <button type="submit" id="btn-submit-checkout">Confirmar pagamento (simulação)</button>
        </form>
    `;

    const form = document.getElementById('form-pagamento');
    const cpf = document.getElementById('checkout-cpf');
    const nomeCartao = document.getElementById('checkout-nome-cartao');
    const dadosCartao = document.getElementById('dados-cartao');
    const camposCartao = [...dadosCartao.querySelectorAll('input')];

    cpf.addEventListener('input', () => {
        let digitos = cpf.value.replace(/\D/g, '').slice(0, 11);
        cpf.value = digitos
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2') .replace(/(\d{3})(\d{1,2})$/, '$1-$2');

        if (digitos.length < 11) {
            definirErroCampoCheckout(cpf, 'Informe os 11 dígitos do seu CPF.');
        } else {
            definirErroCampoCheckout(cpf, '');
        }
    });

    nomeCartao.addEventListener('input', () => {
        if (nomeCartao.value.trim().length < 3) {
            definirErroCampoCheckout(nomeCartao, 'Informe o nome completo do titular.');
        } else {
            definirErroCampoCheckout(nomeCartao, '');
        }
    });

    document.querySelectorAll('input[name="metodo-pagamento"]').forEach((radio) => {
        radio.addEventListener('change', () => {
            const usaCartao = radio.value === 'cartao' && radio.checked;
            dadosCartao.hidden = !usaCartao;
            camposCartao.forEach((campo) => {
                campo.disabled = !usaCartao;
                campo.required = usaCartao;
            });
            nomeCartao.closest('.input-group').querySelector('label').textContent =
                usaCartao ? 'Nome que está no cartão' : 'Nome do titular do pagamento';
        });
    });

    const numCartao = document.getElementById('check-num-cartao');
    const validadeCartao = document.getElementById('check-validade');
    const cvvCartao = document.getElementById('check-cvv');

    numCartao.addEventListener('input', (e) => {
        const numeros = e.target.value.replace(/\D/g, '').slice(0, 16);
        e.target.value = numeros.replace(/(\d{4})(?=\d)/g, '$1 ');
        if (numeros.length < 16) {
            definirErroCampoCheckout(numCartao, 'O cartão deve ter 16 dígitos.');
        } else {
            definirErroCampoCheckout(numCartao, '');
        }
    });

    validadeCartao.addEventListener('input', (e) => {
        const numeros = e.target.value.replace(/\D/g, '').slice(0, 4);
        e.target.value = numeros.length > 2 ? `${numeros.slice(0, 2)}/${numeros.slice(2)}` : numeros;
        if (!validarVencimentoCartao(e.target.value)) {
            definirErroCampoCheckout(validadeCartao, 'Validade inválida.');
        } else {
            definirErroCampoCheckout(validadeCartao, '');
        }
    });

    cvvCartao.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '').slice(0, 4);
        if (e.target.value.length < 3) {
            definirErroCampoCheckout(cvvCartao, 'CVV deve ter 3 ou 4 dígitos.');
        } else {
            definirErroCampoCheckout(cvvCartao, '');
        }
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        
        cpf.dispatchEvent(new Event('input'));
        nomeCartao.dispatchEvent(new Event('input'));

        const metodo = form.querySelector('input[name="metodo-pagamento"]:checked').value;
        if (metodo === 'cartao') {
            [numCartao, validadeCartao, cvvCartao].forEach(el => el.dispatchEvent(new Event('input')));
        }

        if (form.querySelectorAll('.input-group.erro').length > 0) {
            mostrarErroCheckout('Corrija os campos destacados acima antes de confirmar.');
            return;
        }

        concluirCheckout(metodo);
    });
}

// 5. CONCLUSÃO DA MATRÍCULA (REDIRECIONAMENTO AUTOMÁTICO SEM BOTÃO VERMELHO)
function concluirCheckout(metodo) {
    let usuarios = obterUsuariosCheckout();

    const indice = usuarios.findIndex((usuario) => usuario.email.toLowerCase() === emailCheckout);
    if (indice < 0) {
        mostrarErroCheckout('Não encontramos seu cadastro. Volte e confirme os dados da conta.');
        return;
    }

    const usuario = usuarios[indice];
    usuario.matriculado = true;
    usuario.cursos = Array.isArray(usuario.cursos) ? usuario.cursos : [];
    const matricula = usuario.cursos.find((curso) => curso.id === CHECKOUT_COURSE.id);
    
    if (matricula) {
        matricula.metodoPagamento = metodo;
        matricula.statusPagamento = 'simulado';
    } else {
        usuario.cursos.push({
            ...CHECKOUT_COURSE,
            progresso: 0,
            ultimaAula: 0,
            aulasConcluidas: [],
            metodoPagamento: metodo,
            statusPagamento: 'simulado'
        });
    }

    usuarios[indice] = usuario;
    try {
        localStorage.setItem('nankim_db', JSON.stringify(usuarios));
    } catch (error) {
        mostrarErroCheckout('Não foi possível salvar a matrícula neste navegador.');
        return;
    }

    try {
        sessionStorage.setItem('nankim_sessao', JSON.stringify({
            logado: true,
            nome: usuario.nome,
            email: usuario.email
        }));
    } catch (error) {
        console.error('Erro ao registrar sessão:', error);
    }

    // TELA FINAL DIRETA E MINIMALISTA
    atualizarTituloCheckout('Pagamento concluído', '');

    document.getElementById('checkout-stage').innerHTML = `
        <div class="msg-liberado-card" style="margin-top: 1rem; align-items: center; justify-content: center; text-align: center;">
            <div class="liberado-icone-wrapper">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#27ae60" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
            <div class="liberado-textos">
                <strong style="font-size: 1.1rem; color: #166534;">Acesso liberado!</strong>
            </div>
        </div>
        <div class="barra-carregando-wrapper" style="margin-top: 1rem;">
            <div class="barra-carregando-progresso" style="animation-duration: 1.5s;"></div>
        </div>
    `;

    // Redireciona direto para a Área do Aluno em 1.5s
    setTimeout(() => {
        window.location.href = 'area-aluno.html';
    }, 1500);
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.botao-assinar[data-modal="checkout"]').forEach((botao) => {
        botao.addEventListener('click', iniciarCheckout);
    });
});