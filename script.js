// Design Switching and Initialization
document.addEventListener('DOMContentLoaded', function() {
    // Initialize with Design 1
    initializeDesign('1');
    
    // Design selector buttons
    const designButtons = document.querySelectorAll('.design-btn');
    
    designButtons.forEach(button => {
        button.addEventListener('click', function() {
            const design = this.getAttribute('data-design');
            switchDesign(design);
        });
    });
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.key >= '1' && e.key <= '3') {
            switchDesign(e.key);
        }
    });
    
    // Add smooth animations
    addAnimationEffects();
});

function initializeDesign(design) {
    // Set body class
    document.body.className = `design-${design}`;
    
    // Update active button
    document.querySelectorAll('.design-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-design') === design) {
            btn.classList.add('active');
        }
    });
    
    // Initialize design-specific effects
    switch(design) {
        case '1':
            initGridDesign();
            break;
        case '2':
            initElegantDesign();
            break;
        case '3':
            initCyberDesign();
            break;
    }
    
    // Animate elements
    animateElements();
}

function switchDesign(design) {
    // Add transition effect
    document.body.style.opacity = '0.7';
    document.body.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
        initializeDesign(design);
        document.body.style.opacity = '1';
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Log design change
        console.log(`Switched to Design ${design}`);
    }, 300);
}

function initGridDesign() {
    // Add grid animation to Design 1
    const gridSquares = document.querySelectorAll('.grid-square');
    gridSquares.forEach((square, index) => {
        square.style.animationDelay = `${index * 0.1}s`;
        square.classList.add('animate-grid');
    });
}

function initElegantDesign() {
    // Add elegant animations to Design 2
    const stats = document.querySelectorAll('.hero-design-2 .stat-number');
    stats.forEach(stat => {
        const value = parseInt(stat.textContent);
        if (!isNaN(value)) {
            animateCounter(stat, value);
        }
    });
}

function initCyberDesign() {
    // Add cyber animations to Design 3
    const cyberElements = document.querySelectorAll('.cyber-service, .cyber-tag');
    cyberElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.2}s`;
        element.classList.add('cyber-pulse');
    });
}

function animateElements() {
    // Animate all service cards
    const serviceCards = document.querySelectorAll('.service-card, .elegant-service, .cyber-service');
    serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 + (index * 100));
    });
    
    // Animate hero images
    const heroImages = document.querySelectorAll('.arch-image, .dashboard-image, .cyber-image');
    heroImages.forEach(image => {
        image.style.opacity = '0';
        image.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            image.style.transition = 'all 0.8s ease';
            image.style.opacity = '1';
            image.style.transform = 'scale(1)';
        }, 300);
    });
}

function addAnimationEffects() {
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .animate-grid {
            animation: gridPulse 2s ease-in-out infinite;
        }
        
        @keyframes gridPulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.1); opacity: 0.8; }
        }
        
        .cyber-pulse {
            animation: cyberGlow 3s infinite alternate;
        }
        
        @keyframes cyberGlow {
            0% { box-shadow: 0 0 5px var(--design-3-primary); }
            100% { box-shadow: 0 0 20px var(--design-3-primary); }
        }
        
        .service-card:hover .arch-image,
        .dashboard-preview:hover .dashboard-image,
        .cyber-preview:hover .cyber-image {
            transform: scale(1.05) !important;
        }
        
        .tech-logo:hover,
        .tool-logo:hover {
            transform: scale(1.1);
            transition: transform 0.3s ease;
        }
    `;
    document.head.appendChild(style);
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.round(current) + (element.textContent.includes('%') ? '%' : '');
    }, 30);
}

// Add image loading optimization
window.addEventListener('load', function() {
    // Lazy load images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', function() {
                this.classList.add('loaded');
            });
        }
    });
    
    // Add loaded class styling
    const loadedStyle = document.createElement('style');
    loadedStyle.textContent = `
        img.loaded {
            animation: fadeIn 0.5s ease;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    document.head.appendChild(loadedStyle);
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Re-initialize animations on resize
        const currentDesign = document.body.className.split('-')[1];
        initializeDesign(currentDesign);
    }, 250);
});