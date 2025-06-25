document.addEventListener('DOMContentLoaded', () => {
  const btnSave = document.querySelector('.button-row .save-button');
  const btnPublish = document.querySelector('.button-row .publish');
  const precoInput = document.querySelector('input[name="preco"]');
  const tituloInput = document.getElementById('titulo');
  const autorInput = document.getElementById('autor');
  const descricaoInput = document.getElementById('descricao');
  const categoriaInput = document.getElementById('categoria');
  const editoraInput = document.getElementById('editora');
  const tagInput = document.getElementById('tag-input');
  const palavraChaveInput = document.getElementById('palavras-chave');
  const termosCheckbox = document.querySelector('input[name="aceite"]');
  const capaInput = document.getElementById('upload-capa');
  const capaIcon = document.querySelector('label[for="upload-capa"] .upload-icon');
  const capaMensagem = document.querySelector('label[for="upload-capa"] .upload-message');
  const capaNome = document.getElementById('file-name-capa');
  const imagensInput = document.getElementById('upload-imagens');
  const imagensLista = document.getElementById('file-list');
  const imagensIcon = document.querySelector('label[for="upload-imagens"] .upload-icon');
  const imagensMensagem = document.querySelector('label[for="upload-imagens"] .upload-message');
  const uploadBox = document.querySelector('.upload-box');

  const keywords = [];

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
      if (keywords.length === 0) palavraChaveInput.setAttribute('placeholder', 'Digite e pressione Enter');
    };

    tag.appendChild(remove);
    tagInput.insertBefore(tag, palavraChaveInput);
  }

  palavraChaveInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      const value = palavraChaveInput.value.trim();
      if (value && !keywords.includes(value)) {
        keywords.push(value);
        createTag(value);
        palavraChaveInput.value = '';
        if (keywords.length === 1) palavraChaveInput.removeAttribute('placeholder');
      }
    }
  });

  function collectFormData() {
    return {
      título: tituloInput?.value.trim() || '',
      autor: autorInput?.value.trim() || '',
      descrição: descricaoInput?.value.trim() || '',
      palavrasChave: keywords.join(', '),
      categoria: categoriaInput?.value.trim() || '',
      editora: editoraInput?.value.trim() || '',
      preço: precoInput?.value.trim() || ''
    };
  }

  function isFormValid(data) {
    const camposObrigatorios = {
      título: tituloInput,
      autor: autorInput,
      descrição: descricaoInput,
      palavrasChave: palavraChaveInput,
      categoria: categoriaInput,
      editora: editoraInput,
      preço: precoInput
    };

    let isValid = true;

    for (const key in camposObrigatorios) {
      const input = camposObrigatorios[key];
      const valor = data[key];
      if (!valor || valor === '' || valor === 'R$ NaN,NaN') {
        input.classList.add('invalid');
        isValid = false;
      } else {
        input.classList.remove('invalid');
      }
    }

    return isValid;
  }

  function clearForm() {
    tituloInput.value = '';
    autorInput.value = '';
    descricaoInput.value = '';
    categoriaInput.value = '';
    editoraInput.value = '';
    precoInput.value = '';
    palavraChaveInput.value = '';
    palavraChaveInput.setAttribute('placeholder', 'Digite e pressione Enter');
    keywords.length = 0;
    document.querySelectorAll('#tag-input .tag').forEach(tag => tag.remove());
    capaInput.value = '';
    capaIcon.src = 'img/download_100dp_767676_FILL0_wght400_GRAD0_opsz48.png';
    capaIcon.style.objectFit = 'contain';
    capaIcon.style.width = '';
    capaIcon.style.height = '';
    capaMensagem.style.display = 'inline';
    capaNome.textContent = '';
    imagensInput.value = '';
    imagensLista.innerHTML = '';
    imagensIcon.src = 'img/photo_library_60dp_767676_FILL0_wght400_GRAD0_opsz48.png';
    imagensIcon.style.objectFit = 'contain';
    imagensIcon.style.width = '';
    imagensIcon.style.height = '';
    imagensMensagem.style.display = 'inline';
    termosCheckbox.checked = false;
  }

  function showNotification(message, type = 'sucesso') {
    const existing = document.getElementById('notification-box');
    if (existing) existing.remove();

    const box = document.createElement('div');
    box.id = 'notification-box';

    let icon = '✅';

    if (type === 'erro') {
      icon = '⚠️';
      box.classList.add('erro');
    }

    box.style.position = 'fixed';
    box.style.top = '20px';
    box.style.right = '20px';
    box.style.padding = '16px';
    box.style.borderLeft = '6px solid';
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
      <div class="message">${message}</div>
    `;

    document.body.appendChild(box);

    setTimeout(() => {
      box.style.opacity = '0';
      box.style.transform = 'translateY(-80%)';
      setTimeout(() => box.remove(), 400);
    }, 4000);
  }

  btnSave.addEventListener('click', (e) => {
    e.preventDefault();
    const data = collectFormData();
    console.log('📄 Rascunho salvo:');
    console.table(data);
    showNotification('Rascunho salvo com sucesso!');
  });

  btnPublish.addEventListener('click', (e) => {
    e.preventDefault();
    const data = collectFormData();

    if (!termosCheckbox.checked) {
      showNotification('⚠️ Você precisa aceitar os termos de publicação.', 'erro');
      return;
    }

    if (!isFormValid(data)) {
      showNotification('⚠️ Preencha todos os campos obrigatórios.', 'erro');
      return;
    }

    console.log('📚 Livro publicado com os dados:');
    console.table(data);
    clearForm();
    showNotification('📚 Livro publicado com sucesso!', 'sucesso', true);
  });

  precoInput?.addEventListener('input', () => {
    let value = precoInput.value.replace(/\D/g, '');
    if (value.length < 3) value = value.padStart(3, '0');
    const reais = value.slice(0, -2);
    const centavos = value.slice(-2);
    precoInput.value = `R$ ${parseInt(reais)},${centavos}`;
  });

  capaInput.addEventListener('change', function () {
    const file = capaInput.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = function (e) {
        capaIcon.src = e.target.result;
        capaIcon.style.objectFit = 'cover';
        capaIcon.style.width = '100%';
        capaIcon.style.height = '160px';
        capaMensagem.style.display = 'none';
      };
      reader.readAsDataURL(file);
      capaNome.textContent = `Selecionado: ${file.name}`;
    } else {
      capaIcon.src = 'img/download_100dp_767676_FILL0_wght400_GRAD0_opsz48.png';
      capaMensagem.style.display = 'inline';
      capaNome.textContent = '';
    }
  });

  imagensInput.addEventListener('change', function () {
    const files = Array.from(imagensInput.files).filter(f => f.type.startsWith('image/'));
    if (files.length > 0) {
      imagensMensagem.style.display = 'none';

      const reader = new FileReader();
      reader.onload = function (e) {
        imagensIcon.src = e.target.result;
        imagensIcon.style.objectFit = 'cover';
        imagensIcon.style.width = '100%';
        imagensIcon.style.height = '160px';
      };
      reader.readAsDataURL(files[0]);

      // Mostrar nomes clicáveis dentro do file-list
      imagensLista.innerHTML = ''; // limpa antes
      files.forEach((file, index) => {
        const nameEl = document.createElement('div');
        nameEl.textContent = file.name;
        nameEl.style.cursor = 'pointer';
        nameEl.style.marginTop = '4px';
        nameEl.style.color = '#a5572a';
        nameEl.style.textDecoration = 'underline';
        nameEl.title = 'Clique para visualizar';
        nameEl.addEventListener('click', () => {
          const reader = new FileReader();
          reader.onload = (event) => {
            imagensIcon.src = event.target.result;
          };
          reader.readAsDataURL(file);
        });
        imagensLista.appendChild(nameEl);
      });
    } else {
      imagensIcon.src = 'img/photo_library_60dp_767676_FILL0_wght400_GRAD0_opsz48.png';
      imagensMensagem.style.display = 'inline';
      imagensLista.textContent = '';
    }
  });
});
