from flask import jsonify, request, Blueprint
from app import db
from app.models import User, AudioFile
from flask_login import login_required, current_user

bp = Blueprint('user', __name__)

@bp.route('/api/user/<int:user_id>/audio-files', methods=['GET'])
@login_required
def get_user_audio_files(user_id):
    # Ensure the user can only access their own audio files
    if current_user.id != user_id:
        return jsonify({'error': 'Unauthorized'}), 403
    
    audio_files = AudioFile.query.filter_by(user_id=user_id).order_by(AudioFile.upload_date.desc()).all()
    
    return jsonify([{
        'id': audio.id,
        'filename': audio.filename,
        'file_path': audio.file_path,
        'upload_date': audio.upload_date.isoformat(),
        'is_recorded': audio.is_recorded,
        'emotion_result': audio.emotion_result,
        'confidence_score': audio.confidence_score,
        'emotion_scores': {
            'angry': 0.1,  # These should be replaced with actual emotion scores
            'disgust': 0.1,
            'fear': 0.1,
            'happy': 0.1,
            'neutral': 0.1,
            'sad': 0.1,
            'surprise': 0.1
        }
    } for audio in audio_files]) 