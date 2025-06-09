import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
import joblib
import os

# Create a simple test dataset
np.random.seed(42)
n_samples = 1000

# Generate random features similar to what we'd extract from audio
n_features = 40 + 12 + 128  # mfcc + chroma + mel features
X = np.random.randn(n_samples, n_features)

# Generate random labels (7 emotion classes)
emotions = ['angry', 'disgust', 'fear', 'happy', 'neutral', 'sad', 'surprise']
y = np.random.randint(0, len(emotions), n_samples)

# Create and fit the scaler
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Create and train the model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_scaled, y)

# Create model directory if it doesn't exist
os.makedirs('model', exist_ok=True)

# Save the model and scaler
joblib.dump(model, 'model/emotion_model.pkl')
joblib.dump(scaler, 'model/scaler.pkl')

print("Test model and scaler have been created and saved successfully!")
print("Note: This is a dummy model for testing purposes only.") 