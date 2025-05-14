const carousel = document.querySelector('.carousel');
const images = document.querySelectorAll('.carousel img');
let counter = 0;
const imageWidth = images[0].clientWidth;

setInterval(() => {
  counter++;
  if (counter >= images.length) {
    counter = 0;
  }
  carousel.style.transform = `translateX(-${counter * imageWidth}px)`;
}, 3000);