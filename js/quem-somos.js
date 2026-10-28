document.addEventListener("DOMContentLoaded", () => {
    const textoDigitado = document.getElementById("texto-digitado-quem-somos");
    const frase = "Toda grande história começa com um primeiro traço.";
    const reduzirMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (textoDigitado) {
        if (reduzirMovimento) {
            textoDigitado.textContent = frase;
        } else {
            let indice = 0;
            const digitar = () => {
                textoDigitado.textContent = frase.slice(0, indice);
                indice += 1;
                if (indice <= frase.length) {
                    window.setTimeout(digitar, 42);
                }
            };
            digitar();
        }
    }

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
