function inicializarBancoDados() {
    const dbExistente = localStorage.getItem('nankim_db');
    if (!dbExistente) {
        const mockUsers = [
            { id: 1, nome: "Estudante de Arte", email: "aluno@nankim.com", senha: "senha123" }
        ];
        localStorage.setItem('nankim_db', JSON.stringify(mockUsers));
    }
}

function validarEmailFormatado(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function limparMensagens(form) {
    const alertas = form.querySelectorAll('.msg-erro, .msg-sucesso-info');
    alertas.forEach(alerta => alerta.remove());
}

function configurarLogin() {
    const formLogin = document.getElementById('form-login');
    if (!formLogin) return;

    const emailInput = document.getElementById('login-email');
    const senhaInput = document.getElementById('login-senha');
    const btnToggleSenha = document.getElementById('btn-toggle-senha');
    const linkEsqueciSenha = document.getElementById('link-esqueci-senha');
    const btnSubmit = document.getElementById('btn-submit-login');

    // Alternar visualização da senha
    btnToggleSenha.addEventListener('click', () => {
        const tipoAtual = senhaInput.getAttribute('type');
        senhaInput.setAttribute('type', tipoAtual === 'password' ? 'text' : 'password');
        btnToggleSenha.textContent = tipoAtual === 'password' ? '🙈' : '👁️';
    });

    // Validação em Tempo Real
    function checarCampo(input, condicaoValida, mensagemErro) {
        const grupo = input.closest('.input-group');
        const feedback = grupo.querySelector('.input-feedback');

        if (input.value.trim() === '') {
            grupo.classList.remove('erro', 'sucesso');
            feedback.textContent = '';
            return false;
        }

        if (condicaoValida) {
            grupo.classList.remove('erro');
            grupo.classList.add('sucesso');
            feedback.textContent = '';
            return true;
        } else {
            grupo.classList.remove('sucesso');
            grupo.classList.add('erro');
            feedback.textContent = mensagemErro;
            return false;
        }
    }

    emailInput.addEventListener('input', () => {
        checarCampo(emailInput, validarEmailFormatado(emailInput.value.trim()), 'Insira um e-mail válido');
    });

    senhaInput.addEventListener('input', () => {
        checarCampo(senhaInput, senhaInput.value.length >= 6, 'A senha precisa ter pelo menos 6 caracteres');
    });

    // Fluxo: Esqueci minha senha
    linkEsqueciSenha.addEventListener('click', (e) => {
        e.preventDefault();
        limparMensagens(formLogin);
        const email = emailInput.value.trim();

        if (validarEmailFormatado(email)) {
            const divSucesso = document.createElement('div');
            divSucesso.className = 'msg-sucesso-info';
            divSucesso.innerHTML = `📧 Instruções enviadas para <strong>${email}</strong>`;
            formLogin.insertBefore(divSucesso, formLogin.firstChild);
            
            // Remove aviso após 5 segundos
            setTimeout(() => divSucesso.remove(), 5000);
        } else {
            const divErro = document.createElement('div');
            divErro.className = 'msg-erro';
            divErro.innerHTML = '⚠️ Digite um e-mail válido acima para recuperar sua senha.';
            formLogin.insertBefore(divErro, formLogin.firstChild);
            emailInput.focus();
        }
    });

    // Submissão do Formulário
    formLogin.addEventListener('submit', (e) => {
        e.preventDefault();
        limparMensagens(formLogin);

        const emailValido = checarCampo(emailInput, validarEmailFormatado(emailInput.value.trim()), 'Insira um e-mail válido');
        const senhaValida = checarCampo(senhaInput, senhaInput.value.length >= 6, 'Digite sua senha');

        if (!emailValido || !senhaValida) return;

        // Bloqueia o botão durante o carregamento
        const textoOriginal = btnSubmit.textContent;
        btnSubmit.disabled = true;
        btnSubmit.textContent = 'Autenticando...';
        btnSubmit.style.opacity = '0.7';
        btnSubmit.style.cursor = 'wait';

        // Simula latência de rede
        setTimeout(() => {
            const usuarios = JSON.parse(localStorage.getItem('nankim_db')) || [];
            const emailTratado = emailInput.value.trim().toLowerCase();
            
            const usuarioEncontrado = usuarios.find(
                user => user.email.toLowerCase() === emailTratado && user.senha === senhaInput.value
            );

            if (usuarioEncontrado) {
                const sessao = {
                    logado: true,
                    nome: usuarioEncontrado.nome,
                    email: usuarioEncontrado.email,
                    horario: new Date().toISOString()
                };
                sessionStorage.setItem('nankim_sessao', JSON.stringify(sessao));

                btnSubmit.textContent = 'Acesso Liberado!';
                btnSubmit.style.backgroundColor = '#27ae60';
                btnSubmit.style.opacity = '1';
                
                setTimeout(() => {
                    window.location.href = 'area-aluno.html';
                }, 800);
            } else {
                // Falha no login: Restaura botão e aplica foco na senha
                btnSubmit.disabled = false;
                btnSubmit.textContent = textoOriginal;
                btnSubmit.style.opacity = '1';
                btnSubmit.style.cursor = 'pointer';

                const divErro = document.createElement('div');
                divErro.className = 'msg-erro';
                divErro.innerHTML = '⚠️ E-mail ou senha incorretos.';
                formLogin.insertBefore(divErro, formLogin.firstChild);

                const containerModal = formLogin.closest('.modal-content');
                containerModal.classList.add('animar-shake');
                setTimeout(() => containerModal.classList.remove('animar-shake'), 500);

                senhaInput.value = '';
                senhaInput.focus();
                senhaInput.closest('.input-group').classList.remove('sucesso');
            }
        }, 1200);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    inicializarBancoDados();
    setTimeout(configurarLogin, 100);
});