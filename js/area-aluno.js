document.addEventListener('DOMContentLoaded', () => {

    // 1. CARREGAR DADOS DO USUÁRIO E VERIFICAR LOGIN
    const sessaoData = sessionStorage.getItem('nankim_sessao');
    if (!sessaoData) {
        window.location.href = 'index.html';
        return;
    }

    const usuarioSessao = JSON.parse(sessaoData);
    const emailUsuario = usuarioSessao.email;

    let dbUsuarios = JSON.parse(localStorage.getItem('nankim_db')) || [];
    let usuarioAtual = dbUsuarios.find(u => u.email === emailUsuario);

    if (!usuarioAtual) {
        sessionStorage.removeItem('nankim_sessao');
        window.location.href = 'index.html';
        return;
    }

    // 2. PREENCHER HEADER
    const primeiroNome = usuarioAtual.nome.split(' ')[0];
    const inicial = primeiroNome.charAt(0).toUpperCase();
    
    document.getElementById('nome-aluno-topo').textContent = primeiroNome;
    document.getElementById('avatar-iniciais').textContent = inicial;
    
    const textoBoasVindas = document.getElementById('texto-boas-vindas');
    if (textoBoasVindas) {
        textoBoasVindas.textContent = `Olá, ${primeiroNome}!`;
    }

    // 3. DROPDOWN MENU
    const btnMenu = document.getElementById('btn-menu-perfil');
    const dropdown = document.getElementById('dropdown-perfil');

    if (btnMenu && dropdown) {
        btnMenu.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('show');
        });

        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target) && e.target !== btnMenu) {
                dropdown.classList.remove('show');
            }
        });
    }

    // 4. LOGOUT
    const btnSair = document.getElementById('btn-sair');
    if (btnSair) {
        btnSair.addEventListener('click', () => {
            sessionStorage.removeItem('nankim_sessao');
            window.location.href = 'index.html';
        });
    }

    // =========================================================================
    // 5. RENDERIZAÇÃO DOS CURSOS COM EFEITO EXPANSÍVEL E CHECKOUT DIRETO
    // =========================================================================
    
    const containerMatriculados = document.getElementById('container-cursos-matriculados');
    const containerCatalogo = document.getElementById('container-cursos-catalogo');

    const listaCursosPlataforma = [
        {
            id: 'fundamentos-desenho',
            titulo: 'Fundamentos do Desenho',
            descricao: 'O ponto de partida para qualquer artista. Domine formas, perspectiva e luz com uma trilha prática e progressiva.',
            imagem: './imagens/Fundamentos%20do%20Desenho.jpg'
        },
        {
            id: 'anatomia-humana',
            titulo: 'Anatomia Humana',
            descricao: 'Estude proporções, musculatura e movimento para desenhar figuras humanas com mais confiança.',
            imagem: './imagens/Intermedi%C3%A1rio%20Anatomia%20Humana.jpg',
            disponivel: false
        },
        {
            id: 'ilustracao-digital',
            titulo: 'Ilustração Digital',
            descricao: 'Desenvolva seu processo digital, da composição e cor até a finalização de uma ilustração autoral.',
            imagem: './imagens/Avan%C3%A7ado%20Ilustra%C3%A7%C3%A3o%20Digital.jpg',
            disponivel: false
        }
    ];

    function renderizarCentralAlunos() {
        containerMatriculados.innerHTML = '';
        containerCatalogo.innerHTML = '';

        listaCursosPlataforma.forEach(curso => {
            if (curso.id === 'fundamentos-desenho') {
                renderizarCursoFundamentos();
            } else {
                renderizarCursoFuturo(curso);
            }
        });

        // Associar o evento de fechar o modal aos botões com data-close
        document.querySelectorAll('[data-close="checkout"]').forEach(btn => {
            btn.addEventListener('click', () => {
                const modalCheckout = document.getElementById('modal-checkout');
                if (modalCheckout) modalCheckout.style.display = 'none';
            });
        });

        // Associar os eventos aos botões de Checkout Direto APÓS a criação do HTML no DOM
        document.querySelectorAll('.btn-abrir-checkout-direto').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Define as variáveis globais de checkout com os dados da sessão do aluno logado
                emailCheckout = usuarioAtual.email;
                usuarioCheckout = usuarioAtual;
                
                const modalCheckout = document.getElementById('modal-checkout');
                if (modalCheckout) {
                    modalCheckout.style.display = 'flex';
                }

                // Dispara diretamente a etapa de dados de pagamento (CPF / Cartão / PIX)
                if (typeof mostrarEtapaPagamento === 'function') {
                    mostrarEtapaPagamento();
                }
            });
        });
    }

    function renderizarCursoFuturo(curso) {
        const tagHTML = `<span class="tag-status tag-breve">Em breve</span>`;
        const acoesHTML = `<button class="btn-acao-custom btn-detalhes" disabled>Em breve no catálogo</button>`;
        const filtroImg = 'grayscale(100%) opacity(0.4)';

        // Classe 'card-estatico' adicionada para remover o efeito de subida no hover
        const htmlCard = `
            <article class="curso-card-aluno card-estatico">
                <img src="${curso.imagem}" alt="${curso.titulo}" class="curso-card-imagem" style="filter: ${filtroImg};">
                <div class="curso-painel">
                    <header class="curso-cabecalho">
                        ${tagHTML}
                        <h2>${curso.titulo}</h2>
                    </header>
                    <div class="curso-detalhes">
                        <p class="curso-descricao">${curso.descricao}</p>
                        <div class="curso-compra" style="margin-top: auto;">
                            ${acoesHTML}
                        </div>
                    </div>
                </div>
            </article>
        `;
        containerCatalogo.innerHTML += htmlCard;
    }
    function renderizarCursoFundamentos() {
        const matriculado = usuarioAtual.matriculado === true;
        const degustacao = usuarioAtual.modulo1_liberado === true;

        let tagHTML = '';
        let progressoHTML = '';
        let acoesHTML = '';
        let filtroImg = 'grayscale(0%) opacity(1)';
        const titulo = 'Fundamentos do Desenho';
        const desc = 'O ponto de partida para qualquer artista. Domine formas, perspectiva e luz com uma trilha prática e progressiva.';
        const imagem = './imagens/Fundamentos%20do%20Desenho.jpg';

        if (matriculado) {
            tagHTML = `<span class="tag-status tag-completo">Curso Completo</span>`;
            progressoHTML = `
                <div class="barra-fundo"><div class="barra-preenchida" style="width: 0%;"></div></div>
                <span class="texto-progresso">0% concluído</span>
            `;
            acoesHTML = `<button type="button" class="btn-acao-custom btn-primario" onclick="alert('Indo para a Sala de Aula do Curso Completo!')">Continuar Curso</button>`;
            
            containerMatriculados.innerHTML += criarCardExpandivelHTML(titulo, desc, imagem, tagHTML, progressoHTML, acoesHTML, filtroImg, false);

        } else if (degustacao) {
            tagHTML = `<span class="tag-status tag-degustacao">Módulo 1 Liberado</span>`;
            progressoHTML = `<span class="texto-aviso-bloqueado">Aproveite sua aula experimental grátis.</span>`;
            
            acoesHTML = `
                <button type="button" class="btn-acao-custom btn-primario" onclick="alert('Indo para o Vídeo do Módulo 1')">Acessar Módulo 1</button>
                <button type="button" class="btn-acao-custom btn-comprar btn-abrir-checkout-direto">Assinar / Comprar</button>
            `;

            containerMatriculados.innerHTML += criarCardExpandivelHTML(titulo, desc, imagem, tagHTML, progressoHTML, acoesHTML, filtroImg, true);

        } else {
            tagHTML = `<span class="tag-status tag-bloqueado">🔒 Bloqueado</span>`;
            filtroImg = 'grayscale(100%) opacity(0.6)';
            progressoHTML = `
                <span class="texto-aviso-bloqueado" style="color: #e74c3c;">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                    Você ainda não possui acesso a este curso.
                </span>
            `;
            
            acoesHTML = `
                <button type="button" class="btn-acao-custom btn-secundario" id="btn-liberar-mod1">Liberar Módulo 1 Grátis</button>
                <button type="button" class="btn-acao-custom btn-comprar btn-abrir-checkout-direto">Assinar / Comprar</button>
            `;

            containerCatalogo.innerHTML += criarCardExpandivelHTML(titulo, desc, imagem, tagHTML, progressoHTML, acoesHTML, filtroImg, true);
        }

        setTimeout(() => {
            const btnLiberar = document.getElementById('btn-liberar-mod1');
            if (btnLiberar) {
                btnLiberar.addEventListener('click', () => {
                    usuarioAtual.modulo1_liberado = true;
                    const index = dbUsuarios.findIndex(u => u.email === emailUsuario);
                    dbUsuarios[index] = usuarioAtual;
                    localStorage.setItem('nankim_db', JSON.stringify(dbUsuarios));
                    renderizarCentralAlunos();
                });
            }
        }, 50);
    }

   

    function criarCardExpandivelHTML(titulo, descricao, imagem, tagHTML, progressoHTML, acoesHTML, filtroImg, mostrarPreco) {
        const rodapePreco = mostrarPreco ? `
            <div class="curso-compra">
                <p><span>Investimento único</span><strong>R$ 49,90</strong></p>
                ${acoesHTML}
            </div>
        ` : `
            <div class="curso-compra" style="justify-content: flex-start;">
                ${acoesHTML}
            </div>
        `;

        return `
            <article class="curso-card-aluno">
                <img src="${imagem}" alt="${titulo}" class="curso-card-imagem" style="filter: ${filtroImg};">
                <div class="curso-painel">
                    <header class="curso-cabecalho">
                        ${tagHTML}
                        <h2>${titulo}</h2>
                    </header>
                    <div class="curso-detalhes">
                        <p class="curso-descricao">${descricao}</p>
                        <div class="area-status-curso">${progressoHTML}</div>
                        ${rodapePreco}
                    </div>
                </div>
            </article>
        `;
    }

    renderizarCentralAlunos();

});