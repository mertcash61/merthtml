// Animasyon yardımcı fonksiyonları
const Animator = {
    // Görünüm animasyonu
    fadeIn: (element, duration = 500) => {
        element.style.opacity = 0;
        element.style.display = 'block';

        let start = null;
        const animate = (timestamp) => {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            
            element.style.opacity = Math.min(progress / duration, 1);

            if (progress < duration) {
                requestAnimationFrame(animate);
            }
        };
        requestAnimationFrame(animate);
    },

    // Yukarı kayma animasyonu
    slideUp: (element, duration = 500) => {
        element.style.transform = 'translateY(20px)';
        element.style.opacity = 0;

        let start = null;
        const animate = (timestamp) => {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            
            const translateY = 20 - ((progress / duration) * 20);
            element.style.transform = `translateY(${translateY}px)`;
            element.style.opacity = Math.min(progress / duration, 1);

            if (progress < duration) {
                requestAnimationFrame(animate);
            }
        };
        requestAnimationFrame(animate);
    },

    // Scroll ile animasyon tetikleme
    observeElements: (elements, callback) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    callback(entry.target);
                }
            });
        });

        elements.forEach(element => observer.observe(element));
    }
};

// Kullanım örneği
document.addEventListener('DOMContentLoaded', () => {
    // Fade-in animasyonlu elementler
    const fadeElements = document.querySelectorAll('.fade-in');
    Animator.observeElements(fadeElements, (element) => {
        Animator.fadeIn(element);
    });

    // Slide-up animasyonlu elementler
    const slideElements = document.querySelectorAll('.slide-up');
    Animator.observeElements(slideElements, (element) => {
        Animator.slideUp(element);
    });
}); 