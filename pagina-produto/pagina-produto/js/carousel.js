document.addEventListener('DOMContentLoaded', function() {
    const mainImage = document.querySelector('.imgDestaque');
    const buttons = document.querySelectorAll('.buton');
    const miniImages = document.querySelectorAll('.miniImgs .mini');
    
    // Ordem das imagens no carrossel (apenas as miniaturas)
    const imageOrder = ['prev', 'next', 'second'];
    
    // Mapeamento das imagens
    const imageMap = {
        'main': 'https://i.pinimg.com/736x/7a/75/5d/7a755db937c4b88fc41cb8ec942aa379.jpg',
        'next': 'https://i.pinimg.com/736x/de/12/11/de1211c90f928e1d57b6f330667cae07.jpg',
        'prev': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2fXDKKRQJSjfreEqapAUupSAEejHqTcvOhyDi2BMqA94bJ0tLmdnoeU4GleHAI8Pw-18&usqp=CAU',
        'second': 'https://i.pinimg.com/736x/7a/75/5d/7a755db937c4b88fc41cb8ec942aa379.jpg'
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