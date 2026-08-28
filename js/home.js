document.addEventListener("DOMContentLoaded", () => {
    const colunas = [];
    for (let i = 1; i <= 8; i++) {
        colunas[i] = document.getElementById("col" + i);
    }

    // Variáveis para a física de suavização (LERP)
    let scrollAtual = 0;
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
    });

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