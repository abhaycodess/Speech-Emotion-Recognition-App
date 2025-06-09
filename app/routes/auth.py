from flask import Blueprint, request, jsonify, current_app, redirect, url_for
from app.models import User
from app import db
from flask_login import login_user, logout_user, login_required, current_user
import logging
import traceback
import os
from google.oauth2 import id_token
from google.auth.transport import requests
from google_auth_oauthlib.flow import Flow
from pip._vendor import cachecontrol
import google.auth.transport.requests
import requests
import json
from pathlib import Path

bp = Blueprint('auth', __name__)

# Google OAuth2 configuration
GOOGLE_CLIENT_ID = os.getenv('GOOGLE_CLIENT_ID')
GOOGLE_CLIENT_SECRET = os.getenv('GOOGLE_CLIENT_SECRET')
GOOGLE_REDIRECT_URI = os.getenv('GOOGLE_REDIRECT_URI')

# Create a Flow instance to manage the OAuth 2.0 Authorization Grant Flow
client_config = {
    "web": {
        "client_id": GOOGLE_CLIENT_ID,
        "client_secret": GOOGLE_CLIENT_SECRET,
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "redirect_uris": [GOOGLE_REDIRECT_URI]
    }
}

@bp.route('/api/signup', methods=['POST'])
def signup():
    try:
        # Log the incoming request
        current_app.logger.info('Received signup request')
        
        # Get and log the request data
        data = request.get_json()
        current_app.logger.info(f'Signup data received: {data}')
        
        # Validate required fields
        required_fields = ['username', 'email', 'password']
        for field in required_fields:
            if not data.get(field):
                current_app.logger.warning(f'Missing required field: {field}')
                return jsonify({'error': f'{field} is required'}), 400

        # Check username format
        if len(data['username']) < 3:
            current_app.logger.warning(f'Username too short: {data["username"]}')
            return jsonify({'error': 'Username must be at least 3 characters long'}), 400

        # Check email format
        if '@' not in data['email']:
            current_app.logger.warning(f'Invalid email format: {data["email"]}')
            return jsonify({'error': 'Invalid email format'}), 400

        # Check password length
        if len(data['password']) < 6:
            current_app.logger.warning('Password too short')
            return jsonify({'error': 'Password must be at least 6 characters long'}), 400

        # Check for existing username
        if User.query.filter_by(username=data['username']).first():
            current_app.logger.warning(f'Username already exists: {data["username"]}')
            return jsonify({'error': 'Username already exists'}), 400
            
        # Check for existing email
        if User.query.filter_by(email=data['email']).first():
            current_app.logger.warning(f'Email already exists: {data["email"]}')
            return jsonify({'error': 'Email already exists'}), 400
            
        # Create new user
        current_app.logger.info('Creating new user')
        user = User(username=data['username'], email=data['email'])
        user.set_password(data['password'])
        
        db.session.add(user)
        db.session.commit()
        current_app.logger.info(f'User created successfully: {user.username}')

        # Log the user in after signup
        login_user(user)
        current_app.logger.info(f'User logged in after signup: {user.username}')
        
        return jsonify({
            'message': 'User created successfully',
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email
            }
        }), 201

    except Exception as e:
        # Log the full error with traceback
        current_app.logger.error(f'Signup error: {str(e)}')
        current_app.logger.error(f'Traceback: {traceback.format_exc()}')
        db.session.rollback()
        return jsonify({'error': 'An error occurred during signup'}), 500

@bp.route('/api/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        
        # Validate required fields
        if not data.get('email') or not data.get('password'):
            return jsonify({'error': 'Email and password are required'}), 400

        user = User.query.filter_by(email=data['email']).first()
        
        if user and user.check_password(data['password']):
            login_user(user)
            return jsonify({
                'message': 'Logged in successfully',
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email
                }
            }), 200
            
        return jsonify({'error': 'Invalid email or password'}), 401

    except Exception as e:
        current_app.logger.error(f'Login error: {str(e)}')
        return jsonify({'error': 'An error occurred during login'}), 500

@bp.route('/api/logout')
@login_required
def logout():
    try:
        logout_user()
        return jsonify({'message': 'Logged out successfully'}), 200
    except Exception as e:
        current_app.logger.error(f'Logout error: {str(e)}')
        return jsonify({'error': 'An error occurred during logout'}), 500

@bp.route('/api/current_user')
@login_required
def get_current_user():
    try:
        return jsonify({
            'id': current_user.id,
            'username': current_user.username,
            'email': current_user.email
        }), 200
    except Exception as e:
        current_app.logger.error(f'Get current user error: {str(e)}')
        return jsonify({'error': 'An error occurred while fetching user data'}), 500

@bp.route('/api/auth/google')
def google_login():
    try:
        flow = Flow.from_client_config(
            client_config,
            scopes=["openid", "https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email"],
            redirect_uri=GOOGLE_REDIRECT_URI
        )
        authorization_url, state = flow.authorization_url(
            access_type='offline',
            include_granted_scopes='true'
        )
        return redirect(authorization_url)
    except Exception as e:
        current_app.logger.error(f'Google login error: {str(e)}')
        return jsonify({'error': 'An error occurred during Google login'}), 500

@bp.route('/api/auth/google/callback')
def google_callback():
    try:
        flow = Flow.from_client_config(
            client_config,
            scopes=["openid", "https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email"],
            redirect_uri=GOOGLE_REDIRECT_URI
        )
        
        # Get the authorization response from the callback
        flow.fetch_token(authorization_response=request.url)
        
        # Get credentials and user info
        credentials = flow.credentials
        session = requests.session()
        cached_session = cachecontrol.CacheControl(session)
        token_request = google.auth.transport.requests.Request(session=cached_session)
        
        id_info = id_token.verify_oauth2_token(
            id_token=credentials._id_token,
            request=token_request,
            audience=GOOGLE_CLIENT_ID
        )
        
        # Get user info from Google
        userinfo_response = requests.get(
            'https://www.googleapis.com/oauth2/v3/userinfo',
            headers={'Authorization': f'Bearer {credentials.token}'}
        ).json()
        
        # Check if user exists
        user = User.query.filter_by(email=userinfo_response['email']).first()
        
        if not user:
            # Create new user
            user = User(
                username=userinfo_response['name'],
                email=userinfo_response['email']
            )
            db.session.add(user)
            db.session.commit()
        
        # Log in the user
        login_user(user)
        
        # Redirect to frontend with success
        return redirect('http://localhost:3000/auth/success')
        
    except Exception as e:
        current_app.logger.error(f'Google callback error: {str(e)}')
        return redirect('http://localhost:3000/auth/error') 