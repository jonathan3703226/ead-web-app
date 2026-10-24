document.addEventListener("DOMContentLoaded", () => {

    // 1. Força Autoplay Muted no Vídeo do Header
    const videoShowreel = document.getElementById('video-showreel-header');
    if (videoShowreel) {
        videoShowreel.muted = true;
        videoShowreel.play().catch((erro) => {
            console.log("Autoplay bloqueado pelo navegador:", erro);
        });
    }

    // 2. Efeito de Digitação da Pergunta (Typewriter Effect)
    const elementoTexto = document.getElementById("texto-digitado");
    if (elementoTexto) {
        const textoCompleto = "Quantas vezes você já guardou o seu sonho na gaveta?";
        let index = 0;
        let apagando = false;
        const velocidadeDigitacao = 35;
        const velocidadeApagar = 20;
        const pausaAposEscrever = 4000;

        function efeitoDigitacaoLoop() {
            if (!apagando && index < textoCompleto.length) {
                elementoTexto.textContent += textoCompleto.charAt(index);
                index++;
                setTimeout(efeitoDigitacaoLoop, velocidadeDigitacao);
            } else if (!apagando && index === textoCompleto.length) {
                setTimeout(() => {
                    apagando = true;
                    efeitoDigitacaoLoop();
                }, pausaAposEscrever);
            } else if (apagando && index > 0) {
                elementoTexto.textContent = textoCompleto.substring(0, index - 1);
                index--;
                setTimeout(efeitoDigitacaoLoop, velocidadeApagar);
            } else if (apagando && index === 0) {
                apagando = false;
                setTimeout(efeitoDigitacaoLoop, 500);
            }
        }
        efeitoDigitacaoLoop();
    }

    // 3. Reprodução dos Vídeos dos Cards de Cursos Apenas no Hover
    const cardsComVideo = document.querySelectorAll('.card-com-video');

    cardsComVideo.forEach(card => {
        const video = card.querySelector('.video-bg-card');
        if (!video) return;

        card.addEventListener('mouseenter', () => {
            const playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise.catch(err => {
                    console.log("Aguardando interação do usuário:", err);
                });
            }
        });

        card.addEventListener('mouseleave', () => {
            video.pause();
        });
    });

    // 4. Carregamento Suave ao Descer a Página (Scroll Reveal Unificado)
    const elementosParaAnimar = document.querySelectorAll('.revelar-scroll');

    const observerScroll = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visivel');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px"
    });

    elementosParaAnimar.forEach(el => observerScroll.observe(el));

});