// Estado da confirmação
let confirmado = false;
let confirmadosAtual = 7;
const confirmadosTotal = 10;

function confirmarPresenca() {
  if (confirmado) {
    // Se já confirmado, vai direto para o WhatsApp
    acessarGrupoWhatsApp();
    return;
  }

  // Em produção, isso seria uma chamada ao backend:
  // fetch('/api/eventos/confirmar-presenca', {
  //   method: 'POST',
  //   body: JSON.stringify({ eventoId: '123', usuarioId: '456' })
  // }).then(() => {
  //   // Após confirmação bem-sucedida, obtém o link do WhatsApp
  //   return obterLinkWhatsApp();
  // }).then(link => {
  //   whatsappGroupLink = link;
  //   confirmado = true;
  //   atualizarUIConfirmacao();
  //   mostrarModal();
  // });

  // Simulação local (para desenvolvimento)
  confirmado = true;
  confirmadosAtual = 8;
  
  // Obtém o link do WhatsApp após confirmação
  whatsappGroupLink = obterLinkWhatsApp();

  // Atualiza a UI
  atualizarUIConfirmacao();

  // Mostra o modal de confirmação
  mostrarModal();
}

function atualizarUIConfirmacao() {
  const btnConfirmar = document.getElementById('btn-confirmar');
  const confirmadosText = document.getElementById('confirmados-text');
  const progressFill = document.getElementById('progress-bar-fill');
  const btnWhatsApp = document.getElementById('btn-whatsapp-group');
  const buttonsContainer = document.getElementById('buttons-container');
  
  if (!btnConfirmar || !confirmadosText || !progressFill) return;
  
  // Muda o botão principal
  btnConfirmar.textContent = 'NO ROLÊ!';
  btnConfirmar.classList.remove('btn-main');
  btnConfirmar.classList.add('btn-confirmado');
  btnConfirmar.onclick = acessarGrupoWhatsApp;

  // Revela o botão do WhatsApp (link protegido)
  if (btnWhatsApp) {
    btnWhatsApp.style.display = 'flex';
  }
  if (buttonsContainer) {
    buttonsContainer.style.flexWrap = 'wrap';
  }

  // Atualiza o texto de confirmados
  const faltam = confirmadosTotal - confirmadosAtual;
  confirmadosText.textContent = `${confirmadosAtual}/${confirmadosTotal} confirmados${faltam > 0 ? ` — Faltam ${faltam}!` : ' — Rolê completo!'}`;

  // Atualiza a barra de progresso
  const porcentagem = (confirmadosAtual / confirmadosTotal) * 100;
  progressFill.style.width = `${porcentagem}%`;
}

function mostrarModal() {
  const modal = document.getElementById('modal-confirmacao');
  if (modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Previne scroll
  }
}

function fecharModal() {
  const modal = document.getElementById('modal-confirmacao');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restaura scroll
  }
}

// Link do grupo WhatsApp (protegido - só revelado após confirmação)
// Em produção, isso viria do backend após verificar que o usuário confirmou
// O link NÃO deve estar visível no HTML antes da confirmação
let whatsappGroupLink = null; // Inicialmente null (protegido)

// Função para obter o link do WhatsApp (simula chamada ao backend)
function obterLinkWhatsApp() {
  // Em produção, isso seria uma chamada ao backend:
  // return fetch('/api/eventos/obter-link-whatsapp?eventoId=123&usuarioId=456')
  //   .then(res => res.json())
  //   .then(data => data.link);
  
  // Por enquanto, retorna o link após confirmação
  // O link real viria do backend após verificar a confirmação
  return 'https://chat.whatsapp.com/EXEMPLO123456789';
}

function acessarGrupoWhatsApp() {
  // Verifica se o usuário confirmou presença
  if (!confirmado) {
    alert('Você precisa confirmar presença primeiro!');
    return;
  }
  
  // Verifica se já temos o link
  if (!whatsappGroupLink) {
    // Obtém o link do backend (simulado)
    whatsappGroupLink = obterLinkWhatsApp();
  }
  
  // Fecha o modal se estiver aberto
  fecharModal();
  
  // Abre o grupo do WhatsApp em nova aba
  window.open(whatsappGroupLink, '_blank', 'noopener,noreferrer');
  
  // Em produção, registra o acesso no backend para analytics
  // fetch('/api/eventos/registrar-acesso-whatsapp', {
  //   method: 'POST',
  //   body: JSON.stringify({ eventoId: '123', usuarioId: '456' })
  // });
}

function irParaChat() {
  // Redireciona para o grupo WhatsApp
  acessarGrupoWhatsApp();
}

function convidarAmigos() {
  // Fecha o modal se estiver aberto
  fecharModal();
  
  // Scroll suave até a seção de compartilhamento
  const compartilharSection = document.querySelector('.compartilhar');
  if (compartilharSection) {
    compartilharSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function mostrarGaleraCompleta() {
  // Implementar lógica para mostrar lista completa de participantes
  // Pode abrir um modal ou scrollar para seção completa
  console.log('Mostrar galera completa');
  // Exemplo: scroll suave para seção completa (se existir)
  // document.querySelector('.galera-completa')?.scrollIntoView({ behavior: 'smooth' });
}

// Fecha modal ao clicar fora dele
window.onclick = function(event) {
  const modal = document.getElementById('modal-confirmacao');
  if (event.target === modal) {
    fecharModal();
  }
}

function copiarLink() {
  const url = window.location.href;
  navigator.clipboard.writeText(url).then(() => {
    alert('Link copiado para a área de transferência!');
  }).catch(() => {
    // Fallback para navegadores mais antigos
    const textArea = document.createElement('textarea');
    textArea.value = url;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    alert('Link copiado para a área de transferência!');
  });
}

function compartilharFacebook() {
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent('Festival de Fim de Ano - Praia de Boa Viagem');
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`, '_blank', 'width=600,height=400');
}

