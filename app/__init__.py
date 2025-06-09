from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_cors import CORS
import os

db = SQLAlchemy()
login_manager = LoginManager()

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev')
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///nimbus.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Configure CORS - more permissive during development
    CORS(app, supports_credentials=True)

    db.init_app(app)
    login_manager.init_app(app)
    login_manager.login_view = 'auth.login'

    from app.routes import main, auth, api, user
    app.register_blueprint(main.bp)
    app.register_blueprint(auth.bp)
    app.register_blueprint(api.bp)
    app.register_blueprint(user.bp)

    with app.app_context():
        db.create_all()

    return app 