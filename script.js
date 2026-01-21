// Enhanced script with random robot peeking and color animations
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
    document.querySelector(".hero-content").classList.add("show");
    
    // Initialize counter animations
    initCounterAnimations();
    
    // Initialize color hover effects
    initColorHoverEffects();
    
    // Initialize random robot animation
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
  
  // Enhanced hover effect for service cards
  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-15px) rotateX(5deg)';
      card.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.15)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) rotateX(0)';
      card.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.1)';
    });
  });
  
  // Enhanced trust items hover
  document.querySelectorAll('.trust-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.style.transform = 'translateY(-10px) scale(1.05)';
    });
    
    item.addEventListener('mouseleave', () => {
      item.style.transform = 'translateY(0) scale(1)';
    });
  });
  
  // Color change on scroll
  window.addEventListener('scroll', () => {
    const scrollPercentage = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    
    // Update CSS variables based on scroll position
    document.documentElement.style.setProperty('--scroll-percentage', scrollPercentage);
    
    // Add parallax effect to floating shapes
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach((shape, index) => {
      const speed = 0.5 + (index * 0.1);
      shape.style.transform = `translateY(${window.scrollY * speed * 0.1}px)`;
    });
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
  
  // RANDOM ROBOT ANIMATION - PEEPS IN ALL CORNERS
  function initRobotAnimation() {
    const robot = document.querySelector('.robot-container');
    if (!robot) return;
    
    // Define corner positions (top-left, top-right, bottom-left, bottom-right)
    const positions = [
      { x: '20px', y: '20px', scale: 1 },      // Top-left
      { x: 'calc(100vw - 100px)', y: '20px', scale: 1 }, // Top-right
      { x: '20px', y: 'calc(100vh - 120px)', scale: 1 }, // Bottom-left
      { x: 'calc(100vw - 100px)', y: 'calc(100vh - 120px)', scale: 1 }, // Bottom-right
      { x: 'calc(50vw - 40px)', y: '20px', scale: 0.8 }, // Top-center
      { x: 'calc(50vw - 40px)', y: 'calc(100vh - 120px)', scale: 0.8 }, // Bottom-center
      { x: '20px', y: 'calc(50vh - 40px)', scale: 0.9 }, // Left-center
      { x: 'calc(100vw - 100px)', y: 'calc(50vh - 40px)', scale: 0.9 }, // Right-center
      { x: 'calc(25vw - 40px)', y: 'calc(25vh - 40px)', scale: 0.7 }, // Quarter positions
      { x: 'calc(75vw - 40px)', y: 'calc(25vh - 40px)', scale: 0.7 },
      { x: 'calc(25vw - 40px)', y: 'calc(75vh - 40px)', scale: 0.7 },
      { x: 'calc(75vw - 40px)', y: 'calc(75vh - 40px)', scale: 0.7 }
    ];
    
    let currentIndex = 0;
    
    function moveRobot() {
      // Get random position (different from current)
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * positions.length);
      } while (newIndex === currentIndex && positions.length > 1);
      
      currentIndex = newIndex;
      const pos = positions[currentIndex];
      
      // Random animation duration (3-8 seconds)
      const duration = 3000 + Math.random() * 5000;
      
      // Apply animation
      robot.style.transition = `all ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
      robot.style.transform = `translate(${pos.x}, ${pos.y}) scale(${pos.scale})`;
      robot.style.opacity = '0.9';
      
      // Random rotation
      const rotation = Math.random() * 20 - 10; // -10 to 10 degrees
      robot.style.rotate = `${rotation}deg`;
      
      // Schedule next move
      setTimeout(() => {
        // Fade out slightly before next move
        robot.style.opacity = '0.6';
        setTimeout(moveRobot, 500 + Math.random() * 1000);
      }, duration);
    }
    
    // Start the animation after initial delay
    setTimeout(moveRobot, 2000);
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
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.getAttribute('data-count'));
          const duration = 2000;
          const step = target / (duration / 16);
          
          let current = 0;
          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              // Add plus sign for all stats as requested
              counter.textContent = target + '+';
              clearInterval(timer);
            } else {
              counter.textContent = Math.floor(current);
            }
          }, 16);
          
          observer.unobserve(counter);
        }
      });
    }, { threshold: 0.5 });
    
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
      transition: all 3s cubic-bezier(0.4, 0, 0.2, 1);
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
  `;
  document.head.appendChild(style);
}