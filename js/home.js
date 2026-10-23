document.addEventListener("DOMContentLoaded", () => {

    // 1. Força o Autoplay em Loop Automático do Vídeo
    const videoShowreel = document.getElementById('video-showreel');
    if (videoShowreel) {
        videoShowreel.muted = true; // Necessário para garantir que navegadores permitam o autoplay
        videoShowreel.play().catch((erro) => {
            console.log("Tentativa de autoplay no vídeo:", erro);
        });
    }

    // 2. Animação de Palavras/Textos Surgindo no Scroll (Word Reveal)
    const elementosRevelacao = document.querySelectorAll('.titulo-revelacao, .texto-revelacao');

    const observerRevelacao = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.2 });

    elementosRevelacao.forEach((el) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(35px)';
        el.style.transition = 'opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1), transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)';
        observerRevelacao.observe(el);
    });

});

document.addEventListener("DOMContentLoaded", () => {

    // 1. Efeito de Digitação na Pergunta
    const elementoTexto = document.getElementById("texto-digitado");
    if (elementoTexto) {
        const textoCompleto = "Quantas vezes você já guardou o seu sonho na gaveta?";
        let index = 0;
        let apagando = false;
        const velocidadeDigitacao = 35; 
        const velocidadeApagar = 20;    
        const pausaAposEscribir = 4000; 

        function efeitoDigitacaoLoop() {
            if (!apagando && index < textoCompleto.length) {
                elementoTexto.textContent += textoCompleto.charAt(index);
                index++;
                setTimeout(efeitoDigitacaoLoop, velocidadeDigitacao);
            } else if (!apagando && index === textoCompleto.length) {
                setTimeout(() => {
                    apagando = true;
                    efeitoDigitacaoLoop();
                }, pausaAposEscribir);
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

    // 2. Tocar Vídeo dos Cards APENAS no Hover do Mouse
    const cardsComVideo = document.querySelectorAll('.card-com-video');

    cardsComVideo.forEach(card => {
        const video = card.querySelector('.video-bg-card');
        if (!video) return;

        // Toca o vídeo suavemente ao entrar
        card.addEventListener('mouseenter', () => {
            const playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise.catch(err => {
                    console.log("Aguardando interação para reproduzir:", err);
                });
            }
        });

        // Pausa o vídeo ao sair com o mouse
        card.addEventListener('mouseleave', () => {
            video.pause();
        });
    });

    // 3. Efeito de Revelação Lenta ao Rolar a Página (Scroll Reveal)
    const elementosParaAnimar = document.querySelectorAll(
        '.cabecalho-vitrine, .card-curso, .cabecalho-degustacao, .coluna-mockup-degustacao, .coluna-beneficios-degustacao'
    );

    elementosParaAnimar.forEach(el => el.classList.add('revelar-scroll'));

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

// Efeito de Revelação ao Rolar a Página (Scroll Reveal)
    const elementosParaAnimar = document.querySelectorAll(
        '.cabecalho-vitrine, .card-curso, .cabecalho-degustacao, .coluna-mockup-degustacao, .coluna-beneficios-degustacao'
    );

    elementosParaAnimar.forEach(el => el.classList.add('revelar-scroll'));

    const observerScroll = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visivel');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px"
    });

    elementosParaAnimar.forEach(el => observerScroll.observe(el));