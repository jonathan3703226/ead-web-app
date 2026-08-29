document.addEventListener('DOMContentLoaded', () => {
  const sessionKey = 'nankim_sessao';
  const sessionData = sessionStorage.getItem(sessionKey);

  if (!sessionData) {
    window.location.replace('index.html');
    return;
  }

  try {
    const usuario = JSON.parse(sessionData);
    const nomeAluno = document.getElementById('nome-aluno');

    if (nomeAluno && usuario && usuario.nome) {
      nomeAluno.textContent = usuario.nome;
    }
  } catch (error) {
    console.error('Erro ao ler sessão:', error);
    window.location.replace('index.html');
  }
});
