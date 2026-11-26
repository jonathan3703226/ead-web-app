/* ==========================================================================
   MEU-PERFIL.JS - Lógica de Dados Cadastrais, Senha e Certificados
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const sessaoData = sessionStorage.getItem('nankim_sessao');
    if (!sessaoData) {
        window.location.href = 'index.html';
        return;
    }

    const usuarioSessao = JSON.parse(sessaoData);
    const dbUsuarios = JSON.parse(localStorage.getItem('nankim_db')) || [];
    const idxInicial = dbUsuarios.findIndex(
        (u) => String(u.email || '').toLowerCase() === String(usuarioSessao.email || '').toLowerCase()
    );

    if (idxInicial === -1) {
        sessionStorage.removeItem('nankim_sessao');
        window.location.href = 'index.html';
        return;
    }

    let usuarioAtual = dbUsuarios[idxInicial];

    // Referências do formulário de dados pessoais
    const formDados = document.getElementById('form-dados-pessoais');
    const inputNome = document.getElementById('input-nome');
    const inputEmail = document.getElementById('input-email');
    const inputTelefone = document.getElementById('input-telefone');
    const inputCpf = document.getElementById('input-cpf');
    const selectNivelArte = document.getElementById('select-nivel-arte');
    const inputCep = document.getElementById('input-cep');
    const inputEndereco = document.getElementById('input-endereco');
    const inputCidade = document.getElementById('input-cidade');
    const selectUf = document.getElementById('select-uf');
    const feedbackFormDados = document.getElementById('feedback-form-dados');

    function atualizarEstadoCampo(input, fnValidar) {
        if (!input) return false;
        const grupo = input.closest('.grupo-input');
        if (!grupo || grupo.classList.contains('campo-neutro')) return true;

        const elementoErro = grupo.querySelector('.input-feedback');
        const resultado = fnValidar();

        if (resultado.valido) {
            grupo.classList.remove('campo-invalido');
            grupo.classList.add('campo-valido');
            if (elementoErro) elementoErro.textContent = '';
            return true;
        } else {
            grupo.classList.remove('campo-valido');
            grupo.classList.add('campo-invalido');
            if (elementoErro) elementoErro.textContent = resultado.mensagem;
            return Boolean(resultado.vazioOpcional);
        }
    }

    function mostrarFeedbackLocal(elementoEl, tipo, mensagem) {
        if (!elementoEl) return;
        elementoEl.className = `feedback-inline-form ${tipo}`;
        elementoEl.textContent = tipo === 'sucesso' ? `✓ ${mensagem}` : `⚠ ${mensagem}`;

        clearTimeout(elementoEl._timerFeedback);
        elementoEl._timerFeedback = setTimeout(() => {
            elementoEl.className = 'feedback-inline-form';
            elementoEl.textContent = '';
        }, 4500);
    }

    // Validadores dos dados pessoais
    function validarNome() {
        const valor = inputNome.value.trim();
        if (valor.length < 3 || !valor.includes(' ')) {
            return { valido: false, mensagem: 'Digite seu nome e sobrenome (mínimo 3 letras).' };
        }
        return { valido: true, mensagem: '' };
    }

    function validarEmail() {
        const valor = inputEmail.value.trim().toLowerCase();
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if (!valor) {
            return { valido: false, mensagem: 'Informe seu endereço de e-mail.' };
        }
        if (!regexEmail.test(valor)) {
            return { valido: false, mensagem: 'Digite um e-mail válido (ex: nome@dominio.com).' };
        }
        const listaAtual = JSON.parse(localStorage.getItem('nankim_db')) || [];
        const duplicado = listaAtual.some(
            (u) => u.email.toLowerCase() === valor && u.email.toLowerCase() !== usuarioAtual.email.toLowerCase()
        );
        if (duplicado) {
            return { valido: false, mensagem: 'Este e-mail já está em uso por outra conta.' };
        }
        return { valido: true, mensagem: '' };
    }

    function validarTelefone() {
        const apenasNumeros = inputTelefone.value.replace(/\D/g, '');
        if (apenasNumeros.length === 0) {
            return { valido: false, vazioOpcional: true, mensagem: 'Digite o DDD + número (10 ou 11 dígitos) ou deixe em branco.' };
        }
        if (apenasNumeros.length < 10 || apenasNumeros.length > 11) {
            return { valido: false, mensagem: 'Telefone incompleto. Informe DDD + número (10 ou 11 dígitos).' };
        }
        return { valido: true, mensagem: '' };
    }

    function validarCpf() {
        const apenasNumeros = inputCpf.value.replace(/\D/g, '');
        if (apenasNumeros.length === 0) {
            return { valido: false, vazioOpcional: true, mensagem: 'Digite os 11 dígitos do CPF ou deixe em branco.' };
        }
        if (apenasNumeros.length !== 11 || /^(\d)\1{10}$/.test(apenasNumeros)) {
            return { valido: false, mensagem: 'CPF inválido. Informe os 11 dígitos corretamente.' };
        }
        return { valido: true, mensagem: '' };
    }

    function validarNivelArte() {
        if (!selectNivelArte.value) {
            return { valido: false, vazioOpcional: true, mensagem: 'Selecione seu nível artístico atual.' };
        }
        return { valido: true, mensagem: '' };
    }

    function validarCep() {
        const apenasNumeros = inputCep.value.replace(/\D/g, '');
        if (apenasNumeros.length === 0) {
            return { valido: false, vazioOpcional: true, mensagem: 'Digite os 8 dígitos do CEP ou deixe em branco.' };
        }
        if (apenasNumeros.length !== 8) {
            return { valido: false, mensagem: 'CEP incompleto. Informe os 8 dígitos (00000-000).' };
        }
        return { valido: true, mensagem: '' };
    }

    function validarUf() {
        if (!selectUf.value) {
            return { valido: false, vazioOpcional: true, mensagem: 'Selecione seu Estado (UF).' };
        }
        return { valido: true, mensagem: '' };
    }

    function validarCidade() {
        const valor = inputCidade.value.trim();
        if (valor.length === 0) {
            return { valido: false, vazioOpcional: true, mensagem: 'Informe sua cidade ou deixe em branco.' };
        }
        if (valor.length < 2) {
            return { valido: false, mensagem: 'Nome da cidade muito curto.' };
        }
        return { valido: true, mensagem: '' };
    }

    function validarEndereco() {
        const valor = inputEndereco.value.trim();
        if (valor.length === 0) {
            return { valido: false, vazioOpcional: true, mensagem: 'Informe rua e número ou deixe em branco.' };
        }
        if (valor.length < 5) {
            return { valido: false, mensagem: 'Endereço muito curto (mínimo 5 caracteres).' };
        }
        return { valido: true, mensagem: '' };
    }

    // Máscaras em tempo real
    function aplicarMascaraTelefone() {
        const digitos = inputTelefone.value.replace(/\D/g, '').slice(0, 11);
        if (digitos.length > 6) {
            if (digitos.length === 11) {
                inputTelefone.value = `(${digitos.slice(0, 2)}) ${digitos.slice(2, 7)}-${digitos.slice(7)}`;
            } else {
                inputTelefone.value = `(${digitos.slice(0, 2)}) ${digitos.slice(2, 6)}-${digitos.slice(6)}`;
            }
        } else if (digitos.length > 2) {
            inputTelefone.value = `(${digitos.slice(0, 2)}) ${digitos.slice(2)}`;
        } else if (digitos.length > 0) {
            inputTelefone.value = `(${digitos}`;
        } else {
            inputTelefone.value = '';
        }
    }

    function aplicarMascaraCpf() {
        const digitos = inputCpf.value.replace(/\D/g, '').slice(0, 11);
        inputCpf.value = digitos
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    }

    function aplicarMascaraCep() {
        const digitos = inputCep.value.replace(/\D/g, '').slice(0, 8);
        inputCep.value = digitos.length > 5 ? `${digitos.slice(0, 5)}-${digitos.slice(5)}` : digitos;
    }

    inputTelefone.addEventListener('input', () => {
        aplicarMascaraTelefone();
        atualizarEstadoCampo(inputTelefone, validarTelefone);
    });

    inputCpf.addEventListener('input', () => {
        aplicarMascaraCpf();
        atualizarEstadoCampo(inputCpf, validarCpf);
    });

    inputCep.addEventListener('input', () => {
        aplicarMascaraCep();
        atualizarEstadoCampo(inputCep, validarCep);
    });

    // Validação instantânea nos dados pessoais
    const camposDadosConfig = [
        { input: inputNome, validar: validarNome, obrigatorio: true },
        { input: inputEmail, validar: validarEmail, obrigatorio: true },
        { input: inputTelefone, validar: validarTelefone, obrigatorio: false },
        { input: inputCpf, validar: validarCpf, obrigatorio: false },
        { input: selectNivelArte, validar: validarNivelArte, obrigatorio: false },
        { input: inputCep, validar: validarCep, obrigatorio: false },
        { input: selectUf, validar: validarUf, obrigatorio: false },
        { input: inputCidade, validar: validarCidade, obrigatorio: false },
        { input: inputEndereco, validar: validarEndereco, obrigatorio: false }
    ];

    camposDadosConfig.forEach(({ input, validar, obrigatorio }) => {
        const eventoMudanca = input.tagName === 'SELECT' ? 'change' : 'input';

        input.addEventListener('focus', () => {
            atualizarEstadoCampo(input, validar);
        });

        input.addEventListener(eventoMudanca, () => {
            atualizarEstadoCampo(input, validar);
        });

        if (!obrigatorio) {
            input.addEventListener('blur', () => {
                if (input.value.trim() === '') {
                    const grupo = input.closest('.grupo-input');
                    const erro = grupo?.querySelector('.input-feedback');
                    grupo?.classList.remove('campo-invalido', 'campo-valido');
                    if (erro) erro.textContent = '';
                }
            });
        }
    });

    // Preenche dados existentes
    inputNome.value = usuarioAtual.nome || '';
    inputEmail.value = usuarioAtual.email || '';
    inputTelefone.value = usuarioAtual.telefone || '';
    inputCpf.value = usuarioAtual.cpf || '';
    selectNivelArte.value = usuarioAtual.nivelArte || '';
    inputCep.value = usuarioAtual.cep || '';
    selectUf.value = usuarioAtual.uf || '';
    inputCidade.value = usuarioAtual.cidade || '';
    inputEndereco.value = usuarioAtual.endereco || '';

    aplicarMascaraTelefone();
    aplicarMascaraCpf();
    aplicarMascaraCep();

    camposDadosConfig.forEach(({ input, validar, obrigatorio }) => {
        if (obrigatorio || input.value.trim() !== '') {
            atualizarEstadoCampo(input, validar);
        }
    });

    // Sincroniza notificação de perfil completo no sino do menu-aluno.js
    function atualizarNotificacaoPerfil(usuario) {
        const perfilCompleto = Boolean(usuario.telefone && usuario.cpf && usuario.nivelArte);
        if (!perfilCompleto) return;

        const chaveNotif = `nankim_notificacoes_${String(usuario.email || '').toLowerCase()}`;
        try {
            const lista = JSON.parse(localStorage.getItem(chaveNotif)) || [];
            const filtrada = lista.filter((n) => n.id !== 'completar-perfil');
            localStorage.setItem(chaveNotif, JSON.stringify(filtrada));

            const badge = document.getElementById('badge-notif');
            const naoLidas = filtrada.filter((n) => !n.lida).length;
            if (badge) {
                badge.textContent = String(naoLidas);
                badge.hidden = naoLidas === 0;
            }
        } catch (_) {
            // Ignora erro de storage
        }
    }

    // Submit Dados Pessoais
    formDados.addEventListener('submit', (e) => {
        e.preventDefault();

        let formularioValido = true;
        camposDadosConfig.forEach(({ input, validar, obrigatorio }) => {
            if (!obrigatorio && input.value.trim() === '') return;
            const ok = atualizarEstadoCampo(input, validar);
            if (!ok) formularioValido = false;
        });

        if (!formularioValido) {
            mostrarFeedbackLocal(feedbackFormDados, 'erro', 'Corrija os campos destacados em vermelho antes de salvar.');
            const primeiroInvalido = formDados.querySelector('.campo-invalido input, .campo-invalido select');
            if (primeiroInvalido) primeiroInvalido.focus();
            return;
        }

        const listaAtual = JSON.parse(localStorage.getItem('nankim_db')) || [];
        const emailAntigo = usuarioAtual.email.toLowerCase();
        const novoEmail = inputEmail.value.trim().toLowerCase();

        usuarioAtual.nome = inputNome.value.trim();
        usuarioAtual.email = novoEmail;
        usuarioAtual.telefone = inputTelefone.value.trim();
        usuarioAtual.cpf = inputCpf.value.trim();
        usuarioAtual.nivelArte = selectNivelArte.value;
        usuarioAtual.cep = inputCep.value.trim();
        usuarioAtual.uf = selectUf.value;
        usuarioAtual.cidade = inputCidade.value.trim();
        usuarioAtual.endereco = inputEndereco.value.trim();

        const idx = listaAtual.findIndex((u) => u.email.toLowerCase() === emailAntigo);
        if (idx !== -1) {
            listaAtual[idx] = usuarioAtual;
            localStorage.setItem('nankim_db', JSON.stringify(listaAtual));
        }

        usuarioSessao.email = novoEmail;
        usuarioSessao.nome = usuarioAtual.nome;
        sessionStorage.setItem('nankim_sessao', JSON.stringify(usuarioSessao));

        atualizarNotificacaoPerfil(usuarioAtual);
        mostrarFeedbackLocal(feedbackFormDados, 'sucesso', 'Dados pessoais salvos com sucesso!');
    });

    // Olhinho idêntico ao login.js
    const svgOlhoAberto = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
    const svgOlhoFechado = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`;

    document.querySelectorAll('#form-alterar-senha .btn-toggle-senha').forEach((botao) => {
        botao.addEventListener('click', (e) => {
            e.preventDefault();
            const wrapper = botao.closest('.campo-senha-wrapper');
            const inputSenha = wrapper ? wrapper.querySelector('input') : null;
            if (!inputSenha) return;

            const visivel = inputSenha.type === 'password';
            inputSenha.type = visivel ? 'text' : 'password';
            botao.innerHTML = visivel ? svgOlhoFechado : svgOlhoAberto;
            botao.setAttribute('aria-label', visivel ? 'Ocultar senha' : 'Mostrar senha');
        });
    });

    // Alteração de Senha
    const formSenha = document.getElementById('form-alterar-senha');
    const inputSenhaAtual = document.getElementById('input-senha-atual');
    const inputSenhaNova = document.getElementById('input-nova-senha');
    const inputConfirmNova = document.getElementById('input-confirm-nova-senha');
    const feedbackFormSenha = document.getElementById('feedback-form-senha');

    function atualizarReq(id, valido, texto) {
        const el = document.getElementById(id);
        if (!el) return;
        el.classList.toggle('valido', valido);
        el.textContent = `${valido ? '✔' : '✖'} ${texto}`;
    }

    function checarRegrasSenha() {
        const val = inputSenhaNova.value;
        const conf = inputConfirmNova.value;

        const temMin = val.length >= 8;
        const temMai = /[A-Z]/.test(val);
        const temNum = /[0-9]/.test(val);
        const temSim = /[^A-Za-z0-9]/.test(val);
        const coincidem = val !== '' && val === conf;

        atualizarReq('req-minimo', temMin, 'Mínimo de 8 caracteres');
        atualizarReq('req-maiuscula', temMai, 'Pelo menos 1 letra maiúscula');
        atualizarReq('req-numero', temNum, 'Pelo menos 1 número');
        atualizarReq('req-simbolo', temSim, 'Pelo menos 1 caractere especial (!@#$)');
        atualizarReq('req-coincide', coincidem, 'As senhas coincidem');

        return temMin && temMai && temNum && temSim && coincidem;
    }

    function validarCampoNovaSenha() {
        const val = inputSenhaNova.value;
        const ok = val.length >= 8 && /[A-Z]/.test(val) && /[0-9]/.test(val) && /[^A-Za-z0-9]/.test(val);
        if (!ok) {
            return { valido: false, mensagem: 'Cumpra todos os requisitos de segurança abaixo.' };
        }
        return { valido: true, mensagem: '' };
    }

    function validarCampoConfirmarSenha() {
        if (!inputConfirmNova.value) {
            return { valido: false, mensagem: 'Repita a nova senha para confirmar.' };
        }
        if (inputConfirmNova.value !== inputSenhaNova.value) {
            return { valido: false, mensagem: 'As senhas digitadas não coincidem.' };
        }
        return { valido: true, mensagem: '' };
    }

    // Verificação instantânea APENAS em Nova Senha e Confirme a Nova Senha (Senha Atual permanece 100% neutra)
    inputSenhaNova.addEventListener('focus', () => {
        checarRegrasSenha();
        atualizarEstadoCampo(inputSenhaNova, validarCampoNovaSenha);
    });
    inputSenhaNova.addEventListener('input', () => {
        checarRegrasSenha();
        atualizarEstadoCampo(inputSenhaNova, validarCampoNovaSenha);
        if (inputConfirmNova.value !== '') {
            atualizarEstadoCampo(inputConfirmNova, validarCampoConfirmarSenha);
        }
    });

    inputConfirmNova.addEventListener('focus', () => {
        checarRegrasSenha();
        atualizarEstadoCampo(inputConfirmNova, validarCampoConfirmarSenha);
    });
    inputConfirmNova.addEventListener('input', () => {
        checarRegrasSenha();
        atualizarEstadoCampo(inputConfirmNova, validarCampoConfirmarSenha);
    });

    formSenha.addEventListener('submit', (e) => {
        e.preventDefault();

        const okNova = atualizarEstadoCampo(inputSenhaNova, validarCampoNovaSenha);
        const okConfirm = atualizarEstadoCampo(inputConfirmNova, validarCampoConfirmarSenha);

        if (!okNova || !okConfirm || !checarRegrasSenha()) {
            mostrarFeedbackLocal(feedbackFormSenha, 'erro', 'Verifique os campos de nova senha destacados em vermelho.');
            const primeiroInvalido = formSenha.querySelector('.campo-invalido input');
            if (primeiroInvalido) primeiroInvalido.focus();
            return;
        }

        // Valida a Senha Atual mantendo o campo totalmente neutro
        if (inputSenhaAtual.value !== usuarioAtual.senha) {
            mostrarFeedbackLocal(feedbackFormSenha, 'erro', 'A senha atual informada está incorreta.');
            inputSenhaAtual.focus();
            return;
        }

        usuarioAtual.senha = inputSenhaNova.value;
        const listaAtual = JSON.parse(localStorage.getItem('nankim_db')) || [];
        const idx = listaAtual.findIndex((u) => u.email.toLowerCase() === usuarioAtual.email.toLowerCase());
        if (idx !== -1) {
            listaAtual[idx] = usuarioAtual;
            localStorage.setItem('nankim_db', JSON.stringify(listaAtual));
        }

        formSenha.reset();
        formSenha.querySelectorAll('.grupo-input').forEach((grupo) => {
            grupo.classList.remove('campo-valido', 'campo-invalido');
            const fb = grupo.querySelector('.input-feedback');
            if (fb) fb.textContent = '';
        });

        formSenha.querySelectorAll('.btn-toggle-senha').forEach((btn) => {
            btn.innerHTML = svgOlhoAberto;
            btn.setAttribute('aria-label', 'Mostrar senha');
        });

        checarRegrasSenha();
        mostrarFeedbackLocal(feedbackFormSenha, 'sucesso', 'Senha atualizada com sucesso!');
    });

    // Certificados
    const containerCert = document.getElementById('container-certificados');
    const modalCert = document.getElementById('modal-certificado');
    const fecharCert = document.getElementById('fechar-cert');
    const btnImprimirCert = document.getElementById('btn-imprimir-cert');

    const concluidas = JSON.parse(localStorage.getItem('nankim_aulas_concluidas') || '[]');
    const qtdConcluidas = Array.isArray(concluidas) ? concluidas.length : 0;
    const cursoConcluido = usuarioAtual.matriculado === true && qtdConcluidas >= 12;

    if (cursoConcluido) {
        containerCert.innerHTML = `
            <div class="item-certificado">
                <div class="info-cert">
                    <h3>Fundamentos do Desenho</h3>
                    <p>Carga horária: 12 horas • 100% Concluído</p>
                </div>
                <button type="button" class="btn-ver-cert link-magnetico" id="btn-abrir-cert">Visualizar Certificado</button>
            </div>
        `;

        document.getElementById('btn-abrir-cert').addEventListener('click', () => {
            document.getElementById('cert-nome-aluno').textContent = usuarioAtual.nome;
            document.getElementById('cert-data').textContent = new Date().toLocaleDateString('pt-BR');
            modalCert.style.display = 'flex';
            modalCert.setAttribute('aria-hidden', 'false');
        });
    } else {
        const progressoAtual = Math.min(qtdConcluidas, 12);
        containerCert.innerHTML = `
            <div class="estado-vazio-certificado">
                Você ainda não possui certificados emitidos. Progresso atual em <strong>Fundamentos do Desenho</strong>:
                <strong>${progressoAtual}/12 aulas concluídas</strong>. Conclua todas as aulas da formação completa para emitir seu certificado.
            </div>
        `;
    }

    if (fecharCert) {
        fecharCert.addEventListener('click', () => {
            modalCert.style.display = 'none';
            modalCert.setAttribute('aria-hidden', 'true');
        });
    }

    if (btnImprimirCert) {
        btnImprimirCert.addEventListener('click', () => window.print());
    }

    if (typeof aplicarEfeitoMagnetico === 'function') {
        aplicarEfeitoMagnetico();
    }
});