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
    

    // Garantir que cabeçalho e cards tenham a classe de animação
    const elementosParaAnimar = document.querySelectorAll(
        '.secao-vitrine-cursos .cabecalho-vitrine, .secao-vitrine-cursos .card-curso, .revelar-scroll'
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


// 5. Carrossel Automático e Interativo da Seção Missão
    const listaFotosMissao = [
        './assets/img/ensino/ensino1.jpeg',
        './assets/img/ensino/ensino2.jpeg',
        './assets/img/ensino/ensino3.jpeg',
        './assets/img/ensino/ensino4.jpeg',
        './assets/img/ensino/ensino5.jpeg',
        './assets/img/ensino/ensino6.jpeg'
    ];

    const fotoPrincipal = document.getElementById('foto-missao-principal');
    const botoesThumbs = document.querySelectorAll('.thumb-item');
    let indexFotoAtual = 0;
    let timerAutoplayMissao;

    function trocarFotoMissao(novoIndex) {
        if (!fotoPrincipal || novoIndex === indexFotoAtual) return;
        
        indexFotoAtual = novoIndex;

        // Suave transição de opacidade
        fotoPrincipal.style.opacity = '0.3';
        
        setTimeout(() => {
            fotoPrincipal.src = listaFotosMissao[indexFotoAtual];
            fotoPrincipal.style.opacity = '1';
        }, 200);

        // Atualiza a thumb ativa
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
        }, 4500); // Troca a foto a cada 4.5 segundos
    }

    // Clique manual nas miniaturas
    botoesThumbs.forEach((thumb) => {
        thumb.addEventListener('click', (e) => {
            clearInterval(timerAutoplayMissao);
            const indexClicado = parseInt(e.currentTarget.getAttribute('data-index'));
            trocarFotoMissao(indexClicado);
            iniciarAutoplayMissao(); // Reinicia o temporizador
        });
    });

    if (fotoPrincipal) {
        iniciarAutoplayMissao();
    }

    // 6. Lógica do Accordion (FAQ)
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const perguntaBtn = item.querySelector('.faq-pergunta');
        
        perguntaBtn.addEventListener('click', () => {
            const isAtivo = item.classList.contains('ativo');
            
            // Fechar todas as outras respostas abertas antes de abrir a nova
            faqItems.forEach(i => {
                i.classList.remove('ativo');
                i.querySelector('.faq-resposta').style.maxHeight = null;
            });

            // Se o item clicado não estava ativo, abre ele
            if (!isAtivo) {
                item.classList.add('ativo');
                const resposta = item.querySelector('.faq-resposta');
                // Usa o scrollHeight para saber o tamanho real do conteúdo e animar
                resposta.style.maxHeight = resposta.scrollHeight + "px";
            }
        });
    });