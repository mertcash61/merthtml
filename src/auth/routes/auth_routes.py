from flask import Blueprint, request, jsonify
from ..services.auth_service import AuthService
from ..utils.validators import Validator
from ..utils.exceptions import AuthenticationError, ValidationError

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    try:
        if not Validator.validate_email(email):
            raise ValidationError('Invalid email format')

        result = AuthService.login(email, password)
        return jsonify(result), 200

    except (AuthenticationError, ValidationError) as e:
        return jsonify({'error': str(e)}), 400

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    try:
        if not Validator.validate_email(email):
            raise ValidationError('Invalid email format')
        if not Validator.validate_password(password):
            raise ValidationError('Invalid password format')
        if not Validator.validate_username(username):
            raise ValidationError('Invalid username format')

        result = AuthService.register(username, email, password)
        return jsonify(result), 201

    except (AuthenticationError, ValidationError) as e:
        return jsonify({'error': str(e)}), 400 