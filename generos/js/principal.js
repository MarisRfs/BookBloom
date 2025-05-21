document.addEventListener('DOMContentLoaded', function() {
    const carousels = document.querySelectorAll('.books-carousel');
    const scrollButtons = document.querySelectorAll('.scroll-button');
  
    scrollButtons.forEach(button => {
      button.addEventListener('click', function() {
        const targetSelector = this.dataset.target;
        const carousel = document.querySelector(`.${targetSelector}`);
        const isLeft = this.classList.contains('left-arrow');
        const itemWidth = carousel.querySelector(targetSelector === 'livros-recomendados' ? '.book-item' : '.genero-item').offsetWidth;
        const itemMarginRight = parseInt(window.getComputedStyle(carousel.querySelector(targetSelector === 'livros-recomendados' ? '.book-item' : '.genero-item')).marginRight);
        const scrollAmount = itemWidth + itemMarginRight;
  
        if (isLeft) {
          carousel.scrollLeft -= scrollAmount*5;
        } else {
          carousel.scrollLeft += scrollAmount*5;
        }
      });
    });
  
    // Opcional: Desabilitar botões nas extremidades para cada carrossel
    carousels.forEach(carousel => {
      const leftButton = carousel.previousElementSibling;
      const rightButton = carousel.nextElementSibling;
  
      function checkScrollPosition() {
        if (carousel.scrollLeft <= 0) {
          leftButton.disabled = true;
        } else {
          leftButton.disabled = false;
        }
  
        if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth) {
          rightButton.disabled = true;
        } else {
          rightButton.disabled = false;
        }
      }
  
      carousel.addEventListener('scroll', checkScrollPosition);
      checkScrollPosition(); // Verificar a posição inicial
    });
  });
