<div align="center">

# 🎓 Mentor Signal

</div>

## 📱 Features

- 🔍 Real-time student risk monitoring
- 📊 Interactive dashboards and analytics
- 🔔 Automated risk alerts system
- 👥 Multi-user role management
- 📈 Performance tracking and reporting
- 🔄 Biweekly prediction updates
- 📱 Responsive design for all devices

## 🛠️ Technology Stack

### Frontend

- **React 18** - Modern UI library with hooks and concurrent features
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework for rapid styling
- **Lucide React** - Beautiful icon library
- **React Router** - Client-side routing for SPA navigation
- **Axios** - HTTP client for API communications

### Backend

- **Node.js** - JavaScript runtime for server-side development
- **Express.js** - Minimalist web framework for Node.js
- **MongoDB** - NoSQL database for flexible data storage
- **Mongoose** - MongoDB object modeling for Node.js
- **JWT (JSON Web Tokens)** - Secure authentication and authorization
- **bcryptjs** - Password hashing for security
- **CORS** - Cross-origin resource sharing middleware
- **Google Sheets API** - Integration for data management

### Machine Learning

- **Python 3.8+** - Programming language for ML development
- **FastAPI** - Modern, fast web framework for building APIs
- **XGBoost** - Gradient boosting framework for machine learning
- **scikit-learn** - Machine learning library for model training
- **pandas** - Data manipulation and analysis
- **numpy** - Numerical computing library

### Development & Deployment

- **Git** - Version control system
- **npm/yarn** - Package management
- **Environment Variables** - Configuration management
- **RESTful API** - Architectural style for web services
- **Vercel** - Frontend deployment and hosting platform
- **Render** - Backend and ML service deployment platform

### Architecture Patterns

- **MVC (Model-View-Controller)** - Backend structure
- **Component-Based Architecture** - Frontend React components
- **Microservices** - Separate ML service
- **JWT-Based Authentication** - Stateless authentication
- **Role-Based Access Control (RBAC)** - User permission management

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Python 3.8+
- MongoDB
- Google Sheets API access

### Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/ogjash/Student-Drop-Prediction-SIH.git
cd code
```

### 2. Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

### 3. Backend Setup

```bash
cd Backend
npm install
# Set up environment variables (see .env.example)
npm start
```

### 4. ML Service Setup

```bash
cd ML/fastapi
pip install -r requirements.txt
uvicorn app:app --reload
```

## ⚙️ Environment Variables

Create `.env` files in both frontend and backend directories with the following configurations:

```env
# Frontend Environment Variables (.env)
VITE_APP_API_BASE=https://your-backend-url/api/auth
VITE_APP_OWNER_BASE=https://your-backend-url/api/owner
VITE_APP_ADMIN_BASE=https://your-backend-url/api/admin

# Backend Environment Variables (.env)
PORT=3000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
ML_MODEL_PATH=your_ml_service_url

# ML Service Environment Variables (if needed)
MODEL_PATH=./my_projects.pkl
DEBUG=True
```

## 📋 Data Requirements

The system expects the following data through Google Sheets:

- Student attendance records
- Test scores
- Fee payment status
- Family income information
- Student personal details

---

<div align="center">
  Made with ❤️ for Student Success
</div><div align="center">
