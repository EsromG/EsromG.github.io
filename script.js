// Better Auth-Inspired Portfolio JavaScript

// Mobile Navigation
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
const nav = document.querySelector('.nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        nav.style.background = 'rgba(0, 0, 0, 0.95)';
    } else {
        nav.style.background = 'rgba(0, 0, 0, 0.8)';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            
            // Animate skill bars
            if (entry.target.classList.contains('skill-item')) {
                const fill = entry.target.querySelector('.skill-fill');
                if (fill) {
                    fill.style.width = '0';
                    setTimeout(() => {
                        fill.style.width = fill.style.getPropertyValue('--skill-width') || '0%';
                    }, 100);
                }
            }
        }
    });
}, observerOptions);

// Observe elements
const elementsToAnimate = document.querySelectorAll('.project-card, .skill-category, .contact-card, .stat');
elementsToAnimate.forEach(el => {
    observer.observe(el);
});

// Observe skill items separately
const skillItems = document.querySelectorAll('.skill-item');
skillItems.forEach(item => {
    observer.observe(item);
});

// Terminal typing effect
function typeText(element, text, speed = 50) {
    let i = 0;
    const cursor = element.querySelector('.cursor');
    
    function type() {
        if (i < text.length) {
            const char = text.charAt(i);
            const textNode = document.createTextNode(char);
            element.insertBefore(textNode, cursor);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize terminal typing if element exists
const terminalLine = document.querySelector('.terminal-line:last-child');
if (terminalLine) {
    // Optional: Add typing animation for terminal
    // typeText(terminalLine, 'npm run dev', 100);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero .container');
    
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrolled / 800);
    }
});

// Add active state to nav links based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.pageYOffset + 150;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.style.color = 'var(--text-secondary)';
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.style.color = 'var(--text-primary)';
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// Copy email on click
const emailCard = document.querySelector('a[href^="mailto:"]');
if (emailCard) {
    emailCard.addEventListener('click', (e) => {
        if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            const email = emailCard.querySelector('.contact-value').textContent;
            navigator.clipboard.writeText(email).then(() => {
                const originalText = emailCard.querySelector('.contact-value').textContent;
                emailCard.querySelector('.contact-value').textContent = 'Copied!';
                setTimeout(() => {
                    emailCard.querySelector('.contact-value').textContent = originalText;
                }, 2000);
            });
        }
    });
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to focus search (if implemented)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        console.log('Search shortcut pressed');
    }
    
    // Escape to close mobile menu
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// Add subtle mouse move effect to cards
document.querySelectorAll('.project-card, .contact-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// Prevent default behavior for demo links
document.querySelectorAll('.project-link').forEach(link => {
    if (link.getAttribute('href') === '#') {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Project link clicked - add your project URL here');
        });
    }
});

// Console message
console.log('%c👋 Hey there!', 'font-size: 20px; font-weight: bold; color: #00ff88;');
console.log('%cLooking for a software engineer? Let\'s talk!', 'font-size: 14px; color: #a3a3a3;');
console.log('%cEmail: Esrom.Ghebreweldi@gmail.com', 'font-size: 12px; color: #666666;');

// Initialize animations on load
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    updateActiveNavLink();
});

// Add loading transition
document.body.style.transition = 'opacity 0.3s ease';

// Log page load time
if (window.performance) {
    window.addEventListener('load', () => {
        const loadTime = window.performance.timing.domContentLoadedEventEnd - 
                        window.performance.timing.navigationStart;
        console.log(`⚡ Page loaded in ${loadTime}ms`);
    });
}