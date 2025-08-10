import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

class GSAPAnimations {
  constructor() {
    this.init();
  }
  
  init() {
    // Wait for hero section to be ready before initializing
    const initAnimations = () => {
      this.initHeroAnimations();
      this.initScrollAnimations();
      this.initInteractiveAnimations();
    };
    
    // Check if hero section already exists
    if (document.querySelector('.hero-section')) {
      initAnimations();
    } else {
      // Wait for hero section to be ready
      document.addEventListener('heroSectionReady', initAnimations, { once: true });
      
      // Fallback timeout
      setTimeout(initAnimations, 2000);
    }
  }
  
  initHeroAnimations() {
    // Create timeline for hero section - runs immediately
    const heroTl = gsap.timeline({ delay: 0.5 });
    
    // Animate hero badge
    heroTl.fromTo('#heroBadge',
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    );
    
    // Animate hero title
    heroTl.fromTo('#heroTitle',
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.2, ease: 'power3.out' },
      '-=0.4'
    );
    
    // Animate hero subtitle
    heroTl.fromTo('#heroSubtitle',
      { x: -80, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: 'power3.out' },
      '-=0.8'
    );
    
    // Animate features
    heroTl.fromTo('#heroFeatures .feature-item',
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.2 },
      '-=0.6'
    );
    
    // Animate actions
    heroTl.fromTo('#heroActions',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
      '-=0.4'
    );
    
    // Animate terminal from right
    heroTl.fromTo('#heroTerminal',
      { x: 100, opacity: 0, rotationY: -15 },
      { x: 0, opacity: 1, rotationY: 0, duration: 1.5, ease: 'power3.out' },
      '-=1.2'
    );
    
    // Animate stats
    heroTl.fromTo('#securityStats .stat-card',
      { y: 30, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out', stagger: 0.1 },
      '-=0.8'
    );
    
    // Terminal typing animation
    this.animateTerminalTyping();
    
    // Enhanced glow effect for terminal
    gsap.to('#heroTerminal', {
      boxShadow: '0 0 60px rgba(16, 185, 129, 0.6), 0 0 100px rgba(6, 182, 212, 0.3)',
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut'
    });
    
    // Add pulsing effect to title - with delay to ensure element exists
    setTimeout(() => {
      const titleAccent = document.querySelector('#heroTitle .title-accent');
      if (titleAccent) {
        gsap.to(titleAccent, {
          textShadow: '0 0 20px rgba(16, 185, 129, 0.8), 0 0 40px rgba(6, 182, 212, 0.4)',
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: 'power2.inOut'
        });
      }
    }, 1000);
  }
  
  
  animateTerminalTyping() {
    const commands = [
      'nmap -sS -O target.domain.com',
      'Starting Nmap scan...',
      'ssh     open   filtered',
      'http    open   Apache/2.4.41',
      'https   open   Apache/2.4.41',
      'vulnerability detected'
    ];
    
    const terminalLines = document.querySelectorAll('.terminal-line');
    
    gsap.set(terminalLines, { opacity: 0 });
    
    const tl = gsap.timeline({ delay: 2 });
    
    terminalLines.forEach((line, index) => {
      tl.to(line, {
        opacity: 1,
        duration: 0.1,
        ease: 'none'
      }, index * 0.8);
    });
  }
  
  initScrollAnimations() {
    // Section fade-in animations that also trigger on navigation clicks
    gsap.utils.toArray('.section:not(.hero-section)').forEach(section => {
      // Create animation but don't tie it only to scroll
      const sectionTl = gsap.timeline({ paused: true });
      
      sectionTl.fromTo(section.children,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1
        }
      );
      
      // Store timeline reference for navigation clicks
      section.animationTimeline = sectionTl;
      
      // Also trigger on scroll
      ScrollTrigger.create({
        trigger: section,
        start: 'top 80%',
        onEnter: () => sectionTl.play(),
        onLeave: () => sectionTl.reverse(),
        onEnterBack: () => sectionTl.play()
      });
    });
    
    // Navbar active item animation
    this.animateNavigation();
  }
  
  // Method to manually trigger section animations (called on nav click)
  triggerSectionAnimation(sectionId) {
    const section = document.querySelector(sectionId);
    if (section && section.animationTimeline) {
      section.animationTimeline.restart();
    }
  }
  
  animateNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.section');
    
    sections.forEach((section, index) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: () => this.setActiveNavItem(index),
        onEnterBack: () => this.setActiveNavItem(index)
      });
    });
    
    // Add click animation and section trigger to nav items
    navItems.forEach(item => {
      const link = item.querySelector('a');
      if (link) {
        link.addEventListener('click', (e) => {
          // Visual feedback
          gsap.to(item, {
            scale: 0.9,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
            ease: 'power2.inOut'
          });
          
          // Get target section and trigger its animation
          const targetId = link.getAttribute('href');
          if (targetId && targetId.startsWith('#')) {
            // Delay to allow smooth scrolling to start
            setTimeout(() => {
              this.triggerSectionAnimation(targetId);
            }, 500);
          }
        });
      }
    });
  }
  
  setActiveNavItem(index) {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach((item, i) => {
      if (i === index) {
        item.classList.add('active');
        gsap.to(item.querySelector('a'), {
          backgroundColor: 'rgba(16, 185, 129, 0.2)',
          scale: 1.1,
          duration: 0.3,
          ease: 'power2.out'
        });
      } else {
        item.classList.remove('active');
        gsap.to(item.querySelector('a'), {
          backgroundColor: 'transparent',
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    });
  }
  
  initInteractiveAnimations() {
    // Button hover animations
    const buttons = document.querySelectorAll('.btn');
    
    if (!buttons.length) {
      console.log('No buttons found for interactive animations');
      return;
    }
    
    buttons.forEach(button => {
      button.addEventListener('mouseenter', () => {
        gsap.to(button, {
          scale: 1.05,
          y: -3,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
      
      button.addEventListener('mouseleave', () => {
        gsap.to(button, {
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
      
      button.addEventListener('click', (e) => {
        // Ripple effect
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('div');
        ripple.style.cssText = `
          position: absolute;
          width: 4px;
          height: 4px;
          background: rgba(255, 255, 255, 0.6);
          border-radius: 50%;
          pointer-events: none;
          left: ${x}px;
          top: ${y}px;
          transform: translate(-50%, -50%);
        `;
        
        button.style.position = 'relative';
        button.appendChild(ripple);
        
        gsap.to(ripple, {
          width: 100,
          height: 100,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
          onComplete: () => ripple.remove()
        });
      });
    });
    
    // Stat items hover animation
    const statItems = document.querySelectorAll('.stat-item');
    
    statItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        gsap.to(item, {
          y: -5,
          scale: 1.05,
          duration: 0.3,
          ease: 'power2.out'
        });
        
        gsap.to(item.querySelector('.stat-number'), {
          scale: 1.1,
          color: '#00D4FF',
          duration: 0.3,
          ease: 'power2.out'
        });
      });
      
      item.addEventListener('mouseleave', () => {
        gsap.to(item, {
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        });
        
        gsap.to(item.querySelector('.stat-number'), {
          scale: 1,
          color: '#10B981',
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    });
    
    // Cyber shield interaction
    const cyberShield = document.getElementById('cyberShield');
    
    if (!cyberShield) {
      console.log('Cyber shield element not found');
      return;
    }
    
    cyberShield.addEventListener('mouseenter', () => {
      gsap.to('.shield-ring', {
        scale: 1.1,
        duration: 0.5,
        ease: 'power2.out',
        stagger: 0.1
      });
      
      gsap.to('.shield-core', {
        scale: 1.2,
        boxShadow: '0 0 60px rgba(16, 185, 129, 1)',
        duration: 0.5,
        ease: 'power2.out'
      });
    });
    
    cyberShield.addEventListener('mouseleave', () => {
      gsap.to('.shield-ring', {
        scale: 1,
        duration: 0.5,
        ease: 'power2.out',
        stagger: 0.1
      });
      
      gsap.to('.shield-core', {
        scale: 1,
        boxShadow: '0 0 30px rgba(16, 185, 129, 0.5)',
        duration: 0.5,
        ease: 'power2.out'
      });
    });
  }
  
  // Method to refresh ScrollTrigger on route change
  refresh() {
    ScrollTrigger.refresh();
  }
  
  // Method to kill all animations
  destroy() {
    ScrollTrigger.killAll();
    gsap.killTweensOf('*');
  }
}

export default GSAPAnimations;