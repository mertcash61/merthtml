-- Login işlemleri için veritabanı tablosu
CREATE DATABASE IF NOT EXISTS login_db;
USE login_db;

-- Kullanıcılar tablosu
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL,
    is_active BOOLEAN DEFAULT TRUE
);

-- Oturum tablosu
CREATE TABLE IF NOT EXISTS sessions (
    session_id VARCHAR(255) PRIMARY KEY,
    user_id INT NOT NULL,
    login_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_activity TIMESTAMP NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Başarısız giriş denemeleri tablosu (güvenlik için)
CREATE TABLE IF NOT EXISTS login_attempts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50),
    ip_address VARCHAR(45),
    attempt_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    success BOOLEAN DEFAULT FALSE
);

-- Örnek kullanıcı ekleme (şifre: 123456)
INSERT INTO users (username, password, email) VALUES 
('admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin@example.com');

-- Kullanıcı yetkileri tablosu
CREATE TABLE IF NOT EXISTS user_roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    role_name ENUM('admin', 'user', 'moderator') DEFAULT 'user',
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Şifre sıfırlama tablosu
CREATE TABLE IF NOT EXISTS password_resets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    reset_token VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NULL,
    is_used BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- İndeksler
CREATE INDEX idx_username ON users(username);
CREATE INDEX idx_email ON users(email);
CREATE INDEX idx_session_user ON sessions(user_id);
CREATE INDEX idx_login_attempts_ip ON login_attempts(ip_address);
CREATE INDEX idx_login_attempts_time ON login_attempts(attempt_time);

-- Görünümler
CREATE VIEW active_users AS
SELECT id, username, email, last_login
FROM users
WHERE is_active = TRUE;

CREATE VIEW failed_login_attempts AS
SELECT ip_address, COUNT(*) as attempt_count, MAX(attempt_time) as last_attempt
FROM login_attempts
WHERE success = FALSE AND attempt_time > DATE_SUB(NOW(), INTERVAL 1 HOUR)
GROUP BY ip_address;

-- Tetikleyiciler
DELIMITER //

-- Son giriş zamanını güncelleme tetikleyicisi
CREATE TRIGGER update_last_login
AFTER INSERT ON sessions
FOR EACH ROW
BEGIN
    UPDATE users 
    SET last_login = NEW.login_time 
    WHERE id = NEW.user_id;
END//

-- Eski oturumları temizleme prosedürü
CREATE PROCEDURE cleanup_old_sessions()
BEGIN
    DELETE FROM sessions 
    WHERE last_activity < DATE_SUB(NOW(), INTERVAL 24 HOUR);
END//

-- Eski şifre sıfırlama tokenlarını temizleme prosedürü
CREATE PROCEDURE cleanup_expired_tokens()
BEGIN
    DELETE FROM password_resets 
    WHERE expires_at < NOW() OR is_used = TRUE;
END//

DELIMITER ;

-- Yönetici hesabı için rol ataması
INSERT INTO user_roles (user_id, role_name) 
SELECT id, 'admin' FROM users WHERE username = 'admin'; 