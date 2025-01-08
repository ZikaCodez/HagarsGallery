const images = [
    { id: 'img1', url: 'https://iili.io/2gUqfcu.jpg' },
    { id: 'img2', url: 'https://iili.io/2gUqKFe.jpg' },
    { id: 'img3', url: 'https://iili.io/2gUq3P9.jpg' },
    { id: 'img4', url: 'https://iili.io/2gUq2M7.jpg' },
    { id: 'img5', url: 'https://iili.io/2gUqnAx.jpg' },
    { id: 'img6', url: 'https://iili.io/2gUqxtV.jpg' },
    { id: 'img7', url: 'https://iili.io/2gUqTMP.jpg' },
    { id: 'img8', url: 'https://iili.io/2gUqRKF.jpg' },
    { id: 'img9', url: 'https://iili.io/2gUquP1.jpg' },
    { id: 'img10', url: 'https://iili.io/2gUq5cg.jpg' },
    { id: 'img11', url: 'https://iili.io/2gUqaHJ.jpg' },
    { id: 'img12', url: 'https://iili.io/2gUqcAv.jpg' },
    { id: 'img13', url: 'https://iili.io/2gUqlNR.jpg' },
    { id: 'img14', url: 'https://iili.io/2gUq0tp.jpg' },
    { id: 'img15', url: 'https://iili.io/2gUqEoN.jpg' },
];

let displayed = 0;
const galleryContainer = document.getElementById('gallery');
const seeMoreButton = document.getElementById('seeMore');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const closeModalButton = document.getElementById('close-modal');
const mobileTooltip = document.getElementById('mobile-tooltip');
const mobileMusicToggle = document.getElementById('mobile-music-toggle');

// Function to load images into the gallery
function loadImages(count) {
    for (let i = 0; i < count; i++) {
        if (displayed >= images.length) break; // Stop if all images are loaded

        // Create image container
        const imgContainer = document.createElement('div');
        imgContainer.className = 'relative w-full h-64 overflow-hidden rounded-lg shadow-md hover-grow animate-fadeInUp';

        // Create image element
        const img = document.createElement('img');
        img.src = images[displayed].url;
        img.alt = `Gallery ${displayed + 1}`;
        img.className = 'w-full h-full object-cover';

        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'overlay';
        overlay.dataset.url = images[displayed].url; // Store the image URL in a data attribute

        // Create overlay text
        const overlayText = document.createElement('p');
        overlayText.textContent = 'View full image';
        overlay.appendChild(overlayText);

        // Append image and overlay to container
        imgContainer.appendChild(img);
        imgContainer.appendChild(overlay);

        // Append container to gallery
        galleryContainer.appendChild(imgContainer);

        // Add click event to overlay
        overlay.addEventListener('click', function () {
            openModal(this.dataset.url); // Open modal with the image URL
        });

        displayed++; // Increment displayed counter
    }
}

// Load initial images (fewer on mobile)
const initialLoad = window.innerWidth < 640 ? 3 : 6;
loadImages(initialLoad);

// "See More" button functionality
seeMoreButton.addEventListener('click', () => {
    loadImages(3); // Load 3 more images each time
    if (displayed >= images.length) {
        seeMoreButton.style.display = 'none'; // Hide button if all images are loaded
    }
});

// Function to open the modal
function openModal(imageUrl) {
    modalImg.src = imageUrl; // Set the image source
    modal.classList.add('open'); // Add 'open' class for animation
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
}

// Function to close the modal
function closeModal() {
    modal.classList.remove('open'); // Remove 'open' class for animation
    document.body.style.overflow = 'auto'; // Restore scrolling when modal is closed
}

// Close modal when clicking the close button
closeModalButton.addEventListener('click', closeModal);

// Close modal when clicking outside the image
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal(); // Close the modal
    }
});

// Close modal when pressing the Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
        closeModal(); // Close the modal
    }
});

// Add event listeners to Artist Picks overlays
document.querySelectorAll('#artist-picks .overlay').forEach((overlay) => {
    overlay.addEventListener('click', function () {
        openModal(this.dataset.url); // Open modal with the image URL
    });
});

// Function to show the mobile tooltip
function showTooltip() {
    mobileTooltip.classList.add('show'); // Show tooltip
    setTimeout(() => {
        mobileTooltip.classList.remove('show'); // Hide tooltip after 2 seconds
    }, 2000);
}

// Show tooltip when the page loads (after a short delay)
window.addEventListener('load', () => {
    setTimeout(showTooltip, 1000); // Show tooltip 1 second after page load
});

// Show tooltip when the mobile music player button is clicked
mobileMusicToggle.addEventListener('click', showTooltip);

// Music Toggle Functionality
const music = document.getElementById('background-music');
const musicToggle = document.getElementById('music-toggle');
const playIcon = document.getElementById('play-icon');
const mobilePlayIcon = document.getElementById('mobile-play-icon');
const musicIcon = document.getElementById('music-icon');
const volumeSlider = document.getElementById('volume-slider');

// Set initial volume to 10% (0.1)
music.volume = 0.1;

// Desktop Toggle
musicToggle.addEventListener('click', () => {
    if (music.paused) {
        music.play();
        playIcon.classList.remove('fa-play');
        playIcon.classList.add('fa-pause');
    } else {
        music.pause();
        playIcon.classList.remove('fa-pause');
        playIcon.classList.add('fa-play');
    }
});

// Mobile Toggle
mobileMusicToggle.addEventListener('click', () => {
    if (music.paused) {
        music.play();
        musicIcon.classList.add('rotate');
        mobilePlayIcon.classList.remove('fa-play');
        mobilePlayIcon.classList.add('fa-pause');
    } else {
        music.pause();
        musicIcon.classList.remove('rotate');
        mobilePlayIcon.classList.remove('fa-pause');
        mobilePlayIcon.classList.add('fa-play');
    }
});

// Volume Control
volumeSlider.addEventListener('input', () => {
    music.volume = volumeSlider.value;
});