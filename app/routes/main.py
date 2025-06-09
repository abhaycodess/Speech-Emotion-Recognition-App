from flask import Blueprint, send_from_directory, current_app
import os

bp = Blueprint('main', __name__)

@bp.route('/', defaults={'path': ''})
@bp.route('/<path:path>')
def serve(path):
    try:
        if path != "" and os.path.exists(os.path.join(current_app.root_path, '..', 'frontend', 'build', path)):
            return send_from_directory(os.path.join(current_app.root_path, '..', 'frontend', 'build'), path)
        else:
            return send_from_directory(os.path.join(current_app.root_path, '..', 'frontend', 'build'), 'index.html')
    except Exception as e:
        current_app.logger.error(f"Error serving static file: {str(e)}")
        return "Internal Server Error", 500

@bp.route('/dashboard')
def dashboard():
    return render_template('dashboard.html') 