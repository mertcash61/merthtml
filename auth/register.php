<?php
// Veritabanı bağlantısını dahil et
require_once "config.php";

// Değişkenleri tanımla
$fullname = $email = $password = $confirm_password = "";
$fullname_err = $email_err = $password_err = $confirm_password_err = "";

// Form gönderildiyse
if($_SERVER["REQUEST_METHOD"] == "POST"){
    
    // Ad Soyad kontrolü
    if(empty(trim($_POST["fullname"]))){
        $fullname_err = "Lütfen ad soyad giriniz.";
    } else {
        $fullname = trim($_POST["fullname"]);
    }
    
    // E-posta kontrolü
    if(empty(trim($_POST["email"]))){
        $email_err = "Lütfen e-posta giriniz.";
    } else {
        // E-posta kullanılıyor mu kontrol et
        $sql = "SELECT id FROM users WHERE email = :email";
        
        if($stmt = $pdo->prepare($sql)){
            $stmt->bindParam(":email", $param_email, PDO::PARAM_STR);
            $param_email = trim($_POST["email"]);
            
            if($stmt->execute()){
                if($stmt->rowCount() == 1){
                    $email_err = "Bu e-posta adresi zaten kullanılıyor.";
                } else {
                    $email = trim($_POST["email"]);
                }
            } else {
                echo "Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.";
            }

            unset($stmt);
        }
    }
    
    // Şifre kontrolü
    if(empty(trim($_POST["password"]))){
        $password_err = "Lütfen şifre giriniz.";     
    } elseif(strlen(trim($_POST["password"])) < 6){
        $password_err = "Şifre en az 6 karakter olmalıdır.";
    } else {
        $password = trim($_POST["password"]);
    }
    
    // Şifre tekrar kontrolü
    if(empty(trim($_POST["confirm_password"]))){
        $confirm_password_err = "Lütfen şifreyi tekrar giriniz.";     
    } else {
        $confirm_password = trim($_POST["confirm_password"]);
        if(empty($password_err) && ($password != $confirm_password)){
            $confirm_password_err = "Şifreler eşleşmiyor.";
        }
    }
    
    // Hata kontrolü
    if(empty($fullname_err) && empty($email_err) && empty($password_err) && empty($confirm_password_err)){
        
        // Kayıt işlemi
        $sql = "INSERT INTO users (fullname, email, password) VALUES (:fullname, :email, :password)";
         
        if($stmt = $pdo->prepare($sql)){
            $stmt->bindParam(":fullname", $param_fullname, PDO::PARAM_STR);
            $stmt->bindParam(":email", $param_email, PDO::PARAM_STR);
            $stmt->bindParam(":password", $param_password, PDO::PARAM_STR);
            
            $param_fullname = $fullname;
            $param_email = $email;
            $param_password = password_hash($password, PASSWORD_DEFAULT);
            
            if($stmt->execute()){
                // Giriş sayfasına yönlendir
                header("location: login.html");
                exit;
            } else {
                echo "Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.";
            }

            unset($stmt);
        }
    }
    
    unset($pdo);
}
?> 