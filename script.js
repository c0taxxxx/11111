document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        this.classList.toggle('active');
    });

    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.glass-nav');
        const scrollTopBtn = document.getElementById('scrollTop');
        
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 60,
                    behavior: 'smooth'
                });
                
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    });

    document.getElementById('scrollTop').addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        });
    }

    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .showcase-content, .showcase-image');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    document.querySelectorAll('.feature-card, .showcase-content, .showcase-image').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
});

if (window.innerWidth <= 768) {
  document.querySelectorAll('.feature-card, .showcase-content, .showcase-image').forEach(element => {
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';
    element.style.transition = 'none';
  });
}

// Construction Gallery
function initConstructionGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (galleryItems.length === 0) return;
    
    let currentIndex = 0;
    
    function rotateGallery() {
        galleryItems[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % galleryItems.length;
        galleryItems[currentIndex].classList.add('active');
    }
    
    // Start rotation every 5 seconds
    setInterval(rotateGallery, 5000);
}

// Video Player
function initVideoPlayer() {
    const videoPlaceholder = document.getElementById('constructionVideo');
    if (!videoPlaceholder) return;
    
    videoPlaceholder.addEventListener('click', function() {
        this.innerHTML = `
            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/EXAMPLE_VIDEO_ID?autoplay=1" 
            frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; 
            gyroscope; picture-in-picture" allowfullscreen></iframe>
        `;
        this.classList.add('video-loaded');
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initConstructionGallery();
    initVideoPlayer();
    
    // Add construction terms section dynamically
});