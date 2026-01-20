const languageToggle = document.getElementById('languageToggle');
let currentLanguage = 'en';

function toggleLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'ta' : 'en';
    updateLanguage();
}

function updateLanguage() {
    document.querySelectorAll('[data-en]').forEach(element => {
        if (currentLanguage === 'en') {
            element.textContent = element.getAttribute('data-en');
        } else {
            element.textContent = element.getAttribute('data-ta');
        }
    });

    const toggleText = languageToggle.querySelector('span');
    if (currentLanguage === 'en') {
        toggleText.textContent = 'Tamil';
    } else {
        toggleText.textContent = 'English';
    }
}

languageToggle.addEventListener('click', toggleLanguage);

window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function() {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

const galleryTrack = document.querySelector('.gallery-track');
const gallerySlides = document.querySelectorAll('.gallery-slide');
const galleryDots = document.querySelectorAll('.gallery-dot');
const prevBtn = document.querySelector('.gallery-control.prev');
const nextBtn = document.querySelector('.gallery-control.next');
let currentSlide = 0;
const slideCount = gallerySlides.length;

function goToSlide(index) {
    galleryTrack.style.transform = `translateX(-${index * 100}%)`;
    
    gallerySlides.forEach(slide => slide.classList.remove('active'));
    gallerySlides[index].classList.add('active');
    
    galleryDots.forEach(dot => dot.classList.remove('active'));
    galleryDots[index].classList.add('active');
    
    currentSlide = index;
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slideCount;
    goToSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slideCount) % slideCount;
    goToSlide(currentSlide);
}

let slideInterval = setInterval(nextSlide, 5000);

const galleryContainer = document.querySelector('.gallery-container');
galleryContainer.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
});

galleryContainer.addEventListener('mouseleave', () => {
    slideInterval = setInterval(nextSlide, 5000);
});

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

galleryDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        goToSlide(index);
    });
});

const categoryBtns = document.querySelectorAll('.category-btn');
const programCards = document.querySelectorAll('.program-card');

categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        categoryBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const category = btn.getAttribute('data-category');
        
        programCards.forEach(card => {
            if (category === 'all' || card.getAttribute('data-category') === category) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

function checkScroll() {
    const elements = document.querySelectorAll('.about-img, .about-text, .program-card, .stat, .floating-img');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animate');
        }
    });
}

window.addEventListener('scroll', checkScroll);
window.addEventListener('load', checkScroll);

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert(currentLanguage === 'en' ? 'Thank you for your message! We will get back to you soon.' : 'உங்கள் செய்திக்கு நன்றி! விரைவில் உங்களுக்கு பதிலளிப்போம்.');
    this.reset();
});

function createHeroSlideshow() {
    const slideshowContainer = document.getElementById('heroBgSlideshow');
    const images = [
        'img/1.jpg',
        'img/2.jpg',
        'img/3.jpg',
        'img/4.jpg',
        'img/5.jpg',
        'img/8.jpg',
        'img/9.jpg',
        'img/a1.jpg',
        'img/81.jpg',
        'img/a2.jpg',
        'img/a3.jpg',
        'img/a4.jpg',
        'img/a5.jpg',
        'img/a6.jpg',
        'img/a7.jpg',
        'img/a8.jpg',
        'img/news1.jpg',
        'img/a9.jpg',
        'img/a10.jpg',
        'img/a12.jpg',
        'img/a11.jpg',
        'img/a13.jpg',
        'img/a14.jpg',
        'img/a15.jpg',
        'img/a16.jpg',
        'img/a17.jpg',
        'img/a18.jpg',
        'img/a19.jpg',
        'img/a20.jpg',
        'img/a22.jpg',
        'img/a21.jpg',
        'img/a23.jpg',
        'img/a24.jpg',
        'img/a25.jpg',
        'img/a26.jpg',
        'img/a27.jpg',
        'img/a28.jpg',
        'img/a29.jpg',
        'img/a30.jpg',
        'img/a31.jpg',
        'img/a32.jpg',
        'img/a33.jpg',
        'img/a34.jpg',
        'img/a35.jpg',
        'img/a36.jpg',
        'img/a37.jpg',
        'img/a38.jpg',
        'img/t1.jpg',
        'img/m.jpg',
        'img/y1.jpg',
        'img/y2.jpg',
        'img/10.jpg'
    ];
    
    images.forEach((image, index) => {
        const slide = document.createElement('div');
        slide.className = 'hero-bg-slide';
        slide.style.backgroundImage = `url(${image})`;
        
        if (index === 0) {
            slide.classList.add('active');
        }
        
        slideshowContainer.appendChild(slide);
    });
    
    let currentSlideIndex = 0;
    const slides = document.querySelectorAll('.hero-bg-slide');
    
    setInterval(() => {
        slides[currentSlideIndex].classList.remove('active');
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        slides[currentSlideIndex].classList.add('active');
    }, 5000);
}

document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeBtn = document.querySelector('.close-modal');
    
    document.querySelectorAll('.zoomable').forEach(img => {
        img.addEventListener('click', function() {
            modal.style.display = 'flex';
            modalImg.src = this.src;
        });
    });
    
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modal.style.display = 'none';
        }
    });
});

window.addEventListener('load', function() {
    createHeroSlideshow();
    checkScroll();
});