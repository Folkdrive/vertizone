// Optimized script with performance improvements
document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      mobileNav.classList.toggle('active');
      document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!mobileToggle.contains(e.target) && !mobileNav.contains(e.target)) {
        mobileToggle.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
    
    // Close mobile menu when clicking on links
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }
  
  // Hero text fade-in
  window.addEventListener("load", () => {
    document.querySelector(".hero-content")?.classList.add("show");
    
    // Initialize counter animations
    initCounterAnimations();
    
    // Initialize color hover effects
    initColorHoverEffects();
    
    // Initialize optimized robot animation
    initRobotAnimation();
  });

  // Pause videos when tab inactive
  document.addEventListener("visibilitychange", () => {
    document.querySelectorAll("video").forEach(video => {
      document.hidden ? video.pause() : video.play();
    });
  });
  
  // Add smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Enhanced hover effect for service cards - OPTIMIZED
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(card => {
    let hoverTimeout;
    
    card.addEventListener('mouseenter', () => {
      clearTimeout(hoverTimeout);
      card.style.transform = 'translateY(-15px) rotateX(5deg)';
      card.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.15)';
    });
    
    card.addEventListener('mouseleave', () => {
      hoverTimeout = setTimeout(() => {
        card.style.transform = 'translateY(0) rotateX(0)';
        card.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.1)';
      }, 50);
    });
  });
  
  // Enhanced trust items hover - OPTIMIZED
  const trustItems = document.querySelectorAll('.trust-item');
  trustItems.forEach(item => {
    let hoverTimeout;
    
    item.addEventListener('mouseenter', () => {
      clearTimeout(hoverTimeout);
      item.style.transform = 'translateY(-10px) scale(1.05)';
    });
    
    item.addEventListener('mouseleave', () => {
      hoverTimeout = setTimeout(() => {
        item.style.transform = 'translateY(0) scale(1)';
      }, 50);
    });
  });
  
  // Color change on scroll - OPTIMIZED with requestAnimationFrame
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      const scrollPercentage = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      
      // Update CSS variables based on scroll position
      document.documentElement.style.setProperty('--scroll-percentage', scrollPercentage);
      
      // Add parallax effect to floating shapes - OPTIMIZED
      const shapes = document.querySelectorAll('.shape');
      if (shapes.length > 0) {
        requestAnimationFrame(() => {
          shapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.1);
            shape.style.transform = `translateY(${window.scrollY * speed * 0.1}px)`;
          });
        });
      }
    }, 16); // ~60fps
  });
  
  // Initialize interactive elements
  function initColorHoverEffects() {
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-whatsapp');
    buttons.forEach(btn => {
      btn.addEventListener('click', function(e) {
        createRippleEffect(this, e);
      });
    });
    
    // Add hover color change to navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('mouseenter', () => {
        const colors = ['#FF6B6B', '#4ECDC4', '#FFD166', '#A599E9', '#118AB2'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        link.style.setProperty('--icon-color', randomColor);
      });
    });
  }
  
  // OPTIMIZED ROBOT ANIMATION - Reduced reflows
  function initRobotAnimation() {
    const robot = document.querySelector('.robot-container');
    if (!robot) return;
    
    // Define corner positions
    const positions = [
      { x: 20, y: 20, scale: 1 },
      { x: window.innerWidth - 100, y: 20, scale: 1 },
      { x: 20, y: window.innerHeight - 120, scale: 1 },
      { x: window.innerWidth - 100, y: window.innerHeight - 120, scale: 1 },
    ];
    
    let currentIndex = 0;
    let animationFrameId;
    let lastMoveTime = 0;
    const MOVE_INTERVAL = 5000; // Move every 5 seconds instead of continuous
    
    function moveRobot(timestamp) {
      if (!timestamp) timestamp = 0;
      
      // Only move every 5 seconds to reduce reflows
      if (timestamp - lastMoveTime < MOVE_INTERVAL) {
        animationFrameId = requestAnimationFrame(moveRobot);
        return;
      }
      
      lastMoveTime = timestamp;
      
      // Get random position (different from current)
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * positions.length);
      } while (newIndex === currentIndex && positions.length > 1);
      
      currentIndex = newIndex;
      const pos = positions[currentIndex];
      
      // Use transform3d for GPU acceleration
      robot.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) scale(${pos.scale})`;
      robot.style.opacity = '0.9';
      
      // Random rotation
      const rotation = Math.random() * 20 - 10;
      robot.style.transform += ` rotate(${rotation}deg)`;
      
      // Schedule next move
      animationFrameId = requestAnimationFrame(moveRobot);
    }
    
    // Start the animation
    animationFrameId = requestAnimationFrame(moveRobot);
    
    // Clean up on page unload
    window.addEventListener('beforeunload', () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    });
  }
  
  function createRippleEffect(element, event) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.7);
      transform: scale(0);
      animation: ripple-animation 0.6s linear;
      width: ${size}px;
      height: ${size}px;
      top: ${y}px;
      left: ${x}px;
      pointer-events: none;
      z-index: 0;
    `;
    
    element.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }
  
  function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    if (!counters.length) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.getAttribute('data-count'));
          const duration = 2000;
          const startTime = Date.now();
          
          function updateCounter() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic
            
            if (progress < 1) {
              const current = Math.floor(target * easeProgress);
              counter.textContent = current;
              requestAnimationFrame(updateCounter);
            } else {
              // Add plus sign for all stats as requested
              counter.textContent = target + '+';
              observer.unobserve(counter);
            }
          }
          
          requestAnimationFrame(updateCounter);
        }
      });
    }, { 
      threshold: 0.5,
      rootMargin: '0px 0px -50px 0px' // Trigger when 50px from bottom of viewport
    });
    
    counters.forEach(counter => observer.observe(counter));
  }
  
  // Add keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-navigation');
    }
  });
  
  document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
  });
  
  // Initialize particle animation
  function initParticleAnimation() {
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
      particle.style.animationDelay = `${index * 2}s`;
    });
  }
  
  // Update active navigation based on current page
  function updateActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      const linkHref = link.getAttribute('href');
      if (linkHref === currentPage || 
          (currentPage === '' && linkHref === 'index.html') ||
          (linkHref.includes(currentPage.replace('.html', '')) && currentPage !== 'index.html')) {
        link.classList.add('active');
      }
    });
  }
  
  updateActiveNav();
  
  // Initialize on load
  initParticleAnimation();
});

// Add ripple animation style
if (!document.querySelector('#ripple-styles')) {
  const style = document.createElement('style');
  style.id = 'ripple-styles';
  style.textContent = `
    @keyframes ripple-animation {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
    
    /* Update robot container styles for new animation */
    .robot-container {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 9999;
      pointer-events: none;
      transform-origin: center;
      opacity: 0.8;
      transition: transform 2s cubic-bezier(0.4, 0, 0.2, 1), opacity 1s ease;
      will-change: transform; /* Hint browser for optimization */
    }
    
    .robot {
      width: 80px;
      height: 100px;
      position: relative;
      filter: drop-shadow(0 5px 15px rgba(0,0,0,0.4));
      transition: transform 0.3s ease;
    }
    
    .robot:hover {
      transform: scale(1.1);
    }
    
    @media (max-width: 768px) {
      .robot-container {
        width: 60px;
        height: 80px;
      }
      
      .robot {
        width: 60px;
        height: 80px;
      }
    }
    
    /* Performance optimizations */
    * {
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
    }
    
    .service-card, .trust-item, .stat-item {
      will-change: transform, box-shadow;
    }
  `;
  document.head.appendChild(style);
}