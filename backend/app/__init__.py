from flask import Flask
from flask_cors import CORS
from .routes.tours import tours_bp
from .routes.bookings import interests_bp
from .routes.tour_details import tour_details_bp
from .db import init_db
from .services.email_service import init_email_service
import os

def create_app():
    app = Flask(__name__)
    
    # Enable CORS for all routes
    CORS(app, origins=["http://localhost:5173", "http://localhost:5174", "http://localhost:3000"])
    
    # Load environment variables properly
    app.config['DATABASE_URL'] = os.environ.get('DATABASE_URL', 'sqlite:///local.db')
    app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev-secret-key')

    init_db(app)
    init_email_service(app)

    app.register_blueprint(tours_bp, url_prefix='/api/tours')
    app.register_blueprint(interests_bp, url_prefix='/api/interests')
    app.register_blueprint(tour_details_bp, url_prefix='/api/tour-details')

    return app