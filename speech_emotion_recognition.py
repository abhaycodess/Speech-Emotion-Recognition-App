import os
import numpy as np
import librosa
import tensorflow as tf
from keras.models import Sequential
from keras.layers import LSTM, Dense, Dropout
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
import matplotlib.pyplot as plt

class SpeechEmotionRecognition:
    def __init__(self, sample_rate=22050, duration=3, n_mfcc=13):
        self.sample_rate = sample_rate
        self.duration = duration
        self.n_mfcc = n_mfcc
        self.model = None
        self.label_encoder = LabelEncoder()

    def extract_features(self, file_path):
        try:
            # Load audio file
            audio, sr = librosa.load(file_path, sr=self.sample_rate, duration=self.duration)
            
            # Extract MFCC features
            mfccs = librosa.feature.mfcc(y=audio, sr=sr, n_mfcc=self.n_mfcc)
            
            # Pad or truncate to ensure consistent shape
            if mfccs.shape[1] < 130:  # Assuming 130 frames for 3 seconds
                pad_width = ((0, 0), (0, 130 - mfccs.shape[1]))
                mfccs = np.pad(mfccs, pad_width, mode='constant')
            else:
                mfccs = mfccs[:, :130]
            
            return mfccs
        except Exception as e:
            print(f"Error processing {file_path}: {str(e)}")
            return None

    def build_model(self, input_shape, num_classes):
        model = Sequential([
            LSTM(128, return_sequences=True, input_shape=input_shape),
            Dropout(0.3),
            LSTM(64),
            Dropout(0.3),
            Dense(32, activation='relu'),
            Dense(num_classes, activation='softmax')
        ])
        
        model.compile(optimizer='adam',
                     loss='categorical_crossentropy',
                     metrics=['accuracy'])
        
        self.model = model
        return model

    def train(self, X, y, epochs=50, batch_size=32, validation_split=0.2):
        if self.model is None:
            raise ValueError("Model not built. Call build_model() first.")
        
        history = self.model.fit(
            X, y,
            epochs=epochs,
            batch_size=batch_size,
            validation_split=validation_split,
            verbose=1
        )
        
        return history

    def predict_emotion(self, audio_path):
        if self.model is None:
            raise ValueError("Model not trained. Train the model first.")
        
        features = self.extract_features(audio_path)
        if features is None:
            return None
        
        features = np.expand_dims(features, axis=0)
        prediction = self.model.predict(features)
        predicted_class = np.argmax(prediction, axis=1)
        emotion = self.label_encoder.inverse_transform(predicted_class)[0]
        
        return emotion

def plot_training_history(history):
    plt.figure(figsize=(12, 4))
    
    plt.subplot(1, 2, 1)
    plt.plot(history.history['accuracy'], label='Training Accuracy')
    plt.plot(history.history['val_accuracy'], label='Validation Accuracy')
    plt.title('Model Accuracy')
    plt.xlabel('Epoch')
    plt.ylabel('Accuracy')
    plt.legend()
    
    plt.subplot(1, 2, 2)
    plt.plot(history.history['loss'], label='Training Loss')
    plt.plot(history.history['val_loss'], label='Validation Loss')
    plt.title('Model Loss')
    plt.xlabel('Epoch')
    plt.ylabel('Loss')
    plt.legend()
    
    plt.tight_layout()
    plt.show()

if __name__ == "__main__":
    # Example usage
    print("Speech Emotion Recognition System")
    print("Note: You need to prepare your dataset and update the paths accordingly") 