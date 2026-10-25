(() => {
  const root = document.documentElement;
  root.dataset.alunoAcesso = 'negado';

  try {
    const sessionData = sessionStorage.getItem('nankim_sessao');
    if (!sessionData) return;

    const sessao = JSON.parse(sessionData);
    const usuarios = JSON.parse(localStorage.getItem('nankim_db') || '[]');
    if (!Array.isArray(usuarios)) {
      throw new TypeError('O cadastro local precisa ser uma lista.');
    }

    const usuario = usuarios.find((conta) =>
      conta.email.toLowerCase() === String(sessao.email || '').toLowerCase()
    );
    if (usuario && sessao.logado === true) {
      root.dataset.alunoAcesso = 'liberado';
    } else {
      sessionStorage.removeItem('nankim_sessao');
    }
  } catch (error) {
    console.error('Não foi possível validar o acesso à Área do Aluno:', error);
    sessionStorage.removeItem('nankim_sessao');
  }
})();
