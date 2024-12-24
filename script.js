function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Update icon
    const icon = document.querySelector('.theme-toggle i');
    if (theme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// Check for saved theme preference
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);

    // Add theme toggle button event listener
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });
});

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", function(e) {
        e.preventDefault();
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");

        const targetId = this.getAttribute("href");
        const targetSection = document.querySelector(targetId);
        const navbarHeight = document.querySelector(".navbar").offsetHeight;

        window.scrollTo({
            top: targetSection.offsetTop - navbarHeight,
            behavior: "smooth"
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.carousel-button.next');
    const prevButton = document.querySelector('.carousel-button.prev');
    const dotsContainer = document.querySelector('.carousel-dots');
    
    const slideWidth = slides[0].getBoundingClientRect().width;
    let currentIndex = 0;
    
    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dotsContainer.appendChild(dot);
        
        dot.addEventListener('click', () => {
            moveToSlide(index);
        });
    });
    
    const dots = Array.from(dotsContainer.children);
    
    // Arrange slides next to each other
    slides.forEach((slide, index) => {
        slide.style.left = slideWidth * index + 'px';
    });
    
    // Move slide function
    const moveToSlide = (targetIndex) => {
        if (targetIndex < 0) targetIndex = slides.length - 1;
        if (targetIndex >= slides.length) targetIndex = 0;
        
        track.style.transform = `translateX(-${targetIndex * (slideWidth + 32)}px)`;
        dots.forEach(dot => dot.classList.remove('active'));
        dots[targetIndex].classList.add('active');
        currentIndex = targetIndex;
    };
    
    // Next button click
    nextButton.addEventListener('click', () => {
        moveToSlide(currentIndex + 1);
    });
    
    // Previous button click
    prevButton.addEventListener('click', () => {
        moveToSlide(currentIndex - 1);
    });
    
    // Auto slide every 5 seconds
    setInterval(() => {
        moveToSlide(currentIndex + 1);
    }, 5000);
}); 