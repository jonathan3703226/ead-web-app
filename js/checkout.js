const CHECKOUT_COURSE = { id: 'fundamentos-desenho', nome: 'Fundamentos do Desenho' };
let usuarioCheckout = null;
let emailCheckout = '';

function obterUsuariosCheckout() {
    const dados = localStorage.getItem('nankim_db');
    if (!dados) return [];
    const usuarios = JSON.parse(dados);
    if (!Array.isArray(usuarios)) throw new TypeError('O cadastro local está em formato inválido.');
    return usuarios;
}

function atualizarTituloCheckout(titulo, subtitulo) {
    document.getElementById('checkout-titulo').textContent = titulo;
    document.getElementById('checkout-subtitulo').textContent = subtitulo;
}

function mostrarErroCheckout(mensagem) {
    const container = document.getElementById('checkout-stage');
    container.querySelectorAll('.msg-erro').forEach((erro) => erro.remove());
    const erro = document.createElement('p');
    erro.className = 'msg-erro';
    erro.setAttribute('role', 'alert');
    erro.textContent = mensagem;
    container.prepend(erro);
}

function iniciarCheckout() {
    usuarioCheckout = null;
    emailCheckout = '';
    atualizarTituloCheckout('Assinar Fundamentos do Desenho', 'Identifique sua conta para continuar.');
    document.getElementById('checkout-stage').innerHTML = `
        <form id="form-identificacao" novalidate>
            <div class="input-group">
                <label for="checkout-email">E-mail de acesso</label>
                <input type="email" id="checkout-email" autocomplete="email" placeholder="seuemail@dominio.com" required>
            </div>
            <button type="submit">Continuar</button>
        </form>
    `;

    document.getElementById('form-identificacao').addEventListener('submit', (event) => {
        event.preventDefault();
        const emailInput = document.getElementById('checkout-email');
        emailCheckout = emailInput.value.trim().toLowerCase();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailCheckout)) {
            mostrarErroCheckout('Informe um e-mail válido para continuar.');
            return;
        }

        let usuarios;
        try {
            usuarios = obterUsuariosCheckout();
        } catch (error) {
            console.error('Não foi possível consultar os cadastros para o checkout:', error);
            mostrarErroCheckout('Não foi possível verificar o cadastro. Tente novamente.');
            return;
        }

        const existente = usuarios.find((usuario) => usuario.email.toLowerCase() === emailCheckout);
        if (existente && existente.matriculado === true) {
            atualizarTituloCheckout('Você já tem acesso', 'Este e-mail já possui uma matrícula ativa neste curso.');
            document.getElementById('checkout-stage').innerHTML = `
                <p class="checkout-nota">Entre na sua conta para continuar os estudos.</p>
                <button type="button" id="checkout-ir-login">Fazer login</button>
            `;
            document.getElementById('checkout-ir-login').addEventListener('click', () => {
                document.getElementById('modal-checkout').style.display = 'none';
                document.getElementById('modal-login').style.display = 'flex';
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

function mostrarEtapaCadastroCheckout() {
    atualizarTituloCheckout('Crie seu cadastro', 'Seu cadastro e a assinatura são etapas distintas. O acesso será liberado após finalizar o pagamento.');
    document.getElementById('checkout-stage').innerHTML = `
        <form id="form-cadastro-checkout" novalidate>
            <div class="input-group">
                <label for="check-nome">Nome completo</label>
                <input type="text" id="check-nome" autocomplete="name" required>
            </div>
            <div class="input-group">
                <label for="check-email">E-mail de acesso</label>
                <input type="email" id="check-email" readonly>
            </div>
            <div class="input-group">
                <label for="check-senha">Crie sua senha</label>
                <input type="password" id="check-senha" autocomplete="new-password" required>
                <small class="input-feedback">8 caracteres, letra maiúscula, número e símbolo.</small>
            </div>
            <button type="submit">Criar cadastro e continuar</button>
        </form>
    `;
    document.getElementById('check-email').value = emailCheckout;

    document.getElementById('form-cadastro-checkout').addEventListener('submit', (event) => {
        event.preventDefault();
        const nome = document.getElementById('check-nome').value.trim();
        const senha = document.getElementById('check-senha').value;
        const senhaValida = senha.length >= 8 && /[A-Z]/.test(senha) &&
            /[0-9]/.test(senha) && /[^A-Za-z0-9]/.test(senha);
        if (nome.length < 2 || !senhaValida) {
            mostrarErroCheckout('Informe seu nome e use uma senha com 8 caracteres, letra maiúscula, número e símbolo.');
            return;
        }

        let usuarios;
        try {
            usuarios = obterUsuariosCheckout();
        } catch (error) {
            console.error('Não foi possível salvar o cadastro do checkout:', error);
            mostrarErroCheckout('Não foi possível criar o cadastro. Tente novamente.');
            return;
        }
        if (usuarios.some((usuario) => usuario.email.toLowerCase() === emailCheckout)) {
            mostrarErroCheckout('Este e-mail já foi cadastrado. Volte e faça login para prosseguir com o pagamento.');
            return;
        }

        usuarioCheckout = {
            id: Date.now(),
            nome,
            email: emailCheckout,
            senha,
            matriculado: false,
            cursos: []
        };
        usuarios.push(usuarioCheckout);
        try {
            localStorage.setItem('nankim_db', JSON.stringify(usuarios));
        } catch (error) {
            console.error('Não foi possível salvar o cadastro local do checkout:', error);
            mostrarErroCheckout('Não foi possível salvar seu cadastro neste navegador. Tente novamente.');
            return;
        }
        mostrarEtapaPagamento();
    });
}

function mostrarEtapaLoginCheckout() {
    atualizarTituloCheckout('Confirme sua conta', 'Este e-mail já está cadastrado. Confirme sua senha para prosseguir ao pagamento.');
    document.getElementById('checkout-stage').innerHTML = `
        <form id="form-login-checkout" novalidate>
            <div class="input-group">
                <label for="checkout-email-existente">E-mail</label>
                <input type="email" id="checkout-email-existente" readonly>
            </div>
            <div class="input-group">
                <label for="checkout-senha-existente">Senha da conta</label>
                <input type="password" id="checkout-senha-existente" autocomplete="current-password" required>
            </div>
            <button type="submit">Confirmar e continuar</button>
        </form>
    `;
    document.getElementById('checkout-email-existente').value = emailCheckout;
    document.getElementById('form-login-checkout').addEventListener('submit', (event) => {
        event.preventDefault();
        if (document.getElementById('checkout-senha-existente').value !== usuarioCheckout.senha) {
            mostrarErroCheckout('Senha incorreta. Confira seus dados e tente novamente.');
            return;
        }
        mostrarEtapaPagamento();
    });
}

function validarCpf(cpf) {
    const numeros = cpf.replace(/\D/g, '');
    if (numeros.length !== 11 || /^(\d)\1{10}$/.test(numeros)) return false;
    const calcularDigito = (base, pesoInicial) => {
        const soma = base.split('').reduce((total, digito, indice) =>
            total + Number(digito) * (pesoInicial - indice), 0
        );
        const resto = (soma * 10) % 11;
        return resto === 10 ? 0 : resto;
    };
    return calcularDigito(numeros.slice(0, 9), 10) === Number(numeros[9]) &&
        calcularDigito(numeros.slice(0, 10), 11) === Number(numeros[10]);
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
    atualizarTituloCheckout('Dados de assinatura', 'Informe CPF, nome no cartão e escolha PIX, boleto ou cartão.');
    document.getElementById('checkout-stage').innerHTML = `
        <form id="form-pagamento" novalidate>
            <div class="input-group">
                <label for="checkout-cpf">CPF</label>
                <input type="text" id="checkout-cpf" inputmode="numeric" autocomplete="off" maxlength="14" placeholder="000.000.000-00" required>
            </div>
            <div class="input-group">
                <label for="checkout-nome-cartao">Nome que está no cartão</label>
                <input type="text" id="checkout-nome-cartao" autocomplete="cc-name" required>
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
                </div>
                <div class="linha-inputs">
                    <div class="input-group">
                        <label for="check-validade">Validade</label>
                        <input type="text" id="check-validade" inputmode="numeric" autocomplete="cc-exp" maxlength="5" placeholder="MM/AA" disabled>
                    </div>
                    <div class="input-group">
                        <label for="check-cvv">CVV</label>
                        <input type="password" id="check-cvv" inputmode="numeric" autocomplete="cc-csc" maxlength="4" disabled>
                    </div>
                </div>
            </div>
            <p class="checkout-nota">Demonstração front-end: nenhuma cobrança real será realizada. Não use dados reais de cartão.</p>
            <button type="submit" id="btn-submit-checkout">Confirmar pagamento (simulação)</button>
        </form>
    `;

    const form = document.getElementById('form-pagamento');
    const cpf = document.getElementById('checkout-cpf');
    const nomeCartao = document.getElementById('checkout-nome-cartao');
    const dadosCartao = document.getElementById('dados-cartao');
    const camposCartao = [...dadosCartao.querySelectorAll('input')];

    cpf.addEventListener('input', () => {
        const digitos = cpf.value.replace(/\D/g, '').slice(0, 11);
        cpf.value = digitos.replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
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
                usaCartao ? 'Nome que está no cartão' : 'Nome completo do titular';
        });
    });

    document.getElementById('check-num-cartao').addEventListener('input', (event) => {
        const numeros = event.target.value.replace(/\D/g, '').slice(0, 16);
        event.target.value = numeros.replace(/(\d{4})(?=\d)/g, '$1 ');
    });
    document.getElementById('check-validade').addEventListener('input', (event) => {
        const numeros = event.target.value.replace(/\D/g, '').slice(0, 4);
        event.target.value = numeros.length > 2 ? `${numeros.slice(0, 2)}/${numeros.slice(2)}` : numeros;
    });
    document.getElementById('check-cvv').addEventListener('input', (event) => {
        event.target.value = event.target.value.replace(/\D/g, '').slice(0, 4);
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const cpfValido = validarCpf(cpf.value);
        if (!cpfValido) {
            mostrarErroCheckout('Informe um CPF válido.');
            cpf.focus();
            return;
        }
        if (nomeCartao.value.trim().length < 3) {
            mostrarErroCheckout('Informe o nome do titular do pagamento.');
            nomeCartao.focus();
            return;
        }

        const metodo = form.querySelector('input[name="metodo-pagamento"]:checked').value;
        if (metodo === 'cartao') {
            const numero = document.getElementById('check-num-cartao').value.replace(/\D/g, '');
            const validade = document.getElementById('check-validade').value;
            const cvv = document.getElementById('check-cvv').value;
            if (numero.length !== 16 || !validarVencimentoCartao(validade) || !/^\d{3,4}$/.test(cvv)) {
                mostrarErroCheckout('Confira número, validade e código de segurança do cartão.');
                return;
            }
        }

        concluirCheckout(metodo);
    });
}

function concluirCheckout(metodo) {
    let usuarios;
    try {
        usuarios = obterUsuariosCheckout();
    } catch (error) {
        console.error('Não foi possível concluir a matrícula:', error);
        mostrarErroCheckout('Não foi possível concluir a matrícula. Tente novamente.');
        return;
    }

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
        console.error('Não foi possível salvar a matrícula local:', error);
        mostrarErroCheckout('Não foi possível salvar a matrícula neste navegador. Tente novamente.');
        return;
    }
    let sessaoDisponivel = true;
    try {
        sessionStorage.setItem('nankim_sessao', JSON.stringify({
            logado: true,
            nome: usuario.nome,
            email: usuario.email
        }));
    } catch (error) {
        console.error('A matrícula foi salva, mas a sessão não pôde ser iniciada:', error);
        sessaoDisponivel = false;
    }

    atualizarTituloCheckout(
        'Matrícula liberada!',
        sessaoDisponivel
            ? 'Pagamento de demonstração concluído; seu acesso já está disponível.'
            : 'Matrícula salva. Entre na sua conta para abrir a Área do Aluno.'
    );
    document.getElementById('checkout-stage').innerHTML = sessaoDisponivel
        ? `<p class="checkout-nota checkout-sucesso">Sua matrícula em Fundamentos do Desenho está ativa.</p>
           <a class="checkout-link-area" href="area-aluno.html">Ir para a Área do Aluno</a>`
        : `<p class="checkout-nota checkout-sucesso">Sua matrícula em Fundamentos do Desenho está ativa.</p>
           <button type="button" id="checkout-ir-login">Fazer login</button>`;
    if (!sessaoDisponivel) {
        document.getElementById('checkout-ir-login').addEventListener('click', () => {
            document.getElementById('modal-checkout').style.display = 'none';
            document.getElementById('modal-login').style.display = 'flex';
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.botao-assinar[data-modal="checkout"]').forEach((botao) => {
        botao.addEventListener('click', iniciarCheckout);
    });
});
