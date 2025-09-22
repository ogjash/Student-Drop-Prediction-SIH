<div align="center">

# 🎓 Student Dropout Prediction System

A comprehensive web application for predicting and managing student dropout risks using machine learning. This system helps educational institutions identify at-risk students early and take proactive, preventive measures.

</div>

<p align="center">
  <a href="#-key-features">Key Features</a> •
  <a href="#-demo--presentation">Demo</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-technology-stack">Tech Stack</a> •
  <a href="#-roadmap">Roadmap</a> •
  <a href="#-contributing">Contributing</a>
</p>

---

## Project Structure

The project is divided into three main components:

### Frontend (React + Vite)
- Located in `/Frontend`
- Modern UI built with React and Vite
- Real-time dashboard for monitoring student risks
- Interactive visualizations and analytics
- Responsive design for all devices

### Backend (Node.js + Express)
- Located in `/Backend`
- RESTful API architecture
- JWT-based authentication
- Role-based access control (Admin, Owner)
- Biweekly prediction caching
- Google Sheets integration for data management

### ML Service (FastAPI)
- Located in `/ML`
- Machine learning model for dropout prediction
- FastAPI server for quick predictions
- Pre-trained model using student performance metrics

## Features

- 🔍 Real-time student risk monitoring
- 📊 Interactive dashboards and analytics
- 🔔 Automated risk alerts system
- 👥 Multi-user role management
- 📈 Performance tracking and reporting
- 🔄 Biweekly prediction updates
- 📱 Responsive design for all devices

## 🎥 Demo & Presentation

Explore the system's functionality through our demo video, screenshots, and documentation.

<br>

| Resource               | Link                                         |
| ---------------------- | -------------------------------------------- |
| 📹 **Demo Video** | [Watch on YouTube]([https://youtu.be/-1o0vFkMksA]) |
| 📊 **Presentation** | [Project Presentation (PPT)](docs/presentation.pptx) |


### Key Highlights in Demo
1. **Dashboard Overview**
   - Real-time risk monitoring
   - Performance metrics visualization
   - Department-wise analysis

2. **Alert System**
   - Risk level indicators
   - Automated notification system
   - Priority-based student listing

3. **Prediction System**
   - ML model integration
   - Biweekly prediction updates
   - Accuracy metrics

4. **User Management**
   - Role-based access control
   - Data source management
   - User activity tracking

## Prerequisites

- Node.js (v14 or higher)
- Python 3.8+
- MongoDB
- Google Sheets API access

## Setup Instructions

### 1. Frontend Setup
```bash
cd Frontend
npm install
npm run dev
```

### 2. Backend Setup
```bash
cd Backend
npm install
# Set up environment variables (see .env.example)
npm start
```

### 3. ML Service Setup
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

## 🔒 API & User Roles

### API Endpoints

| Method | Endpoint                      | Description                  | Access  |
|--------|------------------------------|------------------------------|---------|
| POST   | `/api/auth/login`           | User login                   | Public  |
| POST   | `/api/auth/logout`          | User logout                  | Auth    |
| GET    | `/api/auth/verify`          | Verify authentication token  | Auth    |
| GET    | `/api/admin/predictdropout`  | Get dropout predictions     | Admin   |
| GET    | `/api/admin/refreshPrediction`| Refresh predictions        | Admin   |
| POST   | `/api/admin/storedatalinks`  | Update data source links    | Admin   |
| POST   | `/api/owner/registerUser`    | Register a new user         | Owner   |
| GET    | `/api/owner/listUsers`       | List all users             | Owner   |
| POST   | `/api/owner/removeUser`      | Remove an existing user     | Owner   |
| POST   | `/api/owner/transferOwner`   | Transfer ownership to a user | Owner  |

### User Roles

| Role    | Permissions                                                           |
|---------|-----------------------------------------------------------------------|
| 👑 Owner  | Full access: Manage users, transfer ownership, and use all Admin features |
| 🛡️ Admin  | View predictions, manage data sources, and send alerts to students        |
| 📊 Export | Access to export data to Google Sheets                                   |

## User Roles

1. **Owner**
   - Manage users
   - Transfer ownership
   - Access all features

2. **Admin**
   - View predictions
   - Manage data sources
   - Send alerts

## Data Requirements

The system expects the following data through Google Sheets:
- Student attendance records
- Test scores
- Fee payment status
- Family income information
- Student personal details

## Future Features

- 📅 Automated scheduling for counseling sessions
- 📨 Multi-channel notification system (SMS, Email, WhatsApp)
- 🧠 Integration of multiple ML models for comparative analysis
- 📊 Time-series analysis for trend prediction
- 🎯 Personalized intervention strategies based on risk factors
- 🔄 Auto-learning system that improves with more data
- 📊 Integration with more data sources
- 🔄 Real-time academic performance tracking
- 📱 Social media sentiment analysis
- 📈 Behavioral pattern analysis

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Support

For support, please contact the development team or raise an issue in the repository.
