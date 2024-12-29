// Form validasyonları ve diğer JavaScript işlemleri
document.addEventListener('DOMContentLoaded', function() {
    // Login form kontrolü
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Register form kontrolü
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
});

// Login işlemi
function handleLogin(e) {
    // Form validasyonu ve AJAX işlemleri buraya gelecek
}

// Register işlemi
function handleRegister(e) {
    // Form validasyonu ve AJAX işlemleri buraya gelecek
} 