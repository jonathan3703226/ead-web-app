// 1. Definição dos Componentes Globais
const headerComponent = `
    <header>
        <div class="logo">Nankim Escola de Arte</div>
        <nav>
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="quem-somos.html">Quem Somos</a></li>
                <li><a href="cursos.html">Cursos</a></li>
                <li><a href="contato.html">Contato</a></li>
                <li><button data-modal="login">Login</button></li>
            </ul>
        </nav>
    </header>
`;

const footerComponent = `
    <footer>
        <p>&copy; 2026 Nankim Escola de Arte. Todos os direitos reservados.</p>
        <button data-modal="termos">Termos e Políticas de Privacidade</button>
    </footer>
`;

// 2. Função de Injeção no DOM
function renderizarComponentes() {
    document.getElementById('header-container').innerHTML = headerComponent;
    document.getElementById('footer-container').innerHTML = footerComponent;
    
    // Inicializa os eventos de modal SOMENTE após injetar o menu e rodapé
    inicializarModais();
}

// 3. Lógica de Controle dos Modais
function inicializarModais() {
    const botoesAbrir = document.querySelectorAll('[data-modal]');
    const botoesFechar = document.querySelectorAll('[data-close]');

    // Abrir modal
    botoesAbrir.forEach(botao => {
        botao.addEventListener('click', (e) => {
            e.preventDefault(); // Evita recarregamento se for link
            const modalId = botao.getAttribute('data-modal');
            document.getElementById(`modal-${modalId}`).style.display = 'flex';
        });
    });

    // Fechar modal pelo botão "X"
    botoesFechar.forEach(botao => {
        botao.addEventListener('click', () => {
            const modalId = botao.getAttribute('data-close');
            document.getElementById(`modal-${modalId}`).style.display = 'none';
        });
    });

    // Fechar modal clicando fora do conteúdo (no overlay escuro)
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
}

// Executa a injeção ao carregar a página
document.addEventListener('DOMContentLoaded', renderizarComponentes);