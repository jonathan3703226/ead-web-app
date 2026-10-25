# EAD — Plataforma de Artes Visuais 🎨

<div align="center">
  <img src="https://img.shields.io/badge/HTML5-SEMÂNTICO-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/CSS3-RESPONSIVO-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/JavaScript-VANILLA_ES6-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/Mobile--First-DESIGN-purple?style=for-the-badge" alt="Mobile First" />
  <img src="https://img.shields.io/badge/Status-Em_Desenvolvimento-yellow?style=for-the-badge" alt="Status" />
</div>

Aplicação web responsiva desenvolvida como MVP para a **Nankim**, uma escola de cursos online focada em artes visuais. O foco arquitetural do projeto foi a construção de uma interface fluida, modular e acessível, utilizando JavaScript puro (Vanilla JS) para a renderização dinâmica de componentes e controle de interatividade.

> Uma solução front-end criada para simular a experiência real de uma plataforma EAD, combinando boas práticas de UI/UX, arquitetura escalável e conformidade com diretrizes de privacidade de dados.

🔗 **[Acesse a aplicação em produção aqui](https://jonathan3703226.github.io/ead-web-app/)**

---

## 🚀 O Projeto & Estudo de Caso

A **Nankim EAD** foi projetada para resolver o desafio de entregar uma experiência de navegação rica e moderna em dispositivos móveis e desktops sem o peso de frameworks front-end. 

O projeto priorizou a **reutilização de código e a modularidade**, utilizando JavaScript para injetar componentes globais (como cabeçalhos e rodapés) de forma dinâmica, evitando a duplicação de estruturas HTML entre as páginas.

### 🎯 Diferenciais Técnicos & Usabilidade:

*   **Arquitetura Modular:** Renderização dinâmica de componentes reutilizáveis via Vanilla JS, reduzindo a redundância do código-fonte.
*   **Abordagem Mobile-First:** Design planejado primariamente para telas menores, garantindo adaptação perfeita e performance em qualquer resolução.
*   **Modais & Interatividade:** Janelas modais customizadas para checkout, login/autenticação e detalhes de cursos, eliminando dependências de bibliotecas externas.
*   **Validação de Formulários:** Sistema de checagem de dados client-side para evitar submissões incorretas e melhorar o feedback ao usuário.
*   **Conformidade com a LGPD:** Gerenciamento e persistência do consentimento de cookies do usuário utilizando `localStorage`.

---

## ✨ Funcionalidades (Features)

*   **Catálogo de Cursos:** Apresentação visual detalhada das modalidades de artes visuais.
*   **Modais de Interação:** Modais para autenticação de usuário e simulação de checkout.
*   **Banner de Consentimento de Cookies:** Notificação customizada de privacidade alinhada às diretrizes da LGPD com salvamento de estado local.
*   **Navegação Adaptativa:** Menu e componentes inteiramente responsivos otimizados para toque e ponteiro.
*   **Galeria ampliável:** Lightbox acessível para visualizar as imagens da home em tela cheia.
*   **Área do Aluno:** Painel de cursos, retomada da última aula e progresso persistido no navegador.
*   **Cadastro e checkout separados:** Cadastro sem matrícula não libera aulas; a etapa de assinatura oferece PIX, boleto e cartão.

### Limites da demonstração front-end

O projeto não possui servidor, banco de dados ou integração com um gateway de pagamentos. Cadastro, sessão, matrícula e progresso são armazenados no navegador (`localStorage`/`sessionStorage`) apenas para demonstração e podem ser alterados pelo próprio usuário. O checkout não realiza cobranças: a confirmação ativa uma matrícula simulada. Não use dados reais de cartão.

Para produção, a autenticação, a autorização da Área do Aluno e a confirmação de pagamentos precisam ser implementadas em um backend confiável, com um provedor de pagamentos e tratamento seguro de dados pessoais. O formulário de contato prepara uma mensagem para `nankimartschool@gmail.com` no aplicativo de e-mail do visitante.

---

## 🛠️ Tecnologias Utilizadas (Stack)

*   **HTML5:** Estruturação semântica avançada com tags específicas e foco em acessibilidade.
*   **CSS3:** Layouts baseados em Flexbox e CSS Grid, uso de variáveis globais e Media Queries para responsividade.
*   **JavaScript (ES6+):**
    *   Manipulação dinâmica do DOM para injeção de componentes.
    *   Gerenciamento de eventos e modais de interface.
    *   Persistência de dados leve via `localStorage`.
*   **Git & GitHub:** Versionamento de código e deploy automatizado via GitHub Pages.

---

## ⚙️ Como Executar Localmente

1. Clone este repositório:
   ```bash
   git clone [https://github.com/jonathan3703226/ead-web-app.git](https://github.com/jonathan3703226/ead-web-app.git)
## ⚙️ Como Executar Localmente

Por realizar requisições assíncronas (`fetch()`) para carregar o arquivo JSON, é necessário rodar o projeto através de um servidor HTTP local para evitar bloqueios de política de CORS do navegador.

1. Clone este repositório:

   ```bash
   git clone https://github.com/jonathan3703226/ead-web-app.git
   
2. Abra a pasta do projeto na sua IDE de preferência (ex: VS Code).

3. Inicie um servidor local. Recomendamos a extensão Live Server do VS Code (porta padrão 5500).

4. O navegador abrirá automaticamente a aplicação.


 Conecte-se comigo no 🔗 **[LinkedIn](https://www.linkedin.com/in/jonathan-oliveira-ads/)**
