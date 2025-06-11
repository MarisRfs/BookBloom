document.querySelectorAll('.carousel-wrapper').forEach(wrapper => {
  const track = wrapper.querySelector('.books-carousel') || wrapper.querySelector('.carousel');
  const prevButton = wrapper.querySelector('.scroll-button.left-arrow');
  const nextButton = wrapper.querySelector('.scroll-button.right-arrow');

  if (!track) {
      const mainCarouselContainer = document.querySelector('.carousel-container');
      if (mainCarouselContainer) {
          const mainCarouselTrack = mainCarouselContainer.querySelector('.carousel');
          return; 
      }
  }

  if (!track || !prevButton || !nextButton) {
      console.warn('Um carrossel ou seus botões de navegação não foram encontrados. Verifique a estrutura HTML.', wrapper);
      return;
  }

  let scrollStep;
  const firstItem = track.querySelector('.book-item') || track.querySelector('img');
  if (firstItem) {
      const itemStyle = getComputedStyle(firstItem);
      scrollStep = firstItem.offsetWidth + parseFloat(itemStyle.marginLeft) + parseFloat(itemStyle.marginRight);
  } else {
      scrollStep = 300;
  }

  nextButton.addEventListener('click', () => {
      track.scrollBy({
          left: scrollStep,
          behavior: 'smooth'
      });
  });

  prevButton.addEventListener('click', () => {
      track.scrollBy({
          left: -scrollStep,
          behavior: 'smooth'
      });
  });
});