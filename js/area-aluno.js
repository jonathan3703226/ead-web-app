document.addEventListener('DOMContentLoaded', () => {
    if (document.documentElement.dataset.alunoAcesso !== 'liberado') return;
    document.querySelector('.painel-aluno').removeAttribute('inert');

    const sessao = JSON.parse(sessionStorage.getItem('nankim_sessao') || '{}');
    const usuarios = JSON.parse(localStorage.getItem('nankim_db') || '[]');
    const indiceUsuario = usuarios.findIndex((usuario) =>
        usuario.email.toLowerCase() === String(sessao.email || '').toLowerCase()
    );
    if (indiceUsuario < 0) {
        console.error('A conta da sessão não foi localizada no cadastro local.');
        window.location.replace('index.html');
        return;
    }

    const usuario = usuarios[indiceUsuario];
    document.getElementById('nome-aluno').textContent = usuario.nome;

    const cursos = usuario.matriculado === true && Array.isArray(usuario.cursos) ? usuario.cursos : [];
    const listaCursos = document.getElementById('lista-meus-cursos');
    const semCursos = document.getElementById('sem-cursos');
    const painelCurso = document.querySelector('.curso-ativo');
    if (!cursos.length) {
        semCursos.hidden = false;
        painelCurso.hidden = true;
        return;
    }
    semCursos.hidden = true;
    painelCurso.hidden = false;

    const aulas = [
        'A base de tudo',
        'Desconstruindo objetos',
        'Perspectiva',
        'Teoria da Luz e Sombra',
        'Renderização e Texturas',
        'Projeto Final'
    ];
    let indiceCursoAtual = 0;
    let curso = cursos[indiceCursoAtual];
    let concluidas = new Set(Array.isArray(curso.aulasConcluidas) ? curso.aulasConcluidas : []);
    let aulaAtual = 0;

    const listaAulas = document.getElementById('lista-aulas');
    const aulaAtualNome = document.getElementById('nome-aula-atual');
    function salvarUsuario() {
        usuario.cursos = cursos;
        usuarios[indiceUsuario] = usuario;
        localStorage.setItem('nankim_db', JSON.stringify(usuarios));
    }

    function desenharCursos() {
        listaCursos.replaceChildren();
        cursos.forEach((itemCurso, indice) => {
            const article = document.createElement('article');
            article.className = 'cartao-curso';
            article.classList.toggle('curso-selecionado', indice === indiceCursoAtual);

            const capa = document.createElement('div');
            capa.className = 'curso-capa';
            capa.setAttribute('aria-hidden', 'true');
            capa.textContent = '✦';

            const resumo = document.createElement('div');
            resumo.className = 'curso-resumo';
            const etiqueta = document.createElement('p');
            etiqueta.className = 'painel-etiqueta';
            etiqueta.textContent = 'Curso matriculado';
            const titulo = document.createElement('h3');
            titulo.textContent = itemCurso.nome || 'Curso Nankim';
            const descricao = document.createElement('p');
            descricao.textContent = 'Uma trilha progressiva para desenvolver sua prática artística.';

            const progressoCurso = document.createElement('div');
            progressoCurso.className = 'progresso-curso';
            const legenda = document.createElement('div');
            legenda.className = 'progresso-legenda';
            const textoLegenda = document.createElement('span');
            textoLegenda.textContent = 'Seu progresso';
            const progressoTexto = document.createElement('strong');
            progressoTexto.className = 'texto-progresso-curso';
            const progressBar = document.createElement('div');
            progressBar.className = 'barra-fundo';
            progressBar.setAttribute('role', 'progressbar');
            progressBar.setAttribute('aria-label', `Progresso em ${itemCurso.nome || 'curso'}`);
            progressBar.setAttribute('aria-valuemin', '0');
            progressBar.setAttribute('aria-valuemax', '100');
            const progressFill = document.createElement('div');
            progressFill.className = 'barra-preenchimento';
            progressBar.append(progressFill);
            legenda.append(textoLegenda, progressoTexto);
            progressoCurso.append(legenda, progressBar);

            const continuar = document.createElement('a');
            continuar.className = 'botao-continuar';
            continuar.href = '#aula-atual';
            continuar.textContent = 'Continuar de onde parei';
            continuar.addEventListener('click', () => {
                selecionarCurso(indice);
            });

            resumo.append(etiqueta, titulo, descricao, progressoCurso, continuar);
            article.append(capa, resumo);
            listaCursos.append(article);

            const concluidasCurso = new Set(Array.isArray(itemCurso.aulasConcluidas) ? itemCurso.aulasConcluidas : []);
            const progresso = Math.round((concluidasCurso.size / aulas.length) * 100);
            progressoTexto.textContent = `${progresso}% concluído`;
            progressFill.style.width = `${progresso}%`;
            progressBar.setAttribute('aria-valuenow', String(progresso));
        });
    }

    function atualizarProgresso() {
        const progresso = Math.round((concluidas.size / aulas.length) * 100);
        curso.aulasConcluidas = [...concluidas];
        curso.progresso = progresso;
        salvarUsuario();
        desenharCursos();
    }

    function selecionarAula(indice) {
        aulaAtual = indice;
        curso.ultimaAula = indice;
        aulaAtualNome.textContent = `Módulo ${indice + 1}: ${aulas[indice]}`;
        listaAulas.querySelectorAll('button').forEach((botao, index) => {
            botao.classList.toggle('aula-atual', index === indice);
            botao.classList.toggle('aula-concluida', concluidas.has(index));
            if (index === indice) botao.setAttribute('aria-current', 'step');
            else botao.removeAttribute('aria-current');
        });
        salvarUsuario();
    }

    function selecionarCurso(indice) {
        indiceCursoAtual = indice;
        curso = cursos[indiceCursoAtual];
        concluidas = new Set(Array.isArray(curso.aulasConcluidas) ? curso.aulasConcluidas : []);
        aulaAtual = Math.min(Math.max(Number(curso.ultimaAula) || 0, 0), aulas.length - 1);
        atualizarProgresso();
        selecionarAula(aulaAtual);
    }

    aulas.forEach((aula, indice) => {
        const item = document.createElement('li');
        const botao = document.createElement('button');
        botao.type = 'button';
        botao.textContent = `Módulo ${indice + 1}: ${aula}`;
        botao.addEventListener('click', () => selecionarAula(indice));
        item.append(botao);
        listaAulas.append(item);
    });

    document.getElementById('marcar-concluida').addEventListener('click', () => {
        concluidas.add(aulaAtual);
        atualizarProgresso();
        selecionarAula(Math.min(aulaAtual + 1, aulas.length - 1));
    });

    selecionarAula(Math.min(Math.max(Number(curso.ultimaAula) || 0, 0), aulas.length - 1));
    atualizarProgresso();
});
