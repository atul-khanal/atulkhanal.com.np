document.addEventListener('DOMContentLoaded', function() {
    const imageCards = document.querySelectorAll('.personal-image-card');
    let activeCard = null;
    let currentIndex = 0;

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

    // Create navigation buttons for enlarged view
    const prevBtn = document.createElement('button');
    const nextBtn = document.createElement('button');
    prevBtn.className = 'gallery-nav prev-nav';
    nextBtn.className = 'gallery-nav next-nav';
    prevBtn.innerHTML = '❮';
    nextBtn.innerHTML = '❯';
    prevBtn.style.cssText = `
        position: fixed;
        top: 50%;
        left: 20px;
        transform: translateY(-50%);
        background: rgba(74, 4, 4, 0.8);
        color: white;
        border: none;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        font-size: 20px;
        cursor: pointer;
        z-index: 1002;
        display: none;
        align-items: center;
        justify-content: center;
    `;
    nextBtn.style.cssText = `
        position: fixed;
        top: 50%;
        right: 20px;
        transform: translateY(-50%);
        background: rgba(74, 4, 4, 0.8);
        color: white;
        border: none;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        font-size: 20px;
        cursor: pointer;
        z-index: 1002;
        display: none;
        align-items: center;
        justify-content: center;
    `;
    document.body.appendChild(prevBtn);
    document.body.appendChild(nextBtn);

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

    function showImage(index) {
        const card = imageCards[index];
        const img = card.querySelector('img');
        
        const enlargedImg = document.createElement('img');
        enlargedImg.src = img.src;
        enlargedImg.style.cssText = `
            max-width: 90%;
            max-height: 90vh;
            object-fit: contain;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        `;
        
        overlay.innerHTML = '';
        overlay.appendChild(enlargedImg);

        // Show/hide navigation buttons
        prevBtn.style.display = index === 0 ? 'none' : 'flex';
        nextBtn.style.display = index === imageCards.length - 1 ? 'none' : 'flex';
    }

    function handleImageClick(e) {
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
        showImage(currentIndex);
    }

    function closeActiveImage() {
        if (!activeCard) return;
        
        overlay.style.display = 'none';
        closeButton.style.display = 'none';
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
        activeCard = null;
    }

    // Touch swipe functionality
    let touchStartX = 0;
    let touchEndX = 0;

    overlay.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    overlay.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0 && currentIndex < imageCards.length - 1) {
                // Swipe left
                currentIndex++;
                showImage(currentIndex);
            } else if (diff < 0 && currentIndex > 0) {
                // Swipe right
                currentIndex--;
                showImage(currentIndex);
            }
        }
    }

    // Navigation handlers
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            showImage(currentIndex);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentIndex < imageCards.length - 1) {
            currentIndex++;
            showImage(currentIndex);
        }
    });

    imageCards.forEach(card => {
        card.addEventListener('click', handleImageClick);
    });

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeActiveImage();
        }
    });
    
    closeButton.addEventListener('click', closeActiveImage);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!activeCard) return;
        
        switch(e.key) {
            case 'Escape':
                closeActiveImage();
                break;
            case 'ArrowLeft':
                if (currentIndex > 0) {
                    currentIndex--;
                    showImage(currentIndex);
                }
                break;
            case 'ArrowRight':
                if (currentIndex < imageCards.length - 1) {
                    currentIndex++;
                    showImage(currentIndex);
                }
                break;
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
                    // Optional: Save to localStorage to persist the uploaded image
                    localStorage.setItem(`milestone-image-${upload.dataset.index}`, e.target.result);
                };
                
                reader.readAsDataURL(file);
            }
        });
    });

    // Load saved images from localStorage if any
    milestoneUploads.forEach(upload => {
        const savedImage = localStorage.getItem(`milestone-image-${upload.dataset.index}`);
        if (savedImage) {
            const imageContainer = upload.closest('.milestone-image-container');
            const img = imageContainer.querySelector('.milestone-image');
            img.src = savedImage;
        }
    });
}); 
