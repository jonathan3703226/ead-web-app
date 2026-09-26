document.addEventListener("DOMContentLoaded", () => {
    const colunas = [];
    for (let i = 1; i <= 8; i++) {
        colunas[i] = document.getElementById("col" + i);
    }

    const classesPorColuna = [
        ["img-p", "img-g", "img-m", "img-g", "img-m"],
        ["img-g", "img-p", "img-p"],
        ["img-g", "img-m"],
        ["img-m", "img-p"],
        ["img-g", "img-m"],
        ["img-p", "img-p"],
        ["img-m", "img-g", "img-g"],
        ["img-g", "img-p", "img-m", "img-p", "img-p"]
    ];

    let numeroImagem = 1;
    for (let indiceColuna = 0; indiceColuna < classesPorColuna.length; indiceColuna++) {
        const coluna = colunas[indiceColuna + 1];
        if (!coluna) continue;

        for (const classeImagem of classesPorColuna[indiceColuna]) {
            const imagem = document.createElement("img");
            imagem.src = `./imagens/arte%20${numeroImagem}.jpg`;
            imagem.alt = "";
            imagem.className = classeImagem;
            imagem.loading = numeroImagem <= 8 ? "eager" : "lazy";
            imagem.decoding = "async";
            coluna.append(imagem);
            numeroImagem++;
        }
    }

    if (
        window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        window.matchMedia("(max-width: 1024px)").matches ||
        !colunas.some(Boolean)
    ) {
        return;
    }

    // Variáveis para a física de suavização (LERP)
    let scrollAtual = window.scrollY;
    let scrollAnimado = 0;

    // Velocidades reduzidas pela metade para ficar sutil e visível
    const velocidades = {
        1: -0.15, // Sobe devagar
        2: -0.08, // Sobe quase imperceptível
        3: -0.04, // Sobe super devagar
        4: 0.10,  // Desce suave
        5: 0.08,  // Desce suave
        6: -0.05, // Sobe devagar
        7: -0.12, // Sobe suave
        8: -0.18  // Sobe um pouco mais rápido
    };

    window.addEventListener("scroll", () => {
        scrollAtual = window.scrollY;
    }, { passive: true });

    function animarParallax() {
        // Interpolação Linear: aproxima o valor atual do destino suavemente
        // Quanto menor o 0.06, mais "escorregadio" (suave) fica o efeito
        scrollAnimado += (scrollAtual - scrollAnimado) * 0.06;

        for (let i = 1; i <= 8; i++) {
            if (colunas[i]) {
                // Aplica a matemática usando as velocidades novas mais lentas
                let mover = scrollAnimado * velocidades[i];
                colunas[i].style.transform = `translateY(${mover}px)`;
            }
        }

        requestAnimationFrame(animarParallax);
    }

    // Inicia o loop de animação
    animarParallax();
});