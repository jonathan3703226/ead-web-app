function injetarModaisAutenticacao() {
    // 1. Modal de Login com Abas (Aluno / Professor)
    if (!document.getElementById('modal-login')) {
        document.body.insertAdjacentHTML('beforeend', `
            <div id="modal-login" class="modal">
                <div class="modal-content" role="dialog" aria-modal="true" aria-labelledby="titulo-login">
                    <button class="close-btn" type="button" data-close="login" aria-label="Fechar">&times;</button>
                    
                    <!-- Seletor de Perfil (Aluno vs Professor) -->
                    <div class="login-tabs-perfil">
                        <button type="button" class="tab-perfil active" data-perfil="aluno">Sou Aluno</button>
                        <button type="button" class="tab-perfil" data-perfil="professor">Sou Professor</button>
                    </div>

                    <h2 id="titulo-login">Login - Área do Aluno</h2>
                    
                    <form id="form-login" novalidate data-tipo-acesso="aluno">
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

                        <!-- Dica para acesso de Professor (Oculto por padrão) -->
                        <div id="dica-acesso-professor" style="display: none; font-size: 0.8rem; color: #888888; background: #1a1a1a; border: 1px solid #333; padding: 0.6rem 0.8rem; border-radius: 8px; margin-bottom: 1rem;">
                            💡 Acesso de teste: <strong>professor@nankim.com</strong> / senha: <strong>admin123</strong>
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
                                <span>Li e aceito os <a href="politica-privacidade.html" target="_blank">Termos de Uso e Política de Privacidade</a></span>
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
    if (!dados) return [];
    try {
        const usuarios = JSON.parse(dados);
        return Array.isArray(usuarios) ? usuarios : [];
    } catch (error) {
        return [];
    }
}

function configurarAutenticacao() {
    const formLogin = document.getElementById('form-login');
    const formCadastro = document.getElementById('form-cadastro');

    const svgOlhoAberto = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
    const svgOlhoFechado = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`;

    function exibirModal(id) {
        const modal = document.getElementById(id);
        if (modal) modal.style.display = 'flex';
    }

    function ocultarModal(id) {
        const modal = document.getElementById(id);
        if (modal) modal.style.display = 'none';
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

        // Alternância de Abas (Sou Aluno vs Sou Professor)
        const tabBtn = alvo.closest('.tab-perfil');
        if (tabBtn) {
            e.preventDefault();
            document.querySelectorAll('.tab-perfil').forEach(t => t.classList.remove('active'));
            tabBtn.classList.add('active');

            const perfil = tabBtn.getAttribute('data-perfil');
            const tituloLogin = document.getElementById('titulo-login');
            const dicaProf = document.getElementById('dica-acesso-professor');
            const containerEsqueci = document.getElementById('container-esqueci-senha');
            const containerAlternarCad = document.getElementById('container-alternar-cadastro');

            mostrarMensagemGeral(formLogin, '');

            if (perfil === 'professor') {
                formLogin.setAttribute('data-tipo-acesso', 'professor');
                tituloLogin.textContent = 'Login - Área do Professor';
                dicaProf.style.display = 'block';
                containerEsqueci.style.display = 'none';
                containerAlternarCad.style.display = 'none';
            } else {
                formLogin.setAttribute('data-tipo-acesso', 'aluno');
                tituloLogin.textContent = 'Login - Área do Aluno';
                dicaProf.style.display = 'none';
                containerEsqueci.style.display = 'block';
                containerAlternarCad.style.display = 'block';
            }
            return;
        }

        // Clique em "Esqueceu sua senha?"
        const linkEsqueci = alvo.closest('#link-esqueci-senha');
        if (linkEsqueci) {
            e.preventDefault();
            const emailInput = document.getElementById('login-email');
            const emailVal = emailInput ? emailInput.value.trim().toLowerCase() : '';

            if (!emailVal || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
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

        // Toggle Olho Senha
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

        // Trocar para Cadastro
        if (alvo.closest('#btn-alternar-para-cadastro') || alvo.closest('[data-modal="cadastro"]')) {
            e.preventDefault();
            ocultarModal('modal-login');
            exibirModal('modal-cadastro');
            return;
        }

        // Trocar para Login
        if (alvo.closest('#btn-alternar-para-login') || alvo.closest('[data-modal="login"]')) {
            e.preventDefault();
            ocultarModal('modal-cadastro');
            exibirModal('modal-login');
            return;
        }

        // Fechar Modais (X)
        const btnFechar = alvo.closest('[data-close]');
        if (btnFechar) {
            e.preventDefault();
            const modalId = btnFechar.getAttribute('data-close');
            ocultarModal(`modal-${modalId}`);
        }
    });

    // 2. VALIDAÇÃO INSTANTÂNEA E MÁSCARA DO CADASTRO
    const inputNomeCad = document.getElementById('cad-nome');
    const inputEmailCad = document.getElementById('cad-email');
    const inputConfirmEmailCad = document.getElementById('cad-confirm-email');
    const inputTelefoneCad = document.getElementById('cad-telefone');
    const inputSenhaCad = document.getElementById('cad-senha');
    const inputConfirmSenhaCad = document.getElementById('cad-confirm-senha');
    const checkTermosCad = document.getElementById('cad-termos');
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (inputTelefoneCad) {
        inputTelefoneCad.addEventListener('input', (e) => {
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
                definirErroCampo(inputTelefoneCad, 'Informe DDD + 9 dígitos (Ex: (61) 98765-4321).');
            } else {
                definirErroCampo(inputTelefoneCad, '');
            }
        });
    }

    if (inputNomeCad) {
        inputNomeCad.addEventListener('input', () => {
            const v = inputNomeCad.value.trim();
            if (v.length < 3 || !v.includes(' ')) {
                definirErroCampo(inputNomeCad, 'Digite seu nome e sobrenome.');
            } else {
                definirErroCampo(inputNomeCad, '');
            }
        });
    }

    if (inputEmailCad) {
        inputEmailCad.addEventListener('input', () => {
            const v = inputEmailCad.value.trim().toLowerCase();
            if (!regexEmail.test(v)) {
                definirErroCampo(inputEmailCad, 'Informe um e-mail válido (ex: nome@dominio.com).');
            } else {
                definirErroCampo(inputEmailCad, '');
            }

            if (inputConfirmEmailCad && inputConfirmEmailCad.value) {
                inputConfirmEmailCad.dispatchEvent(new Event('input'));
            }
        });
    }

    if (inputConfirmEmailCad) {
        inputConfirmEmailCad.addEventListener('input', () => {
            const confirmVal = inputConfirmEmailCad.value.trim().toLowerCase();
            const origVal = inputEmailCad ? inputEmailCad.value.trim().toLowerCase() : '';

            if (confirmVal !== origVal || !confirmVal) {
                definirErroCampo(inputConfirmEmailCad, 'Os e-mails digitados não são iguais.');
            } else {
                definirErroCampo(inputConfirmEmailCad, '');
            }
        });
    }

    if (inputSenhaCad) {
        inputSenhaCad.addEventListener('input', () => {
            const val = inputSenhaCad.value;
            const temMin = val.length >= 8;
            const temMai = /[A-Z]/.test(val);
            const temNum = /[0-9]/.test(val);
            const temSim = /[^A-Za-z0-9]/.test(val);

            atualizarReq('req-minimo', temMin, 'Mínimo de 8 caracteres');
            atualizarReq('req-maiuscula', temMai, 'Pelo menos 1 letra maiúscula');
            atualizarReq('req-numero', temNum, 'Pelo menos 1 número');
            atualizarReq('req-simbolo', temSim, 'Pelo menos 1 caractere especial (!@#$)');

            if (temMin && temMai && temNum && temSim) {
                definirErroCampo(inputSenhaCad, '');
            } else {
                definirErroCampo(inputSenhaCad, 'A senha não atende a todos os requisitos.');
            }

            if (inputConfirmSenhaCad && inputConfirmSenhaCad.value) {
                inputConfirmSenhaCad.dispatchEvent(new Event('input'));
            }
        });

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
    }

    if (inputConfirmSenhaCad) {
        inputConfirmSenhaCad.addEventListener('input', () => {
            if (inputConfirmSenhaCad.value !== inputSenhaCad.value || !inputConfirmSenhaCad.value) {
                definirErroCampo(inputConfirmSenhaCad, 'As senhas digitadas não coincidem.');
            } else {
                definirErroCampo(inputConfirmSenhaCad, '');
            }
        });
    }

    if (checkTermosCad) {
        checkTermosCad.addEventListener('change', () => {
            if (!checkTermosCad.checked) {
                definirErroCampo(checkTermosCad, 'Aceite os termos para continuar.');
            } else {
                definirErroCampo(checkTermosCad, '');
            }
        });
    }

    // 3. SUBMISSÃO DO CADASTRO
    if (formCadastro) {
        formCadastro.addEventListener('submit', (event) => {
            event.preventDefault();
            mostrarMensagemGeral(formCadastro, '');

            [inputNomeCad, inputEmailCad, inputConfirmEmailCad, inputTelefoneCad, inputSenhaCad, inputConfirmSenhaCad].forEach(el => {
                if (el) el.dispatchEvent(new Event('input'));
            });
            if (checkTermosCad) checkTermosCad.dispatchEvent(new Event('change'));

            if (formCadastro.querySelectorAll('.input-group.erro').length > 0) {
                mostrarMensagemGeral(formCadastro, 'Corrija os campos destacados em vermelho acima.');
                return;
            }

            const email = inputEmailCad.value.trim().toLowerCase();
            const usuarios = obterUsuarios();

            if (usuarios.some((c) => c.email.toLowerCase() === email)) {
                definirErroCampo(inputEmailCad, 'Este e-mail já está cadastrado.');
                mostrarMensagemGeral(formCadastro, 'Este e-mail já está cadastrado. Faça login para continuar.');
                return;
            }

            const novoUsuario = {
                id: Date.now(),
                nome: inputNomeCad.value.trim(),
                email: email,
                telefone: inputTelefoneCad.value.trim(),
                senha: inputSenhaCad.value,
                matriculado: false,
                cursos: [
                    {
                        id: 'fundamentos-desenho',
                        nome: 'Fundamentos do Desenho',
                        apenasModulo1: true,
                        progresso: 0,
                        ultimaAula: 0,
                        aulasConcluidas: []
                    }
                ]
            };

            usuarios.push(novoUsuario);

            try {
                localStorage.setItem('nankim_db', JSON.stringify(usuarios));
            } catch (error) {
                mostrarMensagemGeral(formCadastro, 'Não foi possível salvar seu cadastro neste navegador.');
                return;
            }

            ocultarModal('modal-cadastro');
            exibirModal('modal-login');

            const loginEmailInput = document.getElementById('login-email');
            if (loginEmailInput) loginEmailInput.value = email;

            mostrarMensagemGeral(formLogin, 'Conta criada com sucesso! Faça login para começar.', 'msg-sucesso-info');
        });
    }

    // 4. SUBMISSÃO DO LOGIN
    if (formLogin) {
        formLogin.addEventListener('submit', (event) => {
            event.preventDefault();
            mostrarMensagemGeral(formLogin, '');

            const tipoAcesso = formLogin.getAttribute('data-tipo-acesso') || 'aluno';
            const email = document.getElementById('login-email').value.trim().toLowerCase();
            const senha = document.getElementById('login-senha').value;

            if (!regexEmail.test(email) || senha.length < 6) {
                mostrarMensagemGeral(formLogin, 'Informe um e-mail válido e sua senha.');
                return;
            }

            // A) LOGIN DE PROFESSOR
            if (tipoAcesso === 'professor') {
                if (email === 'professor@nankim.com' && senha === 'admin123') {
                    try {
                        // Guardamos 'tipo' e 'perfil' para total compatibilidade com area-professor.html
                        sessionStorage.setItem('nankim_sessao', JSON.stringify({
                            logado: true,
                            tipo: 'professor',
                            perfil: 'professor',
                            nome: 'Thiago Nankim',
                            email: email
                        }));
                    } catch (error) {
                        console.error('Erro ao salvar sessão:', error);
                    }
                    window.location.href = 'area-professor.html';
                } else {
                    mostrarMensagemGeral(formLogin, 'Credenciais de professor incorretas.');
                }
                return;
            }

            // B) LOGIN DE ALUNO
            const usuarios = obterUsuarios();
            const usuario = usuarios.find((c) => c.email.toLowerCase() === email);

            if (!usuario || usuario.senha !== senha) {
                mostrarMensagemGeral(formLogin, 'E-mail ou senha incorretos.');
                return;
            }

            try {
                sessionStorage.setItem('nankim_sessao', JSON.stringify({
                    logado: true,
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

document.addEventListener('DOMContentLoaded', () => {
    injetarModaisAutenticacao();
    configurarAutenticacao();
});