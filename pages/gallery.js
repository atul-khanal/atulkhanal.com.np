document.addEventListener('DOMContentLoaded', function() {
    // Create overlay and close button elements
    const overlay = document.createElement('div');
    overlay.className = 'personal-image-overlay';
    document.body.appendChild(overlay);

    const closeButton = document.createElement('button');
    closeButton.className = 'close-button';
    closeButton.innerHTML = '×';
    document.body.appendChild(closeButton);

    let activeCard = null;
    let currentIndex = 0;
    const imageCards = document.querySelectorAll('.personal-image-card');

    // Create navigation buttons
    const prevButton = document.createElement('button');
    prevButton.className = 'nav-button prev-button';
    prevButton.innerHTML = '❮';
    document.body.appendChild(prevButton);

    const nextButton = document.createElement('button');
    nextButton.className = 'nav-button next-button';
    nextButton.innerHTML = '❯';
    document.body.appendChild(nextButton);

    // Function to handle image click
    function handleImageClick(card) {
        if (activeCard === card) {
            closeActiveImage();
        } else {
            if (activeCard) {
                // Slide out current image
                activeCard.style.transform = 'translate(-100%, -50%)';
                activeCard.style.opacity = '0';
                setTimeout(() => {
                    activeCard.classList.remove('active');
                    activeCard.classList.add('minimized');
                    activeCard.style.transform = '';
                    activeCard.style.opacity = '';
                }, 300);
            }

            // Update current index
            currentIndex = Array.from(imageCards).indexOf(card);

            // Slide in new image
            card.classList.remove('minimized');
            card.classList.add('active');
            card.style.transform = 'translate(100%, -50%)';
            card.style.opacity = '0';
            
            requestAnimationFrame(() => {
                card.style.transform = 'translate(-50%, -50%)';
                card.style.opacity = '1';
            });

            overlay.classList.add('active');
            closeButton.classList.add('active');
            updateNavigationButtons();
            activeCard = card;
        }
    }

    // Function to navigate between images
    function navigateImages(direction) {
        const newIndex = currentIndex + direction;
        if (newIndex >= 0 && newIndex < imageCards.length) {
            const nextCard = imageCards[newIndex];
            
            // Slide out current image
            activeCard.style.transform = direction > 0 ? 
                'translate(-150%, -50%)' : 'translate(50%, -50%)';
            activeCard.style.opacity = '0';

            setTimeout(() => {
                activeCard.classList.remove('active');
                activeCard.classList.add('minimized');
                activeCard.style.transform = '';
                activeCard.style.opacity = '';

                // Slide in new image
                nextCard.classList.remove('minimized');
                nextCard.classList.add('active');
                nextCard.style.transform = direction > 0 ? 
                    'translate(50%, -50%)' : 'translate(-150%, -50%)';
                nextCard.style.opacity = '0';

                requestAnimationFrame(() => {
                    nextCard.style.transform = 'translate(-50%, -50%)';
                    nextCard.style.opacity = '1';
                });

                activeCard = nextCard;
                currentIndex = newIndex;
                updateNavigationButtons();
            }, 300);
        }
    }

    // Update navigation buttons visibility
    function updateNavigationButtons() {
        prevButton.style.display = currentIndex > 0 ? 'block' : 'none';
        nextButton.style.display = currentIndex < imageCards.length - 1 ? 'block' : 'none';
        
        if (activeCard) {
            prevButton.classList.add('active');
            nextButton.classList.add('active');
        } else {
            prevButton.classList.remove('active');
            nextButton.classList.remove('active');
        }
    }

    // Function to close active image
    function closeActiveImage() {
        if (activeCard) {
            activeCard.style.transform = 'translate(-50%, -50%) scale(0.8)';
            activeCard.style.opacity = '0';
            overlay.style.opacity = '0';
            
            setTimeout(() => {
                activeCard.classList.remove('active');
                activeCard.classList.remove('minimized');
                activeCard.style.transform = '';
                activeCard.style.opacity = '';
                overlay.classList.remove('active');
                overlay.style.opacity = '';
                closeButton.classList.remove('active');
                prevButton.classList.remove('active');
                nextButton.classList.remove('active');
                activeCard = null;
            }, 300);
        }
    }

    // Add click event listeners
    imageCards.forEach(card => {
        card.addEventListener('click', () => handleImageClick(card));
    });

    overlay.addEventListener('click', closeActiveImage);
    closeButton.addEventListener('click', closeActiveImage);
    prevButton.addEventListener('click', () => navigateImages(-1));
    nextButton.addEventListener('click', () => navigateImages(1));

    // Handle keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (activeCard) {
            switch(e.key) {
                case 'Escape':
                    closeActiveImage();
                    break;
                case 'ArrowLeft':
                    navigateImages(-1);
                    break;
                case 'ArrowRight':
                    navigateImages(1);
                    break;
            }
        }
    });
}); 
