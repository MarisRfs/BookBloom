let currentIndex = 0;

// aqui o "div" era img
const slides = document.querySelectorAll('.carousel-images div');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    if (index >= slides.length) currentIndex = 0;
    if (index < 0) currentIndex = slides.length - 1;

    // Mover o carrossel
    const offset = -currentIndex * 100;
    document.querySelector('.carousel-images').style.transform = `translateX(${offset}%)`;

    updateDots();
}

function changeSlide(n) {
    showSlide(currentIndex += n);
}

function currentSlide(n) {
    showSlide(currentIndex = n - 1);
}

function updateDots() {
    dots.forEach((dot, i) => {
        dot.classList.remove('activeB');
        if (i === currentIndex) {
            dot.classList.add('activeB');
        }
    });
}

// Alterna a imagem automaticamente a cada 4 segundos
setInterval(() => {
    changeSlide(1);
}, 4000);

window.onload = function() {
    showSlide(currentIndex);
};