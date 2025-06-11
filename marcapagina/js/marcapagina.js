document.getElementById('marcaPaginaBtn').addEventListener('click', function () {
  document.getElementById('marcaPagina').classList.add('ativo');
});

document.querySelector('.fechar-btn').addEventListener('click', function () {
  document.getElementById('marcaPagina').classList.remove('ativo');
});
