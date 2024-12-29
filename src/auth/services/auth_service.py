from ..models.user import User
from ..utils.security import verify_password, generate_token
from ..utils.exceptions import AuthenticationError

class AuthService:
    @staticmethod
    def login(email, password):
        user = User.find_by_email(email)
        if not user or not verify_password(password, user['password']):
            raise AuthenticationError('Invalid email or password')
        
        return {
            'token': generate_token(user['id']),
            'user': {
                'id': user['id'],
                'email': user['email'],
                'username': user['username']
            }
        }

    @staticmethod
    def register(username, email, password):
        if User.find_by_email(email):
            raise AuthenticationError('Email already exists')
        
        user = User(username=username, email=email, password=password)
        user_id = user.save()
        
        return {
            'token': generate_token(user_id),
            'user': {
                'id': user_id,
                'email': email,
                'username': username
            }
        } 