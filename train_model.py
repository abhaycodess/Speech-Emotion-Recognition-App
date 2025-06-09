import os
import numpy as np
from speech_emotion_recognition import SpeechEmotionRecognition
from data_preprocessing import prepare_dataset, split_dataset
import matplotlib.pyplot as plt
from sklearn.preprocessing import LabelEncoder
from tensorflow.keras.utils import to_categorical
from sklearn.metrics import classification_report, confusion_matrix
import seaborn as sns

# RAVDESS emotion mapping
EMOTION_MAP = {
    '01': 'neutral',
    '02': 'calm',
    '03': 'happy',
    '04': 'sad',
    '05': 'angry',
    '06': 'fearful',
    '07': 'disgust',
    '08': 'surprised'
}

def get_emotion_from_filename(filename):
    """Extract emotion from RAVDESS filename"""
    emotion_code = filename.split('-')[2]
    return EMOTION_MAP[emotion_code]

def prepare_ravdess_dataset(data_dir):
    """Prepare RAVDESS dataset for training"""
    ser = SpeechEmotionRecognition()
    features = []
    labels = []
    
    # Process each actor's folder
    for actor_dir in os.listdir(data_dir):
        actor_path = os.path.join(data_dir, actor_dir)
        if not os.path.isdir(actor_path):
            continue
            
        print(f"Processing {actor_dir}...")
        for audio_file in os.listdir(actor_path):
            if not audio_file.endswith('.wav'):
                continue
                
            file_path = os.path.join(actor_path, audio_file)
            emotion = get_emotion_from_filename(audio_file)
            
            feature = ser.extract_features(file_path)
            if feature is not None:
                features.append(feature)
                labels.append(emotion)
    
    # Convert to numpy arrays
    X = np.array(features)
    y = np.array(labels)
    
    # Reshape X for LSTM input (samples, timesteps, features)
    X = X.reshape(X.shape[0], X.shape[2], X.shape[1])
    
    # Encode labels
    label_encoder = LabelEncoder()
    y_encoded = label_encoder.fit_transform(y)
    y_onehot = to_categorical(y_encoded)
    
    return X, y_onehot, label_encoder

def main():
    # Prepare dataset
    print("Preparing dataset...")
    data_dir = "Data"
    X, y, label_encoder = prepare_ravdess_dataset(data_dir)
    
    # Split dataset
    print("Splitting dataset...")
    X_train, X_val, X_test, y_train, y_val, y_test = split_dataset(X, y)
    
    # Initialize and build model
    print("Building model...")
    ser = SpeechEmotionRecognition()
    ser.build_model(input_shape=(X_train.shape[1], X_train.shape[2]), 
                   num_classes=y.shape[1])
    
    # Train model
    print("Training model...")
    history = ser.train(X_train, y_train, epochs=50, batch_size=32)
    
    # Plot training history
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
    plt.savefig('training_history.png')
    plt.show()
    
    # Save model and label encoder
    ser.model.save('emotion_recognition_model.h5')
    np.save('label_encoder_classes.npy', label_encoder.classes_)
    print("Model saved as 'emotion_recognition_model.h5'")
    print("Label encoder classes saved as 'label_encoder_classes.npy'")

    # --- Confusion Matrix and Classification Report ---
    print("Evaluating on test set...")
    y_pred_probs = ser.model.predict(X_test)
    y_pred = np.argmax(y_pred_probs, axis=1)
    y_true = np.argmax(y_test, axis=1)

    # Print final test accuracy
    test_acc = (y_pred == y_true).mean()
    print(f"Test Accuracy: {test_acc:.4f}")

    # Classification report
    print("Classification Report:")
    print(classification_report(y_true, y_pred, target_names=label_encoder.classes_))

    # Confusion matrix
    cm = confusion_matrix(y_true, y_pred)
    plt.figure(figsize=(10, 8))
    sns.heatmap(cm, annot=True, fmt='d', xticklabels=label_encoder.classes_, yticklabels=label_encoder.classes_, cmap='Blues')
    plt.title("Confusion Matrix")
    plt.xlabel("Predicted")
    plt.ylabel("Actual")
    plt.tight_layout()
    plt.savefig('confusion_matrix.png')
    plt.show()

if __name__ == "__main__":
    main() 