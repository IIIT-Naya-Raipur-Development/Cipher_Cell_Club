import './style.css'
import GSAPAnimations from './gsap-animations.js'

class SmoothScrollManager {
  constructor() {
    this.init();
  }
  
  init() {
    this.setupIntersectionObserver();
    this.setupScrollIndicator();
    this.setupNavbarScroll();
    this.setupSmoothScrolling();
  }
  
  setupIntersectionObserver() {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: '-50px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add visible class for animations
          const animatedElements = entry.target.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-up');
          animatedElements.forEach((element, index) => {
            setTimeout(() => {
              element.classList.add('visible');
            }, index * 200);
          });
          
          // Update scroll indicator
          this.updateScrollIndicator(entry.target.id);
        }
      });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('.section').forEach(section => {
      observer.observe(section);
    });
  }
  
  updateScrollIndicator(activeSection) {
    const dots = document.querySelectorAll('.scroll-dot');
    dots.forEach(dot => {
      dot.classList.remove('active');
      if (dot.dataset.target === `#${activeSection}`) {
        dot.classList.add('active');
      }
    });
  }
  
  setupScrollIndicator() {
    const dots = document.querySelectorAll('.scroll-dot');
    dots.forEach(dot => {
      dot.addEventListener('click', (e) => {
        e.preventDefault();
        const targetSection = document.querySelector(dot.dataset.target);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }
  
  setupNavbarScroll() {
    const navbar = document.getElementById('navbar');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
      
      lastScrollY = currentScrollY;
    });
  }
  
  setupSmoothScrolling() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = anchor.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
          targetSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
    
    // Enhanced scroll snapping - lighter touch
    let scrollTimeout;
    const sections = document.querySelectorAll('.section');
    
    // Debounced scroll snap function
    const snapToSection = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Find the closest section
      let closestSection = 0;
      let minDistance = Infinity;
      
      sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const distance = Math.abs(scrollPosition - sectionTop);
        
        if (distance < minDistance) {
          minDistance = distance;
          closestSection = index;
        }
      });
      
      // Only snap if we're close enough to a section boundary
      const currentSectionTop = sections[closestSection].offsetTop;
      if (Math.abs(scrollPosition - currentSectionTop) > 50) {
        sections[closestSection].scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    };
    
    // Add scroll end detection for snapping
    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(snapToSection, 150);
    });
  }
}

class GradientAnimationManager {
  constructor() {
    this.init();
  }
  
  init() {
    this.createFloatingParticles();
    this.setupParallaxEffect();
    this.setupButtonInteractions();
  }
  
  createFloatingParticles() {
    const heroSection = document.querySelector('.hero-section');
    
    // Only create particles if hero section exists
    if (!heroSection) return;
    
    // Create additional floating particles
    for (let i = 0; i < 15; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 6 + 2}px;
        height: ${Math.random() * 6 + 2}px;
        background: radial-gradient(circle, var(--accent-cyan), transparent);
        border-radius: 50%;
        top: ${Math.random() * 100}%;
        left: ${Math.random() * 100}%;
        opacity: ${Math.random() * 0.5 + 0.2};
        animation: float ${Math.random() * 8 + 6}s ease-in-out infinite;
        animation-delay: ${Math.random() * 5}s;
        pointer-events: none;
      `;
      heroSection.appendChild(particle);
    }
  }
  
  setupParallaxEffect() {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.floating-element');
      
      parallaxElements.forEach((element, index) => {
        const speed = 0.3 + (index * 0.1);
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });
      
      // Background parallax effect
      const sections = document.querySelectorAll('.section');
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const speed = 0.5;
        
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const yPos = (rect.top - window.innerHeight / 2) * speed;
          section.style.transform = `translateY(${yPos * 0.1}px)`;
        }
      });
    });
  }
  
  setupButtonInteractions() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
      button.addEventListener('mouseenter', () => {
        button.style.filter = 'brightness(1.2) saturate(1.3)';
      });
      
      button.addEventListener('mouseleave', () => {
        button.style.filter = '';
      });
      
      button.addEventListener('click', (e) => {
        // Create ripple effect
        const ripple = document.createElement('div');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          left: ${x}px;
          top: ${y}px;
          background: radial-gradient(circle, rgba(255,255,255,0.3), transparent 70%);
          border-radius: 50%;
          transform: scale(0);
          animation: rippleEffect 0.8s ease-out;
          pointer-events: none;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 800);
      });
    });
    
    // Add ripple animation styles
    if (!document.getElementById('ripple-styles')) {
      const style = document.createElement('style');
      style.id = 'ripple-styles';
      style.textContent = `
        @keyframes rippleEffect {
          0% { transform: scale(0); opacity: 1; }
          100% { transform: scale(2); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }
  }
}

class AdvancedEffectsManager {
  constructor() {
    this.init();
  }
  
  init() {
    this.setupCursorTrail();
    this.setupTextAnimations();
    this.setupSectionTransitions();
  }
  
  setupCursorTrail() {
    const trail = [];
    const trailLength = 10;
    
    document.addEventListener('mousemove', (e) => {
      trail.push({ x: e.clientX, y: e.clientY, life: trailLength });
      
      if (trail.length > trailLength) {
        trail.shift();
      }
      
      this.updateTrail();
    });
  }
  
  updateTrail() {
    // Remove existing trail elements
    document.querySelectorAll('.cursor-trail').forEach(el => el.remove());
    
    // Create new trail elements
    trail.forEach((point, index) => {
      if (point.life > 0) {
        const trailElement = document.createElement('div');
        trailElement.className = 'cursor-trail';
        trailElement.style.cssText = `
          position: fixed;
          left: ${point.x - 2}px;
          top: ${point.y - 2}px;
          width: 4px;
          height: 4px;
          background: var(--accent-cyan);
          border-radius: 50%;
          opacity: ${point.life / 10};
          pointer-events: none;
          z-index: 9999;
          transition: opacity 0.1s ease;
        `;
        document.body.appendChild(trailElement);
        point.life--;
      }
    });
  }
  
  setupTextAnimations() {
    // Typewriter effect for hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
      const text = heroTitle.textContent;
      heroTitle.textContent = '';
      
      let i = 0;
      const typeWriter = () => {
        if (i < text.length) {
          heroTitle.textContent += text.charAt(i);
          i++;
          setTimeout(typeWriter, 100);
        }
      };
      
      // Start typewriter effect after a delay
      setTimeout(typeWriter, 1000);
    }
  }
  
  setupSectionTransitions() {
    const sections = document.querySelectorAll('.section');
    
    sections.forEach((section, index) => {
      section.style.setProperty('--section-index', index);
      
      // Add unique background patterns based on section index
      const pattern = this.generateSectionPattern(index);
      section.style.backgroundImage = `${section.style.backgroundImage || ''}, ${pattern}`;
    });
  }
  
  generateSectionPattern(index) {
    const patterns = [
      'radial-gradient(circle at 20% 20%, rgba(6, 182, 212, 0.05) 0%, transparent 50%)',
      'linear-gradient(45deg, rgba(16, 185, 129, 0.03) 25%, transparent 25%), linear-gradient(-45deg, rgba(16, 185, 129, 0.03) 25%, transparent 25%)',
      'conic-gradient(from 0deg at 50% 50%, rgba(79, 70, 229, 0.05) 0deg, transparent 60deg, rgba(79, 70, 229, 0.05) 120deg, transparent 180deg)',
      'radial-gradient(ellipse at 70% 70%, rgba(30, 58, 138, 0.05) 0%, transparent 60%)',
    ];
    
    return patterns[index % patterns.length];
  }
}

// Function to initialize the website
const initializeWebsite = () => {
  try {
    new SmoothScrollManager();
    new GradientAnimationManager();
    new AdvancedEffectsManager();
    new GSAPAnimations();
    
    console.log('CipherCell website with GSAP animations initialized');
  } catch (error) {
    console.error('Error initializing website managers:', error);
  }
};

// Initialize when DOM is loaded OR when called directly
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeWebsite);
} else {
  // DOM is already loaded, initialize immediately
  initializeWebsite();
}

// Export the initialization function for React
export { initializeWebsite };
