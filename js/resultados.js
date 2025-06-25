// Função para extrair o parâmetro 'q' da URL
function getQueryParam(name) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(window.location.href);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// Quando a página for carregada, preenche o h2 com o termo pesquisado
document.addEventListener('DOMContentLoaded', () => {
    const searchTerm = getQueryParam('q');
    const resultsHeading = document.querySelector('.resultados h2');

    if (resultsHeading && searchTerm) {
        resultsHeading.textContent = `Resultados para: ${searchTerm}`;
    } else if (resultsHeading) {
        // Caso não haja termo de pesquisa na URL (pode acontecer se a página for acessada diretamente)
        resultsHeading.textContent = 'Resultados da Pesquisa';
    }
});