// 1. Guardamos o HTML do cabeçalho em uma variável
const htmlDoCabecalho = `
    <div class="logo">
        <h1>Nankim</h1>
    </div>
    <nav class="menu-navegacao">
        <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="quem-somos.html">Quem Somos</a></li>
            <li><a href="cursos.html">Cursos</a></li>
            <li><a href="contato.html">Contato</a></li>
        </ul>
    </nav>
    <div class="acoes-usuario">
        <a href="area-aluno.html" class="btn-login">Área do Aluno</a>
    </div>
`;

// 2. Guardamos o HTML do rodapé em outra variável
const htmlDoRodape = `
    <p>&copy; 2026 Nankim Escola de Arte. Projeto Acadêmico.</p>
    <a href="termos.html">Termos de Uso e Privacidade</a>
`;

// 3. Quando a página carregar, procuramos as caixas e injetamos o conteúdo
document.addEventListener("DOMContentLoaded", function() {
    
    // Procura o <header id="menu-global"> e injeta o HTML
    const menuContainer = document.getElementById("menu-global");
    if (menuContainer) {
        menuContainer.innerHTML = htmlDoCabecalho;
    }

    // Procura o <footer id="rodape-global"> e injeta o HTML
    const rodapeContainer = document.getElementById("rodape-global");
    if (rodapeContainer) {
        rodapeContainer.innerHTML = htmlDoRodape;
    }
});