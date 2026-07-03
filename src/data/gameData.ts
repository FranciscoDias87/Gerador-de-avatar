import { GameLevel } from "../types";

export const GAME_LEVELS: GameLevel[] = [
  {
    id: 1,
    title: "Estrutura HTML do Sistema",
    subtitle: "Passo 1: Criando a Estrutura Básica",
    description: "Para criar o nosso Gerador de Avatares, precisamos primeiro definir o esqueleto da aplicação no arquivo `index.html`. É aqui que criamos o formulário de entrada, a seleção de estilo, e as secções de pré-visualização e histórico.",
    professorTip: "Repare que cada elemento interativo possui um atributo 'id'. Esse ID é fundamental para que, nos passos seguintes, possamos selecionar e controlar esses elementos usando JavaScript!",
    marketTip: "Em aplicações web profissionais, usar IDs descritivos e semânticos (como 'avatar-form' em vez de apenas 'form1') evita bugs e facilita o trabalho em equipa.",
    xpValue: 100,
    codeSnippet: `<!-- index.html -->
<form id="avatar-form">
  <h2>Criar Avatar</h2>
  <input type="text" id="avatar-name" placeholder="Nome do personagem" required>
  <select id="avatar-style">
    <option value="bottts">Robôs</option>
    <option value="adventurer">Aventureiros</option>
    <option value="avataaars">Humanos</option>
    <option value="pixel-art">Pixel Art</option>
  </select>
  <button type="submit" id="submit-btn">Gerar & Guardar</button>
</form>

<div id="avatar-card" class="card">
  <img id="avatar-image" src="https://api.dicebear.com/9.x/bottts/svg?seed=Admin" alt="Preview">
  <h3 id="display-name">Admin</h3>
</div>`
  },
  {
    id: 2,
    title: "O Estilo com CSS Flexbox",
    subtitle: "Passo 2: Organizando Painéis Lado a Lado",
    description: "Com o HTML pronto, tudo fica empilhado verticalmente por padrão. No arquivo `style.css`, aplicamos estilos visuais elegantes e organizamos os painéis lado a lado usando Flexbox no contentor principal (`.container`).",
    professorTip: "O Flexbox revolucionou o alinhamento no CSS! Com regras simples como 'display: flex', podemos criar layouts altamente flexíveis que se adaptam a diferentes tamanhos de tela.",
    marketTip: "Hoje em dia, dominar Flexbox e Grid CSS é requisito básico. Isso garante que a sua aplicação tenha uma experiência agradável tanto no computador quanto no telemóvel.",
    xpValue: 100,
    codeSnippet: `/* style.css */
body {
  background-color: #f1f5f9;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.container {
  display: flex;
  gap: 40px;
  background-color: #fff;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  flex-wrap: wrap;
}`
  },
  {
    id: 3,
    title: "Seleção do DOM e Estado Global",
    subtitle: "Passo 3: Mapeando Elementos e LocalStorage",
    description: "Agora entramos no JavaScript (`app.js`). O primeiro passo é capturar os elementos do HTML pelo ID usando `document.getElementById` e iniciar o nosso array de histórico para armazenar os avatares criados, persistindo-os no navegador.",
    professorTip: "Ao carregar a página, tentamos ler os dados guardados anteriormente do localStorage com 'JSON.parse(localStorage.getItem('savedAvatars'))'. Se não houver nada salvo, começamos com um Array vazio '|| []'.",
    marketTip: "O localStorage é uma ferramenta fantástica para pequenas persistências offline! Ele guarda dados no navegador do utilizador mesmo após fechar a aba.",
    xpValue: 120,
    codeSnippet: `// 1. Seleção de Elementos do DOM
const avatarForm = document.getElementById('avatar-form');
const avatarNameInput = document.getElementById('avatar-name');
const avatarStyleSelect = document.getElementById('avatar-style');
const avatarImage = document.getElementById('avatar-image');
const displayName = document.getElementById('display-name');
const historyContainer = document.getElementById('history-container');
const clearBtn = document.getElementById('clear-btn');

// 2. Estado Global da Aplicação
let avatarsHistory = JSON.parse(localStorage.getItem('savedAvatars')) || [];`
  },
  {
    id: 4,
    title: "Criando Elementos Dinamicamente",
    subtitle: "Passo 4: A Função de Renderizar Histórico",
    description: "Para mostrar os avatares salvos, precisamos de criar elementos HTML de imagem (`<img>`) dinamicamente através do JavaScript. Usaremos `document.createElement('img')` para cada avatar no histórico e vamos adicioná-los ao contentor pai.",
    professorTip: "A função renderHistory limpa o contentor limpando o seu innerHTML antes de desenhar, garantindo que não duplicamos as imagens ao atualizar o ecrã.",
    marketTip: "Manipulação do DOM em Vanilla JS (como createElement e appendChild) é o fundamento que bibliotecas modernas como React e Vue usam por baixo do capô para criar interfaces reativas.",
    xpValue: 150,
    codeSnippet: `// 3. Função para renderizar o histórico no ecrã
function renderHistory() {
  historyContainer.innerHTML = ''; // Limpa antes de desenhar
  avatarsHistory.forEach(function(avatar) {
    // Criar elemento dinamicamente com JS
    const imgElement = document.createElement('img');
    imgElement.src = avatar.url;
    imgElement.title = avatar.name; // Aparece ao passar o rato
    imgElement.classList.add('history-avatar');
    
    // Injetar o elemento filho dentro da Div pai
    historyContainer.appendChild(imgElement);
  });
}`
  },
  {
    id: 5,
    title: "Eventos e Integração Final",
    subtitle: "Passo 5: Intercetando Formulários e Eventos",
    description: "Por fim, vamos dar vida a tudo ligando os escutadores de eventos (`addEventListener`). Vamos gerir o envio do formulário, gerar a URL do avatar usando a API gratuita do DiceBear, salvar no histórico e limpar a lista.",
    professorTip: "No evento do formulário, usamos 'event.preventDefault()' para evitar que a página recarregue. Assim, a experiência do utilizador torna-se fluida e instantânea!",
    marketTip: "A API do DiceBear é amplamente usada em protótipos de jogos e redes sociais para criar avatares aleatórios com base em sementes de texto (seeds).",
    xpValue: 180,
    codeSnippet: `// 4. Evento de Submit (Geração e Gravação)
avatarForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const nameValue = avatarNameInput.value.trim();
  const styleValue = avatarStyleSelect.value;
  const finalUrl = \`https://api.dicebear.com/9.x/\${styleValue}/svg?seed=\${nameValue}\`;
  
  avatarImage.src = finalUrl;
  displayName.textContent = nameValue;
  
  avatarsHistory.push({ name: nameValue, url: finalUrl });
  localStorage.setItem('savedAvatars', JSON.stringify(avatarsHistory));
  renderHistory();
  avatarNameInput.value = '';
});`
  }
];

// Interactive quiz options for Level 1
export interface HtmlAttrChallenge {
  id: string;
  label: string;
  options: string[];
  correct: string;
  selectedValue?: string;
}

export const LEVEL1_CHALLENGES: HtmlAttrChallenge[] = [
  {
    id: "form-id",
    label: "ID do Formulário (<form id='...'>)",
    options: ["avatar-panel", "avatar-form", "avatar-generator", "form-avatar"],
    correct: "avatar-form"
  },
  {
    id: "input-type",
    label: "Tipo do Campo de Texto (<input type='...'>)",
    options: ["submit", "password", "text", "name"],
    correct: "text"
  },
  {
    id: "button-type",
    label: "Tipo do Botão de Envio (<button type='...'>)",
    options: ["button", "submit", "reset", "submit-btn"],
    correct: "submit"
  },
  {
    id: "img-id",
    label: "ID da Imagem do Avatar (<img id='...'>)",
    options: ["avatar-image", "avatar-img", "preview-img", "avatar-card"],
    correct: "avatar-image"
  }
];

// Options for CSS interactive sandbox in Level 2
export const LEVEL2_QUIZ = {
  question: "Qual propriedade CSS no seletor '.container' alinha os painéis (Gerador e Histórico) lado a lado, respeitando as margens?",
  options: [
    "display: block;",
    "display: inline;",
    "display: flex; gap: 40px; flex-wrap: wrap;",
    "float: left; width: 50%;"
  ],
  correct: "display: flex; gap: 40px; flex-wrap: wrap;"
};

// Match terms for Level 3
export interface SelectorMatch {
  variable: string;
  description: string;
  correctSelector: string; // The ID
}

export const LEVEL3_MATCHES: SelectorMatch[] = [
  { variable: "avatarForm", description: "Formulário de criação", correctSelector: "avatar-form" },
  { variable: "avatarNameInput", description: "Input do nome do personagem", correctSelector: "avatar-name" },
  { variable: "avatarStyleSelect", description: "Menu de seleção de estilo", correctSelector: "avatar-style" },
  { variable: "avatarImage", description: "Imagem de pré-visualização", correctSelector: "avatar-image" },
  { variable: "displayName", description: "Título do nome em exibição", correctSelector: "display-name" },
  { variable: "historyContainer", description: "Div contentora do histórico", correctSelector: "history-container" },
  { variable: "clearBtn", description: "Botão de limpar histórico", correctSelector: "clear-btn" }
];

export const LEVEL3_STATE_QUIZ = {
  question: "Qual é a sintaxe JavaScript correta para inicializar o histórico salvando ou resgatando os avatares do localStorage?",
  options: [
    "let avatarsHistory = localStorage.getItem('savedAvatars') || [];",
    "let avatarsHistory = JSON.parse(localStorage.getItem('savedAvatars')) || [];",
    "let avatarsHistory = JSON.stringify(localStorage.getItem('savedAvatars')) || {};",
    "let avatarsHistory = savedAvatars || [];"
  ],
  correct: "let avatarsHistory = JSON.parse(localStorage.getItem('savedAvatars')) || [];"
};

// Level 4 sorting code lines
export interface CodeLineItem {
  id: string;
  code: string;
  hint: string;
  correctIndex: number;
}

export const LEVEL4_CODE_LINES: CodeLineItem[] = [
  {
    id: "line1",
    code: "historyContainer.innerHTML = '';",
    hint: "Limpa o contentor antes de desenhar para evitar duplicações.",
    correctIndex: 0
  },
  {
    id: "line2",
    code: "avatarsHistory.forEach(function(avatar) {",
    hint: "Inicia o ciclo que percorre todos os avatares guardados.",
    correctIndex: 1
  },
  {
    id: "line3",
    code: "const imgElement = document.createElement('img');",
    hint: "Cria um novo elemento HTML de imagem dinamicamente.",
    correctIndex: 2
  },
  {
    id: "line4",
    code: "imgElement.src = avatar.url;",
    hint: "Atribui o link da imagem gerada pela API do DiceBear.",
    correctIndex: 3
  },
  {
    id: "line5",
    code: "imgElement.title = avatar.name;",
    hint: "Adiciona uma dica de texto com o nome ao passar o rato.",
    correctIndex: 4
  },
  {
    id: "line6",
    code: "imgElement.classList.add('history-avatar');",
    hint: "Aplica os estilos CSS definidos no ficheiro style.css.",
    correctIndex: 5
  },
  {
    id: "line7",
    code: "historyContainer.appendChild(imgElement);",
    hint: "Adiciona a nova imagem criada dentro do contentor histórico.",
    correctIndex: 6
  },
  {
    id: "line8",
    code: "});",
    hint: "Fecha o fecho da função callback e do ciclo forEach.",
    correctIndex: 7
  }
];

// Level 5 wiring challenges
export interface EventWiringChallenge {
  id: string;
  eventSource: string;
  eventType: string;
  actionDescription: string;
  correctHandler: string;
}

export const LEVEL5_CHALLENGES: EventWiringChallenge[] = [
  {
    id: "wire1",
    eventSource: "avatarForm",
    eventType: "submit",
    actionDescription: "Prevenir recarregamento, obter valores do formulário, criar URL do avatar, guardar no localStorage e chamar renderHistory()",
    correctHandler: "function(event) { event.preventDefault(); ... }"
  },
  {
    id: "wire2",
    eventSource: "avatarStyleSelect",
    eventType: "change",
    actionDescription: "Atualizar a imagem de pré-visualização instantaneamente quando o utilizador muda o estilo selecionado",
    correctHandler: "function() { const currentName = ...; avatarImage.src = ... }"
  },
  {
    id: "wire3",
    eventSource: "clearBtn",
    eventType: "click",
    actionDescription: "Esvaziar o array de histórico, remover o item 'savedAvatars' do localStorage e atualizar o ecrã",
    correctHandler: "function() { avatarsHistory = []; localStorage.removeItem(...); renderHistory(); }"
  },
  {
    id: "wire4",
    eventSource: "document",
    eventType: "DOMContentLoaded",
    actionDescription: "Disparar a função renderHistory() para listar os avatares guardados assim que a página é carregada",
    correctHandler: "renderHistory"
  }
];
