document.addEventListener('DOMContentLoaded', () => {
  // Upload de imagem: perfil e capa (pré-visualização)
  const profileInput = document.getElementById('file-input-profile');
  const coverInput = document.getElementById('file-input-cover');
  const profileImg = document.getElementById('profile-picture');
  const coverImg = document.getElementById('cover-photo');

  function handleImageUpload(inputEl, imgEl) {
    inputEl.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        imgEl.src = event.target.result;
        imgEl.style.display = 'block';
      };
      reader.readAsDataURL(file);
    });
  }

  handleImageUpload(profileInput, profileImg);
  handleImageUpload(coverInput, coverImg);

  // Botões de ação
  const btnSave = document.querySelector('.button-row .save-button');
  const btnPublish = document.querySelector('.button-row .publish');
  const notification = document.getElementById('notification');

  function collectFormData() {
    return {
      titulo: document.getElementById('titulo')?.value || '',
      autor: document.getElementById('autor')?.value || '',
      bio: document.getElementById('bio')?.value || '',
      descricao: document.getElementById('descricao')?.value || '',
      palavrasChave: keywords.join(', '),
      categoria: document.getElementById('categoria')?.value || '',
      editora: document.getElementById('editora')?.value || '',
      profilePicture: profileImg.src,
      coverPhoto: coverImg.src,
      preco: precoInput.value
    };
  }

  function showNotification(text = 'Ação realizada com sucesso!') {
    notification.querySelector('span').textContent = text;
    notification.style.display = 'flex';
    setTimeout(() => notification.style.display = 'none', 3000);
  }

  btnSave.addEventListener('click', (e) => {
    e.preventDefault();
    const data = collectFormData();
    console.log('Draft salvo:', data);
    showNotification('Rascunho salvo com sucesso!');
  });

  btnPublish.addEventListener('click', (e) => {
    e.preventDefault();
    const data = collectFormData();
    console.log('Livro publicado:', data);
    showNotification('Livro publicado com sucesso!');
  });

  // Focar campo por ícone
  window.focusField = function (fieldId) {
    const el = document.getElementById(fieldId);
    if (el) el.focus();
  };

  // Sidebar toggle
  const sidebar = document.getElementById('sidebar');
  const toggleBtn = document.getElementById('toggleBtn');

  toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('active');
  });

  function adjustSidebar() {
    if (window.innerWidth > 1024) {
      sidebar.classList.add('collapsed');
    } else {
      sidebar.classList.remove('collapsed');
    }
  }

  adjustSidebar();
  window.addEventListener('resize', adjustSidebar);

  sidebar.addEventListener('mouseenter', () => {
    if (window.innerWidth > 1024) sidebar.classList.remove('collapsed');
  });
  sidebar.addEventListener('mouseleave', () => {
    if (window.innerWidth > 1024) sidebar.classList.add('collapsed');
  });

  document.querySelectorAll('.sidebar-menu li a').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('.sidebar-menu li a').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      if (window.innerWidth <= 1024) sidebar.classList.remove('active');
    });
  });

  // Bloqueio de zoom
  document.addEventListener('gesturestart', e => e.preventDefault());
  document.addEventListener('wheel', e => {
    if (e.ctrlKey) e.preventDefault();
  }, { passive: false });

  // TAGS
  const input = document.getElementById('palavras-chave');
  const tagInput = document.getElementById('tag-input');
  const keywords = [];

  input.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      const value = input.value.trim();
      if (value && !keywords.includes(value)) {
        keywords.push(value);
        createTag(value);
        input.value = '';

        if (keywords.length === 1) {
          input.removeAttribute('placeholder');
        }
      }
    }
  });

  function createTag(text) {
    const tag = document.createElement('span');
    tag.className = 'tag';
    tag.textContent = text;

    const remove = document.createElement('span');
    remove.className = 'remove-tag';
    remove.innerHTML = '&times;';
    remove.onclick = function () {
      tagInput.removeChild(tag);
      const index = keywords.indexOf(text);
      if (index > -1) keywords.splice(index, 1);
      if (keywords.length === 0) input.setAttribute('placeholder', 'Digite e pressione Enter');
    };

    tag.appendChild(remove);
    tagInput.insertBefore(tag, input);
  }

  // Upload de imagens
  const capaInput = document.getElementById('upload-capa');
  const capaNome = document.getElementById('file-name-capa');

  capaInput.addEventListener('change', function () {
    const file = capaInput.files[0];
    if (file && file.type.startsWith('image/')) {
      capaNome.textContent = `Selecionado: ${file.name}`;
    } else {
      capaNome.textContent = '';
    }
  });

  const imagensInput = document.getElementById('upload-imagens');
  const imagensLista = document.getElementById('file-list');

  imagensInput.addEventListener('change', function () {
    const files = Array.from(imagensInput.files);
    if (files.length > 0) {
      const nomes = files
        .filter(file => file.type.startsWith('image/'))
        .map(file => file.name)
        .join('<br>');
      imagensLista.innerHTML = `Selecionado(s):<br>${nomes}`;
    } else {
      imagensLista.innerHTML = '';
    }
  });

  // Campo de preço com formatação
  const precoInput = document.querySelector('input[name="preco"]');

  precoInput.addEventListener('input', () => {
    let value = precoInput.value.replace(/\D/g, '');
    if (value.length < 3) {
      value = value.padStart(3, '0');
    }

    const reais = value.slice(0, -2);
    const centavos = value.slice(-2);
    precoInput.value = `R$ ${parseInt(reais)},${centavos}`;
  });

});