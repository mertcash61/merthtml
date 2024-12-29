from functools import wraps
from flask import request, jsonify
from ..utils.security import verify_token

def require_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'error': 'No token provided'}), 401

        user_id = verify_token(token.split(' ')[1])
        if not user_id:
            return jsonify({'error': 'Invalid token'}), 401

        return f(*args, **kwargs)
    return decorated

def require_admin(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'error': 'No token provided'}), 401

        user_id = verify_token(token.split(' ')[1])
        if not user_id:
            return jsonify({'error': 'Invalid token'}), 401

        # Admin kontrolü
        # ...

        return f(*args, **kwargs)
    return decorated 