# ai-meeting-platform

# AI Meeting Platform

<div align="center">

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://render.com/)

[Live Demo](https://ai-meeting-platform.vercel.app)  • [Architecture](#architecture) • [API Reference](https://github.com/Chaitanya2812-dev/ai-meeting-platform) • [Report Issue](https://github.com/KaleSujit9011/ai-meeting-platform)

</div>

---

## 📋 Overview

AI Meeting Platform is a comprehensive solution for intelligent meeting management and summarization. Powered by AI, the platform enables users to upload, transcribe, analyze, and summarize meetings with natural language processing. Users can generate insights, export reports, and manage meeting data seamlessly through an intuitive web interface.

**Key Highlights:**
-  **Audio Transcription** - Convert speech to text using advanced Whisper technology
-  **AI Summarization** - Automatic meeting summaries powered by Groq LLM
-  **Export Features** - Generate reports in multiple formats
-  **Secure Authentication** - JWT-based user authentication
-  **Email Integration** - Send meeting summaries via Resend
-  **Real-time Updates** - Responsive UI with instant feedback

---

##  Live Demo

**[Visit the Live Platform](https://ai-meeting-platform.vercel.app)**

### Demo Screenshots

<div align="center">

![Dashboard Overview](./images/dashboard.png)
*Main dashboard showing recent meetings and analytics*

![Meeting Upload](./images/upload.png)
*Audio file upload interface with drag-and-drop support*

![AI Summary](./images/summary.png)
*AI-generated meeting summary and insights*

![Export Report](./images/export.png)
*Export meeting data in various formats*

</div>

> 📸 Add your own screenshots to the `images/` folder and update the paths above

---

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern UI library with Hooks and Suspense
- **Vite 8** - Lightning-fast build tool
- **Tailwind CSS 4** - Utility-first CSS framework
- **React Router v7** - Client-side routing
- **Axios** - HTTP client for API requests

### Backend
- **Node.js & Express 5** - Server framework
- **MongoDB & Mongoose** - NoSQL database and ODM
- **Groq SDK** - AI/LLM integration for summarization
- **OpenAI Whisper** - Audio transcription
- **JWT (jsonwebtoken)** - Authentication
- **Multer** - File upload handling
- **Resend** - Email service
- **bcryptjs** - Password hashing

### Deployment
- **Frontend**: Vercel (auto-deploy from main branch)
- **Backend**: Render (Node.js environment)
- **Database**: MongoDB Atlas (cloud)

---

## ✨ Features

- ✅ **User Authentication** - Register and login with secure JWT tokens
- ✅ **Meeting Upload** - Support for audio file uploads (MP3, WAV, etc.)
- ✅ **Automatic Transcription** - Convert audio to text using Whisper API
- ✅ **AI-Powered Summaries** - Generate concise meeting summaries with Groq LLM
- ✅ **Meeting Dashboard** - View all meetings with filtering and search
- ✅ **Export to Multiple Formats** - Download summaries as PDF, TXT, or JSON
- ✅ **Email Integration** - Send summaries directly to email
- ✅ **Responsive Design** - Mobile-friendly interface with Tailwind CSS
- ✅ **Real-time Status Updates** - Loading states and toast notifications
- ✅ **Error Handling** - Comprehensive error messages and user feedback

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** v16 or higher ([Download](https://nodejs.org/))
- **npm** or **yarn** package manager
- **MongoDB Atlas** account ([Sign up](https://www.mongodb.com/cloud/atlas))
- **Groq API key** ([Get here](https://console.groq.com/))
- **Resend API key** ([Get here](https://resend.com/))

### Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/your-username/ai-meeting-platform.git
cd ai-meeting-platform
```

#### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

**Backend Environment Variables** (`.env`):
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ai-meeting-platform

# Authentication
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d

# Groq AI
GROQ_API_KEY=your-groq-api-key-here

# Resend Email
RESEND_API_KEY=your-resend-api-key-here

# Whisper/OpenAI (optional)
OPENAI_API_KEY=your-openai-api-key-if-using-whisper

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

**Start Backend:**
```bash
npm start
```

Backend will run at `http://localhost:5000`

#### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

**Frontend Environment Variables** (`.env`):
```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=AI Meeting Platform
```

**Start Frontend:**
```bash
npm run dev
```

Frontend will run at `http://localhost:5173`

#### 4. Build for Production

**Frontend Build:**
```bash
cd frontend
npm run build
```

**Backend is ready for production** with:
```bash
cd backend
npm start  # Set NODE_ENV=production in .env
```

---

## 🏗️ Architecture

### System Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    CLIENT LAYER                             │
│  (React + Vite + Tailwind CSS)                             │
│  - Dashboard                                                │
│  - Upload Interface                                         │
│  - Summary Viewer                                           │
│  - Export Manager                                           │
└────────────────────┬────────────────────────────────────────┘
                     │ HTTP/REST API
                     │ JWT Authentication
┌────────────────────▼────────────────────────────────────────┐
│                    API LAYER                                │
│  (Express.js Server)                                        │
│  - Auth Routes (Register/Login)                            │
│  - Meeting Routes (CRUD)                                    │
│  - Upload Routes (File handling)                            │
│  - Export Routes (PDF/JSON generation)                      │
└────────────────────┬────────────────────────────────────────┘
                     │
        ┌────────────┼────────────┐
        │            │            │
┌───────▼──┐  ┌──────▼──┐  ┌─────▼────┐
│ Groq LLM │  │ Whisper  │  │ Resend   │
│ (Summary)│  │(Speech)  │  │ (Email)  │
└───────────┘  └──────────┘  └──────────┘
        │            │            │
        └────────────┼────────────┘
                     │
┌────────────────────▼────────────────────────────────────────┐
│                 DATA LAYER                                  │
│  (MongoDB Atlas)                                            │
│  - Users Collection                                         │
│  - Meetings Collection                                      │
│  - Sessions/Transcripts                                     │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow

1. **User Authentication**: User registers/logs in → JWT token issued
2. **Meeting Upload**: User uploads audio file → Stored in backend `/uploads`
3. **Processing**: 
   - Audio transcribed using Whisper API
   - Transcript sent to Groq LLM for summarization
   - Results saved to MongoDB
4. **Display**: Summary displayed in dashboard
5. **Export**: User can export summary in multiple formats
6. **Email**: Optional email delivery via Resend

---

## 📡 API Reference

### Base URL
- **Development**: `http://localhost:5000/api`
- **Production**: `https://your-backend.onrender.com/api`

### Authentication Endpoints

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response (201):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Login User
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

### Meeting Endpoints

#### Get All Meetings
```http
GET /meetings
Authorization: Bearer <JWT_TOKEN>
```

**Response (200):**
```json
{
  "success": true,
  "meetings": [
    {
      "id": "507f1f77bcf86cd799439011",
      "title": "Q4 Planning",
      "date": "2024-05-07T10:30:00Z",
      "transcription": "...",
      "summary": "...",
      "status": "completed"
    }
  ]
}
```

#### Upload Meeting Audio
```http
POST /upload
Authorization: Bearer <JWT_TOKEN>
Content-Type: multipart/form-data

{
  "file": <audio_file>,
  "title": "Team Standup"
}
```

#### Get Meeting Summary
```http
GET /meeting/:id
Authorization: Bearer <JWT_TOKEN>
```

#### Export Summary
```http
POST /export
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "meetingId": "507f1f77bcf86cd799439011",
  "format": "pdf"  // or "json", "txt"
}
```

---

## 📦 Deployment

### Frontend Deployment (Vercel)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Select `frontend` as root directory
   - Add environment variables (VITE_API_URL)
   - Click "Deploy"

3. **Auto-Deployment**
   - Every push to `main` branch triggers automatic deployment
   - Preview deployments for pull requests

### Backend Deployment (Render)

1. **Create Render Account**
   - Sign up at [render.com](https://render.com)

2. **Create New Web Service**
   - New → Web Service
   - Connect GitHub repository
   - Select `backend` directory
   - Set Start Command: `npm start`

3. **Environment Variables**
   - Add all variables from `.env`
   - Add `NODE_ENV=production`

4. **Auto-Deploy**
   - Redeploy on push to main branch
   - Logs available in Render dashboard

### Database (MongoDB Atlas)

1. **Create Cluster**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create cluster
   - Get connection string

2. **Network Access**
   - Add backend IP to whitelist
   - Or allow all IPs (0.0.0.0/0) for development

3. **Connection String**
   ```
   mongodb+srv://username:password@cluster.mongodb.net/database-name
   ```

---

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### Before Contributing
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes with clear commit messages
4. Push to your fork: `git push origin feature/your-feature-name`
5. Open a Pull Request with detailed description

### Development Guidelines
- Follow existing code style and conventions
- Add comments for complex logic
- Test your changes locally before submitting
- Update README if adding new features
- Ensure no console errors or warnings

### Reporting Issues
- Check existing issues before creating new ones
- Provide detailed reproduction steps
- Include error messages and screenshots
- Specify your environment (OS, Node version, etc.)

### Code Standards
- Use meaningful variable/function names
- Keep functions focused and small
- Add error handling
- Write descriptive commit messages

---

## 📝 License

This project is licensed under the **MIT License** - see the LICENSE file for details.

You are free to:
- ✅ Use this project for personal and commercial purposes
- ✅ Modify and distribute the code
- ✅ Include the software in proprietary applications

Under the condition that:
- ⚠️ The original license and copyright notice are included
- ⚠️ Changes made are disclosed

---

## 📞 Support & Contact

- **Issues**: [GitHub Issues](https://github.com/your-username/ai-meeting-platform/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/ai-meeting-platform/discussions)
- **Email**: your-email@example.com

---

## 🙏 Acknowledgments

- [Groq](https://groq.com/) for powerful LLM API
- [OpenAI](https://openai.com/) for Whisper transcription
- [Resend](https://resend.com/) for email service
- [MongoDB](https://www.mongodb.com/) for database
- [Vercel](https://vercel.com/) and [Render](https://render.com/) for hosting

---

<div align="center">

**Built with ❤️ by Your Team**

⭐ If you find this project useful, please consider giving it a star!

</div>