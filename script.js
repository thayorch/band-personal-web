document.addEventListener('DOMContentLoaded', function() {
    // Carousel functionality
    const carousel = document.querySelector('.carousel');
    const inner = document.querySelector('.carousel-inner');
    const items = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const indicators = document.querySelectorAll('.indicator');
    
    let currentIndex = 0;
    const itemCount = items.length;
    let intervalId;
    const intervalTime = 5000; // 5 seconds
    
    // Set initial active item
    function setActiveItem(index) {
        // Update indicators
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
        
        // Update carousel position
        inner.style.transform = `translateX(-${index * 100}%)`;
        
        currentIndex = index;
    }
    
    // Next slide
    function nextSlide() {
        const newIndex = (currentIndex + 1) % itemCount;
        setActiveItem(newIndex);
    }
    
    // Previous slide
    function prevSlide() {
        const newIndex = (currentIndex - 1 + itemCount) % itemCount;
        setActiveItem(newIndex);
    }
    
    // Start auto rotation
    function startAutoRotation() {
        intervalId = setInterval(nextSlide, intervalTime);
    }
    
    // Stop auto rotation
    function stopAutoRotation() {
        clearInterval(intervalId);
    }
    
    // Event listeners
    nextBtn.addEventListener('click', () => {
        nextSlide();
        stopAutoRotation();
        startAutoRotation();
    });
    
    prevBtn.addEventListener('click', () => {
        prevSlide();
        stopAutoRotation();
        startAutoRotation();
    });
    
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            setActiveItem(index);
            stopAutoRotation();
            startAutoRotation();
        });
    });
    
    // Pause on hover
    carousel.addEventListener('mouseenter', stopAutoRotation);
    carousel.addEventListener('mouseleave', startAutoRotation);
    
    // Start the auto rotation
    startAutoRotation();
    
    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Mobile menu toggle (could be expanded for mobile)
    // Add mobile menu functionality if needed
});