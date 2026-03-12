# ⚖️ LAWYER.AI - Premium 3D Judicial Platform

Welcome to the **3D-Lawyer.AI** project. This is an advanced legal document analysis, strategy generation, and moot court simulation platform powered by 3D visuals and Gemini AI.

---

## 🚀 Getting Started

If you have just cloned this project or received a new update from your teammate, follow these steps to get everything running locally.

### 1. 📥 Install Missing Dependencies
First, you need to install the required libraries for both the frontend (client) and the backend (server).

#### For the Frontend:
1. Open a terminal in the project root directory (`Version 2`).
2. Run the following command:
   ```bash
   npm install
   ```

#### For the Backend:
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Run the following command:
   ```bash
   npm install
   ```

---

## 🔐 Environment Variables (.env)

The application requires several API keys and configuration strings to function (Database, AI Analysis, Emailing). These are stored in an `.env` file for security.

### 📍 Where to store the .env file?
You must place your `.env` file inside the **`backend`** folder.

**Correct Path:** `D:\Projects\Lawyer.AI\Version 2\backend\.env`

### 📋 Required .env Content
Ask your teammate for the values or replace them with your own. Your `.env` should look like this:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_jwt_secret
JWT_EXPIRES_IN=90d
EMAIL_USER=your_email@gmail.com
EMAIL_APP_PASSWORD=your_gmail_app_password
GEMINI_API_KEY=your_google_gemini_api_key
TWILIO_AUTH_TOKEN=your_twilio_token
ACCESS_TOKEN_SECRET=your_access_token_secret
```

> [!IMPORTANT]
> Never share your `.env` file publicly or commit it to GitHub. It is already added to `.gitignore`.

---

## 🛠️ How to Run the App

Once dependencies are installed and the `.env` file is in place, you can start the platform.

### Running both Client & Server (Easiest)
From the **root directory** (`Version 2`), run:
```bash
npm run dev
```
- **Frontend** will be available at: `http://localhost:5173`
- **Backend API** will be available at: `http://localhost:5000`

---

## ✨ Features Checklist
- [x] **AI Document Analyzer**: Fixes for PDF parsing and modern UI transitions.
- [x] **Open Case Library**: Centered UI with aligned category filters.
- [x] **Moot Court Simulator**: Robust layout to prevent freezing.
- [x] **Legal Strategy Generator**: Strategic planning powered by Gemini.
- [x] **Outcome Predictor**: AI-driven case probability analysis.

---

## 👩‍💻 Collaborators
- **Team**: Lawyer.AI
- **GitHub**: [3D-Lawyer.AI](https://github.com/lawyerai-system/3D-Lawyer.AI)
