document.addEventListener("DOMContentLoaded", () => {
    const reduzirMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // 1. Efeito de Digitação em Loop Contínuo (igual ao da Home)
    const elementoTexto = document.getElementById("texto-digitado-quem-somos");
    if (elementoTexto) {
        const textoCompleto = "Nascida da paixão pelo desenho, construída para guiar sua evolução.";

        if (reduzirMovimento) {
            elementoTexto.textContent = textoCompleto;
        } else {
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
    }

    // 2. Revelação Suave no Scroll
    const elementosRevelar = document.querySelectorAll(".pagina-quem-somos .revelar-scroll");
    if ("IntersectionObserver" in window && !reduzirMovimento) {
        const observador = new IntersectionObserver((entradas, observer) => {
            entradas.forEach((entrada) => {
                if (entrada.isIntersecting) {
                    entrada.target.classList.add("visivel");
                    observer.unobserve(entrada.target);
                }
            });
        }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });

        elementosRevelar.forEach((elemento) => observador.observe(elemento));
    } else {
        elementosRevelar.forEach((elemento) => elemento.classList.add("visivel"));
    }

    // 3. Física de Parallax para o Grid em Losango (5 Colunas)
    const colunasLosango = [];
    for (let i = 1; i <= 5; i++) {
        colunasLosango[i] = document.getElementById("losango-col" + i);
    }
    const secaoLosango = document.querySelector(".grid-losango-wrapper");

    if (secaoLosango && !reduzirMovimento) {
        let deslocamentoAnimado = 0;

        const velocidadesLosango = {
            1: -0.09, // Ponta esquerda sobe devagar
            2: 0.06,  // Intermediária desce suave
            3: 0.00,  // Centro (Thiago) fixado
            4: 0.06,  // Intermediária desce suave
            5: -0.09  // Ponta direita sobe devagar
        };

        function animarLosango() {
            if (window.innerWidth > 1024) {
                const rect = secaoLosango.getBoundingClientRect();
                const centroTela = window.innerHeight / 2;
                const centroSecao = rect.top + rect.height / 2;
                const distanciaRelativa = centroTela - centroSecao;

                deslocamentoAnimado += (distanciaRelativa - deslocamentoAnimado) * 0.06;

                for (let i = 1; i <= 5; i++) {
                    if (colunasLosango[i]) {
                        const deslocamento = deslocamentoAnimado * velocidadesLosango[i];
                        colunasLosango[i].style.transform = `translateY(${deslocamento}px)`;
                    }
                }
            } else {
                for (let i = 1; i <= 5; i++) {
                    if (colunasLosango[i]) {
                        colunasLosango[i].style.transform = "none";
                    }
                }
            }
            requestAnimationFrame(animarLosango);
        }

        animarLosango();
    }

    // 4. Galeria Interativa de Formações
    const formacoes = [
        {
            titulo: "Concept art",
            subtitulo: "Escola Revolution",
            descricao: "Curso de Concept Art com Victor Hamatchuck.",
            tag: "Formação complementar",
            imagem: "./assets/img/conceitual.png",
            legenda: "Concept Art · Escola Revolution"
        },
        {
            titulo: "3D e animação",
            subtitulo: "OZI",
            descricao: "Curso de Modelagem 3D e Animação.",
            tag: "Formação complementar",
            imagem: "./assets/img/modelagem-3d.jpg",
            legenda: "3D e animação · OZI"
        },
        {
            titulo: "Design gráfico",
            subtitulo: "UDF",
            descricao: "Graduação em Design Gráfico.",
            tag: "Graduação",
            imagem: "./assets/img/formatura.png",
            legenda: "Design gráfico · UDF"
        },
        {
            titulo: "Outros estudos",
            subtitulo: "Arte e edição",
            descricao: "Edição de vídeo no Studio Online.",
            tag: "Cursos complementares",
            imagem: "./assets/img/edicao-de-video.jpg",
            legenda: "Edição de vídeo · Studio Online"
        }
    ];

    const imagemFormacao = document.getElementById("imagem-formacao-principal");
    const legendaFormacao = document.getElementById("legenda-imagem-formacao");
    const tituloFormacao = document.getElementById("titulo-formacao-destaque");
    const subtituloFormacao = document.getElementById("subtitulo-formacao-destaque");
    const descricaoFormacao = document.getElementById("descricao-formacao-destaque");
    const tagFormacao = document.getElementById("tag-formacao");
    const miniaturasFormacao = document.querySelectorAll(".miniatura-formacao");

    miniaturasFormacao.forEach((miniatura) => {
        miniatura.addEventListener("click", () => {
            const indice = Number(miniatura.dataset.formacao);
            const formacao = formacoes[indice];
            if (!formacao || !imagemFormacao || !legendaFormacao || !tituloFormacao ||
                !subtituloFormacao || !descricaoFormacao || !tagFormacao) {
                return;
            }

            imagemFormacao.src = formacao.imagem;
            imagemFormacao.alt = `${formacao.titulo} · ${formacao.subtitulo}`;
            legendaFormacao.textContent = formacao.legenda;
            tituloFormacao.textContent = formacao.titulo;
            subtituloFormacao.textContent = formacao.subtitulo;
            descricaoFormacao.textContent = formacao.descricao;
            tagFormacao.textContent = formacao.tag;

            miniaturasFormacao.forEach((item) => {
                const ativo = item === miniatura;
                item.classList.toggle("ativo", ativo);
                item.setAttribute("aria-pressed", String(ativo));
            });
        });
    });
});