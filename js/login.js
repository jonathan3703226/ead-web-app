function injetarModalLogin() {
    if (document.getElementById('modal-login')) return;

    document.body.insertAdjacentHTML('beforeend', `
        <div id="modal-login" class="modal">
            <div class="modal-content" role="dialog" aria-modal="true" aria-labelledby="titulo-login">
                <button class="close-btn" type="button" data-close="login" aria-label="Fechar">&times;</button>
                <h2 id="titulo-login">Login - Área do Aluno</h2>
                <form id="form-login" novalidate>
                    <div class="input-group campo-cadastro" hidden>
                        <label for="login-nome">Nome completo</label>
                        <input type="text" id="login-nome" autocomplete="name">
                        <small class="input-feedback"></small>
                    </div>
                    <div class="input-group">
                        <label for="login-email">E-mail</label>
                        <input type="email" id="login-email" placeholder="seuemail@dominio.com" required autocomplete="email">
                        <small class="input-feedback"></small>
                    </div>
                    <div class="input-group">
                        <label for="login-senha">Senha</label>
                        <div class="campo-senha-wrapper">
                            <input type="password" id="login-senha" placeholder="Digite sua senha" required autocomplete="current-password">
                            <button type="button" id="btn-toggle-senha" class="btn-eye" aria-label="Mostrar senha">👁️</button>
                        </div>
                        <small class="input-feedback"></small>
                    </div>
                    <div class="login-acoes-auxiliares">
                        <a href="#" id="link-esqueci-senha">Esqueceu sua senha?</a>
                    </div>
                    <button type="submit" id="btn-submit-login">Entrar na Plataforma</button>
                    <p class="alternar-cadastro"><span id="texto-alternar">Ainda não tem conta?</span> <button type="button" id="link-cadastro">Cadastre-se</button></p>
                </form>
            </div>
        </div>
    `);
}

function obterUsuarios() {
    const dados = localStorage.getItem('nankim_db');
    if (!dados) return [];
    try {
        const usuarios = JSON.parse(dados);
        if (!Array.isArray(usuarios)) throw new TypeError('O banco local precisa ser uma lista.');
        return usuarios;
    } catch (error) {
        console.error('Não foi possível ler as contas locais da Nankim:', error);
        throw error;
    }
}

function configurarLogin() {
    const form = document.getElementById('form-login');
    if (!form) return;

    const nome = document.getElementById('login-nome');
    const email = document.getElementById('login-email');
    const senha = document.getElementById('login-senha');
    const btnSubmit = document.getElementById('btn-submit-login');
    const btnCadastro = document.getElementById('link-cadastro');
    const titulo = document.getElementById('titulo-login');
    const textoAlternar = document.getElementById('texto-alternar');
    let tituloLogin = 'Login - Área do Aluno';
    let modoCadastro = false;

    function mostrarMensagem(texto, tipo = 'msg-erro', mostrarLinkCursos = false) {
        form.querySelectorAll('.msg-erro, .msg-sucesso-info').forEach((mensagem) => mensagem.remove());
        if (!texto) return;
        const mensagem = document.createElement('div');
        mensagem.className = tipo;
        mensagem.setAttribute('role', 'status');
        mensagem.textContent = texto;
        if (mostrarLinkCursos) {
            const link = document.createElement('a');
            link.href = 'cursos.html';
            link.textContent = ' Ver cursos';
            mensagem.append(link);
        }
        form.insertBefore(mensagem, form.firstChild);
    }

    function trocarModoCadastro() {
        modoCadastro = !modoCadastro;
        const grupoNome = nome.closest('.input-group');
        grupoNome.hidden = !modoCadastro;
        nome.required = modoCadastro;
        titulo.textContent = modoCadastro ? 'Crie sua conta Nankim' : tituloLogin;
        btnSubmit.textContent = modoCadastro ? 'Criar cadastro' : 'Entrar na Plataforma';
        textoAlternar.textContent = modoCadastro ? 'Já tem conta?' : 'Ainda não tem conta?';
        btnCadastro.textContent = modoCadastro ? 'Fazer login' : 'Cadastre-se';
        document.getElementById('link-esqueci-senha').hidden = modoCadastro;
        mostrarMensagem('');
    }

    btnCadastro.addEventListener('click', trocarModoCadastro);
    document.addEventListener('click', (event) => {
        const elemento = event.target instanceof Element ? event.target : null;
        const botaoTrocarConta = elemento && elemento.closest('[data-account-switch]');
        if (botaoTrocarConta) {
            tituloLogin = 'Trocar de conta';
            while (modoCadastro) trocarModoCadastro();
            titulo.textContent = tituloLogin;
            form.reset();
            mostrarMensagem('Entre com a nova conta. Sua sessão atual continua ativa até o novo login ser confirmado.', 'msg-sucesso-info');
            return;
        }

        if (elemento && elemento.closest('[data-modal="login"]')) {
            tituloLogin = 'Login - Área do Aluno';
            if (!modoCadastro) titulo.textContent = tituloLogin;
        }

        if (elemento && elemento.closest('[data-modal-mode="cadastro"]')) {
            if (!modoCadastro) btnCadastro.click();
        }
    });

    document.getElementById('btn-toggle-senha').addEventListener('click', () => {
        const visivel = senha.type === 'password';
        senha.type = visivel ? 'text' : 'password';
        document.getElementById('btn-toggle-senha').textContent = visivel ? '🙈' : '👁️';
    });

    document.getElementById('link-esqueci-senha').addEventListener('click', (event) => {
        event.preventDefault();
        mostrarMensagem('A recuperação de senha por e-mail ainda não está configurada.');
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        mostrarMensagem('');
        const emailTratado = email.value.trim().toLowerCase();
        const senhaValidaCadastro = senha.value.length >= 8 &&
            /[A-Z]/.test(senha.value) && /[0-9]/.test(senha.value) && /[^A-Za-z0-9]/.test(senha.value);

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTratado) || senha.value.length < (modoCadastro ? 8 : 6)) {
            mostrarMensagem(modoCadastro
                ? 'Informe um e-mail válido e uma senha de pelo menos 8 caracteres.'
                : 'Informe um e-mail válido e uma senha de pelo menos 6 caracteres.');
            return;
        }

        if (modoCadastro && (!nome.value.trim() || !senhaValidaCadastro)) {
            mostrarMensagem('Informe seu nome e use uma senha com 8 caracteres, letra maiúscula, número e símbolo.');
            return;
        }

        let usuarios;
        try {
            usuarios = obterUsuarios();
        } catch {
            mostrarMensagem('Não foi possível acessar os dados locais. Tente novamente ou limpe os dados do site.');
            return;
        }

        const usuario = usuarios.find((conta) => conta.email.toLowerCase() === emailTratado);
        if (modoCadastro) {
            if (usuario) {
                mostrarMensagem('Este e-mail já possui cadastro. Faça login para continuar.');
                return;
            }
            usuarios.push({
                id: Date.now(),
                nome: nome.value.trim(),
                email: emailTratado,
                senha: senha.value,
                matriculado: false,
                cursos: []
            });
            try {
                localStorage.setItem('nankim_db', JSON.stringify(usuarios));
            } catch (error) {
                console.error('Não foi possível salvar o cadastro local:', error);
                mostrarMensagem('Não foi possível salvar seu cadastro neste navegador. Verifique o espaço disponível e tente novamente.');
                return;
            }
            trocarModoCadastro();
            email.value = emailTratado;
            mostrarMensagem('Cadastro criado. Para acessar as aulas, finalize a assinatura de um curso.', 'msg-sucesso-info', true);
            return;
        }

        if (!usuario || usuario.senha !== senha.value) {
            mostrarMensagem('E-mail ou senha incorretos.');
            return;
        }

        try {
            sessionStorage.setItem('nankim_sessao', JSON.stringify({
                logado: true,
                nome: usuario.nome,
                email: usuario.email
            }));
        } catch (error) {
            console.error('Não foi possível iniciar a sessão local:', error);
            mostrarMensagem('Seu navegador não permitiu iniciar a sessão. Verifique as configurações de armazenamento e tente novamente.');
            return;
        }
        window.location.href = 'area-aluno.html';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    injetarModalLogin();
    configurarLogin();
});
