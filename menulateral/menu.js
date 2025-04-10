document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.querySelector('.sidebar');
    const toggleBtn = document.querySelector('.toggle-btn');
    const mainContent = document.querySelector('.main-content');
    
    // Toggle sidebar on mobile
    toggleBtn.addEventListener('click', function() {
        sidebar.classList.toggle('active');
    });
    
    // Collapse/expand sidebar on desktop
    if (window.innerWidth > 768) {
        sidebar.addEventListener('mouseenter', function() {
            this.classList.remove('collapsed');
            mainContent.classList.remove('expanded');
        });
        
        sidebar.addEventListener('mouseleave', function() {
            this.classList.add('collapsed');
            mainContent.classList.add('expanded');
        });
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('collapsed');
            mainContent.classList.remove('expanded');
        }
    });
    
    // Add active class to clicked menu item
    const menuItems = document.querySelectorAll('.sidebar-menu li a');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            menuItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            // Close sidebar on mobile after clicking
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
            }
        });
    });
});