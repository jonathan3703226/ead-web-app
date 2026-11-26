/* ==========================================================================
   AREA-ALUNO.JS - Lógica do Painel de Estudos (Nankim Escola de Arte)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const sessaoData = sessionStorage.getItem('nankim_sessao');
    if (!sessaoData) {
        window.location.href = 'index.html';
        return;
    }

    const usuarioSessao = JSON.parse(sessaoData);
    const dbUsuarios = JSON.parse(localStorage.getItem('nankim_db')) || [];
    const idxUsuario = dbUsuarios.findIndex(
        (u) => String(u.email || '').toLowerCase() === String(usuarioSessao.email || '').toLowerCase()
    );

    if (idxUsuario === -1) {
        sessionStorage.removeItem('nankim_sessao');
        window.location.href = 'index.html';
        return;
    }

    const usuarioAtual = dbUsuarios[idxUsuario];

    // Garante o Módulo I liberado para qualquer aluno cadastrado
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
        dbUsuarios[idxUsuario] = usuarioAtual;
        localStorage.setItem('nankim_db', JSON.stringify(dbUsuarios));
    }

    // Preenche boas-vindas e métricas
    const primeiroNome = usuarioAtual.nome ? usuarioAtual.nome.split(' ')[0] : 'Artista';
    const textoBoasVindas = document.getElementById('texto-boas-vindas');
    if (textoBoasVindas) {
        textoBoasVindas.textContent = `Olá, ${primeiroNome}!`;
    }

    const totalAulasCurso = 12;
    const concluidasSala = JSON.parse(localStorage.getItem('nankim_aulas_concluidas') || '[]');
    const qtdConcluidas = Array.isArray(concluidasSala) ? concluidasSala.length : 0;
    const percentual = Math.min(Math.round((qtdConcluidas / totalAulasCurso) * 100), 100);

    // Persiste liberação permanente do certificado quando atingir 100%
    if (usuarioAtual.matriculado && percentual >= 100 && usuarioAtual.certificadoLiberado !== true) {
        usuarioAtual.certificadoLiberado = true;
        localStorage.setItem('nankim_certificado_liberado', 'true');
        dbUsuarios[idxUsuario] = usuarioAtual;
        localStorage.setItem('nankim_db', JSON.stringify(dbUsuarios));
    }

    const elContador = document.getElementById('contador-aulas-concluidas');
    const elPlano = document.getElementById('status-plano-aluno');
    if (elContador) elContador.textContent = `${qtdConcluidas}/${totalAulasCurso}`;
    if (elPlano) elPlano.textContent = usuarioAtual.matriculado ? 'Acesso Completo' : 'Módulo I Grátis';

    renderizarCursoAtivo(usuarioAtual, qtdConcluidas, totalAulasCurso, percentual);
    renderizarProximasEtapas();
});

function renderizarCursoAtivo(usuarioAtual, qtdConcluidas, totalAulas, percentual) {
    const container = document.getElementById('container-cursos-matriculados');
    if (!container) return;

    const matriculado = usuarioAtual.matriculado === true;
    const cursoConcluido = matriculado && percentual >= 100;
    const certificadoJaLiberado =
        matriculado &&
        (cursoConcluido ||
            usuarioAtual.certificadoLiberado === true ||
            localStorage.getItem('nankim_certificado_liberado') === 'true');

    const statusBadge = cursoConcluido
        ? `<span class="tag-status-curso ativo">★ Formação Concluída · 100%</span>`
        : certificadoJaLiberado
            ? `<span class="tag-status-curso ativo">★ Certificado Emitido · 100% Concluído</span>`
            : matriculado
                ? `<span class="tag-status-curso ativo">● Curso Completo Liberado</span>`
                : `<span class="tag-status-curso degustacao">✦ Degustação Gratuita · Módulo I Liberado</span>`;

    let botaoAcaoPrincipal = '';
    if (cursoConcluido || certificadoJaLiberado) {
        botaoAcaoPrincipal = `
            <button type="button" class="btn-aluno-primario link-magnetico" id="btn-imprimir-cert-area">
                <i class="fa-solid fa-award" style="margin-right:8px;"></i>Imprimir Certificado
            </button>
            <a href="sala-de-aula.html" class="btn-aluno-secundario link-magnetico">
                <i class="fa-solid fa-play" style="margin-right:8px;"></i>Acessar Aulas
            </a>
        `;
    } else if (matriculado) {
        botaoAcaoPrincipal = `
            <a href="sala-de-aula.html" class="btn-aluno-primario link-magnetico">${qtdConcluidas > 0 ? 'Continuar de onde parei' : 'Iniciar Curso Agora'}</a>
        `;
    } else {
        botaoAcaoPrincipal = `
            <a href="sala-de-aula.html" class="btn-aluno-primario link-magnetico">Acessar Módulo I Grátis</a>
            <button type="button" class="btn-aluno-secundario link-magnetico" id="btn-upgrade-completo">Desbloquear Curso Completo (12 aulas)</button>
        `;
    }

    container.innerHTML = `
        <article class="card-curso-destaque-aluno">
            <div class="capa-curso-aluno">
                <img src="./assets/img/fundamentos-desenho.jpg" alt="Fundamentos do Desenho">
                <span class="badge-etapa-card">ETAPA 1 · FORMAÇÃO BASE</span>
            </div>

            <div class="corpo-curso-destaque-aluno">
                <div>
                    <div class="topo-meta-curso">
                        ${statusBadge}
                        <div class="meta-chips-curso">
                            <span>3 Módulos</span>
                            <span>•</span>
                            <span>12 Aulas Práticas</span>
                            <span>•</span>
                            <span>12h Certificadas</span>
                        </div>
                    </div>

                    <h3>Fundamentos do Desenho</h3>
                    <p>Do controle de traço e figura em ação até a criação de criaturas, perspectiva em 3 pontos de fuga, arte-final em nanquim e montagem de portfólio.</p>
                </div>

                <div class="bloco-progresso-aluno">
                    <div class="info-progresso-topo">
                        <span>Progresso na trilha (${qtdConcluidas} de ${totalAulas} aulas)</span>
                        <strong>${percentual}%</strong>
                    </div>
                    <div class="barra-progresso-trilha">
                        <div class="barra-progresso-fill" style="width: ${percentual}%;"></div>
                    </div>
                </div>

                <div class="rodape-acoes-curso">
                    ${botaoAcaoPrincipal}
                </div>
            </div>
        </article>
    `;

    // Ação: Imprimir Certificado direto da Área do Aluno
    const btnCertArea = document.getElementById('btn-imprimir-cert-area');
    if (btnCertArea) {
        btnCertArea.addEventListener('click', () => {
            window.location.href = 'meu-perfil.html?imprimirCertificado=1';
        });
    }

    const btnUpgrade = document.getElementById('btn-upgrade-completo');
    if (btnUpgrade) {
        btnUpgrade.addEventListener('click', () => {
            if (typeof iniciarCheckoutLogado === 'function') {
                iniciarCheckoutLogado();
            }
        });
    }

    document.querySelectorAll('[data-close="checkout"]').forEach((btn) => {
        btn.addEventListener('click', () => {
            const modal = document.getElementById('modal-checkout');
            if (modal) modal.style.display = 'none';
        });
    });

    if (typeof aplicarEfeitoMagnetico === 'function') {
        aplicarEfeitoMagnetico();
    }
}

function renderizarProximasEtapas() {
    const container = document.getElementById('container-cursos-catalogo');
    if (!container) return;

    const etapasFuturas = [
        {
            etapa: 'ETAPA 2 · EM BREVE',
            nivel: 'Nível Intermediário · Em gravação',
            titulo: 'Anatomia & Movimento',
            descricao: 'Proporções do corpo humano, estrutura e dinamismo para dar vida aos seus personagens — aprofundando a base criada nos Fundamentos.',
            imagem: './assets/img/anatomia-humana.jpg',
            topicos: [
                'Estrutura esquelética e proporções em múltiplos ângulos',
                'Grupos musculares e volume natural sem rigidez',
                'Linha de ação avançada, mãos, pés e poses dinâmicas'
            ]
        },
        {
            etapa: 'ETAPA 3 · EM BREVE',
            nivel: 'Nível Avançado · Em gravação',
            titulo: 'Especialização & Mercado',
            descricao: 'Pintura digital, teoria das cores e acabamento profissional para montar seu portfólio e atuar no mercado criativo.',
            imagem: './assets/img/ilustracao-digital.jpg',
            topicos: [
                'Fluxo digital, camadas, pincéis e transição do papel',
                'Teoria das cores, temperatura de luz e atmosfera',
                'Renderização comercial e posicionamento de portfólio'
            ]
        }
    ];

    container.innerHTML = etapasFuturas.map((curso) => `
        <article class="card-etapa-futura">
            <div class="capa-etapa-futura">
                <img src="${curso.imagem}" alt="${curso.titulo}" loading="lazy">
                <span class="badge-futura-etapa">🔒 ${curso.etapa}</span>
            </div>
            <div class="corpo-etapa-futura">
                <span class="nivel-etapa-futura">${curso.nivel}</span>
                <h3>${curso.titulo}</h3>
                <p>${curso.descricao}</p>
                <ul class="lista-modulos-preview">
                    ${curso.topicos.map((t) => `<li>${t}</li>`).join('')}
                </ul>
                <div class="rodape-etapa-futura">Em produção · Liberação automática no catálogo</div>
            </div>
        </article>
    `).join('');
}