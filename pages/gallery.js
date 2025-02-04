document.addEventListener('DOMContentLoaded', function() {
    const imageCards = document.querySelectorAll('.personal-image-card');
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
        const card = e.currentTarget;
        const img = card.querySelector('img');
        
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
    }

    function closeActiveImage() {
        if (!activeCard) return;
        
        overlay.style.display = 'none';
        closeButton.style.display = 'none';
        activeCard = null;
    }

    imageCards.forEach(card => {
        card.addEventListener('click', handleImageClick);
    });

    overlay.addEventListener('click', closeActiveImage);
    closeButton.addEventListener('click', closeActiveImage);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeActiveImage();
        }
    });
}); 
