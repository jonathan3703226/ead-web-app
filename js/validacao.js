// 1. Inicializa um "Banco de Dados" em JSON no navegador
function inicializarBancoDados() {
    const dbExistente = localStorage.getItem('nankim_db');
    
    // Se não existir, cria um usuário padrão para testes
    if (!dbExistente) {
        const mockUsers = [
            { id: 1, nome: "Estudante de Arte", email: "aluno@nankim.com", senha: "senha123" }
        ];
        // Converte o array/objeto para string JSON e salva
        localStorage.setItem('nankim_db', JSON.stringify(mockUsers));
    }
}

// 2. Lógica de Autenticação Realista
function configurarLogin() {
    const formLogin = document.getElementById('form-login');

    if (formLogin) {
        formLogin.addEventListener('submit', (e) => {
            e.preventDefault();

            const emailInput = formLogin.querySelector('input[type="email"]').value;
            const senhaInput = formLogin.querySelector('input[type="password"]').value;
            const btnSubmit = formLogin.querySelector('button[type="submit"]');

            // Recupera e converte o JSON do banco falso de volta para Array do JS
            const usuariosString = localStorage.getItem('nankim_db');
            const usuarios = JSON.parse(usuariosString);

            // Busca se existe um usuário com o email e senha exatos
            const usuarioEncontrado = usuarios.find(
                user => user.email === emailInput && user.senha === senhaInput
            );

            if (usuarioEncontrado) {
                // Sucesso: Cria uma "Sessão" em JSON
                const sessao = {
                    logado: true,
                    nome: usuarioEncontrado.nome,
                    email: usuarioEncontrado.email,
                    horario: new Date().toISOString()
                };
                sessionStorage.setItem('nankim_sessao', JSON.stringify(sessao));

                // Feedback visual de sucesso
                btnSubmit.textContent = 'Acesso Liberado!';
                btnSubmit.style.backgroundColor = '#27ae60';
                
                // Redireciona
                setTimeout(() => {
                    window.location.href = 'area-aluno.html';
                }, 1000);

            } else {
                // Erro: Credenciais inválidas
                alert('E-mail ou senha incorretos. Tente novamente.');
                formLogin.reset();
            }
        });
    }
}

// Executa as funções quando a página carrega
document.addEventListener('DOMContentLoaded', () => {
    inicializarBancoDados();
    
    // Pequeno delay para garantir que o modal injetado via JS já exista no DOM
    setTimeout(configurarLogin, 100);
});