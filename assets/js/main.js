// Elementos do DOM
const messageInput = document.getElementById('message-input');
const chatContainer = document.getElementById('chat-container');

// Função para auto-redimensionar o textarea
function autoResize(element) {
  element.style.height = 'auto';
  element.style.height = element.scrollHeight + 'px';
}

// Função para adicionar mensagem ao chat
function addMessage(content, isUser = false) {
  const messageDiv = document.createElement('div');
  messageDiv.className = 'message';

  const avatar = document.createElement('div');
  avatar.className = 'avatar' + (isUser ? ' user-avatar' : '');
  avatar.textContent = isUser ? 'U' : 'AI';

  const messageContent = document.createElement('div');
  messageContent.className = 'message-content';
  messageContent.textContent = content;

  messageDiv.appendChild(avatar);
  messageDiv.appendChild(messageContent);
  chatContainer.appendChild(messageDiv);

  chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Função para adicionar indicador de digitação
function addTypingIndicator() {
  const typingDiv = document.createElement('div');
  typingDiv.className = 'message';
  typingDiv.id = 'typing-indicator';

  const avatar = document.createElement('div');
  avatar.className = 'avatar';
  avatar.textContent = 'AI';

  const typingContent = document.createElement('div');
  typingContent.className = 'typing-indicator';
  typingContent.innerHTML = `
    <span>Digitando</span>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
  `;

  typingDiv.appendChild(avatar);
  typingDiv.appendChild(typingContent);
  chatContainer.appendChild(typingDiv);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Função para remover indicador de digitação
function removeTypingIndicator() {
  const indicator = document.getElementById('typing-indicator');
  if (indicator) {
    indicator.remove();
  }
}

// Função para enviar mensagem
function sendMessage() {
  const message = messageInput.value.trim();

  if (message) {
    addMessage(message, true);
    messageInput.value = '';
    autoResize(messageInput);

    addTypingIndicator();

    setTimeout(() => {
      removeTypingIndicator();
      const responses = [
        "Entendi sua questão. Poderia me dar mais detalhes?",
        "Interessante perspectiva. Vamos explorar isso mais a fundo?",
        "Compreendo seu ponto. Aqui está uma análise inicial...",
        "Baseado no que você disse, posso sugerir algumas abordagens.",
        "Excelente pergunta. Vamos analisar isso em detalhes."
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      addMessage(randomResponse, false);
    }, 2000);
  }
}

// Função para iniciar nova conversa
function startNewChat() {
  chatContainer.innerHTML = '';
  addMessage("Olá! Como posso ajudar você hoje?", false);
}

// Event Listeners
messageInput.addEventListener('input', function() {
  autoResize(this);
});

messageInput.addEventListener('keydown', function(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

// Inicialização
autoResize(messageInput);
