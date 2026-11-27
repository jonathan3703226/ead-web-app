function injetarModaisAutenticacao() {
    // 1. Modal de Login Único (Identifica automaticamente Aluno ou Admin)
    if (!document.getElementById('modal-login')) {
        document.body.insertAdjacentHTML('beforeend', `
            <div id="modal-login" class="modal">
                <div class="modal-content" role="dialog" aria-modal="true" aria-labelledby="titulo-login">
                    <button class="close-btn" type="button" data-close="login" aria-label="Fechar">&times;</button>

                    <h2 id="titulo-login">Entrar na Nankim</h2>
                    
                    <form id="form-login" novalidate>
                        <div class="input-group">
                            <label for="login-email">E-mail</label>
                            <input type="email" id="login-email" placeholder="seuemail@dominio.com" required autocomplete="email">
                            <small class="input-feedback"></small>
                        </div>
                        <div class="input-group">
                            <label for="login-senha">Senha</label>
                            <div class="campo-senha-wrapper">
                                <input type="password" id="login-senha" placeholder="Digite sua senha" required autocomplete="current-password">
                                <button type="button" class="btn-toggle-senha btn-eye" aria-label="Mostrar senha">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                        <circle cx="12" cy="12" r="3"></circle>
                                    </svg>
                                </button>
                            </div>
                            <small class="input-feedback"></small>
                        </div>

                        <!-- Card com credenciais de teste do Admin para demonstração -->
                        <div id="card-credenciais-admin" style="font-size: 0.78rem; color: #cbd5e1; background: #181818; border: 1px solid rgba(243, 156, 18, 0.35); padding: 0.7rem 0.85rem; border-radius: 10px; margin-bottom: 1rem; display: flex; flex-direction: column; gap: 0.35rem;">
                            <div style="display:flex;align-items:center;justify-content:space-between;gap:0.5rem;">
                                <span style="color:#f39c12;font-weight:800;text-transform:uppercase;letter-spacing:0.04em;font-size:0.7rem;">
                                    🛡️ Acesso Administrativo (Demo)
                                </span>
                                <button type="button" id="btn-preencher-admin" style="background:rgba(243,156,18,0.16);border:1px solid rgba(243,156,18,0.45);color:#f39c12;font-size:0.7rem;font-weight:800;padding:0.2rem 0.55rem;border-radius:6px;cursor:pointer;">
                                    Preencher
                                </button>
                            </div>
                            <span>E-mail: <strong style="color:#ffffff;">admin@nankim.com.br</strong> · Senha: <strong style="color:#ffffff;">Nankim@2026#Adm</strong></span>
                        </div>

                        <div class="login-acoes-auxiliares" id="container-esqueci-senha">
                            <a href="#" id="link-esqueci-senha">Esqueceu sua senha?</a>
                        </div>

                        <button type="submit" id="btn-submit-login">Entrar na Plataforma</button>

                        <p class="alternar-cadastro" id="container-alternar-cadastro">
                            <span>Ainda não tem conta?</span> 
                            <button type="button" id="btn-alternar-para-cadastro">Cadastre-se</button>
                        </p>
                    </form>
                </div>
            </div>
        `);
    }

    // 2. Modal de Cadastro Completo
    if (!document.getElementById('modal-cadastro')) {
        document.body.insertAdjacentHTML('beforeend', `
            <div id="modal-cadastro" class="modal">
                <div class="modal-content modal-largo" role="dialog" aria-modal="true" aria-labelledby="titulo-cadastro">
                    <button class="close-btn" type="button" data-close="cadastro" aria-label="Fechar">&times;</button>
                    <h2 id="titulo-cadastro">Crie sua conta Nankim</h2>
                    
                    <form id="form-cadastro" novalidate>
                        <div class="input-group">
                            <label for="cad-nome">Nome completo</label>
                            <input type="text" id="cad-nome" placeholder="Seu nome e sobrenome" required autocomplete="name">
                            <small class="input-feedback"></small>
                        </div>

                        <div class="linha-inputs">
                            <div class="input-group">
                                <label for="cad-email">E-mail de acesso</label>
                                <input type="email" id="cad-email" placeholder="seuemail@dominio.com" required autocomplete="email">
                                <small class="input-feedback"></small>
                            </div>
                            <div class="input-group">
                                <label for="cad-confirm-email">Confirme seu e-mail</label>
                                <input type="email" id="cad-confirm-email" placeholder="Repita seu e-mail" required autocomplete="off">
                                <small class="input-feedback"></small>
                            </div>
                        </div>

                        <div class="input-group">
                            <label for="cad-telefone">Celular / WhatsApp (DDD + 9 dígitos)</label>
                            <input type="tel" id="cad-telefone" placeholder="(00) 90000-0000" maxlength="15" autocomplete="tel" required>
                            <small class="input-feedback"></small>
                        </div>

                        <div class="linha-inputs">
                            <div class="input-group">
                                <label for="cad-senha">Crie sua senha</label>
                                <div class="campo-senha-wrapper">
                                    <input type="password" id="cad-senha" placeholder="Digite sua senha" required autocomplete="new-password">
                                    <button type="button" class="btn-toggle-senha btn-eye" aria-label="Mostrar senha">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                            <circle cx="12" cy="12" r="3"></circle>
                                        </svg>
                                    </button>
                                </div>
                                <small class="input-feedback"></small>
                            </div>
                            <div class="input-group">
                                <label for="cad-confirm-senha">Confirme sua senha</label>
                                <div class="campo-senha-wrapper">
                                    <input type="password" id="cad-confirm-senha" placeholder="Repita sua senha" required autocomplete="new-password">
                                    <button type="button" class="btn-toggle-senha btn-eye" aria-label="Mostrar senha">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                            <circle cx="12" cy="12" r="3"></circle>
                                        </svg>
                                    </button>
                                </div>
                                <small class="input-feedback"></small>
                            </div>
                        </div>

                        <div class="senha-requisitos" id="painel-requisitos-senha">
                            <span id="req-minimo" class="req-item">✖ Mínimo de 8 caracteres</span>
                            <span id="req-maiuscula" class="req-item">✖ Pelo menos 1 letra maiúscula</span>
                            <span id="req-numero" class="req-item">✖ Pelo menos 1 número</span>
                            <span id="req-simbolo" class="req-item">✖ Pelo menos 1 caractere especial (!@#$)</span>
                        </div>

                        <div class="input-group checkbox-group">
                            <label class="label-termos">
                                <input type="checkbox" id="cad-termos" required>
                                <span>Li e aceito os <button type="button" class="link-termos-modal" data-modal="termos">Termos de Uso e Política de Privacidade</button></span>
                            </label>
                            <small class="input-feedback"></small>
                        </div>

                        <button type="submit" id="btn-submit-cadastro">Criar minha conta</button>
                        
                        <p class="alternar-cadastro">
                            <span>Já possui uma conta?</span> 
                            <button type="button" id="btn-alternar-para-login">Fazer login</button>
                        </p>
                    </form>
                </div>
            </div>
        `);
    }
}

function obterUsuarios() {
    const dados = localStorage.getItem('nankim_db');
    let usuarios = [];
    if (dados) {
        try {
            const parsed = JSON.parse(dados);
            if (Array.isArray(parsed)) usuarios = parsed;
        } catch (error) {
            usuarios = [];
        }
    }

    // Garante que a conta administrativa padrão exista com a senha forte atualizada
    const adminEmail = 'admin@nankim.com.br';
    const senhaForteAdmin = 'Nankim@2026#Adm';
    const idxAdmin = usuarios.findIndex((u) => String(u.email || '').toLowerCase() === adminEmail);

    if (idxAdmin === -1) {
        usuarios.push({
            id: 1,
            nome: 'Prof. Thiago Nankim (Admin)',
            email: adminEmail,
            senha: senhaForteAdmin,
            role: 'admin',
            matriculado: true,
            modulo1_liberado: true
        });
    } else if (usuarios[idxAdmin].senha === 'admin123') {
        usuarios[idxAdmin].senha = senhaForteAdmin;
    }

    try {
        localStorage.setItem('nankim_db', JSON.stringify(usuarios));
    } catch (_) {}

    return usuarios;
}
function configurarAutenticacao() {
    const formLogin = document.getElementById('form-login');
    const formCadastro = document.getElementById('form-cadastro');

    const inputNomeCad = document.getElementById('cad-nome');
    const inputEmailCad = document.getElementById('cad-email');
    const inputConfirmEmailCad = document.getElementById('cad-confirm-email');
    const inputTelefoneCad = document.getElementById('cad-telefone');
    const inputSenhaCad = document.getElementById('cad-senha');
    const inputConfirmSenhaCad = document.getElementById('cad-confirm-senha');
    const checkTermosCad = document.getElementById('cad-termos');
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    const estadoCadastro = {
        nome: '',
        email: '',
        confirmEmail: '',
        telefone: '',
        senha: '',
        confirmSenha: '',
        termos: false,
        touched: {}
    };

    function salvarEstadoInputs() {
        if (inputNomeCad) estadoCadastro.nome = inputNomeCad.value;
        if (inputEmailCad) estadoCadastro.email = inputEmailCad.value;
        if (inputConfirmEmailCad) estadoCadastro.confirmEmail = inputConfirmEmailCad.value;
        if (inputTelefoneCad) estadoCadastro.telefone = inputTelefoneCad.value;
        if (inputSenhaCad) estadoCadastro.senha = inputSenhaCad.value;
        if (inputConfirmSenhaCad) estadoCadastro.confirmSenha = inputConfirmSenhaCad.value;
        if (checkTermosCad) estadoCadastro.termos = checkTermosCad.checked;
    }

    function restaurarEstadoInputs() {
        if (inputNomeCad) inputNomeCad.value = estadoCadastro.nome;
        if (inputEmailCad) inputEmailCad.value = estadoCadastro.email;
        if (inputConfirmEmailCad) inputConfirmEmailCad.value = estadoCadastro.confirmEmail;
        if (inputTelefoneCad) inputTelefoneCad.value = estadoCadastro.telefone;
        if (inputSenhaCad) inputSenhaCad.value = estadoCadastro.senha;
        if (inputConfirmSenhaCad) inputConfirmSenhaCad.value = estadoCadastro.confirmSenha;
        if (checkTermosCad) checkTermosCad.checked = estadoCadastro.termos;

        if (estadoCadastro.touched['cad-nome']) validarNomeCad(false);
        if (estadoCadastro.touched['cad-email']) validarEmailCad(false);
        if (estadoCadastro.touched['cad-confirm-email']) validarConfirmEmailCad(false);
        if (estadoCadastro.touched['cad-telefone']) validarTelefoneCad(false);
        if (estadoCadastro.touched['cad-senha']) validarSenhaCad(false);
        if (estadoCadastro.touched['cad-confirm-senha']) validarConfirmSenhaCad(false);
        if (estadoCadastro.touched['cad-termos']) validarTermosCad(false);
    }

    function limparEstadoCadastro() {
        estadoCadastro.nome = '';
        estadoCadastro.email = '';
        estadoCadastro.confirmEmail = '';
        estadoCadastro.telefone = '';
        estadoCadastro.senha = '';
        estadoCadastro.confirmSenha = '';
        estadoCadastro.termos = false;
        estadoCadastro.touched = {};

        if (formCadastro) {
            formCadastro.reset();
            formCadastro.querySelectorAll('.input-group').forEach((g) => {
                g.classList.remove('erro', 'sucesso');
            });
            formCadastro.querySelectorAll('.input-feedback').forEach((f) => {
                f.textContent = '';
            });
            atualizarReq('req-minimo', false, 'Mínimo de 8 caracteres');
            atualizarReq('req-maiuscula', false, 'Pelo menos 1 letra maiúscula');
            atualizarReq('req-numero', false, 'Pelo menos 1 número');
            atualizarReq('req-simbolo', false, 'Pelo menos 1 caractere especial (!@#$)');
        }
    }

    const svgOlhoAberto = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
    const svgOlhoFechado = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`;

    function exibirModal(id) {
        const modal = document.getElementById(id);
        if (!modal) return;
        if (id === 'modal-cadastro') {
            restaurarEstadoInputs();
        }
        modal.style.display = 'flex';
    }

    function ocultarModal(id) {
        const modal = document.getElementById(id);
        if (!modal) return;
        if (id === 'modal-cadastro') {
            salvarEstadoInputs();
        }
        modal.style.display = 'none';
    }

    function definirErroCampo(inputEl, mensagem) {
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

    function mostrarMensagemGeral(form, texto, tipo = 'msg-erro') {
        if (!form) return;
        form.querySelectorAll('.msg-erro, .msg-sucesso-info').forEach((m) => m.remove());
        if (!texto) return;
        const mensagem = document.createElement('div');
        mensagem.className = tipo;
        mensagem.setAttribute('role', 'status');
        mensagem.textContent = texto;
        form.insertBefore(mensagem, form.firstChild);
    }

    // 1. OUVINTE GLOBAL DE CLIQUES
    document.addEventListener('click', (e) => {
        const alvo = e.target instanceof Element ? e.target : null;
        if (!alvo) return;

       if (alvo.closest('#btn-preencher-admin')) {
            e.preventDefault();
            const emailInput = document.getElementById('login-email');
            const senhaInput = document.getElementById('login-senha');
            if (emailInput) emailInput.value = 'admin@nankim.com.br';
            if (senhaInput) senhaInput.value = 'Nankim@2026#Adm';
            mostrarMensagemGeral(formLogin, '');
            return;
        }

        const linkEsqueci = alvo.closest('#link-esqueci-senha');
        if (linkEsqueci) {
            e.preventDefault();
            const emailInput = document.getElementById('login-email');
            const emailVal = emailInput ? emailInput.value.trim().toLowerCase() : '';

            if (!emailVal || !regexEmail.test(emailVal)) {
                definirErroCampo(emailInput, 'Digite seu e-mail acima para recuperar a senha.');
                mostrarMensagemGeral(formLogin, 'Digite um e-mail válido no campo acima para recuperar a senha.');
                if (emailInput) emailInput.focus();
                return;
            }

            definirErroCampo(emailInput, '');
            mostrarMensagemGeral(
                formLogin, 
                `Um e-mail de redefinição de senha foi enviado para ${emailVal}.`, 
                'msg-sucesso-info'
            );
            return;
        }

        const btnToggle = alvo.closest('.btn-toggle-senha');
        if (btnToggle) {
            e.preventDefault();
            const wrapper = btnToggle.closest('.campo-senha-wrapper');
            const inputSenha = wrapper ? wrapper.querySelector('input') : null;
            if (inputSenha) {
                const visivel = inputSenha.type === 'password';
                inputSenha.type = visivel ? 'text' : 'password';
                btnToggle.innerHTML = visivel ? svgOlhoFechado : svgOlhoAberto;
            }
            return;
        }

        if (alvo.closest('#btn-alternar-para-cadastro') || alvo.closest('[data-modal="cadastro"]')) {
            e.preventDefault();
            ocultarModal('modal-login');
            exibirModal('modal-cadastro');
            return;
        }

        if (alvo.closest('#btn-alternar-para-login') || alvo.closest('[data-modal="login"]')) {
            e.preventDefault();
            ocultarModal('modal-cadastro');
            exibirModal('modal-login');
            return;
        }

        const btnFechar = alvo.closest('[data-close]');
        if (btnFechar) {
            e.preventDefault();
            const modalId = btnFechar.getAttribute('data-close');
            ocultarModal(`modal-${modalId}`);
        }
    });

// 2. VALIDAÇÃO DE CADASTRO (SEM BLOQUEAR DIGITAÇÃO E COM REGRA SIMPLES DE SENHA)
    function validarNomeCad(marcarTouched = true) {
        if (marcarTouched) estadoCadastro.touched['cad-nome'] = true;
        salvarEstadoInputs();
        const v = inputNomeCad.value.trim();
        if (v.length < 3 || !v.includes(' ')) {
            definirErroCampo(inputNomeCad, 'Digite seu nome e sobrenome.');
        } else {
            definirErroCampo(inputNomeCad, '');
        }
    }

    function validarEmailCad(marcarTouched = true) {
        if (marcarTouched) estadoCadastro.touched['cad-email'] = true;
        salvarEstadoInputs();
        const v = inputEmailCad.value.trim().toLowerCase();
        if (!regexEmail.test(v)) {
            definirErroCampo(inputEmailCad, 'Informe um e-mail válido (ex: nome@dominio.com).');
        } else {
            definirErroCampo(inputEmailCad, '');
        }

        if (inputConfirmEmailCad && (inputConfirmEmailCad.value || estadoCadastro.touched['cad-confirm-email'])) {
            validarConfirmEmailCad(false);
        }
    }

    function validarConfirmEmailCad(marcarTouched = true) {
        if (marcarTouched) estadoCadastro.touched['cad-confirm-email'] = true;
        salvarEstadoInputs();
        const confirmVal = inputConfirmEmailCad.value.trim().toLowerCase();
        const origVal = inputEmailCad ? inputEmailCad.value.trim().toLowerCase() : '';

        if (!confirmVal || confirmVal !== origVal) {
            definirErroCampo(inputConfirmEmailCad, 'Os e-mails digitados não são iguais.');
        } else {
            definirErroCampo(inputConfirmEmailCad, '');
        }
    }

    function validarTelefoneCad(marcarTouched = true) {
        if (marcarTouched) estadoCadastro.touched['cad-telefone'] = true;
        salvarEstadoInputs();
        const digitos = inputTelefoneCad.value.replace(/\D/g, '');
        if (digitos.length < 11) {
            definirErroCampo(inputTelefoneCad, 'Informe DDD + 9 dígitos (Ex: (61) 98765-4321).');
        } else {
            definirErroCampo(inputTelefoneCad, '');
        }
    }

    function atualizarReq(id, valido, texto) {
        const el = document.getElementById(id);
        if (!el) return;
        if (valido) {
            el.classList.add('valido');
            el.textContent = `✔ ${texto}`;
        } else {
            el.classList.remove('valido');
            el.textContent = `✖ ${texto}`;
        }
    }

    function validarSenhaCad(marcarTouched = true, mostrarErroNoCampo = false) {
        if (marcarTouched) estadoCadastro.touched['cad-senha'] = true;
        salvarEstadoInputs();
        const val = inputSenhaCad.value;
        const temMin = val.length >= 6;
        const temMai = /[A-Z]/.test(val);
        const temNum = /[0-9]/.test(val);

        atualizarReq('req-minimo', temMin, 'Mínimo de 6 caracteres');
        atualizarReq('req-maiuscula', temMai, 'Pelo menos 1 letra maiúscula');
        atualizarReq('req-numero', temNum, 'Pelo menos 1 número');

        // Oculta o requisito de símbolo especial para facilitar o cadastro
        const reqSimbolo = document.getElementById('req-simbolo');
        if (reqSimbolo) reqSimbolo.style.display = 'none';

        const grupo = inputSenhaCad.closest('.input-group');
        const feedback = grupo?.querySelector('.input-feedback');

        if (temMin && temMai && temNum) {
            grupo?.classList.remove('erro');
            grupo?.classList.add('sucesso');
            if (feedback) feedback.textContent = '';
        } else if (mostrarErroNoCampo) {
            grupo?.classList.add('erro');
            grupo?.classList.remove('sucesso');
            if (feedback) feedback.textContent = 'Complete os 3 requisitos da senha abaixo.';
        } else {
            // Enquanto o usuário ainda está digitando, não exibe mensagem vermelha de erro
            grupo?.classList.remove('erro', 'sucesso');
            if (feedback) feedback.textContent = '';
        }

        if (inputConfirmSenhaCad && (inputConfirmSenhaCad.value || estadoCadastro.touched['cad-confirm-senha'])) {
            validarConfirmSenhaCad(false);
        }
    }

    function validarConfirmSenhaCad(marcarTouched = true) {
        if (marcarTouched) estadoCadastro.touched['cad-confirm-senha'] = true;
        salvarEstadoInputs();
        if (!inputConfirmSenhaCad.value || inputConfirmSenhaCad.value !== inputSenhaCad.value) {
            definirErroCampo(inputConfirmSenhaCad, 'As senhas digitadas não coincidem.');
        } else {
            definirErroCampo(inputConfirmSenhaCad, '');
        }
    }

    function validarTermosCad(marcarTouched = true) {
        if (marcarTouched) estadoCadastro.touched['cad-termos'] = true;
        salvarEstadoInputs();
        if (!checkTermosCad.checked) {
            definirErroCampo(checkTermosCad, 'Aceite os termos para continuar.');
        } else {
            definirErroCampo(checkTermosCad, '');
        }
    }

    if (inputTelefoneCad) {
        inputTelefoneCad.addEventListener('blur', () => validarTelefoneCad(true));
        inputTelefoneCad.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '').slice(0, 11);

            if (value.length > 6) {
                value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
            } else if (value.length > 2) {
                value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
            } else if (value.length > 0) {
                value = `(${value}`;
            }
            e.target.value = value;

            if (estadoCadastro.touched['cad-telefone']) validarTelefoneCad(true);
        });
    }

    if (inputNomeCad) {
        inputNomeCad.addEventListener('blur', () => validarNomeCad(true));
        inputNomeCad.addEventListener('input', () => {
            if (estadoCadastro.touched['cad-nome']) validarNomeCad(true);
        });
    }

    if (inputEmailCad) {
        inputEmailCad.addEventListener('blur', () => validarEmailCad(true));
        inputEmailCad.addEventListener('input', () => {
            if (estadoCadastro.touched['cad-email']) validarEmailCad(true);
        });
    }

    if (inputConfirmEmailCad) {
        inputConfirmEmailCad.addEventListener('blur', () => validarConfirmEmailCad(true));
        inputConfirmEmailCad.addEventListener('input', () => {
            if (estadoCadastro.touched['cad-confirm-email']) validarConfirmEmailCad(true);
        });
    }

    if (inputSenhaCad) {
        inputSenhaCad.addEventListener('input', () => validarSenhaCad(true, false));
        inputSenhaCad.addEventListener('blur', () => validarSenhaCad(true, true));
    }

    if (inputConfirmSenhaCad) {
        inputConfirmSenhaCad.addEventListener('blur', () => validarConfirmSenhaCad(true));
        inputConfirmSenhaCad.addEventListener('input', () => {
            if (estadoCadastro.touched['cad-confirm-senha']) validarConfirmSenhaCad(true);
        });
    }

    if (checkTermosCad) {
        checkTermosCad.addEventListener('change', () => validarTermosCad(true));
    }

    // 3. SUBMISSÃO DO CADASTRO (LOGIN AUTOMÁTICO + MÓDULO 1 LIBERADO)
    if (formCadastro) {
        formCadastro.addEventListener('submit', (event) => {
            event.preventDefault();
            mostrarMensagemGeral(formCadastro, '');

            validarNomeCad(true);
            validarEmailCad(true);
            validarConfirmEmailCad(true);
            validarTelefoneCad(true);
            validarSenhaCad(true, true);
            validarConfirmSenhaCad(true);
            validarTermosCad(true);

            if (formCadastro.querySelectorAll('.input-group.erro').length > 0) {
                mostrarMensagemGeral(formCadastro, 'Corrija os campos destacados em vermelho acima.');
                const primeiroErro = formCadastro.querySelector('.input-group.erro input');
                if (primeiroErro) primeiroErro.focus();
                return;
            }

            const email = inputEmailCad.value.trim().toLowerCase();
            const usuarios = obterUsuarios();

            if (usuarios.some((c) => c.email.toLowerCase() === email)) {
                definirErroCampo(inputEmailCad, 'Este e-mail já está cadastrado.');
                mostrarMensagemGeral(formCadastro, 'Este e-mail já está cadastrado. Faça login para continuar.');
                inputEmailCad.focus();
                return;
            }

            const novoUsuario = {
                id: Date.now(),
                nome: inputNomeCad.value.trim(),
                email: email,
                telefone: inputTelefoneCad.value.trim(),
                senha: inputSenhaCad.value,
                role: 'aluno',
                matriculado: false,
                acessoBloqueado: false,
                modulo1_liberado: true,
                cursos: [
                    {
                        id: 'fundamentos-desenho',
                        nome: 'Fundamentos do Desenho',
                        apenasModulo1: true,
                        progresso: 0,
                        ultimaAula: 0,
                        aulasConcluidas: [],
                        plano: 'Degustação Gratuita (Módulo I)',
                        statusPagamento: 'gratuito'
                    }
                ]
            };

            usuarios.push(novoUsuario);

            try {
                localStorage.setItem('nankim_db', JSON.stringify(usuarios));
                localStorage.setItem('nankim_aulas_concluidas', JSON.stringify([]));
                localStorage.removeItem('nankim_ultima_aula');
                localStorage.removeItem('nankim_checklists_aulas');
                localStorage.removeItem('nankim_certificado_liberado');
                localStorage.removeItem(`nankim_progresso_${email}`);
                localStorage.removeItem(`nankim_notificacoes_${email}`);

                sessionStorage.setItem('nankim_sessao', JSON.stringify({
                    logado: true,
                    role: 'aluno',
                    tipo: 'aluno',
                    perfil: 'aluno',
                    nome: novoUsuario.nome,
                    email: novoUsuario.email
                }));
                sessionStorage.removeItem('nankim_degustacao_pendente');
            } catch (error) {
                mostrarMensagemGeral(formCadastro, 'Não foi possível concluir seu cadastro neste navegador.');
                return;
            }

            limparEstadoCadastro();

            const modalCadastroContent = document.querySelector('#modal-cadastro .modal-content');
            if (modalCadastroContent) {
                modalCadastroContent.innerHTML = `
                    <div style="padding: 1.5rem 0.5rem; text-align: center;">
                        <h2 style="margin-bottom: 0.75rem;">Conta criada com sucesso!</h2>
                        <div class="msg-liberado-card" style="margin-top: 1rem; align-items: center; justify-content: center; text-align: center;">
                            <div class="liberado-icone-wrapper">
                                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#27ae60" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            </div>
                            <div class="liberado-textos">
                                <strong style="font-size: 1.05rem; color: #166534;">Módulo I gratuito liberado! Entrando na Área do Aluno...</strong>
                            </div>
                        </div>
                        <div class="barra-carregando-wrapper" style="margin-top: 1rem;">
                            <div class="barra-carregando-progresso" style="animation-duration: 1.5s;"></div>
                        </div>
                    </div>
                `;
            }

            setTimeout(() => {
                window.location.href = 'area-aluno.html';
            }, 1500);
        });
    }

    // 4. SUBMISSÃO DO LOGIN ÚNICO (COM BLOQUEIO DENTRO DO PRÓPRIO MODAL)
    if (formLogin) {
        formLogin.addEventListener('submit', (event) => {
            event.preventDefault();
            mostrarMensagemGeral(formLogin, '');

            const email = document.getElementById('login-email').value.trim().toLowerCase();
            const senha = document.getElementById('login-senha').value;

            if (!regexEmail.test(email) || senha.length < 6) {
                mostrarMensagemGeral(formLogin, 'Informe um e-mail válido e sua senha.');
                return;
            }

            const usuarios = obterUsuarios();
            const usuario = usuarios.find((c) => String(c.email || '').toLowerCase() === email);

            if (!usuario || usuario.senha !== senha) {
                mostrarMensagemGeral(formLogin, 'E-mail ou senha incorretos.');
                return;
            }

            // Bloqueia o login diretamente dentro do modal bonito (sem redirecionar nem usar alert feio)
            if (usuario.acessoBloqueado === true) {
                mostrarMensagemGeral(
                    formLogin,
                    '🔒 Seu acesso à plataforma está temporariamente bloqueado pela administração. Entre em contato com o suporte.'
                );
                return;
            }

            // A) SE FOR ADMINISTRADOR -> VAI DIRETO PARA O PAINEL ADMIN
            if (usuario.role === 'admin' || email === 'admin@nankim.com.br') {
                try {
                    sessionStorage.setItem('nankim_sessao', JSON.stringify({
                        logado: true,
                        role: 'admin',
                        tipo: 'admin',
                        perfil: 'admin',
                        nome: usuario.nome || 'Administrador Nankim',
                        email: usuario.email
                    }));
                } catch (error) {
                    console.error('Erro ao iniciar sessão admin:', error);
                }
                window.location.href = 'admin.html';
                return;
            }

            // B) SE FOR ALUNO -> GARANTE MÓDULO I E VAI PARA ÁREA DO ALUNO
            if (!usuario.matriculado && usuario.modulo1_liberado !== true) {
                usuario.modulo1_liberado = true;
            }

            if (!Array.isArray(usuario.cursos) || usuario.cursos.length === 0) {
                usuario.cursos = [
                    {
                        id: 'fundamentos-desenho',
                        nome: 'Fundamentos do Desenho',
                        apenasModulo1: !usuario.matriculado,
                        progresso: 0,
                        ultimaAula: 0,
                        aulasConcluidas: [],
                        plano: usuario.matriculado ? 'Plano Ativo' : 'Degustação Gratuita (Módulo I)',
                        statusPagamento: usuario.matriculado ? 'aprovado' : 'gratuito'
                    }
                ];
            }

            try {
                localStorage.setItem('nankim_db', JSON.stringify(usuarios));
                sessionStorage.setItem('nankim_sessao', JSON.stringify({
                    logado: true,
                    role: 'aluno',
                    tipo: 'aluno',
                    perfil: 'aluno',
                    nome: usuario.nome || email.split('@')[0],
                    email: usuario.email
                }));
            } catch (error) {
                console.error('Erro ao iniciar sessão:', error);
            }

            window.location.href = 'area-aluno.html';
        });
    }
}

// Limpa e fecha os modais caso o usuário clique no botão Voltar do navegador (bfcache)
window.addEventListener('pageshow', () => {
    const modalLogin = document.getElementById('modal-login');
    const modalCadastro = document.getElementById('modal-cadastro');
    if (modalLogin) modalLogin.style.display = 'none';
    if (modalCadastro) modalCadastro.style.display = 'none';
});

document.addEventListener('DOMContentLoaded', () => {
    obterUsuarios();
    injetarModaisAutenticacao();
    configurarAutenticacao();

    const params = new URLSearchParams(window.location.search);
    if (params.get('bloqueado') === '1') {
        const modalLogin = document.getElementById('modal-login');
        const formLogin = document.getElementById('form-login');
        if (modalLogin && formLogin) {
            modalLogin.style.display = 'flex';
            formLogin.querySelectorAll('.msg-erro, .msg-sucesso-info').forEach((m) => m.remove());
            const aviso = document.createElement('div');
            aviso.className = 'msg-erro';
            aviso.setAttribute('role', 'status');
            aviso.textContent = '🔒 Seu acesso à plataforma foi temporariamente bloqueado pela administração. Entre em contato com o suporte.';
            formLogin.insertBefore(aviso, formLogin.firstChild);
        }
        window.history.replaceState({}, document.title, window.location.pathname);
    }
});