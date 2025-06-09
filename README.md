# Nimbus - Emotion Recognition System

Nimbus is a web application that uses machine learning to analyze and recognize emotions from speech. The system provides real-time emotion analysis with a beautiful and intuitive user interface.

## Features

- Real-time emotion analysis from speech
- User authentication (signup/login)
- Detailed emotion probability visualization
- Modern and responsive UI with animations
- Secure and private data handling

## Tech Stack

### Backend
- Flask (Python web framework)
- SQLAlchemy (Database ORM)
- Flask-Login (Authentication)
- Librosa (Audio processing)
- Scikit-learn (Machine learning)

### Frontend
- React
- Material-UI
- Framer Motion (Animations)
- Recharts (Data visualization)
- Axios (HTTP client)

## Setup Instructions

### Prerequisites
- Python 3.8+
- Node.js 14+
- npm or yarn

### Backend Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Initialize the database:
```bash
flask db upgrade
```

4. Run the backend server:
```bash
flask run
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`.

## Project Structure

```
nimbus/
├── app/
│   ├── __init__.py
│   ├── models.py
│   └── routes/
│       ├── auth.py
│       ├── main.py
│       └── api.py
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── pages/
│   │   └── App.js
│   └── package.json
├── requirements.txt
└── README.md
```

## API Endpoints

- `POST /api/signup` - Create a new user account
- `POST /api/login` - Authenticate user
- `POST /api/logout` - Logout user
- `GET /api/current_user` - Get current user information
- `POST /api/predict` - Analyze audio for emotion recognition

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 