// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    once: true
});

// Timeline Events Data
const timelineEvents = [
    {
        date: 'February 14, 2023',
        title: 'Our First Date',
        description: 'That magical evening at the café where we first met.',
        image: 'https://source.unsplash.com/random/800x600/?cafe',
        details: 'I remember being so nervous, yet the moment I saw your smile, all my anxiety melted away. We talked for hours about everything and nothing, losing track of time. The way your eyes lit up when you spoke about your passions made my heart skip a beat.'
    },
    {
        date: 'April 1, 2023',
        title: 'First Trip Together',
        description: 'Our weekend getaway to the beach.',
        image: 'https://source.unsplash.com/random/800x600/?beach',
        details: 'Those three days felt like a beautiful dream. Walking hand in hand along the shore, watching the sunset, and building sandcastles like kids. I knew then that I wanted to create countless more memories with you.'
    },
    {
        date: 'June 15, 2023',
        title: 'Moving In Together',
        description: 'Starting our life under one roof.',
        image: 'https://source.unsplash.com/random/800x600/?home',
        details: 'Turning our house into a home, one memory at a time. From assembling furniture (and getting it hilariously wrong) to cooking our first meal together in our kitchen. Every day with you feels like an adventure.'
    },
    {
        date: 'December 25, 2023',
        title: 'Our First Christmas',
        description: 'The most magical holiday season.',
        image: 'https://source.unsplash.com/random/800x600/?christmas',
        details: 'Decorating our first Christmas tree together, baking cookies (even the burnt ones were perfect), and exchanging gifts under the twinkling lights. Your joy when you opened your present made my heart melt.'
    }
];

// Populate Timeline
const timeline = document.querySelector('.timeline');

timelineEvents.forEach((event, index) => {
    const timelineItem = document.createElement('div');
    timelineItem.className = 'timeline-item';
    timelineItem.setAttribute('data-aos', index % 2 === 0 ? 'fade-right' : 'fade-left');
    
    timelineItem.innerHTML = `
        <div class="timeline-content">
            <div class="timeline-date">${event.date}</div>
            <h3>${event.title}</h3>
            <img src="${event.image}" alt="${event.title}" class="timeline-img">
            <p>${event.description}</p>
            <button class="read-more" data-index="${index}">Read More</button>
        </div>
    `;
    
    timeline.appendChild(timelineItem);
});

// Modal Functionality
const modal = document.getElementById('eventModal');
const modalContent = modal.querySelector('.modal-body');
const closeModal = document.querySelector('.close-modal');

// Open Modal
document.querySelectorAll('.read-more').forEach(button => {
    button.addEventListener('click', () => {
        const event = timelineEvents[button.dataset.index];
        modalContent.innerHTML = `
            <h3>${event.title}</h3>
            <p class="timeline-date">${event.date}</p>
            <img src="${event.image}" alt="${event.title}" class="timeline-img">
            <p>${event.details}</p>
        `;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
});

// Close Modal
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Reveal Text Animation for Love Letter
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal-text').forEach(text => {
    observer.observe(text);
});

// Update Footer Year
document.querySelector('.year').textContent = new Date().getFullYear(); 