# 🗽 DAKANTOURS - Full-Stack Travel Platform

A modern, responsive travel booking platform showcasing America's natural wonders and upcoming Kyrgyzstan adventures. Built with React.js, Flask, and modern web technologies.

## ✨ Features

### 🎨 User Experience
- **Beautiful Dark Theme** - Modern, professional UI design
- **Responsive Design** - Works perfectly on all devices
- **Image Optimization** - Local assets with lazy loading
- **Smooth Animations** - Hover effects and transitions

### 🚀 Core Functionality
- **Tour Showcase** - Display available tours with details
- **Lead Capture** - Professional interest forms
- **Email Notifications** - Automated customer communication
- **Database Storage** - SQLite with SQLAlchemy ORM
- **API Backend** - RESTful Flask API

### 🏔️ Tour Destinations
- **Canyons Adventure** - Zion, Grand Canyon, Monument Valley
- **Alaska Northern Lights** - Wilderness and Aurora chasing
- **Hawaii Oahu Adventure** - Surfing, diving, island culture
- **West Coast National Parks** - Sequoia, Yosemite, Big Sur
- **Kyrgyzstan Preview** - Coming soon with waitlist
- **Custom Adventures** - Personalized tour planning

## 🛠️ Tech Stack

### Frontend
- **React.js 19** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Responsive Design** - Mobile-first approach

### Backend
- **Flask** - Python web framework
- **SQLAlchemy** - Database ORM
- **SQLite** - Lightweight database
- **Flask-Mail** - Email service integration
- **CORS** - Cross-origin resource sharing

### Development Tools
- **ESLint** - Code quality
- **PostCSS** - CSS processing
- **Git** - Version control

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- Python 3.8+
- Git

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Backend Setup
```bash
cd backend
pip install -r requirements.txt
python run.py
```

### Environment Variables
```bash
# Email Configuration
export MAIL_USERNAME="your-email@gmail.com"
export MAIL_PASSWORD="your-app-password"
export MAIL_DEFAULT_SENDER="your-email@gmail.com"
export ADMIN_EMAIL="admin@example.com"
```

## 📁 Project Structure

```
kyrgyzstan-travel-platform/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── services/        # API services
│   │   ├── utils/           # Utility functions
│   │   └── assets/          # Images and static files
│   ├── package.json
│   └── vite.config.js
├── backend/                  # Flask backend
│   ├── app/
│   │   ├── models/          # Database models
│   │   ├── routes/          # API endpoints
│   │   └── services/        # Business logic
│   ├── requirements.txt
│   └── run.py
└── README.md
```

## 🎯 Key Components

### Frontend Components
- **Navigation** - Responsive navigation bar
- **Hero** - Landing section with call-to-action
- **TourCard** - Individual tour display
- **TourDetailsModal** - Tour information popup
- **BookingForm** - Lead capture form

### Backend Models
- **Tour** - Tour information and details
- **Lead** - Customer interest and contact info

### API Endpoints
- `GET /api/tours/` - List all tours
- `POST /api/interests/` - Submit tour interest
- `GET /api/tour-details/<slug>` - Get tour details

## 🔮 Future Enhancements

### Cloud Migration
- **AWS Deployment** - EC2, RDS, S3
- **Docker Containerization** - Easy deployment
- **CI/CD Pipeline** - Automated testing and deployment

### Machine Learning Integration
- **Lead Analysis** - Customer behavior patterns
- **Tour Recommendations** - Personalized suggestions
- **Pricing Optimization** - Dynamic pricing strategies
- **Marketing Insights** - Campaign effectiveness

### Additional Features
- **User Authentication** - Customer accounts
- **Payment Integration** - Stripe/PayPal
- **Real-time Chat** - Customer support
- **Multi-language** - International expansion

## 📊 Performance Features

- **Image Lazy Loading** - Faster page loads
- **Optimized Assets** - Compressed images
- **Efficient API** - Minimal database queries
- **Responsive Design** - Mobile-optimized

## 🧪 Testing

### Frontend
```bash
npm run build    # Production build
npm run lint     # Code quality check
```

### Backend
```bash
python -c "from app import create_app; app = create_app(); print('✅ Backend ready')"
```

## 📱 Mobile Experience

- **Touch-friendly** - Optimized for mobile devices
- **Fast Loading** - Optimized images and code
- **Responsive Layout** - Adapts to all screen sizes
- **Mobile Navigation** - Collapsible menu

## 🌟 What I Learned

This project has been an incredible learning experience in:

- **Full-Stack Development** - End-to-end application building
- **Modern Web Technologies** - React, Flask, Tailwind CSS
- **Database Design** - SQLAlchemy ORM and relationships
- **API Development** - RESTful endpoints and error handling
- **User Experience** - Responsive design and animations
- **Performance Optimization** - Lazy loading and asset optimization
- **Email Integration** - Automated notifications
- **Project Architecture** - Clean code organization

## 🤝 Contributing

This is a personal project showcasing full-stack development skills. Feel free to:

- **Fork the repository** - Create your own version
- **Submit issues** - Report bugs or suggest features
- **Star the project** - Show your support

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

- **Email**: dacantour@gmail.com
- **Phone**: +1 (425) 546-9231
- **Location**: Seattle, WA

---

**Built with ❤️ and ☕ by [Your Name]**

*Discover America's Natural Wonders - Global Expansion Coming Soon! 🚀*
