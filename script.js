// DOM Elements
const loadingScreen = document.getElementById('loading-screen');
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const heroText = document.getElementById('hero-text');
const skillBars = document.querySelectorAll('.skill-progress');
const projectFilters = document.querySelectorAll('.project-filter');
const projectCards = document.querySelectorAll('.project-card');
const contactForm = document.getElementById('contact-form');
const yearSpan = document.getElementById('year');

// Loading Screen
document.addEventListener('DOMContentLoaded', () => {
    // Ensure loading screen is visible
    if (loadingScreen) {
        loadingScreen.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
});


function sendMail() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    const subject = encodeURIComponent(`Message from ${name}`);
    const body = encodeURIComponent(`Name: ${name}%0AEmail: ${email}%0A%0A${message}`);

    window.location.href = `mailto:hi@atulkhanal.com.np?subject=${subject}&body=${body}`;
}


window.addEventListener('load', () => {
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                document.body.style.overflow = 'auto';
                startTypingAnimation();
                initializeSkillBars();
            }, 500);
        }, 1000);
    }
});

// Typing Animation
function startTypingAnimation() {
    if (heroText) {
        const text = "Cybersecurity Student & Security Enthusiast";
        let index = 0;
        heroText.textContent = '';

        function typeText() {
            if (index < text.length) {
                heroText.textContent += text.charAt(index);
                index++;
                setTimeout(typeText, 100);
            }
        }

        typeText();
    }
}

// Skill Bars Animation
function initializeSkillBars() {
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = width + '%';
        }, 200);
    });
}

// Project Filtering
projectFilters.forEach(filter => {
    filter.addEventListener('click', () => {
        // Update active state
        projectFilters.forEach(f => f.classList.remove('active', 'gradient-bg', 'text-white'));
        filter.classList.add('active', 'gradient-bg', 'text-white');

        const category = filter.getAttribute('data-filter');

        // Filter projects
        projectCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            if (category === 'all' || category === cardCategory) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Mobile Menu
if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
            mobileMenu.classList.add('hidden');
        }
    });

    // Close menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contact Form
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Disable button and show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Sending...';

        try {
            // Simulate form submission
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Show success state
            submitBtn.innerHTML = '<i class="fas fa-check mr-2"></i> Message Sent!';
            submitBtn.classList.remove('gradient-bg');
            submitBtn.classList.add('bg-green-500');
            
            // Reset form
            contactForm.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.classList.add('gradient-bg');
                submitBtn.classList.remove('bg-green-500');
            }, 3000);
        } catch (error) {
            // Show error state
            submitBtn.innerHTML = '<i class="fas fa-exclamation-circle mr-2"></i> Error! Try Again';
            submitBtn.classList.remove('gradient-bg');
            submitBtn.classList.add('bg-red-500');
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.classList.add('gradient-bg');
                submitBtn.classList.remove('bg-red-500');
            }, 3000);
        }
    });
}

// Update copyright year
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe sections for fade-in animation
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    observer.observe(section);

}); 

