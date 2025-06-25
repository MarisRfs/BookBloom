document.addEventListener('DOMContentLoaded', function() {
    const mainImage = document.querySelector('.imgDestaque');
    const buttons = document.querySelectorAll('.buton');
    const miniImages = document.querySelectorAll('.miniImgs .mini');
    
    // Ordem das imagens no carrossel (apenas as miniaturas)
    const imageOrder = ['prev', 'next'];
    
    // Mapeamento das imagens
    const imageMap = {
        'main': 'https://m.media-amazon.com/images/I/91B3t9R7zTS._UF1000,1000_QL80_.jpg',
        'next': 'https://cdn11.bigcommerce.com/s-3stx4pub31/images/stencil/1280x1280/products/5656/15420/contratapa-aristteles-y-dante-secretos-universo__37767.1649098004.jpg?c=2?imbypass=on',
        'prev': 'https://m.media-amazon.com/images/I/91B3t9R7zTS._UF1000,1000_QL80_.jpg',
    };
    
    let currentIndex = 0; // Começa no primeiro item do array imageOrder ('prev')

    // Função para atualizar a imagem principal
    const updateMainImage = () => {
        const currentImage = imageOrder[currentIndex];
        mainImage.style.backgroundImage = `url('${imageMap[currentImage]}')`;
        
        // Atualiza a classe ativa nas miniaturas
        miniImages.forEach(mini => {
            mini.classList.remove('active-mini');
            if (mini.getAttribute('data-img') === currentImage) {
                mini.classList.add('active-mini');
            }
        });
    };

    // Configura os botões de navegação
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.classList.contains('voltar')) {
                currentIndex = (currentIndex - 1 + imageOrder.length) % imageOrder.length;
            } else {
                currentIndex = (currentIndex + 1) % imageOrder.length;
            }
            updateMainImage();
        });
    });

    // Configura os cliques nas miniaturas
    miniImages.forEach(mini => {
        mini.addEventListener('click', function() {
            const imgType = this.getAttribute('data-img');
            // Verifica se a miniatura clicada está no ciclo do carrossel
            if (imageOrder.includes(imgType)) {
                currentIndex = imageOrder.indexOf(imgType);
                updateMainImage();
            }
        });
    });

    // Inicializa o carrossel mostrando a primeira imagem
    updateMainImage();
});