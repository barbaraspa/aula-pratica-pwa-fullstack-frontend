# 🎵 Cadastro de Músicas - Frontend

Uma interface web leve, moderna e responsiva desenvolvida em HTML5, CSS3 e JavaScript puro (Vanilla JS) para consumo de uma API REST de gerenciamento de catálogo musical. A aplicação conta com suporte a **PWA (Progressive Web App)**, permitindo instalação local e experiência mobile nativa.

---

## 🎨 Layout e Visual

O design foi construído focado em usabilidade e simplicidade:
- **Paleta de Cores:** Tons de roxo (`#5b2c90` e `#431f6e`) para uma estética temática musical.
- **Responsividade:** Layout em Grid/Flexbox adaptável para telas desktop, tablets e smartphones.
- **PWA Ready:** Inclui suporte a `manifest.json` e `sw.js` para instalação em dispositivos móveis e desktop.

---

## 🛠️ Tecnologias Utilizadas

- **HTML5:** Estrutura semântica do formulário e cartões de exibição.
- **CSS3:** Variáveis CSS, CSS Grid, Flexbox e componentes estilizados em tons de roxo.
- **JavaScript (ES6+):** Manipulação dinâmica do DOM, consumo de API assíncrona (`fetch`/`async`/`await`) e registro de Service Worker.
- **PWA (Progressive Web App):** Manifesto e suporte a ícones para instalação como app.

---

## 🚀 Funcionalidades

- 📌 **Listar Músicas:** Exibição dinâmica em cards contendo Título, Artista/Banda, Ano, Gênero e ID.
- ➕ **Cadastrar Música:** Formulário com validação simples para inclusão de novos itens.
- ✏️ **Editar Música:** Preenchimento automático do formulário ao selecionar uma música para atualização.
- 🗑️ **Excluir Música:** Confirmação e remoção de registros do banco de dados.
- 🔍 **Buscar por ID:** Filtro rápido para consultar uma música específica pelo identificador do MongoDB.
- 📱 **Instalação PWA:** Opção de adicionar o app à tela inicial do celular ou desktop.

---

## 💻 Como Rodar o Projeto Localmente

### Pré-requisitos
- Um navegador web atualizado (Chrome, Edge, Firefox, Brave, etc.).
- Servidor Backend da API rodando localmente (geralmente em `http://localhost:3000/musicas`).

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/SEU_USUARIO/musicas-frontend.git](https://github.com/SEU_USUARIO/musicas-frontend.git)