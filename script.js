// Enhanced script with color animations
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
    const counters = document.querySelectorAll('.stat-number');
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
              counter.textContent = target + (counter.getAttribute('data-count') > 50 ? '+' : '');
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
  `;
  document.head.appendChild(style);
}