// Better Auth-Inspired Portfolio JavaScript (Updated)

// =======================
// Helpers
// =======================
const nav = document.querySelector('.nav');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

function setNavBackground(scrolled) {
  if (!nav) return;
  nav.style.background = scrolled > 50 ? 'rgba(0, 0, 0, 0.95)' : 'rgba(0, 0, 0, 0.8)';
}

function closeMobileMenu() {
  if (!navLinks || !navToggle) return;
  navLinks.classList.remove('active');
  navToggle.classList.remove('active');
}

function safeQuerySelector(selector) {
  try { return document.querySelector(selector); } catch { return null; }
}

function isExternalLink(a) {
  try {
    const url = new URL(a.href);
    return url.origin !== window.location.origin;
  } catch {
    return false;
  }
}

// =======================
// Mobile Navigation
// =======================
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navToggle.classList.toggle('active');
  });

  // Close menu when clicking any nav link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => closeMobileMenu());
  });

  // Escape closes menu
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
      closeMobileMenu();
    }
  });
}

// =======================
// Smooth scroll (anchors only, not external or file links)
// =======================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (!href || href === '#') return;

    const target = safeQuerySelector(href);
    if (!target) return;

    e.preventDefault();

    const offset = 88; // adjust if nav height changes
    const targetPosition = target.offsetTop - offset;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  });
});

// =======================
// Navbar scroll effect + active link highlighting
// =======================
let ticking = false;

function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPosition = window.pageYOffset + 160;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      document.querySelectorAll('.nav-links a').forEach(link => {
        // Reset default
        link.style.color = 'var(--text-secondary)';

        // Highlight matching
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.style.color = 'var(--text-primary)';
        }
      });
    }
  });
}

window.addEventListener('scroll', () => {
  if (ticking) return;
  ticking = true;

  window.requestAnimationFrame(() => {
    const currentScroll = window.pageYOffset;
    setNavBackground(currentScroll);
    updateActiveNavLink();
    ticking = false;
  });
});

// =======================
// Intersection Observer (fade-ins + skill bars)
// =======================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    entry.target.classList.add('fade-in');

    // Animate skill bars
    if (entry.target.classList.contains('skill-item')) {
      const fill = entry.target.querySelector('.skill-fill');
      if (fill) {
        // Ensure animation restarts only once
        if (fill.dataset.animated === 'true') return;

        fill.dataset.animated = 'true';
        fill.style.width = '0';

        setTimeout(() => {
          fill.style.width = fill.style.getPropertyValue('--skill-width') || '0%';
        }, 120);
      }
    }
  });
}, observerOptions);

// Observe elements (added: metrics + experience)
const elementsToAnimate = document.querySelectorAll(
  '.project-card, .skill-category, .contact-card, .stat, .metric, .experience-card'
);

elementsToAnimate.forEach(el => observer.observe(el));

// Observe skill items separately for bar animation
document.querySelectorAll('.skill-item').forEach(item => observer.observe(item));

// =======================
// Terminal typing effect (optional)
// =======================
function typeText(element, text, speed = 50) {
  let i = 0;
  const cursor = element.querySelector('.cursor');

  if (!cursor) return;

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

// Initialize terminal typing if you want it
const terminalLine = document.querySelector('.terminal-line:last-child');
if (terminalLine) {
  // Example:
  // typeText(terminalLine, 'npm run dev', 100);
}

// =======================
// Parallax effect for hero section (light & safe)
// =======================
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroContent = document.querySelector('.hero .container');

  if (heroContent && scrolled < window.innerHeight) {
    heroContent.style.transform = `translateY(${scrolled * 0.25}px)`;
    heroContent.style.opacity = String(1 - (scrolled / 900));
  }
});

// =======================
// Copy email on Ctrl/Cmd + Click
// =======================
const emailCard = document.querySelector('a[href^="mailto:"]');
if (emailCard) {
  emailCard.addEventListener('click', (e) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const emailValueEl = emailCard.querySelector('.contact-value');
      const email = emailValueEl ? emailValueEl.textContent : '';

      if (!email) return;

      navigator.clipboard.writeText(email).then(() => {
        const originalText = emailValueEl.textContent;
        emailValueEl.textContent = 'Copied!';
        setTimeout(() => {
          emailValueEl.textContent = originalText;
        }, 1800);
      });
    }
  });
}

// =======================
// Keyboard shortcuts (optional)
// =======================
document.addEventListener('keydown', (e) => {
  // Ctrl/Cmd + K (reserved for future)
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    console.log('Search shortcut pressed (not implemented)');
  }
});

// =======================
// Subtle mouse move effect (don’t apply on touch devices)
// =======================
const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

if (!isTouchDevice) {
  document.querySelectorAll('.project-card, .contact-card, .experience-card, .metric').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 26;
      const rotateY = (centerX - x) / 26;

      // Keep hover translate consistent with your CSS hover effects
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// =======================
// Prevent default behavior only for placeholder links (href="#")
// Do NOT block real project URLs.
// =======================
document.querySelectorAll('a.project-link').forEach(link => {
  const href = link.getAttribute('href');

  // Only block true placeholders
  if (href === '#' || href === '' || href === null) {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('Project link clicked — add your real project URL');
    });
  }
});

// =======================
// Loading transition + init
// =======================
document.body.style.transition = 'opacity 0.3s ease';
document.body.style.opacity = '0';

window.addEventListener('load', () => {
  document.body.style.opacity = '1';
  setNavBackground(window.pageYOffset);
  updateActiveNavLink();
});

// =======================
// Console branding
// =======================
console.log('%c👋 Hey there!', 'font-size: 20px; font-weight: bold; color: #00ff88;');
console.log('%cLooking for a software engineer? Let\'s talk!', 'font-size: 14px; color: #a3a3a3;');
console.log('%cEmail: Esrom.Ghebreweldi@gmail.com', 'font-size: 12px; color: #666666;');

// =======================
// Log page load time (optional)
// =======================
if (window.performance && window.performance.timing) {
  window.addEventListener('load', () => {
    const loadTime = window.performance.timing.domContentLoadedEventEnd -
      window.performance.timing.navigationStart;
    console.log(`⚡ Page loaded in ${loadTime}ms`);
  });
}
