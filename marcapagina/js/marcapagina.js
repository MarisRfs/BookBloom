document.getElementById('marcaPaginaBtn').addEventListener('click', function () {
    document.getElementById('marcaPagina').classList.add('ativo');
  });
  
  document.querySelector('.fechar-btn').addEventListener('click', function () {
    document.getElementById('marcaPagina').classList.remove('ativo');
  });

// categorias
function toggleCategorias() {
    const container = document.getElementById('categorias-container');
    container.style.display = container.style.display === 'none' ? 'flex' : 'none';
  }
  
  // Inicia oculto:
  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('categorias-container').style.display = 'none';
  });

  
