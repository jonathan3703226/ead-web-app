/* ==========================================================================
   CURSOS.JS - Nankim Escola de Arte
   Acordeão de módulos, FAQ, reveal, degustação e seletor de planos ancorados
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    iniciarAcordeaoModulos();
    iniciarAcordeaoFaqCursos();
    iniciarRevelacaoScrollCursos();
    iniciarBotaoDegustacaoCursos();
    iniciarSeletorPlanosCursos();
});

function iniciarAcordeaoModulos() {
    const botoes = document.querySelectorAll('.btn-modulo-header');
    botoes.forEach((botao) => {
        botao.addEventListener('click', () => {
            const item = botao.closest('.item-modulo');
            if (!item) return;

            const estavaAberto = item.classList.contains('aberto');
            item.classList.toggle('aberto', !estavaAberto);
            botao.setAttribute('aria-expanded', String(!estavaAberto));
        });
    });
}

function iniciarAcordeaoFaqCursos() {
    const botoesFaq = document.querySelectorAll('.btn-faq-curso');
    botoesFaq.forEach((botao) => {
        botao.addEventListener('click', () => {
            const item = botao.closest('.item-faq-curso');
            if (!item) return;

            const estavaAberto = item.classList.contains('aberto');

            document.querySelectorAll('.item-faq-curso.aberto').forEach((aberto) => {
                aberto.classList.remove('aberto');
                const btn = aberto.querySelector('.btn-faq-curso');
                if (btn) btn.setAttribute('aria-expanded', 'false');
            });

            if (!estavaAberto) {
                item.classList.add('aberto');
                botao.setAttribute('aria-expanded', 'true');
            }
        });
    });
}

function iniciarRevelacaoScrollCursos() {
    const elementos = document.querySelectorAll('.revelar-scroll');
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

function iniciarBotaoDegustacaoCursos() {
    const btnTestarGratis = document.getElementById('btn-testar-gratis-curso');
    if (btnTestarGratis) {
        btnTestarGratis.addEventListener('click', (e) => {
            e.preventDefault();
            const modalCadastro = document.getElementById('modal-cadastro');
            if (modalCadastro) {
                modalCadastro.style.display = 'flex';
            }
        });
    }
}

function iniciarSeletorPlanosCursos() {
    const opcoes = document.querySelectorAll('.opcao-plano-card');
    const btnMatricular = document.getElementById('btn-matricular-plano');
    if (!opcoes.length || !btnMatricular) return;

    const textosBotao = {
        mensal: 'Assinar Plano Mensal (R$ 89,90)',
        semestral: 'Assinar Plano Semestral (6x R$ 58,31)',
        anual: 'Assinar Plano Anual (12x R$ 39,90)'
    };

    opcoes.forEach((opcao) => {
        opcao.addEventListener('click', () => {
            opcoes.forEach((o) => o.classList.remove('selecionado'));
            opcao.classList.add('selecionado');

            const plano = opcao.getAttribute('data-plano') || 'anual';
            btnMatricular.setAttribute('data-plano', plano);
            btnMatricular.textContent = textosBotao[plano] || textosBotao.anual;
        });
    });
}