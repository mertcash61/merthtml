import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from ..config.settings import SMTP_CONFIG

class EmailService:
    @staticmethod
    def send_verification_email(user_email, verification_token):
        msg = MIMEMultipart()
        msg['From'] = SMTP_CONFIG['username']
        msg['To'] = user_email
        msg['Subject'] = 'Email Verification'

        body = f"""
        Please verify your email by clicking the link below:
        http://yourwebsite.com/verify-email?token={verification_token}
        """
        msg.attach(MIMEText(body, 'plain'))

        with smtplib.SMTP(SMTP_CONFIG['host'], SMTP_CONFIG['port']) as server:
            server.starttls()
            server.login(SMTP_CONFIG['username'], SMTP_CONFIG['password'])
            server.send_message(msg)

    @staticmethod
    def send_password_reset_email(user_email, reset_token):
        msg = MIMEMultipart()
        msg['From'] = SMTP_CONFIG['username']
        msg['To'] = user_email
        msg['Subject'] = 'Password Reset'

        body = f"""
        Click the link below to reset your password:
        http://yourwebsite.com/reset-password?token={reset_token}
        """
        msg.attach(MIMEText(body, 'plain'))

        with smtplib.SMTP(SMTP_CONFIG['host'], SMTP_CONFIG['port']) as server:
            server.starttls()
            server.login(SMTP_CONFIG['username'], SMTP_CONFIG['password'])
            server.send_message(msg) 