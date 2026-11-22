/* ==========================================================================
   CONTATO.JS - Nankim Escola de Arte
   Revelação no scroll, validação instantânea (vermelho/verde), máscara de
   telefone e modal de confirmação de envio
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    iniciarRevelacaoScrollContato();
    iniciarFormularioContatoComValidacao();
});

function iniciarRevelacaoScrollContato() {
    const elementos = document.querySelectorAll('.pagina-contato .revelar-scroll');
    if (!elementos.length) return;

    if (!('IntersectionObserver' in window)) {
        elementos.forEach((el) => el.classList.add('visivel'));
        return;
    }

    const observador = new IntersectionObserver(
        (entradas) => {
            entradas.forEach((entrada) => {
                if (entrada.isIntersecting) {
                    entrada.target.classList.add('visivel');
                    observador.unobserve(entrada.target);
                }
            });
        },
        { threshold: 0.1, rootMargin: '0px 0px -35px 0px' }
    );

    elementos.forEach((el) => observador.observe(el));
}

function iniciarFormularioContatoComValidacao() {
    const form = document.getElementById('form-contato');
    if (!form) return;

    const inputNome = document.getElementById('contato-nome');
    const inputEmail = document.getElementById('contato-email');
    const inputTelefone = document.getElementById('contato-telefone');
    const inputMensagem = document.getElementById('contato-mensagem');

    const erroNome = document.getElementById('erro-contato-nome');
    const erroEmail = document.getElementById('erro-contato-email');
    const erroTelefone = document.getElementById('erro-contato-telefone');
    const erroMensagem = document.getElementById('erro-contato-mensagem');

    const modal = document.getElementById('modal-confirmacao-contato');
    const textoModal = document.getElementById('texto-modal-confirmacao');
    const btnFecharX = document.getElementById('fechar-modal-contato-x');
    const btnFecharOk = document.getElementById('btn-ok-modal-contato');

    function validarNome() {
        const valor = inputNome.value.trim();
        if (valor.length < 3) {
            return { valido: false, mensagem: 'Digite seu nome completo (mínimo 3 letras).' };
        }
        return { valido: true, mensagem: '' };
    }

    function validarEmail() {
        const valor = inputEmail.value.trim();
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if (!valor) {
            return { valido: false, mensagem: 'Informe seu endereço de e-mail.' };
        }
        if (!regexEmail.test(valor)) {
            return { valido: false, mensagem: 'Digite um e-mail válido (ex: nome@dominio.com).' };
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

    function validarMensagem() {
        const valor = inputMensagem.value.trim();
        if (valor.length < 10) {
            return { valido: false, mensagem: 'Escreva uma mensagem com pelo menos 10 caracteres.' };
        }
        return { valido: true, mensagem: '' };
    }

    function atualizarEstadoCampo(input, elementoErro, fnValidar) {
        const grupo = input.closest('.input-group');
        if (!grupo) return false;

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

    inputTelefone.addEventListener('input', () => {
        let digitos = inputTelefone.value.replace(/\D/g, '').slice(0, 11);

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

        atualizarEstadoCampo(inputTelefone, erroTelefone, validarTelefone);
    });

    const configuracaoCampos = [
        { input: inputNome, erro: erroNome, validar: validarNome },
        { input: inputEmail, erro: erroEmail, validar: validarEmail },
        { input: inputTelefone, erro: erroTelefone, validar: validarTelefone },
        { input: inputMensagem, erro: erroMensagem, validar: validarMensagem }
    ];

    configuracaoCampos.forEach(({ input, erro, validar }) => {
        input.addEventListener('focus', () => {
            atualizarEstadoCampo(input, erro, validar);
        });

        input.addEventListener('input', () => {
            atualizarEstadoCampo(input, erro, validar);
        });

        if (input === inputTelefone) {
            input.addEventListener('blur', () => {
                if (input.value.trim() === '') {
                    const grupo = input.closest('.input-group');
                    grupo.classList.remove('campo-invalido', 'campo-valido');
                    erro.textContent = '';
                }
            });
        }
    });

    function abrirModalConfirmacao(nomeUsuario) {
        if (!modal) return;
        if (textoModal) {
            textoModal.innerHTML = `Olá, <strong>${nomeUsuario}</strong>! Recebemos a sua mensagem e nossa equipe da <strong>Nankim Escola de Arte</strong> entrará em contato em breve.`;
        }
        modal.hidden = false;
        requestAnimationFrame(() => {
            modal.classList.add('ativo');
        });
    }

    function fecharModalConfirmacao() {
        if (!modal) return;
        modal.classList.remove('ativo');
        setTimeout(() => {
            modal.hidden = true;
        }, 300);
    }

    if (btnFecharX) btnFecharX.addEventListener('click', fecharModalConfirmacao);
    if (btnFecharOk) btnFecharOk.addEventListener('click', fecharModalConfirmacao);
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) fecharModalConfirmacao();
        });
    }
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && !modal.hidden) {
            fecharModalConfirmacao();
        }
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const nomeOk = atualizarEstadoCampo(inputNome, erroNome, validarNome);
        const emailOk = atualizarEstadoCampo(inputEmail, erroEmail, validarEmail);
        const telefoneOk = inputTelefone.value.trim() === ''
            ? true
            : atualizarEstadoCampo(inputTelefone, erroTelefone, validarTelefone);
        const mensagemOk = atualizarEstadoCampo(inputMensagem, erroMensagem, validarMensagem);

        if (!nomeOk || !emailOk || !telefoneOk || !mensagemOk) {
            const primeiroInvalido = form.querySelector('.campo-invalido input, .campo-invalido textarea');
            if (primeiroInvalido) primeiroInvalido.focus();
            return;
        }

        const primeiroNome = inputNome.value.trim().split(' ')[0];

        form.reset();
        form.querySelectorAll('.input-group').forEach((grupo) => {
            grupo.classList.remove('campo-valido', 'campo-invalido');
        });
        [erroNome, erroEmail, erroTelefone, erroMensagem].forEach((el) => {
            if (el) el.textContent = '';
        });

        abrirModalConfirmacao(primeiroNome);
    });
}