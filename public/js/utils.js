// Yardımcı fonksiyonlar
const Utils = {
    // Form validasyonu
    validateForm: (formElement) => {
        const inputs = formElement.querySelectorAll('input, textarea, select');
        let isValid = true;

        inputs.forEach(input => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                isValid = false;
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }

            if (input.type === 'email' && input.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value)) {
                    isValid = false;
                    input.classList.add('error');
                }
            }
        });

        return isValid;
    },

    // Debounce fonksiyonu
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // LocalStorage işlemleri
    storage: {
        set: (key, value) => {
            try {
                localStorage.setItem(key, JSON.stringify(value));
            } catch (e) {
                console.error('LocalStorage error:', e);
            }
        },
        get: (key) => {
            try {
                const item = localStorage.getItem(key);
                return item ? JSON.parse(item) : null;
            } catch (e) {
                console.error('LocalStorage error:', e);
                return null;
            }
        },
        remove: (key) => {
            try {
                localStorage.removeItem(key);
            } catch (e) {
                console.error('LocalStorage error:', e);
            }
        }
    },

    // URL parametrelerini alma
    getUrlParams: () => {
        const params = {};
        new URLSearchParams(window.location.search).forEach((value, key) => {
            params[key] = value;
        });
        return params;
    }
};

// Kullanım örneği
document.addEventListener('DOMContentLoaded', () => {
    // Form validasyonu örneği
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            if (!Utils.validateForm(form)) {
                e.preventDefault();
            }
        });
    });

    // Debounce örneği
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', Utils.debounce(() => {
            // Arama işlemi
            console.log('Searching...');
        }, 500));
    }
}); 