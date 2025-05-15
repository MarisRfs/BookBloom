document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const sidebar = document.querySelector('.sidebar');
    const toggleBtn = document.querySelector('.toggle-btn');
    const mainContent = document.querySelector('.main-content');
    const carousels = document.querySelectorAll('.carousel-container');
    const starElements = document.querySelectorAll('.stars');
    const menuItems = document.querySelectorAll('.sidebar-menu li a');

    // Toggle sidebar on mobile
    toggleBtn.addEventListener('click', function() {
        sidebar.classList.toggle('active');
    });

    // Initialize all carousels
    carousels.forEach(carousel => {
        const items = carousel.querySelector('.carousel-items');
        const prevBtn = carousel.querySelector('.carousel-prev');
        const nextBtn = carousel.querySelector('.carousel-next');
        
        if (prevBtn && nextBtn) {
            // Center carousel on load
            centerCarousel(items);
            
            // Click events
            prevBtn.addEventListener('click', () => {
                items.scrollBy({ left: -220, behavior: 'smooth' });
            });
            
            nextBtn.addEventListener('click', () => {
                items.scrollBy({ left: 220, behavior: 'smooth' });
            });
            
            // Adjust on resize
            window.addEventListener('resize', () => centerCarousel(items));
        }
    });

    // Center carousel function
    function centerCarousel(carousel) {
        if (carousel.scrollWidth > carousel.clientWidth) {
            const scrollAmount = (carousel.scrollWidth - carousel.clientWidth) / 2;
            carousel.scrollLeft = scrollAmount;
        }
    }

    // Initialize star ratings
    starElements.forEach(starElement => {
        const stars = starElement.querySelectorAll('i');
        
        stars.forEach((star, index) => {
            star.addEventListener('click', function() {
                // Update visual rating
                stars.forEach((s, i) => {
                    s.classList.toggle('active', i <= index);
                });
                
                // Update data attribute
                starElement.dataset.rating = index + 1;
                console.log(`Avaliação do livro: ${index + 1} estrelas`);
            });
        });
    });
    
    // Collapse/expand sidebar on desktop
    if (window.innerWidth > 768) {
        sidebar.addEventListener('mouseenter', () => {
            sidebar.classList.remove('collapsed');
            mainContent.classList.remove('expanded');
        });
        
        sidebar.addEventListener('mouseleave', () => {
            sidebar.classList.add('collapsed');
            mainContent.classList.add('expanded');
        });
    }
    
    // Handle menu item clicks
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            menuItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
            }
        });
    });
    
    // Handle window resize
    function handleResize() {
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('collapsed');
            mainContent.classList.remove('expanded');
        } else {
            // Initialize collapsed state on desktop
            sidebar.classList.add('collapsed');
            mainContent.classList.add('expanded');
        }
    }
    
    window.addEventListener('resize', handleResize);
    
    // Initialize collapsed state on desktop
    if (window.innerWidth > 768) {
        sidebar.classList.add('collapsed');
        mainContent.classList.add('expanded');
    }
});
function setVisibleCards() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, {
        threshold: 0.5 // Ajusta a porcentagem de visibilidade
    });

    document.querySelectorAll('.carousel-items .card').forEach(card => {
        observer.observe(card);
    });
}

// Inicializar após o DOM carregar

document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.carousel-container');

    carousels.forEach(container => {
        const items = container.querySelector('.carousel-items');
        const prev = container.querySelector('.carousel-prev');
        const next = container.querySelector('.carousel-next');
        const cards = container.querySelectorAll('.carousel-items .card');
        
        // Duplicar os cards para criar o efeito infinito
        const cloneFirstCard = cards[0].cloneNode(true);
        const cloneLastCard = cards[cards.length - 1].cloneNode(true);
        
        items.appendChild(cloneFirstCard); // Adiciona uma cópia do primeiro item no final
        items.insertBefore(cloneLastCard, items.firstChild); // Adiciona uma cópia do último item no início

        let isScrolling = false;

        // Funcionalidade de rolar para a direita
        next.addEventListener('click', () => {
            if (isScrolling) return; // Prevenir múltiplos cliques
            isScrolling = true;

            items.style.transition = "transform 0.4s ease";
            items.style.transform = `translateX(-${cards[0].offsetWidth + 20}px)`; // Deslocar 1 item à direita

            setTimeout(() => {
                items.style.transition = "none"; // Remover transição temporariamente
                items.style.transform = "translateX(0)"; // Voltar a posição original
                items.appendChild(items.firstElementChild); // Colocar o primeiro item no final
                isScrolling = false;
            }, 400); // Tempo de animação
        });

        // Funcionalidade de rolar para a esquerda
        prev.addEventListener('click', () => {
            if (isScrolling) return;
            isScrolling = true;

            items.style.transition = "transform 0.4s ease";
            items.style.transform = `translateX(${cards[0].offsetWidth + 20}px)`; // Deslocar 1 item à esquerda

            setTimeout(() => {
                items.style.transition = "none"; // Remover transição temporariamente
                items.style.transform = "translateX(0)"; // Voltar a posição original
                items.insertBefore(items.lastElementChild, items.firstChild); // Colocar o último item no início
                isScrolling = false;
            }, 400);
        });
    });
});