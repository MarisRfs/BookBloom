document.getElementById('marcaPaginaBtn').addEventListener('click', function(e) {
  e.preventDefault();
  abrirMenu();
});

function abrirMenu() {
  document.getElementById('marcaPagina').classList.add('ativo');
  document.querySelector('.overlay').classList.add('ativo');
}

function fecharMenu() {
  document.getElementById('marcaPagina').classList.remove('ativo');
  document.querySelector('.overlay').classList.remove('ativo');
}

function toggleCategorias() {
  const categorias = document.getElementById('categorias-container');
  categorias.style.display = categorias.style.display === 'none' ? 'block' : 'none';
}

document.querySelector('.overlay').addEventListener('click', fecharMenu);