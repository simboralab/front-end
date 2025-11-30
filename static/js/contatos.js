// Interações da página de contatos
document.addEventListener('DOMContentLoaded', function () {
  const grid = document.getElementById('contatos-grid');
  const filtro = document.getElementById('filtro-equipe');

  if (!grid) return;

  // Filtrar por equipe
  filtro && filtro.addEventListener('change', function (e) {
    const val = e.target.value;
    const cards = grid.querySelectorAll('.contato-card');
    cards.forEach(card => {
      if (val === 'all' || card.dataset.equipe === val) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });


  grid.querySelectorAll('.contato-card').forEach(card => {
    const emailBtn = card.querySelector('button[data-email]');
    const phoneBtn = card.querySelector('button[data-phone]');
    const linkedIn = card.querySelector('a[target]');
    const email = emailBtn ? emailBtn.dataset.email : null;
    const phone = phoneBtn ? phoneBtn.dataset.phone : null;
    const nomeEl = card.querySelector('.contato-info h3');
    const nome = nomeEl ? nomeEl.textContent.trim() : '';

    const roleEl = card.querySelector('.cargo');
    const photoEl = card.querySelector('.contato-foto');
    const linkedinEl = card.querySelector('a[title="LinkedIn"]');
    const role = roleEl ? roleEl.textContent.trim() : '';
    const photo = photoEl ? photoEl.src : '';
    const linkedinHref = linkedinEl ? linkedinEl.href : '';

    if (email || phone) {
      // criar botão unificado
      const uni = document.createElement('button');
      uni.className = 'contato-unificado';
      if (email) uni.dataset.email = email;
      if (phone) uni.dataset.phone = phone;
      if (role) uni.dataset.role = role;
      if (photo) uni.dataset.photo = photo;
      if (linkedinHref) uni.dataset.linkedin = linkedinHref;
      if (nome) uni.dataset.name = nome;
      // arquivo SVG descritivo (fallback/nome do recurso)
      uni.dataset.iconFile = 'static/img/icon-contato-unificado.svg';
      // inserir SVG inline (herda `color` do botão) para permitir troca de cor via CSS
      uni.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <rect x="1.5" y="4" width="15" height="12" rx="2" ry="2" fill="none"></rect>
          <path d="M1.5 6l7.5 5 7.5-5"></path>
          <path d="M21 14c0 0-1.5 2-2.5 2s-2.5-1-2.5-1c-1 0-2 1.5-2 1.5"></path>
          <path d="M18 18c0 1.5-1.5 2-2.5 2S13 19.5 13 18"></path>
        </svg>
      `;

      const acoes = card.querySelector('.contato-acoes');
      if (acoes) {
        if (linkedIn) acoes.insertBefore(uni, linkedIn);
        else acoes.appendChild(uni);
      }

      // remover botões antigos de email/phone
      emailBtn && emailBtn.remove();
      phoneBtn && phoneBtn.remove();

      // definir tooltip para o botão unificado
      uni.setAttribute('data-tooltip', 'Entrar em contato');

      // abrir modal preenchido com os dados do membro
      uni.addEventListener('click', function (ev) {
        ev.stopPropagation();
        // preencher modal
        const memberNameEl = document.getElementById('modal-member-name');
        const memberEmailEl = document.getElementById('modal-member-email');
        const memberPhoneEl = document.getElementById('modal-member-phone');
        const memberRoleEl = document.getElementById('modal-member-role');
        const memberPhotoEl = document.getElementById('modal-member-photo');
        const memberLinkedInEl = document.getElementById('modal-member-linkedin');

        if (memberNameEl) memberNameEl.textContent = uni.dataset.name || '';
        if (memberEmailEl) memberEmailEl.textContent = uni.dataset.email || '—';
        if (memberPhoneEl) memberPhoneEl.textContent = uni.dataset.phone || '—';
        if (memberRoleEl) memberRoleEl.textContent = uni.dataset.role || '';
        if (memberPhotoEl) {
          if (uni.dataset.photo) { memberPhotoEl.src = uni.dataset.photo; memberPhotoEl.alt = uni.dataset.name || 'Foto do membro'; }
          else { memberPhotoEl.src = 'static/img/logo/marca_azul.png'; memberPhotoEl.alt = 'Simbora'; }
        }
        if (memberLinkedInEl) {
          if (uni.dataset.linkedin && uni.dataset.linkedin !== '#') { memberLinkedInEl.href = uni.dataset.linkedin; memberLinkedInEl.style.display = 'inline-block'; }
          else { memberLinkedInEl.href = '#'; memberLinkedInEl.style.display = 'none'; }
        }

        // preparar o formulário do modal: limpar valores e usar placeholders (o usuário preencherá)
        const modalForm = document.querySelector('#modal-contato-form');
        if (modalForm) {
          // reseta qualquer estado anterior
          modalForm.reset();
          if (modalForm.nome) {
            modalForm.nome.value = '';
            modalForm.nome.placeholder = 'Digite seu nome';
          }
          if (modalForm.email) {
            modalForm.email.value = '';
            modalForm.email.placeholder = 'Digite um e‑mail válido';
          }
          if (modalForm.mensagem) {
            modalForm.mensagem.placeholder = 'Escreva sua mensagem';
          }
        }
        // abrir modal
        const modal = document.getElementById('contact-modal');
        if (modal) {
          modal.setAttribute('aria-hidden','false');
          document.body.style.overflow = 'hidden';
        }
      });
    }
    // se existir botão/link do LinkedIn, padronizar tooltip
    if (linkedIn) {
      linkedIn.setAttribute('data-tooltip', 'Ver perfil no LinkedIn');
      // garantir que o ícone herde a cor
      linkedIn.classList.add('contato-btn');
    }
    // caso ainda existam botões de email/phone (antes da criação do uni), adicionar tooltip
    if (emailBtn) emailBtn.setAttribute('data-tooltip', 'Enviar e‑mail');
    if (phoneBtn) phoneBtn.setAttribute('data-tooltip', 'Ligar / copiar número');
  });

  /* ---------- Modal de contato ---------- */
  const abrirModalBtn = document.getElementById('abrir-contato-modal');
  const modal = document.getElementById('contact-modal');
  const modalClose = modal && modal.querySelector('.modal-close');
  const modalForm = modal && modal.querySelector('#modal-contato-form');

  function openModal() {
    if (!modal) return;
    modal.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    if (!modal) return;
    modal.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  }

  if (abrirModalBtn) abrirModalBtn.addEventListener('click', function (e) { e.preventDefault(); openModal(); });
  if (modalClose) modalClose.addEventListener('click', function (e) { e.stopPropagation(); closeModal(); });

  // fechar clicando fora do modal-content
  if (modal) modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(); });

  // fechar com Escape
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });

  if (modalForm) {
    modalForm.addEventListener('submit', function (e) {
      e.preventDefault();
      // aqui você pode enviar via AJAX; por enquanto mostra confirmação simples e fecha
      const nome = modalForm.nome.value || '';
      const email = modalForm.email.value || '';
      showTempTooltip(abrirModalBtn || document.body, 'Solicitação enviada');
      setTimeout(()=> closeModal(), 900);
      // opcional: limpar form
      modalForm.reset();
    });
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).catch(()=>{});
    } else {
      const t = document.createElement('textarea');
      t.value = text; document.body.appendChild(t); t.select();
      try { document.execCommand('copy'); } catch (e) {};
      t.remove();
    }
  }

  function showTempTooltip(target, msg) {
    const tip = document.createElement('div');
    tip.className = 'contato-tooltip';
    tip.textContent = msg;
    document.body.appendChild(tip);
    const rect = target.getBoundingClientRect();
    // centralizar horizontalmente
    tip.style.left = (rect.left + rect.width / 2 - 40) + 'px';
    tip.style.top = (rect.top - 36) + 'px';
    requestAnimationFrame(()=> tip.style.opacity = '1');
    setTimeout(()=>{ tip.style.opacity = '0'; setTimeout(()=> tip.remove(),180); }, 1200);
  }

  /* ---------- Sobreposição GIF (mesmo comportamento do quem-somos) ---------- */
  const cards = grid.querySelectorAll('.contato-card');
  cards.forEach(card => {
    const envoltura = card.querySelector('.envoltura-foto');
    const sobreposicao = card.querySelector('.sobreposicao-gif');
    let carregado = false;

    function mostrar() {
      if (!carregado && sobreposicao && sobreposicao.dataset && sobreposicao.dataset.gif) {
        sobreposicao.src = sobreposicao.dataset.gif;
        carregado = true;
      }
      card.classList.add('mostrando');
    }

    function esconder() {
      card.classList.remove('mostrando');
    }

    if (envoltura) {
      envoltura.addEventListener('mouseenter', mostrar);
      envoltura.addEventListener('mouseleave', esconder);
      envoltura.addEventListener('focus', mostrar);
      envoltura.addEventListener('blur', esconder);

      envoltura.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (card.classList.contains('mostrando')) esconder(); else mostrar();
        }
      });
    }
  });
});
