/* ==========================================================================
   SALA DE AULA - NANKIM ART SCHOOL
   - Player blindado estilo SENAI Play (bloqueia saída para o YouTube e ofusca IDs)
   - Grade oficial completa: 3 Módulos · 12 Aulas alinhadas a cursos.html
   - Navegação Anterior/Próxima, Conclusão definitiva em 100%, Checklist interativo
   - Dúvidas & Comentários com suporte a postagem Pública ou Privada ao instrutor
   - Modal comemorativo de conclusão do curso + Notificação de certificado
   ========================================================================== */

const sessaoAtiva = sessionStorage.getItem('nankim_sessao');
if (!sessaoAtiva) {
    window.location.href = 'index.html';
}

function decodificarVideoRef(token) {
    try {
        return atob(token);
    } catch (_) {
        return token;
    }
}

const CURSO_DATA = {
    id: 'fundamentos-desenho',
    titulo: 'Fundamentos do Desenho',
    modulos: [
        {
            id: 'm1',
            titulo: 'Módulo I: Domínio do Traço e Figura Humana em Ação',
            pago: false,
            aulas: [
                {
                    id: 'aula-1',
                    titulo: 'Aula 01 — Treinamento de Traço',
                    duracao: '1h de estudo e prática',
                    videoToken: 'LWhrQjgwWHBGcEE=',
                    descricao: 'Domine a coordenação motora fina e o controle da pressão no papel. Você vai praticar exercícios progressivos de aquecimento que eliminam o traço "peludo" e inseguro, garantindo linhas contínuas, limpas e precisas.',
                    objetivos: [
                        'Controlar a firmeza do pulso, cotovelo e ombro ao riscar o papel',
                        'Traçar retas paralelas, curvas em S e elipses sem usar régua',
                        'Graduar a pressão do grafite entre linhas leves de construção e traço final'
                    ],
                    ferramentas: 'Folhas sulfite A4 (75g ou 90g), lápis HB e 2B apontados, borracha macia.',
                    dica: 'Evite travar a lateral da mão no papel para linhas longas. Deslize o braço inteiro usando o ombro como pivô.',
                    exercicioTitulo: 'Bateria de Aquecimento Motor (3 Pranchas)',
                    tempoPratica: '40 min',
                    exercicio: 'Preencha 3 folhas A4 divididas em quadrantes: na 1ª folha pratique linhas retas horizontais, verticais e diagonais; na 2ª folha pratique círculos e elipses em diferentes graus de abertura; na 3ª folha conecte pontos aleatórios com um único traço firme.',
                    checklist: [
                        'Completar prancha de linhas paralelas sem girar o papel excessivamente',
                        'Executar 30 círculos e elipses passando o lápis 2x no mesmo contorno',
                        'Conectar pares de pontos distantes com traço único e sem hesitação'
                    ],
                    materiais: [
                        { nome: 'Ficha de Aquecimento Motor A4', formato: 'Guia Prático · PDF', desc: 'Grade com exercícios de retas, curvas e elipses para imprimir e treinar.', arquivo: 'ficha-aquecimento-traco.pdf' },
                        { nome: 'Checklist de Postura e Pegada no Lápis', formato: 'Resumo Visual · PDF', desc: 'Diagrama ilustrado sobre pegada de esboço vs. pegada de detalhamento.', arquivo: 'guia-pegada-postura.pdf' }
                    ]
                },
                {
                    id: 'aula-2',
                    titulo: 'Aula 02 — Estrutura e Esboço',
                    duracao: '1h de estudo e prática',
                    videoToken: 'MzZZNkRSY1V0ZG8=',
                    descricao: 'Aprenda a enxergar qualquer objeto ou personagem através de formas geométricas primárias (esferas, cilindros e caixas) antes de desenhar qualquer detalhe superficial.',
                    objetivos: [
                        'Decompor referências complexas em sólidos geométricos simples',
                        'Estabelecer eixos de simetria, centro de massa e proporção geral',
                        'Construir esboços leves que aceitam correções rápidas sem manchar o papel'
                    ],
                    ferramentas: 'Lápis HB ou lapiseira 0.5mm (grafite claro), papel A4 e limpa-tipos.',
                    dica: 'Nunca comece pelos olhos, cabelo ou roupas. Se a estrutura geométrica inicial estiver torta, nenhum detalhe vai salvar o desenho.',
                    exercicioTitulo: 'Estudo de Blocagem Geométrica de Personagens',
                    tempoPratica: '45 min',
                    exercicio: 'Selecione 5 personagens ou objetos do seu cotidiano e desenhe apenas o esqueleto estrutural e os volumes básicos (cabeça, tronco, membros e eixos), mantendo todas as linhas de construção visíveis.',
                    checklist: [
                        'Traçar linha central e eixos de inclinação em todos os estudos',
                        'Construir volumes tridimensionais com cilindros e caixas',
                        'Manter o esboço leve (pressão mínima no lápis HB)'
                    ],
                    materiais: [
                        { nome: 'Manual de Sólidos e Blocagem 3D', formato: 'Apostila Ilustrada · PDF', desc: 'Exemplos passo a passo de como simplificar objetos e personagens em formas base.', arquivo: 'manual-blocagem-3d.pdf' },
                        { nome: 'Prancha de Referências para Esboço', formato: 'Banco de Imagens · ZIP', desc: '10 referências selecionadas em dificuldade crescente para treino de estrutura.', arquivo: 'referencias-esboco.zip' }
                    ]
                },
                {
                    id: 'aula-3',
                    titulo: 'Aula 03 — Corpo Musculoso e Proporção Heroica',
                    duracao: '1h de estudo e prática',
                    videoToken: 'R3g5T3RuMHhYTFU=',
                    descricao: 'Construção anatômica estilizada para personagens de ação e quadrinhos. Entenda a grade de proporção heroica (8 a 8,5 cabeças) e o encaixe dos principais grupos musculares.',
                    objetivos: [
                        'Aplicar a régua de proporção heroica para personagens atléticos',
                        'Conectar caixa torácica, abdômen e pelve com volume tridimensional',
                        'Posicionar deltoides, peitoral, bíceps, tríceps e quadríceps com naturalidade'
                    ],
                    ferramentas: 'Papel A4 ou A3, lápis HB para a grade e lápis 2B para definição muscular.',
                    dica: 'Pense nos músculos como faixas elásticas que se esticam e se comprimem entre dois ossos — nunca como bolas isoladas.',
                    exercicioTitulo: 'Construção de Personagem Heroico (Frente e 3/4)',
                    tempoPratica: '50 min',
                    exercicio: 'Desenhe um personagem musculoso de corpo inteiro na vista frontal e na vista três quartos (3/4), marcando primeiro a grade de 8 cabeças, depois o manequim geométrico e por fim a musculatura.',
                    checklist: [
                        'Dividir a folha com a régua de proporção heroica (8 cabeças)',
                        'Definir largura de ombros (2,5 a 3 cabeças) e encaixe do tronco',
                        'Diferenciar músculos contraídos e relaxados na vista 3/4'
                    ],
                    materiais: [
                        { nome: 'Gabarito de Proporção Heroica (8 Cabeças)', formato: 'Template · PDF', desc: 'Grade pronta com marcações anatômicas de articulações e grupos musculares.', arquivo: 'gabarito-proporcao-heroica.pdf' },
                        { nome: 'Mapa Simplificado de Grupos Musculares', formato: 'Guia Visual · PDF', desc: 'Vista anterior e posterior dos principais músculos usados em personagens de ação.', arquivo: 'mapa-musculatura-acao.pdf' }
                    ]
                },
                {
                    id: 'aula-4',
                    titulo: 'Aula 04 — Corpo Humano em Movimento',
                    duracao: '1h de estudo e prática',
                    videoToken: 'OXQwVDlLSVAxb2s=',
                    descricao: 'Como eliminar a rigidez de "boneco travado" usando linha de ação, contraposto (inclinação oposta entre ombros e quadril), torção do tronco e distribuição de peso.',
                    objetivos: [
                        'Identificar e exagerar a linha de ação principal de qualquer pose',
                        'Aplicar contraposto e torção entre caixa torácica e pelve',
                        'Equilibrar o centro de gravidade em saltos, corridas e golpes'
                    ],
                    ferramentas: 'Bloco de rascunho A4, lápis 2B macio ou lápis dermatográfico.',
                    dica: 'Antes de desenhar braços ou pernas, faça um único risco curvo representando a energia da coluna. Se essa curva funcionar, a pose já tem vida.',
                    exercicioTitulo: 'Sessão de Gesture Drawing & Poses de Ação',
                    tempoPratica: '45 min',
                    exercicio: 'Execute 6 estudos dinâmicos (corrida em velocidade, salto acrobático, soco frontal, defesa, queda e impulso), dedicando 5 minutos à linha de ação e gestual de cada pose antes de estruturar os volumes.',
                    checklist: [
                        'Iniciar todas as 6 poses pela linha de ação contínua',
                        'Garantir inclinação oposta entre linha dos ombros e linha do quadril',
                        'Verificar apoio dos pés ou trajetória de movimento no ar'
                    ],
                    materiais: [
                        { nome: 'Pack de Poses Dinâmicas para Gesture', formato: 'Referências · ZIP', desc: '15 poses de ação e artes marciais selecionadas para estudo rápido.', arquivo: 'pack-poses-dinamicas.zip' },
                        { nome: 'Guia de Linha de Ação e Contraposto', formato: 'Resumo Técnico · PDF', desc: 'Comparativo visual entre poses rígidas e poses com fluxo dinâmico.', arquivo: 'guia-linha-acao.pdf' }
                    ]
                }
            ]
        },
        {
            id: 'm2',
            titulo: 'Módulo II: Criação de Personagens, Criaturas e Mundos',
            pago: true,
            aulas: [
                {
                    id: 'aula-5',
                    titulo: 'Aula 05 — Design de Criaturas (Dragão)',
                    duracao: '1h de estudo e prática',
                    videoToken: 'RWhXSC1LUXp0MXM=',
                    descricao: 'Fundamentos de Creature Design aplicando anatomia comparada: estrutura craniana reptiliana, articulação de asas baseada em morcegos/aves, pescoço serpentino e distribuição orgânica de escamas.',
                    objetivos: [
                        'Construir crânio, chifres, focinho e expressão feroz em perspectiva',
                        'Estruturar a envergadura e os dedos das asas com lógica funcional',
                        'Aplicar escamas e placas córneas acompanhando o volume sem poluir o desenho'
                    ],
                    ferramentas: 'Papel A4/A3, lápis HB, 2B e 4B para contrastes.',
                    dica: 'Não desenhe escama por escama no corpo inteiro. Concentre o detalhamento nas áreas de dobra e contorno para sugerir a textura ao olho do observador.',
                    exercicioTitulo: 'Concept Sheet de Dragão (Busto + Corpo Inteiro)',
                    tempoPratica: '60 min',
                    exercicio: 'Crie a prancha de apresentação de um dragão original contendo um estudo detalhado da cabeça em 3/4 e uma pose de corpo inteiro com asas abertas.',
                    checklist: [
                        'Estruturar crânio, mandíbula e implantação dos chifres',
                        'Desenhar articulações das asas (ombro, cotovelo, punho e falanges)',
                        'Aplicar textura de escamas seguindo as linhas de contorno do volume'
                    ],
                    materiais: [
                        { nome: 'Anatomia Comparada para Dragões', formato: 'Guia Visual · PDF', desc: 'Estudo de crânios, garras e membranas de asas baseados em animais reais.', arquivo: 'anatomia-dragoes.pdf' }
                    ]
                },
                {
                    id: 'aula-6',
                    titulo: 'Aula 06 — Transformando Personagens em Chibi',
                    duracao: '1h de estudo e prática',
                    videoToken: 'dHZxaGViSnNVS1U=',
                    descricao: 'Aprenda a traduzir qualquer personagem complexo para a estética Chibi (2 a 3 cabeças de altura), sintetizando detalhes e exagerando expressões para maximizar o carisma.',
                    objetivos: [
                        'Ajustar a proporção corporal para 2 ou 2,5 cabeças',
                        'Selecionar os elementos icônicos que mantêm o personagem reconhecível',
                        'Construir olhos expressivos, mãos simplificadas e poses fofas ou cômicas'
                    ],
                    ferramentas: 'Papel A4, lápis HB, borracha e caneta fina para contorno.',
                    dica: 'No Chibi, a cabeça ocupa quase metade da altura total. Reduza detalhes pequenos das roupas para que o desenho não fique visualmente poluído.',
                    exercicioTitulo: 'Adaptação de Personagem para Estilo Chibi',
                    tempoPratica: '40 min',
                    exercicio: 'Pegue o personagem heroico criado no Módulo I (ou seu personagem favorito) e redesenhe-o em versão Chibi de 2,5 cabeças com 2 expressões faciais diferentes.',
                    checklist: [
                        'Respeitar proporção de 2 a 3 cabeças de altura',
                        'Manter paleta de formas/acessórios essenciais do personagem original',
                        'Criar duas variações de expressão facial exagerada'
                    ],
                    materiais: [
                        { nome: 'Tabela de Proporções e Expressões Chibi', formato: 'Guia Prático · PDF', desc: 'Modelos de cabeça, olhos e poses compactas no estilo Chibi.', arquivo: 'guia-proporcoes-chibi.pdf' }
                    ]
                },
                {
                    id: 'aula-7',
                    titulo: 'Aula 07 — Perspectiva em 3 Pontos de Fuga',
                    duracao: '1h de estudo e prática',
                    videoToken: 'YWtrUDdNWUpYcFE=',
                    descricao: 'Domine a perspectiva cônica com 3 pontos de fuga para construir cenas vertiginosas vistas de baixo para cima (contra-plongée) ou de cima para baixo (plongée).',
                    objetivos: [
                        'Posicionar Linha do Horizonte e os 3 pontos de fuga dentro e fora da folha',
                        'Projetar todas as linhas verticais convergindo para o ponto zenital ou nadiral',
                        'Construir blocos arquitetônicos monumentais sem distorção excessiva'
                    ],
                    ferramentas: 'Papel A3 ou A4, régua de 30cm, lápis HB e 2B.',
                    dica: 'Quanto mais afastados os pontos de fuga ficarem da área do desenho, mais natural e cinematográfica será a perspectiva.',
                    exercicioTitulo: 'Cidade Vertical em 3 Pontos de Fuga',
                    tempoPratica: '55 min',
                    exercicio: 'Desenhe um conjunto de 4 torres ou edifícios monumentais vistos de baixo para cima utilizando 3 pontos de fuga, adicionando janelas, pontes e elementos de escala.',
                    checklist: [
                        'Marcar Linha do Horizonte baixa e os 3 pontos de fuga',
                        'Alinhar todas as arestas verticais ao terceiro ponto superior',
                        'Incluir elementos de escala (passarelas, arcos ou figuras pequenas)'
                    ],
                    materiais: [
                        { nome: 'Malha de Perspectiva 3 Pontos de Fuga', formato: 'Grid Imprimível · PNG/PDF', desc: 'Grade guia pronta para treinar construções em plongée e contra-plongée.', arquivo: 'malha-3-pontos-fuga.pdf' }
                    ]
                },
                {
                    id: 'aula-8',
                    titulo: 'Aula 08 — Construção de Cenário Medieval',
                    duracao: '1h de estudo e prática',
                    videoToken: 'bHhYSGFpM1kwUnM=',
                    descricao: 'Composição de ambientes históricos e fantásticos: como organizar primeiro plano, plano médio e fundo para construir uma vila ou fortaleza medieval cheia de atmosfera.',
                    objetivos: [
                        'Estruturar a cena em 3 camadas de profundidade bem definidas',
                        'Desenhar telhados inclinados, vigas de madeira, muralhas de pedra e arcos',
                        'Guiar o olhar do espectador até o ponto focal do cenário'
                    ],
                    ferramentas: 'Papel A4/A3, régua, lápis HB e 2B.',
                    dica: 'Use linhas mais espessas e detalhadas no primeiro plano e deixe o fundo mais leve e simplificado para criar profundidade imediata.',
                    exercicioTitulo: 'Cenário Completo de Vila ou Castelo Medieval',
                    tempoPratica: '60 min',
                    exercicio: 'Construa uma ilustração de cenário medieval contendo elementos de primeiro plano (pedras, vegetação ou cercado), plano médio (casas enxaimel ou torre) e fundo (montanhas ou castelo).',
                    checklist: [
                        'Separar visualmente primeiro plano, plano médio e fundo',
                        'Aplicar perspectiva coerente em telhados, portas e janelas',
                        'Variar textura entre madeira, pedra e folhagem'
                    ],
                    materiais: [
                        { nome: 'Catálogo de Elementos Arquitetônicos Medievais', formato: 'Referências · PDF', desc: 'Estudos de telhados, torres, muralhas, pontes e texturas de pedra.', arquivo: 'arquitetura-medieval.pdf' }
                    ]
                }
            ]
        },
        {
            id: 'm3',
            titulo: 'Módulo III: Luz, Sombra, Arte-Final em Nanquim e Mercado',
            pago: true,
            aulas: [
                {
                    id: 'aula-9',
                    titulo: 'Aula 09 — Finalização com Caneta Nanquim',
                    duracao: '1h de estudo e prática',
                    videoToken: 'MVdHYVV6LWZ3ZU0=',
                    descricao: 'Técnicas profissionais de arte-final tradicional no papel: controle de peso de linha, contorno externo vs. interno, hachuras cruzadas e preenchimento de áreas de preto sólido.',
                    objetivos: [
                        'Aplicar variação de espessura de linha (line weight) conforme luz e profundidade',
                        'Construir hachuras paralelas e cruzadas que acompanham a curvatura do objeto',
                        'Limpar o esboço a lápis sem borrar a tinta nanquim'
                    ],
                    ferramentas: 'Canetas nanquim descartáveis ou recarregáveis (0.1, 0.3, 0.5 e pincel/brush), borracha macia.',
                    dica: 'Engrosse o traço no lado oposto à fonte de luz e nas interseções onde duas formas se sobrepõem.',
                    exercicioTitulo: 'Arte-Final em Nanquim com Peso de Linha e Hachuras',
                    tempoPratica: '50 min',
                    exercicio: 'Selecione um personagem ou criatura desenhado nos módulos anteriores e realize a arte-final completa com canetas nanquim, variando espessuras e aplicando hachuras nas áreas de sombra.',
                    checklist: [
                        'Aplicar contorno mais espesso nas bordas externas e áreas de sombra',
                        'Executar hachuras seguindo o volume tridimensional',
                        'Aguardar secagem completa antes de apagar o grafite base'
                    ],
                    materiais: [
                        { nome: 'Tabela de Hachuras e Peso de Linha', formato: 'Folha de Treino · PDF', desc: 'Exercícios de gradação tonal com nanquim usando hachuras e pontilhismo.', arquivo: 'treino-hachuras-nanquim.pdf' }
                    ]
                },
                {
                    id: 'aula-10',
                    titulo: 'Aula 10 — Luz e Sombra em Cenários',
                    duracao: '1h de estudo e prática',
                    videoToken: 'ajhibFZlclpUQ3M=',
                    descricao: 'Como iluminar ambientes complexos definindo uma fonte luminosa principal, separando planos por valores tonais e projetando sombras coerentes.',
                    objetivos: [
                        'Estabelecer direção e intensidade de uma fonte de luz primária',
                        'Organizar a leitura da cena em 3 valores principais (luz, meio-tom e sombra)',
                        'Aplicar perspectiva atmosférica para afastar o plano de fundo'
                    ],
                    ferramentas: 'Lápis 2B, 4B, 6B, esfuminho ou marcadores em tons de cinza.',
                    dica: 'Antes de detalhar qualquer textura, faça um pequeno estudo em miniatura (thumbnail) de 5cm apenas com manchas de claro e escuro.',
                    exercicioTitulo: 'Estudo de Iluminação Dramática no Cenário Medieval',
                    tempoPratica: '55 min',
                    exercicio: 'Aplique luz direcional e sombras projetadas no cenário medieval criado na Aula 08, destacando o ponto focal através do contraste entre claro e escuro.',
                    checklist: [
                        'Definir direção única para os raios de luz na cena',
                        'Projetar sombras coerentes no chão e nas paredes',
                        'Criar contraste focal entre primeiro plano e plano médio'
                    ],
                    materiais: [
                        { nome: 'Guia de Valores Tonais e Iluminação de Cena', formato: 'Apostila · PDF', desc: 'Exemplos de iluminação diurna, crepúsculo e contraluz em cenários.', arquivo: 'guia-luz-sombra-cenarios.pdf' }
                    ]
                },
                {
                    id: 'aula-11',
                    titulo: 'Aula 11 — Introdução à Colorização',
                    duracao: '1h de estudo e prática',
                    videoToken: 'RVl6emtTcDBKbXM=',
                    descricao: 'Fundamentos práticos de teoria das cores: círculo cromático, temperatura (cores quentes e frias), harmonia complementar/análoga e aplicação de cor sobre arte-final.',
                    objetivos: [
                        'Montar paletas harmoniosas de 3 a 4 cores antes de iniciar a pintura',
                        'Equilibrar luz quente com sombras frias (e vice-versa) para gerar volume',
                        'Manter a leitura dos valores tonais mesmo após adicionar saturação'
                    ],
                    ferramentas: 'Lápis de cor, marcadores ou software digital de sua preferência.',
                    dica: 'Evite sombrear usando apenas preto puro. Misture o tom complementar ou um azul/roxo frio na sombra para deixar a pintura vibrante.',
                    exercicioTitulo: 'Colorização com Paleta Harmônica Limitada',
                    tempoPratica: '60 min',
                    exercicio: 'Colorize uma ilustração arte-finalizada escolhendo previamente uma paleta de no máximo 4 cores principais, aplicando cor base, sombra fria e pontos de luz quente.',
                    checklist: [
                        'Definir paleta de 3 a 4 cores antes de começar a pintar',
                        'Aplicar variação de temperatura entre luz e sombra',
                        'Preservar o contraste e a legibilidade da arte-final'
                    ],
                    materiais: [
                        { nome: 'Roda Cromática e 12 Paletas Prontas', formato: 'Guia de Cores · PDF', desc: 'Combinações cromáticas testadas para personagens, criaturas e cenários.', arquivo: 'paletas-cromatica-nankim.pdf' }
                    ]
                },
                {
                    id: 'aula-12',
                    titulo: 'Aula 12 — Mentoria de Portfólio e Mercado',
                    duracao: '1h de estudo e prática',
                    videoToken: 'REZvX1dJNldtV1k=',
                    descricao: 'Como curar suas melhores peças, digitalizar ou fotografar desenhos tradicionais com acabamento profissional, estruturar seu portfólio e conquistar seus primeiros clientes ou vagas.',
                    objetivos: [
                        'Selecionar de 6 a 8 peças com alto nível técnico e unidade visual',
                        'Digitalizar ou fotografar artes no papel com iluminação uniforme e ajuste de níveis',
                        'Apresentar estudos de processo (esboço + arte-final) que valorizam seu raciocínio'
                    ],
                    ferramentas: 'Suas melhores artes do curso, scanner ou smartphone com luz natural indireta.',
                    dica: 'Clientes e estúdios contratam você pelo seu pior trabalho publicado no portfólio. Remova estudos antigos e deixe apenas o que representa seu nível atual.',
                    exercicioTitulo: 'Curadoria e Estruturação do Portfólio Nankim',
                    tempoPratica: '45 min',
                    exercicio: 'Selecione suas 5 melhores ilustrações produzidas durante o curso, faça a captura limpa de cada uma e organize uma apresentação sequencial mostrando esboço e arte finalizada.',
                    checklist: [
                        'Selecionar as 5 melhores peças produzidas nos 3 módulos',
                        'Capturar/digitalizar todas com enquadramento reto e fundo limpo',
                        'Montar prancha comparativa de processo (esboço + finalização)'
                    ],
                    materiais: [
                        { nome: 'Checklist de Portfólio e Precificação Inicial', formato: 'Guia de Carreira · PDF', desc: 'Roteiro completo de apresentação para Behance, ArtStation, Instagram e clientes.', arquivo: 'checklist-portfolio-mercado.pdf' }
                    ]
                }
            ]
        }
    ]
};

let aulaAtualId = 'aula-1';
let aulasConcluidas = new Set();
let checklistsPorAula = {};
let comentariosPorAula = {};
let usuarioMatriculado = false;
let visibilidadeComentarioAtual = 'publico';

// Variáveis do Player Blindado (YouTube IFrame API)
let ytPlayer = null;
let ytApiPronta = false;
let timerProgressoVideo = null;

function verificarMatriculaUsuario() {
    const sessao = sessionStorage.getItem('nankim_sessao');
    if (sessao) {
        try {
            const userObj = JSON.parse(sessao);
            const db = JSON.parse(localStorage.getItem('nankim_db')) || [];
            const usuario = db.find(u => String(u.email || '').toLowerCase() === String(userObj.email || '').toLowerCase());
            if (usuario && usuario.matriculado === true) {
                usuarioMatriculado = true;
            }
        } catch (_) {}
    }
}

function cursoEstaConcluido() {
    const totalAulas = contarTotalAulas();
    if (aulasConcluidas.size >= totalAulas) return true;
    if (localStorage.getItem('nankim_certificado_liberado') === 'true') return true;

    try {
        const sessao = JSON.parse(sessionStorage.getItem('nankim_sessao'));
        if (sessao) {
            const db = JSON.parse(localStorage.getItem('nankim_db')) || [];
            const u = db.find(item => String(item.email || '').toLowerCase() === String(sessao.email || '').toLowerCase());
            if (u && u.certificadoLiberado === true) return true;
        }
    } catch (_) {}

    return false;
}

function carregarEstado() {
    verificarMatriculaUsuario();

    try {
        const savedConcluidas = localStorage.getItem('nankim_aulas_concluidas');
        if (savedConcluidas) {
            aulasConcluidas = new Set(JSON.parse(savedConcluidas));
        }
    } catch (_) {}

    // Se o curso já foi concluído anteriormente, garante que todas as 12 aulas permaneçam marcadas
    if (cursoEstaConcluido()) {
        CURSO_DATA.modulos.forEach(m => m.aulas.forEach(a => aulasConcluidas.add(a.id)));
        localStorage.setItem('nankim_aulas_concluidas', JSON.stringify(Array.from(aulasConcluidas)));
    }

    try {
        const savedChecklists = localStorage.getItem('nankim_checklists_aulas');
        if (savedChecklists) {
            checklistsPorAula = JSON.parse(savedChecklists);
        }
    } catch (_) {}

    const savedUltimaAula = localStorage.getItem('nankim_ultima_aula');
    if (savedUltimaAula && obterAulaEModulo(savedUltimaAula)) {
        const dadosSalvos = obterAulaEModulo(savedUltimaAula);
        if (!dadosSalvos.modulo.pago || usuarioMatriculado) {
            aulaAtualId = savedUltimaAula;
        }
    }

    try {
        const savedComentarios = localStorage.getItem('nankim_comentarios');
        comentariosPorAula = savedComentarios ? JSON.parse(savedComentarios) : {};
    } catch (_) {
        comentariosPorAula = {};
    }
}

function sincronizarProgressoNoBanco() {
    const sessao = sessionStorage.getItem('nankim_sessao');
    if (!sessao) return;

    try {
        const userObj = JSON.parse(sessao);
        const db = JSON.parse(localStorage.getItem('nankim_db')) || [];
        const idx = db.findIndex(u => String(u.email || '').toLowerCase() === String(userObj.email || '').toLowerCase());
        if (idx === -1) return;

        const totalAulas = contarTotalAulas();
        const porcentagem = totalAulas > 0 ? Math.round((aulasConcluidas.size / totalAulas) * 100) : 0;

        if (porcentagem >= 100 && db[idx].matriculado) {
            db[idx].certificadoLiberado = true;
            localStorage.setItem('nankim_certificado_liberado', 'true');
        }

        if (Array.isArray(db[idx].cursos) && db[idx].cursos.length > 0) {
            db[idx].cursos[0].progresso = porcentagem;
            db[idx].cursos[0].aulasConcluidas = Array.from(aulasConcluidas);
            db[idx].cursos[0].ultimaAula = aulaAtualId;
        }

        localStorage.setItem('nankim_db', JSON.stringify(db));
    } catch (_) {}
}

function salvarEstado() {
    localStorage.setItem('nankim_aulas_concluidas', JSON.stringify(Array.from(aulasConcluidas)));
    localStorage.setItem('nankim_checklists_aulas', JSON.stringify(checklistsPorAula));
    localStorage.setItem('nankim_ultima_aula', aulaAtualId);
    localStorage.setItem('nankim_comentarios', JSON.stringify(comentariosPorAula));
    sincronizarProgressoNoBanco();
}

function contarTotalAulas() {
    return CURSO_DATA.modulos.reduce((acc, mod) => acc + mod.aulas.length, 0);
}

// ==========================================================================
// PLAYER BLINDADO ESTILO SENAI PLAY (YouTube IFrame API sem links expostos)
// ==========================================================================
function inicializarYouTubeAPI() {
    if (window.YT && window.YT.Player) {
        ytApiPronta = true;
        criarOuTrocarVideoPlayer(aulaAtualId);
        return;
    }

    window.onYouTubeIframeAPIReady = function () {
        ytApiPronta = true;
        criarOuTrocarVideoPlayer(aulaAtualId);
    };

    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(tag);
}

function criarOuTrocarVideoPlayer(idAula) {
    const dados = obterAulaEModulo(idAula);
    if (!dados) return;

    const videoIdReal = decodificarVideoRef(dados.aula.videoToken);
    if (!ytApiPronta) return;

    if (ytPlayer && typeof ytPlayer.cueVideoById === 'function') {
        ytPlayer.cueVideoById(videoIdReal);
        atualizarVisualPlayPause(false);
        resetarBarraTempo();
        return;
    }

    ytPlayer = new YT.Player('yt-player-frame', {
        videoId: videoIdReal,
        playerVars: {
            controls: 0,
            disablekb: 1,
            fs: 0,
            iv_load_policy: 3,
            modestbranding: 1,
            rel: 0,
            playsinline: 1,
            origin: window.location.origin
        },
        events: {
            onReady: () => {
                iniciarMonitoramentoTempo();
            },
            onStateChange: (event) => {
                if (event.data === YT.PlayerState.PLAYING) {
                    atualizarVisualPlayPause(true);
                } else if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED) {
                    atualizarVisualPlayPause(false);
                }
            }
        }
    });
}

function alternarPlayPause() {
    if (!ytPlayer || typeof ytPlayer.getPlayerState !== 'function') return;
    const estado = ytPlayer.getPlayerState();
    if (estado === YT.PlayerState.PLAYING) {
        ytPlayer.pauseVideo();
    } else {
        ytPlayer.playVideo();
    }
}

function atualizarVisualPlayPause(tocando) {
    const wrapper = document.getElementById('nankim-player-wrapper');
    const centerBtn = document.getElementById('player-center-btn');
    const ctrlIcon = document.getElementById('ctrl-play-icon');

    if (wrapper) {
        wrapper.classList.toggle('tocando', tocando);
    }
    if (centerBtn) {
        centerBtn.innerHTML = tocando
            ? '<i class="fa-solid fa-pause"></i>'
            : '<i class="fa-solid fa-play ml-1"></i>';
    }
    if (ctrlIcon) {
        ctrlIcon.className = tocando ? 'fa-solid fa-pause' : 'fa-solid fa-play';
    }
}

function formatarSegundos(seg) {
    const s = Math.max(0, Math.floor(seg || 0));
    const min = Math.floor(s / 60);
    const resto = s % 60;
    return `${String(min).padStart(2, '0')}:${String(resto).padStart(2, '0')}`;
}

function resetarBarraTempo() {
    const fill = document.getElementById('player-timeline-fill');
    const disp = document.getElementById('player-time-display');
    if (fill) fill.style.width = '0%';
    if (disp) disp.textContent = '00:00 / 00:00';
}

function iniciarMonitoramentoTempo() {
    if (timerProgressoVideo) clearInterval(timerProgressoVideo);
    timerProgressoVideo = setInterval(() => {
        if (!ytPlayer || typeof ytPlayer.getCurrentTime !== 'function') return;
        const atual = ytPlayer.getCurrentTime() || 0;
        const total = ytPlayer.getDuration() || 0;
        const pct = total > 0 ? Math.min((atual / total) * 100, 100) : 0;

        const fill = document.getElementById('player-timeline-fill');
        const disp = document.getElementById('player-time-display');
        if (fill) fill.style.width = `${pct}%`;
        if (disp) disp.textContent = `${formatarSegundos(atual)} / ${formatarSegundos(total)}`;
    }, 350);
}

// ==========================================================================
// INICIALIZAÇÃO E CARREGAMENTO DE AULAS
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    carregarEstado();
    configurarEventosDOM();
    carregarAula(aulaAtualId);
    atualizarProgressoGeral();
    inicializarYouTubeAPI();
});

function obterAulaEModulo(idAula) {
    for (const mod of CURSO_DATA.modulos) {
        const aula = mod.aulas.find(a => a.id === idAula);
        if (aula) return { aula, modulo: mod };
    }
    return null;
}

function carregarAula(idAula) {
    const dados = obterAulaEModulo(idAula);
    if (!dados) return;

    const { aula, modulo } = dados;

    if (modulo.pago && !usuarioMatriculado) {
        alert('Este módulo é exclusivo para alunos matriculados no Curso Completo.');
        return;
    }

    aulaAtualId = idAula;
    salvarEstado();

    if (ytApiPronta) {
        criarOuTrocarVideoPlayer(idAula);
    }

    // Atualiza cabeçalho da aula
    const elemTitulo = document.getElementById('aula-titulo');
    const elemBadgeMod = document.getElementById('aula-modulo-badge');
    const elemBadgeDur = document.getElementById('aula-duracao-badge');
    if (elemTitulo) elemTitulo.textContent = aula.titulo;
    if (elemBadgeMod) elemBadgeMod.textContent = modulo.titulo.split(':')[0];
    if (elemBadgeDur) elemBadgeDur.innerHTML = `<i class="fa-regular fa-clock mr-1"></i>${aula.duracao}`;

    // Aba Visão Geral
    const elemDesc = document.getElementById('aula-descricao');
    const elemDica = document.getElementById('aula-dica');
    const elemObjetivos = document.getElementById('aula-objetivos');
    const elemFerramentas = document.getElementById('aula-ferramentas');

    if (elemDesc) elemDesc.textContent = aula.descricao;
    if (elemDica) elemDica.textContent = aula.dica;
    if (elemFerramentas) elemFerramentas.textContent = aula.ferramentas;
    if (elemObjetivos) {
        elemObjetivos.innerHTML = (aula.objetivos || []).map(obj => `
            <li class="flex items-start gap-2">
                <i class="fa-solid fa-check text-nankimGreen text-xs mt-1"></i>
                <span>${obj}</span>
            </li>
        `).join('');
    }

    // Aba Exercício Prático (com checklist clicável e persistente)
    const elemExTitulo = document.getElementById('aula-exercicio-titulo');
    const elemExTempo = document.getElementById('aula-tempo-pratica');
    const elemExercicio = document.getElementById('aula-exercicio-desc');
    if (elemExTitulo) elemExTitulo.textContent = aula.exercicioTitulo || 'Atividade Prática';
    if (elemExTempo) elemExTempo.textContent = `Tempo estimado: ${aula.tempoPratica || '45 min'}`;
    if (elemExercicio) elemExercicio.textContent = aula.exercicio;
    renderizarChecklistAula(aula);

    // Aba Material de Apoio
    const materiaisContainer = document.getElementById('aula-materiais-lista');
    if (materiaisContainer) {
        materiaisContainer.innerHTML = (aula.materiais || []).map(mat => `
            <div class="p-4 rounded-xl bg-zinc-900 border border-solid border-zinc-800 hover:border-nankimGreen transition-all flex flex-col justify-between gap-3">
                <div class="flex items-start gap-3">
                    <div class="w-10 h-10 rounded-lg bg-amber-500/15 text-nankimGreen flex items-center justify-center flex-shrink-0">
                        <i class="fa-solid fa-file-lines text-lg"></i>
                    </div>
                    <div class="flex flex-col gap-0.5">
                        <span class="text-[11px] font-bold uppercase tracking-wider text-nankimGreen">${mat.formato}</span>
                        <strong class="text-sm font-bold text-white">${mat.nome}</strong>
                        <p class="text-xs text-gray-400 m-0 mt-1">${mat.desc}</p>
                    </div>
                </div>
                <button type="button" onclick="baixarFichaMaterial('${aula.id}', '${mat.nome.replace(/'/g, "\\'")}')" class="w-full py-2 px-3 rounded-lg bg-zinc-800 hover:bg-nankimGreen text-gray-200 hover:text-zinc-950 border-0 text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-2">
                    <i class="fa-solid fa-download"></i> Baixar Material (${mat.arquivo})
                </button>
            </div>
        `).join('');
    }

    atualizarBotaoConcluir();
    atualizarBotoesNavegacao();
    renderizarSidebarModulos();
    renderizarComentarios();
}

function renderizarChecklistAula(aula) {
    const elemChecklist = document.getElementById('aula-checklist');
    const elemProg = document.getElementById('checklist-progresso-texto');
    if (!elemChecklist) return;

    const marcados = checklistsPorAula[aula.id] || [];
    const total = aula.checklist.length;

    if (elemProg) {
        elemProg.textContent = `${marcados.length}/${total} concluídas`;
    }

    elemChecklist.innerHTML = aula.checklist.map((item, idx) => {
        const checked = marcados.includes(idx);
        return `
            <li onclick="toggleItemChecklist('${aula.id}', ${idx})" class="flex items-center gap-3 p-2.5 rounded-lg border border-solid ${checked ? 'bg-amber-500/10 border-amber-500/30 text-white' : 'bg-black/30 border-zinc-800 text-gray-300'} cursor-pointer transition-all hover:border-nankimGreen">
                <i class="fa-${checked ? 'solid fa-square-check text-nankimGreen' : 'regular fa-square text-gray-500'} text-base"></i>
                <span class="${checked ? 'line-through opacity-80' : ''}">${item}</span>
            </li>
        `;
    }).join('');
}

function toggleItemChecklist(idAula, idx) {
    if (!Array.isArray(checklistsPorAula[idAula])) {
        checklistsPorAula[idAula] = [];
    }
    const pos = checklistsPorAula[idAula].indexOf(idx);
    if (pos === -1) {
        checklistsPorAula[idAula].push(idx);
    } else {
        checklistsPorAula[idAula].splice(pos, 1);
    }
    salvarEstado();
    const dados = obterAulaEModulo(idAula);
    if (dados) renderizarChecklistAula(dados.aula);
}

function baixarFichaMaterial(idAula, nomeMaterial) {
    const dados = obterAulaEModulo(idAula);
    if (!dados) return;
    const { aula, modulo } = dados;

    const conteudoTxt = [
        'NANKIM ART SCHOOL — MATERIAL DE APOIO OFICIAL',
        '==============================================================',
        `Curso: ${CURSO_DATA.titulo}`,
        `Módulo: ${modulo.titulo}`,
        `Aula: ${aula.titulo} (${aula.duracao})`,
        `Material: ${nomeMaterial}`,
        '',
        'RESUMO DA AULA:',
        aula.descricao,
        '',
        'OBJETIVOS DE APRENDIZAGEM:',
        ...(aula.objetivos || []).map(o => `- ${o}`),
        '',
        'MATERIAIS NECESSÁRIOS:',
        aula.ferramentas,
        '',
        `EXERCÍCIO PRÁTICO (${aula.exercicioTitulo}):`,
        aula.exercicio,
        '',
        'CHECKLIST DE ENTREGA:',
        ...aula.checklist.map(c => `[ ] ${c}`),
        '',
        'DICA DO PROFESSOR:',
        aula.dica
    ].join('\n');

    const blob = new Blob([conteudoTxt], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${idAula}-material-nankim.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// ==========================================================================
// SIDEBAR DE MÓDULOS
// ==========================================================================
function renderizarSidebarModulos() {
    const container = document.getElementById('container-modulos');
    if (!container) return;

    container.innerHTML = '';
    const totalAulas = contarTotalAulas();

    CURSO_DATA.modulos.forEach((modulo) => {
        const estaBloqueado = modulo.pago && !usuarioMatriculado;
        const contemAulaAtiva = modulo.aulas.some(a => a.id === aulaAtualId);
        const concluidasNoMod = modulo.aulas.filter(a => aulasConcluidas.has(a.id)).length;

        const moduloDiv = document.createElement('div');
        moduloDiv.className = 'modulo-box';

        moduloDiv.innerHTML = `
            <button type="button" onclick="toggleModuloAccordion('${modulo.id}')" class="modulo-header-btn">
                <div class="flex items-start gap-2.5">
                    <i id="icon-chevron-${modulo.id}" class="fa-solid fa-chevron-right text-xs text-gray-400 mt-1 transition-transform ${contemAulaAtiva ? 'rotate-90' : ''}"></i>
                    <span class="text-xs font-bold leading-snug ${estaBloqueado ? 'text-gray-400' : ''}">${modulo.titulo} ${estaBloqueado ? '🔒' : ''}</span>
                </div>
                <span class="text-[10px] font-bold text-gray-400 bg-black/40 px-2 py-0.5 rounded-full border border-solid border-zinc-700 flex-shrink-0">
                    ${estaBloqueado ? 'Bloqueado' : `${concluidasNoMod}/${modulo.aulas.length}`}
                </span>
            </button>
            <div id="content-${modulo.id}" class="modulo-aulas-lista ${contemAulaAtiva ? '' : 'collapsed'}">
                ${estaBloqueado ? `
                    <div class="p-4 text-center flex flex-col items-center gap-2">
                        <p class="text-xs text-gray-400 m-0">Conteúdo exclusivo para alunos do Curso Completo.</p>
                        <a href="area-aluno.html" class="inline-block text-xs font-bold text-nankimGreen hover:underline">Desbloquear Módulos II e III</a>
                    </div>
                ` : modulo.aulas.map(aula => {
                    const isAtiva = aula.id === aulaAtualId;
                    const isConcluida = aulasConcluidas.has(aula.id);

                    let statusIcon = '<i class="fa-regular fa-circle text-gray-500 text-sm"></i>';
                    if (isConcluida) {
                        statusIcon = '<i class="fa-solid fa-circle-check text-nankimGreen text-sm"></i>';
                    } else if (isAtiva) {
                        statusIcon = '<i class="fa-solid fa-play text-nankimGreen text-xs"></i>';
                    }

                    return `
                        <div onclick="carregarAula('${aula.id}')" class="aula-item-row ${isAtiva ? 'ativa' : ''}">
                            <div class="mt-0.5 flex-shrink-0">${statusIcon}</div>
                            <div class="flex flex-col gap-0.5 min-w-0">
                                <span class="text-xs leading-snug ${isAtiva ? 'font-bold text-nankimGreen' : 'font-semibold'}">${aula.titulo}</span>
                                <span class="text-[11px] text-gray-500">${aula.duracao}</span>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;

        container.appendChild(moduloDiv);
    });

    const elemCount = document.getElementById('aulas-concluidas-count');
    if (elemCount) elemCount.textContent = `${aulasConcluidas.size}/${totalAulas} Aulas`;
}

function toggleModuloAccordion(modId) {
    const content = document.getElementById(`content-${modId}`);
    const chevron = document.getElementById(`icon-chevron-${modId}`);
    if (content) {
        content.classList.toggle('collapsed');
        if (chevron) chevron.classList.toggle('rotate-90');
    }
}

// ==========================================================================
// NAVEGAÇÃO ANTERIOR / PRÓXIMA E MARCAR COMO CONCLUÍDA
// ==========================================================================
function todasAsAulasDisponiveis() {
    const lista = [];
    CURSO_DATA.modulos.forEach(m => {
        if (!m.pago || usuarioMatriculado) {
            m.aulas.forEach(a => lista.push(a));
        }
    });
    return lista;
}

function atualizarBotoesNavegacao() {
    const lista = todasAsAulasDisponiveis();
    const idx = lista.findIndex(a => a.id === aulaAtualId);
    const btnAnt = document.getElementById('btn-anterior');
    const btnProx = document.getElementById('btn-proxima');

    if (btnAnt) btnAnt.disabled = (idx <= 0);
    if (btnProx) btnProx.disabled = (idx === -1 || idx >= lista.length - 1);
}

function navegarAula(direcao) {
    const lista = todasAsAulasDisponiveis();
    const idx = lista.findIndex(a => a.id === aulaAtualId);
    const novoIdx = idx + direcao;

    if (novoIdx >= 0 && novoIdx < lista.length) {
        carregarAula(lista[novoIdx].id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function exibirModalParabensCurso() {
    const existente = document.getElementById('modal-parabens-curso');
    if (existente) existente.remove();

    let primeiroNome = 'Artista';
    try {
        const s = JSON.parse(sessionStorage.getItem('nankim_sessao'));
        if (s?.nome) primeiroNome = s.nome.split(' ')[0];
    } catch (_) {}

    const overlay = document.createElement('div');
    overlay.id = 'modal-parabens-curso';
    overlay.style.cssText = 'position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,0.82);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;padding:1rem;font-family:"Montserrat",sans-serif;';

    overlay.innerHTML = `
        <div style="background:#141414;border:1px solid rgba(243,156,18,0.45);border-radius:22px;max-width:480px;width:100%;padding:2rem 1.75rem;color:#f3f4f6;box-shadow:0 28px 70px rgba(0,0,0,0.85);text-align:center;display:flex;flex-direction:column;align-items:center;gap:1rem;">
            <div style="width:74px;height:74px;border-radius:50%;background:rgba(243,156,18,0.16);border:2px solid #f39c12;color:#f39c12;display:flex;align-items:center;justify-content:center;font-size:2rem;box-shadow:0 0 30px rgba(243,156,18,0.3);">
                <i class="fa-solid fa-award"></i>
            </div>

            <span style="font-size:0.72rem;font-weight:800;text-transform:uppercase;letter-spacing:0.08em;color:#f39c12;background:rgba(243,156,18,0.12);padding:0.35rem 0.85rem;border-radius:999px;border:1px solid rgba(243,156,18,0.3);">
                100% Concluído · 12 de 12 Aulas
            </span>

            <h2 style="margin:0;font-size:1.45rem;font-weight:900;color:#ffffff;line-height:1.25;">
                Parabéns, ${primeiroNome}!
            </h2>

            <p style="margin:0;font-size:0.88rem;color:#cbd5e1;line-height:1.6;">
                Você finalizou todas as aulas da formação <strong style="color:#ffffff;">Fundamentos do Desenho</strong>! Seu certificado oficial de 12 horas já está liberado e pronto para emissão.
            </p>

            <div style="display:flex;flex-direction:column;gap:0.65rem;width:100%;margin-top:0.5rem;">
                <a href="meu-perfil.html?imprimirCertificado=1" style="display:inline-flex;align-items:center;justify-content:center;gap:8px;width:100%;background:#f39c12;color:#111111;text-decoration:none;border-radius:12px;padding:0.85rem 1.25rem;font-size:0.88rem;font-weight:800;box-sizing:border-box;">
                    <i class="fa-solid fa-print"></i> Emitir Meu Certificado Agora
                </a>
                <button type="button" id="btn-fechar-parabens" style="width:100%;background:#222222;color:#e5e7eb;border:1px solid #333333;border-radius:12px;padding:0.75rem 1.25rem;font-size:0.82rem;font-weight:700;cursor:pointer;">
                    Continuar Revisando as Aulas
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);

    const fechar = () => overlay.remove();
    document.getElementById('btn-fechar-parabens')?.addEventListener('click', fechar);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) fechar();
    });
}

function toggleAulaConcluida() {
    // Bloqueia desmarcação após o curso atingir 100%
    if (cursoEstaConcluido()) {
        return;
    }

    const estavaConcluida = aulasConcluidas.has(aulaAtualId);
    if (estavaConcluida) {
        aulasConcluidas.delete(aulaAtualId);
    } else {
        aulasConcluidas.add(aulaAtualId);

        // Ao atingir 100% (12/12 aulas), dispara notificação e abre o modal de parabéns
        const totalAulas = contarTotalAulas();
        if (usuarioMatriculado && aulasConcluidas.size >= totalAulas) {
            if (window.NankimNotificacoes) {
                window.NankimNotificacoes.adicionar({
                    id: 'curso-concluido-certificado',
                    titulo: 'Parabéns! Curso concluído 100%',
                    mensagem: 'Você finalizou todas as 12 aulas de Fundamentos do Desenho. Seu certificado oficial já está disponível para emissão.',
                    link: 'meu-perfil.html?imprimirCertificado=1',
                    acaoTexto: 'Emitir certificado agora →'
                });
            }
            exibirModalParabensCurso();
        }
    }

    salvarEstado();
    atualizarBotaoConcluir();
    atualizarProgressoGeral();
    renderizarSidebarModulos();
}

function atualizarBotaoConcluir() {
    const isConcluida = aulasConcluidas.has(aulaAtualId);
    const bloqueado100 = cursoEstaConcluido();
    const btn = document.getElementById('btn-concluir');
    const icon = document.getElementById('btn-concluir-icon');
    const texto = document.getElementById('btn-concluir-texto');

    if (!btn || !icon || !texto) return;

    if (bloqueado100) {
        btn.disabled = true;
        btn.className = 'concluida inline-flex items-center justify-center gap-2 bg-nankimGreen text-zinc-950 font-extrabold text-xs sm:text-sm px-5 py-2.5 rounded-lg transition-all cursor-default opacity-95 shadow-md';
        icon.className = 'fa-solid fa-award text-zinc-950 text-base';
        texto.textContent = 'Curso Concluído · 100%';
    } else if (isConcluida) {
        btn.disabled = false;
        btn.className = 'concluida inline-flex items-center justify-center gap-2 bg-nankimGreen text-zinc-950 font-extrabold text-xs sm:text-sm px-5 py-2.5 rounded-lg transition-all cursor-pointer shadow-md';
        icon.className = 'fa-solid fa-circle-check text-zinc-950 text-base';
        texto.textContent = 'Aula Concluída';
    } else {
        btn.disabled = false;
        btn.className = 'inline-flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-lg transition-all cursor-pointer';
        icon.className = 'fa-regular fa-circle-check text-nankimGreen text-base';
        texto.textContent = 'Marcar como Concluída';
    }
}

function atualizarProgressoGeral() {
    const totalAulas = contarTotalAulas();
    const concluidasCount = aulasConcluidas.size;
    const porcentagem = totalAulas > 0 ? Math.round((concluidasCount / totalAulas) * 100) : 0;

    const elemText = document.getElementById('header-percent-text');
    const elemBar = document.getElementById('header-progress-bar');
    const elemCount = document.getElementById('aulas-concluidas-count');

    if (elemText) elemText.textContent = `${porcentagem}%`;
    if (elemBar) elemBar.style.width = `${porcentagem}%`;
    if (elemCount) elemCount.textContent = `${concluidasCount}/${totalAulas} Aulas`;
}

// ==========================================================================
// ABAS, COMENTÁRIOS (PÚBLICO / PRIVADO) E MODAL REPORTAR ERRO
// ==========================================================================
function mudarAba(abaId) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));

    const elemConteudo = document.getElementById(`conteudo-${abaId}`);
    const elemTab = document.getElementById(`tab-${abaId}`);

    if (elemConteudo) elemConteudo.classList.remove('hidden');
    if (elemTab) elemTab.classList.add('active');
}

function selecionarVisibilidadeComentario(modo) {
    visibilidadeComentarioAtual = modo === 'privado' ? 'privado' : 'publico';

    const btnPub = document.getElementById('btn-vis-publico');
    const btnPriv = document.getElementById('btn-vis-privado');
    const aviso = document.getElementById('aviso-visibilidade-comentario');
    const textarea = document.getElementById('input-comentario');
    const textoBtn = document.getElementById('texto-btn-publicar');

    if (btnPub && btnPriv) {
        if (visibilidadeComentarioAtual === 'publico') {
            btnPub.className = 'vis-btn active px-3 py-1.5 rounded-md text-xs font-bold bg-nankimGreen text-zinc-950 border-0 cursor-pointer transition-all flex items-center gap-1.5';
            btnPriv.className = 'vis-btn px-3 py-1.5 rounded-md text-xs font-bold bg-transparent text-gray-400 hover:text-white border-0 cursor-pointer transition-all flex items-center gap-1.5';
        } else {
            btnPriv.className = 'vis-btn active px-3 py-1.5 rounded-md text-xs font-bold bg-nankimGreen text-zinc-950 border-0 cursor-pointer transition-all flex items-center gap-1.5';
            btnPub.className = 'vis-btn px-3 py-1.5 rounded-md text-xs font-bold bg-transparent text-gray-400 hover:text-white border-0 cursor-pointer transition-all flex items-center gap-1.5';
        }
    }

    if (aviso) {
        aviso.innerHTML = visibilidadeComentarioAtual === 'publico'
            ? '<i class="fa-solid fa-globe text-nankimGreen"></i><span>Visível para todos os alunos desta aula e para o instrutor.</span>'
            : '<i class="fa-solid fa-lock text-nankimGreen"></i><span>Mensagem privada: visível apenas para você e para o instrutor.</span>';
    }

    if (textarea) {
        textarea.placeholder = visibilidadeComentarioAtual === 'publico'
            ? 'Escreva sua dúvida pública para a turma e o instrutor...'
            : 'Escreva sua dúvida privada diretamente para o instrutor...';
    }

    if (textoBtn) {
        textoBtn.textContent = visibilidadeComentarioAtual === 'publico'
            ? 'Publicar Comentário'
            : 'Enviar Mensagem Privada';
    }
}

function obterEmailUsuarioLogado() {
    try {
        const s = JSON.parse(sessionStorage.getItem('nankim_sessao'));
        return String(s?.email || '').toLowerCase();
    } catch (_) {
        return '';
    }
}

function renderizarComentarios() {
    const container = document.getElementById('lista-comentarios');
    if (!container) return;

    const emailAtual = obterEmailUsuarioLogado();
    const todos = comentariosPorAula[aulaAtualId] || [];

    const visiveis = todos.filter(c => !c.privado || c.autorEmail === emailAtual || !c.autorEmail);

    if (visiveis.length === 0) {
        container.innerHTML = '<p class="text-xs text-gray-500 italic m-0">Nenhum comentário publicado ainda nesta aula. Seja o primeiro a perguntar!</p>';
        return;
    }

    container.innerHTML = visiveis.map(c => `
        <div class="flex gap-3 p-3.5 rounded-xl ${c.privado ? 'bg-amber-500/5 border border-solid border-amber-500/30' : 'bg-zinc-900/70 border border-solid border-zinc-800/80'}">
            <div class="w-8 h-8 rounded-full ${c.oficial ? 'bg-nankimGreen text-zinc-950' : 'bg-zinc-700 text-gray-200'} font-bold flex items-center justify-center text-xs flex-shrink-0">
                ${c.avatar}
            </div>
            <div class="flex flex-col gap-1 w-full">
                <div class="flex items-center justify-between flex-wrap gap-2">
                    <div class="flex items-center gap-2 flex-wrap">
                        <span class="text-xs font-bold text-white">${c.autor}</span>
                        ${c.oficial ? '<span class="bg-amber-500/20 text-nankimGreen text-[9px] font-bold px-1.5 py-0.5 rounded border border-solid border-amber-500/30">Instrutor</span>' : ''}
                        ${c.privado
                            ? '<span class="bg-zinc-800 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded border border-solid border-amber-500/30 inline-flex items-center gap-1"><i class="fa-solid fa-lock text-[9px]"></i> Privado (Você & Instrutor)</span>'
                            : '<span class="bg-zinc-800/80 text-gray-400 text-[10px] font-semibold px-2 py-0.5 rounded inline-flex items-center gap-1"><i class="fa-solid fa-globe text-[9px]"></i> Público</span>'}
                    </div>
                    <span class="text-[10px] text-gray-500">${c.data}</span>
                </div>
                <p class="text-xs sm:text-sm text-gray-300 mt-0.5 m-0">${c.texto}</p>
            </div>
        </div>
    `).join('');
}

function adicionarComentario() {
    const txtInput = document.getElementById('input-comentario');
    if (!txtInput) return;

    const texto = txtInput.value.trim();
    if (!texto) return;

    if (!comentariosPorAula[aulaAtualId]) {
        comentariosPorAula[aulaAtualId] = [];
    }

    let nomeAutor = 'Você (Aluno)';
    let inicial = 'A';
    let emailAutor = '';
    try {
        const s = JSON.parse(sessionStorage.getItem('nankim_sessao'));
        if (s) {
            if (s.nome) {
                nomeAutor = s.nome;
                inicial = s.nome.charAt(0).toUpperCase();
            }
            emailAutor = String(s.email || '').toLowerCase();
        }
    } catch (_) {}

    comentariosPorAula[aulaAtualId].unshift({
        autor: nomeAutor,
        autorEmail: emailAutor,
        avatar: inicial,
        data: 'Agora mesmo',
        privado: visibilidadeComentarioAtual === 'privado',
        texto
    });

    salvarEstado();
    txtInput.value = '';
    renderizarComentarios();
}

function abrirModalReportarAula() {
    const dados = obterAulaEModulo(aulaAtualId);
    const prefixoAula = dados ? `[Sala de Aula — ${dados.aula.titulo}]: ` : '[Sala de Aula]: ';

    const antigo = document.getElementById('modal-reportar');
    if (antigo) antigo.remove();

    const wrapper = document.createElement('div');
    wrapper.id = 'modal-reportar';
    wrapper.className = 'modal-overlay modal-reportar-overlay ativo';
    wrapper.style.cssText = 'position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,0.78);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;padding:1rem;font-family:"Montserrat",sans-serif;';

    wrapper.innerHTML = `
        <div id="modal-reportar-card" style="background:#141414;border:1px solid #2a2a2a;border-radius:18px;max-width:460px;width:100%;padding:1.65rem;color:#f3f4f6;box-shadow:0 24px 60px rgba(0,0,0,0.75);">
            
            <!-- ESTADO 1: FORMULÁRIO -->
            <div id="reportar-etapa-form">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.1rem;">
                    <h3 style="margin:0;font-size:1.05rem;font-weight:800;color:#fff;display:flex;align-items:center;gap:8px;">
                        <i class="fa-solid fa-flag" style="color:#f39c12;"></i> Reportar Erro na Aula
                    </h3>
                    <button type="button" id="fechar-modal-reportar-sala" style="background:transparent;border:none;color:#9ca3af;font-size:1.4rem;line-height:1;cursor:pointer;">&times;</button>
                </div>

                <form id="form-reportar-sala" style="display:flex;flex-direction:column;gap:0.9rem;">
                    <div>
                        <label style="display:block;font-size:0.72rem;font-weight:700;color:#9ca3af;margin-bottom:0.35rem;text-transform:uppercase;letter-spacing:0.04em;">Tipo de problema</label>
                        <select id="tipo-erro-sala" style="width:100%;background:#1e1e1e;color:#fff;border:1px solid #333;border-radius:10px;padding:0.65rem;font-size:0.85rem;font-family:inherit;">
                            <option value="video">Vídeo não carrega ou está sem áudio</option>
                            <option value="material">Material de apoio ou exercício incorreto</option>
                            <option value="interface">Problema visual ou botão na plataforma</option>
                            <option value="outro">Outro assunto</option>
                        </select>
                    </div>

                    <div>
                        <label style="display:block;font-size:0.72rem;font-weight:700;color:#9ca3af;margin-bottom:0.35rem;text-transform:uppercase;letter-spacing:0.04em;">Descrição do ocorrido</label>
                        <textarea id="desc-erro-sala" rows="4" required style="width:100%;background:#1e1e1e;color:#fff;border:1px solid #333;border-radius:10px;padding:0.7rem;font-size:0.85rem;font-family:inherit;resize:vertical;">${prefixoAula}</textarea>
                    </div>

                    <div style="display:flex;justify-content:flex-end;gap:0.65rem;margin-top:0.25rem;">
                        <button type="button" id="cancelar-reportar-sala" style="background:#262626;color:#d1d5db;border:none;border-radius:10px;padding:0.65rem 1.1rem;font-size:0.82rem;font-weight:700;cursor:pointer;">Cancelar</button>
                        <button type="submit" style="background:#f39c12;color:#111111;border:none;border-radius:10px;padding:0.65rem 1.3rem;font-size:0.82rem;font-weight:800;cursor:pointer;">Enviar Relato</button>
                    </div>
                </form>
            </div>

            <!-- ESTADO 2: CONFIRMAÇÃO VISUAL NO PADRÃO NANKIM -->
            <div id="reportar-etapa-sucesso" style="display:none;flex-direction:column;align-items:center;text-align:center;padding:0.75rem 0.25rem;gap:0.85rem;">
                <div style="width:60px;height:60px;border-radius:50%;background:rgba(243,156,18,0.16);border:1px solid rgba(243,156,18,0.4);color:#f39c12;display:flex;align-items:center;justify-content:center;font-size:1.65rem;">
                    <i class="fa-solid fa-check"></i>
                </div>
                <h3 style="margin:0;font-size:1.15rem;font-weight:800;color:#ffffff;">Relato Enviado!</h3>
                <p style="margin:0;font-size:0.84rem;color:#9ca3af;line-height:1.55;">
                    Obrigado por avisar! Nossa equipe pedagógica e técnica já recebeu sua observação sobre <strong style="color:#f3f4f6;">${dados ? dados.aula.titulo : 'esta aula'}</strong>.
                </p>
                <span id="protocolo-reporte-badge" style="font-size:0.72rem;font-weight:700;color:#f39c12;background:rgba(243,156,18,0.1);border:1px solid rgba(243,156,18,0.25);padding:0.3rem 0.75rem;border-radius:999px;">
                    Protocolo #NK-${Math.floor(1000 + Math.random() * 9000)}
                </span>
                <button type="button" id="concluir-reportar-sala" style="margin-top:0.4rem;width:100%;background:#f39c12;color:#111111;border:none;border-radius:10px;padding:0.7rem 1.2rem;font-size:0.85rem;font-weight:800;cursor:pointer;">
                    Voltar para a Aula
                </button>
            </div>

        </div>
    `;

    document.body.appendChild(wrapper);

    const fechar = () => wrapper.remove();
    document.getElementById('fechar-modal-reportar-sala')?.addEventListener('click', fechar);
    document.getElementById('cancelar-reportar-sala')?.addEventListener('click', fechar);
    document.getElementById('concluir-reportar-sala')?.addEventListener('click', fechar);
    wrapper.addEventListener('click', (e) => {
        if (e.target === wrapper) fechar();
    });

    document.getElementById('form-reportar-sala')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const relatos = JSON.parse(localStorage.getItem('nankim_reportes') || '[]');
        relatos.push({
            aula: aulaAtualId,
            tipo: document.getElementById('tipo-erro-sala')?.value || 'video',
            descricao: document.getElementById('desc-erro-sala')?.value || '',
            data: new Date().toISOString()
        });
        localStorage.setItem('nankim_reportes', JSON.stringify(relatos));

        const etapaForm = document.getElementById('reportar-etapa-form');
        const etapaSucesso = document.getElementById('reportar-etapa-sucesso');
        if (etapaForm) etapaForm.style.display = 'none';
        if (etapaSucesso) etapaSucesso.style.display = 'flex';
    });
}

function configurarEventosDOM() {
    // Eventos do Player Blindado
    const shield = document.getElementById('player-click-shield');
    const btnPlayPause = document.getElementById('ctrl-play-pause');
    const btnRewind = document.getElementById('ctrl-rewind');
    const btnForward = document.getElementById('ctrl-forward');
    const btnMute = document.getElementById('ctrl-mute');
    const selectSpeed = document.getElementById('ctrl-speed');
    const btnFullscreen = document.getElementById('ctrl-fullscreen');
    const timelineBar = document.getElementById('player-timeline-bar');

    if (shield) {
        shield.addEventListener('click', alternarPlayPause);
        shield.addEventListener('dblclick', () => {
            const wrapper = document.getElementById('nankim-player-wrapper');
            if (!wrapper) return;
            if (!document.fullscreenElement) {
                wrapper.requestFullscreen?.();
            } else {
                document.exitFullscreen?.();
            }
        });
    }

    if (btnPlayPause) btnPlayPause.addEventListener('click', alternarPlayPause);

    if (btnRewind) {
        btnRewind.addEventListener('click', () => {
            if (ytPlayer && typeof ytPlayer.getCurrentTime === 'function') {
                ytPlayer.seekTo(Math.max(0, ytPlayer.getCurrentTime() - 10), true);
            }
        });
    }

    if (btnForward) {
        btnForward.addEventListener('click', () => {
            if (ytPlayer && typeof ytPlayer.getCurrentTime === 'function') {
                const dur = ytPlayer.getDuration() || 0;
                ytPlayer.seekTo(Math.min(dur, ytPlayer.getCurrentTime() + 10), true);
            }
        });
    }

    if (btnMute) {
        btnMute.addEventListener('click', () => {
            if (!ytPlayer || typeof ytPlayer.isMuted !== 'function') return;
            const icon = document.getElementById('ctrl-volume-icon');
            if (ytPlayer.isMuted()) {
                ytPlayer.unMute();
                if (icon) icon.className = 'fa-solid fa-volume-high';
            } else {
                ytPlayer.mute();
                if (icon) icon.className = 'fa-solid fa-volume-xmark text-red-400';
            }
        });
    }

    if (selectSpeed) {
        selectSpeed.addEventListener('change', (e) => {
            if (ytPlayer && typeof ytPlayer.setPlaybackRate === 'function') {
                ytPlayer.setPlaybackRate(parseFloat(e.target.value));
            }
        });
    }

    if (btnFullscreen) {
        btnFullscreen.addEventListener('click', () => {
            const wrapper = document.getElementById('nankim-player-wrapper');
            if (!wrapper) return;
            if (!document.fullscreenElement) {
                wrapper.requestFullscreen?.();
            } else {
                document.exitFullscreen?.();
            }
        });
    }

    if (timelineBar) {
        timelineBar.addEventListener('click', (e) => {
            if (!ytPlayer || typeof ytPlayer.getDuration !== 'function') return;
            const rect = timelineBar.getBoundingClientRect();
            const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
            ytPlayer.seekTo(ratio * (ytPlayer.getDuration() || 0), true);
        });
    }

    // Atalho Barra de Espaço para Play/Pause
    document.addEventListener('keydown', (e) => {
        const tag = (e.target.tagName || '').toLowerCase();
        if (e.code === 'Space' && tag !== 'input' && tag !== 'textarea' && tag !== 'select') {
            e.preventDefault();
            alternarPlayPause();
        }
    });

    // Botões da Aula
    document.getElementById('btn-concluir')?.addEventListener('click', toggleAulaConcluida);
    document.getElementById('btn-anterior')?.addEventListener('click', () => navegarAula(-1));
    document.getElementById('btn-proxima')?.addEventListener('click', () => navegarAula(1));
    document.getElementById('btn-reportar-aula')?.addEventListener('click', abrirModalReportarAula);
    document.getElementById('btn-publicar-comentario')?.addEventListener('click', adicionarComentario);
    document.getElementById('btn-vis-publico')?.addEventListener('click', () => selecionarVisibilidadeComentario('publico'));
    document.getElementById('btn-vis-privado')?.addEventListener('click', () => selecionarVisibilidadeComentario('privado'));

    ['visao-geral', 'atividades', 'materiais', 'comentarios'].forEach(aba => {
        document.getElementById(`tab-${aba}`)?.addEventListener('click', () => mudarAba(aba));
    });
}