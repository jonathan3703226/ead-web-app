document.addEventListener("DOMContentLoaded", () => {
    // Lógica do Carrossel Hero
    let heroSlideIndex = 0;
    let heroSlideTimer;

    function showHeroSlide(index) {
        const slides = document.querySelectorAll('.hero-carrossel .slide');
        const dots = document.querySelectorAll('.carousel-indicators .dot');
        
        if (!slides.length) return;
        
        slides.forEach(s => s.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));
        
        if (index >= slides.length) heroSlideIndex = 0;
        if (index < 0) heroSlideIndex = slides.length - 1;
        
        slides[heroSlideIndex].classList.add('active');
        dots[heroSlideIndex].classList.add('active');
    }

    function nextHeroSlide() {
        heroSlideIndex++;
        showHeroSlide(heroSlideIndex);
    }

    function startHeroTimer() {
        clearInterval(heroSlideTimer);
        heroSlideTimer = setInterval(nextHeroSlide, 6000); // Roda a cada 6 segundos
    }

    // Exportando funções para os botões do HTML conseguirem chamar
    window.moveHeroSlide = function(n) {
        heroSlideIndex += n;
        showHeroSlide(heroSlideIndex);
        startHeroTimer(); 
    };

    window.currentHeroSlide = function(n) {
        heroSlideIndex = n;
        showHeroSlide(heroSlideIndex);
        startHeroTimer(); 
    };

    // Inicia automaticamente
    if (document.querySelector('.hero-carrossel')) {
        startHeroTimer();
    }
});
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