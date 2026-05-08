# GenAI Scam Detection System

> AI-powered cybersecurity platform that detects scam messages, phishing attempts, fake URLs, OTP frauds and social-engineering attacks using **Generative AI + NLP + Machine Learning**.

A live, hackathon-ready **web** version of this system is also included as a separate Lovable/TanStack Start app — see the project root.
This folder contains the **multi-repo starter code** for the React Native mobile app, Node/Express backend, Flask ML service, and Python attack simulator.

---

## Project Structure

```
genai-scam-detection/
├── ml-model/        # Python Flask ML microservice (scikit-learn + transformers + Gemini)
├── backend/         # Node.js + Express + MongoDB + JWT API
├── mobile-app/      # React Native (Expo) cross-platform app
├── simulator/       # Python attack simulator
└── docs/
```

---

## Features

- **AI Scam Detection** — phishing, banking, lottery, job and OTP scams
- **Generative AI Analysis** — Gemini/OpenAI explains *why* a message is suspicious and gives safety tips
- **Confidence score** for every prediction
- **Backend APIs** — `POST /analyze`, `POST /predict`, `POST /report`, `GET /history`, `POST /auth/login`, `POST /auth/signup`
- **Mobile app** — Home / Scanner / URL Checker / History / Profile
- **Attack simulator** — fires fake phishing payloads at the live API
- **Modern dashboard UI** — dark cybersecurity theme, glassmorphism, animated graphs

---

## Tech Stack

| Layer | Stack |
|---|---|
| Mobile | React Native, Expo, React Navigation, Axios |
| Backend | Node.js, Express.js, MongoDB Atlas, JWT, Firebase Auth (optional) |
| ML | Python, Flask, scikit-learn, pandas, TF-IDF, Logistic Regression / Naive Bayes |
| GenAI | Google Gemini API / OpenAI API |

---

## Quick Setup

### 1. ML Model

```bash
cd ml-model
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
python train_model.py        # trains and saves model.pkl + vectorizer.pkl
python app.py                # runs Flask on :5001
```

### 2. Backend

```bash
cd backend
npm install
cp .env.example .env         # fill in MONGO_URI, JWT_SECRET, ML_SERVICE_URL, GEMINI_API_KEY
npm run dev                  # runs on :5000
```

### 3. Mobile App

```bash
cd mobile-app
npm install
npx expo start
```

Update `mobile-app/services/api.js` with the backend URL.

### 4. Simulator

```bash
cd simulator
python attack_simulator.py --target http://localhost:5000
```

---

## Environment Variables

### `backend/.env`
```
PORT=5000
MONGO_URI=mongodb+srv://...
JWT_SECRET=replace-me
ML_SERVICE_URL=http://localhost:5001
GEMINI_API_KEY=your-gemini-key
```

### `ml-model/.env`
```
GEMINI_API_KEY=your-gemini-key
```

---

## API Documentation

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/auth/signup` | Register new user | – |
| POST | `/auth/login` | Returns JWT | – |
| POST | `/analyze` | Full pipeline: ML + GenAI explanation | ✅ |
| POST | `/predict` | ML-only prediction | ✅ |
| POST | `/report` | Submit a scam report | ✅ |
| GET  | `/history` | Detection history for current user | ✅ |

`POST /analyze` body:
```json
{ "input": "Your account is blocked, share OTP", "type": "message" }
```

Response:
```json
{
  "verdict": "scam",
  "confidence": 92,
  "category": "OTP Fraud",
  "indicators": ["OTP request", "Account block urgency"],
  "explanation": "This message asks you to share an OTP...",
  "recommendations": ["Never share OTPs", "..."]
}
```

---

## Database Collections (MongoDB)

- `users` — `{ email, password_hash, full_name }`
- `scam_reports` — `{ user_id, content, category, notes }`
- `detection_history` — `{ user_id, input, verdict, confidence, indicators, explanation }`
- `attack_logs` — `{ user_id, attack_type, payload, detected, confidence }`

---

## Team Responsibilities (suggested)

| Member | Role |
|---|---|
| 1 | ML model + training data |
| 2 | GenAI prompt engineering + Flask API |
| 3 | Node/Express backend + MongoDB + auth |
| 4 | React Native mobile app |
| 5 | Simulator + dashboard UI + demo |

---

## Future Enhancements

- Real-time SMS interception on Android
- Voice scam call detection (Whisper + GenAI)
- Browser extension for live URL scanning
- Federated learning across user devices
- Push notifications for new scam patterns

---

## Screenshots

> _Add screenshots of: Home, Scanner result, URL checker, Simulator dashboard, History._

---

## License

MIT
