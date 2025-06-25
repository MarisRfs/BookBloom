document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.carousel-container').forEach(container => {
    const carousel = container.querySelector('.carousel');
    const prevBtn = container.querySelector('.prev');
    const nextBtn = container.querySelector('.next');

    const scrollStep = 300;

    if (prevBtn && nextBtn) {
      prevBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: -scrollStep, behavior: 'smooth' });
      });

      nextBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: scrollStep, behavior: 'smooth' });
      });
    }
  });

  document.querySelectorAll('.top-sellers-container').forEach(container => {
    const carouselWrapper = container.querySelector('.carousel-wrapper');
    const booksCarousel = container.querySelector('.books-carousel');
    const leftArrow = carouselWrapper.querySelector('.left-arrow');
    const rightArrow = carouselWrapper.querySelector('.right-arrow');

    if (leftArrow && rightArrow && booksCarousel) {
      leftArrow.addEventListener('click', () => {
        booksCarousel.scrollBy({ left: -300, behavior: 'smooth' });
      });

      rightArrow.addEventListener('click', () => {
        booksCarousel.scrollBy({ left: 300, behavior: 'smooth' });
      });
    }
  });
});