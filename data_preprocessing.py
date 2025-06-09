import os
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from speech_emotion_recognition import SpeechEmotionRecognition

def prepare_dataset(data_dir, emotions=None):
    """
    Prepare the dataset by extracting features from audio files.
    
    Args:
        data_dir (str): Directory containing audio files organized by emotion folders
        emotions (list): List of emotions to include. If None, includes all emotions found
    
    Returns:
        tuple: (X, y) where X is the feature matrix and y is the label array
    """
    if emotions is None:
        emotions = [d for d in os.listdir(data_dir) if os.path.isdir(os.path.join(data_dir, d))]
    
    ser = SpeechEmotionRecognition()
    features = []
    labels = []
    
    for emotion in emotions:
        emotion_dir = os.path.join(data_dir, emotion)
        if not os.path.isdir(emotion_dir):
            continue
            
        print(f"Processing {emotion}...")
        for audio_file in os.listdir(emotion_dir):
            if not audio_file.endswith(('.wav', '.mp3')):
                continue
                
            file_path = os.path.join(emotion_dir, audio_file)
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
    y = label_encoder.fit_transform(y)
    
    return X, y, label_encoder

def split_dataset(X, y, test_size=0.2, val_size=0.2, random_state=42):
    """
    Split the dataset into training, validation, and test sets.
    
    Args:
        X (numpy.ndarray): Feature matrix
        y (numpy.ndarray): Label array
        test_size (float): Proportion of dataset to include in test split
        val_size (float): Proportion of training set to include in validation split
        random_state (int): Random seed for reproducibility
    
    Returns:
        tuple: (X_train, X_val, X_test, y_train, y_val, y_test)
    """
    # First split: separate test set
    X_train_val, X_test, y_train_val, y_test = train_test_split(
        X, y, test_size=test_size, random_state=random_state
    )
    
    # Second split: separate validation set from training set
    X_train, X_val, y_train, y_val = train_test_split(
        X_train_val, y_train_val, 
        test_size=val_size/(1-test_size), 
        random_state=random_state
    )
    
    return X_train, X_val, X_test, y_train, y_val, y_test

if __name__ == "__main__":
    # Example usage
    print("Data Preprocessing Module")
    print("Note: Update the data_dir path to your dataset location") 