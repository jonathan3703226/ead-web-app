document.addEventListener('DOMContentLoaded', () => {
    const emailDestino = 'nankimartschool@gmail.com';
    const form = document.getElementById('form-contato');
    const feedback = document.getElementById('contato-feedback');
    if (!form || !feedback) return;

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (!form.reportValidity()) return;

        const nome = document.getElementById('contato-nome').value.trim();
        const email = document.getElementById('contato-email').value.trim();
        const mensagem = document.getElementById('contato-mensagem').value.trim();
        const assunto = encodeURIComponent(`Contato pelo site - ${nome}`);
        const corpo = encodeURIComponent(`Nome: ${nome}\nE-mail: ${email}\n\n${mensagem}`);
        window.location.href = `mailto:${emailDestino}?subject=${assunto}&body=${corpo}`;
        feedback.textContent = `Seu aplicativo de e-mail foi solicitado para ${emailDestino}.`;
    });
});
