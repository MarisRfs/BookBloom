document.addEventListener('DOMContentLoaded', function() {
    const colorButtons = document.querySelectorAll('.cor');
    let activeButton = null;

    colorButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            
            if (activeButton) {
                activeButton.classList.remove('active');
            }
            
            this.classList.add('active');
            
            activeButton = this;
        });
    });

    document.addEventListener('click', function() {
    });
});