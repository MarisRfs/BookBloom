
//Top 10 livros mais vendidos

document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.books-carousel');
    const leftButton = document.querySelector('.scroll-button.left-arrow');
    const rightButton = document.querySelector('.scroll-button.right-arrow');
    const bookWidth = document.querySelector('.book-item').offsetWidth;
    const bookMarginRight = parseInt(window.getComputedStyle(document.querySelector('.book-item')).marginRight);
    const scrollAmount = bookWidth + bookMarginRight;

    leftButton.addEventListener('click', function() {
        carousel.scrollLeft -= scrollAmount;
    });

    rightButton.addEventListener('click', function() {
        carousel.scrollLeft += scrollAmount;
    });

    // Opcional: Desabilitar botões nas extremidades
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
    checkScrollPosition(); 
});