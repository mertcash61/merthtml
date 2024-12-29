<?php
// Oturum başlat
session_start();

// Veritabanı bağlantısını dahil et
require_once "config.php";

// Hata mesajı değişkeni
$login_err = "";

// Form gönderildiyse
if($_SERVER["REQUEST_METHOD"] == "POST"){
    
    // E-posta ve şifre alanları boş mu kontrol et
    if(empty(trim($_POST["email"])) || empty(trim($_POST["password"]))){
        $login_err = "Lütfen e-posta ve şifre giriniz.";
    } else {
        $email = trim($_POST["email"]);
        $password = trim($_POST["password"]);
        
        // Veritabanında kullanıcıyı ara
        $sql = "SELECT id, fullname, email, password FROM users WHERE email = :email";
        
        if($stmt = $pdo->prepare($sql)){
            $stmt->bindParam(":email", $email, PDO::PARAM_STR);
            
            if($stmt->execute()){
                if($stmt->rowCount() == 1){
                    if($row = $stmt->fetch()){
                        $id = $row["id"];
                        $fullname = $row["fullname"];
                        $email = $row["email"];
                        $hashed_password = $row["password"];
                        
                        if(password_verify($password, $hashed_password)){
                            // Şifre doğruysa oturum başlat
                            session_start();
                            
                            // Oturum değişkenlerini ata
                            $_SESSION["loggedin"] = true;
                            $_SESSION["id"] = $id;
                            $_SESSION["fullname"] = $fullname;
                            $_SESSION["email"] = $email;
                            
                            // Son giriş zamanını güncelle
                            $update_sql = "UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = :id";
                            $update_stmt = $pdo->prepare($update_sql);
                            $update_stmt->bindParam(":id", $id, PDO::PARAM_INT);
                            $update_stmt->execute();
                            
                            // Ana sayfaya yönlendir
                            header("location: index.html");
                            exit;
                        } else {
                            $login_err = "Geçersiz e-posta veya şifre.";
                        }
                    }
                } else {
                    $login_err = "Geçersiz e-posta veya şifre.";
                }
            } else {
                echo "Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.";
            }
            
            unset($stmt);
        }
    }
    
    unset($pdo);
}
?> 