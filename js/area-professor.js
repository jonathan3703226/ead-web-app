/* ==========================================================================
   LÓGICA E INTERATIVIDADE DO PAINEL DO PROFESSOR (NANKIM ART SCHOOL)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // 1. AUTENTICAÇÃO E VERIFICAÇÃO DE PERFIL
    const sessaoData = sessionStorage.getItem('nankim_sessao');
    if (!sessaoData) {
        window.location.href = 'index.html';
        return;
    }

    const usuarioSessao = JSON.parse(sessaoData);
    
    // Trava de segurança: Se não for perfil 'professor', redireciona para área do aluno
    if (usuarioSessao.tipo !== 'professor') {
        window.location.href = 'area-aluno.html';
        return;
    }

    // Preencher informações do professor na interface
    const primeiroNome = usuarioSessao.nome ? usuarioSessao.nome.split(' ')[0] : 'Professor';
    
    const elemTitulo = document.getElementById('titulo-boas-vindas');
    const elemNomeTopo = document.getElementById('nome-prof-topo');
    const elemAvatarSigla = document.getElementById('avatar-prof-sigla');

    if (elemTitulo) elemTitulo.textContent = `Olá, ${usuarioSessao.nome}!`;
    if (elemNomeTopo) elemNomeTopo.textContent = primeiroNome;
    if (elemAvatarSigla) elemAvatarSigla.textContent = primeiroNome.charAt(0).toUpperCase();

    // 2. DROPDOWN MENU DO PROFESSOR
    const btnMenu = document.getElementById('btn-menu-prof');
    const dropdown = document.getElementById('dropdown-prof');

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

    // Logout do Professor
    const btnSair = document.getElementById('btn-sair-prof');
    if (btnSair) {
        btnSair.addEventListener('click', () => {
            sessionStorage.removeItem('nankim_sessao');
            window.location.href = 'index.html';
        });
    }

    // 3. BASE DE DADOS SIMULADA DE CURSOS DO PROFESSOR
    let cursosProf = [
        { id: 1, titulo: 'Fundamentos do Desenho', status: 'ativo', alunos: 840, modulos: 3 },
        { id: 2, titulo: 'Anatomia Humana', status: 'rascunho', alunos: 0, modulos: 2 },
        { id: 3, titulo: 'Ilustração Digital', status: 'rascunho', alunos: 0, modulos: 1 }
    ];

    function renderizarTabelaCursos() {
        const tbody = document.getElementById('lista-cursos-tabela');
        if (!tbody) return;

        tbody.innerHTML = cursosProf.map(c => `
            <tr>
                <td><strong>${c.titulo}</strong></td>
                <td>
                    <span class="status-badge ${c.status === 'ativo' ? 'status-ativo' : 'status-rascunho'}">
                        ${c.status === 'ativo' ? 'Publicado' : 'Rascunho'}
                    </span>
                </td>
                <td>${c.alunos} alunos</td>
                <td>${c.modulos} Módulos</td>
                <td>
                    <button class="btn-acao-tb" onclick="editarCurso('${c.titulo}')">Editar</button>
                    <button class="btn-acao-tb" onclick="acessarModulosCurso('${c.titulo}')">Aulas</button>
                </td>
            </tr>
        `).join('');

        const elemStatCursos = document.getElementById('stat-cursos');
        if (elemStatCursos) {
            elemStatCursos.textContent = cursosProf.filter(c => c.status === 'ativo').length;
        }
    }

    // Funções globais chamadas pelos botões inline da tabela
    window.editarCurso = function(titulo) {
        alert(`Editar configurações do curso: ${titulo}`);
    };

    window.acessarModulosCurso = function(titulo) {
        alert(`Acessando gerenciador de módulos de: ${titulo}`);
    };

    renderizarTabelaCursos();

    // 4. BASE DE DADOS SIMULADA DE DÚVIDAS DOS ALUNOS
    let duvidasAlunos = [
        { id: 101, aluno: 'Alberto Nunes', curso: 'Fundamentos do Desenho - Aula 1', texto: 'Professor, estou sentindo dificuldade para fazer círculos perfeitos sem usar o pulso. Alguma dica prática?' },
        { id: 102, aluno: 'Mariana Costa', curso: 'Fundamentos do Desenho - Aula 3', texto: 'Como posso saber se estou esticando o braço no ângulo correto para fazer a medição?' }
    ];

    function renderizarDuvidas() {
        const container = document.getElementById('container-duvidas');
        if (!container) return;

        if (duvidasAlunos.length === 0) {
            container.innerHTML = '<p class="texto-sem-duvidas">Nenhuma dúvida pendente no momento!</p>';
            return;
        }

        container.innerHTML = duvidasAlunos.map(d => `
            <div class="item-duvida" id="duvida-${d.id}">
                <div class="duvida-topo">
                    <span class="duvida-aluno">👤 ${d.aluno}</span>
                    <span class="duvida-curso">${d.curso}</span>
                </div>
                <p class="duvida-texto">${d.texto}</p>
                <form class="form-resposta" onsubmit="responderDuvida(event, ${d.id})">
                    <input type="text" placeholder="Escreva a resposta para o aluno..." required>
                    <button type="submit">Responder</button>
                </form>
            </div>
        `).join('');
    }

    window.responderDuvida = function(e, id) {
        e.preventDefault();
        alert('Resposta enviada com sucesso para o aluno!');
        duvidasAlunos = duvidasAlunos.filter(d => d.id !== id);
        renderizarDuvidas();
    };

    renderizarDuvidas();

    // 5. GERENCIAMENTO DO MODAL DE CRIAR CURSO
    const modal = document.getElementById('modal-curso');
    const btnAbrirModal = document.getElementById('btn-abrir-modal-curso');
    const btnFecharModal = document.getElementById('btn-fechar-modal');
    const formCriarCurso = document.getElementById('form-criar-curso');

    if (btnAbrirModal && modal) {
        btnAbrirModal.addEventListener('click', () => {
            modal.style.display = 'flex';
        });
    }

    if (btnFecharModal && modal) {
        btnFecharModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    if (formCriarCurso) {
        formCriarCurso.addEventListener('submit', (e) => {
            e.preventDefault();
            const tituloInput = document.getElementById('curso-titulo');
            if (!tituloInput) return;

            const titulo = tituloInput.value;
            cursosProf.push({
                id: Date.now(),
                titulo: titulo,
                status: 'ativo',
                alunos: 0,
                modulos: 1
            });

            renderizarTabelaCursos();
            if (modal) modal.style.display = 'none';
            formCriarCurso.reset();
            alert('Novo curso criado e publicado com sucesso!');
        });
    }
});