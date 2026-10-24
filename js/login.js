function injetarModaisAutenticacao() {
    // 1. Modal de Login (Apenas E-mail e Senha)
    if (!document.getElementById('modal-login')) {
        document.body.insertAdjacentHTML('beforeend', `
            <div id="modal-login" class="modal">
                <div class="modal-content" role="dialog" aria-modal="true" aria-labelledby="titulo-login">
                    <button class="close-btn" type="button" data-close="login" aria-label="Fechar">&times;</button>
                    <h2 id="titulo-login">Login - Área do Aluno</h2>
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
                        <div class="login-acoes-auxiliares">
                            <a href="#" id="link-esqueci-senha">Esqueceu sua senha?</a>
                        </div>
                        <button type="submit" id="btn-submit-login">Entrar na Plataforma</button>
                        <p class="alternar-cadastro">
                            <span>Ainda não tem conta?</span> 
                            <button type="button" class="btn-abrir-cadastro">Cadastre-se</button>
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
                            <input type="text" id="cad-nome" placeholder="Seu nome completo" required autocomplete="name">
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

                        <!-- Indicadores visuais de força da senha -->
                        <div class="senha-requisitos" id="painel-requisitos-senha">
                            <span id="req-minimo" class="req-item">✖ Mínimo de 8 caracteres</span>
                            <span id="req-maiuscula" class="req-item">✖ Pelo menos 1 letra maiúscula</span>
                            <span id="req-numero" class="req-item">✖ Pelo menos 1 número</span>
                            <span id="req-simbolo" class="req-item">✖ Pelo menos 1 caractere especial (!@#$)</span>
                        </div>

                        <div class="input-group checkbox-group">
                            <label class="label-termos">
                                <input type="checkbox" id="cad-termos" required>
                                <span>Li e aceito os <a href="#" data-modal="termos">Termos de Uso e Política de Privacidade</a></span>
                            </label>
                            <small class="input-feedback"></small>
                        </div>

                        <button type="submit" id="btn-submit-cadastro">Criar minha conta</button>
                        
                        <p class="alternar-cadastro">
                            <span>Já possui uma conta?</span> 
                            <button type="button" class="btn-abrir-login">Fazer login</button>
                        </p>
                    </form>
                </div>
            </div>
        `);
    }
}

function obterUsuarios() {
    const dados = localStorage.getItem('nankim_db');
    if (!dados) return [];
    try {
        const usuarios = JSON.parse(dados);
        if (!Array.isArray(usuarios)) throw new TypeError('O banco local precisa ser uma lista.');
        return usuarios;
    } catch (error) {
        console.error('Não foi possível ler as contas locais:', error);
        return [];
    }
}

function configurarAutenticacao() {
    const formLogin = document.getElementById('form-login');
    const formCadastro = document.getElementById('form-cadastro');


    const svgOlhoAberto = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
    const svgOlhoFechado = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`;
    // Salva a nova conta liberando o Módulo 1 do curso Fundamentos do Desenho
    const novoUsuario = {
        id: Date.now(),
        nome: inputNomeCad.value.trim(),
        email: email,
        telefone: inputTelefone.value.trim(),
        senha: inputSenhaCad.value,
        matriculado: false, // Matricula total do curso continua sendo via checkout
        moduloGratuitoLiberado: true, // Libera o Módulo 1 na área do aluno
        cursos: [
            {
                id: 'fundamentos-desenho',
                nome: 'Fundamentos do Desenho',
                apenasModulo1: true, // Indica acesso parcial ao curso
                progresso: 0,
                ultimaAula: 0,
                aulasConcluidas: []
            }
        ]
    };
    // Funções de Ajuda para Validação Visual nos Campos
    function definirErroCampo(inputEl, mensagem) {
        if (!inputEl) return;
        const grupo = inputEl.closest('.input-group');
        if (!grupo) return;

        if (mensagem) {
            grupo.classList.add('erro');
            grupo.classList.remove('sucesso');
            const feedback = grupo.querySelector('.input-feedback');
            if (feedback) feedback.textContent = mensagem;
        } else {
            grupo.classList.remove('erro');
            grupo.classList.add('sucesso');
            const feedback = grupo.querySelector('.input-feedback');
            if (feedback) feedback.textContent = '';
        }
    }

    function limparValidacaoCampo(inputEl) {
        if (!inputEl) return;
        const grupo = inputEl.closest('.input-group');
        if (grupo) {
            grupo.classList.remove('erro', 'sucesso');
            const feedback = grupo.querySelector('.input-feedback');
            if (feedback) feedback.textContent = '';
        }
    }

    function mostrarMensagemGeral(form, texto, tipo = 'msg-erro') {
        form.querySelectorAll('.msg-erro, .msg-sucesso-info').forEach((m) => m.remove());
        if (!texto) return;
        const mensagem = document.createElement('div');
        mensagem.className = tipo;
        mensagem.setAttribute('role', 'status');
        mensagem.textContent = texto;
        form.insertBefore(mensagem, form.firstChild);
    }

    // 1. Gerenciador Global de Cliques
    document.addEventListener('click', (e) => {
        const alvo = e.target instanceof Element ? e.target : null;
        if (!alvo) return;

        // Alternar visibilidade da senha
        const btnToggle = alvo.closest('.btn-toggle-senha');
        if (btnToggle) {
            const wrapper = btnToggle.closest('.campo-senha-wrapper');
            const inputSenha = wrapper ? wrapper.querySelector('input') : null;
            if (inputSenha) {
                const visivel = inputSenha.type === 'password';
                inputSenha.type = visivel ? 'text' : 'password';
                btnToggle.innerHTML = visivel ? svgOlhoFechado : svgOlhoAberto;
            }
            return;
        }

        // Trocar de Login para Cadastro
        if (alvo.closest('.btn-abrir-cadastro') || alvo.closest('[data-modal="cadastro"]')) {
            if (typeof fecharModal === 'function') fecharModal('login');
            if (typeof abrirModal === 'function') abrirModal('cadastro');
            return;
        }

        // Trocar de Cadastro para Login
        if (alvo.closest('.btn-abrir-login')) {
            if (typeof fecharModal === 'function') fecharModal('cadastro');
            if (typeof abrirModal === 'function') abrirModal('login');
            return;
        }
    });

    // 2. Máscara e Validação Instantânea de Celular/WhatsApp (DDD + 9 dígitos)
    const inputTelefone = document.getElementById('cad-telefone');
    if (inputTelefone) {
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

            // Validação instantânea do número exato
            const APENAS_NUMEROS = value.replace(/\D/g, '');
            if (APENAS_NUMEROS.length === 0) {
                definirErroCampo(inputTelefone, 'Informe o número do seu celular.');
            } else if (APENAS_NUMEROS.length < 11) {
                definirErroCampo(inputTelefone, 'Informe o DDD + 9 dígitos (Ex: (61) 98765-4321).');
            } else {
                definirErroCampo(inputTelefone, '');
            }
        });
    }

    // 3. Validações Instantâneas no Cadastro
    const inputNomeCad = document.getElementById('cad-nome');
    const inputEmailCad = document.getElementById('cad-email');
    const inputConfirmEmailCad = document.getElementById('cad-confirm-email');
    const inputSenhaCad = document.getElementById('cad-senha');
    const inputConfirmSenhaCad = document.getElementById('cad-confirm-senha');
    const checkTermosCad = document.getElementById('cad-termos');

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // a) Nome Completo
    if (inputNomeCad) {
        inputNomeCad.addEventListener('input', () => {
            const v = inputNomeCad.value.trim();
            if (!v) {
                definirErroCampo(inputNomeCad, 'Informe seu nome completo.');
            } else if (v.length < 3 || !v.includes(' ')) {
                definirErroCampo(inputNomeCad, 'Digite seu nome e sobrenome.');
            } else {
                definirErroCampo(inputNomeCad, '');
            }
        });
    }

    // b) E-mail Principal
    if (inputEmailCad) {
        inputEmailCad.addEventListener('input', () => {
            const v = inputEmailCad.value.trim().toLowerCase();
            if (!v) {
                definirErroCampo(inputEmailCad, 'Informe seu e-mail.');
            } else if (!regexEmail.test(v)) {
                definirErroCampo(inputEmailCad, 'E-mail inválido. Verifique o formato (ex: nome@dominio.com).');
            } else {
                definirErroCampo(inputEmailCad, '');
            }

            // Dispara revalidação no campo de confirmação se ele já estiver preenchido
            if (inputConfirmEmailCad && inputConfirmEmailCad.value.trim()) {
                inputConfirmEmailCad.dispatchEvent(new Event('input'));
            }
        });
    }

    // c) Confirmação de E-mail
    if (inputConfirmEmailCad) {
        inputConfirmEmailCad.addEventListener('input', () => {
            const emailOrig = inputEmailCad ? inputEmailCad.value.trim().toLowerCase() : '';
            const confirmVal = inputConfirmEmailCad.value.trim().toLowerCase();

            if (!confirmVal) {
                definirErroCampo(inputConfirmEmailCad, 'Confirme seu e-mail.');
            } else if (confirmVal !== emailOrig) {
                definirErroCampo(inputConfirmEmailCad, 'Os e-mails digitados não são idênticos.');
            } else {
                definirErroCampo(inputConfirmEmailCad, '');
            }
        });
    }

    // d) Senha e Requisitos Visuais
    if (inputSenhaCad) {
        const reqMinimo = document.getElementById('req-minimo');
        const reqMaiuscula = document.getElementById('req-maiuscula');
        const reqNumero = document.getElementById('req-numero');
        const reqSimbolo = document.getElementById('req-simbolo');

        inputSenhaCad.addEventListener('input', () => {
            const val = inputSenhaCad.value;

            const temMinimo = val.length >= 8;
            const temMaiuscula = /[A-Z]/.test(val);
            const temNumero = /[0-9]/.test(val);
            const temSimbolo = /[^A-Za-z0-9]/.test(val);

            atualizarReq(reqMinimo, temMinimo, 'Mínimo de 8 caracteres');
            atualizarReq(reqMaiuscula, temMaiuscula, 'Pelo menos 1 letra maiúscula');
            atualizarReq(reqNumero, temNumero, 'Pelo menos 1 número');
            atualizarReq(reqSimbolo, temSimbolo, 'Pelo menos 1 caractere especial (!@#$)');

            if (temMinimo && temMaiuscula && temNumero && temSimbolo) {
                definirErroCampo(inputSenhaCad, '');
            } else {
                definirErroCampo(inputSenhaCad, 'Sua senha não atende aos requisitos.');
            }

            if (inputConfirmSenhaCad && inputConfirmSenhaCad.value) {
                inputConfirmSenhaCad.dispatchEvent(new Event('input'));
            }
        });

        function atualizarReq(el, valido, texto) {
            if (!el) return;
            if (valido) {
                el.classList.add('valido');
                el.textContent = `✔ ${texto}`;
            } else {
                el.classList.remove('valido');
                el.textContent = `✖ ${texto}`;
            }
        }
    }

    // e) Confirmação de Senha
    if (inputConfirmSenhaCad) {
        inputConfirmSenhaCad.addEventListener('input', () => {
            const senhaOrig = inputSenhaCad ? inputSenhaCad.value : '';
            const confirmVal = inputConfirmSenhaCad.value;

            if (!confirmVal) {
                definirErroCampo(inputConfirmSenhaCad, 'Confirme sua senha.');
            } else if (confirmVal !== senhaOrig) {
                definirErroCampo(inputConfirmSenhaCad, 'As senhas digitadas não coincidem.');
            } else {
                definirErroCampo(inputConfirmSenhaCad, '');
            }
        });
    }

    // f) Checkbox de Termos
    if (checkTermosCad) {
        checkTermosCad.addEventListener('change', () => {
            if (checkTermosCad.checked) {
                definirErroCampo(checkTermosCad, '');
            } else {
                definirErroCampo(checkTermosCad, 'Aceite os termos para continuar.');
            }
        });
    }

    // 4. Submissão do Formulário de Login (Apenas E-mail e Senha)
    if (formLogin) {
        formLogin.addEventListener('submit', (event) => {
            event.preventDefault();
            mostrarMensagemGeral(formLogin, '');
            const email = document.getElementById('login-email').value.trim().toLowerCase();
            const senha = document.getElementById('login-senha').value;

            if (!regexEmail.test(email) || senha.length < 6) {
                mostrarMensagemGeral(formLogin, 'Informe um e-mail válido e a senha da sua conta.');
                return;
            }

            const usuarios = obterUsuarios();
            const usuario = usuarios.find((c) => c.email.toLowerCase() === email);

            if (!usuario || usuario.senha !== senha) {
                mostrarMensagemGeral(formLogin, 'E-mail ou senha incorretos.');
                return;
            }

            try {
                sessionStorage.setItem('nankim_sessao', JSON.stringify({
                    logado: true,
                    nome: usuario.nome || email.split('@')[0],
                    email: usuario.email
                }));
            } catch (error) {
                console.error('Erro ao iniciar sessão:', error);
                mostrarMensagemGeral(formLogin, 'Seu navegador não permitiu iniciar a sessão.');
                return;
            }

            window.location.href = 'area-aluno.html';
        });
    }

    // 5. Submissão do Formulário de Cadastro Completo
    if (formCadastro) {
        formCadastro.addEventListener('submit', (event) => {
            event.preventDefault();
            mostrarMensagemGeral(formCadastro, '');

            // Força o evento input em todos para marcar visualmente qualquer campo vazio
            [inputNomeCad, inputEmailCad, inputConfirmEmailCad, inputTelefone, inputSenhaCad, inputConfirmSenhaCad].forEach(el => {
                if (el) el.dispatchEvent(new Event('input'));
            });
            if (checkTermosCad) checkTermosCad.dispatchEvent(new Event('change'));

            const temCamposComErro = formCadastro.querySelectorAll('.input-group.erro').length > 0;
            if (temCamposComErro) {
                mostrarMensagemGeral(formCadastro, 'Por favor, corrija os campos marcados em vermelho acima.');
                return;
            }

            const email = inputEmailCad.value.trim().toLowerCase();
            const usuarios = obterUsuarios();

            if (usuarios.some((c) => c.email.toLowerCase() === email)) {
                definirErroCampo(inputEmailCad, 'Este e-mail já está cadastrado.');
                mostrarMensagemGeral(formCadastro, 'Este e-mail já está cadastrado. Faça login para continuar.');
                return;
            }

            // Salva a nova conta
            const novoUsuario = {
                id: Date.now(),
                nome: inputNomeCad.value.trim(),
                email: email,
                telefone: inputTelefone.value.trim(),
                senha: inputSenhaCad.value,
                matriculado: false,
                cursos: []
            };

            usuarios.push(novoUsuario);

            try {
                localStorage.setItem('nankim_db', JSON.stringify(usuarios));
            } catch (error) {
                console.error('Erro ao salvar no banco local:', error);
                mostrarMensagemGeral(formCadastro, 'Não foi possível salvar o cadastro neste navegador.');
                return;
            }

            if (typeof fecharModal === 'function') fecharModal('cadastro');
            if (typeof abrirModal === 'function') abrirModal('login');

            const loginEmailInput = document.getElementById('login-email');
            if (loginEmailInput) loginEmailInput.value = email;

            mostrarMensagemGeral(formLogin, 'Conta criada com sucesso! Faça login para começar.', 'msg-sucesso-info');
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    injetarModaisAutenticacao();
    configurarAutenticacao();
});