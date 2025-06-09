import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaPlay, FaPause, FaUpload, FaMicrophone } from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Profile = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [audioFiles, setAudioFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [audioPlayer, setAudioPlayer] = useState(null);

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    const fetchAudioFiles = async () => {
      try {
        const response = await axios.get(`/api/user/${currentUser.id}/audio-files`);
        if (response.data && Array.isArray(response.data)) {
          setAudioFiles(response.data);
        } else {
          setAudioFiles([]);
        }
      } catch (error) {
        console.error('Error fetching audio files:', error);
        setError('Failed to load audio files. Please try again later.');
        setAudioFiles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAudioFiles();
  }, [currentUser, navigate]);

  const handlePlayPause = (audioFile) => {
    if (currentlyPlaying === audioFile.id) {
      audioPlayer.pause();
      setCurrentlyPlaying(null);
    } else {
      if (audioPlayer) {
        audioPlayer.pause();
      }
      const newAudioPlayer = new Audio(audioFile.file_path);
      newAudioPlayer.play();
      setAudioPlayer(newAudioPlayer);
      setCurrentlyPlaying(audioFile.id);
    }
  };

  const getEmotionChartData = (audioFile) => {
    return {
      labels: ['Angry', 'Disgust', 'Fear', 'Happy', 'Neutral', 'Sad', 'Surprise'],
      datasets: [
        {
          label: 'Emotion Distribution',
          data: [
            audioFile.emotion_scores?.angry || 0,
            audioFile.emotion_scores?.disgust || 0,
            audioFile.emotion_scores?.fear || 0,
            audioFile.emotion_scores?.happy || 0,
            audioFile.emotion_scores?.neutral || 0,
            audioFile.emotion_scores?.sad || 0,
            audioFile.emotion_scores?.surprise || 0,
          ],
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
      ],
    };
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Profile</h1>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">User Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Username:</p>
                <p className="font-medium">{currentUser.username}</p>
              </div>
              <div>
                <p className="text-gray-600">Email:</p>
                <p className="font-medium">{currentUser.email}</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Audio Files</h2>
            {audioFiles.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600">No audio files found. Start by recording or uploading audio files.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {audioFiles.map((audioFile) => (
                  <div key={audioFile.id} className="bg-gray-50 rounded-lg p-4 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        {audioFile.is_recorded ? (
                          <FaMicrophone className="text-blue-500 mr-2" />
                        ) : (
                          <FaUpload className="text-green-500 mr-2" />
                        )}
                        <h3 className="font-medium text-gray-800">{audioFile.filename}</h3>
                      </div>
                      <button
                        onClick={() => handlePlayPause(audioFile)}
                        className="p-2 rounded-full bg-blue-100 hover:bg-blue-200"
                      >
                        {currentlyPlaying === audioFile.id ? (
                          <FaPause className="text-blue-600" />
                        ) : (
                          <FaPlay className="text-blue-600" />
                        )}
                      </button>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-sm text-gray-600">Uploaded on: {new Date(audioFile.upload_date).toLocaleDateString()}</p>
                      <p className="text-sm text-gray-600">Emotion: {audioFile.emotion_result}</p>
                      <p className="text-sm text-gray-600">Confidence: {(audioFile.confidence_score * 100).toFixed(2)}%</p>
                    </div>

                    <div className="h-48">
                      <Line
                        data={getEmotionChartData(audioFile)}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          scales: {
                            y: {
                              beginAtZero: true,
                              max: 1
                            }
                          }
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 