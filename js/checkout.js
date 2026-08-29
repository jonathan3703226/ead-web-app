// ================= VALIDAÇÕES BASE =================
function validarEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validarVencimentoCartao(validadeStr) {
    if (validadeStr.length < 5) return false;
    const partes = validadeStr.split('/');
    const mesCartao = parseInt(partes[0], 10);
    const anoCartao = parseInt(partes[1], 10);
    if (mesCartao < 1 || mesCartao > 12) return false;
    
    const dataAtual = new Date();
    const mesAtual = dataAtual.getMonth() + 1; 
    const anoAtual = parseInt(dataAtual.getFullYear().toString().slice(-2), 10); 
    
    if (anoCartao < anoAtual) return false;
    if (anoCartao === anoAtual && mesCartao < mesAtual) return false;
    return true;
}

function senhaEhValida(senha) {
    return /.{8,}/.test(senha) && /[A-Z]/.test(senha) && /[0-9]/.test(senha) && /[^A-Za-z0-9]/.test(senha);
}

// ================= FEEDBACK VISUAL EM TEMPO REAL =================
function checarCampoCheckout(input, condicaoValida, msgErro) {
    const grupo = input.closest('.input-group');
    const feedback = grupo.querySelector('.input-feedback');

    if (input.value.trim() === '') {
        grupo.classList.remove('sucesso');
        grupo.classList.add('erro');
        if (feedback) feedback.textContent = 'Campo obrigatório';
        return false;
    }

    if (condicaoValida) {
        grupo.classList.remove('erro');
        grupo.classList.add('sucesso');
        if (feedback) feedback.textContent = '';
        return true;
    } else {
        grupo.classList.remove('sucesso');
        grupo.classList.add('erro');
        if (feedback) feedback.textContent = msgErro;
        return false;
    }
}

function aplicarEventosDeValidacao() {
    const nome = document.getElementById('check-nome');
    const email = document.getElementById('check-email');
    const senha = document.getElementById('check-senha');
    const numCartao = document.getElementById('check-num-cartao');
    const validade = document.getElementById('check-validade');
    const cvv = document.getElementById('check-cvv');

    nome.addEventListener('input', () => checarCampoCheckout(nome, nome.value.trim().length > 2, 'Insira o nome completo'));
    email.addEventListener('input', () => checarCampoCheckout(email, validarEmail(email.value.trim()), 'E-mail inválido'));
    cvv.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '');
        checarCampoCheckout(cvv, cvv.value.length === 3, 'CVV deve ter 3 dígitos');
    });

    numCartao.addEventListener('input', (e) => {
        let v = e.target.value.replace(/\D/g, ''); 
        v = v.replace(/(\d{4})(?=\d)/g, '$1 '); 
        e.target.value = v;
        checarCampoCheckout(numCartao, numCartao.value.length === 19, 'Cartão inválido');
    });

    validade.addEventListener('input', (e) => {
        let v = e.target.value.replace(/\D/g, '');
        if (v.length > 2) v = v.replace(/^(\d{2})(\d)/, '$1/$2'); 
        e.target.value = v;
        if (v.length === 5) {
            checarCampoCheckout(validade, validarVencimentoCartao(v), 'Cartão vencido/inválido');
        } else {
            checarCampoCheckout(validade, false, 'Formato MM/AA');
        }
    
    });
// ================= VISUALIZAR SENHA (OLHINHO) =================
    const btnToggleSenha = document.getElementById('btn-toggle-senha-checkout');
    if (btnToggleSenha) {
        btnToggleSenha.addEventListener('click', () => {
            const tipoAtual = senha.getAttribute('type');
            senha.setAttribute('type', tipoAtual === 'password' ? 'text' : 'password');
            btnToggleSenha.textContent = tipoAtual === 'password' ? '🙈' : '👁️';
        });
    }
    // Requisitos de senha visual
    const regrasSenha = {
        tamanho: { regex: /.{8,}/, el: document.getElementById('req-tamanho') },
        maiuscula: { regex: /[A-Z]/, el: document.getElementById('req-maiuscula') },
        numero: { regex: /[0-9]/, el: document.getElementById('req-numero') },
        especial: { regex: /[^A-Za-z0-9]/, el: document.getElementById('req-especial') }
    };

    senha.addEventListener('input', (e) => {
        const val = e.target.value;
        for (const chave in regrasSenha) {
            const regra = regrasSenha[chave];
            if (regra.regex.test(val)) {
                regra.el.classList.add('valido');
                regra.el.innerHTML = regra.el.innerHTML.replace('❌', '✅');
            } else {
                regra.el.classList.remove('valido');
                regra.el.innerHTML = regra.el.innerHTML.replace('✅', '❌');
            }
        }
        checarCampoCheckout(senha, senhaEhValida(val), 'Senha não atende aos requisitos');
    });
}

function mostrarErroCheckout(mensagem) {
    const form = document.getElementById('form-checkout');
    form.querySelectorAll('.msg-erro').forEach(erro => erro.remove());

    const divErro = document.createElement('div');
    divErro.className = 'msg-erro';
    divErro.style.marginBottom = '1rem';
    divErro.innerHTML = `⚠️ ${mensagem}`;
    form.insertBefore(divErro, form.firstChild);

    const containerModal = form.closest('.modal-content');
    containerModal.classList.add('animar-shake');
    setTimeout(() => containerModal.classList.remove('animar-shake'), 500);
    containerModal.scrollTo({ top: 0, behavior: 'smooth' });
}

// ================= FLUXO DE COMPRA =================
function configurarCheckout() {
    const formCheckout = document.getElementById('form-checkout');
    if (!formCheckout) return;

    formCheckout.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nome = document.getElementById('check-nome');
        const email = document.getElementById('check-email');
        const senha = document.getElementById('check-senha');
        const numCartao = document.getElementById('check-num-cartao');
        const validade = document.getElementById('check-validade');
        const cvv = document.getElementById('check-cvv');
        const btnSubmit = document.getElementById('btn-submit-checkout');

        formCheckout.querySelectorAll('.msg-erro').forEach(erro => erro.remove());

        // Força checagem de todos os campos no submit
        const vNome = checarCampoCheckout(nome, nome.value.trim().length > 2, 'Insira o nome completo');
        const vEmail = checarCampoCheckout(email, validarEmail(email.value.trim()), 'E-mail inválido');
        const vSenha = checarCampoCheckout(senha, senhaEhValida(senha.value), 'Senha fraca');
        const vCartao = checarCampoCheckout(numCartao, numCartao.value.length === 19, 'Cartão inválido');
        const vValidade = checarCampoCheckout(validade, validarVencimentoCartao(validade.value), 'Cartão vencido/inválido');
        const vCvv = checarCampoCheckout(cvv, cvv.value.length === 3, 'CVV incorreto');

        if (!vNome || !vEmail || !vSenha || !vCartao || !vValidade || !vCvv) {
            mostrarErroCheckout('Verifique os campos destacados em vermelho antes de prosseguir.');
            return;
        }

        const textoOriginal = btnSubmit.textContent;
        btnSubmit.disabled = true;
        btnSubmit.textContent = 'Processando Cartão... 🔒';
        btnSubmit.style.opacity = '0.7';
        btnSubmit.style.cursor = 'wait';

        setTimeout(() => {
            const usuarios = JSON.parse(localStorage.getItem('nankim_db')) || [];
            const containerModal = formCheckout.closest('.modal-content');
            const emailTratado = email.value.trim().toLowerCase();
            
            if (usuarios.some(user => user.email === emailTratado)) {
                containerModal.innerHTML = `
                    <div style="text-align: center; padding: 2rem 0; animation: fade-in 0.5s;">
                        <div style="font-size: 4rem; margin-bottom: 1rem;">⚠️</div>
                        <h2 style="color: #f39c12; margin-bottom: 1rem;">Conta Já Existente</h2>
                        <p style="color: #555; margin-bottom: 1.5rem; font-size: 1.1rem;">O e-mail <strong>${emailTratado}</strong> já está cadastrado.</p>
                        <button id="btn-ir-login" style="background-color: #1a1a1a; color: #fff; border: none; padding: 1rem; border-radius: 4px; font-size: 1.1rem; font-weight: bold; cursor: pointer; width: 100%; transition: 0.3s;">Fazer Login Agora</button>
                    </div>
                `;
                document.getElementById('btn-ir-login').addEventListener('click', () => {
                    document.getElementById('modal-checkout').style.display = 'none';
                    document.getElementById('modal-login').style.display = 'flex';
                });
                return;
            }

            const novoUsuario = {
                id: Date.now(),
                nome: nome.value.trim(),
                email: emailTratado,
                senha: senha.value
            };
            
            usuarios.push(novoUsuario);
            localStorage.setItem('nankim_db', JSON.stringify(usuarios));

            containerModal.innerHTML = `
                <div style="text-align: center; padding: 2rem 0; animation: fade-in 0.5s;">
                    <div style="font-size: 4rem; margin-bottom: 1rem;">🎉</div>
                    <h2 style="color: #27ae60; margin-bottom: 1rem;">Compra Aprovada!</h2>
                    <p style="color: #555; margin-bottom: 1.5rem; font-size: 1.1rem;">Parabéns, <strong>${nome.value.trim()}</strong>! Sua conta foi criada.</p>
                    <p style="font-size: 0.9rem; color: #999;">Atualizando para você fazer login...</p>
                </div>
            `;
           setTimeout(() => {
                // 1. Oculta o modal de checkout
                document.getElementById('modal-checkout').style.display = 'none';
                
                // 2. Preenche o e-mail automaticamente no formulário de login
                const campoEmailLogin = document.getElementById('login-email');
                if (campoEmailLogin) {
                    campoEmailLogin.value = emailTratado;
                    // Dispara o evento de input para a validação visual (borda verde) ativar
                    campoEmailLogin.dispatchEvent(new Event('input'));
                }
                
                // 3. Exibe o modal de login
                document.getElementById('modal-login').style.display = 'flex';
                
                // 4. Coloca o cursor piscando direto no campo de senha para agilizar
                const campoSenhaLogin = document.getElementById('login-senha');
                if (campoSenhaLogin) {
                    campoSenhaLogin.focus();
                }
            }, 3000);
        }, 1500);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    aplicarEventosDeValidacao();
    configurarCheckout();
});