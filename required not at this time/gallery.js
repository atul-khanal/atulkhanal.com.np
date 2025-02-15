document.addEventListener('DOMContentLoaded', function() {
    // Slideshow functionality
    const imageCards = document.querySelectorAll('.personal-image-card');
    const grid = document.querySelector('.personal-images-grid');
    let currentIndex = 0;
    let slideshowInterval;

    // Create slideshow controls
    const controls = document.createElement('div');
    controls.className = 'slideshow-controls';
    imageCards.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `slideshow-dot${index === 0 ? ' active' : ''}`;
        dot.addEventListener('click', () => {
            clearInterval(slideshowInterval);
            currentIndex = index;
            updateSlideshow();
            startSlideshow();
        });
        controls.appendChild(dot);
    });
    grid.appendChild(controls);

    function updateSlideshow() {
        imageCards.forEach((card, index) => {
            card.className = 'personal-image-card';
            if (index === currentIndex) {
                card.classList.add('active');
            } else if (index === getPrevIndex()) {
                card.classList.add('prev');
            } else if (index === getNextIndex()) {
                card.classList.add('next');
            }
        });

        // Update dots
        const dots = controls.querySelectorAll('.slideshow-dot');
        dots.forEach((dot, index) => {
            dot.className = `slideshow-dot${index === currentIndex ? ' active' : ''}`;
        });
    }

    function getPrevIndex() {
        return currentIndex === 0 ? imageCards.length - 1 : currentIndex - 1;
    }

    function getNextIndex() {
        return currentIndex === imageCards.length - 1 ? 0 : currentIndex + 1;
    }

    function nextSlide() {
        currentIndex = getNextIndex();
        updateSlideshow();
    }

    function startSlideshow() {
        clearInterval(slideshowInterval);
        slideshowInterval = setInterval(nextSlide, 3000);
    }

    // Initialize slideshow
    updateSlideshow();
    startSlideshow();

    // Pause on hover
    grid.addEventListener('mouseenter', () => clearInterval(slideshowInterval));
    grid.addEventListener('mouseleave', startSlideshow);

    // Enlarged view functionality
    let activeCard = null;

    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'gallery-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: none;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    `;
    document.body.appendChild(overlay);

    // Create close button
    const closeButton = document.createElement('button');
    closeButton.className = 'gallery-close';
    closeButton.innerHTML = '×';
    closeButton.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: none;
        border: none;
        color: white;
        font-size: 40px;
        cursor: pointer;
        z-index: 1001;
        display: none;
    `;
    document.body.appendChild(closeButton);

    function handleImageClick(e) {
        clearInterval(slideshowInterval);
        const card = e.currentTarget;
        currentIndex = Array.from(imageCards).indexOf(card);
        
        if (activeCard === card) {
            closeActiveImage();
            return;
        }

        if (activeCard) {
            closeActiveImage();
        }

        activeCard = card;
        overlay.style.display = 'flex';
        closeButton.style.display = 'block';
        
        const container = document.createElement('div');
        container.className = 'enlarged-image-container';
        
        // Create navigation buttons
        const prevBtn = document.createElement('button');
        const nextBtn = document.createElement('button');
        prevBtn.className = 'enlarged-nav prev';
        nextBtn.className = 'enlarged-nav next';
        prevBtn.innerHTML = '❮';
        nextBtn.innerHTML = '❯';
        
        // Create counter
        const counter = document.createElement('div');
        counter.className = 'enlarged-counter';
        
        function updateCounter() {
            counter.textContent = `${currentIndex + 1} / ${imageCards.length}`;
        }
        
        function showEnlargedImage(index, direction = 'none') {
            const card = imageCards[index];
            const img = card.querySelector('img');
            
            const enlargedImg = document.createElement('img');
            enlargedImg.className = 'enlarged-image';
            enlargedImg.src = img.src;
            enlargedImg.alt = img.alt;
            
            // Remove any existing transition classes
            const existingImg = container.querySelector('.enlarged-image');
            if (existingImg) {
                if (direction === 'next') {
                    existingImg.classList.add('slide-out-left');
                    enlargedImg.classList.add('slide-from-right');
                } else if (direction === 'prev') {
                    existingImg.classList.add('slide-out-right');
                    enlargedImg.classList.add('slide-from-left');
                }
                
                setTimeout(() => {
                    existingImg.remove();
                    enlargedImg.classList.remove('slide-from-left', 'slide-from-right');
                    enlargedImg.classList.add('slide-in');
                }, 300);
            }
            
            container.appendChild(enlargedImg);
            
            if (!existingImg) {
                // Force reflow and add slide-in for first image
                enlargedImg.offsetHeight;
                enlargedImg.classList.add('slide-in');
            }
            
            updateCounter();
            
            // Update navigation buttons
            prevBtn.style.opacity = index === 0 ? '0.5' : '1';
            prevBtn.style.pointerEvents = index === 0 ? 'none' : 'auto';
            nextBtn.style.opacity = index === imageCards.length - 1 ? '0.5' : '1';
            nextBtn.style.pointerEvents = index === imageCards.length - 1 ? 'none' : 'auto';
        }
        
        // Navigation handlers
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                showEnlargedImage(currentIndex, 'prev');
            }
        });
        
        nextBtn.addEventListener('click', () => {
            if (currentIndex < imageCards.length - 1) {
                currentIndex++;
                showEnlargedImage(currentIndex, 'next');
            }
        });
        
        // Keyboard navigation
        function handleKeyDown(e) {
            if (!activeCard) return;
            
            switch(e.key) {
                case 'ArrowLeft':
                    if (currentIndex > 0) {
                        currentIndex--;
                        showEnlargedImage(currentIndex, 'prev');
                    }
                    break;
                case 'ArrowRight':
                    if (currentIndex < imageCards.length - 1) {
                        currentIndex++;
                        showEnlargedImage(currentIndex, 'next');
                    }
                    break;
                case 'Escape':
                    closeActiveImage();
                    break;
            }
        }
        
        document.addEventListener('keydown', handleKeyDown);
        
        // Auto-advance timer
        let enlargedInterval;
        function startEnlargedSlideshow() {
            clearInterval(enlargedInterval);
            enlargedInterval = setInterval(() => {
                if (currentIndex < imageCards.length - 1) {
                    currentIndex++;
                    showEnlargedImage(currentIndex, 'next');
                } else {
                    currentIndex = 0;
                    showEnlargedImage(currentIndex, 'next');
                }
            }, 3000);
        }
        
        container.addEventListener('mouseenter', () => clearInterval(enlargedInterval));
        container.addEventListener('mouseleave', startEnlargedSlideshow);
        
        overlay.innerHTML = '';
        overlay.appendChild(container);
        overlay.appendChild(prevBtn);
        overlay.appendChild(nextBtn);
        overlay.appendChild(counter);
        
        showEnlargedImage(currentIndex);
        startEnlargedSlideshow();
        
        // Cleanup function
        function cleanup() {
            clearInterval(enlargedInterval);
            document.removeEventListener('keydown', handleKeyDown);
        }
        
        return cleanup;
    }

    function closeActiveImage() {
        if (!activeCard) return;
        
        const cleanup = activeCard.cleanup;
        if (cleanup) cleanup();
        
        overlay.style.display = 'none';
        closeButton.style.display = 'none';
        activeCard = null;
        startSlideshow();
    }

    imageCards.forEach(card => {
        card.addEventListener('click', handleImageClick);
    });

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeActiveImage();
        }
    });
    
    closeButton.addEventListener('click', closeActiveImage);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeActiveImage();
        }
    });

    // Milestone image upload functionality
    const milestoneUploads = document.querySelectorAll('.milestone-upload');
    
    milestoneUploads.forEach(upload => {
        upload.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();
                const imageContainer = this.closest('.milestone-image-container');
                const img = imageContainer.querySelector('.milestone-image');
                
                reader.onload = function(e) {
                    img.src = e.target.result;
                    localStorage.setItem(`milestone-image-${upload.dataset.index}`, e.target.result);
                };
                
                reader.readAsDataURL(file);
            }
        });
    });

    // Load saved milestone images
    milestoneUploads.forEach(upload => {
        const savedImage = localStorage.getItem(`milestone-image-${upload.dataset.index}`);
        if (savedImage) {
            const imageContainer = upload.closest('.milestone-image-container');
            const img = imageContainer.querySelector('.milestone-image');
            img.src = savedImage;
        }
    });
}); 
