/* ==========================================================================
   INTERATIVIDADES ESPECÍFICAS DA HOME PAGE (NANKIM ESCOLA DE ARTE)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {

    // 1. Conexão do Botão de Degustação ao Modal de Cadastro
    const btnDegustacao = document.querySelector('.btn-degustacao-cta');
    if (btnDegustacao) {
        btnDegustacao.addEventListener('click', (e) => {
            e.preventDefault();
            const modalCadastro = document.getElementById('modal-cadastro');
            if (modalCadastro) {
                modalCadastro.style.display = 'flex';
            }
        });
    }

    // 2. Autoplay Muted no Vídeo do Header
    const videoShowreel = document.getElementById('video-showreel-header');
    if (videoShowreel) {
        videoShowreel.muted = true;
        videoShowreel.play().catch((erro) => {
            console.log("Autoplay bloqueado pelo navegador:", erro);
        });
    }

    // 3. Efeito de Digitação (Typewriter Effect)
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

    // 4. Play nos Vídeos dos Cards ao passar o Mouse (Hover)
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

    // 5. Animação de Scroll (IntersectionObserver)
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

    // 6. Carrossel Automático da Seção Missão e Didática
    const listaFotosMissao = [
        './assets/img/ensino1.jpeg',
        './assets/img/ensino2.jpeg',
        './assets/img/ensino3.jpeg',
        './assets/img/ensino4.jpeg',
        './assets/img/ensino5.jpeg',
        './assets/img/ensino6.jpeg'
    ];

    const fotoPrincipal = document.getElementById('foto-missao-principal');
    const botoesThumbs = document.querySelectorAll('.thumb-item');
    let indexFotoAtual = 0;
    let timerAutoplayMissao;

    function trocarFotoMissao(novoIndex) {
        if (!fotoPrincipal || novoIndex === indexFotoAtual) return;
        indexFotoAtual = novoIndex;

        fotoPrincipal.style.opacity = '0.3';
        setTimeout(() => {
            fotoPrincipal.src = listaFotosMissao[indexFotoAtual];
            fotoPrincipal.style.opacity = '1';
        }, 200);

        botoesThumbs.forEach((btn, idx) => {
            if (idx === indexFotoAtual) {
                btn.classList.add('ativo');
            } else {
                btn.classList.remove('ativo');
            }
        });
    }

    function iniciarAutoplayMissao() {
        timerAutoplayMissao = setInterval(() => {
            let proximoIndex = (indexFotoAtual + 1) % listaFotosMissao.length;
            trocarFotoMissao(proximoIndex);
        }, 4500);
    }

    botoesThumbs.forEach((thumb) => {
        thumb.addEventListener('click', (e) => {
            clearInterval(timerAutoplayMissao);
            const indexClicado = parseInt(e.currentTarget.getAttribute('data-index'));
            trocarFotoMissao(indexClicado);
            iniciarAutoplayMissao();
        });
    });

    if (fotoPrincipal) {
        iniciarAutoplayMissao();
    }

    // 7. Accordion Interativo (FAQ)
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const perguntaBtn = item.querySelector('.faq-pergunta');
        perguntaBtn.addEventListener('click', () => {
            const isAtivo = item.classList.contains('ativo');
            
            faqItems.forEach(i => {
                i.classList.remove('ativo');
                i.querySelector('.faq-resposta').style.maxHeight = null;
            });

            if (!isAtivo) {
                item.classList.add('ativo');
                const resposta = item.querySelector('.faq-resposta');
                resposta.style.maxHeight = resposta.scrollHeight + "px";
            }
        });
    });
});