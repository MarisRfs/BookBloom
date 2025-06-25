document.addEventListener('DOMContentLoaded', () => {
  const searchContainer = document.querySelector('.search-container');
  const searchButton = document.querySelector('.search-button');
  const searchInput = document.querySelector('.search-input');
  const searchError = document.getElementById('searchError');

  let errorTimeoutId;

  // TOAST: Notificação estilo "toast" com ícone
  function showNotification(message, type = 'sucesso') {
    const existing = document.getElementById('notification-box');
    if (existing) existing.remove();

    const box = document.createElement('div');
    box.id = 'notification-box';

    let icon = '✅';
    let textColor = '#065f46';
    let bgColor = '#ecfdf5';
    let borderColor = '#10b981';

    if (type === 'erro') {
      icon = '⚠️';
      textColor = '#b91c1c';
      bgColor = '#fef2f2';
      borderColor = '#ef4444';
    }

    box.style.position = 'fixed';
    box.style.top = '20px';
    box.style.right = '20px';
    box.style.padding = '16px';
    box.style.backgroundColor = bgColor;
    box.style.borderLeft = `6px solid ${borderColor}`;
    box.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
    box.style.zIndex = '1000';
    box.style.display = 'flex';
    box.style.alignItems = 'center';
    box.style.gap = '10px';
    box.style.borderRadius = '8px';
    box.style.transition = 'all 0.4s ease';
    box.style.opacity = '1';
    box.style.transform = 'translateY(0)';

    box.innerHTML = `
      <div class="icon">${icon}</div>
      <div class="message" style="color: ${textColor}; font-weight: 500">${message}</div>
    `;

    document.body.appendChild(box);

    setTimeout(() => {
      box.style.opacity = '0';
      box.style.transform = 'translateY(-80%)';
      setTimeout(() => box.remove(), 400);
    }, 4000);
  }

  function showSearchError() {
    searchError.classList.add('show-error');
    searchInput.classList.add('input-border');
    showNotification('Por favor, preencha o campo de pesquisa.', 'erro');

    clearTimeout(errorTimeoutId);
    errorTimeoutId = setTimeout(() => {
      hideSearchError();
    }, 5000);
  }

  function hideSearchError() {
    searchError.classList.remove('show-error');
    searchInput.classList.remove('input-border');
    clearTimeout(errorTimeoutId);
  }

  searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    const isActive = searchContainer.classList.contains('active');
    const query = searchInput.value.trim();

    if (!isActive) {
      searchContainer.classList.add('active');
      searchInput.focus();
      hideSearchError();
    } else {
      if (query === '') {
        showSearchError();
        searchContainer.classList.remove('active');
        searchInput.value = '';
      } else {
        hideSearchError();
        window.location.href = `resultado-pesquisa.html?q=${encodeURIComponent(query)}`;
      }
    }
  });

  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const query = searchInput.value.trim();

      if (query === '') {
        showSearchError();
      } else {
        hideSearchError();
        window.location.href = `resultado-pesquisa.html?q=${encodeURIComponent(query)}`;
      }
    }
  });

  searchInput.addEventListener('input', () => {
    if (searchInput.value.trim() !== '') {
      hideSearchError();
    }
  });
});
