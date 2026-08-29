// ================= GERENCIAMENTO GLOBAL DE MODAIS =================

// 1. Lida apenas com os botões de ABRIR e FECHAR (no clique normal)
document.addEventListener('click', (e) => {
    // Abrir Modal
    const btnAbrir = e.target.closest('[data-modal]');
    if (btnAbrir) {
        e.preventDefault();
        const modalId = btnAbrir.getAttribute('data-modal');
        const modal = document.getElementById(`modal-${modalId}`);
        if (modal) modal.style.display = 'flex';
    }

    // Fechar Modal (botão X)
    const btnFechar = e.target.closest('[data-close]');
    if (btnFechar) {
        const modalId = btnFechar.getAttribute('data-close');
        const modal = document.getElementById(`modal-${modalId}`);
        if (modal) modal.style.display = 'none';
    }
});

// 2. Lida com o clique no fundo escuro de forma isolada
document.addEventListener('mousedown', (e) => {
    // Só fecha se o usuário *começar* o clique exatamente no fundo escuro
    // Isso impede que selecionar texto e soltar o mouse fora feche a tela sem querer
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
    }
});
// ================= INJEÇÃO DE MENU E RODAPÉ =================
// Se você já tinha um código específico de menu e rodapé, pode colá-lo aqui dentro.
function injetarMenuERodape() {
    const header = document.getElementById('header-container');
    const footer = document.getElementById('footer-container');

    if (header) {
        header.innerHTML = `
            <header class="menu-global">
                <div class="logo">NANKIM ESCOLA DE ARTE</div>

                <button class="btn-mobile" aria-label="Abrir menu" type="button">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <nav>
                    <a href="index.html">Home</a>
                    <a href="#">Quem Somos</a>
                    <a href="cursos.html">Cursos</a>
                    <a href="#">Contato</a>
                    <button data-modal="login" class="btn-login">Login</button>
                </nav>
            </header>
        `;
    }

    if (footer) {
        footer.innerHTML = `
            <footer class="rodape-global">
                <p>&copy; 2026 Nankim Escola de Arte. Todos os direitos reservados.</p>
                <a href="#" data-modal="termos">Termos e Políticas de Privacidade</a>
            </footer>
        `;
    }
}

document.addEventListener('DOMContentLoaded', injetarMenuERodape);