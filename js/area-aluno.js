/* ==========================================================
   LÓGICA E INTERATIVIDADE DA ÁREA DO ALUNO (NANKIM)
   ========================================================== */

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
    let idxUsuarioAtual = dbUsuarios.findIndex(u => u.email.toLowerCase() === String(emailUsuario).toLowerCase());
    let usuarioAtual = idxUsuarioAtual !== -1 ? dbUsuarios[idxUsuarioAtual] : null;

    if (!usuarioAtual) {
        sessionStorage.removeItem('nankim_sessao');
        window.location.href = 'index.html';
        return;
    }

    // Garante automaticamente o Módulo 1 liberado para qualquer aluno cadastrado
    if (!usuarioAtual.matriculado && usuarioAtual.modulo1_liberado !== true) {
        usuarioAtual.modulo1_liberado = true;
        if (!Array.isArray(usuarioAtual.cursos) || usuarioAtual.cursos.length === 0) {
            usuarioAtual.cursos = [
                {
                    id: 'fundamentos-desenho',
                    nome: 'Fundamentos do Desenho',
                    apenasModulo1: true,
                    progresso: 0,
                    ultimaAula: 0,
                    aulasConcluidas: []
                }
            ];
        }
        dbUsuarios[idxUsuarioAtual] = usuarioAtual;
        localStorage.setItem('nankim_db', JSON.stringify(dbUsuarios));
    }

    // 2. PREENCHER HEADER E BOAS VINDAS
    const primeiroNome = usuarioAtual.nome ? usuarioAtual.nome.split(' ')[0] : 'Aluno';
    const inicial = primeiroNome.charAt(0).toUpperCase();
    
    const elemNomeTopo = document.getElementById('nome-aluno-topo');
    const elemAvatar = document.getElementById('avatar-iniciais');
    const textoBoasVindas = document.getElementById('texto-boas-vindas');

    if (elemNomeTopo) elemNomeTopo.textContent = primeiroNome;
    if (elemAvatar) elemAvatar.textContent = inicial;
    if (textoBoasVindas) textoBoasVindas.textContent = `Olá, ${primeiroNome}!`;

    // 3. DROPDOWN MENU DO PERFIL
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

    // 5. RENDERIZAÇÃO DINÂMICA DOS CURSOS
    const containerMatriculados = document.getElementById('container-cursos-matriculados');
    const containerCatalogo = document.getElementById('container-cursos-catalogo');

    const listaCursosPlataforma = [
        {
            id: 'fundamentos-desenho',
            titulo: 'Fundamentos do Desenho',
            descricao: 'O ponto de partida para qualquer artista. Domine formas, perspectiva e luz com uma trilha prática e progressiva.',
            imagem: './assets/img/fundamentos-desenho.jpg'
        },
        {
            id: 'anatomia-humana',
            titulo: 'Anatomia Humana',
            descricao: 'Estude proporções, musculatura e movimento para desenhar figuras humanas com mais confiança.',
            imagem: './assets/img/anatomia-humana.jpg',
            disponivel: false
        },
        {
            id: 'ilustracao-digital',
            titulo: 'Ilustração Digital',
            descricao: 'Desenvolva seu processo digital, da composição e cor até a finalização de uma ilustração autoral.',
            imagem: './assets/img/ilustracao-digital.jpg',
            disponivel: false
        }
    ];

    function renderizarCentralAlunos() {
        if (containerMatriculados) containerMatriculados.innerHTML = '';
        if (containerCatalogo) containerCatalogo.innerHTML = '';

        listaCursosPlataforma.forEach(curso => {
            if (curso.id === 'fundamentos-desenho') {
                renderizarCursoFundamentos();
            } else {
                renderizarCursoFuturo(curso);
            }
        });

        // Eventos dos botões de fechar checkout
        document.querySelectorAll('[data-close="checkout"]').forEach(btn => {
            btn.addEventListener('click', () => {
                const modalCheckout = document.getElementById('modal-checkout');
                if (modalCheckout) modalCheckout.style.display = 'none';
            });
        });

        // Eventos dos botões de checkout direto
        document.querySelectorAll('.btn-abrir-checkout-direto').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                if (typeof iniciarCheckoutLogado === 'function') {
                    iniciarCheckoutLogado();
                } else {
                    console.error('Função iniciarCheckoutLogado não foi encontrada.');
                }
            });
        });
    }

    function renderizarCursoFuturo(curso) {
        if (!containerCatalogo) return;
        const htmlCard = `
            <article class="curso-card-aluno card-estatico">
                <img src="${curso.imagem}" alt="${curso.titulo}" class="curso-card-imagem">
                <div class="curso-painel">
                    <header class="curso-cabecalho">
                        <span class="tag-status tag-breve">Em breve</span>
                        <h2>${curso.titulo}</h2>
                    </header>
                </div>
            </article>
        `;
        containerCatalogo.innerHTML += htmlCard;
    }

    function renderizarCursoFundamentos() {
        const matriculado = usuarioAtual.matriculado === true;

        let tagHTML = '';
        let progressoHTML = '';
        let acoesHTML = '';
        const filtroImg = 'grayscale(0%) opacity(1)';
        const titulo = 'Fundamentos do Desenho';
        const desc = 'O ponto de partida para qualquer artista. Domine formas, perspectiva e luz com uma trilha prática e progressiva.';
        const imagem = './assets/img/fundamentos-desenho.jpg';

        if (matriculado) {
            tagHTML = `<span class="tag-status tag-completo">Curso Completo</span>`;
            progressoHTML = `
                <div class="barra-fundo"><div class="barra-preenchida" style="width: 0%;"></div></div>
                <span class="texto-progresso">0% concluído</span>
            `;
            acoesHTML = `<a href="sala-de-aula.html" class="btn-acao-custom btn-primario">Continuar Curso</a>`;
            if (containerMatriculados) {
                containerMatriculados.innerHTML += criarCardExpandivelHTML(titulo, desc, imagem, tagHTML, progressoHTML, acoesHTML, filtroImg, false);
            }
        } else {
            // Qualquer aluno cadastrado já possui o Módulo 1 liberado automaticamente
            tagHTML = `<span class="tag-status tag-degustacao">Módulo 1 Liberado</span>`;
            progressoHTML = `<span class="texto-aviso-bloqueado">Aproveite sua aula experimental grátis.</span>`;
            acoesHTML = `
                <a href="sala-de-aula.html" class="btn-acao-custom btn-primario">Acessar Módulo 1</a>
                <button type="button" class="btn-acao-custom btn-comprar btn-abrir-checkout-direto">Assinar Curso Completo</button>
            `;
            if (containerMatriculados) {
                containerMatriculados.innerHTML += criarCardExpandivelHTML(titulo, desc, imagem, tagHTML, progressoHTML, acoesHTML, filtroImg, true);
            }
        }
    }

    function criarCardExpandivelHTML(titulo, descricao, imagem, tagHTML, progressoHTML, acoesHTML, filtroImg, mostrarPreco) {
        const rodapePreco = mostrarPreco ? `
            <div class="curso-compra">
                <p><span>A partir de</span><strong>R$ 39,90/mês</strong></p>
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