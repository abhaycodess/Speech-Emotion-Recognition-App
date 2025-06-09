from flask import Blueprint, request, jsonify
from flask_login import login_required
import librosa
import numpy as np
import soundfile as sf
from sklearn.preprocessing import StandardScaler
import joblib
import os

bp = Blueprint('api', __name__)

# Initialize model and scaler as None
model = None
scaler = None

# Try to load the model and scaler if they exist
try:
    model = joblib.load('model/emotion_model.pkl')
    scaler = joblib.load('model/scaler.pkl')
except FileNotFoundError:
    print("Model files not found. Please train the model first.")

def extract_features(audio_path):
    # Load audio file
    y, sr = librosa.load(audio_path, duration=3, offset=0.5)
    
    # Extract features
    mfccs = np.mean(librosa.feature.mfcc(y=y, sr=sr, n_mfcc=40).T, axis=0)
    chroma = np.mean(librosa.feature.chroma_stft(y=y, sr=sr).T, axis=0)
    mel = np.mean(librosa.feature.melspectrogram(y=y, sr=sr).T, axis=0)
    
    # Combine features
    features = np.hstack([mfccs, chroma, mel])
    return features

@bp.route('/api/predict', methods=['POST'])
# @login_required
def predict():
    if model is None or scaler is None:
        return jsonify({'error': 'Model not trained yet. Please train the model first.'}), 503
        
    if 'audio' not in request.files:
        return jsonify({'error': 'No audio file provided'}), 400
        
    audio_file = request.files['audio']
    if audio_file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
        
    # Save the uploaded file temporarily
    temp_path = 'temp_audio.wav'
    audio_file.save(temp_path)
    
    try:
        # Extract features
        features = extract_features(temp_path)
        features = features.reshape(1, -1)
        
        # Scale features
        features_scaled = scaler.transform(features)
        
        # Make prediction
        prediction = model.predict(features_scaled)[0]
        probabilities = model.predict_proba(features_scaled)[0]
        
        # Map prediction to emotion
        emotions = ['angry', 'disgust', 'fear', 'happy', 'neutral', 'sad', 'surprise']
        emotion = emotions[prediction]
        confidence = float(probabilities[prediction])
        
        # Clean up
        os.remove(temp_path)
        
        return jsonify({
            'emotion': emotion,
            'confidence': confidence,
            'probabilities': dict(zip(emotions, probabilities.tolist()))
        }), 200
        
    except Exception as e:
        if os.path.exists(temp_path):
            os.remove(temp_path)
        return jsonify({'error': str(e)}), 500 