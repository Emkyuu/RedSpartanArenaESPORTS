// ============================================
// RED SPARTANS ARENA - JAVASCRIPT
// ============================================

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 60;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Add scroll effect to navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 15, 15, 0.95)';
        navbar.style.borderBottomColor = 'rgba(0, 212, 255, 0.5)';
    } else {
        navbar.style.background = 'linear-gradient(180deg, #0f0f0f 0%, transparent 100%)';
        navbar.style.borderBottomColor = 'rgba(0, 212, 255, 0.3)';
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideInLeft 0.8s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe game cards and news cards
document.querySelectorAll('.game-card, .news-card, .feature-item').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Contact Form Handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        if (name && email && message) {
            alert(`Thanks for reaching out, ${name}! We'll get back to you at ${email} soon.`);
            contactForm.reset();
        } else {
            alert('Please fill in all fields!');
        }
    });
}

// BUY NOW: open checkout modal
const buyNowBtn = document.getElementById('buyNowBtn');
const modal = document.getElementById('checkoutModal');
if (buyNowBtn && modal) {
    buyNowBtn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
    });
    // Close handlers
    modal.querySelectorAll('[data-close="modal"]').forEach(el => {
        el.addEventListener('click', () => {
            modal.classList.remove('open');
            modal.setAttribute('aria-hidden', 'true');
        });
    });
}

// Checkout form validation + fake submit
const checkoutForm = document.getElementById('checkoutForm');
if (checkoutForm) {
    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('custName').value.trim();
        const number = document.getElementById('custNumber').value.trim();
        const address = document.getElementById('custAddress').value.trim();
        const payment = document.getElementById('paymentMethod').value;

        if (!name || !number || !address || !payment) {
            alert('Please fill out all fields.');
            return;
        }

        // Basic phone check
        const digits = number.replace(/\D/g, '');
        if (digits.length < 7) {
            alert('Please enter a valid phone number.');
            return;
        }

        alert('Thank you! Your order request has been received.');
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        checkoutForm.reset();
    });
}

// Game Card Click Handler
document.querySelectorAll('.game-card').forEach(card => {
    card.addEventListener('click', function() {
        // Game card clicked
    });
});

// Parallax effect on hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrollPosition = window.scrollY;
        hero.style.backgroundPosition = `0 ${scrollPosition * 0.5}px`;
    }
});

// Random stat animation on scroll
const stats = document.querySelectorAll('.stat h3');
const animateStats = () => {
    stats.forEach(stat => {
        const number = parseInt(stat.textContent);
        if (!isNaN(number)) {
            const originalText = stat.textContent;
            let current = 0;
            const increment = Math.ceil(number / 30);
            const interval = setInterval(() => {
                current += increment;
                if (current >= number) {
                    stat.textContent = originalText;
                    clearInterval(interval);
                } else {
                    stat.textContent = current + '+';
                }
            }, 20);
        }
    });
};

// Trigger stat animation when section is in view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            statsObserver.unobserve(entry.target);
        }
    });
});

const communitySection = document.querySelector('.community');
if (communitySection) {
    statsObserver.observe(communitySection);
}

// Add click handlers to social links
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const platform = link.querySelector('i').className.split('fa-')[1];
        alert(`Following us on ${platform}!`);
    });
});

// Remove body opacity manipulation to prevent white flash on load
// (Keeping page rendering stable without forced opacity changes.)

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Press 'H' to scroll to hero
    if (e.key === 'h' || e.key === 'H') {
        document.querySelector('#home').scrollIntoView({ behavior: 'smooth' });
    }
    // Press 'G' to scroll to games
    if (e.key === 'g' || e.key === 'G') {
        document.querySelector('#games').scrollIntoView({ behavior: 'smooth' });
    }
    // Press 'N' to scroll to news
    if (e.key === 'n' || e.key === 'N') {
        document.querySelector('#news').scrollIntoView({ behavior: 'smooth' });
    }
});

// Mouse cursor tracking for a cool effect
const crosshair = document.querySelector('.crosshair');
if (crosshair) {
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        const heroGraphic = document.querySelector('.hero-graphic');
        if (heroGraphic) {
            const rect = heroGraphic.getBoundingClientRect();
            const relativeX = mouseX - rect.left - rect.width / 2;
            const relativeY = mouseY - rect.top - rect.height / 2;
            
            const distance = Math.sqrt(relativeX * relativeX + relativeY * relativeY);
            const maxDistance = Math.sqrt(rect.width * rect.width + rect.height * rect.height);
            
            if (distance < maxDistance) {
                crosshair.style.transform = `translate(-50%, -50%) translate(${relativeX * 0.1}px, ${relativeY * 0.1}px)`;
            }
        }
    });
}

console.log('RedSpartansArena Website loaded successfully!');
console.log('Keyboard Shortcuts: H = Home, G = Games, N = News');

// Showcase slideshow: rotate images every 5 seconds
const showcaseContainer = document.querySelector('#gallery .showcase-content');
if (showcaseContainer) {
    const slides = Array.from(showcaseContainer.querySelectorAll('.showcase-img'));
    let current = 0;
    // initialize
    slides.forEach((img, idx) => img.classList.toggle('active', idx === 0));
    setInterval(() => {
        slides[current].classList.remove('active');
        current = (current + 1) % slides.length;
        slides[current].classList.add('active');
    }, 5000);
}
